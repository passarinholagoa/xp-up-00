
import { ShopItem } from '@/types/profile';

export const avatarItems: ShopItem[] = [
  {
    id: 'avatar-knight',
    name: 'Avatar Cavaleiro',
    description: 'Avatar de um nobre cavaleiro',
    price: 100,
    xpRequired: 1200,
    achievementRequired: 'nivel-10',
    category: 'avatar',
    value: '⚔️',
    icon: '⚔️',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  },
  {
    id: 'avatar-wizard',
    name: 'Avatar Mago',
    description: 'Avatar de um poderoso mago',
    price: 90,
    xpRequired: 600,
    achievementRequired: 'nivel-5',
    category: 'avatar',
    value: '🧙‍♂️',
    icon: '🧙‍♂️',
    rarity: 'epic',
    unlocked: false,
    owned: false
  },
  {
    id: 'avatar-dragon',
    name: 'Avatar Dragão',
    description: 'Avatar de dragão lendário',
    price: 150,
    xpRequired: 1500,
    achievementRequired: 'xp-master',
    category: 'avatar',
    value: '🐉',
    icon: '🐉',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  }
];
