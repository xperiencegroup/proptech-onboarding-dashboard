import "./contracts.css";

type ContractStatus = "draft" | "signed" | "pending";

const CONTRACTS: {
  title: string;
  meta: string;
  status: ContractStatus;
  statusLabel: string;
}[] = [
  {
    title: "Cotización formal · A146 · 72 meses",
    meta: "Generado 26 ABR · 14:22 · Vía Adara · Borrador",
    status: "draft",
    statusLabel: "Borrador",
  },
  {
    title: "Cotización · A155 · 25 años",
    meta: "Generado 22 ABR · Enviada por email",
    status: "pending",
    statusLabel: "Vista 2 veces",
  },
  {
    title: "Aviso de privacidad · firmado",
    meta: "14 ABR · TRATO + Digid",
    status: "signed",
    statusLabel: "Firmado",
  },
];

const FileIcon = () => (
  <svg fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

export default function Contracts() {
  return (
    <div className="panel contracts-panel" style={{ gridColumn: "1 / -1" }}>
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-dot" />
          Documentos · contratos
        </div>
        <button
          className="btn-secondary"
          style={{ padding: "8px 14px", fontSize: "0.7rem" }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Generar nuevo
        </button>
      </div>
      <div className="contract-list">
        {CONTRACTS.map(({ title, meta, status, statusLabel }) => (
          <div key={title} className="contract-item">
            <div className="contract-icon">
              <FileIcon />
            </div>
            <div className="contract-info">
              <div className="contract-title">{title}</div>
              <div className="contract-meta">{meta}</div>
            </div>
            <span className={`contract-status ${status}`}>{statusLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
