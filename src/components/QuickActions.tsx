
import React from 'react';
import { Trophy, TrendingUp, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

export const QuickActions = () => {
  const { openAchievements, gameState } = useGame();

  const xpRemaining = gameState.maxXp - gameState.xp;
  const xpPercentage = gameState.maxXp > 0 ? (gameState.xp / gameState.maxXp) * 100 : 100;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Level Progress */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg">
              {gameState.level >= 100 ? 'Nível Máximo!' : 'Próximo Nível'}
            </h3>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between text-xs sm:text-sm font-medium">
              <span className="text-blue-400">Nível {gameState.level}</span>
              <span className="text-purple-400">
                {gameState.level >= 100 ? 'MAX' : `Nível ${gameState.level + 1}`}
              </span>
            </div>
            
            <div className="w-full h-2 sm:h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out relative"
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
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-sm">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-yellow-500/20 rounded-lg">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg">Conquistas</h3>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-yellow-400">Streak Master</div>
                <div className="text-xs text-muted-foreground">{gameState.streak} dias consecutivos</div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-yellow-500/10 border border-yellow-500/20 rounded-xl transition-all duration-200"
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
