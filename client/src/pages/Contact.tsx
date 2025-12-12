import Layout from "@/components/Layout";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      {(lang) => (
        <div className="pb-20">
          {/* Header */}
          <div className="bg-primary/5 py-20">
            <div className="container text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold">
                {lang === "en" ? "Get in Touch" : "Contáctame"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "en" 
                  ? "Have questions? I'm here to help you start your journey."
                  : "¿Tienes preguntas? Estoy aquí para ayudarte a comenzar tu viaje."}
              </p>
            </div>
          </div>

          <div className="container mt-16">
            {/* Contact Info */}
            <div className="space-y-12 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold">
                  {lang === "en" ? "Contact Information" : "Información de Contacto"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {lang === "en"
                    ? "Feel free to reach out via phone or email. I offer both in-person sessions in Hoover, AL and online sessions worldwide."
                    : "Siéntete libre de contactarme por teléfono o correo. Ofrezco sesiones presenciales en Hoover, AL y sesiones en línea a nivel mundial."}
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lang === "en" ? "Phone" : "Teléfono"}</h3>
                    <a href="tel:8324725069" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      (832) 472-5069
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lang === "en" ? "Email" : "Correo Electrónico"}</h3>
                    <a href="mailto:anniaguilarcoach@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      anniaguilarcoach@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lang === "en" ? "Location" : "Ubicación"}</h3>
                    <p className="text-muted-foreground text-lg">
                      Hoover, Alabama<br />
                      <span className="text-sm opacity-80">
                        {lang === "en" ? "(In-person & Online)" : "(Presencial y En Línea)"}
                      </span>
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
