import { useState } from "react";
import "./chat.css";

function ChatButton({
  open,
  toggleChat,
}: {
  toggleChat: () => void;
  open: boolean;
}) {
  return (
    <div
      className={`aluna-chat-fab ${open === false ? "" : "opacity-0 pointer-events-none"}`}
      id="alunaChatFab"
      onClick={toggleChat}
    >
      <div className="aluna-chat-fab-pulse"></div>
      <span className="aluna-chat-fab-badge" id="alunaChatBadge">
        1
      </span>
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    </div>
  );
}

function ChatDrawer({
  toggleChat,
  open,
}: {
  toggleChat: () => void;
  open: boolean;
}) {
  const alunaChatQuickSend = (text: string) => {
    console.log("enviado", text);
  };

  const alunaChatSend = () => {
    console.log("chat enviado");
  };
  return (
    <div
      className={`aluna-chat-drawer ${open === true ? "open" : ""}`}
      id="alunaChatDrawer"
    >
      <div className="aluna-chat-header">
        <div className="aluna-chat-avatar">XP</div>
        <div className="aluna-chat-h-info">
          <div className="aluna-chat-h-name">Chat XP</div>
          <div className="aluna-chat-h-status">
            Asistente Aluna · respondiendo
          </div>
        </div>
        <div className="aluna-chat-close" onClick={toggleChat}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      </div>
      <div className="aluna-chat-body" id="alunaChatBody">
        {/* <!-- Mensajes inyectados por JS --> */}
      </div>
      <div className="aluna-chat-quick" id="alunaChatQuick">
        <div
          className="aluna-chat-quick-chip"
          onClick={() => alunaChatQuickSend("¿Dónde está Aluna?")}
        >
          ¿Dónde está?
        </div>
        <div
          className="aluna-chat-quick-chip"
          onClick={() => alunaChatQuickSend("Quiero ver los modelos")}
        >
          Ver modelos
        </div>
        <div
          className="aluna-chat-quick-chip"
          onClick={() => alunaChatQuickSend("¿Qué amenidades tiene?")}
        >
          Amenidades
        </div>
        <div
          className="aluna-chat-quick-chip"
          onClick={() => alunaChatQuickSend("¿Cuánto cuesta?")}
        >
          Precios
        </div>
        <div
          className="aluna-chat-quick-chip"
          onClick={() => alunaChatQuickSend("Quiero ver la disponibilidad")}
        >
          Disponibilidad
        </div>
      </div>
      <div className="aluna-chat-input-wrap">
        <input
          type="text"
          className="aluna-chat-input"
          id="alunaChatInput"
          placeholder="Escribe tu pregunta..."
          onKeyDown={(e) => {
            if (e.key === "Enter") return alunaChatSend();
          }}
        />
        <button className="aluna-chat-send" onClick={alunaChatSend}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      <div className="aluna-chat-disclaimer">
        Aluna Residencial · información orientativa
      </div>
    </div>
  );
}

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  console.log(isChatOpen);

  return (
    <>
      <ChatDrawer open={isChatOpen} toggleChat={toggleChat} />
      <ChatButton open={isChatOpen} toggleChat={toggleChat} />
    </>
  );
}
