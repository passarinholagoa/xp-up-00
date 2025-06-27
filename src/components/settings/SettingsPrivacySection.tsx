
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Key, Mail } from 'lucide-react';

export const SettingsPrivacySection = () => {
  const handleChangePassword = () => {
    // TODO: Implementar mudança de senha
    console.log('Mudança de senha solicitada');
  };

  const handleRecoverPassword = () => {
    // TODO: Implementar recuperação de senha
    console.log('Recuperação de senha solicitada');
  };

  return (
    <Card className="p-4 bg-green-900/20 border-green-800">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4 text-green-400" />
        <h3 className="font-semibold text-green-400">Privacidade & Conta</h3>
      </div>
      
      <div className="space-y-3">
        <Button
          onClick={handleChangePassword}
          variant="outline"
          className="w-full justify-start border-green-600/30 hover:bg-green-900/30 text-green-300"
        >
          <Key className="h-4 w-4 mr-3" />
          Alterar Senha
        </Button>
        
        <Button
          onClick={handleRecoverPassword}
          variant="outline"
          className="w-full justify-start border-green-600/30 hover:bg-green-900/30 text-green-300"
        >
          <Mail className="h-4 w-4 mr-3" />
          Recuperar Senha
        </Button>
      </div>
    </Card>
  );
};
