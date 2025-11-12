import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { ProfileCustomization, ShopItem, SHOP_ITEMS } from '@/types/profile';
import { Achievement, ACHIEVEMENTS } from '@/types/achievements';
import { XpUpSettings, DEFAULT_SETTINGS } from '@/types/settings';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
      setHabits([]);
      setDailies([]);
      setTodos([]);
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
          console.log('Aplicando dados do perfil:', {
            display_name: profileData.display_name,
            avatar: profileData.avatar,
            frame_border: profileData.frame_border,
            name_color: profileData.name_color,
            background_color: profileData.background_color
          });
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

        // Carregar hábitos
        const habitsData = await supabaseData.loadHabits();
        console.log('Hábitos carregados:', habitsData);
        if (habitsData) {
          const mappedHabits = habitsData.map(habit => ({
            id: habit.id,
            title: habit.title,
            difficulty: habit.difficulty,
            xpReward: habit.xp_reward,
            coinReward: habit.coin_reward,
            isPositive: habit.is_positive,
            streak: habit.streak,
          }));
          setHabits(mappedHabits);
        }

        // Carregar dailies
        const dailiesData = await supabaseData.loadDailies();
        console.log('Dailies carregados:', dailiesData);
        if (dailiesData) {
          const mappedDailies = dailiesData.map(daily => ({
            id: daily.id,
            title: daily.title,
            dueTime: daily.due_time,
            difficulty: daily.difficulty,
            xpReward: daily.xp_reward,
            coinReward: daily.coin_reward,
            streak: daily.streak,
            completed: daily.completed,
          }));
          setDailies(mappedDailies);
        }

        // Carregar todos
        const todosData = await supabaseData.loadTodos();
        console.log('To-Dos carregados:', todosData);
        if (todosData) {
          const mappedTodos = todosData
            .filter(todo => !todo.completed) // Filtrar apenas não concluídos
            .map(todo => ({
              id: todo.id,
              title: todo.title,
              dueDate: todo.due_date,
              priority: todo.priority,
              difficulty: todo.difficulty,
              xpReward: todo.xp_reward,
              coinReward: todo.coin_reward,
              isOverdue: todo.is_overdue,
              completed: todo.completed,
            }));
          setTodos(mappedTodos);
        }

        // Carregar conquistas
        const achievementsData = await supabaseData.loadAchievements();
        console.log('Conquistas carregadas do banco:', achievementsData);
        console.log('Total de conquistas estáticas:', ACHIEVEMENTS.length);
        
        if (!achievementsData || achievementsData.length === 0) {
          // Primeira vez - inicializar todas as conquistas
          console.log('Inicializando conquistas pela primeira vez');
          await supabaseData.initializeAchievements(ACHIEVEMENTS.map(a => a.id));
          
          // Carregar novamente após inicialização
          const newAchievementsData = await supabaseData.loadAchievements();
          const mappedAchievements = ACHIEVEMENTS.map(achievement => {
            const dbAchievement = newAchievementsData?.find(
              (a: any) => a.achievement_id === achievement.id
            );
            console.log(`Mapeando conquista ${achievement.id}:`, {
              unlocked: dbAchievement?.unlocked,
              unlockedAt: dbAchievement?.unlocked_at
            });
            return {
              ...achievement,
              unlocked: dbAchievement?.unlocked || false,
              unlockedAt: dbAchievement?.unlocked_at 
                ? new Date(dbAchievement.unlocked_at) 
                : undefined,
            };
          });
          console.log('Conquistas mapeadas:', mappedAchievements.filter(a => a.unlocked).length, 'desbloqueadas');
          setAchievements(mappedAchievements);
        } else {
          // Mapear conquistas do banco com os dados estáticos
          const mappedAchievements = ACHIEVEMENTS.map(achievement => {
            const dbAchievement = achievementsData.find(
              (a: any) => a.achievement_id === achievement.id
            );
            if (dbAchievement?.unlocked) {
              console.log(`Conquista desbloqueada: ${achievement.id} (${achievement.title})`);
            }
            return {
              ...achievement,
              unlocked: dbAchievement?.unlocked || false,
              unlockedAt: dbAchievement?.unlocked_at 
                ? new Date(dbAchievement.unlocked_at) 
                : undefined,
            };
          });
          console.log('Total de conquistas desbloqueadas:', mappedAchievements.filter(a => a.unlocked).length);
          setAchievements(mappedAchievements);
        }

        // Carregar itens da loja comprados
        const shopItemsData = await supabaseData.loadShopItems();
        console.log('Itens da loja carregados:', shopItemsData);
        if (shopItemsData && shopItemsData.length > 0) {
          const ownedItemIds = shopItemsData.map((item: any) => item.item_id);
          const updatedShopItems = SHOP_ITEMS.map(item => ({
            ...item,
            owned: ownedItemIds.includes(item.id),
            unlocked: true, // Todos os itens são desbloqueados por padrão
          }));
          console.log('Itens owned:', ownedItemIds);
          setShopItems(updatedShopItems);
        } else {
          // Marcar todos como desbloqueados por padrão
          setShopItems(SHOP_ITEMS.map(item => ({ ...item, unlocked: true })));
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

  // Salvar automaticamente o estado do jogo quando ele mudar (apenas campos que não são calculados)
  useEffect(() => {
    if (!user || isLoading) return;

    const saveGameState = async () => {
      try {
        // Apenas salvamos total_xp, coins, hp e streak
        // Os campos level, max_xp, max_hp e xp são calculados pelo trigger
        console.log('Salvando estado do jogo:', {
          user_id: user.id,
          hp: gameState.hp,
          total_xp: gameState.totalXp,
          coins: gameState.coins,
          streak: gameState.streak,
        });
        await supabaseData.saveGameState({
          hp: gameState.hp,
          total_xp: gameState.totalXp,
          coins: gameState.coins,
          streak: gameState.streak,
        });
        console.log('Estado do jogo salvo automaticamente');
      } catch (error) {
        console.error('Erro ao salvar estado do jogo automaticamente:', error);
      }
    };

    // Debounce para não salvar a cada mudança imediata
    const timeoutId = setTimeout(saveGameState, 500);
    return () => clearTimeout(timeoutId);
  }, [gameState.hp, gameState.totalXp, gameState.coins, gameState.streak, user, isLoading, supabaseData]);

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

  const buyShopItem = async (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) {
      console.error('Item não encontrado:', itemId);
      return;
    }

    if (gameState.coins < item.price) {
      toast({
        title: 'Moedas insuficientes',
        description: `Você precisa de ${item.price} moedas para comprar este item.`,
        variant: 'destructive'
      });
      return;
    }

    if (item.owned) {
      toast({
        title: 'Item já possui',
        description: 'Você já possui este item.',
        variant: 'default'
      });
      return;
    }

    console.log('Comprando item:', itemId, item.name);

    // Descontar moedas
    const newGameState = {
      ...gameState,
      coins: gameState.coins - item.price
    };
    
    setGameState(newGameState);
    setShopItems(prev => prev.map(i => 
      i.id === itemId 
        ? { ...i, owned: true }
        : i
    ));

    // Salvar no banco de dados
    if (user) {
      try {
        console.log('Salvando estado do jogo...');
        await supabaseData.saveGameState({
          xp: newGameState.xp,
          total_xp: newGameState.totalXp,
          max_xp: newGameState.maxXp,
          coins: newGameState.coins,
          level: newGameState.level,
          streak: newGameState.streak,
          hp: newGameState.hp,
          max_hp: newGameState.maxHp,
        });

        console.log('Salvando compra do item:', { user_id: user.id, item_id: itemId });
        const { data, error } = await supabase
          .from('shop_items')
          .upsert({
            user_id: user.id,
            item_id: itemId,
            owned: true,
            purchased_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id,item_id'
          })
          .select();

        if (error) {
          console.error('Erro ao salvar item na tabela shop_items:', error);
          toast({
            title: 'Erro ao salvar compra',
            description: 'Sua compra não foi salva. Tente novamente.',
            variant: 'destructive'
          });
          // Reverter a compra no estado local
          setGameState(gameState);
          setShopItems(prev => prev.map(i => 
            i.id === itemId 
              ? { ...i, owned: false }
              : i
          ));
        } else {
          console.log('Item salvo com sucesso:', data);
          toast({
            title: '✨ Item comprado!',
            description: `Você comprou ${item.name} por ${item.price} moedas.`,
          });
          
          // Recarregar itens da loja para sincronizar
          const shopItemsData = await supabaseData.loadShopItems();
          if (shopItemsData && shopItemsData.length > 0) {
            const ownedItemIds = shopItemsData.map((item: any) => item.item_id);
            setShopItems(prev => prev.map(item => ({
              ...item,
              owned: ownedItemIds.includes(item.id),
            })));
          }
        }
      } catch (error) {
        console.error('Erro ao salvar compra:', error);
        toast({
          title: 'Erro ao salvar compra',
          description: 'Ocorreu um erro. Tente novamente.',
          variant: 'destructive'
        });
      }
    }
  };

  // Verificar e desbloquear conquistas
  const checkAchievements = useCallback(async () => {
    if (!user) return;

    const newlyUnlocked: Achievement[] = [];
    const updatedAchievements: Achievement[] = [];

    // Criar um mapa com o total de cada tipo de tarefa
    const totalTodos = todos.length; // Todos ativos
    const totalHabits = habits.length;
    const totalDailies = dailies.length;

    achievements.forEach(async (achievement) => {
      let shouldUnlock = false;
      let currentProgress = achievement.progress || 0;

      switch (achievement.id) {
        // Conquistas de nível
        case 'nivel-5':
          shouldUnlock = gameState.level >= 5;
          break;
        case 'nivel-10':
          shouldUnlock = gameState.level >= 10;
          break;
        case 'nivel-15':
          shouldUnlock = gameState.level >= 15;
          break;
        case 'nivel-20':
          shouldUnlock = gameState.level >= 20;
          break;
        case 'nivel-30':
        case 'imortal':
          shouldUnlock = gameState.level >= 30;
          break;
        case 'lenda-viva':
          shouldUnlock = gameState.level >= 50;
          break;

        // Conquistas de XP
        case 'xp-master':
          shouldUnlock = gameState.totalXp >= 1000;
          break;
        case 'milionario-xp':
          currentProgress = gameState.totalXp;
          shouldUnlock = gameState.totalXp >= 10000;
          break;

        // Conquistas de moedas
        case 'colecionador-moedas':
          shouldUnlock = gameState.coins >= 1000;
          break;
        case 'rico':
          currentProgress = gameState.coins;
          shouldUnlock = gameState.coins >= 500;
          break;
        case 'imperador-moedas':
          currentProgress = gameState.coins;
          shouldUnlock = gameState.coins >= 5000;
          break;

        // Conquistas de streak
        case 'foco-total':
          shouldUnlock = gameState.streak >= 7;
          break;
        case 'maratonista':
          shouldUnlock = gameState.streak >= 30;
          break;
        case 'mestre-da-disciplina':
          shouldUnlock = gameState.streak >= 100;
          break;

        // Conquistas de criação
        case 'primeiro-habito':
          shouldUnlock = totalHabits >= 1;
          break;
        case 'mente-saudavel':
          shouldUnlock = totalHabits >= 10;
          break;
        case 'guru-dos-habitos':
          currentProgress = habits.filter(h => h.isPositive && h.streak >= 7).length;
          shouldUnlock = currentProgress >= 5;
          break;
        
        case 'o-despertar':
          shouldUnlock = totalDailies >= 1;
          break;
        case 'rotina-perfeita':
          shouldUnlock = totalDailies >= 10;
          break;
        
        case 'mestre-do-tempo':
          currentProgress = totalDailies;
          shouldUnlock = totalDailies >= 50;
          break;

        case 'primeira-missao':
          shouldUnlock = totalTodos >= 1;
          break;
        case 'iniciante-dedicado':
          currentProgress = totalTodos;
          shouldUnlock = totalTodos >= 5;
          break;
        case 'disciplinado':
          currentProgress = totalTodos;
          shouldUnlock = totalTodos >= 20;
          break;
        case 'guerreiro-incansavel':
          currentProgress = totalTodos;
          shouldUnlock = totalTodos >= 100;
          break;
        case 'mestre-da-organizacao':
          shouldUnlock = totalTodos >= 15;
          break;
        case 'organizador-supremo':
          shouldUnlock = totalTodos >= 50;
          break;
        
        case 'consistencia-basica':
          currentProgress = dailies.filter(d => d.completed).length;
          shouldUnlock = currentProgress >= 3;
          break;
        case 'perfeccionista':
          // Esta precisa de lógica mais complexa (7 dias seguidos)
          shouldUnlock = false;
          break;
        case 'habitos-solidos':
          currentProgress = habits.filter(h => h.streak >= 7).length;
          shouldUnlock = currentProgress >= 3;
          break;
      }

      // Atualizar progresso mesmo se não desbloqueada
      if (achievement.maxProgress && currentProgress !== achievement.progress) {
        updatedAchievements.push({
          ...achievement,
          progress: currentProgress,
        });
      }

      if (shouldUnlock && !achievement.unlocked) {
        newlyUnlocked.push(achievement);
        
        // Atualizar no banco de dados
        await supabaseData.saveAchievement({
          achievement_id: achievement.id,
          unlocked: true,
          unlocked_at: new Date().toISOString(),
        });

        // Dar recompensa em moedas se houver
        if (achievement.coinReward && achievement.coinReward > 0) {
          const newCoins = gameState.coins + achievement.coinReward;
          await supabaseData.saveGameState({
            ...gameState,
            coins: newCoins,
          });
          setGameState(prev => ({ ...prev, coins: newCoins }));
        }
      }
    });

    // Atualizar estado local com progresso
    if (updatedAchievements.length > 0 || newlyUnlocked.length > 0) {
      setAchievements(prev => prev.map(a => {
        // Verificar se foi desbloqueada
        const unlocked = newlyUnlocked.find(nu => nu.id === a.id);
        if (unlocked) {
          return { ...a, unlocked: true, unlockedAt: new Date(), progress: a.maxProgress };
        }
        
        // Verificar se teve progresso atualizado
        const updated = updatedAchievements.find(ua => ua.id === a.id);
        if (updated) {
          return updated;
        }
        
        return a;
      }));

      // Mostrar notificação para cada conquista desbloqueada
      newlyUnlocked.forEach(achievement => {
        const coinRewardText = achievement.coinReward ? ` +${achievement.coinReward} moedas!` : '';
        toast({
          title: `🏆 Conquista Desbloqueada!`,
          description: `${achievement.icon} ${achievement.title} - ${achievement.description}${coinRewardText}`,
          duration: 5000,
        });
      });
    }
  }, [user, gameState, achievements, todos, habits, dailies, supabaseData]);

  // Verificar conquistas quando o estado mudar
  useEffect(() => {
    if (user && !isLoading) {
      checkAchievements();
    }
  }, [gameState.level, gameState.totalXp, gameState.coins, gameState.streak, habits.length, dailies.length, todos.length, user, isLoading, checkAchievements]);

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
  const addHabit = async (habit: Omit<Habit, 'id'>) => {
    if (user) {
      try {
        const savedHabit = await supabaseData.saveHabit({
          title: habit.title,
          difficulty: habit.difficulty,
          is_positive: habit.isPositive,
          streak: habit.streak,
        });
        
        if (savedHabit) {
          const newHabit = {
            id: savedHabit.id,
            title: savedHabit.title,
            difficulty: savedHabit.difficulty,
            xpReward: savedHabit.xp_reward,
            coinReward: savedHabit.coin_reward,
            isPositive: savedHabit.is_positive,
            streak: savedHabit.streak,
          };
          setHabits(prev => [...prev, newHabit]);
        }
      } catch (error) {
        console.error('Erro ao salvar hábito:', error);
      }
    } else {
      const newHabit = { ...habit, id: Math.random().toString(36).substr(2, 9) };
      setHabits(prev => [...prev, newHabit]);
    }
  };

  const addDaily = async (daily: Omit<Daily, 'id'>) => {
    if (user) {
      try {
        const savedDaily = await supabaseData.saveDaily({
          title: daily.title,
          due_time: daily.dueTime,
          difficulty: daily.difficulty,
          streak: daily.streak,
          completed: daily.completed,
        });
        
        if (savedDaily) {
          const newDaily = {
            id: savedDaily.id,
            title: savedDaily.title,
            dueTime: savedDaily.due_time,
            difficulty: savedDaily.difficulty,
            xpReward: savedDaily.xp_reward,
            coinReward: savedDaily.coin_reward,
            streak: savedDaily.streak,
            completed: savedDaily.completed,
          };
          setDailies(prev => [...prev, newDaily]);
        }
      } catch (error) {
        console.error('Erro ao salvar daily:', error);
      }
    } else {
      const newDaily = { ...daily, id: Math.random().toString(36).substr(2, 9) };
      setDailies(prev => [...prev, newDaily]);
    }
  };

  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    if (user) {
      try {
        const savedTodo = await supabaseData.saveTodo({
          title: todo.title,
          due_date: todo.dueDate,
          priority: todo.priority,
          difficulty: todo.difficulty,
          is_overdue: todo.isOverdue,
          completed: todo.completed,
        });
        
        if (savedTodo) {
          const newTodo = {
            id: savedTodo.id,
            title: savedTodo.title,
            dueDate: savedTodo.due_date,
            priority: savedTodo.priority,
            difficulty: savedTodo.difficulty,
            xpReward: savedTodo.xp_reward,
            coinReward: savedTodo.coin_reward,
            isOverdue: savedTodo.is_overdue,
            completed: savedTodo.completed,
          };
          setTodos(prev => [...prev, newTodo]);
        }
      } catch (error) {
        console.error('Erro ao salvar to-do:', error);
      }
    } else {
      const newTodo = { ...todo, id: Math.random().toString(36).substr(2, 9) };
      setTodos(prev => [...prev, newTodo]);
    }
  };

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    if (user) {
      try {
        await supabaseData.saveHabit({
          id,
          title: updates.title,
          difficulty: updates.difficulty,
          is_positive: updates.isPositive,
          streak: updates.streak,
        });
      } catch (error) {
        console.error('Erro ao atualizar hábito:', error);
      }
    }
    
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const updateDaily = async (id: string, updates: Partial<Daily>) => {
    if (user) {
      try {
        await supabaseData.saveDaily({
          id,
          title: updates.title,
          due_time: updates.dueTime,
          difficulty: updates.difficulty,
          streak: updates.streak,
          completed: updates.completed,
        });
      } catch (error) {
        console.error('Erro ao atualizar daily:', error);
      }
    }
    
    setDailies(prev => prev.map(daily => 
      daily.id === id ? { ...daily, ...updates } : daily
    ));
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    if (user) {
      try {
        await supabaseData.saveTodo({
          id,
          title: updates.title,
          due_date: updates.dueDate,
          priority: updates.priority,
          difficulty: updates.difficulty,
          is_overdue: updates.isOverdue,
          completed: updates.completed,
        });
      } catch (error) {
        console.error('Erro ao atualizar to-do:', error);
      }
    }
    
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const completeHabit = async (id: string, positive: boolean) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      if (positive) {
        // Aplicar multiplicador de nível (10% por nível acima de 1)
        const levelMultiplier = 1 + ((gameState.level - 1) * 0.1);
        const adjustedXp = Math.floor(habit.xpReward * levelMultiplier);
        const adjustedCoins = Math.floor(habit.coinReward * levelMultiplier);
        
        const newTotalXp = gameState.totalXp + adjustedXp;
        const newCoins = gameState.coins + adjustedCoins;
        
        // Salvar estado do jogo no banco (o trigger calculará o nível automaticamente)
        if (user) {
          try {
            await supabaseData.saveGameState({
              total_xp: newTotalXp,
              coins: newCoins,
            });
            
            // Recarregar estado do jogo para pegar os valores calculados pelo trigger
            const updatedGameState = await supabaseData.loadGameState();
            if (updatedGameState) {
              setGameState({
                hp: updatedGameState.hp,
                maxHp: updatedGameState.max_hp,
                xp: updatedGameState.xp,
                totalXp: updatedGameState.total_xp,
                maxXp: updatedGameState.max_xp,
                coins: updatedGameState.coins,
                level: updatedGameState.level,
                streak: updatedGameState.streak,
              });
            }
          } catch (error) {
            console.error('Erro ao salvar estado do jogo:', error);
          }
        } else {
          setGameState(prev => ({
            ...prev,
            xp: prev.xp + adjustedXp,
            totalXp: newTotalXp,
            coins: newCoins,
          }));
        }
        
        toast({
          title: `+${adjustedXp} XP, +${adjustedCoins} Moedas!`,
          description: `Multiplicador de nível ${gameState.level}: ${Math.round(levelMultiplier * 100)}%`,
        });
        
        updateHabit(id, { streak: habit.streak + 1 });
      } else {
        updateHabit(id, { streak: 0 });
      }
    }
  };

  const completeDaily = async (id: string) => {
    const daily = dailies.find(d => d.id === id);
    if (daily && !daily.completed) {
      // Aplicar multiplicador de nível (10% por nível acima de 1)
      const levelMultiplier = 1 + ((gameState.level - 1) * 0.1);
      const adjustedXp = Math.floor(daily.xpReward * levelMultiplier);
      const adjustedCoins = Math.floor(daily.coinReward * levelMultiplier);
      
      const newTotalXp = gameState.totalXp + adjustedXp;
      const newCoins = gameState.coins + adjustedCoins;
      
      // Salvar estado do jogo no banco (o trigger calculará o nível automaticamente)
      if (user) {
        try {
          await supabaseData.saveGameState({
            total_xp: newTotalXp,
            coins: newCoins,
          });
          
          // Recarregar estado do jogo para pegar os valores calculados pelo trigger
          const updatedGameState = await supabaseData.loadGameState();
          if (updatedGameState) {
            setGameState({
              hp: updatedGameState.hp,
              maxHp: updatedGameState.max_hp,
              xp: updatedGameState.xp,
              totalXp: updatedGameState.total_xp,
              maxXp: updatedGameState.max_xp,
              coins: updatedGameState.coins,
              level: updatedGameState.level,
              streak: updatedGameState.streak,
            });
          }
        } catch (error) {
          console.error('Erro ao salvar estado do jogo:', error);
        }
      } else {
        setGameState(prev => ({
          ...prev,
          xp: prev.xp + adjustedXp,
          totalXp: newTotalXp,
          coins: newCoins,
        }));
      }
      
      toast({
        title: `+${adjustedXp} XP, +${adjustedCoins} Moedas!`,
        description: `Multiplicador de nível ${gameState.level}: ${Math.round(levelMultiplier * 100)}%`,
      });
      
      updateDaily(id, { completed: true, streak: daily.streak + 1 });
    }
  };

  const completeTodo = async (id: string) => {
    console.log('Tentando completar To-Do com ID:', id);
    const todo = todos.find(t => t.id === id);
    console.log('To-Do encontrado:', todo);
    
    if (todo && !todo.completed) {
      console.log('Aplicando recompensas e removendo To-Do');
      
      // Aplicar multiplicador de nível (10% por nível acima de 1)
      const levelMultiplier = 1 + ((gameState.level - 1) * 0.1);
      const adjustedXp = Math.floor(todo.xpReward * levelMultiplier);
      const adjustedCoins = Math.floor(todo.coinReward * levelMultiplier);
      
      const newTotalXp = gameState.totalXp + adjustedXp;
      const newCoins = gameState.coins + adjustedCoins;
      
      // Salvar estado do jogo e marcar como concluído no banco de dados
      if (user) {
        try {
          // Salvar estado do jogo (o trigger calculará o nível automaticamente)
          await supabaseData.saveGameState({
            total_xp: newTotalXp,
            coins: newCoins,
          });
          
          // Recarregar estado do jogo para pegar os valores calculados pelo trigger
          const updatedGameState = await supabaseData.loadGameState();
          if (updatedGameState) {
            setGameState({
              hp: updatedGameState.hp,
              maxHp: updatedGameState.max_hp,
              xp: updatedGameState.xp,
              totalXp: updatedGameState.total_xp,
              maxXp: updatedGameState.max_xp,
              coins: updatedGameState.coins,
              level: updatedGameState.level,
              streak: updatedGameState.streak,
            });
          }
          
          // Marcar como concluído e remover da lista
          await supabaseData.saveTodo({
            id: todo.id,
            completed: true,
            completed_at: new Date().toISOString(),
          });
          
          // Remover da lista local
          setTodos(prev => prev.filter(t => t.id !== id));
          
          toast({
            title: `+${adjustedXp} XP, +${adjustedCoins} Moedas!`,
            description: `Multiplicador de nível ${gameState.level}: ${Math.round(levelMultiplier * 100)}%`,
          });
          
          console.log('To-Do completado e removido com sucesso');
        } catch (error) {
          console.error('Erro ao completar To-Do:', error);
        }
      } else {
        // Modo offline
        setGameState(prev => ({
          ...prev,
          xp: prev.xp + adjustedXp,
          totalXp: newTotalXp,
          coins: newCoins,
        }));
        
        toast({
          title: `+${adjustedXp} XP, +${adjustedCoins} Moedas!`,
          description: `Multiplicador de nível ${gameState.level}: ${Math.round(levelMultiplier * 100)}%`,
        });
        
        setTodos(prev => prev.filter(t => t.id !== id));
      }
    }
  };

  const deleteHabit = async (id: string) => {
    if (user) {
      try {
        await supabaseData.deleteHabit(id);
      } catch (error) {
        console.error('Erro ao deletar hábito:', error);
      }
    }
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const deleteDaily = async (id: string) => {
    if (user) {
      try {
        await supabaseData.deleteDaily(id);
      } catch (error) {
        console.error('Erro ao deletar daily:', error);
      }
    }
    setDailies(prev => prev.filter(daily => daily.id !== id));
  };

  const deleteTodo = async (id: string) => {
    if (user) {
      try {
        await supabaseData.deleteTodo(id);
      } catch (error) {
        console.error('Erro ao deletar to-do:', error);
      }
    }
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
