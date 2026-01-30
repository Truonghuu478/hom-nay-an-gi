import { FoodItem } from './types';

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Cơm tấm',
    color: '#F97316', // Orange
    textColor: '#FFFFFF',
    icon: '🍖'
  },
  {
    id: '2',
    name: 'Cơm gà',
    color: '#FCD34D', // Amber (Yellow-ish)
    textColor: '#78350F',
    icon: '🍗'
  },
  {
    id: '3',
    name: 'Bún riêu',
    color: '#EF4444', // Red
    textColor: '#FFFFFF',
    icon: '🦀'
  },
  {
    id: '4',
    name: 'Bún bò',
    color: '#991B1B', // Dark Red
    textColor: '#FFFFFF',
    icon: '🍜'
  },
  {
    id: '5',
    name: 'Hủ tiếu',
    color: '#06B6D4', // Cyan
    textColor: '#FFFFFF',
    icon: '🍤'
  },
  {
    id: '6',
    name: 'Bánh canh',
    color: '#10B981', // Green
    textColor: '#FFFFFF',
    icon: '🐟'
  },
];

export const WHEEL_SIZE = 500; // px
export const SPIN_DURATION = 4000; // ms

export const SOUNDS = {
  SPIN_TUNE: 'https://cdn.pixabay.com/audio/2023/04/18/audio_6234988775.mp3',
  WIN_SFX: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  CONFETTI_SFX: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
};
