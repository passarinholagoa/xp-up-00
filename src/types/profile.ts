
export interface ProfileCustomization {
  displayName: string;
  avatar: string;
  frameBorder: string;
  nameColor: string;
  backgroundColor: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  xpRequired?: number;
  achievementRequired?: string;
  category: 'frame' | 'color' | 'background' | 'avatar';
  value: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  owned: boolean;
}

export const SHOP_ITEMS: ShopItem[] = [
  // Frames
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
  },

  // Name Colors
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
  },

  // Backgrounds
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
  },

  // Avatars
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

export const RARITY_COLORS = {
  common: 'border-gray-400 bg-gray-400/10',
  rare: 'border-blue-400 bg-blue-400/10',
  epic: 'border-purple-400 bg-purple-400/10',
  legendary: 'border-yellow-400 bg-yellow-400/10'
} as const;
