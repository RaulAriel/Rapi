"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
// import { Experience } from "@/components/Experience"; // Importación mantenida para referencia
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Preloader } from "@/components/Preloader";
import { BackToTop } from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Preloader />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        {/* <Experience /> */} {/* Sección ocultada temporalmente */}
        <Process />
        <Testimonials />
        <FAQ />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <MadeWithDyad />
    </div>
  );
};

export default Index;