import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Courses table - stores all available courses
 */
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  titleEs: varchar("titleEs", { length: 255 }).notNull(),
  description: text("description").notNull(),
  descriptionEs: text("descriptionEs").notNull(),
  
  // Payment model: "onetime" or "subscription"
  paymentType: mysqlEnum("paymentType", ["onetime", "subscription"]).notNull(),
  
  // For one-time purchases
  priceUsd: int("priceUsd"), // Price in cents (e.g., 9900 = $99.00)
  
  // For subscriptions
  subscriptionPriceMonthly: int("subscriptionPriceMonthly"), // Monthly price in cents
  subscriptionPriceYearly: int("subscriptionPriceYearly"), // Yearly price in cents
  
  // Stripe Product/Price IDs (for checkout)
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  stripePriceIdOnetime: varchar("stripePriceIdOnetime", { length: 255 }),
  stripePriceIdMonthly: varchar("stripePriceIdMonthly", { length: 255 }),
  stripePriceIdYearly: varchar("stripePriceIdYearly", { length: 255 }),
  
  durationWeeks: int("durationWeeks").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  contentUrl: text("contentUrl"), // Link to course materials (videos, PDFs, etc.)
  isPublished: int("isPublished").default(0).notNull(), // 0 = draft, 1 = published
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

/**
 * Enrollments table - tracks which users have purchased which courses
 */
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  
  // Payment tracking
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }), // For one-time
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }), // For subscriptions
  
  // Access control
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"), // For subscriptions or time-limited access
  isActive: int("isActive").default(1).notNull(), // 0 = cancelled/expired, 1 = active
  
  // Progress tracking
  progress: int("progress").default(0).notNull(), // 0-100 percentage
  completedAt: timestamp("completedAt"),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

/**
 * Payments table - records all payment transactions
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  
  // Stripe identifiers (store only IDs, not full payment data)
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).unique(),
  stripeInvoiceId: varchar("stripeInvoiceId", { length: 255 }), // For subscription payments
  
  // Minimal local data (fetch details from Stripe API when needed)
  amountUsd: int("amountUsd").notNull(), // Amount in cents (cached for reporting)
  paymentType: mysqlEnum("paymentType", ["onetime", "subscription"]).notNull(),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "refunded"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;