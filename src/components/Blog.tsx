"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { Calendar, ChevronRight } from "lucide-react";

const posts = [
  {
    title: "El auge de la estética Cyberpunk en la Web",
    excerpt: "Descubre por qué las interfaces futuristas están ganando terreno en el diseño moderno y cómo implementarlas.",
    date: "12 Oct, 2023",
    category: "Diseño",
    image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Optimización de React para Aplicaciones de Alto Rendimiento",
    excerpt: "Estrategias avanzadas para reducir el tiempo de carga y mejorar la interactividad en proyectos complejos.",
    date: "05 Oct, 2023",
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <SectionHeading 
            title="Blog & Noticias" 
            subtitle="Compartiendo conocimientos sobre tecnología, diseño y el futuro digital."
            align="left"
            className="mb-0"
          />
          <NeonButton variant="outline" className="hidden md:flex">
            Ver todas las entradas <ChevronRight className="ml-2 w-4 h-4" />
          </NeonButton>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <GlassCard key={index} delay={index * 0.1} className="p-0 overflow-hidden flex flex-col sm:flex-row group" hoverGlow>
              <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{post.category}</span>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <button className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors">
                    Leer más <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <NeonButton variant="outline" className="w-full">
            Ver todas las entradas
          </NeonButton>
        </div>
      </div>
    </section>
  );
};