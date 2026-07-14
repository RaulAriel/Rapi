"use client";

import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="p-2 rounded-xl glass border-primary/20 text-primary hover:neon-border-violet transition-all flex items-center gap-2 h-10 w-10 lg:w-24 justify-center shrink-0"
      aria-label="Cambiar idioma / Change language"
    >
      <Languages className="w-5 h-5 flex-shrink-0" />
      <span className="text-[10px] font-bold uppercase hidden lg:block w-8 text-center">
        {language === "es" ? "ES" : "EN"}
      </span>
    </motion.button>
  );
};