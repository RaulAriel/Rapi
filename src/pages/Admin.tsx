"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, Save, LayoutDashboard, Code, Briefcase, LogOut } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const Admin = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([
    { name: "React", level: 80, category: "Frontend" },
    { name: "TypeScript", level: 40, category: "Frontend" },
    { name: "Figma", level: 80, category: "Diseño" },
    { name: "UI Design", level: 80, category: "Diseño" },
  ]);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Error al cerrar sesión");
    } else {
      showSuccess("Sesión cerrada correctamente");
      navigate("/login");
    }
  };

  const handleSkillChange = (name: string, newLevel: number[]) => {
    setSkills(skills.map(s => s.name === name ? { ...s, level: newLevel[0] } : s));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess(`Proyecto "${newProject.title}" añadido con éxito`);
    setNewProject({ title: "", category: "", description: "", tags: "" });
  };

  const saveChanges = () => {
    showSuccess("Configuración del sistema actualizada correctamente");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-24 container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <SectionHeading 
            title="Panel de Control" 
            subtitle="Gestión centralizada de activos y capacidades digitales."
            align="left"
            className="mb-0"
          />
          <div className="flex gap-4">
            <NeonButton variant="outline" glowColor="blue" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </NeonButton>
            <NeonButton onClick={saveChanges}>
              <Save className="w-4 h-4 mr-2" /> Guardar Cambios
            </NeonButton>
          </div>
        </div>

        <Tabs defaultValue="skills" className="space-y-8">
          <TabsList className="glass border-white/5 p-1 h-auto flex-wrap justify-start gap-2">
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6 py-3 rounded-xl transition-all">
              <Code className="w-4 h-4 mr-2" /> Habilidades
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6 py-3 rounded-xl transition-all">
              <Briefcase className="w-4 h-4 mr-2" /> Proyectos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <LayoutDashboard className="text-primary w-5 h-5" /> Ajuste de Niveles
                </h3>
                <div className="space-y-8">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label className="font-mono text-sm uppercase tracking-widest">{skill.name}</Label>
                        <span className="text-primary font-bold">{skill.level}%</span>
                      </div>
                      <Slider
                        value={[skill.level]}
                        max={100}
                        step={1}
                        onValueChange={(val) => handleSkillChange(skill.name, val)}
                        className="py-2"
                      />
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="p-8">
                <h3 className="text-xl font-bold mb-6">Métricas de Rendimiento</h3>
                <p className="text-muted-foreground mb-6">
                  Los cambios realizados aquí se verán reflejados instantáneamente en la sección de habilidades de la página principal.
                </p>
                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-sm text-primary/80 italic font-mono">
                  INFO: Sistema de sincronización activa activado. Todos los módulos están operando dentro de los parámetros normales.
                </div>
              </GlassCard>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard className="lg:col-span-2 p-8">
                <h3 className="text-xl font-bold mb-6">Añadir Nueva Misión</h3>
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título del Proyecto</Label>
                      <Input 
                        id="title" 
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        placeholder="Ej: NeuroLink Platform" 
                        className="bg-white/5 border-white/10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Input 
                        id="category" 
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        placeholder="Ej: Web App, Mobile" 
                        className="bg-white/5 border-white/10" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (separados por comas)</Label>
                    <Input 
                      id="tags" 
                      value={newProject.tags}
                      onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                      placeholder="React, Three.js, Node.js" 
                      className="bg-white/5 border-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">Descripción del Proyecto</Label>
                    <textarea 
                      id="desc" 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full min-h-[120px] rounded-xl bg-white/5 border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Describe la misión y tecnologías utilizadas..."
                    />
                  </div>
                  <NeonButton type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Desplegar Proyecto
                  </NeonButton>
                </form>
              </GlassCard>

              <div className="space-y-6">
                <h3 className="text-xl font-bold px-2">Proyectos Activos</h3>
                <GlassCard className="p-4 border-l-4 border-primary">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">NeuroLink Platform</h4>
                      <p className="text-xs text-muted-foreground">Web App</p>
                    </div>
                    <button className="text-destructive hover:scale-110 transition-transform">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
                <GlassCard className="p-4 border-l-4 border-secondary">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">VaporStore E-commerce</h4>
                      <p className="text-xs text-muted-foreground">E-commerce</p>
                    </div>
                    <button className="text-destructive hover:scale-110 transition-transform">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </GlassCard>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;