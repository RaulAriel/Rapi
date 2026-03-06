"use client";

import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GlassCard } from "./GlassCard";
import { GripVertical, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";

interface SortableSkillItemProps {
  skill: any;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  inputClasses: string;
}

export const SortableSkillItem = ({ skill, onUpdate, onDelete, inputClasses }: SortableSkillItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={style}>
      <GlassCard className={cn(
        "p-6 rounded-2xl glass border-white/5 space-y-6 relative group",
        isDragging && "shadow-2xl border-primary"
      )}>
        <div className="flex items-center gap-2">
          <button 
            {...attributes} 
            {...listeners} 
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-primary transition-colors p-1"
          >
            <GripVertical className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-mono text-muted-foreground uppercase">ID: {skill.id.slice(0,8)}</span>
        </div>

        <button 
          onClick={() => onDelete(skill.id)} 
          className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[9px] uppercase tracking-widest">Nombre</Label>
            <Input 
              value={skill.name} 
              onChange={(e) => onUpdate(skill.id, { name: e.target.value })} 
              className={cn(inputClasses, "h-8 text-sm")} 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[9px] uppercase tracking-widest">Categoría</Label>
            <Input 
              value={skill.category} 
              onChange={(e) => onUpdate(skill.id, { category: e.target.value })} 
              className={cn(inputClasses, "h-8 text-sm")} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[9px] uppercase tracking-widest">Descripción</Label>
          <Input 
            value={skill.description || ""} 
            onChange={(e) => onUpdate(skill.id, { description: e.target.value })} 
            className={cn(inputClasses, "h-8 text-sm")} 
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-[9px] uppercase tracking-widest">Nivel</Label>
            <span className="text-primary font-bold text-xs">{skill.level}%</span>
          </div>
          <Slider 
            value={[skill.level]} 
            max={100} 
            step={1} 
            onValueChange={(val) => onUpdate(skill.id, { level: val[0] })} 
            className="py-2" 
          />
        </div>
      </GlassCard>
    </div>
  );
};