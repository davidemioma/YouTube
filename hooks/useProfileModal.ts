import { create } from "zustand";

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

const useProfileModal = create<ModalProps>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useProfileModal;
