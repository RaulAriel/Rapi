"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Search, PenTool, Code, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const getSteps = (t: (key: string) => string) => [
  {
    icon: <Search className="w-8 h-8" />,
    title: t("process.step1.title"),
    description: t("process.step1.desc")
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: t("process.step2.title"),
    description: t("process.step2.desc")
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: t("process.step3.title"),
    description: t("process.step3.desc")
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: t("process.step4.title"),
    description: t("process.step4.desc")
  }
];

export const Process = () => {
  const { t } = useLanguage();
  const steps = getSteps(t);

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title={t("process.title")} 
          subtitle={t("process.subtitle")}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden lg:block" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group flex flex-col items-center text-center z-10"
            >
              <div className="mb-6 w-20 h-20 rounded-full glass border border-primary/30 flex items-center justify-center relative group-hover:neon-border-violet transition-all duration-300">
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};