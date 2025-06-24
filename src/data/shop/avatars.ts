
import { ShopItem } from '@/types/profile';

export const avatarItems: ShopItem[] = [
  // Coleção Temática Brasileira - Avatares
  {
    id: 'avatar-futebol-br',
    name: 'Avatar Futebol BR',
    description: 'Visual com camisa verde-amarela',
    price: 250,
    xpRequired: 900,
    achievementRequired: 'nivel-5',
    category: 'avatar',
    value: '⚽',
    icon: '⚽',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'avatar-indigena',
    name: 'Avatar Indígena',
    description: 'Visual com pintura tribal e acessórios',
    price: 200,
    xpRequired: 700,
    category: 'avatar',
    value: '🪶',
    icon: '🪶',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'avatar-samba',
    name: 'Avatar Samba',
    description: 'Estilo animado com roupa carnavalesca',
    price: 300,
    xpRequired: 1000,
    achievementRequired: 'check-in-diario',
    category: 'avatar',
    value: '💃',
    icon: '💃',
    rarity: 'epic',
    unlocked: false,
    owned: false
  },
  {
    id: 'avatar-praiano',
    name: 'Avatar Praiano',
    description: 'Roupa casual, chinelo e acessórios tropicais',
    price: 150,
    xpRequired: 500,
    category: 'avatar',
    value: '🏄‍♂️',
    icon: '🏄‍♂️',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'avatar-mistico-br',
    name: 'Avatar Místico BR',
    description: 'Visual dourado e verde com aura especial',
    price: 500,
    xpRequired: 2500,
    achievementRequired: 'transformacao',
    category: 'avatar',
    value: '🌟',
    icon: '🌟',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  },
  
  // Itens originais mantidos
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
