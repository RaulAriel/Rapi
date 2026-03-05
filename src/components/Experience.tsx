"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { GraduationCap, Code2, Rocket, Zap, History } from "lucide-react";
import { cn } from "@/lib/utils";

const timeline = [
  {
    role: "Finalización de Estudios",
    company: "Fundamentos Académicos",
    period: "2016",
    location: "Inicio del Viaje",
    icon: <GraduationCap className="w-6 h-6" />,
    description: "Cerré mi etapa de formación teórica con una curiosidad insaciable por cómo funcionaba realmente la web detrás de las cortinas."
  },
  {
    role: "Mi Primera Web",
    company: "Proyecto Génesis",
    period: "2018",
    location: "El Despertar",
    icon: <Code2 className="w-6 h-6" />,
    description: "Lancé mi primer sitio oficial al mundo. Fue el momento donde el código dejó de ser teoría y se convirtió en una herramienta de creación real."
  },
  {
    role: "Evolución y Proyectos",
    company: "Crecimiento Autónomo",
    period: "2019 - 2023",
    location: "Forjando Experiencia",
    icon: <Rocket className="w-6 h-6" />,
    description: "Años de experimentación constante. Fui aceptando retos cada vez más complejos, refinando mi estética visual y puliendo mi lógica de programación."
  },
  {
    role: "Dominio Tecnológico",
    company: "Estado Actual",
    period: "Hoy",
    location: "Nivel Máximo",
    icon: <Zap className="w-6 h-6" />,
    description: "He consolidado mi arsenal con las tecnologías que ves hoy. Ahora me enfoco en crear experiencias digitales inmersivas de alto nivel."
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-background/30 relative">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Mi Evolución" 
          subtitle="Un recorrido por los hitos que me transformaron en el desarrollador que soy hoy."
        />

        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 hidden md:block" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row gap-8 items-center",
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Dot with Icon */}
              <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-background border-2 border-primary rounded-xl -translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.5)] z-10 hidden md:flex items-center justify-center text-primary">
                {item.icon}
              </div>

              <div className="w-full md:w-1/2">
                <GlassCard className="p-8 hover:neon-border-blue" hoverGlow={false}>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <History className="w-4 h-4" />
                    <span className="text-sm font-mono">{item.period}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{item.role}</h3>
                  <div className="text-muted-foreground text-xs uppercase tracking-widest mb-4">
                    {item.company} • {item.location}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};