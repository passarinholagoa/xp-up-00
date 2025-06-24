
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShopItem } from '@/types/profile';

interface ShopItemCardProps {
  item: ShopItem;
  canBuy: boolean;
  missingRequirements: string[];
  achievements: Array<{ id: string; title: string; unlocked: boolean }>;
  onBuyItem: (item: ShopItem) => void;
}

export const ShopItemCard = ({ 
  item, 
  canBuy, 
  missingRequirements, 
  achievements, 
  onBuyItem 
}: ShopItemCardProps) => {
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

  return (
    <Card className={`p-3 ${getItemCardBorder(item.rarity)} border transition-all hover:shadow-md mb-3`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="text-xl shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                <Badge className={`text-xs px-2 py-1 ${getRarityColor(item.rarity)} shrink-0`}>
                  {item.rarity}
                </Badge>
              </div>
              <p className="text-gray-300 text-xs mb-2">
                {item.description}
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => onBuyItem(item)}
            disabled={!canBuy}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 text-xs font-medium disabled:bg-gray-600 disabled:cursor-not-allowed shrink-0"
          >
            Comprar
          </Button>
        </div>
        
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-yellow-400 font-medium">
              💰 {item.price}
            </span>
            {item.xpRequired && (
              <span className="flex items-center gap-1 text-blue-400 font-medium">
                ⭐ {item.xpRequired.toLocaleString()} XP
              </span>
            )}
            {item.achievementRequired && (
              <span className="flex items-center gap-1 text-purple-400 font-medium">
                🏆 "{achievements.find(a => a.id === item.achievementRequired)?.title}"
              </span>
            )}
          </div>
          {missingRequirements.length > 0 && (
            <div className="text-xs text-red-400 font-medium">
              Faltam: {missingRequirements.join(', ')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
