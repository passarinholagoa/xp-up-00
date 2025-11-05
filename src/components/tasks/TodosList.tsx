import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Coins, Zap, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { EditTodoModal } from './EditTodoModal';
import { useIsMobile } from '@/hooks/use-mobile';
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

export const TodosList = () => {
  const { todos, completeTodo, deleteTodo, gameState } = useGame();
  const [editingTodo, setEditingTodo] = useState<typeof todos[0] | null>(null);
  const isMobile = useIsMobile();

  // Log para debug
  useEffect(() => {
    console.log('TodosList renderizou com', todos.length, 'todos');
  }, [todos]);

  // Filtrar apenas To-Dos não concluídos
  const pendingTodos = todos.filter(todo => !todo.completed);

  // Log adicional para debug
  useEffect(() => {
    console.log('To-Dos pendentes:', pendingTodos.length);
  }, [pendingTodos.length]);

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
    console.log('Botão completar clicado para:', todo.title);
    completeTodo(todo.id);
  };

  const handleEdit = (todo: typeof todos[0]) => {
    setEditingTodo(todo);
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
  };

  // Se não há To-Dos pendentes, mostrar mensagem
  if (pendingTodos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum To-Do pendente. Crie uma nova quest para começar!
        </p>
      </div>
    );
  }

  return (
    <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
      {pendingTodos.map((todo) => {
        return (
          <Card key={todo.id} className={`quest-card ${todo.isOverdue ? 'border-red-500/50' : ''}`}>
            <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
              {/* Header com título e indicador de atraso */}
              <div className={`flex items-start ${isMobile ? 'gap-2' : 'gap-3'}`}>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {todo.title}
                    </h3>
                    {todo.isOverdue && (
                      <AlertTriangle className={`flex-shrink-0 text-red-400 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`${getPriorityColor(todo.priority)} ${isMobile ? 'text-xs px-2 py-0.5' : ''}`}>
                      {todo.priority}
                    </Badge>
                    <Badge className={`${getDifficultyColor(todo.difficulty)} ${isMobile ? 'text-xs px-2 py-0.5' : ''}`}>
                      {todo.difficulty}
                    </Badge>
                    <div className={`flex items-center gap-1 text-muted-foreground ${isMobile ? 'text-xs' : ''}`}>
                      <Clock className={isMobile ? 'h-3 w-3' : 'h-3 w-3'} />
                      <span className={isMobile ? 'text-xs' : 'text-xs'}>{todo.dueDate}</span>
                    </div>
                  </div>
                  
                  {(() => {
                    const levelMultiplier = 1 + ((gameState.level - 1) * 0.1);
                    const adjustedXp = Math.floor(todo.xpReward * levelMultiplier);
                    const adjustedCoins = Math.floor(todo.coinReward * levelMultiplier);
                    
                    return (
                      <div className={`flex items-center gap-4 text-muted-foreground flex-wrap ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        <div className="flex items-center gap-1">
                          <Zap className={`text-xp-bar ${isMobile ? 'h-3 w-3' : 'h-3 w-3'}`} />
                          <span>+{adjustedXp} XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Coins className={`text-quest-legendary ${isMobile ? 'h-3 w-3' : 'h-3 w-3'}`} />
                          <span>+{adjustedCoins}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Botões de ação */}
              <div className={`flex pt-2 border-t border-border/50 ${isMobile ? 'flex-col gap-2' : 'flex-col sm:flex-row gap-2'}`}>
                <Button 
                  size={isMobile ? "sm" : "sm"}
                  className={`bg-quest-gradient hover:opacity-90 glow-effect ${isMobile ? 'w-full text-sm' : 'flex-1 sm:flex-initial'}`}
                  onClick={() => handleCompleteTodo(todo)}
                >
                  <CheckCircle className={`mr-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                  Completar
                </Button>
                
                <div className={`flex gap-2 ${isMobile ? '' : 'sm:ml-auto'}`}>
                  <Button
                    size={isMobile ? "sm" : "sm"}
                    variant="outline"
                    className={isMobile ? 'flex-1 text-sm' : 'flex-1 sm:flex-initial'}
                    onClick={() => handleEdit(todo)}
                  >
                    <Edit2 className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 sm:mr-0 mr-2'}`} />
                    {isMobile ? 'Editar' : <><span className="sm:hidden">Editar</span></>}
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        size={isMobile ? "sm" : "sm"} 
                        variant="outline" 
                        className={isMobile ? 'flex-1 text-sm' : 'flex-1 sm:flex-initial'}
                      >
                        <Trash2 className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 sm:mr-0 mr-2'}`} />
                        {isMobile ? 'Remover' : <><span className="sm:hidden">Remover</span></>}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover Quest</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover "{todo.title}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(todo.id)}>
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
      
      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          isOpen={true}
          onClose={() => setEditingTodo(null)}
        />
      )}
    </div>
  );
};
