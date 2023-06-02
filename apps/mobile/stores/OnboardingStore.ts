import { create } from 'zustand';

export type CookingLevelType =
  | 'novice'
  | 'intermediate'
  | 'advanced'
  | 'professional'
  | null;

export interface OnboardingState {
  cookingLevel: CookingLevelType;
  setCookingLevel: (cookingLevel: CookingLevelType) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  cookingLevel: null,
  setCookingLevel: (cookingLevel: CookingLevelType) => set({ cookingLevel }),
}));
