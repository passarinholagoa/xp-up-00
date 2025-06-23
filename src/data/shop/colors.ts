
import { ShopItem } from '@/types/profile';

export const colorItems: ShopItem[] = [
  {
    id: 'color-rainbow',
    name: 'Nome Arco-íris',
    description: 'Seu nome com todas as cores',
    price: 40,
    xpRequired: 300,
    category: 'color',
    value: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent',
    icon: '🌈',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'color-fire',
    name: 'Nome de Fogo',
    description: 'Nome com gradiente ardente',
    price: 30,
    xpRequired: 200,
    category: 'color',
    value: 'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent',
    icon: '🔥',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'color-electric',
    name: 'Nome Elétrico',
    description: 'Nome com energia elétrica',
    price: 35,
    xpRequired: 250,
    achievementRequired: 'o-despertar',
    category: 'color',
    value: 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent',
    icon: '⚡',
    rarity: 'rare',
    unlocked: false,
    owned: false
  }
];
