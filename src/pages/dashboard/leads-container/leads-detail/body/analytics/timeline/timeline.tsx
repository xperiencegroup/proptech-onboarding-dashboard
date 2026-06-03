import type { LeadNavigation } from "../../../../../../../types/lead";
import SecsBetween from "../../../../../../../utils/helpers/dashboard/secs-between";

// Icóno dependiendo el tipo de acción que se realizó
function getIcon(view: string) {
  if (view === "aluna:chat:open")
    return (
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    );
  if (view === "aluna:chat:close")
    return (
      <>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
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
  // rutas "/"
  return <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />;
}

function getSubMessage(view: string): string | null {
  if (view.startsWith("aluna:chat:quick-suggestion:")) {
    const parts = view.split(":");
    // formato: aluna:chat:quick-suggestion:{mensaje}
    const suggestion = parts.slice(3, -1).join(":");
    return suggestion;
  }
  return null;
}

const ROUTE_LABELS: Record<string, string> = {
  "/ubicacion": "Visitó la sección de ubicación",
  "/disponibilidades": "Exploró el mapa de disponibilidades",
  "/masterplan": "Vio el masterplan",
  "/amenidades": "Revisó las amenidades",
  "/inicio": "Visitó la página de inicio",
  "/planodeconjunto": "Exploró el plano de conjunto",
};

function formatLabel(view: string, lote?: string | null) {
  if (view === "aluna:chat:open") return "Abrió el chat";
  if (view === "aluna:chat:close") return "Cerró el chat";
  if (view === "aluna:chat:guided-nav:on") return "Navegación guiada activada";
  if (view === "aluna:chat:guided-nav:off")
    return "Navegación guiada desactivada";
  if (view.startsWith("aluna:chat:quick-suggestion:")) {
    return `Interactuó con el asistente`;
  }
  if (view.startsWith("aluna:"))
    return view.replace("aluna:", "").replace(/:/g, " · ");

  // rutas "/"
  const base = ROUTE_LABELS[view] ?? `Visitó ${view}`;
  if (lote) return `${base} · Exploró A ${lote}`;
  return base;
}

function getTag(view: string, lote?: string | null) {
  if (lote) return { label: `Lote ${lote}`, type: "chat" };
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

export default function Timeline({
  navigation,
}: {
  navigation: LeadNavigation[];
}) {
  if (!navigation.length)
    return (
      <div className="flex items-center gap-2 py-4 text-stone-400">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-xs italic">Sin eventos de navegación.</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    );

  const totalSecs = SecsBetween(
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
          const tag = getTag(ev.view, ev.lote);
          const subMessage = getSubMessage(ev.view);
          const timeSpent =
            i < navigation.length - 1
              ? SecsBetween(ev.created_at, navigation[i + 1].created_at)
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
                  {formatLabel(ev.view, ev.lote)}
                </div>
                <div className="path-step-time">
                  {formatTime(ev.created_at)}
                  {timeSpent !== null ? ` · ${timeSpent}s` : " · activo"}
                </div>
              </div>

              {/* Submensaje de quick suggestion */}
              {subMessage && (
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  className="my-[0.5vw] px-[1vw] py-[1vh] border-l-2 border-yellow text-[.75rem] italic text-white/90 bg-deep"
                >
                  "{subMessage}"
                </div>
              )}

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
