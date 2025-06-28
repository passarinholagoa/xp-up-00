
import React from 'react';
import { Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

export const QuickActions = () => {
  const { openAchievements, gameState } = useGame();

  const xpRemaining = gameState.maxXp - gameState.xp;
  const xpPercentage = gameState.maxXp > 0 ? (gameState.xp / gameState.maxXp) * 100 : 100;

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card className="quest-card">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">
            {gameState.level >= 100 ? 'Nível Máximo!' : 'Próximo Nível'}
          </h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nível {gameState.level}</span>
              <span>
                {gameState.level >= 100 ? 'MAX' : `Nível ${gameState.level + 1}`}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill bg-xp-gradient"
                style={{ width: `${xpPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {gameState.level >= 100 
                ? 'Você alcançou o nível máximo!' 
                : `${xpRemaining.toLocaleString()} XP restantes`
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Achievements Preview */}
      <Card className="quest-card">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Conquistas Recentes</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-quest-legendary/10 border border-quest-legendary/20">
              <div className="w-8 h-8 rounded-full bg-quest-legendary/20 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-quest-legendary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Streak Master</div>
                <div className="text-xs text-muted-foreground">{gameState.streak} dias consecutivos</div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground"
              onClick={openAchievements}
            >
              Ver todas as conquistas →
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
