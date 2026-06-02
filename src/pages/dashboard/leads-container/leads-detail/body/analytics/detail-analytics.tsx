// XperienceAnalytics.tsx
import "./detail-analytics.css";
import { useDashboardStore } from "../../../../../../store/dashboard/useDashboardStore";
import type { LeadNavigation } from "../../../../../../types/lead";

function getIcon(view: string) {
  if (view === "aluna:chat:open")
    return (
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    );
  if (view.includes("guided-nav:on"))
    return <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3" />;
  if (view.includes("guided-nav:off"))
    return (
      <>
        <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </>
    );
  if (view.startsWith("aluna:"))
    return (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    );
  return (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 10h18" />
    </>
  );
}

function formatLabel(view: string) {
  if (view === "aluna:chat:open") return "Abrió el chat";
  if (view === "aluna:chat:guided-nav:on") return "Navegación guiada activada";
  if (view === "aluna:chat:guided-nav:off")
    return "Navegación guiada desactivada";
  if (view.startsWith("aluna:"))
    return view.replace("aluna:", "").replace(/:/g, " · ");
  return view;
}

function getTag(view: string) {
  if (view.startsWith("aluna:")) return { label: "Chat XP", type: "chat" };
  return null;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function secsBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 1000);
}

function NavigationPath({ navigation }: { navigation: LeadNavigation[] }) {
  if (!navigation.length)
    return (
      <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
        Sin eventos de navegación.
      </p>
    );

  const totalSecs = secsBetween(
    navigation[0].created_at,
    navigation[navigation.length - 1].created_at,
  );

  return (
    <>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "var(--text-dim)",
          marginBottom: 14,
          letterSpacing: "0.12em",
        }}
      >
        {navigation.length} eventos · sesión de {totalSecs}s ·{" "}
        {formatTime(navigation[0].created_at)} –{" "}
        {formatTime(navigation[navigation.length - 1].created_at)}
      </div>
      <div className="path">
        {navigation.map((ev, i) => {
          const tag = getTag(ev.view);
          const delta =
            i > 0
              ? secsBetween(navigation[i - 1].created_at, ev.created_at)
              : null;
          const isLast = i === navigation.length - 1;

          return (
            <div key={ev.id} className={`path-step${isLast ? " now" : ""}`}>
              <div className="path-step-header">
                <div className="path-step-title">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    {getIcon(ev.view)}
                  </svg>
                  {formatLabel(ev.view)}
                </div>
                <div className="path-step-time">
                  {formatTime(ev.created_at)}
                  {delta !== null && ` · +${delta}s`}
                </div>
              </div>
              {tag && (
                <span className={`path-step-tag ${tag.type}`}>{tag.label}</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

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
  const selectedLead = useDashboardStore((state) => state.selectedLead);

  if (!selectedLead) return null;

  const navigation = selectedLead.navigation ?? [];

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

      {/* Path real desde BD */}
      <div className="path-section-title">
        Path del cliente · cómo navegó la plataforma
      </div>
      <NavigationPath navigation={navigation} />

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
