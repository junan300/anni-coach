import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

interface FooterProps {
  lang: "en" | "es";
}

export default function Footer({ lang }: FooterProps) {
  const content = {
    en: {
      about: "Transforming lives through professional coaching and therapy. Helping you find balance, healing, and purpose.",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      rights: "All rights reserved.",
      location: "Hoover, Alabama (In-person) & Worldwide (Online)",
    },
    es: {
      about: "Transformando vidas a través del coaching profesional y la terapia. Ayudándote a encontrar equilibrio, sanación y propósito.",
      quickLinks: "Enlaces Rápidos",
      contact: "Contáctanos",
      rights: "Todos los derechos reservados.",
      location: "Hoover, Alabama (Presencial) y Mundial (Online)",
    },
  };

  const t = lang === "en" ? content.en : content.es;

  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-primary">Anni Aguilar</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              {t.about}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.instagram.com/anniaguilarcoach/#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/anniaguilarcoach" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/anniaguilar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {lang === "en" ? "About Me" : "Sobre Mí"}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {lang === "en" ? "Services" : "Servicios"}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {lang === "en" ? "Testimonials" : "Testimonios"}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                    {lang === "en" ? "Book Now" : "Reservar Ahora"}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-lg">{t.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{t.location}</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:8324725069" className="hover:text-primary transition-colors">
                  (832) 472-5069
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:anniaguilarcoach@gmail.com" className="hover:text-primary transition-colors">
                  anniaguilarcoach@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Anni Aguilar. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
