"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { ExternalLink, Github, Monitor, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

export const Projects = () => {
  const [filter, setFilter] = useState("Todos");
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState(["Todos"]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Priorizamos siempre el orden manual definido en el admin
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.warn("Falling back to date ordering due to error:", error);
        const fallback = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (fallback.data) {
          setProjects(fallback.data);
          updateCategories(fallback.data);
        }
      } else if (data) {
        setProjects(data);
        updateCategories(data);
      }
    };

    const updateCategories = (data: any[]) => {
      const cats = ["Todos", ...new Set(data.map((p: any) => p.category))];
      setCategories(cats);
    };

    fetchProjects();
  }, []);

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
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-0 overflow-hidden flex flex-col h-full group" hoverGlow>
                  <div className="relative aspect-video overflow-hidden bg-black/40">
                    <img 
                      src={project.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                    />

                    {project.link_demo && (
                      <div className="absolute inset-0 w-full h-full z-10">
                        <div className="w-full h-full relative overflow-hidden">
                          <iframe 
                            src={project.link_demo} 
                            scrolling="no"
                            className="absolute top-0 left-0 border-none pointer-events-none origin-top-left overflow-hidden scrollbar-hide"
                            style={{ 
                              width: '200%',
                              height: '200%',
                              transform: 'scale(0.5)',
                              msOverflowStyle: 'none',
                              scrollbarWidth: 'none',
                            }}
                            title={project.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-transparent z-20 cursor-default" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-30" />
                    
                    <div className="absolute top-4 right-4 z-40">
                      <Badge variant="secondary" className="glass border-primary/30 uppercase tracking-tighter shadow-sm">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 z-40 flex items-center gap-2 text-[10px] font-mono text-primary/80">
                      <Monitor className="w-3 h-3" /> PREVISUALIZACIÓN EN VIVO
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow relative z-40 bg-background/20 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags?.map((tag: string) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-foreground/70 dark:text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.link_demo && (
                        <a href={project.link_demo} target="_blank" rel="noreferrer" className="flex-1">
                          <NeonButton size="sm" className="w-full">
                            <ExternalLink className="w-4 h-4" /> Visitar Sitio
                          </NeonButton>
                        </a>
                      )}
                      {project.link_repo && (
                        <a href={project.link_repo} target="_blank" rel="noreferrer" className="flex-1">
                          <NeonButton size="sm" variant="outline" glowColor="blue" className="w-full">
                            <Github className="w-4 h-4" /> Repo
                          </NeonButton>
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-white/5 p-4 rounded-xl border border-white/10 max-w-2xl mx-auto">
          <AlertCircle className="w-4 h-4 text-primary" />
          <p>
            Nota: Algunos sitios externos pueden no visualizarse aquí debido a sus políticas de seguridad (X-Frame-Options). 
            En esos casos, se mostrará la imagen de portada.
          </p>
        </div>
      </div>
    </section>
  );
};