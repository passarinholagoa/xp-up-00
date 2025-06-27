
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const LogoutButton = () => {
  const { logout, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: `Até logo, ${user?.name}!`,
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleLogout}
      className="flex items-center gap-2 h-12 px-4"
    >
      <LogOut className="h-5 w-5" />
      Sair
    </Button>
  );
};
