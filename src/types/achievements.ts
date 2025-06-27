
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
    description: 'Mantenha uma streak de 7 dias',
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
    category: 'main'
  },
  {
    id: 'nivel-10',
    title: 'Nível 10',
    description: 'Alcance o nível 10',
    icon: '🌟',
    rarity: 'rare',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'xp-master',
    title: 'XP Master',
    description: 'Ganhe 1000 de XP',
    icon: '⚡',
    rarity: 'rare',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'tarefa-epica',
    title: 'Tarefa Épica',
    description: 'Complete uma Quest de dificuldade Hard',
    icon: '⚔️',
    rarity: 'epic',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'transformacao',
    title: 'Transformação',
    description: 'Uma mudança profunda aconteceu em você',
    icon: '🔥',
    rarity: 'legendary',
    unlocked: false,
    category: 'special'
  },
  
  // 5 NOVAS CONQUISTAS PRINCIPAIS
  {
    id: 'nivel-15',
    title: 'Nível 15',
    description: 'Alcance o nível 15',
    icon: '💫',
    rarity: 'rare',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'nivel-20',
    title: 'Nível 20',
    description: 'Alcance o nível 20',
    icon: '🌠',
    rarity: 'epic',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'primeira-semana',
    title: 'Primeira Semana',
    description: 'Complete 7 dias consecutivos de atividades',
    icon: '📆',
    rarity: 'uncommon',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'primeiro-mes',
    title: 'Primeiro Mês',
    description: 'Complete 30 dias de jornada',
    icon: '🗓️',
    rarity: 'rare',
    unlocked: false,
    category: 'main'
  },
  {
    id: 'milionario-xp',
    title: 'Milionário de XP',
    description: 'Acumule 10.000 de XP total',
    icon: '💰',
    rarity: 'epic',
    unlocked: false,
    category: 'main'
  },

  // 5 NOVAS CONQUISTAS SECUNDÁRIAS
  {
    id: 'colecionador-moedas',
    title: 'Colecionador de Moedas',
    description: 'Acumule 1000 moedas',
    icon: '🪙',
    rarity: 'uncommon',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'maratonista',
    title: 'Maratonista',
    description: 'Mantenha uma streak de 30 dias',
    icon: '🏃‍♂️',
    rarity: 'rare',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'perfeccionista',
    title: 'Perfeccionista',
    description: 'Complete todas as Dailies por 7 dias seguidos',
    icon: '✨',
    rarity: 'rare',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'organizador-supremo',
    title: 'Organizador Supremo',
    description: 'Crie 50 Quests',
    icon: '📋',
    rarity: 'epic',
    unlocked: false,
    category: 'side'
  },
  {
    id: 'guru-dos-habitos',
    title: 'Guru dos Hábitos',
    description: 'Mantenha 5 hábitos positivos ativos simultaneamente',
    icon: '🧘‍♂️',
    rarity: 'rare',
    unlocked: false,
    category: 'side'
  },

  // 3 NOVAS CONQUISTAS ESPECIAIS
  {
    id: 'phoenix',
    title: 'Phoenix',
    description: 'Ressurgiu das cinzas após perder toda a vida',
    icon: '🔥',
    rarity: 'legendary',
    unlocked: false,
    category: 'special'
  },
  {
    id: 'lenda-viva',
    title: 'Lenda Viva',
    description: 'Alcance o nível 50 - poucos chegaram até aqui',
    icon: '👑',
    rarity: 'legendary',
    unlocked: false,
    category: 'special'
  },
  {
    id: 'mestre-da-disciplina',
    title: 'Mestre da Disciplina',
    description: 'Mantenha uma streak de 100 dias',
    icon: '🏆',
    rarity: 'legendary',
    unlocked: false,
    category: 'special'
  }
];
