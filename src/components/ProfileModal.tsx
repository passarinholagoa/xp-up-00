
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
import { ShopItem, RARITY_COLORS } from '@/types/profile';
import { Edit, ShoppingBag, User, Palette } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { gameState, profile, updateProfile, shopItems, buyShopItem } = useGame();
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSaveChanges = () => {
    updateProfile(tempProfile);
    onClose();
  };

  const handleBuyItem = (item: ShopItem) => {
    if (gameState.coins >= item.price && !item.owned) {
      buyShopItem(item.id);
    }
  };

  const getOwnedItems = (category: string) => {
    return shopItems.filter(item => item.category === category && item.owned);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6" />
            Perfil Personalizável
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pré-visualização</h3>
            <Card className="p-6">
              <div className={`relative p-6 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-quest-gradient flex items-center justify-center text-2xl">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Seu Nome'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Nível {gameState.level} • {gameState.coins} moedas
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Customization Section */}
          <div className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">
                  <Edit className="h-4 w-4 mr-2" />
                  Básico
                </TabsTrigger>
                <TabsTrigger value="shop">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Loja
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Nome de Exibição</Label>
                    <Input
                      id="displayName"
                      value={tempProfile.displayName}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <Label>Avatar Atual</Label>
                    <div className="flex gap-2 mt-2">
                      {getOwnedItems('avatar').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.avatar === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, avatar: item.value }))}
                        >
                          {item.value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Cor do Nome</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {getOwnedItems('color').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.nameColor === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, nameColor: item.value }))}
                          className="text-xs"
                        >
                          {item.icon} {item.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Moldura</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {getOwnedItems('frame').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.frameBorder === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, frameBorder: item.value }))}
                          className="text-xs"
                        >
                          {item.icon} {item.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shop" className="space-y-4">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {shopItems
                    .filter(item => !item.owned)
                    .map(item => (
                      <Card key={item.id} className={`p-4 ${RARITY_COLORS[item.rarity]}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{item.icon}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{item.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {item.rarity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleBuyItem(item)}
                            disabled={gameState.coins < item.price}
                            className="flex items-center gap-1"
                          >
                            {item.price} 💰
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
