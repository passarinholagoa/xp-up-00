
import { ShopItem } from '@/types/profile';

export const frameItems: ShopItem[] = [
  // Coleção Temática Brasileira - Molduras
  {
    id: 'frame-amazonia',
    name: 'Moldura Amazônia',
    description: 'Verde vibrante com detalhes de folhas',
    price: 150,
    xpRequired: 500,
    category: 'frame',
    value: 'border-4 border-green-500 shadow-lg shadow-green-500/50 bg-gradient-to-r from-green-600/20 to-emerald-600/20',
    icon: '🌿',
    rarity: 'rare',
    unlocked: false,
    owned: false
  },
  {
    id: 'frame-carnaval',
    name: 'Moldura Carnaval',
    description: 'Estilo colorido com brilhos e confetes',
    price: 200,
    xpRequired: 800,
    achievementRequired: 'foco-total',
    category: 'frame',
    value: 'border-4 border-yellow-400 shadow-lg shadow-yellow-400/50 bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-purple-500/20 animate-pulse',
    icon: '🎉',
    rarity: 'epic',
    unlocked: false,
    owned: false
  },
  {
    id: 'frame-sertao',
    name: 'Moldura Sertão',
    description: 'Tons terrosos e cactos nas laterais',
    price: 100,
    xpRequired: 300,
    category: 'frame',
    value: 'border-4 border-orange-600 shadow-lg shadow-orange-600/50 bg-gradient-to-r from-orange-700/20 to-yellow-700/20',
    icon: '🌵',
    rarity: 'common',
    unlocked: false,
    owned: false
  },
  {
    id: 'frame-favela-style',
    name: 'Moldura Favela Style',
    description: 'Grafite urbano com detalhes modernos',
    price: 250,
    xpRequired: 1000,
    achievementRequired: 'maratona-todos',
    category: 'frame',
    value: 'border-4 border-gray-400 shadow-lg shadow-gray-400/50 bg-gradient-to-r from-gray-700/20 via-blue-600/20 to-purple-600/20',
    icon: '🎨',
    rarity: 'epic',
    unlocked: false,
    owned: false
  },
  {
    id: 'frame-selecao-br',
    name: 'Moldura Seleção BR',
    description: 'Verde e amarelo vibrantes com estrela dourada',
    price: 300,
    xpRequired: 1500,
    achievementRequired: 'xp-master',
    category: 'frame',
    value: 'border-4 border-yellow-400 shadow-lg shadow-yellow-400/50 bg-gradient-to-r from-green-500/30 to-yellow-500/30 animate-pulse',
    icon: '⭐',
    rarity: 'legendary',
    unlocked: false,
    owned: false
  },
  
  // Itens originais mantidos
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
