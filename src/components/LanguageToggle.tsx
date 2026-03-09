"use client";

import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="p-2 rounded-xl glass border-primary/20 text-primary hover:neon-border-violet transition-all flex items-center gap-2"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5" />
      <span className="text-xs font-bold font-mono uppercase">{language}</span>
    </motion.button>
  );
};