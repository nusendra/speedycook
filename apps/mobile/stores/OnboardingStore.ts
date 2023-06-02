import { create } from 'zustand';

export type CookingLevel =
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'professional'
  | null;

export interface OnboardingState {
  cookingLevel: CookingLevel;
  setCookingLevel: (cookingLevel: CookingLevel) => void;
  foods: string[];
  addFood: (food: string) => void;
  removeFood: (index: number) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  cookingLevel: null,
  setCookingLevel: (cookingLevel: CookingLevel) => set({ cookingLevel }),
  foods: [],
  addFood: (food: string) =>
    set((state) => ({ foods: [...state.foods, food] })),
  removeFood: (index: number) =>
    set((state) => ({
      foods: state.foods.filter((_, index_) => index_ !== index),
    })),
}));
