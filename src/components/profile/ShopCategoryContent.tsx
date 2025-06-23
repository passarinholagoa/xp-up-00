
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Frame, Palette, Image, UserCircle } from 'lucide-react';
import { ShopItemCard } from './ShopItemCard';
import { ShopItem } from '@/types/profile';

interface ShopCategoryContentProps {
  category: string;
  items: ShopItem[];
  achievements: Array<{ id: string; title: string; unlocked: boolean }>;
  gameState: {
    coins: number;
    totalXp: number;
  };
  onBuyItem: (item: ShopItem) => void;
}

export const ShopCategoryContent = ({ category, items, achievements, gameState, onBuyItem }: ShopCategoryContentProps) => {
  const canBuyItem = (item: ShopItem) => {
    const hasEnoughCoins = gameState.coins >= item.price;
    const hasEnoughXp = !item.xpRequired || gameState.totalXp >= item.xpRequired;
    const hasRequiredAchievement = !item.achievementRequired || 
      achievements.find(a => a.id === item.achievementRequired)?.unlocked;
    
    return hasEnoughCoins && hasEnoughXp && hasRequiredAchievement && !item.owned;
  };

  const getMissingRequirements = (item: ShopItem) => {
    let missing = [];
    
    if (gameState.coins < item.price) {
      missing.push(`${item.price - gameState.coins} moedas`);
    }
    
    if (item.xpRequired && gameState.totalXp < item.xpRequired) {
      missing.push(`${item.xpRequired - gameState.totalXp} XP`);
    }
    
    if (item.achievementRequired && !achievements.find(a => a.id === item.achievementRequired)?.unlocked) {
      missing.push(`conquista "${achievements.find(a => a.id === item.achievementRequired)?.title}"`);
    }
    
    return missing;
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <div className="text-2xl mb-2">📦</div>
        <p>Nenhum item disponível</p>
      </div>
    );
  }

  const categoryName = {
    'frame': 'Molduras',
    'color': 'Nomes', 
    'background': 'Fundos',
    'avatar': 'Avatares'
  }[category] || category;

  const categoryIcon = {
    'frame': <Frame className="h-4 w-4" />,
    'color': <Palette className="h-4 w-4" />,
    'background': <Image className="h-4 w-4" />,
    'avatar': <UserCircle className="h-4 w-4" />
  }[category];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        {categoryIcon}
        <h3 className="text-lg font-bold text-white">{categoryName}</h3>
        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600 text-xs">
          {items.length} itens
        </Badge>
      </div>
      
      <div className="space-y-3">
        {items.map(item => (
          <ShopItemCard
            key={item.id}
            item={item}
            canBuy={canBuyItem(item)}
            missingRequirements={getMissingRequirements(item)}
            achievements={achievements}
            onBuy={onBuyItem}
          />
        ))}
      </div>
    </div>
  );
};
