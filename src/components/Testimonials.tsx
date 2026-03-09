"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Quote, Star } from "lucide-react";
import albertPhoto from "@/assets/albert.png";
import alejandraPhoto from "@/assets/alejandra.png";
import josePhoto from "@/assets/jose.png";

const testimonials = [
  {
    name: "Albert Viedma",
    role: "Dueño de Decode-bar",
    image: albertPhoto,
    text: "Desde que lanzamos la nueva página, nuestros clientes entienden mejor lo que ofrecemos y nos contactan con más facilidad. Ahora recibimos reservas y consultas por correo y WhatsApp todos los días, y hemos notado un incremento claro en nuevos clientes."
  },
  {
    name: "Alejandra Glez",
    role: "Artista",
    image: alejandraPhoto,
    text: "La nueva web me permitió organizar todas mis obras por categorías y crear una galería cuidada. Ahora tengo un portafolio digital que refleja mi estilo y me ayuda a presentar mi arte con elegancia y profesionalidad."
  },
  {
    name: "Jose Neira Tejeda",
    role: "ESCALAHOUSE partner",
    image: josePhoto,
    text: "Con la nueva web logramos mostrar todo lo que representa mi espacio: arte, gastronomía y experiencias. Ahora los visitantes pueden descubrir fácilmente nuestros eventos, exposiciones y menús. La página combina estética y funcionalidad."
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background/50 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Casos de Éxito" 
          subtitle="Lo que dicen mis clientes sobre la transformación de su presencia digital."
        />

        <div className="grid lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassCard 
                className="p-0 overflow-hidden flex flex-col h-full border-white/5" 
                hoverGlow={false}
              >
                {/* Foto - Ocupa la parte superior */}
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                </div>

                {/* Contenido */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-background/20 backdrop-blur-sm">
                  <div>
                    <Quote className="w-6 h-6 text-primary/20 mb-3" />
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/90 italic mb-6 leading-relaxed line-clamp-4">
                      "{t.text}"
                    </p>
                  </div>
                  
                  <div>
                    <div className="h-px w-8 bg-primary/30 mb-3" />
                    <h4 className="font-bold text-lg tracking-tight leading-tight">{t.name}</h4>
                    <p className="text-[10px] text-primary font-mono uppercase tracking-[0.1em] mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};