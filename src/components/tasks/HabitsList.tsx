
import React, { useState } from 'react';
import { Plus, Minus, Flame, Coins, Zap, Edit2, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { EditHabitModal } from './EditHabitModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const HabitsList = () => {
  const { habits, completeHabit, deleteHabit } = useGame();
  const [editingHabit, setEditingHabit] = useState<typeof habits[0] | null>(null);

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

  const handleEdit = (habit: typeof habits[0]) => {
    setEditingHabit(habit);
  };

  const handleDelete = (habitId: number) => {
    deleteHabit(habitId);
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
              {/* Botões de ação do hábito */}
              {habit.isPositive ? (
                <>
                  <Button 
                    size="sm" 
                    className="bg-quest-gradient hover:opacity-90 glow-effect"
                    onClick={() => handlePositiveAction(habit)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
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
                <Button 
                  size="sm" 
                  variant="destructive"
                  className="hover:opacity-90"
                  onClick={() => handleNegativeAction(habit)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
              
              {/* Botões de editar e apagar */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(habit)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remover Hábito</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja remover "{habit.title}"? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(habit.id)}>
                      Remover
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}
      
      {editingHabit && (
        <EditHabitModal
          habit={editingHabit}
          isOpen={true}
          onClose={() => setEditingHabit(null)}
        />
      )}
    </div>
  );
};
