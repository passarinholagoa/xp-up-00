
import React, { useState } from 'react';
import { X, Plus, Calendar, Target, CheckSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface NewQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QuestType = 'habit' | 'daily' | 'todo';
type Difficulty = 'easy' | 'medium' | 'hard';

export const NewQuestModal = ({ isOpen, onClose }: NewQuestModalProps) => {
  const { toast } = useToast();
  const [questType, setQuestType] = useState<QuestType>('habit');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [dueTime, setDueTime] = useState('');

  const questTypes = [
    { type: 'habit' as QuestType, label: 'Hábito', icon: Target, description: 'Atividade recorrente' },
    { type: 'daily' as QuestType, label: 'Daily', icon: Calendar, description: 'Tarefa diária' },
    { type: 'todo' as QuestType, label: 'To-Do', icon: CheckSquare, description: 'Tarefa única' }
  ];

  const difficulties = [
    { value: 'easy' as Difficulty, label: 'Fácil', color: 'bg-quest-common/20 text-quest-common' },
    { value: 'medium' as Difficulty, label: 'Médio', color: 'bg-quest-rare/20 text-quest-rare' },
    { value: 'hard' as Difficulty, label: 'Difícil', color: 'bg-quest-epic/20 text-quest-epic' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, adicione um título para sua quest.",
        className: "bg-red-500/10 border-red-500/50"
      });
      return;
    }

    // Simulate adding the quest
    const questTypeLabel = questTypes.find(q => q.type === questType)?.label;
    
    toast({
      title: `${questTypeLabel} Criado! ✨`,
      description: `"${title}" foi adicionado às suas aventuras.`,
      className: "bg-green-500/10 border-green-500/50"
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDifficulty('easy');
    setDueTime('');
    onClose();
  };

  const getDifficultyColor = (diff: Difficulty) => {
    return difficulties.find(d => d.value === diff)?.color || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-quest-accent bg-clip-text text-transparent">
            Nova Quest
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quest Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Tipo de Quest</label>
            <div className="grid grid-cols-3 gap-2">
              {questTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.type}
                    type="button"
                    onClick={() => setQuestType(type.type)}
                    className={`p-2 rounded-lg border text-center transition-all text-xs ${
                      questType === type.type 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mx-auto mb-1" />
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{type.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Título da Quest</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Beber 8 copos de água"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição (Opcional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione detalhes sobre sua quest..."
              className="w-full min-h-[60px] resize-none"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Dificuldade</label>
            <div className="flex gap-2">
              {difficulties.map((diff) => (
                <button
                  key={diff.value}
                  type="button"
                  onClick={() => setDifficulty(diff.value)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all flex-1 ${
                    difficulty === diff.value 
                      ? diff.color
                      : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due Time (for dailies) */}
          {questType === 'daily' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Horário Limite</label>
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Reward Preview */}
          <div className="p-3 rounded-lg bg-muted/20 space-y-2">
            <div className="text-sm font-medium">Recompensas Estimadas:</div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>+{difficulty === 'easy' ? '10-15' : difficulty === 'medium' ? '15-25' : '25-35'} XP</span>
              <span>+{difficulty === 'easy' ? '2-3' : difficulty === 'medium' ? '3-5' : '5-8'} Moedas</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-quest-gradient hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Quest
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
