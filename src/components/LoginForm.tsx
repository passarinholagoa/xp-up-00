
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, password, loading, onEmailChange, onPasswordChange, onSubmit, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="seu@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="mt-2 text-xs text-blue-300 hover:underline focus:outline-none"
          >
            Esqueci minha senha?
          </button>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-quest-gradient hover:opacity-90 text-white font-semibold py-3 glow-effect"
      >
        {loading ? 'Carregando...' : 'Entrar'}
      </Button>
    </form>
  );
};

export default LoginForm;
