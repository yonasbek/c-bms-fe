// store/buildings.ts
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export interface Modal {
  
  
  isOpen: boolean;
  name: string;
  
}

interface ModalStore {
    modal: Modal;
  setIsOpen: (isOpen: boolean) => void;
    setName: (name: string) => void;
  
}



export const useModalStore = create<ModalStore>((set, get) => ({
    modal: {
        isOpen: false,
        name: '',
    },
    setIsOpen: (isOpen: boolean) => {
        set((state) => ({
        modal: { ...state.modal, isOpen },
        }));
    },
    setName: (name: string) => {
        set((state) => ({
        modal: { isOpen:true, name },
        }));
    },
 
}));
