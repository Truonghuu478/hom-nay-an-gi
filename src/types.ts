export interface FoodItem {
  id: string;
  name: string;
  color: string;
  textColor: string;
  icon?: string;
}

declare global {
  interface Window { confetti: (opts?: any) => void }
}

export { }
