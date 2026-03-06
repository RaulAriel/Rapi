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
  Globe,
  GripVertical
} from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableProjectItem = ({ 
  project, 
  onEdit, 
  onDelete 
}: { 
  project: any, 
  onEdit: (p: any) => void, 
  onDelete: (id: string) => void 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={style}>
      <GlassCard className={cn(
        "p-4 border-l-4 border-primary group flex items-center gap-4",
        isDragging && "shadow-2xl border-primary"
      )}>
        <button 
          {...attributes} 
          {...listeners} 
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors p-2"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate">{project.title}</h4>
          <p className="text-[10px] text-muted-foreground uppercase">{project.category}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(project)} className="text-primary hover:scale-110 p-2">
            <Edit3 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(project.id)} className="text-destructive hover:scale-110 p-2">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const inputClasses = "bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-300";

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
    try {
      const [skillsRes, projectsRes] = await Promise.all([
        supabase.from('skills').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('order_index', { ascending: true })
      ]);

      if (skillsRes.data) setSkills(skillsRes.data);
      
      // Si hay error en proyectos (posiblemente por falta de columna order_index), intentamos sin ella
      if (projectsRes.error) {
        console.warn("Error fetching projects with order_index, falling back to created_at");
        const fallbackRes = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (fallbackRes.data) setProjects(fallbackRes.data);
      } else if (projectsRes.data) {
        setProjects(projectsRes.data);
      }
    } catch (err) {
      console.error("Error en fetchData:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(projects, oldIndex, newIndex);
      setProjects(newOrder);

      // Importante: Mandar todos los campos para no sobreescribir con nulos si la política es estricta
      const updates = newOrder.map((project, index) => ({
        ...project,
        order_index: index,
        user_id: user.id
      }));

      const { error } = await supabase
        .from('projects')
        .upsert(updates);

      if (error) {
        showError("Error al guardar el orden. Asegúrate de haber ejecutado el SQL de la columna order_index.");
        fetchData();
      } else {
        showSuccess("Orden actualizado");
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleUpdateSkill = async (id: string, updates: any) => {
    const { error } = await supabase.from('skills').update(updates).eq('id', id);
    if (error) showError("Error al actualizar skill");
    else {
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
      .insert([{ name: "Nueva Habilidad", category: "Frontend", level: 50, user_id: user.id }])
      .select();
    if (error) showError(error.message);
    else if (data) setSkills([data[0], ...skills]);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = typeof newProject.tags === 'string' 
      ? newProject.tags.split(',').map(t => t.trim()).filter(t => t !== "")
      : newProject.tags;

    if (editingProject) {
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
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...newProject, tags: tagsArray, user_id: user.id, order_index: projects.length }])
        .select();

      if (error) showError(error.message);
      else {
        showSuccess("Proyecto creado");
        if (data) setProjects([...projects, data[0]]);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24 container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <SectionHeading title="SISTEMA DE CONTROL" subtitle="Modifica la infraestructura de tu presencia digital." align="left" className="mb-0" />
          <NeonButton variant="outline" glowColor="blue" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Desconectar</NeonButton>
        </div>

        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="glass border-white/5 p-1 h-auto flex-wrap justify-start gap-2">
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6 py-3 rounded-xl transition-all"><Briefcase className="w-4 h-4 mr-2" /> Proyectos</TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-6 py-3 rounded-xl transition-all"><Code className="w-4 h-4 mr-2" /> Habilidades</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard className="lg:col-span-2 p-8 h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingProject ? "Editar Misión" : "Registrar Nueva Misión"}</h3>
                  {editingProject && <button onClick={resetProjectForm} className="text-muted-foreground hover:text-white flex items-center gap-1 text-sm"><X className="w-4 h-4" /> Cancelar</button>}
                </div>
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest">Título</Label><Input value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className={inputClasses} required /></div>
                    <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest">Categoría</Label><Input value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className={inputClasses} required /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest">URL Imagen</Label><Input value={newProject.image_url} onChange={(e) => setNewProject({...newProject, image_url: e.target.value})} className={inputClasses} /></div>
                    <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest">Tags</Label><Input value={newProject.tags} onChange={(e) => setNewProject({...newProject, tags: e.target.value})} className={inputClasses} /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest flex items-center gap-2"><Globe className="w-3 h-3 text-primary" /> URL Previsualización</Label><Input value={newProject.link_demo} onChange={(e) => setNewProject({...newProject, link_demo: e.target.value})} className={cn(inputClasses, "border-primary/50")} /></div>
                    <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest">Repo</Label><Input value={newProject.link_repo} onChange={(e) => setNewProject({...newProject, link_repo: e.target.value})} className={inputClasses} /></div>
                  </div>
                  <div className="space-y-2"><Label className="text-[10px] uppercase font-mono tracking-widest">Descripción</Label><Textarea value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className={cn(inputClasses, "min-h-[100px]")} /></div>
                  <NeonButton type="submit" className="w-full">{editingProject ? <><Save className="w-4 h-4 mr-2" /> Actualizar</> : <><Plus className="w-4 h-4 mr-2" /> Crear</>}</NeonButton>
                </form>
              </GlassCard>

              <div className="space-y-6">
                <h3 className="text-xl font-bold px-2">Archivos Activos (Arrastra para ordenar)</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                      {projects.map((p) => (
                        <SortableProjectItem key={p.id} project={p} onEdit={startEditProject} onDelete={handleDeleteProject} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="grid md:grid-cols-2 gap-8">
              <GlassCard className="p-8">
                <div className="flex justify-between items-center mb-8"><h3 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="text-primary w-5 h-5" /> Banco de Habilidades</h3><NeonButton size="sm" onClick={handleAddSkill}><Plus className="w-4 h-4 mr-2" /> Nueva</NeonButton></div>
                <div className="space-y-12">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-6 rounded-2xl glass border-white/5 space-y-6 relative group">
                      <button onClick={() => handleDeleteSkill(skill.id)} className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"><Trash2 className="w-4 h-4" /></button>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label className="text-[9px] uppercase tracking-widest">Nombre</Label><Input value={skill.name} onChange={(e) => setSkills(skills.map(s => s.id === skill.id ? {...s, name: e.target.value} : s))} onBlur={() => handleUpdateSkill(skill.id, { name: skill.name })} className={cn(inputClasses, "h-8 text-sm")} /></div>
                        <div className="space-y-2"><Label className="text-[9px] uppercase tracking-widest">Categoría</Label><Input value={skill.category} onChange={(e) => setSkills(skills.map(s => s.id === skill.id ? {...s, category: e.target.value} : s))} onBlur={() => handleUpdateSkill(skill.id, { category: skill.category })} className={cn(inputClasses, "h-8 text-sm")} /></div>
                      </div>
                      <div className="space-y-2"><Label className="text-[9px] uppercase tracking-widest">Descripción</Label><Input value={skill.description || ""} onChange={(e) => setSkills(skills.map(s => s.id === skill.id ? {...s, description: e.target.value} : s))} onBlur={() => handleUpdateSkill(skill.id, { description: skill.description })} className={cn(inputClasses, "h-8 text-sm")} /></div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center"><Label className="text-[9px] uppercase tracking-widest">Nivel</Label><span className="text-primary font-bold text-xs">{skill.level}%</span></div>
                        <Slider value={[skill.level]} max={100} step={1} onValueChange={(val) => setSkills(skills.map(s => s.id === skill.id ? {...s, level: val[0]} : s))} onValueCommit={(val) => handleUpdateSkill(skill.id, { level: val[0] })} className="py-2" />
                      </div>
                    </div>
                  ))}
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