import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonProps {
  glowColor?: "violet" | "blue";
}

export const NeonButton = ({
  children,
  className,
  glowColor = "violet",
  variant = "default",
  ...props
}: NeonButtonProps) => {
  const glowClass =
    glowColor === "violet"
      ? "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] border-primary/50"
      : "hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] border-secondary/50";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300 border",
          glowClass,
          className
        )}
        variant={variant}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]" />
      </Button>
    </motion.div>
  );
};
