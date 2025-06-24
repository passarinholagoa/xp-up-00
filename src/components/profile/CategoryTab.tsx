
import React from 'react';
import { ShopItemCard } from './ShopItemCard';
import { ShopItem } from '@/types/profile';

interface CategoryTabProps {
  category: string;
  shopItems: ShopItem[];
  gameState: {
    coins: number;
    totalXp: number;
  };
  achievements: Array<{ id: string; title: string; unlocked: boolean }>;
  onBuyItem: (item: ShopItem) => void;
}

export const CategoryTab = ({ 
  category, 
  shopItems, 
  gameState, 
  achievements, 
  onBuyItem 
}: CategoryTabProps) => {
  const categoryItems = shopItems.filter(item => item.category === category && !item.owned);

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

  return (
    <div className="space-y-3">
      {categoryItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <div className="text-2xl mb-2">📦</div>
          <p>Nenhum item disponível</p>
        </div>
      ) : (
        categoryItems.map(item => (
          <ShopItemCard 
            key={item.id} 
            item={item}
            canBuy={canBuyItem(item)}
            missingRequirements={getMissingRequirements(item)}
            achievements={achievements}
            onBuyItem={onBuyItem}
          />
        ))
      )}
    </div>
  );
};
