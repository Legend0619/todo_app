import { create } from "zustand";
import { Good } from "@/types/good/types";

interface GoodState {
  goods: Good[];
  setGoods: (goods: Good[]) => void;
  addGood: (good: Good) => void;
  updateGood: (good: Good) => void;
  removeGood: (good: Good) => void;
}

export const useGoodStore = create<GoodState>((set) => ({
  goods: [],
  setGoods: (goods: Good[]) => set({ goods }),
  addGood: (good: Good) => set((state) => ({ goods: [...state.goods, good] })),
  updateGood: (good: Good) =>
    set((state) => ({
      goods: state.goods.map((g) => (g.id === good.id ? good : g)),
    })),
  removeGood: (good: Good) =>
    set((state) => ({
      goods: state.goods.filter((g) => g.id !== good.id),
    })),
}));