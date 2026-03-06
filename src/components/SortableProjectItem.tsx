"use client";

import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GlassCard } from "./GlassCard";
import { GripVertical, Edit3, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableProjectItemProps {
  project: any;
  onEdit: (p: any) => void;
  onDelete: (id: string) => void;
}

export const SortableProjectItem = ({ project, onEdit, onDelete }: SortableProjectItemProps) => {
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