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
import { Plus, Trash2, LayoutDashboard, Code, Briefcase, LogOut, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    link_demo: "",
    link_repo: "",
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
      supabase.from('skills').select('*').order('created_at'),
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

  const handleSkillChange = async (id: string, newLevel: number[]) => {
    const level = newLevel[0];
    setSkills(skills.map(s => s.id === id ? { ...s, level } : s));
    
    const { error } = await supabase
      .from('skills')
      .update({ level })
      .eq('id', id);

    if (error) showError("Error al actualizar nivel");
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = newProject.tags.split(',').map(t => t.trim()).filter(t => t !== "");
    
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        ...newProject,
        tags: tagsArray,
        user_id: user.id
      }])
      .select();

    if (error) {
      showError(error.message);
    } else {
      showSuccess("Proyecto desplegado con éxito");
      setProjects([data[0], ...projects]);
      setNewProject({ title: "", category: "", description: "", tags: "", link_demo: "", link_repo: "" });
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      showError("Error al eliminar");
    } else {
      setProjects(projects.filter(p => p.id !== id));
      showSuccess("Proyecto eliminado");
    }
  };

  const handleAddSkill = async () => {
    const { data, error } = await supabase
      .from('skills')
      .insert([{ name: "Nueva Skill", category: "Frontend", level: 50, user_id: user.id }])
      .select();

    if (error) showError(error.message);
    else if (data) setSkills([...skills, data[0]]);
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
            title="Panel de Control" 
            subtitle="Gestión centralizada de activos digitales en tiempo real."
            align="left"
            className="mb-0"
          />
          <NeonButton variant="outline" glowColor="blue" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
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
                        required
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
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="demo">Link Demo</Label>
                      <Input id="demo" value={newProject.link_demo} onChange={(e) => setNewProject({...newProject, link_demo: e.target.value})} placeholder="https://..." className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repo">Link Repo</Label>
                      <Input id="repo" value={newProject.link_repo} onChange={(e) => setNewProject({...newProject, link_repo: e.target.value})} placeholder="https://github.com/..." className="bg-white/5 border-white/10" />
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
                    <Label htmlFor="desc">Descripción</Label>
                    <textarea 
                      id="desc" 
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full min-h-[100px] rounded-xl bg-white/5 border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Describe la misión..."
                    />
                  </div>
                  <NeonButton type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Registrar en la Matrix
                  </NeonButton>
                </form>
              </GlassCard>

              <div className="space-y-6">
                <h3 className="text-xl font-bold px-2">Proyectos Activos</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {projects.map((p) => (
                    <GlassCard key={p.id} className="p-4 border-l-4 border-primary">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm">{p.title}</h4>
                          <p className="text-[10px] text-muted-foreground uppercase">{p.category}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteProject(p.id)}
                          className="text-destructive hover:scale-110 transition-transform p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                  {projects.length === 0 && <p className="text-muted-foreground text-center py-8">No hay proyectos.</p>}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <LayoutDashboard className="text-primary w-5 h-5" /> Sincronización de Skills
                  </h3>
                  <button onClick={handleAddSkill} className="text-primary hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-8">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label className="font-mono text-xs uppercase tracking-widest">{skill.name}</Label>
                          <p className="text-[10px] text-muted-foreground">{skill.category}</p>
                        </div>
                        <span className="text-primary font-bold">{skill.level}%</span>
                      </div>
                      <Slider
                        value={[skill.level]}
                        max={100}
                        step={1}
                        onValueChange={(val) => handleSkillChange(skill.id, val)}
                        className="py-2"
                      />
                    </div>
                  ))}
                  {skills.length === 0 && <p className="text-muted-foreground text-center">Sin habilidades registradas.</p>}
                </div>
              </GlassCard>

              <GlassCard className="p-8">
                <h3 className="text-xl font-bold mb-6">Estado del Sistema</h3>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 text-sm font-mono">
                    <p className="text-primary mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> DATABASE_SYNC: OK
                    </p>
                    <p className="text-muted-foreground italic">
                      Todos los cambios se guardan automáticamente en tiempo real. La arquitectura reactiva asegura que los visitantes vean las actualizaciones sin recargar.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;