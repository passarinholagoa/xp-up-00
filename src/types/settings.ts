
export interface XpUpSettings {
  // Visual Settings
  darkMode: boolean;
  animatedXpBar: boolean;
  
  // Game Settings
  hardcoreMode: boolean;
  vacationMode: boolean;
  
  // Notification Settings
  globalNotifications: boolean;
  levelUpNotifications: boolean;
  taskCompletionNotifications: boolean;
  achievementNotifications: boolean;
  
  // Privacy Settings
  profileVisibility: 'public' | 'friends' | 'private';
  showStats: boolean;
  showAchievements: boolean;
}

export const DEFAULT_SETTINGS: XpUpSettings = {
  // Visual Settings
  darkMode: false,
  animatedXpBar: true,
  
  // Game Settings  
  hardcoreMode: false,
  vacationMode: false,
  
  // Notification Settings
  globalNotifications: true,
  levelUpNotifications: true,
  taskCompletionNotifications: true,
  achievementNotifications: true,
  
  // Privacy Settings
  profileVisibility: 'public',
  showStats: true,
  showAchievements: true,
};

export const SETTINGS_DESCRIPTIONS = {
  // Visual Settings
  darkMode: {
    title: 'Modo Escuro',
    description: 'Ativa o tema escuro da interface'
  },
  animatedXpBar: {
    title: 'Nível Animado',
    description: 'Ativa animação colorida no número do nível do personagem'
  },
  
  // Game Settings
  hardcoreMode: {
    title: 'Modo Hardcore',
    description: 'Aumenta recompensas em 50% e penalidades em 50%'
  },
  vacationMode: {
    title: 'Modo Férias',
    description: 'Protege contra penalidades de hábitos negativos'
  },
  
  // Notification Settings
  globalNotifications: {
    title: 'Notificações Globais',
    description: 'Ativa/desativa todas as notificações do sistema'
  },
  levelUpNotifications: {
    title: 'Notificações de Level Up',
    description: 'Mostra notificação ao subir de nível'
  },
  taskCompletionNotifications: {
    title: 'Notificações de Tarefas',
    description: 'Mostra notificação ao completar tarefas'
  },
  achievementNotifications: {
    title: 'Notificações de Conquistas',
    description: 'Mostra notificação ao desbloquear conquistas'
  },
  
  // Privacy Settings
  profileVisibility: {
    title: 'Visibilidade do Perfil',
    description: 'Define quem pode ver seu perfil'
  },
  showStats: {
    title: 'Mostrar Estatísticas',
    description: 'Permite que outros vejam suas estatísticas'
  },
  showAchievements: {
    title: 'Mostrar Conquistas',
    description: 'Permite que outros vejam suas conquistas'
  },
};
