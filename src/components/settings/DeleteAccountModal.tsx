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
      toast({ title: 'Confirmação incorreta', description: 'Digite DELETAR para confirmar.', variant: 'destructive' });
      return;
    }
    if (!password) {
      toast({ title: 'Senha obrigatória', description: 'Digite sua senha para confirmar.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    // 1. Validar senha
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user?.email || '',
      password,
    });
    if (loginError) {
      setLoading(false);
      toast({ title: 'Senha incorreta', description: 'A senha informada está errada.', variant: 'destructive' });
      return;
    }
    // 2. Chamar Edge Function para deletar conta
    const { error: deleteError } = await supabase.functions.invoke('user-self-deletion');
    if (deleteError) {
      setLoading(false);
      toast({ title: 'Erro ao deletar', description: 'Não foi possível excluir sua conta. Tente novamente.', variant: 'destructive' });
      return;
    }
    // 3. Logout e redirecionar
    await signOut();
    setLoading(false);
    toast({ title: 'Conta deletada', description: 'Sua conta foi excluída permanentemente.' });
    onClose();
    navigate('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
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