import { describe, it, expect, beforeAll } from "vitest";
import * as db from "../server/db";

describe("Course Management System", () => {
  let testCourseId: number;

  beforeAll(async () => {
    // Wait for database to be ready
    const dbInstance = await db.getDb();
    expect(dbInstance).toBeDefined();
  });

  it("should create a new course", async () => {
    const course = await db.createCourse({
      title: "Test Course",
      titleEs: "Curso de Prueba",
      description: "A test course for automated testing",
      descriptionEs: "Un curso de prueba para pruebas automatizadas",
      paymentType: "onetime",
      priceUsd: 9900, // $99.00
      durationWeeks: 8,
      isPublished: 1,
    });

    expect(course).toBeDefined();
    expect(course.id).toBeTypeOf("number");
    expect(course.title).toBe("Test Course");
    expect(course.paymentType).toBe("onetime");
    expect(course.priceUsd).toBe(9900);

    testCourseId = course.id;
  });

  it("should retrieve all published courses", async () => {
    const courses = await db.getAllPublishedCourses();
    expect(courses).toBeDefined();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  it("should retrieve a specific course by ID", async () => {
    const course = await db.getCourseById(testCourseId);
    expect(course).toBeDefined();
    expect(course?.id).toBe(testCourseId);
    expect(course?.title).toBe("Test Course");
  });

  it("should create an enrollment", async () => {
    const enrollment = await db.createEnrollment({
      userId: 999,
      courseId: testCourseId,
      paymentIntentId: "pi_test_123",
      amountPaid: 9900,
    });

    expect(enrollment).toBeDefined();
    expect(enrollment.userId).toBe(999);
    expect(enrollment.courseId).toBe(testCourseId);
    expect(enrollment.progress).toBe(0);
  });

  it("should retrieve user enrollments", async () => {
    const enrollments = await db.getUserEnrollments(999);
    expect(enrollments).toBeDefined();
    expect(Array.isArray(enrollments)).toBe(true);
    expect(enrollments.length).toBeGreaterThan(0);
    expect(enrollments[0].userId).toBe(999);
  });

  it("should check enrollment status", async () => {
    const enrollment = await db.getEnrollmentByUserAndCourse(999, testCourseId);
    expect(enrollment).toBeDefined();
    expect(enrollment?.userId).toBe(999);
    expect(enrollment?.courseId).toBe(testCourseId);
  });

  it("should update enrollment progress", async () => {
    const enrollments = await db.getUserEnrollments(999);
    const enrollmentId = enrollments[0].id;

    await db.updateEnrollmentProgress(enrollmentId, 50);

    const updatedEnrollments = await db.getUserEnrollments(999);
    const updatedEnrollment = updatedEnrollments.find(e => e.id === enrollmentId);

    expect(updatedEnrollment).toBeDefined();
    expect(updatedEnrollment?.progress).toBe(50);
  });

  it("should create a subscription course", async () => {
    const course = await db.createCourse({
      title: "Subscription Course",
      titleEs: "Curso de Suscripción",
      description: "A subscription-based course",
      descriptionEs: "Un curso basado en suscripción",
      paymentType: "subscription",
      subscriptionPriceMonthly: 2900, // $29.00/month
      subscriptionPriceYearly: 29900, // $299.00/year
      durationWeeks: 12,
      isPublished: 1,
    });

    expect(course).toBeDefined();
    expect(course.paymentType).toBe("subscription");
    expect(course.subscriptionPriceMonthly).toBe(2900);
    expect(course.subscriptionPriceYearly).toBe(29900);
  });
});
