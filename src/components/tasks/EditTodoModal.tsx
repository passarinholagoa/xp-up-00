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

interface EditTodoModalProps {
  todo: {
    id: string;
    title: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    difficulty: 'easy' | 'medium' | 'hard';
    xpReward: number;
    coinReward: number;
    isOverdue: boolean;
    completed: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const EditTodoModal = ({ todo, isOpen, onClose }: EditTodoModalProps) => {
  const { updateTodo } = useGame();
  const [formData, setFormData] = useState({
    title: todo.title,
    dueDate: todo.dueDate,
    priority: todo.priority,
    difficulty: todo.difficulty,
  });

  const getRewards = (difficulty: 'easy' | 'medium' | 'hard', priority: 'low' | 'medium' | 'high') => {
    const baseRewards = {
      easy: { xp: 15, coins: 3 },
      medium: { xp: 20, coins: 4 },
      hard: { xp: 25, coins: 5 }
    };
    
    const priorityMultiplier = {
      low: 1.0,
      medium: 1.2,
      high: 1.5
    };
    
    const base = baseRewards[difficulty];
    const multiplier = priorityMultiplier[priority];
    
    return {
      xp: Math.round(base.xp * multiplier),
      coins: Math.round(base.coins * multiplier)
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rewards = getRewards(formData.difficulty, formData.priority);
    
    updateTodo(todo.id, {
      ...formData,
      xpReward: rewards.xp,
      coinReward: rewards.coins,
    });
    onClose();
  };

  const currentRewards = getRewards(formData.difficulty, formData.priority);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Quest</DialogTitle>
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
            <Label htmlFor="dueDate">Data de Vencimento</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => 
                setFormData(prev => ({ ...prev, priority: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          {/* Preview das recompensas baseadas na dificuldade e prioridade */}
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
