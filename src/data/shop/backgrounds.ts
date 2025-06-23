
import { ShopItem } from '@/types/profile';

export const backgroundItems: ShopItem[] = [
  {
    id: 'bg-galaxy',
    name: 'Fundo Galáxia',
    description: 'Fundo com estrelas da galáxia',
    price: 80,
    xpRequired: 800,
    achievementRequired: 'nivel-10',
    category: 'background',
    value: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    icon: '🌌',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  },
  {
    id: 'bg-forest',
    name: 'Fundo Floresta',
    description: 'Fundo natural da floresta',
    price: 45,
    xpRequired: 350,
    category: 'background',
    value: 'bg-gradient-to-br from-green-800 to-green-600',
    icon: '🌲',
    rarity: 'rare',
    unlocked: false,
    owned: false
  }
];
