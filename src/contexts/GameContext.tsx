
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GameState {
  hp: number;
  maxHp: number;
  xp: number;
  maxXp: number;
  coins: number;
  level: number;
  streak: number;
}

interface GameContextType {
  gameState: GameState;
  completeHabit: (habitId: number, isPositive: boolean) => void;
  completeDaily: (dailyId: number) => void;
  completeTodo: (todoId: number) => void;
  createNewQuest: () => void;
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

export const GameProvider = ({ children }: GameProviderProps) => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    hp: 85,
    maxHp: 100,
    xp: 1245,
    maxXp: 2000,
    coins: 342,
    level: 12,
    streak: 7
  });

  const completeHabit = (habitId: number, isPositive: boolean) => {
    if (isPositive) {
      const xpGain = 15;
      const coinGain = 3;
      
      setGameState(prev => ({
        ...prev,
        xp: Math.min(prev.xp + xpGain, prev.maxXp),
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
    const xpGain = 18;
    const coinGain = 3;
    
    setGameState(prev => ({
      ...prev,
      xp: Math.min(prev.xp + xpGain, prev.maxXp),
      coins: prev.coins + coinGain
    }));

    toast({
      title: "Daily Completada! ✨",
      description: `+${xpGain} XP, +${coinGain} moedas`,
      className: "bg-blue-500/10 border-blue-500/50"
    });
  };

  const completeTodo = (todoId: number) => {
    const xpGain = 25;
    const coinGain = 5;
    
    setGameState(prev => ({
      ...prev,
      xp: Math.min(prev.xp + xpGain, prev.maxXp),
      coins: prev.coins + coinGain
    }));

    toast({
      title: "Quest Completada! 🏆",
      description: `+${xpGain} XP, +${coinGain} moedas`,
      className: "bg-purple-500/10 border-purple-500/50"
    });
  };

  const createNewQuest = () => {
    toast({
      title: "Nova Quest",
      description: "Funcionalidade em desenvolvimento...",
      className: "bg-yellow-500/10 border-yellow-500/50"
    });
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
      completeHabit,
      completeDaily,
      completeTodo,
      createNewQuest,
      openShop,
      openAchievements,
      openSettings
    }}>
      {children}
    </GameContext.Provider>
  );
};
