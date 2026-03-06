"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  
  const bootSequence = [
    "> INITIALIZING SYSTEM_BOOT...",
    "> LOADING KERNEL_MODULES...",
    "> ESTABLISHING NEURAL_LINK...",
    "> DECRYPTING ASSETS...",
    "> BYPASSING FIREWALL...",
    "> SYSTEM READY. WELCOME USER."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        setTimeout(() => setLoading(false), 500);
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
        >
          <div className="w-full max-w-md font-mono text-primary space-y-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo size="md" className="animate-pulse" />
              <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs sm:text-sm"
              >
                {line}
              </motion.p>
            ))}
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-primary inline-block"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};