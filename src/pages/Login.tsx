"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      showSuccess("Acceso concedido. Entrando al sistema...");
      navigate("/admin");
    } catch (error: any) {
      showError(error.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all duration-300 h-12";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <GlassCard className="w-full max-w-md p-8 relative z-10" hoverGlow={false}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/50 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <img src="/src/assets/logo.svg" alt="Login Logo" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">SISTEMA DE <span className="text-primary">ACCESO</span></h1>
          <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mt-2">Nivel de Seguridad: Alpha</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-mono flex items-center gap-2">
              <User className="w-3 h-3 text-primary" /> Identificador (Email)
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@cyberportfolio.com" 
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-mono flex items-center gap-2">
              <Lock className="w-3 h-3 text-primary" /> Clave de Encriptación
            </Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <NeonButton 
            type="submit" 
            className="w-full h-12 text-lg" 
            disabled={loading}
          >
            {loading ? "VERIFICANDO..." : "INICIAR SESIÓN"}
          </NeonButton>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            Acceso restringido solo a personal autorizado
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;