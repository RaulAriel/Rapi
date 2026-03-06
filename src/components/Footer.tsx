"use client";

import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 relative bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/src/assets/logo.svg" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-lg font-black tracking-tighter">
              RAÚL<span className="text-primary">ARIEL</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#hero" className="hover:text-primary transition-colors">Inicio</a>
            <a href="#about" className="hover:text-primary transition-colors">Sobre Mí</a>
            <a href="#projects" className="hover:text-primary transition-colors">Proyectos</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contacto</a>
          </div>

          <div className="text-sm text-muted-foreground flex items-center gap-2">
            © {currentYear} — Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> por Raúl Ariel
          </div>
        </div>
        
        <div className="mt-12 text-center text-[10px] text-muted-foreground/30 font-mono uppercase tracking-[0.5em]">
          Construyendo el futuro una línea de código a la vez
        </div>
      </div>
    </footer>
  );
};