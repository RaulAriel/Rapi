"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "NeuroLink Platform",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Three.js", "Node.js"],
    description: "Una plataforma de visualización de datos neuronales en tiempo real con interfaces inmersivas."
  },
  {
    title: "VaporStore E-commerce",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    tags: ["Next.js", "Tailwind", "Stripe"],
    description: "Tienda digital con estética vaporwave optimizada para la venta de activos digitales."
  },
  {
    title: "CyberGrid CRM",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["TypeScript", "Supabase", "Prisma"],
    description: "Herramienta de gestión de clientes diseñada para agencias de desarrollo creativo."
  },
  {
    title: "NeonCity Guide",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    tags: ["React Native", "Expo", "Firebase"],
    description: "Aplicación móvil para descubrir eventos nocturnos en metrópolis digitales."
  }
];

const categories = ["Todos", "Web App", "E-commerce", "SaaS", "Mobile"];

export const Projects = () => {
  const [filter, setFilter] = useState("Todos");

  const filteredProjects = filter === "Todos" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Proyectos Destacados" 
          subtitle="Una selección de misiones digitales completadas con éxito."
        />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                filter === cat 
                  ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                  : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-0 overflow-hidden flex flex-col h-full group" hoverGlow>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="glass border-primary/30 uppercase tracking-tighter">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <NeonButton size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" /> Demo
                      </NeonButton>
                      <NeonButton size="sm" variant="outline" glowColor="blue" className="flex-1">
                        <Github className="w-4 h-4 mr-2" /> Repo
                      </NeonButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};