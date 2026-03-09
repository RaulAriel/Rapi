"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Quote, Star, User } from "lucide-react";
import albertPhoto from "@/assets/albert.png";
import alejandraPhoto from "@/assets/alejandra.png";

const testimonials = [
  {
    name: "Albert Viedma",
    role: "Dueño de Decode-bar",
    image: albertPhoto,
    text: "Desde que lanzamos la nueva página, nuestros clientes entienden mejor lo que ofrecemos y nos contactan con más facilidad. Ahora recibimos reservas y consultas por correo y WhatsApp todos los días, y hemos notado un incremento claro en nuevos clientes. La web refleja justo la esencia de nuestro local"
  },
  {
    name: "Alejandra Glez",
    role: "Artista",
    image: alejandraPhoto,
    text: "Siempre quise tener un espacio donde mostrar mi trabajo de forma clara y profesional. La nueva web me permitió organizar todas mis obras por categorías, crear una galería cuidada y fácil de navegar. Ahora tengo un portafolio digital que refleja mi estilo y me ayuda a presentar mi arte con elegancia."
  }
];

// Diseño 1: Retrato Vertical Grande (Estilo Editorial)
const Design1 = ({ item, index }: any) => (
  <GlassCard key={index} delay={index * 0.1} className="p-0 overflow-hidden flex flex-col h-full" hoverGlow>
    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-6">
        <div className="flex gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
        </div>
        <h4 className="font-bold text-xl">{item.name}</h4>
        <p className="text-xs text-primary font-mono uppercase tracking-widest">{item.role}</p>
      </div>
    </div>
    <div className="p-6 relative">
      <Quote className="absolute -top-4 right-6 w-10 h-10 text-primary/10" />
      <p className="text-muted-foreground italic leading-relaxed text-sm">"{item.text}"</p>
    </div>
  </GlassCard>
);

// Diseño 2: Dividido Horizontal (Estilo Profesional)
const Design2 = ({ item, index }: any) => (
  <GlassCard key={index} delay={index * 0.1} className="p-0 overflow-hidden flex flex-col md:flex-row items-stretch" hoverGlow={false}>
    <div className="w-full md:w-2/5 min-h-[250px] relative">
      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
    </div>
    <div className="p-8 flex-1 flex flex-col justify-center">
      <Quote className="w-8 h-8 text-primary/20 mb-4" />
      <p className="text-lg text-foreground italic mb-6 leading-relaxed">"{item.text}"</p>
      <div>
        <h4 className="font-bold text-xl">{item.name}</h4>
        <p className="text-sm text-primary font-mono uppercase tracking-widest">{item.role}</p>
      </div>
    </div>
  </GlassCard>
);

// Diseño 3: Imagen de Fondo Completa (Estilo Inmersivo)
const Design3 = ({ item, index }: any) => (
  <div className="relative group rounded-3xl overflow-hidden aspect-[4/5] md:aspect-square">
    <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80" />
    <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-[-10px]">
      <div className="glass p-6 rounded-2xl border-white/10 backdrop-blur-xl">
        <Quote className="w-6 h-6 text-primary mb-3" />
        <p className="text-sm md:text-base text-foreground/90 italic mb-4 line-clamp-4">"{item.text}"</p>
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-primary/30" />
          <div className="text-right">
            <h4 className="font-bold">{item.name}</h4>
            <p className="text-[10px] text-primary uppercase tracking-widest">{item.role}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background/50">
      <div className="container px-4 md:px-6 space-y-32">
        
        {/* OPCIÓN 1: GRID VERTICAL */}
        <div>
          <SectionHeading title="Opción 1: Retratos Editoriales" subtitle="Fotos grandes con el texto debajo, ideal para un look limpio." />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => <Design1 key={i} item={t} index={i} />)}
          </div>
        </div>

        {/* OPCIÓN 2: LISTA HORIZONTAL */}
        <div>
          <SectionHeading title="Opción 2: Formato Panorámico" subtitle="Diseño equilibrado que da igual importancia a la imagen y al texto." />
          <div className="space-y-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => <Design2 key={i} item={t} index={i} />)}
          </div>
        </div>

        {/* OPCIÓN 3: Mosaico Inmersivo */}
        <div>
          <SectionHeading title="Opción 3: Cartas de Impacto" subtitle="La foto ocupa todo el espacio, con el texto flotando sobre ella." />
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => <Design3 key={i} item={t} index={i} />)}
          </div>
        </div>

      </div>
    </section>
  );
};