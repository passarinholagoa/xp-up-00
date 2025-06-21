
import React, { useState } from 'react';
import { Calendar, Coins, Zap, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useGame } from '@/contexts/GameContext';

export const DailiesList = () => {
  const { completeDaily } = useGame();
  const [completedDailies, setCompletedDailies] = useState<number[]>([1]);

  const dailies = [
    {
      id: 1,
      title: 'Tomar 8 copos de água',
      completed: true,
      dueTime: '22:00',
      difficulty: 'easy',
      xpReward: 12,
      coinReward: 2,
      streak: 5
    },
    {
      id: 2,
      title: 'Meditar por 10 minutos',
      completed: false,
      dueTime: '07:00',
      difficulty: 'medium',
      xpReward: 18,
      coinReward: 3,
      streak: 3
    },
    {
      id: 3,
      title: 'Revisar metas do dia',
      completed: false,
      dueTime: '20:00',
      difficulty: 'easy',
      xpReward: 10,
      coinReward: 2,
      streak: 8
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-quest-common/20 text-quest-common';
      case 'medium': return 'bg-quest-rare/20 text-quest-rare';
      case 'hard': return 'bg-quest-epic/20 text-quest-epic';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const handleCompleteDaily = (daily: typeof dailies[0]) => {
    if (!completedDailies.includes(daily.id)) {
      setCompletedDailies(prev => [...prev, daily.id]);
      completeDaily(daily.id);
    }
  };

  const isCompleted = (dailyId: number) => completedDailies.includes(dailyId);

  return (
    <div className="space-y-4">
      {dailies.map((daily) => {
        const completed = isCompleted(daily.id);
        
        return (
          <Card key={daily.id} className={`quest-card ${completed ? 'opacity-75' : ''}`}>
            <div className="flex items-center gap-4">
              <Checkbox 
                checked={completed} 
                disabled={completed}
                className="data-[state=checked]:bg-quest-primary data-[state=checked]:border-quest-primary"
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className={`font-semibold ${completed ? 'line-through text-muted-foreground' : ''}`}>
                    {daily.title}
                  </h3>
                  <Badge className={getDifficultyColor(daily.difficulty)}>
                    {daily.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{daily.dueTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-xp-bar" />
                    <span>+{daily.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="h-3 w-3 text-quest-legendary" />
                    <span>+{daily.coinReward}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-orange-400" />
                    <span>{daily.streak} dias</span>
                  </div>
                </div>
              </div>
              
              {!completed && (
                <Button 
                  size="sm" 
                  className="bg-quest-gradient hover:opacity-90 glow-effect"
                  onClick={() => handleCompleteDaily(daily)}
                >
                  Completar
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
