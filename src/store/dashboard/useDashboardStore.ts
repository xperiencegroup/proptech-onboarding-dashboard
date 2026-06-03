import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Lead, type LeadDetail, type LeadQuote } from "../../types/lead";
import { API_ROUTES } from "../../config/api";

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

  // Simulación seleccionada
  selectedQuote: LeadQuote | null;
  selectQuote: (quote: LeadQuote | null) => void;

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
    enSeguimiento: 0,
    cerrados: 0,
    pipeline: "Q 0M",
    conversion: "0.0",

    fetchLeads: async () => {
      try {
        const res = await fetch(`${API_ROUTES.leads.list}`);
        const json = await res.json();
        const leads: Lead[] = json.data.map((lead: Lead) => ({
          ...lead,
          initials: lead.name
            .split(" ")
            .slice(0, 2)
            .map((w: string) => w[0])
            .join("")
            .toUpperCase(),
        }));

        const cerrados = leads.filter((l) => l.stage === "cerrado").length;
        const enSeguimiento = leads.filter((l) =>
          ["cotizacion", "apartado", "visita"].includes(l.stage),
        ).length;

        const pipeline = leads.reduce((acc, l) => {
          if (!l.value) return acc; // ← algunos leads pueden no tener value
          const num = parseFloat(l.value.replace(/[^0-9.]/g, ""));
          const isMillions = l.value.includes("M");
          return acc + (isMillions ? num * 1_000_000 : num * 1_000);
        }, 0);

        set({
          leads,
          enSeguimiento,
          cerrados,
          pipeline: `Q ${(pipeline / 1_000_000).toFixed(1)}M`,
          conversion: leads.length
            ? `${((cerrados / leads.length) * 100).toFixed(1)}%`
            : "0%", // ← evita división por cero si no hay leads
        });
      } catch (error) {
        console.error("Error al obtener leads:", error);
      }
    },

    selectedLead: null,
    selectLead: async (id) => {
      try {
        const res = await fetch(API_ROUTES.leads.detail(id));
        const json = await res.json();

        if (!json.success) {
          set({ selectedLead: null });
          return;
        }

        const lead: LeadDetail = {
          ...json.data,
          initials: json.data.name
            .split(" ")
            .slice(0, 2)
            .map((w: string) => w[0])
            .join("")
            .toUpperCase(),
        };

        set({ selectedLead: lead });
      } catch (error) {
        console.error("Error al obtener detalle del lead:", error);
        set({ selectedLead: null });
      }
    },

    // Id
    selectedLeadId: "",
    selectLeadId: (id) => set({ selectedLeadId: id, selectedQuote: null }),
    clearLead: () =>
      set({ selectedLeadId: "", selectedLead: null, selectedQuote: null }),

    // Quotes
    selectedQuote: null,
    selectQuote: (quote) => set({ selectedQuote: quote }),
  })),
);
