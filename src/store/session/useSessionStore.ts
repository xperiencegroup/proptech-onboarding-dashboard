import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SessionState {
  // Identidad
  userId: string;
  name: string;
  email: string;
  avatarInitials: string;
  role: "Asesor";

  // Estado de auth
  isLoggedIn: boolean;

  // Acciones
  setSession: (
    data: Partial<Omit<SessionState, "setSession" | "clearSession">>,
  ) => void;
  clearSession: () => void;
}

const initialState = {
  userId: "",
  name: "",
  email: "",
  avatarInitials: "",
  role: "Asesor" as const,
  isLoggedIn: false,
};

export const useSessionStore = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setSession: (data) => set(data),

        clearSession: () => set(initialState),
      }),
      {
        name: "aluna-session",
        partialize: (state) => ({
          userId: state.userId,
          name: state.name,
          email: state.email,
          avatarInitials: state.avatarInitials,
          role: state.role,
        }),
      },
    ),
    { name: "SessionStore" },
  ),
);
