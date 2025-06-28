
import React from 'react';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, CheckCircle } from 'lucide-react';

export const HeroSection = () => {
  const { gameState, habits, dailies, todos, achievements } = useGame();

  // Calcular estatísticas em tempo real
  const activeQuests = todos.filter(todo => !todo.completed).length;
  const activeDailies = dailies.filter(daily => !daily.completed).length;
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked).length;
  
  // Calcular progresso do nível atual
  const xpPercentage = gameState.maxXp > 0 ? (gameState.xp / gameState.maxXp) * 100 : 100;

  return (
    <div className="text-center space-y-8">
      {/* Cards de estatísticas */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Card className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/30">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-blue-400" />
            <span className="text-white font-semibold">
              {activeQuests} Quests Ativas
            </span>
          </div>
        </Card>
        
        <Card className="px-6 py-3 bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-white font-semibold">
              {activeDailies} Dailies
            </span>
          </div>
        </Card>
        
        <Card className="px-6 py-3 bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 border-yellow-500/30">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-semibold">
              {unlockedAchievements} Conquistas
            </span>
          </div>
        </Card>
      </div>

      {/* Círculo de progresso do nível */}
      <div className="relative">
        <div className="mx-auto w-64 h-64 relative">
          {/* Círculo de fundo */}
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          
          {/* Círculo de progresso */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 120}`}
              strokeDashoffset={`${2 * Math.PI * 120 * (1 - xpPercentage / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Conteúdo central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-2">
              {gameState.level}
            </div>
            <div className="text-xl text-purple-200 mb-4">
              Nível
            </div>
            
            {/* Barra de progresso XP */}
            <div className="w-32 space-y-2">
              <Progress 
                value={xpPercentage} 
                className="h-2 bg-white/20"
              />
              <div className="text-xs text-purple-200 text-center">
                {gameState.level >= 100 
                  ? 'Nível Máximo!' 
                  : `${gameState.xp.toLocaleString()} / ${gameState.maxXp.toLocaleString()} XP`
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
