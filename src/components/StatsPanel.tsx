
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Coins, Target } from 'lucide-react';
import { AnimatedXpBar } from '@/components/AnimatedXpBar';
import { useGame } from '@/contexts/GameContext';

export const StatsPanel = () => {
  const { gameState, settings } = useGame();
  
  const hpPercentage = (gameState.hp / gameState.maxHp) * 100;
  
  return (
    <Card className={`p-6 ${settings.showProfileBackground ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-card'} ${settings.showProfileFrame ? 'border-2 border-primary/50' : 'border'}`}>
      <div className="space-y-6">
        {/* Player Info */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-3xl">👤</div>
            <div>
              <h2 className="text-xl font-bold">Aventureiro</h2>
              <Badge variant="secondary" className="text-xs">
                Nível {gameState.level}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          {/* HP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">HP</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {gameState.hp}/{gameState.maxHp}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${hpPercentage}%` }}
              />
            </div>
          </div>

          {/* XP */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">XP</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {gameState.xp}/{gameState.maxXp}
              </span>
            </div>
            <div className="relative">
              <AnimatedXpBar 
                xp={gameState.xp} 
                maxXp={gameState.maxXp}
                className="w-full"
              />
            </div>
          </div>

          {/* Coins */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Moedas</span>
            </div>
            <span className="text-sm font-bold text-yellow-500">
              {gameState.coins}
            </span>
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Sequência</span>
            </div>
            <span className="text-sm font-bold text-green-500">
              {gameState.streak} dias
            </span>
          </div>

          {/* Hardcore/Vacation Mode Indicators */}
          {settings.hardcoreMode && (
            <div className="flex items-center justify-center">
              <Badge variant="destructive" className="text-xs">
                🔥 MODO HARDCORE ATIVO
              </Badge>
            </div>
          )}
          
          {settings.vacationMode && (
            <div className="flex items-center justify-center">
              <Badge variant="secondary" className="text-xs">
                ✈️ MODO FÉRIAS ATIVO
              </Badge>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
