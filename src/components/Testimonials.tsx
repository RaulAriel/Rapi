"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/hooks/use-language";

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error("Error cargando testimonios:", error);
      } else if (data) {
        const visibleData = data.filter((t: any) => !t.is_hidden);
        setTestimonials(visibleData);
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  if (loading || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-background/50 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title={t("testimonials.title")} 
          subtitle={t("testimonials.subtitle")}
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassCard 
                className="p-8 h-full flex flex-col border-white/5 bg-background/40" 
                hoverGlow={true}
              >
                <div className="flex items-center gap-6 mb-8">
                  <Avatar className="w-24 h-24 border-2 border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                    <AvatarImage src={t.image_url} alt={t.name} className="object-cover" />
                    <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col">
                    <h4 className="font-bold text-xl tracking-tight leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-primary font-mono uppercase tracking-[0.1em] mt-1 opacity-80">
                      {t.role}
                    </p>
                    <div className="flex gap-1 mt-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.3)]" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative flex-1">
                  <Quote className="absolute -top-3 -left-3 w-10 h-10 text-primary/10 -z-10" />
                  <p className="text-[16px] text-foreground/80 italic leading-relaxed relative z-10 pl-2">
                    "{t.text}"
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};