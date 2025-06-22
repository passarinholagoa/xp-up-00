import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GameState {
  hp: number;
  maxHp: number;
  xp: number;
  totalXp: number;
  maxXp: number;
  coins: number;
  level: number;
  streak: number;
}

interface Habit {
  id: number;
  title: string;
  streak: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  isPositive: boolean;
}

interface Daily {
  id: number;
  title: string;
  completed: boolean;
  dueTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  streak: number;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  isOverdue: boolean;
}

interface GameContextType {
  gameState: GameState;
  habits: Habit[];
  dailies: Daily[];
  todos: Todo[];
  isNewQuestModalOpen: boolean;
  completeHabit: (habitId: number, isPositive: boolean) => void;
  completeDaily: (dailyId: number) => void;
  completeTodo: (todoId: number) => void;
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  addDaily: (daily: Omit<Daily, 'id'>) => void;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  updateHabit: (id: number, habit: Partial<Habit>) => void;
  updateDaily: (id: number, daily: Partial<Daily>) => void;
  updateTodo: (id: number, todo: Partial<Todo>) => void;
  deleteHabit: (id: number) => void;
  deleteDaily: (id: number) => void;
  deleteTodo: (id: number) => void;
  createNewQuest: () => void;
  closeNewQuestModal: () => void;
  openShop: () => void;
  openAchievements: () => void;
  openSettings: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

// Function to calculate level from total XP (0-100 levels)
const calculateLevel = (totalXp: number): number => {
  if (totalXp === 0) return 0;
  
  // Exponential growth: each level requires more XP
  // Level n requires approximately n^2 * 100 total XP
  const level = Math.floor(Math.sqrt(totalXp / 100));
  return Math.min(level, 100); // Cap at level 100
};

// Function to calculate XP needed for next level
const calculateXpForNextLevel = (currentLevel: number): number => {
  if (currentLevel >= 100) return 0;
  return (currentLevel + 1) * (currentLevel + 1) * 100;
};

// Function to calculate current level XP and max XP for progress bar
const calculateLevelProgress = (totalXp: number, currentLevel: number) => {
  const currentLevelBaseXp = currentLevel * currentLevel * 100;
  const nextLevelBaseXp = calculateXpForNextLevel(currentLevel);
  
  return {
    currentLevelXp: totalXp - currentLevelBaseXp,
    maxLevelXp: nextLevelBaseXp - currentLevelBaseXp
  };
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const { toast } = useToast();
  const [isNewQuestModalOpen, setIsNewQuestModalOpen] = useState(false);
  
  const initialTotalXp = 14400; // This gives us level 12 (sqrt(14400/100) = 12)
  const initialLevel = calculateLevel(initialTotalXp);
  const { currentLevelXp, maxLevelXp } = calculateLevelProgress(initialTotalXp, initialLevel);
  
  const [gameState, setGameState] = useState<GameState>({
    hp: 85,
    maxHp: 100,
    xp: currentLevelXp,
    totalXp: initialTotalXp,
    maxXp: maxLevelXp,
    coins: 342,
    level: initialLevel,
    streak: 7
  });

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      title: 'Exercitar-se por 30 minutos',
      streak: 12,
      difficulty: 'medium',
      xpReward: 15,
      coinReward: 3,
      isPositive: true
    },
    {
      id: 2,
      title: 'Ler por 20 minutos',
      streak: 7,
      difficulty: 'easy',
      xpReward: 10,
      coinReward: 2,
      isPositive: true
    },
    {
      id: 3,
      title: 'Fumar',
      streak: 0,
      difficulty: 'hard',
      xpReward: 0,
      coinReward: 0,
      isPositive: false
    }
  ]);

  const [dailies, setDailies] = useState<Daily[]>([
    {
      id: 1,
      title: 'Tomar 8 copos de água',
      completed: false,
      dueTime: '22:00',
      difficulty: 'easy',
      xpReward: 12,
      coinReward: 2,
      streak: 5
    },
    {
      id: 2,
      title: 'Meditar por 10 minutos',
      completed: false,
      dueTime: '07:00',
      difficulty: 'medium',
      xpReward: 18,
      coinReward: 3,
      streak: 3
    },
    {
      id: 3,
      title: 'Revisar metas do dia',
      completed: false,
      dueTime: '20:00',
      difficulty: 'easy',
      xpReward: 10,
      coinReward: 2,
      streak: 8
    }
  ]);

  const [todos, setTodos] = useState<Todo[]>([
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
      completed: false,
      dueDate: '2024-06-20',
      priority: 'high',
      difficulty: 'easy',
      xpReward: 15,
      coinReward: 3,
      isOverdue: false
    }
  ]);

  const updateGameStateXp = (xpGain: number) => {
    setGameState(prev => {
      const newTotalXp = prev.totalXp + xpGain;
      const newLevel = calculateLevel(newTotalXp);
      const { currentLevelXp, maxLevelXp } = calculateLevelProgress(newTotalXp, newLevel);
      
      // Check for level up
      if (newLevel > prev.level) {
        toast({
          title: `🎉 LEVEL UP! 🎉`,
          description: `Parabéns! Você alcançou o nível ${newLevel}!`,
          className: "bg-quest-legendary/20 border-quest-legendary"
        });
      }
      
      return {
        ...prev,
        xp: currentLevelXp,
        totalXp: newTotalXp,
        maxXp: maxLevelXp,
        level: newLevel
      };
    });
  };

  const completeHabit = (habitId: number, isPositive: boolean) => {
    if (isPositive) {
      const habit = habits.find(h => h.id === habitId);
      const xpGain = habit?.xpReward || 15;
      const coinGain = habit?.coinReward || 3;
      
      updateGameStateXp(xpGain);
      setGameState(prev => ({
        ...prev,
        coins: prev.coins + coinGain,
        hp: Math.min(prev.hp + 2, prev.maxHp)
      }));

      toast({
        title: "Hábito Completado! 🎉",
        description: `+${xpGain} XP, +${coinGain} moedas, +2 HP`,
        className: "bg-green-500/10 border-green-500/50"
      });
    } else {
      const hpLoss = 10;
      
      setGameState(prev => ({
        ...prev,
        hp: Math.max(prev.hp - hpLoss, 0)
      }));

      toast({
        title: "Hábito Negativo Registrado 😞",
        description: `-${hpLoss} HP. Tente novamente!`,
        className: "bg-red-500/10 border-red-500/50"
      });
    }
  };

  const completeDaily = (dailyId: number) => {
    const daily = dailies.find(d => d.id === dailyId);
    const xpGain = daily?.xpReward || 18;
    const coinGain = daily?.coinReward || 3;
    
    updateGameStateXp(xpGain);
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + coinGain
    }));

    toast({
      title: "Daily Completada! ✨",
      description: `+${xpGain} XP, +${coinGain} moedas`,
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  const completeTodo = (todoId: number) => {
    const todo = todos.find(t => t.id === todoId);
    const xpGain = todo?.xpReward || 25;
    const coinGain = todo?.coinReward || 5;
    
    updateGameStateXp(xpGain);
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + coinGain
    }));

    toast({
      title: "Quest Completada! 🏆",
      description: `+${xpGain} XP, +${coinGain} moedas`,
      className: "bg-purple-500/10 border-purple-500/50"
    });
  };

  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newId = Math.max(...habits.map(h => h.id), 0) + 1;
    setHabits(prev => [...prev, { ...habit, id: newId }]);
    
    toast({
      title: "Novo Hábito Criado! 🎯",
      description: `"${habit.title}" foi adicionado à sua lista`,
      className: "bg-green-500/10 border-green-500/50"
    });
  };

  const addDaily = (daily: Omit<Daily, 'id'>) => {
    const newId = Math.max(...dailies.map(d => d.id), 0) + 1;
    setDailies(prev => [...prev, { ...daily, id: newId }]);
    
    toast({
      title: "Nova Daily Criada! ⚡",
      description: `"${daily.title}" foi adicionada à sua lista`,
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const newId = Math.max(...todos.map(t => t.id), 0) + 1;
    setTodos(prev => [...prev, { ...todo, id: newId }]);
    
    toast({
      title: "Nova Quest Criada! 🎮",
      description: `"${todo.title}" foi adicionada à sua lista`,
      className: "bg-purple-500/10 border-purple-500/50"
    });
  };

  const updateHabit = (id: number, updatedHabit: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updatedHabit } : habit
    ));
    
    toast({
      title: "Hábito Atualizado! ✏️",
      description: "As alterações foram salvas",
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  const updateDaily = (id: number, updatedDaily: Partial<Daily>) => {
    setDailies(prev => prev.map(daily => 
      daily.id === id ? { ...daily, ...updatedDaily } : daily
    ));
    
    toast({
      title: "Daily Atualizada! ✏️",
      description: "As alterações foram salvas",
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  const updateTodo = (id: number, updatedTodo: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
    
    toast({
      title: "Quest Atualizada! ✏️",
      description: "As alterações foram salvas",
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  const deleteHabit = (id: number) => {
    const habit = habits.find(h => h.id === id);
    setHabits(prev => prev.filter(h => h.id !== id));
    
    toast({
      title: "Hábito Removido! 🗑️",
      description: `"${habit?.title}" foi removido`,
      className: "bg-red-500/10 border-red-500/50"
    });
  };

  const deleteDaily = (id: number) => {
    const daily = dailies.find(d => d.id === id);
    setDailies(prev => prev.filter(d => d.id !== id));
    
    toast({
      title: "Daily Removida! 🗑️",
      description: `"${daily?.title}" foi removida`,
      className: "bg-red-500/10 border-red-500/50"
    });
  };

  const deleteTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    setTodos(prev => prev.filter(t => t.id !== id));
    
    toast({
      title: "Quest Removida! 🗑️",
      description: `"${todo?.title}" foi removida`,
      className: "bg-red-500/10 border-red-500/50"
    });
  };

  const createNewQuest = () => {
    setIsNewQuestModalOpen(true);
  };

  const closeNewQuestModal = () => {
    setIsNewQuestModalOpen(false);
  };

  const openShop = () => {
    toast({
      title: "Loja",
      description: "Em breve você poderá comprar itens épicos!",
      className: "bg-orange-500/10 border-orange-500/50"
    });
  };

  const openAchievements = () => {
    toast({
      title: "Conquistas",
      description: "Suas conquistas serão exibidas aqui em breve!",
      className: "bg-indigo-500/10 border-indigo-500/50"
    });
  };

  const openSettings = () => {
    toast({
      title: "Configurações",
      description: "Painel de configurações em desenvolvimento...",
      className: "bg-gray-500/10 border-gray-500/50"
    });
  };

  return (
    <GameContext.Provider value={{
      gameState,
      habits,
      dailies,
      todos,
      isNewQuestModalOpen,
      completeHabit,
      completeDaily,
      completeTodo,
      addHabit,
      addDaily,
      addTodo,
      updateHabit,
      updateDaily,
      updateTodo,
      deleteHabit,
      deleteDaily,
      deleteTodo,
      createNewQuest,
      closeNewQuestModal,
      openShop,
      openAchievements,
      openSettings
    }}>
      {children}
    </GameContext.Provider>
  );
};
