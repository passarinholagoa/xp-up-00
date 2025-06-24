
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
        className="w-full sm:max-w-none max-w-none bg-gray-950 border-gray-800 p-0 overflow-hidden"
      >
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="flex items-center gap-2 text-xl text-white font-bold">
            <User className="h-5 w-5" />
            Perfil Personalizável
          </SheetTitle>
        </SheetHeader>

        <div className="flex gap-6 p-6 pt-4 h-full">
          <ProfilePreview profile={tempProfile} gameState={gameState} />

          <div className="flex-1 min-w-0">
            <Tabs defaultValue="basic" className="w-full h-full">
              <div className="mb-4">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 border-gray-700 p-1 h-12">
                  <TabsTrigger 
                    value="basic" 
                    className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex items-center gap-2 text-sm font-medium py-2"
                  >
                    <Edit className="h-4 w-4" />
                    Básico
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shop"
                    className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex items-center gap-2 text-sm font-medium py-2"
                  >
                    Loja
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic" className="space-y-4">
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

              <TabsContent value="shop" className="h-full">
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
