
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

export const LogoutButton = () => {
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    signOut();
    toast({
      title: "Logout realizado",
      description: `Até logo!`,
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  if (isMobile) {
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
  }

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
