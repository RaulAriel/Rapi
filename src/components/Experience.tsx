"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    role: "Senior Frontend Developer",
    company: "NeoTech Systems",
    period: "2022 - Presente",
    location: "Remoto / Madrid",
    description: "Lidero el desarrollo de interfaces críticas utilizando React y Next.js, optimizando el rendimiento de aplicaciones web en un 40%."
  },
  {
    role: "UI/UX Designer",
    company: "Digital Dream Agency",
    period: "2020 - 2022",
    location: "Barcelona",
    description: "Diseñé experiencias de usuario para más de 30 clientes internacionales, enfocándome en interfaces de alta fidelidad y prototipado animado."
  },
  {
    role: "Frontend Developer",
    company: "Cloud Solutions",
    period: "2018 - 2020",
    location: "Valencia",
    description: "Desarrollo de módulos interactivos y mantenimiento de arquitecturas escalables basadas en componentes reutilizables."
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-background/30 relative">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Trayectoria Profesional" 
          subtitle="El camino recorrido a través de diferentes sectores tecnológicos."
        />

        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
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
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(139,92,246,0.8)] z-10 hidden md:block" />

              <div className="w-full md:w-1/2">
                <GlassCard className="p-8 hover:neon-border-blue" hoverGlow={false}>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-mono">{exp.period}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {exp.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
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