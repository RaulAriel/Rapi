"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { Mail, Github, Linkedin, Instagram, Send, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { showSuccess } from "@/utils/toast";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("¡Mensaje enviado con éxito! Me pondré en contacto pronto.");
  };

  const socials = [
    { icon: <Github />, href: "https://github.com/RaulAriel", label: "Github" },
    { icon: <Linkedin />, href: "https://www.linkedin.com/in/ra%C3%BAl-ariel-gazapo-diaz-74b94b98/", label: "LinkedIn" },
    { icon: <Instagram />, href: "https://www.instagram.com/raul_ariel_diaz/", label: "Instagram" }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Contacto" 
          subtitle="¿Listo para iniciar tu próxima misión digital? Envíame un mensaje."
        />

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Información de Enlace</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-primary group-hover:neon-border-violet transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Email</p>
                    <p className="font-bold">raularieldiaz@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-secondary group-hover:neon-border-blue transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Teléfono</p>
                    <p className="font-bold">+34 695 067 777</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-yellow-400 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Ubicación</p>
                    <p className="font-bold">Barcelona, España</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6">Redes Sociales</h3>
              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-border-violet transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs uppercase tracking-widest font-mono">Nombre Completo</Label>
                    <Input id="name" placeholder="Tu nombre" className="bg-white/5 border-white/10 focus:border-primary/50" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs uppercase tracking-widest font-mono">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" className="bg-white/5 border-white/10 focus:border-primary/50" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs uppercase tracking-widest font-mono">Asunto</Label>
                  <Input id="subject" placeholder="Propuesta de Proyecto" className="bg-white/5 border-white/10 focus:border-primary/50" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest font-mono">Mensaje</Label>
                  <Textarea id="message" placeholder="Cuéntame sobre tu visión..." className="min-h-[150px] bg-white/5 border-white/10 focus:border-primary/50" required />
                </div>
                <NeonButton type="submit" className="w-full h-12 text-lg">
                  Enviar Mensaje <Send className="ml-2 w-5 h-5" />
                </NeonButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};