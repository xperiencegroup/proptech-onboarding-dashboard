import { useDashboardStore } from "../../../../../../store/dashboard/useDashboardStore";
import "./unit-comparator.css";
import aluna_lotes from "../../../../../../data/aluna_lotes_etapas.json";

function formatStatus(status: string) {
  if (status === "for_sale") return { label: "Disponible", cls: "comp-check" };
  if (status === "reserved")
    return { label: "⚠ Reservada", style: { color: "var(--status-warm)" } };
  if (status === "locked_sale") return { label: "Bloqueada", cls: "comp-x" };
  return { label: status };
}

function formatStage(stage_id: number) {
  return `Etapa ${stage_id}`;
}

export default function UnitComparator() {
  const selectedLead = useDashboardStore((state) => state.selectedLead);
  const quotes = selectedLead?.quotes ?? [];

  if (!quotes.length)
    return (
      <div className="panel panel-comparator" id="panelComparator">
        <div className="panel-header">
          <div className="panel-title featured">
            <span className="panel-title-dot" />
            Comparador de unidades
            <span className="panel-title-flag">Xperience</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-stone-400"
            >
              <path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3" />
              <path d="M9 15h3l8.5-8.5a1.5 1.5 0 00-3-3L9 12v3" />
              <path d="M16 5l3 3" />
            </svg>
          </div>
          <p className="text-sm font-medium text-white">
            Sin cotizaciones registradas
          </p>
          <p className="max-w-[260px] text-xs leading-relaxed text-stone-500">
            Este lead aún no ha simulado ninguna unidad. Las cotizaciones
            aparecerán aquí cuando use el simulador financiero.
          </p>
        </div>
      </div>
    );

  return (
    <div className="panel panel-comparator" id="panelComparator">
      <div className="panel-header">
        <div className="panel-title featured">
          <span className="panel-title-dot" />
          Comparador de unidades
          <span className="panel-title-flag">Xperience</span>
        </div>
        <div className="panel-action">Agregar unidad +</div>
      </div>

      <div className="comparator-grid">
        {/* Columna de labels */}
        <div className="comp-col-labels">
          <div className="comp-unit-header h-full max-h-[81.4px] shrink-0" />
          {/* celda vacía arriba */}
          <div className="comp-header-cell">Nivel</div>
          <div className="comp-header-cell">Superficie</div>
          <div className="comp-header-cell">Recámaras</div>
          <div className="comp-header-cell">Vista al cerro</div>
          <div className="comp-header-cell">Precio lista</div>
          <div className="comp-header-cell">Mensualidad 72M</div>
          <div className="comp-header-cell">Disponibilidad</div>
          <div className="comp-header-cell">Simulaciones cliente</div>
        </div>

        {/* Una columna por quote */}
        {quotes.map((q, i) => {
          const lot =
            aluna_lotes[String(q.lot_number) as keyof typeof aluna_lotes];
          const status = formatStatus(lot?.status ?? "");

          return (
            <div key={q.id} className="comp-col">
              <div className={`comp-unit-header${i === 0 ? " preferred" : ""}`}>
                <div className={`comp-unit-num${i === 0 ? " preferred" : ""}`}>
                  Lote {q.lot_number}
                </div>
                <div className="comp-unit-type">{q.modelo}</div>
              </div>

              {/* Nivel — del JSON */}
              <div className="comp-cell">
                {lot ? formatStage(lot.stage_id) : "—"}
              </div>

              {/* Superficie — del JSON (más preciso que el quote) */}
              <div className="comp-cell comp-value-strong">
                {lot ? `${lot.area} m²` : `${q.area} m²`}
              </div>

              {/* Recámaras — no disponible */}
              <div className="comp-cell comp-x">—</div>

              {/* Vista al cerro — no disponible */}
              <div className="comp-cell comp-x">—</div>

              {/* Precio lista — del quote */}
              <div className="comp-cell comp-value-yellow">
                ${Number(q.precio_lista).toLocaleString("es-MX")}
              </div>

              {/* Mensualidad 72M — del quote (plazo real, no fijo) */}
              <div className="comp-cell comp-value-yellow">
                ${Number(q.cuota_mensual).toLocaleString("es-MX")} ·{" "}
                {q.plazo_anios}a
              </div>

              {/* Disponibilidad — del JSON */}
              <div
                className={`comp-cell${status.cls ? ` ${status.cls}` : ""}`}
                style={status.style}
              >
                {status.label}
              </div>

              {/* Simulaciones — del quote */}
              <div className="comp-cell comp-value-strong">{q.id}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
