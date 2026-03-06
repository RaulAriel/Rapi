"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { ExternalLink, Github, Code2, Layers, Loader2, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Projects = () => {
  const [filter, setFilter] = useState("Todos");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true }); // Respetamos el orden de Admin

      if (data) setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const categories = ["Todos", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = filter === "Todos" 
    ? projects 
    : projects.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Casos de Éxito" 
          subtitle="Explora mi repositorio de misiones completadas y proyectos experimentales."
        />

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat 
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)]" 
                  : "glass hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlassCard className="h-full group overflow-hidden flex flex-col">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.link_demo && (
                        <a 
                          href={project.link_demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                        >
                          <Play className="w-5 h-5 fill-current" />
                        </a>
                      )}
                      {project.link_repo && (
                        <a 
                          href={project.link_repo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-foreground hover:scale-110 transition-transform shadow-lg"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-mono text-primary mb-1 block">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10">
                          #{tag}
                        </span>
                      ))}
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