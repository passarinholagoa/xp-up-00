
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Sword, Shield, Star } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Erro de Autenticação",
          description: error.message,
          variant: "destructive"
        });
      } else if (!isLogin) {
        toast({
          title: "Conta Criada! ✨",
          description: "Verifique seu email para confirmar a conta.",
          className: "bg-green-500/10 border-green-500/50"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Algo deu errado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-6">
            <div className="p-3 bg-quest-legendary/20 rounded-full">
              <Sword className="h-8 w-8 text-quest-legendary" />
            </div>
            <div className="p-3 bg-quest-epic/20 rounded-full">
              <Shield className="h-8 w-8 text-quest-epic" />
            </div>
            <div className="p-3 bg-quest-rare/20 rounded-full">
              <Star className="h-8 w-8 text-quest-rare" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-quest-legendary to-quest-epic bg-clip-text text-transparent">
            XpUp
          </h1>
          <p className="text-white/80 text-lg">
            Transforme sua vida em uma aventura épica
          </p>
        </div>
        
        {/* Auth Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Entre na Aventura' : 'Comece sua Jornada'}
            </h2>
            <p className="text-white/70">
              {isLogin ? 'Continue sua jornada heroica' : 'Crie sua conta de aventureiro'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-white/70 mb-4">
              {isLogin ? 'Novo aventureiro?' : 'Já tem uma conta?'}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsLogin(!isLogin)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              {isLogin ? 'Criar Conta' : 'Fazer Login'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
