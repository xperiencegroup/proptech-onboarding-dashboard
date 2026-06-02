import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_ROUTES } from "../../config/api";
import { leadStorage } from "../../utils/leadStorage";

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
  dialCode: string;
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
  finishOnboarding: (args?: { skipped?: boolean }) => Promise<void>; // enriquece el lead
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  devtools((set, get) => ({
    currentStep: 1,
    name: "",
    dialCode: "",
    phone: "",
    email: "",
    edad: "",
    familia: "",
    uso: "",
    presupuesto: "",
    subsidio: "",
    interes: "",
    lead: leadStorage.get() ?? null,

    goToStep: (step) => set({ currentStep: step }),
    setField: (key, value) => set({ [key]: value } as Partial<OnboardingState>),

    // Step 1 — crear lead en BD con datos mínimos
    finishStep1: async () => {
      const { name, phone, dialCode, email, lead } = get();
      const fullPhone = `${dialCode}${phone}`;

      // Update lead or save new lead
      if (lead?.lead_id) {
        try {
          const response = await fetch(API_ROUTES.leads.update(lead.lead_id), {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ name, phone: fullPhone, email }),
          });

          const { success } = await response.json();

          if (success) {
            set({ currentStep: 2 });
          }
        } catch (error) {
          console.error("Error al actualizar el lead:", error);
        }
      } else {
        const num = Math.floor(Math.random() * 9000 + 1000);
        const folio = `PT-2026-${num}`;

        try {
          const response = await fetch(API_ROUTES.leads.create, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ name, phone: fullPhone, email, folio }),
          });

          const { data } = await response.json();
          const { id } = data;
          set({
            lead: {
              lead_id: id,
              folio,
              firstName: name.split(" ")[0],
            },
            currentStep: 2,
          });
        } catch (e) {
          console.warn("Error al crear el lead:", e);
        }
      }
    },

    // Step 4 — enriquecer lead con datos de perfil y financiamiento
    finishOnboarding: async ({ skipped = false } = {}) => {
      const state = get();
      if (!state.lead?.lead_id) return;

      // Send Email
      try {
        await fetch(API_ROUTES.leads.email, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.name,
            email: state.email,
            folio: state.lead.folio,
          }),
        });
      } catch (e) {
        console.warn("Error al enviar email:", e);
      }

      // Update lead
      try {
        if (!skipped) {
          await fetch(API_ROUTES.leads.update(state.lead.lead_id), {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              age: state.edad,
              family: state.familia,
              usage: state.uso,
              budget: state.presupuesto,
              subsidy: state.subsidio,
              interest: state.interes,
              status: "complete",
            }),
          });
        }

        leadStorage.save({
          lead_id: state.lead.lead_id!,
          folio: state.lead.folio!,
          firstName: state.lead.firstName,
        });

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
  })),
);
