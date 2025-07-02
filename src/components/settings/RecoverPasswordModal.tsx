
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RecoverPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecoverPasswordModal = ({ isOpen, onClose }: RecoverPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Pré-preencher com o email do usuário logado
  React.useEffect(() => {
    if (user?.email && isOpen) {
      setEmail(user.email);
    }
  }, [user?.email, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Digite seu email",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Erro",
        description: "Digite um email válido",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Usar a URL atual do aplicativo para garantir que funcione em qualquer ambiente
      const currentUrl = window.location.origin;
      const redirectUrl = `${currentUrl}/reset-password`;
      
      console.log('Enviando email de recuperação para:', email);
      console.log('URL de redirecionamento:', redirectUrl);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) {
        console.error('Erro ao enviar email:', error);
        toast({
          title: "Erro ao enviar email",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      setEmailSent(true);
      toast({
        title: "Email enviado com sucesso!",
        description: "Verifique sua caixa de entrada e clique no link para redefinir sua senha",
        className: "bg-green-500/10 border-green-500/50"
      });
    } catch (err) {
      console.error('Erro inesperado:', err);
      toast({
        title: "Erro inesperado",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail('');
    setEmailSent(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Recuperar Senha
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Enviaremos um link de redefinição de senha para este email
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={handleClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Send className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Email
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <Send className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-green-600 mb-1">Email Enviado!</h3>
              <p className="text-sm text-muted-foreground">
                Enviamos um link para <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Clique no link do email para redefinir sua senha
              </p>
            </div>
            
            <Button 
              onClick={handleClose}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
