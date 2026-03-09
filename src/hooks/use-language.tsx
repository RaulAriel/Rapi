"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "hero.badge": "Diseñador & Desarrollador Frontend",
    "hero.title1": "CONSTRUYENDO EL",
    "hero.title2": "FUTURO DIGITAL",
    "hero.desc": "Transformo tus ideas en experiencias digitales de alto impacto que impulsan tu negocio. Especializado en diseño moderno, desarrollo web escalable y soluciones centradas en resultados.",
    "hero.cta1": "Ver Proyectos",
    "hero.cta2": "Contactar",
    "about.title": "Sobre Mí",
    "about.subtitle": "Fusionando creatividad y tecnología para dar vida a visiones digitales audaces.",
    "about.bio": "Biografía Profesional",
    "about.p1": "Soy un apasionado de la intersección entre el arte digital y la ingeniería de software. Mi enfoque se basa en romper los moldes tradicionales para crear experiencias web únicas.",
    "about.p2": "Desde el diseño de marca hasta el despliegue en la nube, manejo cada etapa del proceso con una mentalidad obsesionada con el detalle.",
    "about.exp": "Experiencia",
    "services.title": "Servicios Premium",
    "services.subtitle": "Soluciones digitales integrales diseñadas para conquistar el mañana.",
    "process.title": "Mi Proceso Creativo",
    "process.subtitle": "De la idea al despliegue final siguiendo un flujo de trabajo optimizado.",
    "projects.title": "Proyectos Destacados",
    "projects.subtitle": "Una selección de misiones digitales completadas con éxito.",
    "projects.visit": "Visitar Sitio",
    "projects.code": "Código",
    "faq.title": "Preguntas Frecuentes",
    "faq.subtitle": "Despeja tus dudas sobre el proceso de trabajo y colaboración.",
    "contact.title": "Contacto",
    "contact.subtitle": "¿Listo para iniciar tu próxima misión digital? Envíame un mensaje.",
    "contact.info": "Información de Enlace",
    "contact.social": "Redes Sociales",
    "contact.name": "Nombre Completo",
    "contact.email": "Correo Electrónico",
    "contact.phone": "Teléfono / WhatsApp",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "footer.made": "Hecho con",
    "footer.by": "por Raúl Ariel",
    "footer.slogan": "Construyendo el futuro una línea de código a la vez",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.badge": "Designer & Frontend Developer",
    "hero.title1": "BUILDING THE",
    "hero.title2": "DIGITAL FUTURE",
    "hero.desc": "I transform your ideas into high-impact digital experiences that drive your business. Specialized in modern design, scalable web development, and result-oriented solutions.",
    "hero.cta1": "View Projects",
    "hero.cta2": "Contact Me",
    "about.title": "About Me",
    "about.subtitle": "Merging creativity and technology to bring bold digital visions to life.",
    "about.bio": "Professional Biography",
    "about.p1": "I am passionate about the intersection of digital art and software engineering. My approach is based on breaking traditional molds to create unique web experiences.",
    "about.p2": "From brand design to cloud deployment, I handle every stage of the process with a detail-obsessed mindset.",
    "about.exp": "Experience",
    "services.title": "Premium Services",
    "services.subtitle": "Comprehensive digital solutions designed to conquer tomorrow.",
    "process.title": "My Creative Process",
    "process.subtitle": "From idea to final deployment following an optimized workflow.",
    "projects.title": "Featured Projects",
    "projects.subtitle": "A selection of digital missions successfully completed.",
    "projects.visit": "Visit Site",
    "projects.code": "Code",
    "faq.title": "FAQ",
    "faq.subtitle": "Clear your doubts about the work process and collaboration.",
    "contact.title": "Contact",
    "contact.subtitle": "Ready to start your next digital mission? Send me a message.",
    "contact.info": "Link Information",
    "contact.social": "Social Media",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone / WhatsApp",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "footer.made": "Made with",
    "footer.by": "by Raúl Ariel",
    "footer.slogan": "Building the future one line of code at a time",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};