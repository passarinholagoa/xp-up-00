
import React from 'react';
import { Heart, Zap, Coins, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const StatsPanel = () => {
  const stats = [
    {
      icon: Heart,
      label: 'Pontos de Vida',
      value: 85,
      max: 100,
      color: 'hp-high',
      gradient: 'hp-gradient'
    },
    {
      icon: Zap,
      label: 'Experiência',
      value: 1245,
      max: 2000,
      color: 'xp-bar',
      gradient: 'xp-gradient'
    },
    {
      icon: Coins,
      label: 'Moedas de Ouro',
      value: 342,
      max: null,
      color: 'quest-legendary',
      gradient: 'legendary-gradient'
    },
    {
      icon: TrendingUp,
      label: 'Sequência',
      value: 7,
      max: null,
      color: 'quest-primary',
      gradient: 'quest-gradient'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const percentage = stat.max ? (stat.value / stat.max) * 100 : 100;
        
        return (
          <Card key={index} className="quest-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 text-${stat.color}`} />
                <span className={`text-lg font-bold text-${stat.color}`}>
                  {stat.value}{stat.max && `/${stat.max}`}
                </span>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.max && (
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill bg-${stat.gradient}`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
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
