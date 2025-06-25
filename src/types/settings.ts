
export interface XpUpSettings {
  // Personalização Visual
  darkMode: boolean;
  animatedXpBar: boolean;
  showProfileFrame: boolean;
  showProfileBackground: boolean;
  
  // Notificações Globais
  globalNotifications: boolean;
  
  // Funcionalidades Gamificadas
  hardcoreMode: boolean;
  vacationMode: boolean;
}

export const DEFAULT_SETTINGS: XpUpSettings = {
  darkMode: true,
  animatedXpBar: false, // Travado até nível 10
  showProfileFrame: true,
  showProfileBackground: true,
  globalNotifications: true,
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
    showProfileFrame: { isLocked: false, reason: '' },
    showProfileBackground: { isLocked: false, reason: '' },
    globalNotifications: { isLocked: false, reason: '' },
    hardcoreMode: { 
      isLocked: level < 15 && !hasTransformacao, 
      requiredLevel: 15,
      requiredAchievement: 'transformacao',
      reason: 'Desbloqueie no Nível 15 ou com a conquista "Transformação"'
    },
    vacationMode: { isLocked: false, reason: '' }
  };
};
