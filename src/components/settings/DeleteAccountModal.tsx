
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmation !== 'DELETAR') {
      toast({ 
        title: 'Confirmação incorreta', 
        description: 'Digite DELETAR para confirmar.', 
        variant: 'destructive' 
      });
      return;
    }
    
    if (!password) {
      toast({ 
        title: 'Senha obrigatória', 
        description: 'Digite sua senha para confirmar.', 
        variant: 'destructive' 
      });
      return;
    }

    if (!user?.email) {
      toast({ 
        title: 'Erro', 
        description: 'Usuário não encontrado.', 
        variant: 'destructive' 
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Re-autenticar o usuário para validar a senha
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (reauthError) {
        setLoading(false);
        toast({ 
          title: 'Senha incorreta', 
          description: 'A senha informada está incorreta.', 
          variant: 'destructive' 
        });
        return;
      }

      // 2. Chamar a Edge Function para deletar completamente a conta
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        setLoading(false);
        toast({ 
          title: 'Erro de autenticação', 
          description: 'Não foi possível obter o token de acesso.', 
          variant: 'destructive' 
        });
        return;
      }

      const response = await fetch('https://fhzsjpqbmfeafvysojvz.supabase.co/functions/v1/delete-user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da Edge Function:', errorData);
        setLoading(false);
        toast({ 
          title: 'Erro ao deletar conta', 
          description: 'Não foi possível deletar a conta. Tente novamente.', 
          variant: 'destructive' 
        });
        return;
      }

      // 3. Fazer signOut local
      await signOut();
      
      setLoading(false);
      toast({ 
        title: 'Conta deletada', 
        description: 'Sua conta e todos os dados foram excluídos permanentemente.' 
      });
      
      onClose();
      navigate('/auth');
      
    } catch (error) {
      console.error('Erro geral ao deletar conta:', error);
      setLoading(false);
      toast({ 
        title: 'Erro ao deletar', 
        description: 'Não foi possível excluir sua conta. Tente novamente.', 
        variant: 'destructive' 
      });
    }
  };

  const handleClose = () => {
    if (!loading) {
      setPassword('');
      setConfirmation('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-400">Deletar Conta</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-red-300 font-semibold">
            Esta ação é <span className="underline">permanente</span> e <span className="underline">irreversível</span>.<br />
            Sua conta e todos os dados associados serão apagados completamente!
          </p>
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <Input
            type="text"
            placeholder="Digite DELETAR para confirmar"
            value={confirmation}
            onChange={e => setConfirmation(e.target.value.toUpperCase())}
            disabled={loading}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || !password || confirmation !== 'DELETAR'}
            className="ml-2"
          >
            {loading ? 'Deletando...' : 'Deletar Conta'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
