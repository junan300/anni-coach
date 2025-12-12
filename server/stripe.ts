import Stripe from "stripe";
import * as db from "./db";

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

export { stripe };

/**
 * Create a Stripe Checkout Session for a course purchase
 */
export async function createCheckoutSession(params: {
  courseId: number;
  userId: number;
  userEmail: string;
  userName: string;
  billingInterval?: "month" | "year"; // For subscriptions
  origin: string;
}): Promise<string> {
  const { courseId, userId, userEmail, userName, billingInterval, origin } = params;

  // Fetch course details
  const course = await db.getCourseById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  // Determine which Stripe Price ID to use
  let stripePriceId: string | null = null;
  let mode: "payment" | "subscription" = "payment";

  if (course.paymentType === "onetime") {
    stripePriceId = course.stripePriceIdOnetime;
    mode = "payment";
  } else if (course.paymentType === "subscription") {
    mode = "subscription";
    if (billingInterval === "year") {
      stripePriceId = course.stripePriceIdYearly;
    } else {
      stripePriceId = course.stripePriceIdMonthly;
    }
  }

  if (!stripePriceId) {
    throw new Error("Course does not have a valid Stripe Price ID configured");
  }

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode,
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    success_url: `${origin}/courses/${courseId}?success=true`,
    cancel_url: `${origin}/courses/${courseId}?canceled=true`,
    customer_email: userEmail,
    client_reference_id: userId.toString(),
    metadata: {
      user_id: userId.toString(),
      course_id: courseId.toString(),
      customer_email: userEmail,
      customer_name: userName,
    },
    allow_promotion_codes: true,
  });

  return session.url || "";
}

/**
 * Handle Stripe webhook events
 */
export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  console.log(`[Stripe Webhook] Received event: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaid(invoice);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCancelled(subscription);
      break;
    }

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const userId = parseInt(session.metadata?.user_id || "0");
  const courseId = parseInt(session.metadata?.course_id || "0");

  if (!userId || !courseId) {
    console.error("[Stripe] Missing user_id or course_id in session metadata");
    return;
  }

  const course = await db.getCourseById(courseId);
  if (!course) {
    console.error(`[Stripe] Course ${courseId} not found`);
    return;
  }

  // Check if enrollment already exists
  const existingEnrollment = await db.getEnrollmentByUserAndCourse(userId, courseId);
  if (existingEnrollment) {
    console.log(`[Stripe] User ${userId} already enrolled in course ${courseId}`);
    return;
  }

  // Create enrollment
  const enrollmentData: any = {
    userId,
    courseId,
    enrolledAt: new Date(),
    isActive: 1,
    progress: 0,
  };

  if (course.paymentType === "onetime") {
    enrollmentData.stripePaymentIntentId = session.payment_intent as string;
  } else if (course.paymentType === "subscription") {
    enrollmentData.stripeSubscriptionId = session.subscription as string;
  }

  await db.createEnrollment(enrollmentData);

  // Create payment record
  await db.createPayment({
    userId,
    courseId,
    stripePaymentIntentId: session.payment_intent as string,
    amountUsd: session.amount_total || 0,
    paymentType: course.paymentType,
    status: "succeeded",
  });

  console.log(`[Stripe] Enrollment created for user ${userId} in course ${courseId}`);
}

/**
 * Handle subscription invoice payment
 */
async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = (invoice as any).subscription as string | undefined;
  if (!subscriptionId) return;

  // Find enrollment by subscription ID
  const db_instance = await db.getDb();
  if (!db_instance) return;

  const { enrollments } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db_instance
    .select()
    .from(enrollments)
    .where(eq(enrollments.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (result.length === 0) {
    console.log(`[Stripe] No enrollment found for subscription ${subscriptionId}`);
    return;
  }

  const enrollment = result[0];

  // Create payment record for this billing cycle
  await db.createPayment({
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    stripeInvoiceId: invoice.id,
    amountUsd: invoice.amount_paid,
    paymentType: "subscription",
    status: "succeeded",
  });

  console.log(`[Stripe] Subscription payment recorded for enrollment ${enrollment.id}`);
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCancelled(subscription: Stripe.Subscription): Promise<void> {
  const subscriptionId = subscription.id;

  // Find enrollment by subscription ID
  const db_instance = await db.getDb();
  if (!db_instance) return;

  const { enrollments } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db_instance
    .select()
    .from(enrollments)
    .where(eq(enrollments.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (result.length === 0) {
    console.log(`[Stripe] No enrollment found for subscription ${subscriptionId}`);
    return;
  }

  const enrollment = result[0];

  // Deactivate enrollment
  await db_instance
    .update(enrollments)
    .set({ isActive: 0 })
    .where(eq(enrollments.id, enrollment.id));

  console.log(`[Stripe] Enrollment ${enrollment.id} deactivated due to subscription cancellation`);
}
