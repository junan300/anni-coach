import express from "express";
import { stripe, handleWebhookEvent } from "../stripe";

export function registerStripeWebhook(app: express.Application) {
  // CRITICAL: This route MUST use express.raw() middleware, NOT express.json()
  // It must be registered BEFORE the express.json() middleware in index.ts
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];

      if (!sig) {
        console.error("[Stripe Webhook] Missing stripe-signature header");
        return res.status(400).send("Missing signature");
      }

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET || ""
        );
      } catch (err: any) {
        console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // CRITICAL: Test events MUST return this exact response structure
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({
          verified: true,
        });
      }

      // Handle the event
      try {
        await handleWebhookEvent(event);
        res.json({ received: true });
      } catch (error: any) {
        console.error(`[Stripe Webhook] Error handling event: ${error.message}`);
        res.status(500).send(`Webhook handler failed: ${error.message}`);
      }
    }
  );
}
