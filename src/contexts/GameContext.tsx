
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Achievement, ACHIEVEMENTS } from '@/types/achievements';
import { ProfileCustomization, ShopItem, SHOP_ITEMS } from '@/types/profile';
import { XpUpSettings, DEFAULT_SETTINGS } from '@/types/settings';
import { useAuth } from './AuthContext';
import { useSupabaseData, DatabaseGameState, DatabaseHabit, DatabaseDaily, DatabaseTodo } from '@/hooks/useSupabaseData';

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
  id: string;
  title: string;
  streak: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  isPositive: boolean;
}

interface Daily {
  id: string;
  title: string;
  completed: boolean;
  dueTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  streak: number;
}

interface Todo {
  id: string;
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
  achievements: Achievement[];
  isNewQuestModalOpen: boolean;
  isAchievementsModalOpen: boolean;
  completeHabit: (habitId: string, isPositive: boolean) => void;
  completeDaily: (dailyId: string) => void;
  completeTodo: (todoId: string) => void;
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  addDaily: (daily: Omit<Daily, 'id'>) => void;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  updateDaily: (id: string, daily: Partial<Daily>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteHabit: (id: string) => void;
  deleteDaily: (id: string) => void;
  deleteTodo: (id: string) => void;
  createNewQuest: () => void;
  closeNewQuestModal: () => void;
  openShop: () => void;
  openAchievements: () => void;
  closeAchievements: () => void;
  openSettings: () => void;
  profile: ProfileCustomization;
  shopItems: ShopItem[];
  isProfileModalOpen: boolean;
  updateProfile: (newProfile: ProfileCustomization) => void;
  buyShopItem: (itemId: string) => void;
  openProfile: () => void;
  closeProfile: () => void;
  settings: XpUpSettings;
  isSettingsModalOpen: boolean;
  updateSettings: (newSettings: XpUpSettings) => void;
  closeSettings: () => void;
  loading: boolean;
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
  if (totalXp === 0) return 1;
  
  // Exponential growth: each level requires more XP
  // Level n requires approximately n^2 * 100 total XP
  const level = Math.floor(Math.sqrt(totalXp / 100)) + 1;
  return Math.min(level, 100); // Cap at level 100
};

// Function to calculate XP needed for next level
const calculateXpForNextLevel = (currentLevel: number): number => {
  if (currentLevel >= 100) return 0;
  return (currentLevel) * (currentLevel) * 100;
};

// Function to calculate current level XP and max XP for progress bar
const calculateLevelProgress = (totalXp: number, currentLevel: number) => {
  const currentLevelBaseXp = (currentLevel - 1) * (currentLevel - 1) * 100;
  const nextLevelBaseXp = currentLevel * currentLevel * 100;
  
  return {
    currentLevelXp: totalXp - currentLevelBaseXp,
    maxLevelXp: nextLevelBaseXp - currentLevelBaseXp
  };
};

const convertDatabaseToLocal = {
  gameState: (data: DatabaseGameState): GameState => {
    const level = calculateLevel(data.total_xp);
    const { currentLevelXp, maxLevelXp } = calculateLevelProgress(data.total_xp, level);
    
    return {
      hp: data.hp,
      maxHp: data.max_hp,
      xp: currentLevelXp,
      totalXp: data.total_xp,
      maxXp: maxLevelXp,
      coins: data.coins,
      level: level,
      streak: data.streak
    };
  },
  
  habit: (data: DatabaseHabit): Habit => ({
    id: data.id,
    title: data.title,
    streak: data.streak,
    difficulty: data.difficulty,
    xpReward: data.xp_reward,
    coinReward: data.coin_reward,
    isPositive: data.is_positive
  }),
  
  daily: (data: DatabaseDaily): Daily => ({
    id: data.id,
    title: data.title,
    completed: data.completed,
    dueTime: data.due_time,
    difficulty: data.difficulty,
    xpReward: data.xp_reward,
    coinReward: data.coin_reward,
    streak: data.streak
  }),
  
  todo: (data: DatabaseTodo): Todo => ({
    id: data.id,
    title: data.title,
    completed: data.completed,
    dueDate: data.due_date,
    priority: data.priority,
    difficulty: data.difficulty,
    xpReward: data.xp_reward,
    coinReward: data.coin_reward,
    isOverdue: data.is_overdue
  })
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const supabaseData = useSupabaseData(user);
  
  const [loading, setLoading] = useState(true);
  const [isNewQuestModalOpen, setIsNewQuestModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const [gameState, setGameState] = useState<GameState>({
    hp: 100,
    maxHp: 100,
    xp: 0,
    totalXp: 0,
    maxXp: 100,
    coins: 0,
    level: 1,
    streak: 0
  });
  
  const [habits, setHabits] = useState<Habit[]>([]);
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [profile, setProfile] = useState<ProfileCustomization>({
    displayName: 'Aventureiro',
    avatar: '👤',
    frameBorder: 'border-2 border-primary/50',
    nameColor: 'text-foreground',
    backgroundColor: 'bg-card'
  });
  const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);
  const [settings, setSettings] = useState<XpUpSettings>(DEFAULT_SETTINGS);

  // Load all data when user is available
  useEffect(() => {
    const loadAllData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        // Load game state
        const gameStateData = await supabaseData.loadGameState();
        if (gameStateData) {
          setGameState(convertDatabaseToLocal.gameState(gameStateData));
        } else {
          // Create initial game state
          const initialState = {
            hp: 100,
            max_hp: 100,
            xp: 0,
            total_xp: 0,
            max_xp: 100,
            coins: 0,
            level: 1,
            streak: 0
          };
          await supabaseData.saveGameState(initialState);
        }

        // Load profile
        const profileData = await supabaseData.loadProfile();
        if (profileData) {
          setProfile({
            displayName: profileData.display_name,
            avatar: profileData.avatar,
            frameBorder: profileData.frame_border,
            nameColor: profileData.name_color,
            backgroundColor: profileData.background_color
          });
        } else {
          // Create initial profile
          await supabaseData.saveProfile({
            display_name: 'Aventureiro',
            avatar: '👤',
            frame_border: 'border-2 border-primary/50',
            name_color: 'text-foreground',
            background_color: 'bg-card'
          });
        }

        // Load settings
        const settingsData = await supabaseData.loadSettings();
        if (settingsData) {
          setSettings(prev => ({
            ...prev,
            globalNotifications: settingsData.global_notifications,
            dailyReminder: settingsData.daily_reminder,
            reminderTime: settingsData.reminder_time,
            hardcoreMode: settingsData.hardcore_mode,
            vacationMode: settingsData.vacation_mode,
            animatedXpBar: settingsData.animated_xp_bar
          }));
        } else {
          // Create initial settings
          await supabaseData.saveSettings({
            global_notifications: DEFAULT_SETTINGS.globalNotifications,
            daily_reminder: DEFAULT_SETTINGS.dailyReminder,
            reminder_time: DEFAULT_SETTINGS.reminderTime,
            hardcore_mode: DEFAULT_SETTINGS.hardcoreMode,
            vacation_mode: DEFAULT_SETTINGS.vacationMode,
            animated_xp_bar: DEFAULT_SETTINGS.animatedXpBar
          });
        }

        // Load habits
        const habitsData = await supabaseData.loadHabits();
        setHabits(habitsData.map(convertDatabaseToLocal.habit));

        // Load dailies
        const dailiesData = await supabaseData.loadDailies();
        setDailies(dailiesData.map(convertDatabaseToLocal.daily));

        // Load todos
        const todosData = await supabaseData.loadTodos();
        setTodos(todosData.map(convertDatabaseToLocal.todo));

        // Initialize achievements with current progress
        await initializeAchievements(gameStateData, habitsData, dailiesData, todosData);

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [user]);

  const initializeAchievements = async (gameStateData: any, habitsData: any[], dailiesData: any[], todosData: any[]) => {
    let updatedAchievements = [...ACHIEVEMENTS];
    
    if (gameStateData) {
      const currentLevel = calculateLevel(gameStateData.total_xp);
      const totalXp = gameStateData.total_xp;
      const coins = gameStateData.coins;
      const streak = gameStateData.streak;

      // Check level achievements
      const levelAchievements = [
        { id: 'nivel-5', level: 5 },
        { id: 'nivel-10', level: 10 },
        { id: 'nivel-15', level: 15 },
        { id: 'nivel-20', level: 20 },
        { id: 'lenda-viva', level: 50 }
      ];

      levelAchievements.forEach(({ id, level }) => {
        const achievement = updatedAchievements.find(a => a.id === id);
        if (achievement && currentLevel >= level && !achievement.unlocked) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
        }
      });

      // Check XP achievements
      if (totalXp >= 1000) {
        const xpAchievement = updatedAchievements.find(a => a.id === 'xp-master');
        if (xpAchievement && !xpAchievement.unlocked) {
          xpAchievement.unlocked = true;
          xpAchievement.unlockedAt = new Date();
        }
      }

      if (totalXp >= 10000) {
        const xpAchievement = updatedAchievements.find(a => a.id === 'milionario-xp');
        if (xpAchievement && !xpAchievement.unlocked) {
          xpAchievement.unlocked = true;
          xpAchievement.unlockedAt = new Date();
        }
      }

      // Check coins achievement
      if (coins >= 1000) {
        const coinAchievement = updatedAchievements.find(a => a.id === 'colecionador-moedas');
        if (coinAchievement && !coinAchievement.unlocked) {
          coinAchievement.unlocked = true;
          coinAchievement.unlockedAt = new Date();
        }
      }

      // Check streak achievements
      const streakAchievements = [
        { id: 'foco-total', streak: 7 },
        { id: 'primeira-semana', streak: 7 },
        { id: 'maratonista', streak: 30 },
        { id: 'primeiro-mes', streak: 30 },
        { id: 'mestre-da-disciplina', streak: 100 }
      ];

      streakAchievements.forEach(({ id, streak: requiredStreak }) => {
        const achievement = updatedAchievements.find(a => a.id === id);
        if (achievement && streak >= requiredStreak && !achievement.unlocked) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
        }
      });
    }

    // Check creation achievements
    const habitCount = habitsData.length;
    const dailyCount = dailiesData.length;
    const todoCount = todosData.length;
    const completedTodos = todosData.filter(t => t.completed).length;
    const completedDailies = dailiesData.filter(d => d.completed).length;

    // First creations
    if (habitCount > 0) {
      const achievement = updatedAchievements.find(a => a.id === 'primeiro-habito');
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
      }
    }

    if (completedTodos > 0) {
      const achievement = updatedAchievements.find(a => a.id === 'primeira-missao');
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
      }
    }

    if (completedDailies > 0) {
      const achievement = updatedAchievements.find(a => a.id === 'o-despertar');
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
      }
    }

    // Count achievements
    const countAchievements = [
      { id: 'mestre-da-organizacao', count: todoCount, required: 15 },
      { id: 'organizador-supremo', count: todoCount, required: 50 },
      { id: 'rotina-perfeita', count: dailyCount, required: 10 },
      { id: 'mente-saudavel', count: habitCount, required: 10 }
    ];

    countAchievements.forEach(({ id, count, required }) => {
      const achievement = updatedAchievements.find(a => a.id === id);
      if (achievement && count >= required && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
      }
    });

    // Check for active habits achievement
    const activeHabits = habitsData.filter(h => h.is_positive && h.streak > 0).length;
    if (activeHabits >= 5) {
      const achievement = updatedAchievements.find(a => a.id === 'guru-dos-habitos');
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
      }
    }

    setAchievements(updatedAchievements);
  };

  const checkAchievements = async (context: string, data?: any) => {
    setAchievements(prev => {
      let updated = [...prev];
      let newUnlocks = [];

      // Check for first-time achievements
      if (context === 'first-todo-completed' && !updated.find(a => a.id === 'primeira-missao')?.unlocked) {
        const achievement = updated.find(a => a.id === 'primeira-missao');
        if (achievement) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newUnlocks.push(achievement);
        }
      }

      if (context === 'first-daily-completed' && !updated.find(a => a.id === 'o-despertar')?.unlocked) {
        const achievement = updated.find(a => a.id === 'o-despertar');
        if (achievement) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newUnlocks.push(achievement);
        }
      }

      if (context === 'first-habit-created' && !updated.find(a => a.id === 'primeiro-habito')?.unlocked) {
        const achievement = updated.find(a => a.id === 'primeiro-habito');
        if (achievement) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newUnlocks.push(achievement);
        }
      }

      // Check level achievements
      if (context === 'level-up' && data?.newLevel) {
        const levelAchievements = [
          { id: 'nivel-5', level: 5 },
          { id: 'nivel-10', level: 10 },
          { id: 'nivel-15', level: 15 },
          { id: 'nivel-20', level: 20 },
          { id: 'lenda-viva', level: 50 }
        ];

        levelAchievements.forEach(({ id, level }) => {
          if (data.newLevel >= level && !updated.find(a => a.id === id)?.unlocked) {
            const achievement = updated.find(a => a.id === id);
            if (achievement) {
              achievement.unlocked = true;
              achievement.unlockedAt = new Date();
              newUnlocks.push(achievement);
            }
          }
        });
      }

      // Check hard difficulty achievement
      if (context === 'task-completed' && data?.difficulty === 'hard') {
        const achievement = updated.find(a => a.id === 'tarefa-epica');
        if (achievement && !achievement.unlocked) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newUnlocks.push(achievement);
        }
      }

      // Check XP achievements
      if (context === 'xp-gained' && data?.totalXp) {
        if (data.totalXp >= 1000 && !updated.find(a => a.id === 'xp-master')?.unlocked) {
          const achievement = updated.find(a => a.id === 'xp-master');
          if (achievement) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
            newUnlocks.push(achievement);
          }
        }

        if (data.totalXp >= 10000 && !updated.find(a => a.id === 'milionario-xp')?.unlocked) {
          const achievement = updated.find(a => a.id === 'milionario-xp');
          if (achievement) {
            achievement.unlocked = true;
            achievement.unlockedAt = new Date();
            newUnlocks.push(achievement);
          }
        }
      }

      // Check coins achievement
      if (context === 'coins-gained' && data?.totalCoins >= 1000) {
        const achievement = updated.find(a => a.id === 'colecionador-moedas');
        if (achievement && !achievement.unlocked) {
          achievement.unlocked = true;
          achievement.unlockedAt = new Date();
          newUnlocks.push(achievement);
        }
      }

      // Check streak achievements
      if (context === 'streak-updated' && data?.streak) {
        const streakAchievements = [
          { id: 'foco-total', streak: 7 },
          { id: 'primeira-semana', streak: 7 },
          { id: 'maratonista', streak: 30 },
          { id: 'primeiro-mes', streak: 30 },
          { id: 'mestre-da-disciplina', streak: 100 }
        ];

        streakAchievements.forEach(({ id, streak: requiredStreak }) => {
          if (data.streak >= requiredStreak && !updated.find(a => a.id === id)?.unlocked) {
            const achievement = updated.find(a => a.id === id);
            if (achievement) {
              achievement.unlocked = true;
              achievement.unlockedAt = new Date();
              newUnlocks.push(achievement);
            }
          }
        });
      }

      // Check count achievements
      if (context === 'count-updated') {
        const countAchievements = [
          { id: 'mestre-da-organizacao', count: data?.todoCount || 0, required: 15 },
          { id: 'organizador-supremo', count: data?.todoCount || 0, required: 50 },
          { id: 'rotina-perfeita', count: data?.dailyCount || 0, required: 10 },
          { id: 'mente-saudavel', count: data?.habitCount || 0, required: 10 }
        ];

        countAchievements.forEach(({ id, count, required }) => {
          if (count >= required && !updated.find(a => a.id === id)?.unlocked) {
            const achievement = updated.find(a => a.id === id);
            if (achievement) {
              achievement.unlocked = true;
              achievement.unlockedAt = new Date();
              newUnlocks.push(achievement);
            }
          }
        });
      }

      // Show toast for new achievements only if global notifications are enabled
      if (settings.globalNotifications) {
        newUnlocks.forEach(achievement => {
          toast({
            title: `🏆 CONQUISTA DESBLOQUEADA! 🏆`,
            description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
            className: "bg-quest-legendary/20 border-quest-legendary"
          });
        });
      }

      return updated;
    });
  };

  const updateGameStateXp = async (xpGain: number) => {
    const newTotalXp = gameState.totalXp + xpGain;
    const newLevel = calculateLevel(newTotalXp);
    const { currentLevelXp, maxLevelXp } = calculateLevelProgress(newTotalXp, newLevel);
    
    const finalXpGain = settings.hardcoreMode ? Math.floor(xpGain * 1.5) : xpGain;
    const adjustedTotalXp = settings.hardcoreMode ? gameState.totalXp + finalXpGain : newTotalXp;
    const adjustedLevel = calculateLevel(adjustedTotalXp);
    
    const newGameState = {
      ...gameState,
      xp: currentLevelXp,
      totalXp: adjustedTotalXp,
      maxXp: maxLevelXp,
      level: adjustedLevel
    };
    
    setGameState(newGameState);
    
    // Save to database
    await supabaseData.saveGameState({
      hp: newGameState.hp,
      max_hp: newGameState.maxHp,
      xp: currentLevelXp,
      total_xp: adjustedTotalXp,
      max_xp: maxLevelXp,
      coins: newGameState.coins,
      level: adjustedLevel,
      streak: newGameState.streak
    });
    
    // Check XP achievement
    checkAchievements('xp-gained', { totalXp: adjustedTotalXp });
    
    if (adjustedLevel > gameState.level) {
      checkAchievements('level-up', { newLevel: adjustedLevel });
      if (settings.globalNotifications) {
        toast({
          title: `🎉 LEVEL UP! 🎉`,
          description: `Parabéns! Você alcançou o nível ${adjustedLevel}!`,
          className: "bg-quest-legendary/20 border-quest-legendary"
        });
      }
    }
  };

  const completeHabit = async (habitId: string, isPositive: boolean) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    if (isPositive) {
      const baseXpGain = habit.xpReward;
      const baseCoinGain = habit.coinReward;
      
      const xpGain = settings.hardcoreMode ? Math.floor(baseXpGain * 1.5) : baseXpGain;
      const coinGain = settings.hardcoreMode ? Math.floor(baseCoinGain * 1.5) : baseCoinGain;
      
      await updateGameStateXp(xpGain);
      
      const newGameState = {
        ...gameState,
        coins: gameState.coins + coinGain,
        hp: Math.min(gameState.hp + 2, gameState.maxHp),
        streak: gameState.streak + 1
      };
      
      setGameState(newGameState);
      
      // Update habit streak
      const updatedHabit = { ...habit, streak: habit.streak + 1 };
      setHabits(prev => prev.map(h => h.id === habitId ? updatedHabit : h));
      
      // Save to database
      await supabaseData.saveGameState({
        hp: newGameState.hp,
        max_hp: newGameState.maxHp,
        coins: newGameState.coins,
        streak: newGameState.streak
      });
      
      await supabaseData.saveHabit({
        id: habitId,
        streak: updatedHabit.streak
      });

      // Check achievements
      checkAchievements('coins-gained', { totalCoins: newGameState.coins });
      checkAchievements('streak-updated', { streak: newGameState.streak });
      checkAchievements('task-completed', { difficulty: habit.difficulty });

      if (settings.globalNotifications) {
        toast({
          title: "Hábito Completado! 🎉",
          description: `+${xpGain} XP, +${coinGain} moedas, +2 HP${settings.hardcoreMode ? ' (Modo Hardcore)' : ''}`,
          className: "bg-green-500/10 border-green-500/50"
        });
      }
    } else {
      if (settings.vacationMode) {
        if (settings.globalNotifications) {
          toast({
            title: "Modo Férias Ativo ✈️",
            description: "Nenhuma penalidade aplicada durante as férias!",
            className: "bg-blue-500/10 border-blue-500/50"
          });
        }
        return;
      }

      const hpLoss = settings.hardcoreMode ? 15 : 10;
      
      const newGameState = {
        ...gameState,
        hp: Math.max(gameState.hp - hpLoss, 0)
      };
      
      setGameState(newGameState);
      
      await supabaseData.saveGameState({
        hp: newGameState.hp
      });

      if (settings.globalNotifications) {
        toast({
          title: "Hábito Negativo Registrado 😞",
          description: `-${hpLoss} HP${settings.hardcoreMode ? ' (Modo Hardcore)' : ''}. Tente novamente!`,
          className: "bg-red-500/10 border-red-500/50"
        });
      }
    }
  };

  const completeDaily = async (dailyId: string) => {
    const daily = dailies.find(d => d.id === dailyId);
    if (!daily) return;

    const baseXpGain = daily.xpReward;
    const baseCoinGain = daily.coinReward;
    
    const xpGain = settings.hardcoreMode ? Math.floor(baseXpGain * 1.5) : baseXpGain;
    const coinGain = settings.hardcoreMode ? Math.floor(baseCoinGain * 1.5) : baseCoinGain;
    
    await updateGameStateXp(xpGain);
    
    const newGameState = {
      ...gameState,
      coins: gameState.coins + coinGain,
      streak: gameState.streak + 1
    };
    
    setGameState(newGameState);
    
    // Update daily
    const updatedDaily = { ...daily, completed: true, streak: daily.streak + 1 };
    setDailies(prev => prev.map(d => d.id === dailyId ? updatedDaily : d));
    
    // Save to database
    await supabaseData.saveGameState({
      coins: newGameState.coins,
      streak: newGameState.streak
    });
    
    await supabaseData.saveDaily({
      id: dailyId,
      completed: true,
      streak: updatedDaily.streak,
      completed_at: new Date().toISOString().split('T')[0]
    });

    // Check achievements
    checkAchievements('first-daily-completed');
    checkAchievements('coins-gained', { totalCoins: newGameState.coins });
    checkAchievements('streak-updated', { streak: newGameState.streak });
    checkAchievements('task-completed', { difficulty: daily.difficulty });

    if (settings.globalNotifications) {
      toast({
        title: "Daily Completada! ✨",
        description: `+${xpGain} XP, +${coinGain} moedas${settings.hardcoreMode ? ' (Modo Hardcore)' : ''}`,
        className: "bg-blue-500/10 border-blue-500/50"
      });
    }
  };

  const completeTodo = async (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;

    const baseXpGain = todo.xpReward;
    const baseCoinGain = todo.coinReward;
    
    const xpGain = settings.hardcoreMode ? Math.floor(baseXpGain * 1.5) : baseXpGain;
    const coinGain = settings.hardcoreMode ? Math.floor(baseCoinGain * 1.5) : baseCoinGain;
    
    await updateGameStateXp(xpGain);
    
    const newGameState = {
      ...gameState,
      coins: gameState.coins + coinGain,
      streak: gameState.streak + 1
    };
    
    setGameState(newGameState);
    
    // Update todo
    const updatedTodo = { ...todo, completed: true };
    setTodos(prev => prev.map(t => t.id === todoId ? updatedTodo : t));
    
    // Save to database
    await supabaseData.saveGameState({
      coins: newGameState.coins,
      streak: newGameState.streak
    });
    
    await supabaseData.saveTodo({
      id: todoId,
      completed: true,
      completed_at: new Date().toISOString()
    });

    // Check achievements
    checkAchievements('first-todo-completed');
    checkAchievements('coins-gained', { totalCoins: newGameState.coins });
    checkAchievements('streak-updated', { streak: newGameState.streak });
    checkAchievements('task-completed', { difficulty: todo.difficulty });

    if (settings.globalNotifications) {
      toast({
        title: "Quest Completada! 🏆",
        description: `+${xpGain} XP, +${coinGain} moedas${settings.hardcoreMode ? ' (Modo Hardcore)' : ''}`,
        className: "bg-purple-500/10 border-purple-500/50"
      });
    }
  };

  const addHabit = async (habit: Omit<Habit, 'id'>) => {
    const newHabit = await supabaseData.saveHabit({
      title: habit.title,
      streak: habit.streak,
      difficulty: habit.difficulty,
      xp_reward: habit.xpReward,
      coin_reward: habit.coinReward,
      is_positive: habit.isPositive
    });
    
    if (newHabit) {
      setHabits(prev => {
        const updated = [...prev, convertDatabaseToLocal.habit(newHabit)];
        // Check achievements based on new count
        checkAchievements('first-habit-created');
        checkAchievements('count-updated', { habitCount: updated.length });
        return updated;
      });
      
      if (settings.globalNotifications) {
        toast({
          title: "Novo Hábito Criado! 🎯",
          description: `"${habit.title}" foi adicionado à sua lista`,
          className: "bg-green-500/10 border-green-500/50"
        });
      }
    }
  };

  const addDaily = async (daily: Omit<Daily, 'id'>) => {
    const newDaily = await supabaseData.saveDaily({
      title: daily.title,
      completed: daily.completed,
      due_time: daily.dueTime,
      difficulty: daily.difficulty,
      xp_reward: daily.xpReward,
      coin_reward: daily.coinReward,
      streak: daily.streak
    });
    
    if (newDaily) {
      setDailies(prev => {
        const updated = [...prev, convertDatabaseToLocal.daily(newDaily)];
        // Check achievements based on new count
        checkAchievements('count-updated', { dailyCount: updated.length });
        return updated;
      });
      
      if (settings.globalNotifications) {
        toast({
          title: "Nova Daily Criada! ⚡",
          description: `"${daily.title}" foi adicionada à sua lista`,
          className: "bg-blue-500/10 border-blue-500/50"
        });
      }
    }
  };

  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    const newTodo = await supabaseData.saveTodo({
      title: todo.title,
      completed: todo.completed,
      due_date: todo.dueDate,
      priority: todo.priority,
      difficulty: todo.difficulty,
      xp_reward: todo.xpReward,
      coin_reward: todo.coinReward,
      is_overdue: todo.isOverdue
    });
    
    if (newTodo) {
      setTodos(prev => {
        const updated = [...prev, convertDatabaseToLocal.todo(newTodo)];
        // Check achievements based on new count
        checkAchievements('count-updated', { todoCount: updated.length });
        return updated;
      });
      
      if (settings.globalNotifications) {
        toast({
          title: "Nova Quest Criada! 🎮",
          description: `"${todo.title}" foi adicionada à sua lista`,
          className: "bg-purple-500/10 border-purple-500/50"
        });
      }
    }
  };

  const updateHabit = async (id: string, updatedHabit: Partial<Habit>) => {
    await supabaseData.saveHabit({
      id,
      title: updatedHabit.title,
      streak: updatedHabit.streak,
      difficulty: updatedHabit.difficulty,
      xp_reward: updatedHabit.xpReward,
      coin_reward: updatedHabit.coinReward,
      is_positive: updatedHabit.isPositive
    });
    
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updatedHabit } : habit
    ));
    
    if (settings.globalNotifications) {
      toast({
        title: "Hábito Atualizado! ✏️",
        description: "As alterações foram salvas",
        className: "bg-blue-500/10 border-blue-500/50"
      });
    }
  };

  const updateDaily = async (id: string, updatedDaily: Partial<Daily>) => {
    await supabaseData.saveDaily({
      id,
      title: updatedDaily.title,
      completed: updatedDaily.completed,
      due_time: updatedDaily.dueTime,
      difficulty: updatedDaily.difficulty,
      xp_reward: updatedDaily.xpReward,
      coin_reward: updatedDaily.coinReward,
      streak: updatedDaily.streak
    });
    
    setDailies(prev => prev.map(daily => 
      daily.id === id ? { ...daily, ...updatedDaily } : daily
    ));
    
    if (settings.globalNotifications) {
      toast({
        title: "Daily Atualizada! ✏️",
        description: "As alterações foram salvas",
        className: "bg-blue-500/10 border-blue-500/50"
      });
    }
  };

  const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
    await supabaseData.saveTodo({
      id,
      title: updatedTodo.title,
      completed: updatedTodo.completed,
      due_date: updatedTodo.dueDate,
      priority: updatedTodo.priority,
      difficulty: updatedTodo.difficulty,
      xp_reward: updatedTodo.xpReward,
      coin_reward: updatedTodo.coinReward,
      is_overdue: updatedTodo.isOverdue
    });
    
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
    
    if (settings.globalNotifications) {
      toast({
        title: "Quest Atualizada! ✏️",
        description: "As alterações foram salvas",
        className: "bg-blue-500/10 border-blue-500/50"
      });
    }
  };

  const deleteHabit = async (id: string) => {
    const habit = habits.find(h => h.id === id);
    await supabaseData.deleteHabit(id);
    setHabits(prev => prev.filter(h => h.id !== id));
    
    if (settings.globalNotifications) {
      toast({
        title: "Hábito Removido! 🗑️",
        description: `"${habit?.title}" foi removido`,
        className: "bg-red-500/10 border-red-500/50"
      });
    }
  };

  const deleteDaily = async (id: string) => {
    const daily = dailies.find(d => d.id === id);
    await supabaseData.deleteDaily(id);
    setDailies(prev => prev.filter(d => d.id !== id));
    
    if (settings.globalNotifications) {
      toast({
        title: "Daily Removida! 🗑️",
        description: `"${daily?.title}" foi removida`,
        className: "bg-red-500/10 border-red-500/50"
      });
    }
  };

  const deleteTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    await supabaseData.deleteTodo(id);
    setTodos(prev => prev.filter(t => t.id !== id));
    
    if (settings.globalNotifications) {
      toast({
        title: "Quest Removida! 🗑️",
        description: `"${todo?.title}" foi removida`,
        className: "bg-red-500/10 border-red-500/50"
      });
    }
  };

  const updateProfile = async (newProfile: ProfileCustomization) => {
    setProfile(newProfile);
    
    await supabaseData.saveProfile({
      display_name: newProfile.displayName,
      avatar: newProfile.avatar,
      frame_border: newProfile.frameBorder,
      name_color: newProfile.nameColor,
      background_color: newProfile.backgroundColor
    });
    
    if (settings.globalNotifications) {
      toast({
        title: "Perfil Atualizado! ✨",
        description: "Suas personalizações foram salvas",
        className: "bg-quest-primary/10 border-quest-primary/50"
      });
    }
  };

  const updateSettings = async (newSettings: XpUpSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
    
    await supabaseData.saveSettings({
      global_notifications: newSettings.globalNotifications,
      daily_reminder: newSettings.dailyReminder,
      reminder_time: newSettings.reminderTime,
      hardcore_mode: newSettings.hardcoreMode,
      vacation_mode: newSettings.vacationMode,
      animated_xp_bar: newSettings.animatedXpBar
    });
    
    if (newSettings.globalNotifications) {
      toast({
        title: "Configurações Atualizadas! ⚙️",
        description: "Suas preferências foram salvas com sucesso",
        className: "bg-cyan-500/10 border-cyan-500/50"
      });
    }
  };

  const createNewQuest = () => {
    setIsNewQuestModalOpen(true);
  };

  const closeNewQuestModal = () => {
    setIsNewQuestModalOpen(false);
  };

  const openProfile = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfile = () => {
    setIsProfileModalOpen(false);
  };

  const openShop = () => {
    openProfile();
  };

  const openAchievements = () => {
    setIsAchievementsModalOpen(true);
  };

  const closeAchievements = () => {
    setIsAchievementsModalOpen(false);
  };

  const openSettings = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsModalOpen(false);
  };

  const buyShopItem = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || item.owned) return;

    // Check if item meets all requirements
    const hasEnoughCoins = gameState.coins >= item.price;
    const hasEnoughXp = !item.xpRequired || gameState.totalXp >= item.xpRequired;
    const hasRequiredAchievement = !item.achievementRequired || 
      achievements.find(a => a.id === item.achievementRequired)?.unlocked;

    if (!hasEnoughCoins || !hasEnoughXp || !hasRequiredAchievement) {
      let missingRequirements = [];
      if (!hasEnoughCoins) missingRequirements.push(`${item.price - gameState.coins} moedas`);
      if (!hasEnoughXp) missingRequirements.push(`${item.xpRequired! - gameState.totalXp} XP`);
      if (!hasRequiredAchievement) {
        const achievement = achievements.find(a => a.id === item.achievementRequired);
        missingRequirements.push(`conquista "${achievement?.title}"`);
      }

      if (settings.globalNotifications) {
        toast({
          title: "Requisitos não atendidos 🚫",
          description: `Faltam: ${missingRequirements.join(', ')}`,
          className: "bg-red-500/10 border-red-500/50"
        });
      }
      return;
    }

    setGameState(prev => ({
      ...prev,
      coins: prev.coins - item.price
    }));

    setShopItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, owned: true } : i
    ));

    if (settings.globalNotifications) {
      toast({
        title: `${item.icon} Item Comprado!`,
        description: `"${item.name}" foi adicionado ao seu inventário`,
        className: `bg-${item.rarity === 'legendary' ? 'quest-legendary' : 'quest-epic'}/10 border-${item.rarity === 'legendary' ? 'quest-legendary' : 'quest-epic'}/50`
      });
    }
  };

  return (
    <GameContext.Provider value={{
      gameState,
      habits,
      dailies,
      todos,
      achievements,
      isNewQuestModalOpen,
      isAchievementsModalOpen,
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
      closeAchievements,
      openSettings,
      profile,
      shopItems,
      isProfileModalOpen,
      updateProfile,
      buyShopItem,
      openProfile,
      closeProfile,
      settings,
      isSettingsModalOpen,
      updateSettings,
      closeSettings,
      loading,
    }}>
      {children}
    </GameContext.Provider>
  );
};
