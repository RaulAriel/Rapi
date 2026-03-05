"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer: "Depende de la complejidad. Una landing page puede estar lista en 1-2 semanas, mientras que una plataforma compleja puede tomar de 1 a 3 meses."
  },
  {
    question: "¿Qué tecnologías utilizas para el desarrollo?",
    answer: "Me especializo en el ecosistema de React (Next.js), TypeScript, y Tailwind CSS para el frontend, y Node.js o Supabase para el backend."
  },
  {
    question: "¿Ofreces servicios de mantenimiento?",
    answer: "Sí, ofrezco planes de soporte mensual para asegurar que tu sitio esté siempre actualizado, seguro y funcionando al 100%."
  },
  {
    question: "¿Puedes ayudar con el diseño si no tengo una idea clara?",
    answer: "¡Por supuesto! Como diseñador UI/UX, puedo guiarte desde la conceptualización hasta el prototipado final antes de escribir una sola línea de código."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background/50 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <SectionHeading 
          title="Preguntas Frecuentes" 
          subtitle="Despeja tus dudas sobre el proceso de trabajo y colaboración."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass rounded-2xl border-white/5 overflow-hidden px-6"
              >
                <AccordionTrigger className="text-left font-bold hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};