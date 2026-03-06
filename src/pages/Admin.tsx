"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  Code, 
  Briefcase, 
  LogOut, 
  Loader2, 
  Edit3, 
  Save, 
  X,
  CheckCircle2,
  Globe
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  // Clase unificada para inputs
  const inputClasses = "bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-300";

  // Estados para edición
  const [editingProject, setEditingProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    link_demo: "",
    link_repo: "",
    image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
  });

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUser(user);
      fetchData();
    };
    init();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const [skillsRes, projectsRes] = await Promise.all([
      supabase.from('skills').select('*').order('created_at', { ascending: false }),
      supabase.from('projects').select('*').order('created_at', { ascending: false })
    ]);

    if (skillsRes.data) setSkills(skillsRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showSuccess("Sesión cerrada");
    navigate("/login");
  };

  // --- GESTIÓN DE SKILLS ---
  const handleUpdateSkill = async (id: string, updates: any) => {
    const { error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id);

    if (error) {
      showError("Error al actualizar skill");
    } else {
      setSkills(skills.map(s => s.id === id ? { ...s, ...updates } : s));
      showSuccess("Skill actualizada");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) showError("Error al eliminar skill");
    else {
      setSkills(skills.filter(s => s.id !== id));
      showSuccess("Skill eliminada");
    }
  };

  const handleAddSkill = async () => {
    const { data, error } = await supabase
      .from('skills')
      .insert([{ 
        name: "Nueva Habilidad", 
        category: "Frontend", 
        level: 50, 
        user_id: user.id 
      }])
      .select();

    if (error) showError(error.message);
    else if (data) setSkills([data[0], ...skills]);
  };

  // --- GESTIÓN DE PROYECTOS ---
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = typeof newProject.tags === 'string' 
      ? newProject.tags.split(',').map(t => t.trim()).filter(t => t !== "")
      : newProject.tags;

    if (editingProject) {
      // Modo Edición
      const { error } = await supabase
        .from('projects')
        .update({ ...newProject, tags: tagsArray })
        .eq('id', editingProject.id);

      if (error) showError(error.message);
      else {
        showSuccess("Proyecto actualizado");
        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...newProject, tags: tagsArray } : p));
        resetProjectForm();
      }
    } else {
      // Modo Creación
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...newProject, tags: tagsArray, user_id: user.id }])
        .select();

      if (error) showError(error.message);
      else {
        showSuccess("Proyecto creado");
        if (data) setProjects([data[0], ...projects]);
        resetProjectForm();
      }
    }
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setNewProject({
      title: "",
      category: "",
      description: "",
      tags: "",
      link_demo: "",
      link_repo: "",
      image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    });
  };

  const startEditProject = (project: any) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      category: project.category,
      description: project.description || "",
      tags: project.tags ? project.tags.join(', ') : "",
      link_demo: project.link_demo || "",
      link_repo: project.link_repo || "",
      image_url: project.image_url || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) showError("Error al eliminar");
    else {
      setProjects(projects.filter(p => p.id !== id));
      showSuccess("Proyecto eliminado");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-32 pb-24 container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <SectionHeading 
            title="SISTEMA DE CONTROL" 
            subtitle="Modifica la infraestructura de tu presencia digital."
            align="left"
            className="mb-0"
          />
          <NeonButton variant="outline" glowColor="blue" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Desconectar
          </NeonButton>
        </div>

        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="glass border-white/5 p-1 h-auto flex-wrap justify-start gap-2">
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6 py-3 rounded-xl transition-all">
              <Briefcase className="w-4 h-4 mr-2" /> Proyectos
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6 py-3 rounded-xl transition-all">
              <Code className="w-4 h-4 mr-2" /> Habilidades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard className="lg:col-span-2 p-8 h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">
                    {editingProject ? "Editar Misión" : "Registrar Nueva Misión"}
                  </h3>
                  {editingProject && (
                    <button onClick={resetProjectForm} className="text-muted-foreground hover:text-white flex items-center gap-1 text-sm">
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                  )}
                </div>
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-mono tracking-widest">Título del Proyecto</Label>
                      <Input 
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className={inputClasses} required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-mono tracking-widest">Categoría</Label>
                      <Input 
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        placeholder="Ej: Web App, Landing Page"
                        className={inputClasses} required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-mono tracking-widest">URL Imagen (Poster/Respaldo)</Label>
                      <Input 
                        value={newProject.image_url}
                        onChange={(e) => setNewProject({...newProject, image_url: e.target.value})}
                        placeholder="https://link-a-la-imagen.jpg"
                        className={inputClasses}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-mono tracking-widest">Tags (separados por comas)</Label>
                      <Input 
                        value={newProject.tags}
                        onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                        placeholder="React, Tailwind, Supabase..."
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-mono tracking-widest flex items-center gap-2">
                        <Globe className="w-3 h-3 text-primary" /> URL de Previsualización (Iframe)
                      </Label>
                      <Input 
                        value={newProject.link_demo} 
                        onChange={(e) => setNewProject({...newProject, link_demo: e.target.value})} 
                        placeholder="https://tu-sitio-web.com"
                        className={cn(inputClasses, "border-primary/50")} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-mono tracking-widest">URL Repositorio (Código)</Label>
                      <Input 
                        value={newProject.link_repo} 
                        onChange={(e) => setNewProject({...newProject, link_repo: e.target.value})} 
                        placeholder="https://github.com/..."
                        className={inputClasses} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-mono tracking-widest">Descripción del Proyecto</Label>
                    <Textarea 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className={cn(inputClasses, "min-h-[100px]")}
                    />
                  </div>
                  <NeonButton type="submit" className="w-full">
                    {editingProject ? <><Save className="w-4 h-4 mr-2" /> Actualizar Datos</> : <><Plus className="w-4 h-4 mr-2" /> Crear Proyecto</>}
                  </NeonButton>
                </form>
              </GlassCard>

              <div className="space-y-6">
                <h3 className="text-xl font-bold px-2">Archivos Activos</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {projects.map((p) => (
                    <GlassCard key={p.id} className="p-4 border-l-4 border-primary group">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{p.title}</h4>
                          <p className="text-[10px] text-muted-foreground uppercase">{p.category}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => startEditProject(p)} className="text-primary hover:scale-110 p-1"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteProject(p.id)} className="text-destructive hover:scale-110 p-1"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <LayoutDashboard className="text-primary w-5 h-5" /> Banco de Habilidades
                  </h3>
                  <NeonButton size="sm" onClick={handleAddSkill}>
                    <Plus className="w-4 h-4 mr-2" /> Nueva
                  </NeonButton>
                </div>
                
                <div className="space-y-12">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-6 rounded-2xl glass border-white/5 space-y-6 relative group">
                      <button 
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[9px] uppercase tracking-widest font-mono text-muted-foreground">Nombre</Label>
                          <Input 
                            value={skill.name}
                            onChange={(e) => setSkills(skills.map(s => s.id === skill.id ? {...s, name: e.target.value} : s))}
                            onBlur={() => handleUpdateSkill(skill.id, { name: skill.name })}
                            className={cn(inputClasses, "h-8 text-sm")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[9px] uppercase tracking-widest font-mono text-muted-foreground">Categoría</Label>
                          <Input 
                            value={skill.category}
                            onChange={(e) => setSkills(skills.map(s => s.id === skill.id ? {...s, category: e.target.value} : s))}
                            onBlur={() => handleUpdateSkill(skill.id, { category: skill.category })}
                            className={cn(inputClasses, "h-8 text-sm")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[9px] uppercase tracking-widest font-mono text-muted-foreground">Descripción</Label>
                        <Input 
                          value={skill.description || ""}
                          placeholder="Breve descripción..."
                          onChange={(e) => setSkills(skills.map(s => s.id === skill.id ? {...s, description: e.target.value} : s))}
                          onBlur={() => handleUpdateSkill(skill.id, { description: skill.description })}
                          className={cn(inputClasses, "h-8 text-sm")}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label className="text-[9px] uppercase tracking-widest font-mono text-muted-foreground">Nivel de Maestría</Label>
                          <span className="text-primary font-bold text-xs">{skill.level}%</span>
                        </div>
                        <Slider
                          value={[skill.level]}
                          max={100}
                          step={1}
                          onValueChange={(val) => setSkills(skills.map(s => s.id === skill.id ? {...s, level: val[0]} : s))}
                          onValueCommit={(val) => handleUpdateSkill(skill.id, { level: val[0] })}
                          className="py-2"
                        />
                      </div>
                    </div>
                  ))}
                  {skills.length === 0 && <p className="text-muted-foreground text-center py-8">No hay habilidades registradas.</p>}
                </div>
              </GlassCard>

              <div className="space-y-8">
                <GlassCard className="p-8 border-l-4 border-secondary">
                  <h3 className="text-xl font-bold mb-6">Estado de la Base de Datos</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                      <span className="text-sm font-mono uppercase tracking-tighter">Sincronización en Tiempo Real: Activa</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      El sistema detecta cambios en el enfoque (blur) de los campos de texto y los guarda automáticamente. Los deslizadores se sincronizan al soltar el ratón.
                    </p>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-8">
                  <h3 className="text-xl font-bold mb-4">Consejo de Edición</h3>
                  <p className="text-sm text-muted-foreground">
                    Para los proyectos, usa el botón de editar en la lista lateral para cargar los datos en el formulario principal. Al terminar, presiona "Actualizar Datos".
                  </p>
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