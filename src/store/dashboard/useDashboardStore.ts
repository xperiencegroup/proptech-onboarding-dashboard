import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Lead } from "../../types/lead";

type DashboardState = {
  // Lista — datos livianos
  leads: Lead[];
  leadsLoading: boolean;
  fetchLeads: () => Promise<void>;

  // Detalle — datos completos del lead seleccionado
  selectedLeadId: string;
  selectLeadId: (id: string) => Promise<void>; // hace el fetch del detalle
  clearLead: () => void;
};

export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    selectedLeadId: "",
    selectLeadId: (id) => set({ selectedLeadId: id }),
    clearLead: () => set({ selectedLeadId: "" }),
  })),
);
