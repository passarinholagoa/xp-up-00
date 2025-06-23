
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

// Re-export from organized shop data
export { SHOP_ITEMS } from '@/data/shop';

export const RARITY_COLORS = {
  common: 'border-gray-400 bg-gray-400/10',
  rare: 'border-blue-400 bg-blue-400/10',
  epic: 'border-purple-400 bg-purple-400/10',
  legendary: 'border-yellow-400 bg-yellow-400/10'
} as const;
