
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
    xpReward: daily.xpReward,
    coinReward: daily.coinReward,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDaily(daily.id, formData);
    onClose();
  };

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
