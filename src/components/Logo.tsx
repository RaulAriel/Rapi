"use client";

import { cn } from "@/lib/utils";
import logoSrc from "@/assets/logo.svg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showNeon?: boolean;
}

export const Logo = ({ className, size = "md", showNeon = false }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-16 h-16",
  };

  return (
    <div
      className={cn(
        "w-fit h-fit rounded-[10px] flex items-center justify-center transition-all duration-300",
        showNeon && "neon-border-violet",
        className
      )}
    >
      <img
        src={logoSrc}
        alt="Raúl Ariel Logo"
        className={cn("object-contain block", sizeClasses[size])}
      />
    </div>
  );
};