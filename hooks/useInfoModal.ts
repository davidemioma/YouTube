import { create } from "zustand";

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const useInfoModal = create<ModalProps>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useInfoModal;
