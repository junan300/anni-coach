import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, courses, Course, InsertCourse, enrollments, Enrollment, InsertEnrollment, payments, Payment, InsertPayment } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ========== Course Management ==========

export async function getAllPublishedCourses(): Promise<Course[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(courses).where(eq(courses.isPublished, 1));
  return result;
}

export async function getCourseById(courseId: number): Promise<Course | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCourse(course: InsertCourse): Promise<Course> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(courses).values(course);
  const insertedId = Number(result[0].insertId);
  const newCourse = await getCourseById(insertedId);
  if (!newCourse) throw new Error("Failed to retrieve created course");
  return newCourse;
}

export async function updateCourse(courseId: number, updates: Partial<InsertCourse>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(courses).set(updates).where(eq(courses.id, courseId));
}

// ========== Enrollment Management ==========

export async function getUserEnrollments(userId: number): Promise<Enrollment[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  return result;
}

export async function getEnrollmentByUserAndCourse(userId: number, courseId: number): Promise<Enrollment | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  

  const result = await db.select().from(enrollments)
    .where(and(
      eq(enrollments.userId, userId),
      eq(enrollments.courseId, courseId)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(enrollments).values(enrollment);
  const insertedId = Number(result[0].insertId);
  
  const newEnrollment = await db.select().from(enrollments).where(eq(enrollments.id, insertedId)).limit(1);
  if (!newEnrollment[0]) throw new Error("Failed to retrieve created enrollment");
  return newEnrollment[0];
}

export async function updateEnrollmentProgress(enrollmentId: number, progress: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updates: Partial<InsertEnrollment> = { progress };
  if (progress >= 100) {
    updates.completedAt = new Date();
  }
  
  await db.update(enrollments).set(updates).where(eq(enrollments.id, enrollmentId));
}

// ========== Payment Management ==========

export async function createPayment(payment: InsertPayment): Promise<Payment> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(payments).values(payment);
  const insertedId = Number(result[0].insertId);
  
  const newPayment = await db.select().from(payments).where(eq(payments.id, insertedId)).limit(1);
  if (!newPayment[0]) throw new Error("Failed to retrieve created payment");
  return newPayment[0];
}

export async function updatePaymentStatus(paymentId: number, status: "pending" | "succeeded" | "failed" | "refunded"): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(payments).set({ status }).where(eq(payments.id, paymentId));
}

export async function getPaymentByStripeId(stripePaymentIntentId: string): Promise<Payment | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(payments).where(eq(payments.stripePaymentIntentId, stripePaymentIntentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
