import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { createCheckoutSession } from "./stripe";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  courses: router({
    list: publicProcedure.query(async () => {
      return await db.getAllPublishedCourses();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const course = await db.getCourseById(input.id);
        if (!course) {
          throw new Error("Course not found");
        }
        return course;
      }),
    
    create: adminProcedure
      .input(z.object({
        title: z.string(),
        titleEs: z.string(),
        description: z.string(),
        descriptionEs: z.string(),
        paymentType: z.enum(["onetime", "subscription"]),
        priceUsd: z.number().optional(),
        subscriptionPriceMonthly: z.number().optional(),
        subscriptionPriceYearly: z.number().optional(),
        durationWeeks: z.number(),
        thumbnailUrl: z.string().optional(),
        contentUrl: z.string().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createCourse(input);
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        titleEs: z.string().optional(),
        description: z.string().optional(),
        descriptionEs: z.string().optional(),
        priceUsd: z.number().optional(),
        durationWeeks: z.number().optional(),
        thumbnailUrl: z.string().optional(),
        contentUrl: z.string().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateCourse(id, updates);
        return { success: true };
      }),
  }),
  
  enrollments: router({
    myEnrollments: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserEnrollments(ctx.user.id);
    }),
    
    checkEnrollment: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ ctx, input }) => {
        const enrollment = await db.getEnrollmentByUserAndCourse(ctx.user.id, input.courseId);
        return { enrolled: !!enrollment, enrollment };
      }),
    
    updateProgress: protectedProcedure
      .input(z.object({
        enrollmentId: z.number(),
        progress: z.number().min(0).max(100),
      }))
      .mutation(async ({ input }) => {
        await db.updateEnrollmentProgress(input.enrollmentId, input.progress);
        return { success: true };
      }),
  }),
  
  payments: router({
    createCheckout: protectedProcedure
      .input(z.object({
        courseId: z.number(),
        billingInterval: z.enum(["month", "year"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const origin = ctx.req.headers.origin || `http://localhost:${process.env.PORT || 3000}`;
        
        const checkoutUrl = await createCheckoutSession({
          courseId: input.courseId,
          userId: ctx.user.id,
          userEmail: ctx.user.email || "",
          userName: ctx.user.name || "",
          billingInterval: input.billingInterval,
          origin,
        });
        
        return { checkoutUrl };
      }),
  }),
});

export type AppRouter = typeof appRouter;
