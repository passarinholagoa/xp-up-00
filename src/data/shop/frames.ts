
import { ShopItem } from '@/types/profile';

export const frameItems: ShopItem[] = [
  {
    id: 'frame-gold',
    name: 'Moldura Dourada',
    description: 'Moldura elegante em ouro',
    price: 50,
    xpRequired: 500,
    category: 'frame',
    value: 'border-4 border-yellow-400 shadow-lg shadow-yellow-400/50',
    icon: '🏆',
    rarity: 'epic',
    unlocked: false,
    owned: false
  },
  {
    id: 'frame-fire',
    name: 'Moldura de Fogo',
    description: 'Moldura ardente para verdadeiros guerreiros',
    price: 75,
    xpRequired: 1000,
    achievementRequired: 'tarefa-epica',
    category: 'frame',
    value: 'border-4 border-red-500 shadow-lg shadow-red-500/50 animate-pulse',
    icon: '🔥',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  },
  {
    id: 'frame-ice',
    name: 'Moldura Gelada',
    description: 'Moldura cristalina de gelo',
    price: 60,
    xpRequired: 400,
    category: 'frame',
    value: 'border-4 border-cyan-400 shadow-lg shadow-cyan-400/50',
    icon: '❄️',
    rarity: 'epic',
    unlocked: false,
    owned: false
  }
];
