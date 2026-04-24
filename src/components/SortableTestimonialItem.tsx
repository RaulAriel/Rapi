"use client";

import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GlassCard } from "./GlassCard";
import { GripVertical, Edit3, Trash2, Star, EyeOff } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface SortableTestimonialItemProps {
  testimonial: any;
  onEdit: (t: any) => void;
  onDelete: (id: string) => void;
}

export const SortableTestimonialItem = ({ testimonial, onEdit, onDelete }: SortableTestimonialItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: testimonial.id });

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
        
        <Avatar className="w-10 h-10">
          <AvatarImage src={testimonial.image_url} />
          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate flex items-center gap-2">
            {testimonial.name}
            {testimonial.is_hidden && <span title="Oculto en la web" className="flex"><EyeOff className="w-3 h-3 text-destructive" /></span>}
          </h4>
          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(testimonial)} className="text-primary hover:scale-110 p-2">
            <Edit3 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(testimonial.id)} className="text-destructive hover:scale-110 p-2">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};