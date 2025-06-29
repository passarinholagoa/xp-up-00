import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface SignUpFormProps {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ email, password, loading, onEmailChange, onPasswordChange, onSubmit }) => (
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
      <Input
        id="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        required
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="••••••••"
      />
    </div>
    <Button
      type="submit"
      disabled={loading}
      className="w-full bg-quest-gradient hover:opacity-90 text-white font-semibold py-3 glow-effect"
    >
      {loading ? 'Carregando...' : 'Criar Conta'}
    </Button>
  </form>
);

export default SignUpForm; 