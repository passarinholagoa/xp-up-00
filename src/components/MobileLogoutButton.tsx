
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const MobileLogoutButton = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    signOut();
    toast({
      title: "Logout realizado",
      description: `Até logo!`,
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
    >
      <LogOut className="h-5 w-5 mr-3" />
      Sair
    </Button>
  );
};
