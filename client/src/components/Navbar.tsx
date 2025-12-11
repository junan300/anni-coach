import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavbarProps {
  lang: "en" | "es";
  toggleLang: () => void;
}

export default function Navbar({ lang, toggleLang }: NavbarProps) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = {
    en: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Testimonials", path: "/testimonials" },
      { name: "Contact", path: "/contact" },
    ],
    es: [
      { name: "Inicio", path: "/" },
      { name: "Sobre Mí", path: "/about" },
      { name: "Servicios", path: "/services" },
      { name: "Testimonios", path: "/testimonials" },
      { name: "Contacto", path: "/contact" },
    ],
  };

  const currentItems = lang === "en" ? navItems.en : navItems.es;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/images/logo_ani_aguilar_color.jpg" 
              alt="Anni Aguilar Logo" 
              className="h-12 w-auto object-contain mix-blend-multiply" 
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {currentItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <span 
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  location === item.path ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLang}
            className="flex items-center gap-2 text-primary hover:text-primary/80 hover:bg-primary/10"
          >
            <Globe className="h-4 w-4" />
            <span className="font-bold">{lang === "en" ? "ES" : "EN"}</span>
          </Button>

          <Link href="/booking">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
              {lang === "en" ? "Book Appointment" : "Reservar Cita"}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLang}
            className="flex items-center gap-1 text-primary"
          >
            <span className="font-bold">{lang === "en" ? "ES" : "EN"}</span>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-8">
                {currentItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <span 
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary cursor-pointer ${
                        location === item.path ? "text-primary font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link href="/booking">
                  <Button 
                    className="w-full bg-primary text-primary-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {lang === "en" ? "Book Appointment" : "Reservar Cita"}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
