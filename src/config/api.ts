export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_ROUTES = {
  leads: {
    create: `${API_URL}/api/v1/leads`,
    update: (id: string) => `${API_URL}/api/v1/leads/${id}`,
    email: `${API_URL}/api/v1/onboardingEmail`,
  },
} as const;
