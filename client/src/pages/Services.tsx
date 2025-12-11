import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "life-coaching",
      icon: "🎯",
      title: { en: "General Life Coaching", es: "Coaching de Vida General" },
      desc: {
        en: "A collaborative process designed to help you identify your goals, overcome obstacles, and create a roadmap for success. Whether you're feeling stuck in your career, relationships, or personal growth, I provide the guidance and accountability you need.",
        es: "Un proceso colaborativo diseñado para ayudarte a identificar tus metas, superar obstáculos y crear una hoja de ruta para el éxito. Ya sea que te sientas estancado en tu carrera, relaciones o crecimiento personal, proporciono la guía y responsabilidad que necesitas."
      },
      benefits: {
        en: ["Clarity on life goals", "Improved decision making", "Better work-life balance", "Increased confidence"],
        es: ["Claridad en metas de vida", "Mejor toma de decisiones", "Mejor equilibrio vida-trabajo", "Mayor confianza"]
      }
    },
    {
      id: "family-therapy",
      icon: "👨‍👩‍👧‍👦",
      title: { en: "Family Therapy", es: "Terapia Familiar" },
      desc: {
        en: "Strengthen family bonds and resolve conflicts in a safe, neutral environment. We work together to improve communication, understand family dynamics, and build a supportive home environment for everyone.",
        es: "Fortalece los lazos familiares y resuelve conflictos en un entorno seguro y neutral. Trabajamos juntos para mejorar la comunicación, entender las dinámicas familiares y construir un hogar de apoyo para todos."
      },
      benefits: {
        en: ["Better communication", "Conflict resolution skills", "Understanding dynamics", "Stronger connections"],
        es: ["Mejor comunicación", "Habilidades de resolución de conflictos", "Entendimiento de dinámicas", "Conexiones más fuertes"]
      }
    },
    {
      id: "relationship-coaching",
      icon: "❤️",
      title: { en: "Relationship Coaching", es: "Coaching de Pareja" },
      desc: {
        en: "Whether you're single, dating, or married, learn to navigate the complexities of relationships. We focus on building intimacy, trust, and effective communication patterns.",
        es: "Ya seas soltero, estés saliendo o casado, aprende a navegar las complejidades de las relaciones. Nos enfocamos en construir intimidad, confianza y patrones de comunicación efectivos."
      },
      benefits: {
        en: ["Deepened intimacy", "Trust building", "Effective communication", "Healthy boundaries"],
        es: ["Intimidad profundizada", "Construcción de confianza", "Comunicación efectiva", "Límites saludables"]
      }
    },
    {
      id: "inner-child",
      icon: "✨",
      title: { en: "Healing Your Inner Child", es: "Sanando Tu Niño Interior" },
      desc: {
        en: "Reconnect with the wounded parts of yourself to release past trauma and emotional blockages. This profound work allows you to live more fully in the present with joy and authenticity.",
        es: "Reconecta con las partes heridas de ti mismo para liberar traumas pasados y bloqueos emocionales. Este trabajo profundo te permite vivir más plenamente en el presente con alegría y autenticidad."
      },
      benefits: {
        en: ["Emotional release", "Self-compassion", "Healing past trauma", "Authentic living"],
        es: ["Liberación emocional", "Autocompasión", "Sanación de traumas pasados", "Vida auténtica"]
      }
    }
  ];

  return (
    <Layout>
      {(lang) => (
        <div className="pb-20">
          {/* Header */}
          <div className="bg-primary/5 py-20">
            <div className="container text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold">
                {lang === "en" ? "My Services" : "Mis Servicios"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "en" 
                  ? "Comprehensive coaching and therapy solutions tailored to your unique journey."
                  : "Soluciones integrales de coaching y terapia adaptadas a tu viaje único."}
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="container mt-16 grid gap-12">
            {services.map((service, idx) => (
              <div 
                key={service.id} 
                className={`flex flex-col lg:flex-row gap-8 items-start p-8 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0 w-full lg:w-1/3 aspect-video lg:aspect-square rounded-2xl bg-secondary/10 flex items-center justify-center text-8xl">
                  {service.icon}
                </div>
                
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-heading font-bold text-primary">
                    {lang === "en" ? service.title.en : service.title.es}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {lang === "en" ? service.desc.en : service.desc.es}
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-foreground">
                      {lang === "en" ? "Key Benefits:" : "Beneficios Clave:"}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {(lang === "en" ? service.benefits.en : service.benefits.es).map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link href="/booking">
                      <Button size="lg" className="rounded-full px-8">
                        {lang === "en" ? "Book This Service" : "Reservar Este Servicio"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="container mt-20">
            <div className="bg-primary text-primary-foreground rounded-[3rem] p-12 text-center space-y-6 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold">
                {lang === "en" ? "Not sure which path is right for you?" : "¿No estás seguro de qué camino es el correcto?"}
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {lang === "en" 
                  ? "Schedule a free 15-minute consultation to discuss your needs and find the best fit."
                  : "Programa una consulta gratuita de 15 minutos para discutir tus necesidades y encontrar la mejor opción."}
              </p>
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="rounded-full px-8 text-lg font-bold h-14">
                  {lang === "en" ? "Schedule Free Call" : "Agendar Llamada Gratis"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
