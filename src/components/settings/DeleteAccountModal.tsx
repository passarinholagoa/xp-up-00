
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

      // 2. Deletar dados do usuário das tabelas personalizadas
      const userId = user.id;
      
      console.log('Iniciando exclusão dos dados do usuário:', userId);

      // Deletar em ordem devido às dependências
      const { error: achievementsError } = await supabase
        .from('achievements')
        .delete()
        .eq('user_id', userId);
      
      if (achievementsError) {
        console.error('Erro ao deletar achievements:', achievementsError);
      }

      const { error: shopItemsError } = await supabase
        .from('shop_items')
        .delete()
        .eq('user_id', userId);
      
      if (shopItemsError) {
        console.error('Erro ao deletar shop_items:', shopItemsError);
      }

      const { error: habitsError } = await supabase
        .from('habits')
        .delete()
        .eq('user_id', userId);
      
      if (habitsError) {
        console.error('Erro ao deletar habits:', habitsError);
      }

      const { error: dailiesError } = await supabase
        .from('dailies')
        .delete()
        .eq('user_id', userId);
      
      if (dailiesError) {
        console.error('Erro ao deletar dailies:', dailiesError);
      }

      const { error: todosError } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', userId);
      
      if (todosError) {
        console.error('Erro ao deletar todos:', todosError);
      }

      const { error: gameStatesError } = await supabase
        .from('game_states')
        .delete()
        .eq('id', userId);
      
      if (gameStatesError) {
        console.error('Erro ao deletar game_states:', gameStatesError);
      }

      const { error: profilesError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (profilesError) {
        console.error('Erro ao deletar profiles:', profilesError);
      }

      const { error: settingsError } = await supabase
        .from('settings')
        .delete()
        .eq('id', userId);
      
      if (settingsError) {
        console.error('Erro ao deletar settings:', settingsError);
      }

      console.log('Dados do usuário deletados com sucesso');

      // 3. Fazer signOut para limpar a sessão
      await signOut();
      
      setLoading(false);
      toast({ 
        title: 'Conta deletada', 
        description: 'Todos os seus dados foram excluídos. Você será redirecionado para a página de login.' 
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
            Todos os seus dados serão apagados, mas a conta de email permanecerá no sistema por questões de segurança.
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
