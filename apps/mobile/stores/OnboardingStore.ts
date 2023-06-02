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
  allergies: string[];
  addAllergy: (allergy: string) => void;
  removeAllergy: (allergy: string) => void;
  dietaries: string[];
  addDietary: (dietary: string) => void;
  removeDietary: (dietary: string) => void;
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
  allergies: [],
  addAllergy: (allergy: string) =>
    set((state) => ({ allergies: [...state.allergies, allergy] })),
  removeAllergy: (allergy: string) =>
    set((state) => ({
      allergies: state.allergies.filter((alrgy) => alrgy !== allergy),
    })),
  dietaries: [],
  addDietary: (dietary: string) =>
    set((state) => ({ dietaries: [...state.dietaries, dietary] })),
  removeDietary: (dietary: string) =>
    set((state) => ({
      allergies: state.dietaries.filter((diet) => diet !== dietary),
    })),
}));
