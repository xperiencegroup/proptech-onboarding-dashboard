import type { LeadNavigation } from "../../../../../../../types/lead";
import SecsBetween from "../../../../../../../utils/helpers/dashboard/secs-between";

function getSectionKey(view: string): string {
  if (view.startsWith("aluna:chat")) return "Chat XP";
  if (view.includes("simulador")) return "Simulador financiero";
  if (view.includes("unidades")) return "Unidades";
  if (view.includes("masterplan")) return "Fachada / Masterplan";
  return view; // fallback: el string crudo
}

function calcTimePcts(navigation: LeadNavigation[]) {
  if (navigation.length < 2) return [];

  // 1. Acumular segundos por sección
  const secsMap: Record<string, number> = {};

  for (let i = 0; i < navigation.length - 1; i++) {
    const view = navigation[i].view;
    const secs = SecsBetween(
      navigation[i].created_at,
      navigation[i + 1].created_at,
    );

    // Agrupa bajo una clave legible
    const section = getSectionKey(view);
    secsMap[section] = (secsMap[section] ?? 0) + secs;
  }

  // 2. Total para calcular porcentajes
  const total = Object.values(secsMap).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  // 3. Convertir a array ordenado por tiempo desc
  return Object.entries(secsMap)
    .map(([section, secs]) => ({
      section,
      secs,
      pct: Math.round((secs / total) * 100),
    }))
    .sort((a, b) => b.secs - a.secs);
}

export default function TimeBars({
  navigation,
}: {
  navigation: LeadNavigation[];
}) {
  const timePcts = calcTimePcts(navigation);
  return (
    <>
      <div className="path-section-title" style={{ marginTop: 28 }}>
        Dónde pasó más tiempo · distribución por sección
      </div>

      {timePcts.length === 0 ? (
        <>
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-6 py-8 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] text-stone-400"
              >
                <path d="M3 3l18 18M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white">
              Sin datos de navegación
            </p>
            <p className="max-w-[260px] text-xs leading-relaxed text-stone-500">
              Este lead aún no ha explorado la plataforma. Las estadísticas
              aparecerán cuando registre su primera sesión.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="time-bars">
            {timePcts.map(({ section, pct }) => (
              <div key={section} className="time-bar-row">
                <div className="time-bar-label">{section}</div>
                <div className="time-bar-track">
                  <div className="time-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="time-bar-value">{pct}%</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
