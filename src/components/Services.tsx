import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { useLanguage } from "@/hooks/use-language";
import { 
  Code, 
  Layout, 
  PenTool, 
  Search, 
  ShieldCheck, 
  BarChart3 
} from "lucide-react";

export const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Layout className="w-10 h-10" />,
      title: t("services.s1.title"),
      description: t("services.s1.desc"),
      color: "text-primary"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: t("services.s2.title"),
      description: t("services.s2.desc"),
      color: "text-secondary"
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: t("services.s3.title"),
      description: t("services.s3.desc"),
      color: "text-pink-500"
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: t("services.s4.title"),
      description: t("services.s4.desc"),
      color: "text-emerald-400"
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: t("services.s5.title"),
      description: t("services.s5.desc"),
      color: "text-yellow-400"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: t("services.s6.title"),
      description: t("services.s6.desc"),
      color: "text-orange-400"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title={t("services.title")} 
          subtitle={t("services.subtitle")}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard key={index} delay={index * 0.1} className="group flex flex-col items-center text-center">
              <div className={`mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};