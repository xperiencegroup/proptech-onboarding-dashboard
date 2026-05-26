import { create } from "zustand";

// Separar los datos del lead en su propio tipo
type LeadData = {
  lead_id: string | null;
  folio: string | null;
  firstName: string;
};

type OnboardingState = {
  // navegación
  currentStep: number;

  // step 1 — obligatorios
  name: string;
  phone: string;
  email: string;

  // step 3 — perfil (chips)
  edad: string;
  familia: string;
  uso: string;

  // step 4 — financiamiento (chips)
  presupuesto: string;
  subsidio: string;
  interes: string;

  // resultado después de completar el onboarding
  lead: LeadData | null;

  // acciones
  goToStep: (step: number) => void;
  setField: (key: string, value: string) => void;
  finishStep1: () => Promise<void>; // crea el lead en BD
  finishOnboarding: () => Promise<void>; // enriquece el lead
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  currentStep: 1,
  name: "",
  phone: "",
  email: "",
  edad: "",
  familia: "",
  uso: "",
  presupuesto: "",
  subsidio: "",
  interes: "",
  lead: null,

  goToStep: (step) => set({ currentStep: step }),
  setField: (key, value) => set({ [key]: value } as Partial<OnboardingState>),

  // Step 1 — crear lead en BD con datos mínimos
  finishStep1: async () => {
    const { name, phone, email } = get();
    const num = Math.floor(Math.random() * 9000 + 1000);
    const folio = `AR-2026-${num}`;

    try {
      // await api.post('/leads', { name, phone, email, folio });
      // const { lead_id } = response.data;

      // por ahora sin BD, simulamos el lead_id
      const lead_id = crypto.randomUUID();

      set({
        lead: {
          lead_id,
          folio,
          firstName: name.split(" ")[0],
        },
        currentStep: 2,
      });
    } catch (e) {
      console.warn("Error al crear el lead:", e);
    }
  },

  // Step 4 — enriquecer lead con datos de perfil y financiamiento
  finishOnboarding: async () => {
    const state = get();
    if (!state.lead?.lead_id) return;

    try {
      // await api.patch(`/leads/${state.lead.lead_id}`, {
      //   edad:        state.edad,
      //   familia:     state.familia,
      //   uso:         state.uso,
      //   presupuesto: state.presupuesto,
      //   subsidio:    state.subsidio,
      //   interes:     state.interes,
      //   status:      'complete',
      // });

      set({ currentStep: 5 });
    } catch (e) {
      console.warn("Error al enriquecer el lead:", e);
    }
  },

  reset: () =>
    set({
      currentStep: 1,
      name: "",
      phone: "",
      email: "",
      edad: "",
      familia: "",
      uso: "",
      presupuesto: "",
      subsidio: "",
      interes: "",
      lead: null,
    }),
}));
