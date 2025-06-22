
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { ShopItem } from '@/types/profile';
import { Edit, User, Frame, Palette, Image, UserCircle } from 'lucide-react';

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

  const getShopItemsByCategory = (category: string) => {
    return shopItems.filter(item => item.category === category && !item.owned);
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
      missing.push(`conquista "${achievements.find(a => a.id === item.achievementRequired)?.title}"`);
    }
    
    return missing;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'epic': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      case 'rare': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const ShopCategoryContent = ({ category }: { category: string }) => {
    const items = getShopItemsByCategory(category);
    
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum item disponível nesta categoria
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          {category === 'frame' && <Frame className="h-5 w-5" />}
          {category === 'color' && <Palette className="h-5 w-5" />}
          {category === 'background' && <Image className="h-5 w-5" />}
          {category === 'avatar' && <UserCircle className="h-5 w-5" />}
          <h3 className="text-lg font-semibold">
            {category === 'frame' && 'Molduras'}
            {category === 'color' && 'Nomes'}
            {category === 'background' && 'Fundos'}
            {category === 'avatar' && 'Avatares'}
          </h3>
          <Badge variant="outline" className="text-xs">
            {items.length} itens
          </Badge>
        </div>
        
        <div className="space-y-3">
          {items.map(item => {
            const canBuy = canBuyItem(item);
            const missingReqs = getMissingRequirements(item);
            
            return (
              <Card key={item.id} className="p-4 bg-gray-900/50 border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <Badge className={`text-xs px-2 py-1 ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {item.price} 💰
                        </span>
                        {item.xpRequired && (
                          <span className="flex items-center gap-1">
                            {item.xpRequired.toLocaleString()} XP
                          </span>
                        )}
                        {item.achievementRequired && (
                          <span className="flex items-center gap-1">
                            "{achievements.find(a => a.id === item.achievementRequired)?.title}" 🏆
                          </span>
                        )}
                      </div>
                      {missingReqs.length > 0 && (
                        <div className="text-xs text-red-400 mt-1">
                          Faltam: {missingReqs.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBuyItem(item)}
                    disabled={!canBuy}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Comprar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-gray-950 border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-white">
            <User className="h-6 w-6" />
            Perfil Personalizável
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Preview Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Pré-visualização</h3>
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className={`relative p-6 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-quest-gradient flex items-center justify-center text-2xl">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Seu Nome'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Basic Settings */}
            <Card className="p-4 bg-gray-900/50 border-gray-800 space-y-4">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Configurações Básicas
              </h4>
              
              <div>
                <Label htmlFor="displayName" className="text-white">Nome de Exibição</Label>
                <Input
                  id="displayName"
                  value={tempProfile.displayName}
                  onChange={(e) => setTempProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Digite seu nome"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Itens Possuídos</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {getOwnedItems('avatar').map(item => (
                    <Button
                      key={item.id}
                      variant={tempProfile.avatar === item.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTempProfile(prev => ({ ...prev, avatar: item.value }))}
                      className="text-xs"
                    >
                      {item.value}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700">
                Salvar Alterações
              </Button>
            </div>
          </div>

          {/* Shop Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="frame" className="w-full h-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border-gray-800">
                  <TabsTrigger 
                    value="frame" 
                    className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  >
                    <Frame className="h-4 w-4 mr-2" />
                    Molduras
                  </TabsTrigger>
                  <TabsTrigger 
                    value="color"
                    className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Nomes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="background"
                    className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Fundos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="avatar"
                    className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Avatares
                  </TabsTrigger>
                </TabsList>
                <Badge variant="outline" className="text-white border-gray-700">
                  Loja
                </Badge>
              </div>

              <div className="overflow-y-auto max-h-[500px] pr-2">
                <TabsContent value="frame">
                  <ShopCategoryContent category="frame" />
                </TabsContent>

                <TabsContent value="color">
                  <ShopCategoryContent category="color" />
                </TabsContent>

                <TabsContent value="background">
                  <ShopCategoryContent category="background" />
                </TabsContent>

                <TabsContent value="avatar">
                  <ShopCategoryContent category="avatar" />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
