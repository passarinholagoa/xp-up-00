
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'primeira-vez' | 'consistencia' | 'esforco' | 'nivel-xp' | 'habitos';
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export const ACHIEVEMENT_CATEGORIES = {
  'primeira-vez': {
    title: '🏁 Conquistas de Primeira Vez',
    color: 'bg-green-500/20 border-green-500/50'
  },
  'consistencia': {
    title: '🔁 Conquistas de Consistência',
    color: 'bg-blue-500/20 border-blue-500/50'
  },
  'esforco': {
    title: '💪 Conquistas de Esforço',
    color: 'bg-red-500/20 border-red-500/50'
  },
  'nivel-xp': {
    title: '🌟 Conquistas de Nível e XP',
    color: 'bg-quest-legendary/20 border-quest-legendary/50'
  },
  'habitos': {
    title: '🧠 Conquistas de Hábitos',
    color: 'bg-purple-500/20 border-purple-500/50'
  }
} as const;

export const ACHIEVEMENTS: Achievement[] = [
  // 🏁 Conquistas de Primeira Vez
  {
    id: 'primeira-missao',
    title: 'Primeira Missão',
    description: 'Conclua sua primeira tarefa.',
    category: 'primeira-vez',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'check-in-diario',
    title: 'Check-In Diário',
    description: 'Entre no app por 3 dias seguidos.',
    category: 'primeira-vez',
    icon: '📅',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'o-despertar',
    title: 'O Despertar',
    description: 'Complete sua primeira tarefa diária.',
    category: 'primeira-vez',
    icon: '🌅',
    unlocked: false
  },
  {
    id: 'primeiro-habito',
    title: 'Primeiro Hábito',
    description: 'Registre seu primeiro hábito.',
    category: 'primeira-vez',
    icon: '⚡',
    unlocked: false
  },

  // 🔁 Conquistas de Consistência
  {
    id: 'tres-seguidos',
    title: 'Três Seguidos',
    description: 'Complete 3 dias seguidos de Dailies.',
    category: 'consistencia',
    icon: '🔄',
    unlocked: false,
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'sem-falhar',
    title: 'Sem Falhar',
    description: '7 dias seguidos sem perder nenhuma tarefa.',
    category: 'consistencia',
    icon: '🛡️',
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'foco-total',
    title: 'Foco Total',
    description: 'Mantenha streak de 10 tarefas diárias.',
    category: 'consistencia',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'mestre-checklist',
    title: 'Mestre do Checklist',
    description: 'Complete 20 checklists inteiros.',
    category: 'consistencia',
    icon: '📋',
    unlocked: false,
    progress: 0,
    maxProgress: 20
  },

  // 💪 Conquistas de Esforço
  {
    id: 'tarefa-epica',
    title: 'Tarefa Épica',
    description: 'Conclua uma tarefa de dificuldade máxima.',
    category: 'esforco',
    icon: '⚔️',
    unlocked: false
  },
  {
    id: 'maratona-todos',
    title: 'Maratona de To-Dos',
    description: 'Complete 15 To-Dos em um só dia.',
    category: 'esforco',
    icon: '🏃‍♂️',
    unlocked: false,
    progress: 0,
    maxProgress: 15
  },
  {
    id: 'limpeza-total',
    title: 'Limpeza Total',
    description: 'Zere todas as suas tarefas pendentes.',
    category: 'esforco',
    icon: '🧹',
    unlocked: false
  },
  {
    id: 'modo-turbo',
    title: 'Modo Turbo',
    description: 'Complete uma tarefa nos primeiros 10 minutos após criá-la.',
    category: 'esforco',
    icon: '💨',
    unlocked: false
  },

  // 🌟 Conquistas de Nível e XP
  {
    id: 'nivel-5',
    title: 'Nível 5',
    description: 'Suba ao nível 5.',
    category: 'nivel-xp',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'nivel-10',
    title: 'Nível 10',
    description: 'Suba ao nível 10.',
    category: 'nivel-xp',
    icon: '🌟',
    unlocked: false
  },
  {
    id: 'xp-master',
    title: 'XP Master',
    description: 'Ganhe mais de 1.000 XP acumulados.',
    category: 'nivel-xp',
    icon: '💎',
    unlocked: false
  },
  {
    id: 'xp-relampago',
    title: 'XP Relâmpago',
    description: 'Ganhe 200 XP em 1 dia.',
    category: 'nivel-xp',
    icon: '⚡',
    unlocked: false
  },

  // 🧠 Conquistas de Hábitos
  {
    id: 'rotina-formada',
    title: 'Rotina Formada',
    description: 'Execute um hábito positivo por 7 dias seguidos.',
    category: 'habitos',
    icon: '🧠',
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'resistencia-heroica',
    title: 'Resistência Heróica',
    description: 'Marque um hábito negativo como evitado 10 vezes.',
    category: 'habitos',
    icon: '🦸‍♂️',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'equilibrio',
    title: 'Equilíbrio',
    description: 'Tenha pelo menos 1 hábito positivo e 1 negativo ativos.',
    category: 'habitos',
    icon: '⚖️',
    unlocked: false
  },
  {
    id: 'transformacao',
    title: 'Transformação',
    description: 'Edite um hábito negativo para torná-lo positivo.',
    category: 'habitos',
    icon: '🔄',
    unlocked: false
  }
];
