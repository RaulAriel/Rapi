"use client";

import { motion } from "framer-motion";
import { NeonButton } from "./NeonButton";
import { ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute inset-0 bg-grid-white opacity-20" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/30 text-primary text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t("hero.badge")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6"
        >
          {t("hero.title1")} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x">
            {t("hero.title2")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {t("hero.desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects">
            <NeonButton size="lg" className="px-8 h-14 text-lg">
              {t("hero.cta1")} <ChevronRight className="w-5 h-5" />
            </NeonButton>
          </a>
          <a href="#contact">
            <NeonButton size="lg" variant="outline" glowColor="blue" className="px-8 h-14 text-lg">
              {t("hero.cta2")}
            </NeonButton>
          </a>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};