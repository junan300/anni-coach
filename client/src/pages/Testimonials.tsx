import Layout from "@/components/Layout";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Life Coaching Client",
      rating: 5,
      text: {
        en: "Working with Anni has been a transformative experience. Her ability to listen without judgment and provide actionable guidance helped me navigate a difficult career transition. I feel more confident and aligned with my purpose than ever before.",
        es: "Trabajar con Anni ha sido una experiencia transformadora. Su capacidad para escuchar sin juzgar y proporcionar orientación práctica me ayudó a navegar una difícil transición profesional. Me siento más segura y alineada con mi propósito que nunca."
      }
    },
    {
      id: 2,
      name: "Carlos R.",
      role: "Relationship Coaching Client",
      rating: 5,
      text: {
        en: "My wife and I were on the brink of separation. Anni's relationship coaching gave us the tools to communicate effectively and understand each other's needs. We are now happier and stronger together.",
        es: "Mi esposa y yo estábamos al borde de la separación. El coaching de pareja de Anni nos dio las herramientas para comunicarnos efectivamente y entender las necesidades del otro. Ahora somos más felices y fuertes juntos."
      }
    },
    {
      id: 3,
      name: "Elena G.",
      role: "Inner Child Healing Client",
      rating: 5,
      text: {
        en: "The inner child work with Anni was profound. I released years of pent-up emotion and finally feel at peace with my past. She creates such a safe and nurturing environment for deep healing.",
        es: "El trabajo del niño interior con Anni fue profundo. Liberé años de emociones reprimidas y finalmente me siento en paz con mi pasado. Ella crea un ambiente tan seguro y nutritivo para una sanación profunda."
      }
    },
    {
      id: 4,
      name: "Michael T.",
      role: "Family Therapy Client",
      rating: 5,
      text: {
        en: "Anni helped our family bridge the gap between generations. Her bilingual skills were essential as she could communicate effectively with my Spanish-speaking parents and my English-speaking children.",
        es: "Anni ayudó a nuestra familia a cerrar la brecha entre generaciones. Sus habilidades bilingües fueron esenciales ya que pudo comunicarse efectivamente con mis padres que hablan español y mis hijos que hablan inglés."
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
                {lang === "en" ? "Client Stories" : "Historias de Clientes"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "en" 
                  ? "Read about the journeys of transformation from people just like you."
                  : "Lee sobre los viajes de transformación de personas como tú."}
              </p>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="container mt-16 grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-card p-8 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-md transition-all relative">
                <Quote className="absolute top-8 right-8 h-12 w-12 text-primary/10" />
                
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{lang === "en" ? t.text.en : t.text.es}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
