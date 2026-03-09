"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const AutoIcon = () => (
  <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
    {/* Sun part (Top Left) */}
    <div 
      className="absolute inset-0 flex items-center justify-center" 
      style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
    >
      <Sun className="w-4 h-4" />
    </div>
    {/* Moon part (Bottom Right) */}
    <div 
      className="absolute inset-0 flex items-center justify-center" 
      style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
    >
      <Moon className="w-4 h-4" />
    </div>
    {/* The Separator Line (Slash) */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
       <div className="w-[1.5px] h-[140%] bg-primary/40 rotate-[45deg]" />
    </div>
  </div>
);

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
      className="p-2 rounded-xl glass border-primary/20 text-primary hover:neon-border-violet transition-all flex items-center gap-2 min-w-[40px] justify-center"
      aria-label="Cambiar tema"
    >
      {theme === "system" ? (
        <AutoIcon />
      ) : theme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      
      <span className="text-[10px] font-mono uppercase hidden lg:block">
        {theme === "system" ? "Auto" : theme}
      </span>
    </motion.button>
  );
};