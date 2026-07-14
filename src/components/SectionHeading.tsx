"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-x">
            {title}
          </span>
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div
          className={cn(
            "h-1 w-20 bg-primary mt-4 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]",
            align === "center" ? "mx-auto" : "ml-0"
          )}
        />
      </motion.div>
    </div>
  );
};