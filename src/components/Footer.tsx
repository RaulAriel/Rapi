"use client";

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 relative bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo size="sm" className="group-hover:neon-border-violet transition-all" />
            <span className="text-lg font-black tracking-tighter group-hover:text-primary transition-colors">
              RAÚL<span className="text-primary">ARIEL</span>
            </span>
          </Link>

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