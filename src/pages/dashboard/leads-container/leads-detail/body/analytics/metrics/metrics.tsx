import type { LeadNavigation } from "../../../../../../../types/lead";
import SecsBetween from "../../../../../../../utils/helpers/dashboard/secs-between";

function calcMetrics(navigation: LeadNavigation[]) {
  if (!navigation.length) return null;

  // ── Sesiones ──────────────────────────────────────────────
  // Una "sesión" = brecha de más de 30 min entre eventos consecutivos
  const SESSION_GAP_MS = 30 * 60 * 1000;
  let sessions = 1;
  for (let i = 1; i < navigation.length; i++) {
    const gap =
      new Date(navigation[i].created_at).getTime() -
      new Date(navigation[i - 1].created_at).getTime();
    if (gap > SESSION_GAP_MS) sessions++;
  }

  // ── Tiempo total ──────────────────────────────────────────
  // Suma de todos los deltas entre eventos consecutivos
  let totalSecs = 0;
  for (let i = 0; i < navigation.length - 1; i++) {
    totalSecs += SecsBetween(
      navigation[i].created_at,
      navigation[i + 1].created_at,
    );
  }
  const totalMin = Math.round(totalSecs / 60);

  // ── Unidades vistas ───────────────────────────────────────
  // Eventos cuyo view contiene "unidad" (ajusta al string real de tu BD)
  const unidades = new Set(
    navigation.filter((ev) => ev.view.includes("unidad")).map((ev) => ev.view), // si cada view tiene el ID de unidad
  ).size;

  // ── Simulaciones ─────────────────────────────────────────
  const simulaciones = navigation.filter((ev) =>
    ev.view.includes("simulador"),
  ).length;

  return { sessions, totalMin, unidades, simulaciones };
}

export default function Metrics({
  navigation,
}: {
  navigation: LeadNavigation[];
}) {
  const m = calcMetrics(navigation);

  const METRICS = m
    ? [
        {
          label: "Sesiones",
          value: String(m.sessions),
          trend: `↑ ${m.sessions} registradas`,
          clickable: false,
        },
        {
          label: "Tiempo total",
          value: `${m.totalMin} min`,
          trend: m.totalMin > 30 ? "Sobre promedio" : "Bajo promedio",
          clickable: false,
        },
        {
          label: "Unidades vistas",
          value: String(m.unidades),
          trend: "Ver comparador",
          clickable: true,
        },
        {
          label: "Simulaciones",
          value: String(m.simulaciones),
          trend: "Ver cotizador",
          clickable: true,
        },
      ]
    : [];
  return (
    <>
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
    </>
  );
}
