
import React from 'react';
import { Plus, Minus, Flame, Coins, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';

export const HabitsList = () => {
  const { completeHabit } = useGame();

  const habits = [
    {
      id: 1,
      title: 'Exercitar-se por 30 minutos',
      streak: 12,
      difficulty: 'medium',
      xpReward: 15,
      coinReward: 3,
      isPositive: true
    },
    {
      id: 2,
      title: 'Ler por 20 minutos',
      streak: 7,
      difficulty: 'easy',
      xpReward: 10,
      coinReward: 2,
      isPositive: true
    },
    {
      id: 3,
      title: 'Fumar',
      streak: 0,
      difficulty: 'hard',
      xpReward: 0,
      coinReward: 0,
      isPositive: false
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

  const handlePositiveAction = (habit: typeof habits[0]) => {
    completeHabit(habit.id, true);
  };

  const handleNegativeAction = (habit: typeof habits[0]) => {
    completeHabit(habit.id, false);
  };

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <Card key={habit.id} className="quest-card">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{habit.title}</h3>
                <Badge className={getDifficultyColor(habit.difficulty)}>
                  {habit.difficulty}
                </Badge>
                {habit.streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-medium">{habit.streak}</span>
                  </div>
                )}
              </div>
              
              {habit.isPositive && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-xp-bar" />
                    <span>+{habit.xpReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="h-3 w-3 text-quest-legendary" />
                    <span>+{habit.coinReward}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {habit.isPositive ? (
                <>
                  {/* Botão de + para hábitos positivos */}
                  <Button 
                    size="sm" 
                    className="bg-quest-gradient hover:opacity-90 glow-effect"
                    onClick={() => handlePositiveAction(habit)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {/* Botão de - para falhar no hábito positivo */}
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="hover:opacity-90"
                    onClick={() => handleNegativeAction(habit)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                /* Apenas botão de - para hábitos negativos */
                <Button 
                  size="sm" 
                  variant="destructive"
                  className="hover:opacity-90"
                  onClick={() => handleNegativeAction(habit)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
