import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverGlow?: boolean;
}

export const GlassCard = ({
  children,
  className,
  delay = 0,
  hoverGlow = true,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverGlow ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "glass-card p-6 rounded-2xl group",
        hoverGlow && "hover:neon-border-violet",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
