"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { ExternalLink, Github, Terminal, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      // Intentamos ordenar por order_index, si falla (por ejemplo si la columna no existe aún), 
      // Supabase devolverá un error pero aquí lo manejamos
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true, nullsFirst: false });
      
      if (error) {
        console.error("Error fetching projects by order, falling back to date:", error);
        const { data: fallbackData } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (fallbackData) setProjects(fallbackData);
      } else if (data) {
        setProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="PROYECTOS DESTACADOS" 
          subtitle="Una colección de misiones técnicas completadas con éxito."
        />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTab === category
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  : "bg-transparent text-muted-foreground border-white/10 hover:border-primary/50"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <GlassCard className="group h-full flex flex-col overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={project.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/80 backdrop-blur-md text-white border border-white/10">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                        {project.tags?.map((tag: string) => (
                          <span key={tag} className="text-[10px] font-mono text-primary/70 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        {project.link_demo && (
                          <NeonButton 
                            variant="primary" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => window.open(project.link_demo, '_blank')}
                          >
                            Demo <ExternalLink className="w-3 h-3 ml-2" />
                          </NeonButton>
                        )}
                        {project.link_repo && (
                          <NeonButton 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => window.open(project.link_repo, '_blank')}
                          >
                            Code <Github className="w-3 h-3 ml-2" />
                          </NeonButton>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
            {projects.length === 0 && !loading && (
              <div className="col-span-full text-center py-20">
                <p className="text-muted-foreground">No se encontraron proyectos activos.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};