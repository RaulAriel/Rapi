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
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Code, 
  Briefcase, 
  LogOut, 
  Loader2, 
  Save, 
  X,
  Globe,
  MessageSquare,
  Star,
  Upload,
  Image as ImageIcon,
  HelpCircle
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
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { SortableProjectItem } from "@/components/SortableProjectItem";
import { SortableTestimonialItem } from "@/components/SortableTestimonialItem";
import { SortableFAQItem } from "@/components/SortableFAQItem";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingProject, setIsUploadingProject] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const inputClasses = "bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-300";

  // Project states
  const [editingProject, setEditingProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    link_demo: "",
    link_repo: "",
    image_url: "",
    is_hidden: false
  });

  // Testimonial states
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    rating: 5,
    image_url: "",
    text: "",
    is_hidden: false
  });

  // FAQ states
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    is_hidden: false
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
      const [projectsRes, testimonialsRes, faqsRes] = await Promise.all([
        supabase.from('projects').select('*').order('order_index', { ascending: true }),
        supabase.from('testimonials').select('*').order('order_index', { ascending: true }),
        supabase.from('faqs').select('*').order('order_index', { ascending: true })
      ]);

      if (projectsRes.data) setProjects(projectsRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (faqsRes.data) setFaqs(faqsRes.data);
    } catch (err) {
      console.error("Error crítico en fetchData:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateAndUpload = async (file: File, bucket: string) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Formato no permitido. Solo se permiten archivos PNG, JPEG o WEBP.");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("El archivo es demasiado grande (Máx 5MB)");
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error details:", uploadError);
      throw new Error(`Error al subir imagen.`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleProjectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProject(true);
    try {
      const url = await validateAndUpload(file, 'projects');
      setNewProject(prev => ({ ...prev, image_url: url }));
      showSuccess("Imagen del proyecto subida");
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsUploadingProject(false);
    }
  };

  const handleTestimonialFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await validateAndUpload(file, 'testimonials');
      setNewTestimonial(prev => ({ ...prev, image_url: url }));
      showSuccess("Foto de cliente subida");
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragEndProjects = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      const newOrder = arrayMove(projects, oldIndex, newIndex);
      setProjects(newOrder);
      const updates = newOrder.map((project, index) => ({ 
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        image_url: project.image_url,
        tags: project.tags,
        link_demo: project.link_demo,
        link_repo: project.link_repo,
        is_hidden: project.is_hidden,
        order_index: index, 
        user_id: user.id 
      }));
      await supabase.from('projects').upsert(updates);
      showSuccess("Orden de proyectos actualizado");
    }
  };

  const handleDragEndTestimonials = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = testimonials.findIndex((t) => t.id === active.id);
      const newIndex = testimonials.findIndex((t) => t.id === over.id);
      const newOrder = arrayMove(testimonials, oldIndex, newIndex);
      setTestimonials(newOrder);
      const updates = newOrder.map((t, index) => ({ 
        id: t.id,
        name: t.name,
        role: t.role,
        rating: t.rating,
        image_url: t.image_url,
        text: t.text,
        is_hidden: t.is_hidden,
        order_index: index, 
        user_id: user.id 
      }));
      await supabase.from('testimonials').upsert(updates);
      showSuccess("Orden de testimonios actualizado");
    }
  };

  const handleDragEndFAQs = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = faqs.findIndex((f) => f.id === active.id);
      const newIndex = faqs.findIndex((f) => f.id === over.id);
      const newOrder = arrayMove(faqs, oldIndex, newIndex);
      setFaqs(newOrder);
      const updates = newOrder.map((faq, index) => ({ 
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        is_hidden: faq.is_hidden,
        order_index: index, 
        user_id: user.id 
      }));
      await supabase.from('faqs').upsert(updates);
      showSuccess("Orden de FAQs actualizado");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Projects Handlers
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = typeof newProject.tags === 'string' ? newProject.tags.split(';').map(t => t.trim()).filter(t => t !== "") : newProject.tags;
    
    if (editingProject) {
      const { error } = await supabase.from('projects').update({ ...newProject, tags: tagsArray }).eq('id', editingProject.id);
      if (!error) {
        showSuccess("Proyecto actualizado");
        setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...newProject, tags: tagsArray } : p));
        resetProjectForm();
      } else {
        showError("Error al actualizar proyecto");
      }
    } else {
      const { data, error } = await supabase.from('projects').insert([{ ...newProject, tags: tagsArray, user_id: user.id, order_index: projects.length }]).select();
      if (!error && data) {
        showSuccess("Proyecto creado");
        setProjects([...projects, data[0]]);
        resetProjectForm();
      } else {
        showError("Error al crear proyecto");
      }
    }
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setNewProject({ title: "", category: "", description: "", tags: "", link_demo: "", link_repo: "", image_url: "", is_hidden: false });
  };

  // Testimonials Handlers
  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      const { error } = await supabase.from('testimonials').update(newTestimonial).eq('id', editingTestimonial.id);
      if (!error) {
        showSuccess("Testimonio actualizado");
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...newTestimonial } : t));
        resetTestimonialForm();
      }
    } else {
      const { data, error } = await supabase.from('testimonials').insert([{ ...newTestimonial, user_id: user.id, order_index: testimonials.length }]).select();
      if (!error && data) {
        showSuccess("Testimonio creado");
        setTestimonials([...testimonials, data[0]]);
        resetTestimonialForm();
      }
    }
  };

  const resetTestimonialForm = () => {
    setEditingTestimonial(null);
    setNewTestimonial({ name: "", role: "", rating: 5, image_url: "", text: "", is_hidden: false });
  };

  // FAQ Handlers
  const handleFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFAQ) {
      const { error } = await supabase.from('faqs').update(newFAQ).eq('id', editingFAQ.id);
      if (!error) {
        showSuccess("Pregunta actualizada");
        setFaqs(faqs.map(f => f.id === editingFAQ.id ? { ...f, ...newFAQ } : f));
        resetFAQForm();
      }
    } else {
      const { data, error } = await supabase.from('faqs').insert([{ ...newFAQ, user_id: user.id, order_index: faqs.length }]).select();
      if (!error && data) {
        showSuccess("Pregunta creada");
        setFaqs([...faqs, data[0]]);
        resetFAQForm();
      }
    }
  };

  const resetFAQForm = () => {
    setEditingFAQ(null);
    setNewFAQ({ question: "", answer: "", is_hidden: false });
  };

  const startEditTestimonial = (t: any) => {
    setEditingTestimonial(t);
    setNewTestimonial({ name: t.name, role: t.role, rating: t.rating, image_url: t.image_url || "", text: t.text, is_hidden: t.is_hidden || false });
  };

  const startEditFAQ = (f: any) => {
    setEditingFAQ(f);
    setNewFAQ({ question: f.question, answer: f.answer, is_hidden: f.is_hidden || false });
  };

  const handleDeleteTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      setTestimonials(testimonials.filter(t => t.id !== id));
      showSuccess("Testimonio eliminado");
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjects(projects.filter(p => p.id !== id));
      showSuccess("Proyecto eliminado");
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (!error) {
      setFaqs(faqs.filter(f => f.id !== id));
      showSuccess("Pregunta eliminada");
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
            <TabsTrigger value="projects" className="px-6 py-3 rounded-xl transition-all"><Briefcase className="w-4 h-4 mr-2" /> Proyectos</TabsTrigger>
            <TabsTrigger value="testimonials" className="px-6 py-3 rounded-xl transition-all"><MessageSquare className="w-4 h-4 mr-2" /> Testimonios</TabsTrigger>
            <TabsTrigger value="faqs" className="px-6 py-3 rounded-xl transition-all"><HelpCircle className="w-4 h-4 mr-2" /> FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard className="lg:col-span-2 p-8 h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}</h3>
                  {editingProject && <button onClick={resetProjectForm} className="text-muted-foreground hover:text-white flex items-center gap-1 text-sm"><X className="w-4 h-4" /> Cancelar</button>}
                </div>
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Título</Label><Input value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className={inputClasses} required /></div>
                    <div className="space-y-2"><Label>Categoría</Label><Input value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className={inputClasses} required /></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Imagen del Proyecto</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-16 rounded-lg glass border border-primary/30 overflow-hidden flex items-center justify-center">
                          {newProject.image_url ? (
                            <img src={newProject.image_url} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          )}
                          {isUploadingProject && (
                            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleProjectFileUpload} 
                          className="cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-full file:px-4" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2"><Label>Tags (;)</Label><Input value={newProject.tags} onChange={(e) => setNewProject({...newProject, tags: e.target.value})} className={inputClasses} placeholder="React; Tailwild; Supabase" /></div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Enlace Externo</Label><Input value={newProject.link_demo} onChange={(e) => setNewProject({...newProject, link_demo: e.target.value})} className={inputClasses} placeholder="https://..." /></div>
                    <div className="space-y-2"><Label>Repositorio</Label><Input value={newProject.link_repo} onChange={(e) => setNewProject({...newProject, link_repo: e.target.value})} className={inputClasses} placeholder="https://github.com/..." /></div>
                  </div>
                  <div className="space-y-2"><Label>Descripción</Label><Textarea value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className={inputClasses} /></div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-background/50">
                    <div className="space-y-0.5">
                      <Label>Ocultar Proyecto</Label>
                      <p className="text-[10px] text-muted-foreground">El proyecto no será visible en la web pública.</p>
                    </div>
                    <Switch checked={newProject.is_hidden} onCheckedChange={(c) => setNewProject({...newProject, is_hidden: c})} />
                  </div>

                  <NeonButton type="submit" className="w-full" disabled={isUploadingProject}>{editingProject ? "Actualizar Proyecto" : "Crear Proyecto"}</NeonButton>
                </form>
              </GlassCard>
              <div className="space-y-4">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndProjects}>
                  <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                    {projects.map((p) => (
                      <SortableProjectItem 
                        key={p.id} 
                        project={p} 
                        onEdit={(p) => { setEditingProject(p); setNewProject({ ...p, tags: p.tags?.join('; ') || "", is_hidden: p.is_hidden || false }); }} 
                        onDelete={handleDeleteProject} 
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testimonials">
            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard className="lg:col-span-2 p-8 h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingTestimonial ? "Editar Testimonio" : "Nuevo Testimonio"}</h3>
                  {editingTestimonial && <button onClick={resetTestimonialForm} className="text-muted-foreground hover:text-white flex items-center gap-1 text-sm"><X className="w-4 h-4" /> Cancelar</button>}
                </div>
                <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label>Nombre</Label><Input value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className={inputClasses} required /></div>
                    <div className="space-y-2"><Label>Rol / Empresa</Label><Input value={newTestimonial.role} onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})} className={inputClasses} required /></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                      <Label>Foto de Perfil</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-full glass border border-primary/30 overflow-hidden flex items-center justify-center">
                          {newTestimonial.image_url ? (
                            <img src={newTestimonial.image_url} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          )}
                          {isUploading && (
                            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                              <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleTestimonialFileUpload} 
                          className="cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-full file:px-4" 
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between"><Label>Valoración</Label><span className="text-primary font-bold">{newTestimonial.rating} Estrellas</span></div>
                      <Slider value={[newTestimonial.rating]} max={5} min={1} step={1} onValueChange={(v) => setNewTestimonial({...newTestimonial, rating: v[0]})} />
                    </div>
                  </div>

                  <div className="space-y-2"><Label>Testimonio</Label><Textarea value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className={cn(inputClasses, "min-h-[120px]")} required /></div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-background/50">
                    <div className="space-y-0.5">
                      <Label>Ocultar Testimonio</Label>
                      <p className="text-[10px] text-muted-foreground">No se mostrará en la sección pública.</p>
                    </div>
                    <Switch checked={newTestimonial.is_hidden} onCheckedChange={(c) => setNewTestimonial({...newTestimonial, is_hidden: c})} />
                  </div>

                  <NeonButton type="submit" className="w-full" disabled={isUploading}>{editingTestimonial ? "Actualizar" : "Crear"}</NeonButton>
                </form>
              </GlassCard>
              <div className="space-y-4">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndTestimonials}>
                  <SortableContext items={testimonials.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {testimonials.map((t) => (
                      <SortableTestimonialItem key={t.id} testimonial={t} onEdit={startEditTestimonial} onDelete={handleDeleteTestimonial} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faqs">
            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard className="lg:col-span-2 p-8 h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingFAQ ? "Editar Pregunta" : "Nueva Pregunta"}</h3>
                  {editingFAQ && <button onClick={resetFAQForm} className="text-muted-foreground hover:text-white flex items-center gap-1 text-sm"><X className="w-4 h-4" /> Cancelar</button>}
                </div>
                <form onSubmit={handleFAQSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Pregunta</Label>
                    <Input 
                      value={newFAQ.question} 
                      onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})} 
                      className={inputClasses} 
                      placeholder="¿Cómo trabajas?"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Respuesta</Label>
                    <Textarea 
                      value={newFAQ.answer} 
                      onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})} 
                      className={cn(inputClasses, "min-h-[120px]")} 
                      placeholder="Explica tu metodología aquí..."
                      required 
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-primary/20 bg-background/50">
                    <div className="space-y-0.5">
                      <Label>Ocultar Pregunta</Label>
                      <p className="text-[10px] text-muted-foreground">La pregunta no aparecerá en el listado.</p>
                    </div>
                    <Switch checked={newFAQ.is_hidden} onCheckedChange={(c) => setNewFAQ({...newFAQ, is_hidden: c})} />
                  </div>

                  <NeonButton type="submit" className="w-full">
                    {editingFAQ ? "Actualizar Pregunta" : "Añadir Pregunta"}
                  </NeonButton>
                </form>
              </GlassCard>
              <div className="space-y-4">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndFAQs}>
                  <SortableContext items={faqs.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    {faqs.map((f) => (
                      <SortableFAQItem 
                        key={f.id} 
                        faq={f} 
                        onEdit={startEditFAQ} 
                        onDelete={handleDeleteFAQ} 
                      />
                    ))}
                  </SortableContext>
                </DndContext>
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