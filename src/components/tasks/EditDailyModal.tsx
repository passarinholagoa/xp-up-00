
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGame } from '@/contexts/GameContext';

interface EditDailyModalProps {
  daily: {
    id: string;
    title: string;
    dueTime: string;
    difficulty: 'easy' | 'medium' | 'hard';
    xpReward: number;
    coinReward: number;
    streak: number;
    completed: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const EditDailyModal = ({ daily, isOpen, onClose }: EditDailyModalProps) => {
  const { updateDaily } = useGame();
  const [formData, setFormData] = useState({
    title: daily.title,
    dueTime: daily.dueTime,
    difficulty: daily.difficulty,
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
    
    updateDaily(daily.id, {
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
          <DialogTitle>Editar Daily</DialogTitle>
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
            <Label htmlFor="dueTime">Horário</Label>
            <Input
              id="dueTime"
              type="time"
              value={formData.dueTime}
              onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
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
