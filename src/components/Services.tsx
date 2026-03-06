import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { 
  Code, 
  Layout, 
  PenTool, 
  Search, 
  ShieldCheck, 
  BarChart3 
} from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: <Layout className="w-10 h-10" />,
      title: "Diseño Web UI/UX",
      description: "Interfaces visualmente impactantes con un enfoque obsesivo en la experiencia de usuario y la estética moderna.",
      color: "text-primary"
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "Desarrollo Web",
      description: "Arquitecturas robustas y escalables construidas con las tecnologías más avanzadas del mercado actual.",
      color: "text-secondary"
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "Diseño de Marca",
      description: "Identidades visuales únicas y memorables que posicionan tu negocio en la vanguardia digital.",
      color: "text-pink-500"
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: "Optimización SEO",
      description: "Estrategias de posicionamiento técnico para dominar los motores de búsqueda y atraer tráfico cualificado.",
      color: "text-yellow-400"
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Ciberseguridad",
      description: "Protección integral para tus activos digitales, garantizando la integridad de tus datos y los de tus usuarios.",
      color: "text-emerald-400"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Analítica Avanzada",
      description: "Monitorización y análisis de datos para optimizar la conversión y entender el comportamiento del usuario.",
      color: "text-orange-400"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Servicios Premium" 
          subtitle="Soluciones digitales integrales diseñadas para conquistar el mañana."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard key={index} delay={index * 0.1} className="group flex flex-col items-center text-center">
              <div className={`mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-auto">
                <NeonButton variant="ghost" className="text-sm font-mono tracking-widest uppercase">
                  Saber más
                </NeonButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
};