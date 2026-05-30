import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Lead, type LeadDetail } from "../../types/lead";
import { FAKE_LEADS } from "../../data/fake-lead-data";

type DashboardState = {
  // Lista — datos livianos
  leads: Lead[];
  fetchLeads: () => Promise<void>;

  // Detalle — datos completos del lead seleccionado
  selectedLead: LeadDetail | null;
  selectLead: (id: string) => void;

  // Id
  selectedLeadId: string;
  selectLeadId: (id: string) => Promise<void>; // hace el fetch del detalle
  clearLead: () => void;

  // Derivados — calculados del store
  enSeguimiento: number;
  cerrados: number;
  pipeline: string;
  conversion: string;
};

export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    // Datos de leads en forma de lista
    leads: [],
    leadsLoading: false,
    enSeguimiento: 0,
    cerrados: 0,
    pipeline: "Q 0M",
    conversion: "0.0",

    fetchLeads: async () => {
      const leads = FAKE_LEADS;

      const cerrados = leads.filter((l) => l.stage === "cerrado").length;
      const enSeguimiento = leads.filter((l) =>
        ["cotizacion", "apartado", "visita"].includes(l.stage),
      ).length;

      const pipeline = leads.reduce((acc, l) => {
        const num = parseFloat(l.value.replace(/[^0-9.]/g, ""));
        const isMillions = l.value.includes("M");
        return acc + (isMillions ? num * 1_000_000 : num * 1_000);
      }, 0);

      set({
        leads,
        enSeguimiento,
        cerrados,
        pipeline: `Q ${(pipeline / 1_000_000).toFixed(1)}M`,
        conversion: `${((cerrados / leads.length) * 100).toFixed(1)}%`,
      });
    },

    selectedLead: null,
    selectLead: async (id) => {
      // Simula fetch
      await new Promise((resolve) => setTimeout(resolve, 300));
      const detail = FAKE_LEADS.find((l) => l.id === id) ?? null;

      set({ selectedLead: detail });
    },

    // Id
    selectedLeadId: "",
    selectLeadId: (id) => set({ selectedLeadId: id }),
    clearLead: () => set({ selectedLeadId: "", selectedLead: null }),
  })),
);
