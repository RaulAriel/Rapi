"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import { User, Code, Palette, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "UI/UX Design",
      description: "Intuitive and visually stunning interfaces focused on high user conversion."
    },
    {
      icon: <Code className="w-6 h-6 text-secondary" />,
      title: "Modern Development",
      description: "Clean and efficient codebases built with the latest state-of-the-art web tech."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Performance",
      description: "Extremely optimized code for ultra-fast loading speeds."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title={t("about.title")} 
          subtitle={t("about.subtitle")}
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              {/* Animated Glow behind image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
              
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted border border-white/10 shadow-2xl">
                {/* Image with Cyberpunk Filters */}
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=1000" 
                  alt="Raúl Ariel" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 saturate-[1.2] brightness-[0.9] hue-rotate-[-10deg]"
                />
                
                {/* Cyberpunk Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/10 to-transparent mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 via-transparent to-primary/20 pointer-events-none" />
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              </div>

              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl border border-primary/30 hidden md:block shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <p className="text-3xl font-black text-primary">+5 Years</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("about.exp")}</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="text-primary w-6 h-6" /> {t("about.bio")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.p1")}
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {t("about.p2")}
              </p>
            </motion.div>

            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <GlassCard key={index} delay={index * 0.1} className="p-4" hoverGlow={false}>
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-background/50 border border-white/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};