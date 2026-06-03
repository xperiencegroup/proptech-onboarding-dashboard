import { useEffect } from "react";
import { useDashboardStore } from "../../../../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../../../../store/ui/useUIStore";
import type { LeadDetail } from "../../../../../types/lead";
import "./detail-header.css";

const STAGE_LABELS = {
  cotizacion: "Cotización",
  apartado: "Apartado",
  cerrado: "Cerrado",
  visita: "Visita",
  prospecto: "Prospecto",
};

const getIdentityFields = (lead: LeadDetail) => [
  {
    label: "TELÉFONO",
    value: lead.phone,
    mono: true,
    icon: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72" />
    ),
  },
  {
    label: "CORREO",
    value: lead.email,
    mono: true,
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 6l-10 7L2 6" />
      </>
    ),
  },
  {
    label: "FUENTE",
    value: lead.detailed_source,
    source: lead.source,
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
  {
    label: "PRIMER CONTACTO",
    value: lead.created_at,
    mono: true,
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M3 10h18" />
      </>
    ),
  },
  {
    label: "ACTIVIDAD",
    value: lead.times_visited,
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  {
    label: "PERFIL",
    value: lead.age ?? "—",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </>
    ),
  },
  {
    label: "FAMILIA",
    value: lead.family ?? "—",
    icon: (
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    ),
  },
  {
    label: "ETAPA",
    value: STAGE_LABELS[lead.stage],
    style: { color: "var(--xp-yellow)", fontWeight: 600 },
    icon: (
      <polygon points="12 2 15 9 22 9 17 14 19 22 12 17 5 22 7 14 2 9 9 9 12 2" />
    ),
  },
  {
    label: "USO DE LA CASA",
    value: lead.usage ?? "—",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
  },
  {
    label: "PRESUPUESTO",
    value: lead.budget ?? "—",
    mono: true,
    icon: (
      <>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </>
    ),
  },
  {
    label: "SUBSIDIO FHA/LIP",
    value: lead.subsidy ?? "—",
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    label: "INTERÉS DECLARADO",
    value: lead.interest ?? "—",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </>
    ),
  },
];

export default function DetailHeader() {
  const clearLead = useDashboardStore((state) => state.clearLead);
  const selectedLead = useDashboardStore((state) => state.selectedLead);
  const { isClientMode, toggleClientMode } = useUIStore();
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);
  const toggleChat = useUIStore((state) => state.toggleChat);

  useEffect(() => {
    if (selectedLeadId) {
      document.querySelector(".face-back")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [selectedLeadId]);

  if (!selectedLead) return null;

  const fields = getIdentityFields(selectedLead);

  const handleBack = () => {
    if (isClientMode) toggleClientMode();
    clearLead();
  };

  return (
    <>
      <div className="detail-nav">
        <button onClick={handleBack} className="detail-nav-btn">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span>Pipeline</span>
        <span style={{ color: "var(--text-low)" }}>/</span>
        <span className="detail-nav-pos">Lead 1 de 7</span>
      </div>

      <div className="detail-head-row">
        <div className="detail-name-block">
          <div className="detail-avatar">
            {selectedLead.initials}
            <div className="detail-avatar-live" />
          </div>
          <div className="detail-name-info">
            <div className="detail-folio">FOLIO · {selectedLead.folio}</div>
            <div className="detail-name">
              {selectedLead.name}
              <span className="detail-name-live">EN LÍNEA</span>
            </div>
            <div className="identity-grid">
              {fields.map(({ label, value, mono, source, style, icon }) => (
                <div className="identity-field" key={label}>
                  <div className="identity-label">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      {icon}
                    </svg>
                    {label}
                  </div>
                  <div
                    className={`identity-value${mono ? " mono" : ""}${source ? " source" : ""}`}
                    style={style}
                  >
                    {source && <span className={`source-dot ${source}`} />}
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="score-badge-big">
          <div className="label">Score · {selectedLead.stage}</div>
          <div className="num">100</div>
          <div className="desc">Alta intención</div>
        </div>
      </div>

      {/* <!-- ACTION BAR — 4 buttons grouped --> */}
      <div className="action-bar">
        <div className="action-group">
          <span className="action-group-label">Contacto</span>
          <button className="btn-chat-takeover" onClick={toggleChat}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              viewBox="0 0 24 24"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
            </svg>
            Chat XP en vivo
            <span className="takeover-badge">3</span>
          </button>
          <button className="btn-whatsapp" title="Enviar WhatsApp">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.5 14.4l-2.2-1.1c-.3-.1-.6-.1-.8.2l-.7.9c-.2.2-.4.3-.7.2-.9-.3-1.9-1-2.6-1.7-.7-.7-1.4-1.7-1.7-2.6-.1-.3 0-.5.2-.7l.9-.7c.3-.2.4-.5.2-.8L9 4.9c-.2-.4-.6-.5-1-.4-1 .3-1.8 1.1-2 2.1-.2 1.6.5 4 3 6.5s4.9 3.2 6.5 3c1-.2 1.8-1 2.1-2 .1-.4-.1-.8-.5-1zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1.2 4.7L2 22l5.4-1.2c1.4.8 3 1.2 4.6 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
            </svg>
            WhatsApp
          </button>
          <button className="btn-email" title="Enviar correo">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
            </svg>
            Correo
          </button>
        </div>
        <div className="action-group">
          <span className="action-group-label">CRM</span>
          <button className="btn-primery">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            Enviar a HubSpot
          </button>
        </div>
        <div className="action-group">
          <span className="action-group-label">Reporte</span>
          <button className="btn-analysis">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Experience Analysis
          </button>
        </div>
      </div>
    </>
  );
}
