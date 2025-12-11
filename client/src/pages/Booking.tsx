import Layout from "@/components/Layout";
import { useEffect } from "react";

export default function Booking() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      {(lang) => (
        <div className="pb-20">
          {/* Header */}
          <div className="bg-primary/5 py-20">
            <div className="container text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold">
                {lang === "en" ? "Book Your Session" : "Reserva Tu Sesión"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {lang === "en" 
                  ? "Take the first step towards transformation. Choose a time that works for you."
                  : "Da el primer paso hacia la transformación. Elige un horario que te convenga."}
              </p>
            </div>
          </div>

          <div className="container mt-12">
            {/* Calendly Inline Widget */}
            <div 
              className="calendly-inline-widget w-full h-[700px] rounded-[2rem] overflow-hidden border border-border/50 shadow-lg bg-card" 
              data-url="https://calendly.com/anniaguilar" 
              style={{ minWidth: '320px', height: '700px' }} 
            />
            
            <div className="mt-12 text-center max-w-2xl mx-auto space-y-4">
              <h3 className="text-xl font-bold">
                {lang === "en" ? "Payment Information" : "Información de Pago"}
              </h3>
              <p className="text-muted-foreground">
                {lang === "en"
                  ? "Payments can be made via Zelle or Stripe after booking confirmation. Details will be provided in your confirmation email."
                  : "Los pagos pueden realizarse vía Zelle o Stripe después de la confirmación de la reserva. Los detalles se proporcionarán en su correo de confirmación."}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
