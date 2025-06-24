
import { ShopItem } from '@/types/profile';

export const backgroundItems: ShopItem[] = [
  // Coleção Temática Brasileira - Fundos
  {
    id: 'bg-floresta-amazonica',
    name: 'Fundo Floresta Amazônica',
    description: 'Verde denso com folhas e névoa',
    price: 200,
    xpRequired: 600,
    category: 'background',
    value: 'bg-gradient-to-br from-green-900 via-green-700 to-emerald-800',
    icon: '🌳',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'bg-praia-brasileira',
    name: 'Fundo Praia Brasileira',
    description: 'Areia e mar ao fundo',
    price: 150,
    xpRequired: 400,
    category: 'background',
    value: 'bg-gradient-to-br from-blue-400 via-cyan-300 to-yellow-200',
    icon: '🏖️',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'bg-carnaval',
    name: 'Fundo Carnaval',
    description: 'Confetes, luzes e serpentinas',
    price: 250,
    xpRequired: 900,
    achievementRequired: 'primeira-missao',
    category: 'background',
    value: 'bg-gradient-to-br from-pink-500 via-yellow-400 via-purple-500 to-red-500',
    icon: '🎊',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'bg-sertao',
    name: 'Fundo Sertão',
    description: 'Paisagem árida com cactos e céu alaranjado',
    price: 150,
    xpRequired: 500,
    category: 'background',
    value: 'bg-gradient-to-br from-orange-600 via-yellow-600 to-red-500',
    icon: '🌄',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'bg-skyline-sp-rj',
    name: 'Fundo Skyline SP/RJ',
    description: 'Silhueta urbana noturna com brilho neon',
    price: 300,
    xpRequired: 1200,
    achievementRequired: 'mestre-checklist',
    category: 'background',
    value: 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900',
    icon: '🏙️',
    rarity: 'epic',
    unlocked: false,
    owned: false
  },
  
  // Itens originais mantidos
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
