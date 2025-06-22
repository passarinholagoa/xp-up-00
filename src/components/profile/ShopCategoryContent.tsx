
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShopItem } from '@/types/profile';
import { Achievement } from '@/types/achievements';
import { Frame, Palette, Image, UserCircle } from 'lucide-react';

interface ShopCategoryContentProps {
  category: string;
  items: ShopItem[];
  achievements: Achievement[];
  gameState: {
    coins: number;
    totalXp: number;
  };
  onBuyItem: (item: ShopItem) => void;
}

export const ShopCategoryContent = ({ 
  category, 
  items, 
  achievements, 
  gameState, 
  onBuyItem 
}: ShopCategoryContentProps) => {
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500 text-black';
      case 'epic': return 'bg-purple-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getItemCardBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500/50 bg-yellow-500/5';
      case 'epic': return 'border-purple-500/50 bg-purple-500/5';
      case 'rare': return 'border-blue-500/50 bg-blue-500/5';
      default: return 'border-gray-600/50 bg-gray-800/20';
    }
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
    <div className="h-full">
      <div className="flex items-center gap-2 mb-4">
        {categoryIcon}
        <h3 className="text-lg font-bold text-white">{categoryName}</h3>
        <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600 text-xs">
          {items.length} itens
        </Badge>
      </div>
      
      <ScrollArea className="h-[360px] w-full pr-4">
        <div className="space-y-3 pb-4">
          {items.map(item => {
            const canBuy = canBuyItem(item);
            const missingReqs = getMissingRequirements(item);
            
            return (
              <Card key={item.id} className={`p-4 ${getItemCardBorder(item.rarity)} border transition-all hover:shadow-md`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                        <Badge className={`text-xs px-2 py-1 ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-xs mb-2 line-clamp-1">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 text-yellow-400 font-medium">
                          {item.price} 💰
                        </span>
                        {item.xpRequired && (
                          <span className="flex items-center gap-1 text-blue-400 font-medium">
                            {item.xpRequired.toLocaleString()} XP
                          </span>
                        )}
                        {item.achievementRequired && (
                          <span className="flex items-center gap-1 text-purple-400 font-medium text-xs truncate">
                            "{achievements.find(a => a.id === item.achievementRequired)?.title}" 🏆
                          </span>
                        )}
                      </div>
                      {missingReqs.length > 0 && (
                        <div className="text-xs text-red-400 mt-1 font-medium">
                          Faltam: {missingReqs.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onBuyItem(item)}
                    disabled={!canBuy}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-xs font-medium disabled:bg-gray-600 disabled:cursor-not-allowed shrink-0"
                  >
                    Comprar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
