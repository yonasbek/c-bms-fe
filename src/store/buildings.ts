// store/buildings.ts
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export interface Building {
  id: string;
  name: string;
  address?: string;
  status: string;
}

interface BuildingStore {
  buildings: Building[];
  activeBuilding: Building | null;
  setActiveBuilding: (buildingId: string) => void;
  addBuilding: (building: Omit<Building, 'id'>) => void;
}



export const useBuildingStore = create<BuildingStore>((set, get) => ({
  // Pre-populate with a few example buildings
  buildings: [
    {
      id: 'building-id-1',
      name: 'Frendship Tower',
      address: 'Bole Airport Road',
      status: 'active',
    },
    {
      id: 'building-id-2',
      name: 'Edna Mall',
      address: 'Bole Medhane Alem',
      status: 'active',
    },
  ],
  activeBuilding: null,
  
  // Set the active building based on its ID
  setActiveBuilding: (buildingId: string) => {
    const building = get().buildings.find((b) => b.id === buildingId) || null;
    set({ activeBuilding: building });
  },
  
  // Add a new building to the store
  addBuilding: (building) => {
    const newBuilding = { ...building, id: nanoid() };
    set((state) => ({
      buildings: [...state.buildings, newBuilding],
    }));
  },
}));
