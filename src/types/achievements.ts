
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
];
