import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! / ¡Mensaje enviado con éxito!");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

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

          <div className="container mt-16 grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-heading font-bold">
                  {lang === "en" ? "Contact Information" : "Información de Contacto"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {lang === "en"
                    ? "Feel free to reach out via phone, email, or the contact form. I offer both in-person sessions in Hoover, AL and online sessions worldwide."
                    : "Siéntete libre de contactarme por teléfono, correo o el formulario. Ofrezco sesiones presenciales en Hoover, AL y sesiones en línea a nivel mundial."}
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
                    <a href="mailto:contact@anniaguilar.com" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                      contact@anniaguilar.com
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

            {/* Contact Form */}
            <div className="bg-card p-8 md:p-10 rounded-[2rem] border border-border/50 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{lang === "en" ? "Full Name" : "Nombre Completo"}</Label>
                  <Input id="name" required placeholder="John Doe" className="h-12 rounded-xl" />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">{lang === "en" ? "Email" : "Correo"}</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{lang === "en" ? "Phone (Optional)" : "Teléfono (Opcional)"}</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" className="h-12 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{lang === "en" ? "Message" : "Mensaje"}</Label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder={lang === "en" ? "How can I help you?" : "¿Cómo puedo ayudarte?"}
                    className="min-h-[150px] rounded-xl resize-none" 
                  />
                </div>

                <Button type="submit" size="lg" className="w-full h-12 rounded-xl text-lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {lang === "en" ? "Send Message" : "Enviar Mensaje"} <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
