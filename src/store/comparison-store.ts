import { create } from 'zustand';
import type { ComparisonValue } from '@/types';

const defaultValue: ComparisonValue = {
  page: 0,
  images: [],
  canvases: [],
  texts: [],
  label: '',
  manifest: '',
  canvas: '',
};

interface ComparisonStore {
  values: [ComparisonValue, ComparisonValue];
  mode: number;
  setValues: (values: [ComparisonValue, ComparisonValue]) => void;
  setMode: (mode: number) => void;
  updatePage: (index: number, page: number) => void;
}

export const useComparisonStore = create<ComparisonStore>((set) => ({
  values: [{ ...defaultValue }, { ...defaultValue }],
  mode: -1,
  setValues: (values) => set({ values }),
  setMode: (mode) => set({ mode }),
  updatePage: (index, page) =>
    set((state) => {
      const values = [...state.values] as [ComparisonValue, ComparisonValue];
      values[index] = { ...values[index], page };
      return { values };
    }),
}));
