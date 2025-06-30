
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Checa se o token está presente na URL
  useEffect(() => {
    const hash = location.hash;
    if (!hash.includes('access_token')) {
      toast({
        title: 'Link inválido',
        description: 'O link de redefinição está incorreto ou expirou.',
        variant: 'destructive',
      });
      setTimeout(() => navigate('/auth'), 2500);
    } else {
      setTokenChecked(true);
    }
  }, [location, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) {
      toast({ title: 'Erro', description: 'Preencha todos os campos.', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Senha muito curta', description: 'A senha deve ter pelo menos 6 caracteres.', variant: 'destructive' });
      return;
    }
    if (password !== confirm) {
      toast({ title: 'Senhas não conferem', description: 'As senhas digitadas são diferentes.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Senha redefinida!', description: 'Faça login com sua nova senha.', className: 'bg-green-500/10 border-green-500/50' });
    setTimeout(() => navigate('/auth'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Redefinir Senha</h2>
          <p className="text-white/80 text-center mb-6 text-sm">
            Digite sua nova senha abaixo. Sua conta estará protegida com a nova senha imediatamente após a alteração.
          </p>
          {tokenChecked ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Nova senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Digite a nova senha"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-white">Confirmar nova senha</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Confirme a nova senha"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-quest-gradient hover:opacity-90 text-white font-semibold py-3 glow-effect"
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>
            </form>
          ) : (
            <div className="text-center text-white/80 py-8">Verificando link de redefinição...</div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
