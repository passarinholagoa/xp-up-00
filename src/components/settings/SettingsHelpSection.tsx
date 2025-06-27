
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';

export const SettingsHelpSection = () => {
  const handleHelp = () => {
    // Aqui você pode implementar a lógica de ajuda
    console.log("Botão de ajuda clicado");
  };

  return (
    <Card className="p-4 bg-card/50 border-border">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <CircleHelp className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold text-cyan-400">Precisa de Ajuda?</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Tem dúvidas sobre como usar as configurações? Clique no botão abaixo para obter ajuda.
        </p>
        <Button 
          onClick={handleHelp}
          variant="outline"
          className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
        >
          <CircleHelp className="h-4 w-4 mr-2" />
          Obter Ajuda
        </Button>
      </div>
    </Card>
  );
};
