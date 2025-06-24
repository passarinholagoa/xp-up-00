
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
          <div className="space-y-4">
            {/* Header com título, dificuldade e streak */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-base flex-1 min-w-0">{habit.title}</h3>
              <div className="flex items-center gap-2 flex-shrink-0">
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
            </div>
            
            {/* Recompensas */}
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
            
            {/* Botões de ação - Layout otimizado para mobile */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Botões principais de ação do hábito */}
              <div className="flex gap-2 flex-1">
                {habit.isPositive ? (
                  <>
                    <Button 
                      size="default" 
                      className="bg-quest-gradient hover:opacity-90 glow-effect flex-1 sm:flex-initial"
                      onClick={() => handlePositiveAction(habit)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span className="sm:hidden">Completar</span>
                    </Button>
                    <Button 
                      size="default" 
                      variant="destructive"
                      className="hover:opacity-90 flex-1 sm:flex-initial"
                      onClick={() => handleNegativeAction(habit)}
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      <span className="sm:hidden">Falhar</span>
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="default" 
                    variant="destructive"
                    className="hover:opacity-90 flex-1 sm:flex-initial"
                    onClick={() => handleNegativeAction(habit)}
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    <span className="sm:hidden">Marcar</span>
                  </Button>
                )}
              </div>
              
              {/* Botões de editar e apagar */}
              <div className="flex gap-2 sm:ml-auto">
                <Button
                  size="default"
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                  onClick={() => handleEdit(habit)}
                >
                  <Edit2 className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="sm:hidden">Editar</span>
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="default" variant="outline" className="flex-1 sm:flex-initial">
                      <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                      <span className="sm:hidden">Remover</span>
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
