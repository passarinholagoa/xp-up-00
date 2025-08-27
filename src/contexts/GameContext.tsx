import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { ProfileCustomization, ShopItem, SHOP_ITEMS } from '@/types/profile';
import { Achievement } from '@/types/achievements';
import { Settings } from '@/types/settings';

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
  settings: Settings;
  achievements: Achievement[];
  shopItems: ShopItem[];
  updateProfile: (newProfile: ProfileCustomization) => void;
  updateSettings: (newSettings: Settings) => void;
  buyShopItem: (itemId: string) => void;
  openProfile: () => void;
  openSettings: () => void;
  openAchievements: () => void;
  isProfileModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isAchievementsModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsSettingsModalOpen: (open: boolean) => void;
  setIsAchievementsModalOpen: (open: boolean) => void;
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
    displayName: 'Carregando...',
    avatar: '👤',
    frameBorder: 'border-2 border-primary/50',
    nameColor: 'text-foreground',
    backgroundColor: 'bg-card',
  });

  const [settings, setSettings] = useState<Settings>({
    globalNotifications: true,
    dailyReminder: true,
    reminderTime: '09:00',
    hardcoreMode: false,
    vacationMode: false,
    animatedXpBar: true,
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);

  // Carregar dados do usuário quando ele fizer login
  useEffect(() => {
    if (!user) {
      // Reset para valores padrão quando não há usuário logado
      setProfile({
        displayName: 'Aventureiro',
        avatar: '👤',
        frameBorder: 'border-2 border-primary/50',
        nameColor: 'text-foreground',
        backgroundColor: 'bg-card',
      });
      return;
    }

    const loadUserData = async () => {
      console.log('Carregando dados do usuário:', user.id);
      
      try {
        // Carregar perfil
        const profileData = await supabaseData.loadProfile();
        console.log('Dados do perfil carregados:', profileData);
        
        if (profileData) {
          setProfile({
            displayName: profileData.display_name || 'Carlos', // Garantir que use Carlos como fallback
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
            globalNotifications: settingsData.global_notifications,
            dailyReminder: settingsData.daily_reminder,
            reminderTime: settingsData.reminder_time,
            hardcoreMode: settingsData.hardcore_mode,
            vacationMode: settingsData.vacation_mode,
            animatedXpBar: settingsData.animated_xp_bar,
          });
        }

      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Em caso de erro, garantir que o nome seja Carlos
        setProfile(prev => ({ ...prev, displayName: 'Carlos' }));
      }
    };

    loadUserData();
  }, [user, supabaseData]);

  const updateProfile = async (newProfile: ProfileCustomization) => {
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
  };

  const updateSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
    
    if (user) {
      try {
        await supabaseData.saveSettings({
          global_notifications: newSettings.globalNotifications,
          daily_reminder: newSettings.dailyReminder,
          reminder_time: newSettings.reminderTime,
          hardcore_mode: newSettings.hardcoreMode,
          vacation_mode: newSettings.vacationMode,
          animated_xp_bar: newSettings.animatedXpBar,
        });
      } catch (error) {
        console.error('Erro ao salvar configurações:', error);
      }
    }
  };

  const buyShopItem = (itemId: string) => {
    setShopItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, owned: true }
        : item
    ));
  };

  const openProfile = () => setIsProfileModalOpen(true);
  const openSettings = () => setIsSettingsModalOpen(true);
  const openAchievements = () => setIsAchievementsModalOpen(true);

  const value: GameContextType = {
    gameState,
    profile,
    settings,
    achievements,
    shopItems,
    updateProfile,
    updateSettings,
    buyShopItem,
    openProfile,
    openSettings,
    openAchievements,
    isProfileModalOpen,
    isSettingsModalOpen,
    isAchievementsModalOpen,
    setIsProfileModalOpen,
    setIsSettingsModalOpen,
    setIsAchievementsModalOpen,
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
