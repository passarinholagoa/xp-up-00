
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGame } from '@/contexts/GameContext';
import { ShopItem } from '@/types/profile';
import { Edit, User } from 'lucide-react';
import { ProfileBasicSettings } from './profile/ProfileBasicSettings';
import { ProfileShop } from './profile/ProfileShop';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { gameState, profile, updateProfile, shopItems, buyShopItem, achievements } = useGame();
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSaveChanges = () => {
    updateProfile(tempProfile);
    onClose();
  };

  const handleBuyItem = (item: ShopItem) => {
    buyShopItem(item.id);
  };

  const getOwnedItems = (category: string) => {
    return shopItems.filter(item => item.category === category && item.owned);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-2xl bg-gray-950 border-gray-800 p-0 flex flex-col max-h-screen"
      >
        <SheetHeader className="p-4 pb-3 shrink-0">
          <SheetTitle className="flex items-center gap-2 text-lg text-white font-bold">
            <User className="h-5 w-5" />
            Perfil Personalizável
          </SheetTitle>
        </SheetHeader>

        {/* Preview - Fixo no topo */}
        <div className="px-4 pb-3 border-b border-gray-800 bg-gray-950 shrink-0">
          <h3 className="text-sm font-bold text-white mb-3">Pré-visualização</h3>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
            <div className={`relative p-3 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-base">
                  {tempProfile.avatar}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${tempProfile.nameColor}`}>
                    {tempProfile.displayName || profile.displayName}
                  </h4>
                  <p className="text-xs text-gray-300">
                    Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo scrollável */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4 pt-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 border-gray-700 p-1 h-10 mb-4">
                <TabsTrigger 
                  value="basic" 
                  className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex items-center gap-2 text-xs font-medium py-1"
                >
                  <Edit className="h-3 w-3" />
                  Básico
                </TabsTrigger>
                <TabsTrigger 
                  value="shop"
                  className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex items-center gap-2 text-xs font-medium py-1"
                >
                  Loja
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-0">
                <ProfileBasicSettings
                  tempProfile={tempProfile}
                  setTempProfile={setTempProfile}
                  ownedAvatars={getOwnedItems('avatar')}
                  ownedFrames={getOwnedItems('frame')}
                  ownedColors={getOwnedItems('color')}
                  ownedBackgrounds={getOwnedItems('background')}
                  onSave={handleSaveChanges}
                  onCancel={onClose}
                />
              </TabsContent>

              <TabsContent value="shop" className="mt-0">
                <ProfileShop
                  shopItems={shopItems}
                  gameState={gameState}
                  achievements={achievements}
                  onBuyItem={handleBuyItem}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
