
import { ShopItem } from '@/types/profile';
import { frameItems } from './frames';
import { colorItems } from './colors';
import { backgroundItems } from './backgrounds';
import { avatarItems } from './avatars';

export const SHOP_ITEMS: ShopItem[] = [
  ...frameItems,
  ...colorItems,
  ...backgroundItems,
  ...avatarItems
];

export { frameItems, colorItems, backgroundItems, avatarItems };
