
import React, { useState } from 'react';
import { CheckCircle, Clock, Coins, Zap, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { EditTodoModal } from './EditTodoModal';
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
  const { todos, completeTodo, deleteTodo } = useGame();
  const [completedTodos, setCompletedTodos] = useState<number[]>([3]);
  const [editingTodo, setEditingTodo] = useState<typeof todos[0] | null>(null);

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

  const handleEdit = (todo: typeof todos[0]) => {
    setEditingTodo(todo);
  };

  const handleDelete = (todoId: number) => {
    deleteTodo(todoId);
    setCompletedTodos(prev => prev.filter(id => id !== todoId));
  };

  const isCompleted = (todoId: number) => completedTodos.includes(todoId);

  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const completed = isCompleted(todo.id);
        
        return (
          <Card key={todo.id} className={`quest-card ${completed ? 'opacity-75' : ''} ${todo.isOverdue ? 'border-red-500/50' : ''}`}>
            <div className="space-y-4">
              {/* Header com título e indicador de atraso */}
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold text-base ${completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.title}
                    </h3>
                    {todo.isOverdue && !completed && (
                      <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
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
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
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
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/50">
                {!completed && (
                  <Button 
                    size="sm" 
                    className="bg-quest-gradient hover:opacity-90 glow-effect flex-1 sm:flex-initial"
                    onClick={() => handleCompleteTodo(todo)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completar
                  </Button>
                )}
                
                <div className="flex gap-2 sm:ml-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 sm:flex-initial"
                    onClick={() => handleEdit(todo)}
                  >
                    <Edit2 className="h-4 w-4 sm:mr-0 mr-2" />
                    <span className="sm:hidden">Editar</span>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                        <Trash2 className="h-4 w-4 sm:mr-0 mr-2" />
                        <span className="sm:hidden">Remover</span>
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
