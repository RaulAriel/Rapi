"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import albertPhoto from "@/assets/albert.png";

const testimonials = [
  {
    name: "Albert Viedma",
    role: "Dueño de Decode-bar",
    image: albertPhoto,
    text: "Desde que lanzamos la nueva página, nuestros clientes entienden mejor lo que ofrecemos y nos contactan con más facilidad. Ahora recibimos reservas y consultas por correo y WhatsApp todos los días, y hemos notado un incremento claro en nuevos clientes. La web refleja justo la esencia de nuestro local"
  },
  {
    name: "Elena Soto",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?u=elena",
    text: "Un profesional que entiende el equilibrio perfecto entre diseño audaz y usabilidad. Los tiempos de entrega fueron impecables."
  },
  {
    name: "Marcus K.",
    role: "Fundador de NeonCloud",
    image: "https://i.pravatar.cc/150?u=marcus",
    text: "El diseño cyberpunk que creó para nuestra landing page atrajo un 50% más de leads en la primera semana del lanzamiento."
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-background/50">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Opiniones de Clientes" 
          subtitle="Historias de éxito de quienes confiaron en mi visión digital."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <GlassCard key={index} delay={index * 0.1} className="relative pt-12">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Avatar className="w-16 h-16 border-2 border-primary shadow-lg">
                  <AvatarImage src={t.image} />
                  <AvatarFallback>{t.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              <div className="flex justify-center mb-4 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6 text-center leading-relaxed">
                "{t.text}"
              </p>
              <div className="text-center">
                <h4 className="font-bold text-lg">{t.name}</h4>
                <p className="text-xs text-primary font-mono uppercase tracking-widest">{t.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};