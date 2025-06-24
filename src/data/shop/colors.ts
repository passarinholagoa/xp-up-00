
import { ShopItem } from '@/types/profile';

export const colorItems: ShopItem[] = [
  // Coleção Temática Brasileira - Estilos de Nome
  {
    id: 'color-verde-amarelo',
    name: 'Nome Verde-Amarelo',
    description: 'Nome em degradê verde e amarelo',
    price: 100,
    xpRequired: 400,
    category: 'color',
    value: 'bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent',
    icon: '🇧🇷',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'color-neon-carnaval',
    name: 'Nome Neon Carnaval',
    description: 'Brilho neon estilo festas brasileiras',
    price: 250,
    xpRequired: 900,
    achievementRequired: 'tres-seguidos',
    category: 'color',
    value: 'bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-pulse',
    icon: '✨',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'color-tribal-indigena',
    name: 'Nome Tribal Indígena',
    description: 'Estilo geométrico com traços indígenas',
    price: 200,
    xpRequired: 600,
    category: 'color',
    value: 'bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent',
    icon: '🪶',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'color-praiano',
    name: 'Nome Praiano',
    description: 'Azul degradê lembrando o mar',
    price: 150,
    xpRequired: 500,
    category: 'color',
    value: 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent',
    icon: '🌊',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'color-br-supremo',
    name: 'Nome BR Supremo',
    description: 'Verde dourado com brilho especial',
    price: 400,
    xpRequired: 2000,
    achievementRequired: 'xp-relampago',
    category: 'color',
    value: 'bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-pulse',
    icon: '👑',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  },
  
  // Itens originais mantidos
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
