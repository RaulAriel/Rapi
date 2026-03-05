import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileJson, 
  Layout, 
  Layers, 
  Smartphone, 
  Database, 
  Wind, 
  Figma, 
  Globe 
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "React": <FileJson className="w-5 h-5" />,
  "TypeScript": <Globe className="w-5 h-5" />,
  "Tailwind CSS": <Wind className="w-5 h-5" />,
  "Next.js": <Layers className="w-5 h-5" />,
  "Node.js": <Database className="w-5 h-5" />,
  "Figma": <Figma className="w-5 h-5" />,
  "Default": <Globe className="w-5 h-5" />
};

export const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: true });

      if (data) {
        const grouped = data.reduce((acc: any, skill: any) => {
          const cat = skill.category;
          if (!acc[cat]) acc[cat] = { title: cat, skills: [] };
          acc[cat].skills.push({
            ...skill,
            icon: iconMap[skill.name] || iconMap["Default"]
          });
          return acc;
        }, {});
        setSkillCategories(Object.values(grouped));
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Habilidades Técnicas" 
          subtitle="Mi arsenal tecnológico para conquistar el ciberespacio digital."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-6">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-secondary" /> {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill: any, index: number) => (
                  <GlassCard 
                    key={skill.id} 
                    delay={(catIndex * 0.2) + (index * 0.1)} 
                    className="p-5 border-l-4 border-l-primary/50"
                    hoverGlow
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">{skill.icon}</div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                    
                    {skill.description && (
                      <p className="text-[11px] text-muted-foreground mb-3 leading-tight">
                        {skill.description}
                      </p>
                    )}

                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        className="h-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};