import { create } from "zustand";
import { Category } from "@/types/category/types";

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  removeCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories: Category[]) => set({ categories }),
  addCategory: (category: Category) => set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (category: Category) => set((state) => ({ categories: state.categories.map((c) => (c.id === category.id? category : c)) })),
  removeCategory: (category: Category) => set((state) => ({ categories: state.categories.filter((c) => c.id !== category.id) })),
}));