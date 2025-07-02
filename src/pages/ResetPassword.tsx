
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const validatePassword = (pass: string) => {
    return pass.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast({ 
        title: 'Campos obrigatórios', 
        description: 'Preencha todos os campos.', 
        variant: 'destructive' 
      });
      return;
    }
    
    if (!validatePassword(password)) {
      toast({ 
        title: 'Senha muito curta', 
        description: 'A senha deve ter pelo menos 6 caracteres.', 
        variant: 'destructive' 
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({ 
        title: 'Senhas não conferem', 
        description: 'As senhas digitadas são diferentes.', 
        variant: 'destructive' 
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Tentando atualizar senha...');
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error('Erro ao atualizar senha:', error);
        toast({ 
          title: 'Erro ao redefinir senha', 
          description: error.message, 
          variant: 'destructive' 
        });
        return;
      }
      
      console.log('Senha atualizada com sucesso');
      toast({ 
        title: 'Senha redefinida com sucesso!', 
        description: 'Você será redirecionado para fazer login com sua nova senha.', 
        className: 'bg-green-500/10 border-green-500/50' 
      });
      
      // Limpar a sessão e redirecionar para login
      await supabase.auth.signOut();
      setTimeout(() => navigate('/auth'), 2000);
      
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({ 
        title: 'Erro inesperado', 
        description: 'Tente novamente mais tarde.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
          <div className="text-center mb-6">
            <Lock className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Redefinir Senha</h2>
            <p className="text-white/80 text-sm">
              Digite sua nova senha abaixo. Certifique-se de que ambas as senhas sejam idênticas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Nova senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12"
                  placeholder="Digite a nova senha (mín. 6 caracteres)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 text-xs">
                  {validatePassword(password) ? (
                    <CheckCircle className="h-3 w-3 text-green-400" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-red-400" />
                  )}
                  <span className={validatePassword(password) ? "text-green-400" : "text-red-400"}>
                    {validatePassword(password) ? "Senha válida" : "Mín. 6 caracteres"}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirmar nova senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12"
                  placeholder="Confirme a nova senha"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="flex items-center gap-2 text-xs">
                  {password === confirmPassword ? (
                    <CheckCircle className="h-3 w-3 text-green-400" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-red-400" />
                  )}
                  <span className={password === confirmPassword ? "text-green-400" : "text-red-400"}>
                    {password === confirmPassword ? "Senhas conferem" : "Senhas diferentes"}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading || !validatePassword(password) || password !== confirmPassword}
              className="w-full bg-quest-gradient hover:opacity-90 text-white font-semibold py-3 glow-effect disabled:opacity-50"
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Voltar ao Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
