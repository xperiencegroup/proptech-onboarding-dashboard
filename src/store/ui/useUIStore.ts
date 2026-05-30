import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Stage } from "../../types/lead";

type StageFilter = Stage | "todos";

interface UIState {
  // Vista
  isClientMode: boolean;

  // Filtrador
  searchQuery: string;
  activeStage: StageFilter;

  // Alertas
  isAlertsOpen: boolean;

  // Chat XP drawer
  isChatOpen: boolean;

  // Acciones
  toggleClientMode: () => void;
  setSearchQuery: (query: string) => void;
  setActiveStage: (stage: StageFilter) => void;
  toggleAlerts: () => void;
  closeAlerts: () => void;
  toggleChat: () => void;
  closeChat: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isClientMode: false,
      searchQuery: "",
      activeStage: "todos",
      isAlertsOpen: false,
      isChatOpen: false,

      toggleClientMode: () =>
        set((state) => {
          const goingToClient = !state.isClientMode;
          if (goingToClient) {
            setTimeout(() => {
              document
                .querySelector(".panel-comparator")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 300);
          }
          return { isClientMode: goingToClient };
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),
      setActiveStage: (stage) => set({ activeStage: stage }),

      toggleAlerts: () =>
        set((state) => ({
          isAlertsOpen: !state.isAlertsOpen,
          isChatOpen: false, // cierra el chat si estaba abierto
        })),

      closeAlerts: () => set({ isAlertsOpen: false }),

      toggleChat: () =>
        set((state) => ({
          isChatOpen: !state.isChatOpen,
          isAlertsOpen: false, // cierra alertas si estaban abiertas
        })),

      closeChat: () => set({ isChatOpen: false }),
    }),
    { name: "UIStore" },
  ),
);
