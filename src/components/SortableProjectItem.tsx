"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GlassCard } from './GlassCard';
import { GripVertical, Edit3, Trash2 } from 'lucide-react';

interface SortableProjectItemProps {
  project: any;
  onEdit: (project: any) => void;
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
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <GlassCard className="p-4 border-l-4 border-primary group relative">
        <div className="flex justify-between items-start gap-3">
          <button 
            {...attributes} 
            {...listeners}
            className="mt-1 text-muted-foreground hover:text-primary cursor-grab active:cursor-grabbing transition-colors"
          >
            <GripVertical className="w-5 h-5" />
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm truncate">{project.title}</h4>
            <p className="text-[10px] text-muted-foreground uppercase">{project.category}</p>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(project)} 
              className="text-primary hover:scale-110 p-1"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(project.id)} 
              className="text-destructive hover:scale-110 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};