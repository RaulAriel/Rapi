import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
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

export const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: <FileJson className="w-5 h-5" />, level: 90 },
        { name: "TypeScript", icon: <Globe className="w-5 h-5" />, level: 85 },
        { name: "Tailwind CSS", icon: <Wind className="w-5 h-5" />, level: 95 },
        { name: "Next.js", icon: <Layers className="w-5 h-5" />, level: 80 },
      ]
    },
    {
      title: "Backend & Herramientas",
      skills: [
        { name: "Node.js", icon: <Database className="w-5 h-5" />, level: 75 },
        { name: "PostgreSQL", icon: <Database className="w-5 h-5" />, level: 70 },
        { name: "WordPress", icon: <Layout className="w-5 h-5" />, level: 85 },
        { name: "Git", icon: <Globe className="w-5 h-5" />, level: 90 },
      ]
    },
    {
      title: "Diseño & UX",
      skills: [
        { name: "Figma", icon: <Figma className="w-5 h-5" />, level: 85 },
        { name: "UI Design", icon: <Layout className="w-5 h-5" />, level: 90 },
        { name: "Responsive", icon: <Smartphone className="w-5 h-5" />, level: 95 },
        { name: "Prototyping", icon: <Layers className="w-5 h-5" />, level: 80 },
      ]
    }
  ];

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
                {category.skills.map((skill, index) => (
                  <GlassCard 
                    key={index} 
                    delay={(catIndex * 0.2) + (index * 0.1)} 
                    className="p-5 border-l-4 border-l-primary/50"
                    hoverGlow
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">{skill.icon}</div>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
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
