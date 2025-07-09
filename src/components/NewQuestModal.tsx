
import React, { useState } from 'react';
import { X, Plus, Calendar, Target, CheckSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useGame } from '@/contexts/GameContext';

interface NewQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QuestType = 'habit' | 'daily' | 'todo';
type Difficulty = 'easy' | 'medium' | 'hard';

export const NewQuestModal = ({ isOpen, onClose }: NewQuestModalProps) => {
  const { addHabit, addDaily, addTodo } = useGame();
  const { toast } = useToast();
  const [questType, setQuestType] = useState<QuestType>('habit');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [dueDate, setDueDate] = useState('');
  const [dueTimeTodo, setDueTimeTodo] = useState('');

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

  // Cálculo de recompensas baseado nos triggers do banco de dados
  const getRewards = (diff: Difficulty) => {
    if (questType === 'habit') {
      const rewards = {
        easy: { xp: 10, coins: 2 },
        medium: { xp: 15, coins: 3 },
        hard: { xp: 20, coins: 4 }
      };
      return rewards[diff];
    } else if (questType === 'daily') {
      const rewards = {
        easy: { xp: 10, coins: 2 },
        medium: { xp: 15, coins: 3 },
        hard: { xp: 20, coins: 4 }
      };
      return rewards[diff];
    } else { // todo
      const baseRewards = {
        easy: { xp: 15, coins: 3 },
        medium: { xp: 20, coins: 4 },
        hard: { xp: 25, coins: 5 }
      };
      
      const multiplier = priority === 'low' ? 1.0 : priority === 'medium' ? 1.2 : 1.5;
      return {
        xp: Math.floor(baseRewards[diff].xp * multiplier),
        coins: Math.floor(baseRewards[diff].coins * multiplier)
      };
    }
  };

  // Função para agendar notificação local
  function scheduleTodoNotification(title: string, dueDateTime: string) {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;
    const dueDate = new Date(dueDateTime);
    const notifyTime = new Date(dueDate.getTime() - 10 * 60 * 1000); // 10 minutos antes
    const now = new Date();
    const msUntilNotify = notifyTime.getTime() - now.getTime();
    if (msUntilNotify > 0) {
      setTimeout(() => {
        new Notification('Lembrete de Quest', {
          body: `Sua ${questType === 'daily' ? 'Daily' : 'To-Do'} "${title}" vence em 10 minutos!`,
        });
      }, msUntilNotify);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, adicione um título para sua quest.",
        className: "bg-red-500/10 border-red-500/50"
      });
      return;
    }

    const rewards = getRewards(difficulty);
    const questTypeLabel = questTypes.find(q => q.type === questType)?.label;

    try {
      if (questType === 'habit') {
        await addHabit({
          title: title.trim(),
          streak: 0,
          difficulty,
          xpReward: rewards.xp, // Será recalculado pelo trigger
          coinReward: rewards.coins, // Será recalculado pelo trigger
          isPositive: true
        });
      } else if (questType === 'daily') {
        await addDaily({
          title: title.trim(),
          completed: false,
          dueTime: dueTime || '09:00',
          difficulty,
          xpReward: rewards.xp, // Será recalculado pelo trigger
          coinReward: rewards.coins, // Será recalculado pelo trigger
          streak: 0
        });
        // Notificação local 10 minutos antes para Daily
        if (dueTime) {
          const today = new Date();
          const dueDateTime = `${today.toISOString().split('T')[0]}T${dueTime}`;
          if (Notification && dueTime) {
            if (Notification.permission === 'granted') {
              scheduleTodoNotification(title.trim(), dueDateTime);
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  scheduleTodoNotification(title.trim(), dueDateTime);
                } else {
                  toast({
                    title: 'Notificação não ativada',
                    description: 'Ative as notificações do navegador para receber lembretes de tarefas.',
                    className: 'bg-yellow-500/10 border-yellow-500/50'
                  });
                }
              });
            }
          }
        }
      } else if (questType === 'todo') {
        // Combina data e hora, se ambos preenchidos
        let dueDateTime = dueDate;
        if (dueDate && dueTimeTodo) {
          dueDateTime = `${dueDate}T${dueTimeTodo}`;
        }
        await addTodo({
          title: title.trim(),
          completed: false,
          dueDate: dueDateTime || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          priority,
          difficulty,
          xpReward: rewards.xp, // Será recalculado pelo trigger
          coinReward: rewards.coins, // Será recalculado pelo trigger
          isOverdue: false
        });
        // Notificação local 10 minutos antes
        if (dueDateTime && Notification) {
          if (Notification.permission === 'granted') {
            scheduleTodoNotification(title.trim(), dueDateTime);
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                scheduleTodoNotification(title.trim(), dueDateTime);
              } else {
                toast({
                  title: 'Notificação não ativada',
                  description: 'Ative as notificações do navegador para receber lembretes de tarefas.',
                  className: 'bg-yellow-500/10 border-yellow-500/50'
                });
              }
            });
          }
        }
      }

      toast({
        title: `${questTypeLabel} Criada! ✨`,
        description: `"${title}" foi adicionada às suas aventuras.`,
        className: "bg-green-500/10 border-green-500/50"
      });

      // Reset form
      setTitle('');
      setDescription('');
      setDifficulty('easy');
      setDueTime('');
      setDueDate('');
      setDueTimeTodo('');
      setPriority('low');
      onClose();
    } catch (error) {
      console.error('Erro ao criar quest:', error);
      toast({
        title: "Erro ao criar quest",
        description: "Ocorreu um erro ao salvar sua quest. Tente novamente.",
        className: "bg-red-500/10 border-red-500/50"
      });
    }
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

          {/* Prioridade e Data de Vencimento para To-Do */}
          {questType === 'todo' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Prioridade</label>
                <select
                  className="w-full rounded-md border px-3 py-2 bg-background text-foreground"
                  value={priority}
                  onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data de Vencimento</label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hora</label>
                <Input
                  type="time"
                  value={dueTimeTodo}
                  onChange={e => setDueTimeTodo(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
          )}

          {/* Reward Preview */}
          <div className="p-3 rounded-lg bg-muted/20 space-y-2">
            <div className="text-sm font-medium">Recompensas Estimadas:</div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>+{getRewards(difficulty).xp} XP</span>
              <span>+{getRewards(difficulty).coins} Moedas</span>
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
