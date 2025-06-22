
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShopCategoryContent } from './ShopCategoryContent';
import { ShopItem } from '@/types/profile';
import { Achievement } from '@/types/achievements';
import { Frame, Palette, Image, UserCircle } from 'lucide-react';

interface ShopSectionProps {
  shopItems: ShopItem[];
  achievements: Achievement[];
  gameState: {
    coins: number;
    totalXp: number;
  };
  onBuyItem: (item: ShopItem) => void;
}

export const ShopSection = ({ shopItems, achievements, gameState, onBuyItem }: ShopSectionProps) => {
  const getShopItemsByCategory = (category: string) => {
    return shopItems.filter(item => item.category === category && !item.owned);
  };

  return (
    <div className="space-y-4 h-full">
      <Tabs defaultValue="frame" className="w-full h-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 border-gray-700 mb-4 h-12">
          <TabsTrigger 
            value="frame" 
            className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-1 py-2"
          >
            <Frame className="h-3 w-3" />
            <span className="text-xs">Molduras</span>
          </TabsTrigger>
          <TabsTrigger 
            value="color"
            className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-1 py-2"
          >
            <Palette className="h-3 w-3" />
            <span className="text-xs">Nomes</span>
          </TabsTrigger>
          <TabsTrigger 
            value="background"
            className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-1 py-2"
          >
            <Image className="h-3 w-3" />
            <span className="text-xs">Fundos</span>
          </TabsTrigger>
          <TabsTrigger 
            value="avatar"
            className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-1 py-2"
          >
            <UserCircle className="h-3 w-3" />
            <span className="text-xs">Avatares</span>
          </TabsTrigger>
        </TabsList>

        <div className="h-[440px]">
          <TabsContent value="frame" className="mt-0 h-full">
            <ShopCategoryContent 
              category="frame" 
              items={getShopItemsByCategory('frame')}
              achievements={achievements}
              gameState={gameState}
              onBuyItem={onBuyItem}
            />
          </TabsContent>

          <TabsContent value="color" className="mt-0 h-full">
            <ShopCategoryContent 
              category="color" 
              items={getShopItemsByCategory('color')}
              achievements={achievements}
              gameState={gameState}
              onBuyItem={onBuyItem}
            />
          </TabsContent>

          <TabsContent value="background" className="mt-0 h-full">
            <ShopCategoryContent 
              category="background" 
              items={getShopItemsByCategory('background')}
              achievements={achievements}
              gameState={gameState}
              onBuyItem={onBuyItem}
            />
          </TabsContent>

          <TabsContent value="avatar" className="mt-0 h-full">
            <ShopCategoryContent 
              category="avatar" 
              items={getShopItemsByCategory('avatar')}
              achievements={achievements}
              gameState={gameState}
              onBuyItem={onBuyItem}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
