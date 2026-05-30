import "./chat-xp-summary.css";

const CHAT_ROWS = [
  {
    type: "pref",
    tag: "Preferencia · alta confianza",
    text: '"Necesitamos 3 recámaras, mi hijo de 14 estudia en el Liceo, queremos algo cerca."',
  },
  {
    type: "intent",
    tag: "Intención de compra",
    text: '"Tenemos crédito BI preautorizado. ¿La entrega es en 2027?"',
  },
  {
    type: "objection",
    tag: "Objeción detectada",
    text: '"El casa esquina nos encanta, pero Q 1.97M se nos pasa. ¿Hay algo similar entre Q 1-12M?"',
  },
];

export default function ChatXPSummary() {
  return (
    <div className="panel chat-xp-panel">
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-dot" />
          Chat XP · Puntos clave
        </div>
        <div className="panel-action">Ver conversación →</div>
      </div>
      <div className="chat-summary">
        {CHAT_ROWS.map(({ type, tag, text }) => (
          <div key={type} className={`chat-row ${type}`}>
            <span className={`chat-row-tag ${type}`}>{tag}</span>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
