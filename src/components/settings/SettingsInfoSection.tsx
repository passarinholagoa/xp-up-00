
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

export const SettingsInfoSection = () => {
  const { openAchievements } = useGame();

  return (
    <Card className="p-4 bg-blue-900/20 border-blue-800">
      <div className="flex flex-col items-center gap-3">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">🏆 Conquistas</h3>
          <p className="text-sm text-blue-400">
            Veja seu progresso e todas as conquistas desbloqueadas
          </p>
        </div>
        
        <Button
          onClick={openAchievements}
          className="w-full bg-quest-legendary hover:bg-quest-legendary/80 text-white font-medium"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Ver Conquistas
        </Button>
      </div>
    </Card>
  );
};
