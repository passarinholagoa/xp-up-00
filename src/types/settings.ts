
export interface GameSettings {
  // Visual Customization
  darkMode: boolean;
  animatedXpBar: boolean;
  showProfileFrame: boolean;
  showProfileBackground: boolean;
  
  // Global Notifications
  notificationsEnabled: boolean;
  
  // Gamified Features
  hardcoreMode: boolean;
  vacationMode: boolean;
  vacationEndDate?: Date;
}

export interface SettingsCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const DEFAULT_SETTINGS: GameSettings = {
  darkMode: true,
  animatedXpBar: false,
  showProfileFrame: true,
  showProfileBackground: true,
  notificationsEnabled: true,
  hardcoreMode: false,
  vacationMode: false,
};

export const SETTINGS_CATEGORIES: SettingsCategory[] = [
  {
    id: 'visual',
    title: 'Personalização Visual',
    icon: '🎨',
    description: 'Customize a aparência do seu perfil'
  },
  {
    id: 'notifications',
    title: 'Notificações Globais',
    icon: '📲',
    description: 'Controle suas notificações'
  },
  {
    id: 'gamified',
    title: 'Funcionalidades Gamificadas',
    icon: '🏆',
    description: 'Modos especiais de jogo'
  }
];
