import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, Award } from "lucide-react";
import { Link, Redirect } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const enrollmentsQuery = trpc.enrollments.myEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <Layout>
        {() => (
          <div className="min-h-screen flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const enrollments = enrollmentsQuery.data || [];

  return (
    <Layout>
      {(lang) => (
        <div className="min-h-screen py-20">
          <div className="container max-w-6xl">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                {lang === "en" ? `Welcome back, ${user?.name || "Student"}!` : `¡Bienvenido/a, ${user?.name || "Estudiante"}!`}
              </h1>
              <p className="text-muted-foreground">
                {lang === "en" ? "Continue your learning journey" : "Continúa tu camino de aprendizaje"}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {lang === "en" ? "Enrolled Courses" : "Cursos Inscritos"}
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{enrollments.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {lang === "en" ? "In Progress" : "En Progreso"}
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enrollments.filter(e => e.progress > 0 && e.progress < 100).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {lang === "en" ? "Completed" : "Completados"}
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {enrollments.filter(e => e.progress === 100).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enrolled Courses */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {lang === "en" ? "My Courses" : "Mis Cursos"}
              </h2>

              {enrollments.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      {lang === "en" ? "No courses yet" : "Aún no tienes cursos"}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      {lang === "en"
                        ? "Start your learning journey by enrolling in a course."
                        : "Comienza tu camino de aprendizaje inscribiéndote en un curso."}
                    </p>
                    <Link href="/courses">
                      <Button>
                        {lang === "en" ? "Browse Courses" : "Ver Cursos"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>
                          {lang === "en" ? "Course" : "Curso"} #{enrollment.courseId}
                        </CardTitle>
                        <CardDescription>
                          {lang === "en" ? "Enrolled on" : "Inscrito el"}{" "}
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>{lang === "en" ? "Progress" : "Progreso"}</span>
                              <span className="font-bold">{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </div>
                          <Button className="w-full" variant="outline">
                            {lang === "en" ? "Continue Learning" : "Continuar Aprendiendo"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
