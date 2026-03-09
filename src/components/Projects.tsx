"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { ExternalLink, Github, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/use-language";

export const Projects = () => {
  const [filter, setFilter] = useState("Todos");
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (data) {
        setProjects(data);
        const cats = ["Todos", ...new Set(data.map((p: any) => 
          language === 'en' && p.category_en ? p.category_en : p.category
        ))];
        setCategories(cats as string[]);
      }
    };
    fetchProjects();
  }, [language]);

  const filteredProjects = projects.filter(p => {
    const cat = language === 'en' && p.category_en ? p.category_en : p.category;
    return filter === "Todos" || filter === "All" || cat === filter;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title={t("projects.title")} 
          subtitle={t("projects.subtitle")}
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
              {cat === "Todos" && language === 'en' ? "All" : cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} layout>
                <GlassCard className="p-0 overflow-hidden flex flex-col h-full group" hoverGlow>
                  <div className="relative aspect-video overflow-hidden bg-black/40">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all" />
                    ) : <div className="absolute inset-0 flex items-center justify-center"><ImageIcon className="w-12 h-12 opacity-20" /></div>}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="glass border-primary/30 uppercase">
                        {language === 'en' && project.category_en ? project.category_en : project.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2">
                      {language === 'en' && project.title_en ? project.title_en : project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {language === 'en' && project.description_en ? project.description_en : project.description}
                    </p>
                    <div className="flex gap-4 mt-auto">
                      {project.link_demo && (
                        <a href={project.link_demo} target="_blank" rel="noreferrer" className="flex-1">
                          <NeonButton size="sm" className="w-full">
                            <ExternalLink className="w-4 h-4 mr-2" /> {t("projects.visit")}
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
      </div>
    </section>
  );
};