import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: (lang: "en" | "es") => React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Initialize language from localStorage or default to 'en'
  const [lang, setLang] = useState<"en" | "es">(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" || saved === "es") ? saved : "es";
  });

  const toggleLang = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Navbar lang={lang} toggleLang={toggleLang} />
      <main className="flex-1">
        {children(lang)}
      </main>
      <Footer lang={lang} />
    </div>
  );
}
