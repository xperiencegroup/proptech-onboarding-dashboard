import "./unit-comparator.css";

type CompCell = {
  value: string;
  cls?: string;
  style?: React.CSSProperties;
};

type CompRow = {
  label: string;
  cells?: CompCell[];
  simCells?: string[];
};

const UNITS = [
  { id: "A 146", type: "Aluna 100", preferred: true },
  { id: "A 155", type: "Aluna 100", preferred: false },
  { id: "A 111", type: "Aluna 90", preferred: false },
];

const ROWS: CompRow[] = [
  {
    label: "Nivel",
    cells: [
      { value: "Sección A · Casa esquina", cls: "comp-value-yellow" },
      { value: "Sec A" },
      { value: "Sec B" },
    ],
  },
  {
    label: "Superficie",
    cells: [
      { value: "100 m²", cls: "comp-value-strong" },
      { value: "138 m²", cls: "comp-value-strong" },
      { value: "98 m²", cls: "comp-value-strong" },
    ],
  },
  {
    label: "Recámaras",
    cells: [{ value: "3 + estudio" }, { value: "3" }, { value: "2" }],
  },
  {
    label: "Vista al cerro",
    cells: [
      { value: "✓ Casa esquina · premium", cls: "comp-check" },
      { value: "✓ Premium", cls: "comp-check" },
      { value: "— Vista interior", cls: "comp-x" },
    ],
  },
  {
    label: "Precio lista",
    cells: [
      { value: "Q 1.21M", cls: "comp-value-yellow" },
      { value: "Q 1.08M", cls: "comp-value-strong" },
      { value: "Q 951k", cls: "comp-value-strong" },
    ],
  },
  {
    label: "Mensualidad · 72m",
    cells: [
      { value: "Q 15k GTQ", cls: "comp-value-yellow" },
      { value: "Q 14k", cls: "comp-value-strong" },
      { value: "Q 12k", cls: "comp-value-strong" },
    ],
  },
  {
    label: "Disponibilidad",
    cells: [
      { value: "⚠ Reservada por 48h", style: { color: "var(--status-warm)" } },
      { value: "Disponible", cls: "comp-check" },
      { value: "Disponible", cls: "comp-check" },
    ],
  },
  {
    label: "Simulaciones cliente",
    simCells: ["A146", "A155", "A111"],
  },
];

export default function UnitComparator() {
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
        {/* Header row */}
        <div className="comp-header-cell" />
        {UNITS.map(({ id, type, preferred }) => (
          <div
            key={id}
            className={`comp-unit-header${preferred ? " preferred" : ""}`}
          >
            <div className={`comp-unit-num${preferred ? " preferred" : ""}`}>
              {id}
            </div>
            <div className="comp-unit-type">{type}</div>
          </div>
        ))}
        <div
          className="comp-unit-header"
          style={{
            background: "transparent",
            borderRight: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-dim)",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
            }}
          >
            + AGREGAR
          </span>
        </div>

        {/* Data rows */}
        {ROWS.map(({ label, cells, simCells }) => (
          <>
            <div key={`h-${label}`} className="comp-header-cell">
              {label}
            </div>
            {simCells
              ? simCells.map((unit) => (
                  <div
                    key={unit}
                    className="comp-cell comp-sims"
                    data-unit={unit}
                    id={`simsFor${unit}`}
                  >
                    <div className="comp-sims-empty">Sin simulaciones</div>
                  </div>
                ))
              : cells?.map((cell, i) => (
                  <div
                    key={i}
                    className={`comp-cell${cell.cls ? ` ${cell.cls}` : ""}`}
                    style={cell.style}
                  >
                    {cell.value}
                  </div>
                ))}
            <div className="comp-cell" />
          </>
        ))}
      </div>
    </div>
  );
}
