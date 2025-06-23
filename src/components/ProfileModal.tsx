
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGame } from '@/contexts/GameContext';
import { ShopItem } from '@/types/profile';
import { Edit, User } from 'lucide-react';

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

  const getAllShopItems = () => {
    return shopItems.filter(item => !item.owned);
  };

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

  const ShopItemCard = ({ item }: { item: ShopItem }) => {
    const canBuy = canBuyItem(item);
    const missingRequirements = getMissingRequirements(item);

    return (
      <Card className={`p-4 ${getItemCardBorder(item.rarity)} border transition-all hover:shadow-md`}>
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
              {missingRequirements.length > 0 && (
                <div className="text-xs text-red-400 mt-1 font-medium">
                  Faltam: {missingRequirements.join(', ')}
                </div>
              )}
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => handleBuyItem(item)}
            disabled={!canBuy}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-xs font-medium disabled:bg-gray-600 disabled:cursor-not-allowed shrink-0"
          >
            Comprar
          </Button>
        </div>
      </Card>
    );
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
          {/* Profile Preview */}
          <div className="w-80 space-y-4">
            <h3 className="text-base font-bold text-white">Pré-visualização</h3>
            <Card className="p-4 bg-gray-900/50 border-gray-800">
              <div className={`relative p-4 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-base font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Aventureiro'}
                    </h4>
                    <p className="text-xs text-gray-300">
                      Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

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
                <Card className="p-6 bg-gray-900/50 border-gray-800 space-y-6">
                  <h4 className="font-bold text-white text-lg">Configurações Básicas</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-white text-sm font-medium">Nome de Exibição</Label>
                    <Input
                      id="displayName"
                      value={tempProfile.displayName}
                      onChange={(e) => setTempProfile({ ...tempProfile, displayName: e.target.value })}
                      placeholder="Digite seu nome"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white text-sm font-medium">Itens Possuídos</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {getOwnedItems('avatar').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.avatar === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile({ ...tempProfile, avatar: item.value })}
                          className="text-lg p-2 h-12 w-12"
                        >
                          {item.value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={onClose} className="border-gray-600 text-white px-4 py-2">
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700 px-4 py-2">
                      Salvar Alterações
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="shop" className="h-full">
                <div className="space-y-4 h-full">
                  <h3 className="text-lg font-bold text-white">Loja</h3>
                  
                  <ScrollArea className="h-[400px] w-full pr-4">
                    <div className="space-y-3">
                      {getAllShopItems().length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                          <div className="text-2xl mb-2">📦</div>
                          <p>Nenhum item disponível</p>
                        </div>
                      ) : (
                        getAllShopItems().map(item => (
                          <ShopItemCard key={item.id} item={item} />
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
