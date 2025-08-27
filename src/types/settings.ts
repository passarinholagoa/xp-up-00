
export interface Settings {
  globalNotifications: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  hardcoreMode: boolean;
  vacationMode: boolean;
  animatedXpBar: boolean;
}

export interface XpUpSettings {
  // Personalização Visual
  darkMode: boolean;
  animatedXpBar: boolean;
  
  // Notificações Globais
  globalNotifications: boolean;
  dailyReminder: boolean;
  reminderTime: string;
  
  // Funcionalidades Gamificadas
  hardcoreMode: boolean;
  vacationMode: boolean;
}

export const DEFAULT_SETTINGS: XpUpSettings = {
  darkMode: true,
  animatedXpBar: false, // Travado até nível 10
  globalNotifications: true,
  dailyReminder: true,
  reminderTime: '09:00',
  hardcoreMode: false, // Travado até nível 15
  vacationMode: false
};

export interface SettingsLock {
  isLocked: boolean;
  requiredLevel?: number;
  requiredAchievement?: string;
  reason: string;
}

export const getSettingsLocks = (level: number, achievements: any[]): Record<keyof XpUpSettings, SettingsLock> => {
  const hasXpMaster = achievements.find(a => a.id === 'xp-master')?.unlocked || false;
  const hasTransformacao = achievements.find(a => a.id === 'transformacao')?.unlocked || false;

  return {
    darkMode: { isLocked: false, reason: '' },
    animatedXpBar: { 
      isLocked: level < 10 && !hasXpMaster, 
      requiredLevel: 10,
      requiredAchievement: 'xp-master',
      reason: 'Desbloqueie no Nível 10 ou com a conquista "XP Master"'
    },
    globalNotifications: { isLocked: false, reason: '' },
    dailyReminder: { isLocked: false, reason: '' },
    reminderTime: { isLocked: false, reason: '' },
    hardcoreMode: { 
      isLocked: level < 15 && !hasTransformacao, 
      requiredLevel: 15,
      requiredAchievement: 'transformacao',
      reason: 'Desbloqueie no Nível 15 ou com a conquista "Transformação"'
    },
    vacationMode: { isLocked: false, reason: '' }
  };
};
