import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { SectionHeading } from "./SectionHeading";
import { User, Code, Palette, Zap } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: <Palette className="w-6 h-6 text-primary" />,
      title: "Diseño UX/UI",
      description: "Interfaces intuitivas y visualmente impactantes enfocadas en la conversión."
    },
    {
      icon: <Code className="w-6 h-6 text-secondary" />,
      title: "Desarrollo Moderno",
      description: "Código limpio y eficiente utilizando las últimas tecnologías web."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "Rendimiento",
      description: "Optimización al detalle para tiempos de carga ultrarrápidos."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Sobre Mí" 
          subtitle="Fusionando creatividad y tecnología para dar vida a visiones digitales audaces."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-muted">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=1000" 
                  alt="Avatar Cyberpunk" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl border border-primary/30 hidden md:block">
                <p className="text-3xl font-black text-primary">+5 Años</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Experiencia</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="text-primary w-6 h-6" /> Biografía Profesional
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Soy un apasionado de la intersección entre el arte digital y la ingeniería de software. 
                Mi enfoque se basa en romper los moldes tradicionales para crear experiencias web 
                que no solo funcionen a la perfección, sino que también cuenten una historia visual.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Desde el diseño de marca hasta el despliegue en la nube, manejo cada etapa del proceso 
                con una mentalidad obsesionada con el detalle y la excelencia técnica.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <GlassCard key={index} delay={index * 0.1} className="p-4" hoverGlow={false}>
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-background/50 border border-white/5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
