import { create, StateCreator } from "zustand";

type BirthDaySlice = {
  isBirthDayModalOpen: boolean;
  onOpenBirthDayModal: () => void;
  onCloseBirthDayModal: () => void;
};

const createBirthDaySlice: StateCreator<
  BirthDaySlice,
  [],
  [],
  BirthDaySlice
> = (set) => ({
  isBirthDayModalOpen: false,
  onOpenBirthDayModal: () => set({ isBirthDayModalOpen: true }),
  onCloseBirthDayModal: () => set({ isBirthDayModalOpen: false }),
});

type EditModalSlice = {
  isEditModalOpen: boolean;
  onOpenEditModal: () => void;
  onCloseEditModal: () => void;
};

const createEditModalSlice: StateCreator<
  EditModalSlice,
  [],
  [],
  EditModalSlice
> = (set) => ({
  isEditModalOpen: false,
  onOpenEditModal: () => set({ isEditModalOpen: true }),
  onCloseEditModal: () => set({ isEditModalOpen: false }),
});

// Pro Modal slice
type ProModalSlice = {
  isProModalOpen: boolean;
  onOpenProModal: () => void;
  onCloseProModal: () => void;
};

const createProModalSlice: StateCreator<
  ProModalSlice,
  [],
  [],
  ProModalSlice
> = (set) => ({
  isProModalOpen: false,
  onOpenProModal: () => set({ isProModalOpen: true }),
  onCloseProModal: () => set({ isProModalOpen: false }),
});

type StoreType = BirthDaySlice & EditModalSlice & ProModalSlice;

//Combine the slices into a single
export const useStore = create<StoreType>()((...a) => ({
  ...createBirthDaySlice(...a),
  ...createEditModalSlice(...a),
  ...createProModalSlice(...a),
}));
