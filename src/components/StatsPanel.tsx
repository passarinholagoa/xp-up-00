import React from 'react';
import { Heart, Zap, Coins, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGame } from '@/contexts/GameContext';

export const StatsPanel = () => {
  const { gameState, settings } = useGame();

  const stats = [
    {
      icon: Heart,
      label: 'Pontos de Vida',
      value: gameState.hp,
      max: gameState.maxHp,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      label: 'Experiência',
      value: gameState.xp,
      max: gameState.maxXp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      gradient: 'from-blue-500 to-blue-600',
      isXp: true
    },
    {
      icon: Coins,
      label: 'Moedas de Ouro',
      value: gameState.coins,
      max: null,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: TrendingUp,
      label: 'Sequência',
      value: gameState.streak,
      max: null,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-6 w-full">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const percentage = stat.max ? (stat.value / stat.max) * 100 : 100;
        const isAnimatedXpBar = stat.isXp && settings.animatedXpBar;
        
        return (
          <Card key={index} className={`w-full p-1.5 sm:p-6 ${stat.bgColor} border ${stat.borderColor} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
            <div className="space-y-2 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-xl border ${stat.borderColor}`}>
                  <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
                <div className={`text-lg sm:text-2xl font-bold ${stat.color}`}>
                  {stat.max 
                    ? `${stat.value.toLocaleString()}/${stat.max.toLocaleString()}`
                    : stat.value.toLocaleString()
                  }
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
                {stat.max && (
                  <div className="w-full h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-500 ease-out ${isAnimatedXpBar ? 'animate-pulse' : ''}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
