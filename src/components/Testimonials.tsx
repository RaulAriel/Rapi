"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

        <div className="grid lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
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
                className="p-8 h-full flex flex-col border-white/5 bg-background/40" 
                hoverGlow={true}
              >
                {/* Header: Avatar más grande + Info */}
                <div className="flex items-center gap-6 mb-8">
                  <Avatar className="w-24 h-24 border-2 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                    <AvatarImage src={t.image} alt={t.name} className="object-cover" />
                    <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col">
                    <h4 className="font-bold text-xl tracking-tight leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-primary font-mono uppercase tracking-[0.1em] mt-1 opacity-80">
                      {t.role}
                    </p>
                    {/* Estrellas debajo del nombre/rol */}
                    <div className="flex gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.3)]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Testimonio debajo */}
                <div className="relative flex-1">
                  <Quote className="absolute -top-3 -left-3 w-10 h-10 text-primary/10 -z-10" />
                  <p className="text-[16px] text-foreground/80 italic leading-relaxed relative z-10 pl-2">
                    "{t.text}"
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};