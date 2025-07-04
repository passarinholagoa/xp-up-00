
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGame } from '@/contexts/GameContext';

interface EditHabitModalProps {
  habit: {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    xpReward: number;
    coinReward: number;
    isPositive: boolean;
    streak: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const EditHabitModal = ({ habit, isOpen, onClose }: EditHabitModalProps) => {
  const { updateHabit } = useGame();
  const [formData, setFormData] = useState({
    title: habit.title,
    difficulty: habit.difficulty,
    isPositive: habit.isPositive,
  });

  const getRewards = (difficulty: 'easy' | 'medium' | 'hard') => {
    const baseRewards = {
      easy: { xp: 10, coins: 2 },
      medium: { xp: 15, coins: 3 },
      hard: { xp: 20, coins: 4 }
    };
    return baseRewards[difficulty];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rewards = getRewards(formData.difficulty);
    
    updateHabit(habit.id, {
      ...formData,
      xpReward: rewards.xp,
      coinReward: rewards.coins,
    });
    onClose();
  };

  const currentRewards = getRewards(formData.difficulty);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Hábito</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Dificuldade</Label>
            <Select value={formData.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => 
              setFormData(prev => ({ ...prev, difficulty: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Fácil</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="hard">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preview das recompensas baseadas na dificuldade */}
          <div className="p-3 rounded-lg bg-muted/20 space-y-2">
            <div className="text-sm font-medium">Recompensas:</div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>+{currentRewards.xp} XP</span>
              <span>+{currentRewards.coins} Moedas</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPositive"
              checked={formData.isPositive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPositive: checked }))}
            />
            <Label htmlFor="isPositive">Hábito Positivo</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
