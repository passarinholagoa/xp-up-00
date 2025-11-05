import { LucideIcon } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'main' | 'side' | 'special';
  progress?: number;
  maxProgress?: number;
  coinReward?: number;
}

export const ACHIEVEMENT_CATEGORIES = {
  main: {
    title: 'Principais',
    color: 'bg-quest-common/20 border-quest-common/50'
  },
  side: {
    title: 'Secundárias',
    color: 'bg-quest-uncommon/20 border-quest-uncommon/50'
  },
  special: {
    title: 'Especiais',
    color: 'bg-quest-legendary/20 border-quest-legendary/50'
  }
};

export const ACHIEVEMENTS: Achievement[] = [
  // Conquistas originais
  {
    id: 'primeira-missao',
    title: 'Primeira Missão',
    description: 'Complete sua primeira Quest',
    icon: '📜',
    rarity: 'common',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'o-despertar',
    title: 'O Despertar',
    description: 'Complete sua primeira Daily',
    icon: '☀️',
    rarity: 'common',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'primeiro-habito',
    title: 'Primeiro Hábito',
    description: 'Crie seu primeiro Hábito',
    icon: '🌱',
    rarity: 'common',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'foco-total',
    title: 'Foco Total',
    description: 'Mantenha uma streak de 7 quests',
    icon: '🎯',
    rarity: 'uncommon',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'mestre-da-organizacao',
    title: 'Mestre da Organização',
    description: 'Crie 15 Quests',
    icon: '🗂️',
    rarity: 'uncommon',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'rotina-perfeita',
    title: 'Rotina Perfeita',
    description: 'Crie 10 Dailies',
    icon: '📅',
    rarity: 'uncommon',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'mente-saudavel',
    title: 'Mente Saudável',
    description: 'Crie 10 Hábitos',
    icon: '🧠',
    rarity: 'uncommon',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'nivel-5',
    title: 'Nível 5',
    description: 'Alcance o nível 5',
    icon: '⭐',
    rarity: 'rare',
    unlocked: false,
    category: 'main',
    coinReward: 75
  },
  {
    id: 'nivel-10',
    title: 'Nível 10',
    description: 'Alcance o nível 10',
    icon: '🌟',
    rarity: 'rare',
    unlocked: false,
    category: 'main',
    coinReward: 100
  },
  {
    id: 'xp-master',
    title: 'XP Master',
    description: 'Ganhe 1000 de XP',
    icon: '⚡',
    rarity: 'rare',
    unlocked: false,
    category: 'side',
    coinReward: 100
  },
  {
    id: 'tarefa-epica',
    title: 'Tarefa Épica',
    description: 'Complete uma Quest de dificuldade Hard',
    icon: '⚔️',
    rarity: 'epic',
    unlocked: false,
    category: 'side',
    coinReward: 150
  },
  {
    id: 'transformacao',
    title: 'Transformação',
    description: 'Uma mudança profunda aconteceu em você',
    icon: '🔥',
    rarity: 'legendary',
    unlocked: false,
    category: 'special',
    coinReward: 500
  },
  
  // 5 NOVAS CONQUISTAS PRINCIPAIS
  {
    id: 'nivel-15',
    title: 'Nível 15',
    description: 'Alcance o nível 15',
    icon: '💫',
    rarity: 'rare',
    unlocked: false,
    category: 'main',
    coinReward: 150
  },
  {
    id: 'nivel-20',
    title: 'Nível 20',
    description: 'Alcance o nível 20',
    icon: '🌠',
    rarity: 'epic',
    unlocked: false,
    category: 'main',
    coinReward: 200
  },
  {
    id: 'primeira-semana',
    title: 'Primeira Semana',
    description: 'Complete 7 quests consecutivas de atividades',
    icon: '📆',
    rarity: 'uncommon',
    unlocked: false,
    category: 'main',
    coinReward: 50
  },
  {
    id: 'primeiro-mes',
    title: 'Primeiro Mês',
    description: 'Complete 30 quests de jornada',
    icon: '🗓️',
    rarity: 'rare',
    unlocked: false,
    category: 'main',
    coinReward: 100
  },
  {
    id: 'milionario-xp',
    title: 'Milionário de XP',
    description: 'Acumule 10.000 de XP total',
    icon: '💰',
    rarity: 'epic',
    unlocked: false,
    category: 'main',
    coinReward: 250
  },

  // 5 NOVAS CONQUISTAS SECUNDÁRIAS
  {
    id: 'colecionador-moedas',
    title: 'Colecionador de Moedas',
    description: 'Acumule 1000 moedas',
    icon: '🪙',
    rarity: 'uncommon',
    unlocked: false,
    category: 'side',
    coinReward: 50
  },
  {
    id: 'maratonista',
    title: 'Maratonista',
    description: 'Mantenha uma streak de 30 quests',
    icon: '🏃‍♂️',
    rarity: 'rare',
    unlocked: false,
    category: 'side',
    coinReward: 100
  },
  {
    id: 'perfeccionista',
    title: 'Perfeccionista',
    description: 'Complete todas as Dailies por 7 dias seguidos',
    icon: '✨',
    rarity: 'rare',
    unlocked: false,
    category: 'side',
    coinReward: 100
  },
  {
    id: 'organizador-supremo',
    title: 'Organizador Supremo',
    description: 'Crie 50 Quests',
    icon: '📋',
    rarity: 'epic',
    unlocked: false,
    category: 'side',
    coinReward: 200
  },
  {
    id: 'guru-dos-habitos',
    title: 'Guru dos Hábitos',
    description: 'Mantenha 5 hábitos positivos ativos simultaneamente',
    icon: '🧘‍♂️',
    rarity: 'rare',
    unlocked: false,
    category: 'side',
    coinReward: 100
  },

  // 3 NOVAS CONQUISTAS ESPECIAIS
  {
    id: 'phoenix',
    title: 'Phoenix',
    description: 'Ressurgiu das cinzas após perder toda a vida',
    icon: '🔥',
    rarity: 'legendary',
    unlocked: false,
    category: 'special',
    coinReward: 300
  },
  {
    id: 'lenda-viva',
    title: 'Lenda Viva',
    description: 'Alcance o nível 50 - poucos chegaram até aqui',
    icon: '👑',
    rarity: 'legendary',
    unlocked: false,
    category: 'special',
    coinReward: 500
  },
  {
    id: 'mestre-da-disciplina',
    title: 'Mestre da Disciplina',
    description: 'Mantenha uma streak de 100 quests',
    icon: '🏆',
    rarity: 'legendary',
    unlocked: false,
    category: 'special',
    coinReward: 400
  },

  // 10 NOVAS CONQUISTAS ADICIONADAS
  
  // 3 FÁCEIS
  {
    id: 'iniciante-dedicado',
    title: 'Iniciante Dedicado',
    description: 'Complete 5 quests',
    icon: '🎓',
    rarity: 'common',
    unlocked: false,
    category: 'main',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'primeiro-comprador',
    title: 'Primeiro Comprador',
    description: 'Compre seu primeiro item na loja',
    icon: '🛒',
    rarity: 'common',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'consistencia-basica',
    title: 'Consistência Básica',
    description: 'Complete 3 dailies consecutivas',
    icon: '📖',
    rarity: 'uncommon',
    unlocked: false,
    category: 'main',
    progress: 0,
    maxProgress: 3
  },

  // 3 MÉDIAS
  {
    id: 'disciplinado',
    title: 'Disciplinado',
    description: 'Complete 20 quests no total',
    icon: '🎖️',
    rarity: 'rare',
    unlocked: false,
    category: 'main',
    progress: 0,
    maxProgress: 20,
    coinReward: 75
  },
  {
    id: 'rico',
    title: 'Rico',
    description: 'Acumule 500 moedas',
    icon: '💎',
    rarity: 'rare',
    unlocked: false,
    category: 'side',
    progress: 0,
    maxProgress: 500,
    coinReward: 100
  },
  {
    id: 'habitos-solidos',
    title: 'Hábitos Sólidos',
    description: 'Mantenha 3 hábitos com streak de 7 dias cada',
    icon: '💪',
    rarity: 'rare',
    unlocked: false,
    category: 'side',
    progress: 0,
    maxProgress: 3,
    coinReward: 75
  },

  // 4 DIFÍCEIS
  {
    id: 'guerreiro-incansavel',
    title: 'Guerreiro Incansável',
    description: 'Complete 100 quests no total',
    icon: '⚔️',
    rarity: 'epic',
    unlocked: false,
    category: 'main',
    progress: 0,
    maxProgress: 100,
    coinReward: 250
  },
  {
    id: 'mestre-do-tempo',
    title: 'Mestre do Tempo',
    description: 'Complete 50 dailies',
    icon: '⏰',
    rarity: 'epic',
    unlocked: false,
    category: 'side',
    progress: 0,
    maxProgress: 50,
    coinReward: 200
  },
  {
    id: 'imperador-moedas',
    title: 'Imperador das Moedas',
    description: 'Acumule 5000 moedas',
    icon: '👑',
    rarity: 'epic',
    unlocked: false,
    category: 'side',
    progress: 0,
    maxProgress: 5000,
    coinReward: 500
  },
  {
    id: 'imortal',
    title: 'Imortal',
    description: 'Alcance o nível 30 sem perder toda a vida',
    icon: '🛡️',
    rarity: 'legendary',
    unlocked: false,
    category: 'special',
    coinReward: 400
  }
];
