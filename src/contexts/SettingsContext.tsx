
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GameSettings, DEFAULT_SETTINGS } from '@/types/settings';

interface SettingsContextType {
  settings: GameSettings;
  updateSetting: <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => void;
  resetSettings: () => void;
  isSettingLocked: (setting: string, level: number, achievements: any[]) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Show feedback for important settings
    if (key === 'hardcoreMode') {
      toast({
        title: value ? "🔥 Modo Hardcore Ativado!" : "Modo Hardcore Desativado",
        description: value ? "Prepare-se para o desafio! Mais riscos, mais recompensas." : "Voltando ao modo normal.",
        className: value ? "bg-red-500/10 border-red-500/50" : "bg-blue-500/10 border-blue-500/50"
      });
    } else if (key === 'vacationMode') {
      toast({
        title: value ? "🏖️ Modo Férias Ativado!" : "Modo Férias Desativado",
        description: value ? "Penalidades pausadas. Aproveite seu descanso!" : "Bem-vindo de volta, aventureiro!",
        className: "bg-green-500/10 border-green-500/50"
      });
    } else if (key === 'notificationsEnabled') {
      toast({
        title: value ? "🔔 Notificações Ativadas" : "🔕 Notificações Desativadas",
        description: value ? "Você receberá alertas sobre suas aventuras." : "Notificações silenciadas.",
        className: "bg-blue-500/10 border-blue-500/50"
      });
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    toast({
      title: "⚙️ Configurações Resetadas",
      description: "Todas as configurações foram restauradas para o padrão.",
      className: "bg-gray-500/10 border-gray-500/50"
    });
  };

  const isSettingLocked = (setting: string, level: number, achievements: any[]) => {
    switch (setting) {
      case 'animatedXpBar':
        const hasXpMaster = achievements.find(a => a.id === 'xp-master')?.unlocked;
        return level < 10 && !hasXpMaster;
      case 'hardcoreMode':
        const hasTransformation = achievements.find(a => a.id === 'transformacao')?.unlocked;
        return level < 15 && !hasTransformation;
      default:
        return false;
    }
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSetting,
      resetSettings,
      isSettingLocked
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
