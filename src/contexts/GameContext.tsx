import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { ProfileCustomization, ShopItem, SHOP_ITEMS } from '@/types/profile';
import { Achievement } from '@/types/achievements';
import { XpUpSettings, DEFAULT_SETTINGS } from '@/types/settings';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'habit' | 'daily' | 'todo';
  streak: number;
  due_date?: string;
  due_time?: string;
}

export interface Habit {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  isPositive: boolean;
  streak: number;
}

export interface Daily {
  id: string;
  title: string;
  dueTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  streak: number;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  coinReward: number;
  isOverdue: boolean;
  completed: boolean;
}

export interface Reward {
  xp: number;
  coins: number;
}

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

interface GameContextType {
  gameState: GameState;
  profile: ProfileCustomization;
  settings: XpUpSettings;
  achievements: Achievement[];
  shopItems: ShopItem[];
  habits: Habit[];
  dailies: Daily[];
  todos: Todo[];
  
  // Profile and settings methods
  updateProfile: (newProfile: ProfileCustomization) => void;
  updateSettings: (newSettings: XpUpSettings) => void;
  buyShopItem: (itemId: string) => void;
  
  // Modal state and methods
  isProfileModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isAchievementsModalOpen: boolean;
  isNewQuestModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsSettingsModalOpen: (open: boolean) => void;  
  setIsAchievementsModalOpen: (open: boolean) => void;
  openProfile: () => void;
  openSettings: () => void;
  openAchievements: () => void;
  createNewQuest: () => void;
  closeNewQuestModal: () => void;
  closeAchievements: () => void;
  closeProfile: () => void;
  closeSettings: () => void;
  
  // Task management methods
  addHabit: (habit: Omit<Habit, 'id'>) => void;
  addDaily: (daily: Omit<Daily, 'id'>) => void;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  updateHabit: (id: string, habit: Partial<Habit>) => void;
  updateDaily: (id: string, daily: Partial<Daily>) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  completeHabit: (id: string, positive: boolean) => void;
  completeDaily: (id: string) => void;
  completeTodo: (id: string) => void;
  deleteHabit: (id: string) => void;
  deleteDaily: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const supabaseData = useSupabaseData(user);

  const [gameState, setGameState] = useState<GameState>({
    hp: 50,
    maxHp: 50,
    xp: 0,
    totalXp: 0,
    maxXp: 100,
    coins: 0,
    level: 1,
    streak: 0,
  });

  const [profile, setProfile] = useState<ProfileCustomization>({
    displayName: 'Carlos',
    avatar: '👤',
    frameBorder: 'border-2 border-primary/50',
    nameColor: 'text-foreground',
    backgroundColor: 'bg-card',
  });

  const [settings, setSettings] = useState<XpUpSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [dailies, setDailies] = useState<Daily[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isNewQuestModalOpen, setIsNewQuestModalOpen] = useState(false);

  // Carregar dados do usuário quando ele fizer login
  useEffect(() => {
    if (!user) {
      // Reset para valores padrão quando não há usuário logado
      setProfile({
        displayName: 'Carlos',
        avatar: '👤',
        frameBorder: 'border-2 border-primary/50',
        nameColor: 'text-foreground',
        backgroundColor: 'bg-card',
      });
      setSettings(DEFAULT_SETTINGS);
      setIsLoading(false);
      return;
    }

    // Evitar múltiplas chamadas se já estiver carregando
    if (isLoading) return;

    const loadUserData = async () => {
      setIsLoading(true);
      console.log('Carregando dados do usuário:', user.id);
      
      try {
        // Carregar perfil
        const profileData = await supabaseData.loadProfile();
        console.log('Dados do perfil carregados:', profileData);
        
        if (profileData) {
          setProfile({
            displayName: profileData.display_name || 'Carlos',
            avatar: profileData.avatar || '👤',
            frameBorder: profileData.frame_border || 'border-2 border-primary/50',
            nameColor: profileData.name_color || 'text-foreground',
            backgroundColor: profileData.background_color || 'bg-card',
          });
        } else {
          // Criar perfil padrão com nome Carlos
          console.log('Criando perfil padrão para o usuário');
          const defaultProfile = {
            display_name: 'Carlos',
            avatar: '👤',
            frame_border: 'border-2 border-primary/50',
            name_color: 'text-foreground',
            background_color: 'bg-card',
          };
          
          await supabaseData.saveProfile(defaultProfile);
          setProfile({
            displayName: 'Carlos',
            avatar: '👤',
            frameBorder: 'border-2 border-primary/50',
            nameColor: 'text-foreground',
            backgroundColor: 'bg-card',
          });
        }

        // Carregar estado do jogo
        const gameStateData = await supabaseData.loadGameState();
        if (gameStateData) {
          setGameState({
            hp: gameStateData.hp,
            maxHp: gameStateData.max_hp,
            xp: gameStateData.xp,
            totalXp: gameStateData.total_xp,
            maxXp: gameStateData.max_xp,
            coins: gameStateData.coins,
            level: gameStateData.level,
            streak: gameStateData.streak,
          });
        }

        // Carregar configurações
        const settingsData = await supabaseData.loadSettings();
        if (settingsData) {
          setSettings({
            darkMode: settingsData.dark_mode ?? DEFAULT_SETTINGS.darkMode,
            animatedXpBar: settingsData.animated_xp_bar ?? DEFAULT_SETTINGS.animatedXpBar,
            globalNotifications: settingsData.global_notifications ?? DEFAULT_SETTINGS.globalNotifications,
            dailyReminder: settingsData.daily_reminder ?? DEFAULT_SETTINGS.dailyReminder,
            reminderTime: settingsData.reminder_time ?? DEFAULT_SETTINGS.reminderTime,
            hardcoreMode: settingsData.hardcore_mode ?? DEFAULT_SETTINGS.hardcoreMode,
            vacationMode: settingsData.vacation_mode ?? DEFAULT_SETTINGS.vacationMode,
          });
        } else {
          setSettings(DEFAULT_SETTINGS);
        }

      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Em caso de erro, garantir que o nome seja Carlos
        setProfile(prev => ({ ...prev, displayName: 'Carlos' }));
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [user?.id]); // Dependência apenas do ID do usuário para evitar loops

  const updateProfile = useCallback(async (newProfile: ProfileCustomization) => {
    console.log('Atualizando perfil:', newProfile);
    setProfile(newProfile);
    
    if (user) {
      try {
        await supabaseData.saveProfile({
          display_name: newProfile.displayName,
          avatar: newProfile.avatar,
          frame_border: newProfile.frameBorder,
          name_color: newProfile.nameColor,
          background_color: newProfile.backgroundColor,
        });
        console.log('Perfil salvo com sucesso');
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
      }
    }
  }, [user, supabaseData]);

  const updateSettings = useCallback(async (newSettings: XpUpSettings) => {
    setSettings(newSettings);
    
    if (user) {
      try {
        await supabaseData.saveSettings({
          dark_mode: newSettings.darkMode,
          animated_xp_bar: newSettings.animatedXpBar,
          global_notifications: newSettings.globalNotifications,
          daily_reminder: newSettings.dailyReminder,
          reminder_time: newSettings.reminderTime,
          hardcore_mode: newSettings.hardcoreMode,
          vacation_mode: newSettings.vacationMode,
        });
      } catch (error) {
        console.error('Erro ao salvar configurações:', error);
      }
    }
  }, [user, supabaseData]);

  const buyShopItem = (itemId: string) => {
    setShopItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, owned: true }
        : item
    ));
  };

  // Modal methods
  const openProfile = () => setIsProfileModalOpen(true);
  const openSettings = () => setIsSettingsModalOpen(true);
  const openAchievements = () => setIsAchievementsModalOpen(true);
  const createNewQuest = () => setIsNewQuestModalOpen(true);
  const closeNewQuestModal = () => setIsNewQuestModalOpen(false);
  const closeAchievements = () => setIsAchievementsModalOpen(false);
  const closeProfile = () => setIsProfileModalOpen(false);
  const closeSettings = () => setIsSettingsModalOpen(false);

  // Task management methods
  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newHabit = { ...habit, id: Math.random().toString(36).substr(2, 9) };
    setHabits(prev => [...prev, newHabit]);
  };

  const addDaily = (daily: Omit<Daily, 'id'>) => {
    const newDaily = { ...daily, id: Math.random().toString(36).substr(2, 9) };
    setDailies(prev => [...prev, newDaily]);
  };

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const newTodo = { ...todo, id: Math.random().toString(36).substr(2, 9) };
    setTodos(prev => [...prev, newTodo]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const updateDaily = (id: string, updates: Partial<Daily>) => {
    setDailies(prev => prev.map(daily => 
      daily.id === id ? { ...daily, ...updates } : daily
    ));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const completeHabit = (id: string, positive: boolean) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      if (positive) {
        setGameState(prev => ({
          ...prev,
          xp: prev.xp + habit.xpReward,
          coins: prev.coins + habit.coinReward,
        }));
        setHabits(prev => prev.map(h => 
          h.id === id ? { ...h, streak: h.streak + 1 } : h
        ));
      } else {
        setHabits(prev => prev.map(h => 
          h.id === id ? { ...h, streak: 0 } : h
        ));
      }
    }
  };

  const completeDaily = (id: string) => {
    const daily = dailies.find(d => d.id === id);
    if (daily && !daily.completed) {
      setGameState(prev => ({
        ...prev,
        xp: prev.xp + daily.xpReward,
        coins: prev.coins + daily.coinReward,
      }));
      setDailies(prev => prev.map(d => 
        d.id === id ? { ...d, completed: true, streak: d.streak + 1 } : d
      ));
    }
  };

  const completeTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      // Atualizar estado do jogo com recompensas
      setGameState(prev => ({
        ...prev,
        xp: prev.xp + todo.xpReward,
        coins: prev.coins + todo.coinReward,
      }));
      
      // Marcar To-Do como concluído
      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, completed: true } : t
      ));
    }
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const deleteDaily = (id: string) => {
    setDailies(prev => prev.filter(daily => daily.id !== id));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const value: GameContextType = {
    gameState,
    profile,
    settings,
    achievements,
    shopItems,
    habits,
    dailies,
    todos,
    updateProfile,
    updateSettings,
    buyShopItem,
    openProfile,
    openSettings,
    openAchievements,
    createNewQuest,
    closeNewQuestModal,
    closeAchievements,
    closeProfile,
    closeSettings,
    isProfileModalOpen,
    isSettingsModalOpen,
    isAchievementsModalOpen,
    isNewQuestModalOpen,
    setIsProfileModalOpen,
    setIsSettingsModalOpen,
    setIsAchievementsModalOpen,
    addHabit,
    addDaily,
    addTodo,
    updateHabit,
    updateDaily,
    updateTodo,
    completeHabit,
    completeDaily,
    completeTodo,
    deleteHabit,
    deleteDaily,
    deleteTodo,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
