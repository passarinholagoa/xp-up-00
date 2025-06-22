
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
      case 'legendary': return 'bg-yellow-500 text-yellow-900 border-yellow-500';
      case 'epic': return 'bg-purple-500 text-purple-900 border-purple-500';
      case 'rare': return 'bg-blue-500 text-blue-900 border-blue-500';
      default: return 'bg-gray-500 text-gray-900 border-gray-500';
    }
  };

  const getItemCardBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-600 bg-gray-800/50';
    }
  };

  const ShopCategoryContent = ({ category }: { category: string }) => {
    const items = getShopItemsByCategory(category);
    
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <div className="text-4xl mb-4">📦</div>
          <p className="text-lg">Nenhum item disponível nesta categoria</p>
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
      'frame': <Frame className="h-5 w-5" />,
      'color': <Palette className="h-5 w-5" />,
      'background': <Image className="h-5 w-5" />,
      'avatar': <UserCircle className="h-5 w-5" />
    }[category];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          {categoryIcon}
          <h3 className="text-2xl font-bold text-white">
            {categoryName}
          </h3>
          <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600 px-3 py-1">
            {items.length} itens
          </Badge>
        </div>
        
        <div className="space-y-4">
          {items.map(item => {
            const canBuy = canBuyItem(item);
            const missingReqs = getMissingRequirements(item);
            
            return (
              <Card key={item.id} className={`p-6 ${getItemCardBorder(item.rarity)} border-2 transition-all hover:shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h4 className="font-bold text-white text-xl">{item.name}</h4>
                        <Badge className={`text-sm font-semibold px-3 py-1 ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-4 text-base">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-6 text-base">
                        <span className="flex items-center gap-2 text-yellow-400 font-semibold">
                          {item.price} 💰
                        </span>
                        {item.xpRequired && (
                          <span className="flex items-center gap-2 text-blue-400 font-semibold">
                            {item.xpRequired.toLocaleString()} XP
                          </span>
                        )}
                        {item.achievementRequired && (
                          <span className="flex items-center gap-2 text-purple-400 font-semibold">
                            "{achievements.find(a => a.id === item.achievementRequired)?.title}" 🏆
                          </span>
                        )}
                      </div>
                      {missingReqs.length > 0 && (
                        <div className="text-sm text-red-400 mt-3 font-medium">
                          Faltam: {missingReqs.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    onClick={() => handleBuyItem(item)}
                    disabled={!canBuy}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
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
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden bg-gray-950 border-gray-800 p-0">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="flex items-center gap-3 text-3xl text-white font-bold">
            <User className="h-8 w-8" />
            Perfil Personalizável
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 pt-4 h-full">
          {/* Preview Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Pré-visualização</h3>
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className={`relative p-6 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Aventureiro'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Nível {gameState.level} • {gameState.coins} moedas
                    </p>
                    <p className="text-xs text-gray-500">
                      {gameState.totalXp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="basic" className="w-full h-full">
              <div className="mb-8">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 border-gray-700 p-2 h-14">
                  <TabsTrigger 
                    value="basic" 
                    className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex items-center gap-3 text-base font-semibold py-3"
                  >
                    <Edit className="h-5 w-5" />
                    Básico
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shop"
                    className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex items-center gap-3 text-base font-semibold py-3"
                  >
                    Loja
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic" className="space-y-6">
                <Card className="p-8 bg-gray-900/50 border-gray-800 space-y-8">
                  <h4 className="font-bold text-white text-2xl">Configurações Básicas</h4>
                  
                  <div className="space-y-3">
                    <Label htmlFor="displayName" className="text-white text-base font-semibold">Nome de Exibição</Label>
                    <Input
                      id="displayName"
                      value={tempProfile.displayName}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Digite seu nome"
                      className="bg-gray-800 border-gray-700 text-white text-base py-3"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white text-base font-semibold">Itens Possuídos</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {getOwnedItems('avatar').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.avatar === item.value ? "default" : "outline"}
                          size="lg"
                          onClick={() => setTempProfile(prev => ({ ...prev, avatar: item.value }))}
                          className="text-2xl p-4 h-16"
                        >
                          {item.value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <Button variant="outline" onClick={onClose} className="border-gray-600 text-white px-6 py-3 text-base">
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700 px-6 py-3 text-base">
                      Salvar Alterações
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="shop">
                <div className="space-y-6">
                  <Tabs defaultValue="avatar" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 border-gray-700 mb-8 h-16">
                      <TabsTrigger 
                        value="frame" 
                        className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-2 py-3"
                      >
                        <Frame className="h-5 w-5" />
                        <span className="text-sm font-medium">Molduras</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="color"
                        className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-2 py-3"
                      >
                        <Palette className="h-5 w-5" />
                        <span className="text-sm font-medium">Nomes</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="background"
                        className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-2 py-3"
                      >
                        <Image className="h-5 w-5" />
                        <span className="text-sm font-medium">Fundos</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="avatar"
                        className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white flex flex-col items-center gap-2 py-3"
                      >
                        <UserCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Avatares</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="overflow-y-auto max-h-[600px] pr-4">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
