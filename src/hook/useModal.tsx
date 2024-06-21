import { create } from "zustand";
import { CourtColumns, CourtGroupColumns, UserColumn } from "../../type";

export type ModalStyle =
    | "EditUserForm"
    | "DeleteUserForm"
    | "EditCourtGroupForm";

interface ModalData {
    user?: UserColumn;
    courtGroup?: CourtGroupColumns;
    court?: CourtColumns;
}

interface ModalStore {
    type: ModalStyle | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalStyle, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
