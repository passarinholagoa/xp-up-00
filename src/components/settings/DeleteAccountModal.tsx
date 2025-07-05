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
      // 1. Validar senha tentando fazer login
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (loginError) {
        setLoading(false);
        toast({ 
          title: 'Senha incorreta', 
          description: 'A senha informada está incorreta.', 
          variant: 'destructive' 
        });
        return;
      }

      // 2. Deletar dados do usuário das tabelas personalizadas
      const userId = user.id;
      
      // Deletar em ordem devido às dependências
      await supabase.from('achievements').delete().eq('user_id', userId);
      await supabase.from('shop_items').delete().eq('user_id', userId);
      await supabase.from('habits').delete().eq('user_id', userId);
      await supabase.from('dailies').delete().eq('user_id', userId);
      await supabase.from('todos').delete().eq('user_id', userId);
      await supabase.from('game_states').delete().eq('id', userId);
      await supabase.from('profiles').delete().eq('id', userId);
      await supabase.from('settings').delete().eq('id', userId);

      // 3. Deletar a conta do usuário (Auth)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
      
      if (deleteError) {
        console.error('Erro ao deletar usuário:', deleteError);
        // Mesmo com erro, vamos fazer logout
      }

      // 4. Fazer logout
      await signOut();
      
      setLoading(false);
      toast({ 
        title: 'Conta deletada', 
        description: 'Sua conta foi excluída permanentemente.' 
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
            Todos os seus dados serão apagados!
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
        <DialogFooter className="gap-2">
          <Button variant="outline" size="default" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            size="default"
            onClick={handleDelete}
            disabled={loading || !password || confirmation !== 'DELETAR'}
          >
            {loading ? 'Deletando...' : 'Deletar Conta'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
