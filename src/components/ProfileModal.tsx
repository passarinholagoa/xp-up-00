
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGame } from '@/contexts/GameContext';
import { ShopItem } from '@/types/profile';
import { Edit, User } from 'lucide-react';
import { ProfilePreview } from './profile/ProfilePreview';
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
        className="w-full sm:max-w-2xl bg-gray-950 border-gray-800 p-0 overflow-hidden"
      >
        <SheetHeader className="p-4 pb-0">
          <SheetTitle className="flex items-center gap-2 text-lg text-white font-bold">
            <User className="h-5 w-5" />
            Perfil Personalizável
          </SheetTitle>
        </SheetHeader>

        <div className="p-4 h-full flex flex-col">
          {/* Preview - Mobile first, sempre visível no topo */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white mb-3">Pré-visualização</h3>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className={`relative p-3 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-base">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Aventureiro'}
                    </h4>
                    <p className="text-xs text-gray-300">
                      Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs - Conteúdo principal */}
          <div className="flex-1 min-h-0">
            <Tabs defaultValue="basic" className="w-full h-full flex flex-col">
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

              <TabsContent value="basic" className="flex-1 overflow-hidden">
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

              <TabsContent value="shop" className="flex-1 overflow-hidden">
                <ProfileShop
                  shopItems={shopItems}
                  gameState={gameState}
                  achievements={achievements}
                  onBuyItem={handleBuyItem}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
