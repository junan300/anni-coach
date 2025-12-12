import Layout from "@/components/Layout";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";
import { Link, Redirect } from "wouter";
import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const coursesQuery = trpc.courses.list.useQuery();

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

  if (!isAuthenticated || user?.role !== "admin") {
    return <Redirect to="/" />;
  }

  const courses = coursesQuery.data || [];

  return (
    <Layout>
      {(lang) => (
        <div className="min-h-screen py-20">
          <div className="container max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
                  {lang === "en" ? "Manage Courses" : "Gestionar Cursos"}
                </h1>
                <p className="text-muted-foreground">
                  {lang === "en" ? "Create and manage your course offerings" : "Crea y gestiona tus ofertas de cursos"}
                </p>
              </div>
              <Link href="/admin/courses/new">
                <Button size="lg" className="gap-2">
                  <Plus className="h-5 w-5" />
                  {lang === "en" ? "New Course" : "Nuevo Curso"}
                </Button>
              </Link>
            </div>

            {/* Courses List */}
            <div>
              {courses.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Plus className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      {lang === "en" ? "No courses yet" : "Aún no hay cursos"}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md">
                      {lang === "en"
                        ? "Create your first course to start offering online programs."
                        : "Crea tu primer curso para comenzar a ofrecer programas en línea."}
                    </p>
                    <Link href="/admin/courses/new">
                      <Button>
                        {lang === "en" ? "Create Course" : "Crear Curso"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-3">
                              <CardTitle>{lang === "en" ? course.title : course.titleEs}</CardTitle>
                              <Badge variant={course.isPublished ? "default" : "secondary"}>
                                {course.isPublished ? (
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {lang === "en" ? "Published" : "Publicado"}
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <EyeOff className="h-3 w-3" />
                                    {lang === "en" ? "Draft" : "Borrador"}
                                  </span>
                                )}
                              </Badge>
                              <Badge variant="outline">
                                {course.paymentType === "onetime" 
                                  ? (lang === "en" ? "One-time" : "Único")
                                  : (lang === "en" ? "Subscription" : "Suscripción")}
                              </Badge>
                            </div>
                            <CardDescription className="line-clamp-2">
                              {lang === "en" ? course.description : course.descriptionEs}
                            </CardDescription>
                          </div>
                          <Link href={`/admin/courses/${course.id}/edit`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Edit className="h-4 w-4" />
                              {lang === "en" ? "Edit" : "Editar"}
                            </Button>
                          </Link>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">
                              {lang === "en" ? "Duration:" : "Duración:"}{" "}
                            </span>
                            {course.durationWeeks} {lang === "en" ? "weeks" : "semanas"}
                          </div>
                          <div>
                            <span className="font-medium">
                              {lang === "en" ? "Price:" : "Precio:"}{" "}
                            </span>
                            {course.paymentType === "onetime" 
                              ? `$${((course.priceUsd || 0) / 100).toFixed(2)}`
                              : `$${((course.subscriptionPriceMonthly || 0) / 100).toFixed(2)}/mo`}
                          </div>
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
