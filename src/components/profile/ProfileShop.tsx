
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="space-y-4 h-full">
      <Tabs defaultValue="frames" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 border-gray-700 p-1">
          <TabsTrigger value="frames" className="text-white data-[state=active]:bg-gray-700 text-xs">
            Molduras
          </TabsTrigger>
          <TabsTrigger value="colors" className="text-white data-[state=active]:bg-gray-700 text-xs">
            Cores do Nome
          </TabsTrigger>
          <TabsTrigger value="backgrounds" className="text-white data-[state=active]:bg-gray-700 text-xs">
            Fundos
          </TabsTrigger>
          <TabsTrigger value="avatars" className="text-white data-[state=active]:bg-gray-700 text-xs">
            Avatares
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <ScrollArea className="h-[400px] w-full pr-4">
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
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
};
