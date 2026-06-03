import { useEffect } from "react";
import { socket } from "../lib/socket";

// Refresca la lista de leads cuando hay cambios
export function useLeadsSocket(onUpdate: () => void) {
  useEffect(() => {
    socket.on("leads:updated", onUpdate);
    return () => {
      socket.off("leads:updated", onUpdate);
    };
  }, [onUpdate]);
}

// Escucha eventos en tiempo real del lead seleccionado
export function useLeadSocket(
  leadId: string | null,
  onNavigation: (data: unknown) => void,
  onChat: (data: unknown) => void,
  onQuote: (data: unknown) => void,
) {
  useEffect(() => {
    if (!leadId) return;

    socket.emit("join:lead", leadId);
    socket.on("lead:navigation", onNavigation);
    socket.on("lead:chat", onChat);
    socket.on("lead:quote", onQuote);

    return () => {
      socket.emit("leave:lead", leadId);
      socket.off("lead:navigation", onNavigation);
      socket.off("lead:chat", onChat);
      socket.off("lead:quote", onQuote);
    };
  }, [leadId]);
}
