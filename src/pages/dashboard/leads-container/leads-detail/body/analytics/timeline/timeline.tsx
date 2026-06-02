import type { LeadNavigation } from "../../../../../../../types/lead";
import SecsBetween from "../../../../../../../utils/helpers/dashboard/secs-between";

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
          const tag = getTag(ev.view);
          const timeSpent =
            i < navigation.length - 1
              ? SecsBetween(ev.created_at, navigation[i + 1].created_at)
              : null; // el último no tiene "siguiente", tiempo desconocido
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
                  {timeSpent !== null ? ` · ${timeSpent}s` : " · activo"}{" "}
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
