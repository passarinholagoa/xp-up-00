
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CategoryTab } from './CategoryTab';
import { ShopItem } from '@/types/profile';

interface ProfileShopProps {
  shopItems: ShopItem[];
  gameState: {
    coins: number;
    totalXp: number;
  };
  achievements: Array<{ id: string; title: string; unlocked: boolean }>;
  onBuyItem: (item: ShopItem) => void;
}

export const ProfileShop = ({ shopItems, gameState, achievements, onBuyItem }: ProfileShopProps) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="frames" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 border-gray-700 p-1 h-8 mb-4 gap-1">
          <TabsTrigger value="frames" className="text-white data-[state=active]:bg-gray-700 text-xs py-1">
            Molduras
          </TabsTrigger>
          <TabsTrigger value="colors" className="text-white data-[state=active]:bg-gray-700 text-xs py-1">
            Cores
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <TabsList className="grid w-full grid-cols-1 bg-gray-900/80 border-gray-700 p-1 h-8">
            <TabsTrigger value="backgrounds" className="text-white data-[state=active]:bg-gray-700 text-xs py-1">
              Fundos
            </TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-1 bg-gray-900/80 border-gray-700 p-1 h-8">
            <TabsTrigger value="avatars" className="text-white data-[state=active]:bg-gray-700 text-xs py-1">
              Avatares
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="space-y-4">
          <TabsContent value="frames" className="mt-0">
            <CategoryTab 
              category="frame" 
              shopItems={shopItems}
              gameState={gameState}
              achievements={achievements}
              onBuyItem={onBuyItem}
            />
          </TabsContent>
          <TabsContent value="colors" className="mt-0">
            <CategoryTab 
              category="color" 
              shopItems={shopItems}
              gameState={gameState}
              achievements={achievements}
              onBuyItem={onBuyItem}
            />
          </TabsContent>
          <TabsContent value="backgrounds" className="mt-0">
            <CategoryTab 
              category="background" 
              shopItems={shopItems}
              gameState={gameState}
              achievements={achievements}
              onBuyItem={onBuyItem}
            />
          </TabsContent>
          <TabsContent value="avatars" className="mt-0">
            <CategoryTab 
              category="avatar" 
              shopItems={shopItems}
              gameState={gameState}
              achievements={achievements}
              onBuyItem={onBuyItem}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
