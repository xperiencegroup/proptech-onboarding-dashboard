import { useState, useRef, useEffect } from "react";
import { useDashboardStore } from "../../../../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../../../../store/ui/useUIStore";
import "./chat-drawer.css";

type MessageRole = "bot" | "user" | "takeover";

interface ChatMessage {
  id: string;
  role: MessageRole;
  avatar: string;
  text: string;
  time: string;
}

interface ChatEntry {
  id: string;
  session_id: string;
  role: "lead" | "bot";
  content: string;
  created_at: string;
}

const mapChatEntry = (entry: ChatEntry, leadInitials: string): ChatMessage => ({
  id: entry.id,
  role: entry.role === "lead" ? "user" : "bot",
  avatar: entry.role === "lead" ? leadInitials : "M",
  text: entry.content,
  time: new Date(entry.created_at).toLocaleTimeString("es-GT", {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

export default function ChatDrawer() {
  const selectedLead = useDashboardStore((state) => state.selectedLead);
  const chat = selectedLead?.chat as ChatEntry[] | undefined;
  const { isChatOpen, closeChat } = useUIStore();

  const leadName = selectedLead?.name ?? "Lead";
  const leadInitials = selectedLead?.initials ?? "—";

  // Mensajes del backend (derivados, no estado)
  const baseMessages: ChatMessage[] = chat
    ? chat.map((entry) => mapChatEntry(entry, leadInitials))
    : [];

  // Solo los mensajes nuevos del asesor viven en estado
  const [extraMessages, setExtraMessages] = useState<ChatMessage[]>([]);
  const [isTakeover, setIsTakeover] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const prevLeadId = useRef(selectedLead?.id);

  // Resetea extras cuando cambia el lead (sin useEffect)
  if (prevLeadId.current !== selectedLead?.id) {
    prevLeadId.current = selectedLead?.id;
    setExtraMessages([]);
    setIsTakeover(false);
  }

  const allMessages = [...baseMessages, ...extraMessages];

  // Scroll al fondo cuando llegan mensajes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [allMessages.length]);

  const handleTakeover = () => {
    if (isTakeover) return;
    setIsTakeover(true);
    setExtraMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "takeover",
        avatar: "C",
        text: "— Carlos tomó control del chat —",
        time:
          "HOY · " +
          new Date().toLocaleTimeString("es-GT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    ]);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString("es-GT", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setExtraMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: isTakeover ? "takeover" : "bot",
        avatar: "C",
        text,
        time: `HOY · ${now}`,
      },
    ]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  if (!chat) return null;

  return (
    <div className={`chat-drawer ${isChatOpen ? "show" : ""}`} id="chatDrawer">
      {/* Header */}
      <div className="chat-drawer-header">
        <div className="chat-drawer-left">
          <div
            className="chat-msg-avatar"
            style={{
              borderColor: "var(--status-cool)",
              color: "var(--status-cool)",
            }}
          >
            {leadInitials}
          </div>
          <div className="chat-drawer-info">
            <div className="chat-drawer-title">
              <span className="chat-drawer-status" />
              {leadName}
            </div>
            <div className="chat-drawer-sub">Sesión activa · Chat XP</div>
          </div>
        </div>
        <button
          className="chat-drawer-close"
          onClick={closeChat}
          aria-label="Cerrar chat"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Takeover banner */}
      {!isTakeover && (
        <div className="chat-drawer-takeover-banner">
          <div className="takeover-banner-text">
            <strong>El bot está atendiendo</strong> · Puedes tomar control en
            cualquier momento
          </div>
          <button className="takeover-btn" onClick={handleTakeover}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tomar control
          </button>
        </div>
      )}

      {/* Mensajes */}
      <div className="chat-drawer-body" ref={bodyRef}>
        {allMessages.map((msg) =>
          msg.role === "takeover" && msg.text.startsWith("—") ? (
            <div key={msg.id} className="takeover-marker">
              {msg.text}
            </div>
          ) : (
            <div key={msg.id} className={`chat-msg ${msg.role}`}>
              <div
                className="chat-msg-avatar"
                style={
                  msg.role === "bot"
                    ? {
                        borderColor: "var(--xp-yellow)",
                        color: "var(--xp-yellow)",
                      }
                    : msg.role === "takeover"
                      ? {
                          borderColor: "var(--status-won)",
                          color: "var(--status-won)",
                        }
                      : {
                          borderColor: "var(--status-cool)",
                          color: "var(--status-cool)",
                        }
                }
              >
                {msg.avatar}
              </div>
              <div>
                <div className="chat-msg-bubble">{msg.text}</div>
                <div className="chat-msg-time">{msg.time}</div>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Input */}
      <div className="chat-drawer-input">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isTakeover
              ? "Escribe como Carlos..."
              : "Toma control para escribir..."
          }
          disabled={!isTakeover}
        />
        <button
          className="chat-drawer-send"
          onClick={handleSend}
          disabled={!isTakeover || !inputValue.trim()}
          aria-label="Enviar mensaje"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            viewBox="0 0 24 24"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
