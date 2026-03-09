"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Si el usuario quiere forzar el sistema, podemos añadir esa opción o simplemente
  // rotar entre Light -> Dark -> System
  const toggleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-xl glass border-primary/20 text-primary hover:neon-border-violet transition-all flex items-center gap-2"
      aria-label="Cambiar tema"
    >
      {theme === "system" ? (
        <Monitor className="w-5 h-5" />
      ) : resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      <span className="text-[10px] font-mono uppercase hidden lg:block">
        {theme === "system" ? "Auto" : theme}
      </span>
    </motion.button>
  );
};