import { useDashboardStore } from "../../../../../../store/dashboard/useDashboardStore";
import type { LeadQuote } from "../../../../../../types/lead";
import "./quoter.css";

const EXAMPLE_QUOTE: LeadQuote = {
  id: "example",
  lot_number: 146,
  modelo: "ALUNA 90",
  area: 89.4,
  precio_lista: 667000,
  modalidad: "lip",
  tasa: 0.0495,
  enganche_pct: 15,
  enganche_monto: 100050,
  financiado: 566950,
  plazo_anios: 20,
  cuota_mensual: 3744,
  generado_en: new Date().toISOString(),
  created_at: new Date().toISOString(),
};

export default function Quoter() {
  const selectedQuote =
    useDashboardStore((state) => state.selectedQuote) ?? EXAMPLE_QUOTE;

  if (!selectedQuote) return null;

  const fmt = (n: number | null) =>
    n !== null
      ? `Q ${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : "—";

  const PARAMS = [
    { label: "Precio de lista", value: fmt(selectedQuote.precio_lista) },
    {
      label: "Modalidad",
      value: selectedQuote.modalidad?.toUpperCase() ?? "—",
    },
    {
      label: `Enganche · ${Number(selectedQuote.enganche_pct)?.toFixed(0) ?? "—"}%`,
      value: fmt(selectedQuote.enganche_monto),
    },
    {
      label: "Tasa anual",
      value:
        selectedQuote.tasa !== null
          ? `${(selectedQuote.tasa * 100).toFixed(2)}%`
          : "—",
    },
    {
      label: "Plazo financiamiento",
      value:
        selectedQuote.plazo_anios !== null
          ? `${selectedQuote.plazo_anios * 12} meses`
          : "—",
    },
  ];

  const SUMMARY = [
    { label: "Precio de lista", amount: fmt(selectedQuote.precio_lista) },
    {
      label: `Enganche · ${Number(selectedQuote.enganche_pct)?.toFixed(0) ?? "—"}%`,
      amount: fmt(selectedQuote.enganche_monto),
    },
    { label: "Saldo a financiar", amount: fmt(selectedQuote.financiado) },
    {
      label: "Mensualidades",
      amount:
        selectedQuote.plazo_anios !== null &&
        selectedQuote.cuota_mensual !== null
          ? `${selectedQuote.plazo_anios * 12} × ${fmt(selectedQuote.cuota_mensual)}`
          : "—",
    },
    {
      label: "Mensualidad",
      amount: fmt(selectedQuote.cuota_mensual),
      total: true,
    },
  ];

  // Amortización
  const r = selectedQuote.tasa !== null ? selectedQuote.tasa / 12 : 0;
  const n =
    selectedQuote.plazo_anios !== null ? selectedQuote.plazo_anios * 12 : 0;
  const cuota = selectedQuote.cuota_mensual ?? 0;

  const startDate = selectedQuote.generado_en
    ? new Date(selectedQuote.generado_en)
    : new Date();

  const AMORT_ROWS = (() => {
    let saldo = selectedQuote.financiado ?? 0;

    return Array.from({ length: Math.min(n, n) }, (_, i) => {
      const fecha = new Date(startDate);
      fecha.setMonth(fecha.getMonth() + i + 1);
      const interes = saldo * r;
      const capital = cuota - interes;
      saldo = Math.max(saldo - capital, 0);

      return {
        num: i + 1,
        fecha: fecha
          .toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })
          .toUpperCase(),
        pago: fmt(cuota),
        saldo: fmt(saldo),
      };
    });
  })();

  return (
    <div className="panel panel-cotizador" id="panelCotizador">
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-dot" />
          {selectedQuote.id === "example"
            ? "Cotización de ejemplo"
            : "Cotizador"}{" "}
          · A {selectedQuote.lot_number} · {selectedQuote.modelo}
        </div>
        <div className="panel-action">Vía Adara API · Ajustar →</div>
      </div>

      <div className="cotizador-grid">
        {/* Parámetros */}
        <div className="cotizador-col">
          <div className="cotizador-col-title">Parámetros</div>
          {PARAMS.map(({ label, value }) => (
            <div key={label} className="cot-input-row">
              <label className="cot-label">{label}</label>
              <input className="cot-input" defaultValue={value} disabled />
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="cotizador-col">
          <div className="cotizador-col-title">Resumen</div>
          {SUMMARY.map(({ label, amount, total }) => (
            <div
              key={label}
              className={`cot-summary-row${total ? " total" : ""}`}
            >
              <span className="cot-summary-label">{label}</span>
              <span className="cot-amount">{amount}</span>
            </div>
          ))}
          <div className="cotizador-actions">
            <button
              className="btn-secondary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Descargar PDF
            </button>
            <button
              className="btn-primery"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Enviar al cliente
            </button>
          </div>
        </div>

        {/* Amortización */}
        <div className="cotizador-col" style={{ padding: 0 }}>
          <div style={{ padding: "18px 20px 0" }}>
            <div className="cotizador-col-title">Tabla de amortización</div>
          </div>
          <div className="cot-amortization-preview">
            <div className="amort-row header">
              <span>#</span>
              <span>Fecha</span>
              <span>Pago</span>
              <span>Saldo</span>
            </div>
            {AMORT_ROWS.map(({ num, fecha, pago, saldo }) => (
              <div key={num} className="amort-row">
                <span>{num}</span>
                <span>{fecha}</span>
                <span>{pago}</span>
                <span>{saldo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
