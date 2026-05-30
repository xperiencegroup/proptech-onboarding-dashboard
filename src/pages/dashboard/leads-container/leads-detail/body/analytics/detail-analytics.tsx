import "./detail-analytics.css";

const METRICS = [
  { label: "Sesiones", value: "5", trend: "↑ 2 esta semana", clickable: false },
  {
    label: "Tiempo total",
    value: "42 min",
    trend: "Sobre promedio",
    clickable: false,
  },
  {
    label: "Unidades vistas",
    value: "9",
    trend: "Ver comparador",
    clickable: true,
  },
  {
    label: "Simulaciones",
    value: "5",
    trend: "Ver cotizador",
    clickable: true,
  },
];

const PATH_STEPS = [
  {
    title: "Entró por Meta Ads · campaña",
    time: "12 ABR · 18:42",
    detail:
      "Primera vez en la plataforma. Click directo desde Instagram en anuncio del proyecto.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
  {
    title: "Exploró fachada principal",
    duration: "2:14 MIN",
    time: "12 ABR · 18:42 — 18:44",
    detail:
      "Recorrió ángulos cenitales y vista a calle. Hizo zoom en niveles 4 y 5.",
    icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />,
  },
  {
    title: "Activó Chat XP",
    time: "12 ABR · 18:44",
    detail: "Primera interacción con el asistente.",
    quote: "Hola, ¿qué tipologías tienen disponibles con vista al cerro?",
    tag: "CHAT XP",
    tagType: "chat",
    icon: (
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    ),
  },
  {
    title: "Tour 360° · Alberca infinita",
    duration: "4:15 MIN",
    time: "12 ABR · 18:45 — 18:49",
    detail:
      'Bot le sugirió la amenidad después de mencionar "vista al cerro". Permaneció el mayor tiempo de la sesión aquí.',
    tag: "SUGERIDO POR BOT",
    icon: (
      <>
        <path d="M22 12s-3 7-10 7-10-7-10-7 3-7 10-7 10 7 10 7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Aluna 100 ·",
    duration: "6:32 MIN",
    time: "14 ABR · 20:11 — 20:18",
    detail:
      "2da sesión. Exploró planos, video tour interior, vistas desde balcón y acabados de cocina.",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="1" />
        <path d="M5 11V7a4 4 0 014-4h6a4 4 0 014 4v4" />
      </>
    ),
  },
  {
    title: "Simulación financiera · A 146 a 60 meses",
    time: "14 ABR · 20:19",
    detail: "Primera simulación. Mensualidad calculada: Q 18k GTQ.",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    title: "Volvió a Chat XP · preguntó por precios",
    time: "14 ABR · 20:20",
    quote: "¿Hay alguna unidad similar entre Q 1 y Q 1 millones?",
    tag: "CHAT XP",
    tagType: "chat",
    icon: (
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    ),
  },
  {
    title: "Comparó A 146 vs A 155",
    duration: "3:48 MIN",
    time: "22 ABR · 19:30",
    detail:
      "3ra sesión. Activó comparador y simuló ambas unidades a 60 y 72 meses.",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="1" />
        <path d="M5 11V7a4 4 0 014-4h6a4 4 0 014 4v4" />
      </>
    ),
  },
  {
    title: "Solicitó cita presencial",
    time: "22 ABR · 19:34",
    detail: "Agendó visita al showroom para Jueves 30 ABR · 11:00 AM.",
    tag: "ACCIÓN DE CONVERSIÓN",
    tagType: "action",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M3 10h18" />
      </>
    ),
  },
  {
    title: "Sesión activa · explorando A 146 ahora",
    time: "HOY · 14:20 — en curso",
    detail:
      "Volvió a la plataforma. Está navegando entre A 146 y simulación a 72 meses. Chat XP detectó 3 mensajes nuevos sin atender.",
    tag: "CHAT XP · 3 MENSAJES NUEVOS",
    tagType: "chat",
    now: true,
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="10" />
      </>
    ),
  },
];

const TIME_BARS = [
  {
    label: "Alberca infinita",
    pct: 32,
    icon: (
      <>
        <path d="M22 12s-3 7-10 7-10-7-10-7 3-7 10-7 10 7 10 7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    label: "Tipologías 3R",
    pct: 24,
    icon: (
      <>
        <rect x="3" y="11" width="18" height="10" rx="1" />
        <path d="M5 11V7a4 4 0 014-4h6a4 4 0 014 4v4" />
      </>
    ),
  },
  {
    label: "Simulador financiero",
    pct: 18,
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    label: "Chat XP",
    pct: 12,
    icon: (
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    ),
  },
  {
    label: "Fachada / Masterplan",
    pct: 9,
    icon: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />,
  },
  {
    label: "Otros",
    pct: 5,
    dim: true,
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
      </>
    ),
  },
];

export default function XperienceAnalytics() {
  return (
    <div className="panel panel-analytics">
      <div className="panel-header">
        <div className="panel-title featured">
          <span className="panel-title-dot" />
          Xperience Analytics
          <span className="panel-title-flag">Xperience</span>
        </div>
        <div className="panel-action">Sesión completa →</div>
      </div>

      {/* Métricas */}
      <div className="activity-grid">
        {METRICS.map(({ label, value, trend, clickable }) => (
          <div
            key={label}
            className={`activity-cell${clickable ? " clickable" : ""}`}
          >
            <div className="activity-label">{label}</div>
            <div className="activity-value">{value}</div>
            <div className="activity-trend">{trend}</div>
          </div>
        ))}
      </div>

      {/* Path */}
      <div className="path-section-title">
        Path del cliente · cómo navegó la plataforma
      </div>
      <div className="path">
        {PATH_STEPS.map(
          (
            { title, duration, time, detail, quote, tag, tagType, now, icon },
            i,
          ) => (
            <div key={i} className={`path-step${now ? " now" : ""}`}>
              <div className="path-step-header">
                <div className="path-step-title">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {icon}
                  </svg>
                  {title}
                  {duration && (
                    <span className="path-step-duration">{duration}</span>
                  )}
                </div>
                <div className="path-step-time">{time}</div>
              </div>
              {detail && <div className="path-step-detail">{detail}</div>}
              {quote && <div className="path-step-quote">"{quote}"</div>}
              {tag && (
                <span
                  className={`path-step-tag${tagType ? ` ${tagType}` : ""}`}
                >
                  {tag}
                </span>
              )}
            </div>
          ),
        )}
      </div>

      {/* Time bars */}
      <div className="path-section-title" style={{ marginTop: 28 }}>
        Dónde pasó más tiempo · distribución por sección
      </div>
      <div className="time-bars">
        {TIME_BARS.map(({ label, pct, dim, icon }) => (
          <div key={label} className="time-bar-row">
            <div className="time-bar-label">
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
            <div className="time-bar-track">
              <div
                className="time-bar-fill"
                style={{
                  width: `${pct}%`,
                  ...(dim ? { background: "var(--text-low)" } : {}),
                }}
              />
            </div>
            <div
              className="time-bar-value"
              style={dim ? { color: "var(--text-dim)" } : {}}
            >
              {pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
