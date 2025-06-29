
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
    xpReward: habit.xpReward,
    coinReward: habit.coinReward,
    isPositive: habit.isPositive,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHabit(habit.id, formData);
    onClose();
  };

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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="xpReward">XP</Label>
              <Input
                id="xpReward"
                type="number"
                min="0"
                value={formData.xpReward}
                onChange={(e) => setFormData(prev => ({ ...prev, xpReward: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coinReward">Moedas</Label>
              <Input
                id="coinReward"
                type="number"
                min="0"
                value={formData.coinReward}
                onChange={(e) => setFormData(prev => ({ ...prev, coinReward: parseInt(e.target.value) || 0 }))}
              />
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
