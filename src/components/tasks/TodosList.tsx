
import React, { useState } from 'react';
import { CheckCircle, Clock, Coins, Zap, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';

export const TodosList = () => {
  const { completeTodo } = useGame();
  const [completedTodos, setCompletedTodos] = useState<number[]>([3]);

  const todos = [
    {
      id: 1,
      title: 'Finalizar relatório do projeto',
      completed: false,
      dueDate: '2024-06-22',
      priority: 'high',
      difficulty: 'hard',
      xpReward: 25,
      coinReward: 5,
      isOverdue: false
    },
    {
      id: 2,
      title: 'Comprar presentes de aniversário',
      completed: false,
      dueDate: '2024-06-21',
      priority: 'medium',
      difficulty: 'easy',
      xpReward: 8,
      coinReward: 2,
      isOverdue: true
    },
    {
      id: 3,
      title: 'Agendar consulta médica',
      completed: true,
      dueDate: '2024-06-20',
      priority: 'high',
      difficulty: 'easy',
      xpReward: 15,
      coinReward: 3,
      isOverdue: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-quest-common/20 text-quest-common';
      case 'medium': return 'bg-quest-rare/20 text-quest-rare';
      case 'hard': return 'bg-quest-epic/20 text-quest-epic';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const handleCompleteTodo = (todo: typeof todos[0]) => {
    if (!completedTodos.includes(todo.id)) {
      setCompletedTodos(prev => [...prev, todo.id]);
      completeTodo(todo.id);
    }
  };

  const isCompleted = (todoId: number) => completedTodos.includes(todoId);

  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const completed = isCompleted(todo.id);
        
        return (
          <Card key={todo.id} className={`quest-card ${completed ? 'opacity-75' : ''} ${todo.isOverdue ? 'border-red-500/50' : ''}`}>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className={`font-semibold ${completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.title}
                    </h3>
                    {todo.isOverdue && !completed && (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getPriorityColor(todo.priority)}>
                      {todo.priority}
                    </Badge>
                    <Badge className={getDifficultyColor(todo.difficulty)}>
                      {todo.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{todo.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-xp-bar" />
                      <span>+{todo.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-3 w-3 text-quest-legendary" />
                      <span>+{todo.coinReward}</span>
                    </div>
                  </div>
                </div>
                
                {!completed && (
                  <Button 
                    size="sm" 
                    className="bg-quest-gradient hover:opacity-90 glow-effect"
                    onClick={() => handleCompleteTodo(todo)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completar
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
