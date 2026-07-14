"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SunLongRays = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="1" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
    <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" />
    <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" />
  </svg>
);

const SunNoRays = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <circle cx="12" cy="12" r="7" />
  </svg>
);

const AutoIcon = () => (
  <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
    {/* Left Side: Half Sun with long rays */}
    <div 
      className="absolute inset-0 flex items-center justify-center" 
      style={{ clipPath: 'inset(0 50% 0 0)' }}
    >
      <SunLongRays className="w-4 h-4" />
    </div>
    
    {/* Right Side: Half Sun without rays */}
    <div 
      className="absolute inset-0 flex items-center justify-center" 
      style={{ clipPath: 'inset(0 0 0 50%)' }}
    >
      <SunNoRays className="w-4 h-4" />
    </div>
    
    {/* Vertical Separator | */}
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-primary/40 rounded-full" />
  </div>
);

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    
    // Check if the View Transitions API is supported
    const isTransitionable = 
      typeof document !== "undefined" && 
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isTransitionable) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    
    // Compute screen boundaries to find max radius needed to fully cover the screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Disable traditional animations globally before running the view transition
    document.documentElement.classList.add("theme-transitioning");

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });

    // Re-enable traditional CSS animations once the circular wave completes
    transition.finished.then(() => {
      document.documentElement.classList.remove("theme-transitioning");
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-xl glass border-primary/20 text-primary hover:neon-border-violet transition-all flex items-center gap-2 h-10 w-10 lg:w-24 justify-center shrink-0"
      aria-label="Change Theme"
    >
      <div className="flex-shrink-0">
        {theme === "system" ? (
          <AutoIcon />
        ) : theme === "dark" ? (
          <SunNoRays className="w-5 h-5" />
        ) : (
          <SunLongRays className="w-5 h-5" />
        )}
      </div>
      
      <span className="text-[10px] font-bold uppercase hidden lg:block w-8 text-center">
        {theme === "system" ? "Auto" : theme}
      </span>
    </motion.button>
  );
};