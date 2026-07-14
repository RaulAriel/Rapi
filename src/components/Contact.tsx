"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";
import { Mail, Github, Linkedin, Instagram, Send, MapPin, MessageCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const contactFormSchema = z.object({
  full_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  phone_number: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    if (values.website) {
      showSuccess(language === "es" ? "¡Mensaje enviado con éxito!" : "Message sent successfully!");
      form.reset();
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([
          {
            full_name: values.full_name,
            email: values.email,
            phone_number: values.phone_number,
            subject: values.subject,
            message: values.message,
            website: values.website,
          },
        ]);

      if (error) throw error;

      showSuccess(
        language === "es" 
          ? "¡Mensaje enviado con éxito! Me pondré en contacto pronto." 
          : "Message sent successfully! I will be in touch soon."
      );
      form.reset();
    } catch (error: any) {
      console.error("Error sending message:", error);
      showError(
        language === "es" 
          ? "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo." 
          : "There was an error sending the message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: <Github />, href: "https://github.com/RaulAriel", label: "Github" },
    { icon: <Linkedin />, href: "https://www.linkedin.com/in/ra%C3%BAl-ariel-gazapo-diaz-74b94b98/", label: "LinkedIn" },
    { icon: <Instagram />, href: "https://www.instagram.com/raul_ariel_diaz/", label: "Instagram" }
  ];

  const inputClasses = "bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-300";

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container px-4 md:px-6">
        <SectionHeading 
          title={t("contact.title")} 
          subtitle={t("contact.subtitle")}
        />

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">{t("contact.info")}</h3>
              <div className="space-y-6">
                <a 
                  href="mailto:raularieldiaz@gmail.com" 
                  className="flex items-center gap-4 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-primary group-hover:neon-border-violet transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Email</p>
                    <p className="font-bold group-hover:text-primary transition-colors">raularieldiaz@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/34695067777" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-secondary group-hover:neon-border-blue transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">WhatsApp</p>
                    <p className="font-bold group-hover:text-secondary transition-colors">+34 695 067 777</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-yellow-400 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      {language === "es" ? "Ubicación" : "Location"}
                    </p>
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
              <h3 className="text-2xl font-bold mb-6">{t("contact.social")}</h3>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="hidden" aria-hidden="true">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input tabIndex={-1} autoComplete="off" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest font-mono">{t("contact.name")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === "es" ? "Tu nombre" : "Your name"} 
                              className={inputClasses}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest font-mono">{t("contact.email")}</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="tu@email.com" 
                              className={inputClasses}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest font-mono">{t("contact.phone")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+34 600 000 000" 
                              className={inputClasses}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest font-mono">{t("contact.subject")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={language === "es" ? "Propuesta de Proyecto" : "Project Proposal"} 
                              className={inputClasses}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest font-mono">{t("contact.message")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={language === "es" ? "Cuéntame sobre tu visión..." : "Tell me about your vision..."} 
                            className={cn(inputClasses, "min-h-[150px]")}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <NeonButton 
                    type="submit" 
                    className="w-full h-12 text-lg" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        {t("contact.sending")} <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        {t("contact.send")} <Send className="w-5 h-5" />
                      </>
                    )}
                  </NeonButton>
                </form>
              </Form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};