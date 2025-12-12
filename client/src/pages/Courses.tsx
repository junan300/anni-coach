import Layout from "@/components/Layout";
import { BookOpen, Clock, Star } from "lucide-react";

export default function Courses() {
  return (
    <Layout>
      {(lang) => (
        <div className="min-h-screen py-20">
          <div className="container">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                {lang === "en" ? "Online Courses" : "Cursos en Línea"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {lang === "en"
                  ? "Transform your life with our comprehensive coaching programs."
                  : "Transforma tu vida con nuestros programas integrales de coaching."}
              </p>
            </div>

            {/* Coming Soon State */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-3xl border border-border/50 p-12 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-foreground">
                  {lang === "en" ? "Courses Coming Soon!" : "¡Cursos Próximamente!"}
                </h2>
                
                <p className="text-muted-foreground max-w-md mx-auto">
                  {lang === "en"
                    ? "We're preparing amazing courses to help you on your personal growth journey. Check back soon!"
                    : "Estamos preparando cursos increíbles para ayudarte en tu camino de crecimiento personal. ¡Vuelve pronto!"}
                </p>

                {/* Feature Preview */}
                <div className="grid md:grid-cols-3 gap-6 pt-8">
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm">
                      {lang === "en" ? "Expert Content" : "Contenido Experto"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {lang === "en"
                        ? "Professional coaching materials"
                        : "Materiales profesionales de coaching"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm">
                      {lang === "en" ? "Learn at Your Pace" : "Aprende a Tu Ritmo"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {lang === "en"
                        ? "Lifetime access to materials"
                        : "Acceso de por vida a materiales"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Star className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm">
                      {lang === "en" ? "Proven Methods" : "Métodos Probados"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {lang === "en"
                        ? "Based on 7+ years experience"
                        : "Basado en más de 7 años de experiencia"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
