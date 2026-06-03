export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const WS_URL =
  import.meta.env.VITE_RAILWAY_URL || "http://localhost:3000";

export const API_ROUTES = {
  leads: {
    // onboarding
    create: `${API_URL}/api/v1/lead`,
    update: (id: string) => `${API_URL}/api/v1/lead/${id}`,
    email: `${API_URL}/api/v1/onboardingEmail`,

    // dashboard
    list: `${API_URL}/api/v1/leads`,
    detail: (id: string) => `${API_URL}/api/v1/leads/${id}`,
  },
} as const;
