import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, BookOpen, Heart } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {(lang) => (
        <div className="pb-20">
          {/* Header */}
          <div className="bg-primary/5 py-20">
            <div className="container text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold">
                {lang === "en" ? "About Me" : "Sobre Mí"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "en" 
                  ? "Dedicated to guiding you towards a life of purpose and fulfillment."
                  : "Dedicada a guiarte hacia una vida de propósito y plenitud."}
              </p>
            </div>
          </div>

          <div className="container mt-16 grid lg:grid-cols-2 gap-16 items-start">
            {/* Main Content */}
            <div className="space-y-8">
              <div className="prose prose-lg text-muted-foreground">
                <p className="lead text-xl font-medium text-foreground">
                  {lang === "en"
                    ? "Hello! I'm Anni Aguilar, an ICC London Certified Life Coach with over 7 years of experience helping individuals and families navigate life's complexities."
                    : "¡Hola! Soy Anni Aguilar, Coach de Vida Certificada por ICC Londres con más de 7 años de experiencia ayudando a individuos y familias a navegar las complejidades de la vida."}
                </p>
                <p>
                  {lang === "en"
                    ? "My journey began with a deep desire to understand human behavior and emotional healing. Over the years, I have had the privilege of working with hundreds of clients, helping them break through barriers, heal past wounds, and build stronger, more meaningful relationships."
                    : "Mi viaje comenzó con un profundo deseo de entender el comportamiento humano y la sanación emocional. A lo largo de los años, he tenido el privilegio de trabajar con cientos de clientes, ayudándoles a romper barreras, sanar heridas del pasado y construir relaciones más fuertes y significativas."}
                </p>
                <p>
                  {lang === "en"
                    ? "I believe that everyone has the power to transform their life. My role is to provide the tools, support, and safe space you need to discover that power within yourself."
                    : "Creo que todos tienen el poder de transformar su vida. Mi papel es proporcionar las herramientas, el apoyo y el espacio seguro que necesitas para descubrir ese poder dentro de ti."}
                </p>
              </div>

              {/* Values/Philosophy */}
              <div className="grid sm:grid-cols-3 gap-6 pt-8">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">{lang === "en" ? "Certified" : "Certificada"}</h3>
                  <p className="text-sm text-muted-foreground">ICC London</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">{lang === "en" ? "Empathetic" : "Empática"}</h3>
                  <p className="text-sm text-muted-foreground">{lang === "en" ? "Safe Space" : "Espacio Seguro"}</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">{lang === "en" ? "Experienced" : "Experimentada"}</h3>
                  <p className="text-sm text-muted-foreground">7+ Years</p>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/booking">
                  <Button size="lg" className="rounded-full px-8">
                    {lang === "en" ? "Work With Me" : "Trabaja Conmigo"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="/images/CubiStudio-Anni-0048.jpg" 
                  alt="Coaching Session" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-muted">
                  {/* Placeholder for another photo if available, using logo for now */}
                  <img 
                    src="/images/logo_ani_aguilar_color.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-contain p-4 bg-white"
                  />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-primary/10 flex items-center justify-center p-6 text-center">
                  <div>
                    <p className="text-4xl font-bold text-primary mb-2">100+</p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {lang === "en" ? "Happy Clients" : "Clientes Felices"}
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
