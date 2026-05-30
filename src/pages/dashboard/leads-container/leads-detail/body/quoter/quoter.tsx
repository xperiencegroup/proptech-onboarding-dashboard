import "./quoter.css";

const PARAMS = [
  { label: "Precio de lista", value: "Q 1.21M GTQ" },
  { label: "Descuento aplicado", value: "0.00%" },
  { label: "Apartado", value: "Q 5k" },
  { label: "Enganche · 15%", value: "Q 182k" },
  { label: "Plazo financiamiento", value: "72 meses" },
];

const SUMMARY = [
  { label: "Precio de lista", amount: "Q 1.21M" },
  { label: "Apartado (firma)", amount: "Q 5k" },
  { label: "Enganche", amount: "Q 182k" },
  { label: "Saldo a financiar", amount: "Q 1.02M" },
  { label: "Mensualidades", amount: "72 × Q 15k" },
  { label: "Mensualidad final", amount: "Q 15k GTQ", total: true },
];

const AMORT_ROWS = [
  { num: 1, fecha: "15-MAY-26", pago: "Q 15k", saldo: "Q 1.02M" },
  { num: 2, fecha: "15-JUN-26", pago: "Q 15k", saldo: "Q 1.01M" },
  { num: 3, fecha: "15-JUL-26", pago: "Q 15k", saldo: "Q 1M" },
  { num: 4, fecha: "15-AGO-26", pago: "Q 15k", saldo: "Q 996k" },
  { num: 5, fecha: "15-SEP-26", pago: "Q 15k", saldo: "Q 989k" },
  { num: 6, fecha: "15-OCT-26", pago: "Q 15k", saldo: "Q 982k" },
  { num: 7, fecha: "15-NOV-26", pago: "Q 15k", saldo: "Q 974k" },
  { num: 8, fecha: "15-DIC-26", pago: "Q 15k", saldo: "Q 967k" },
  { num: 9, fecha: "15-ENE-27", pago: "Q 15k", saldo: "Q 959k" },
  { num: 10, fecha: "15-FEB-27", pago: "Q 15k", saldo: "Q 952k" },
  { num: 11, fecha: "15-MAR-27", pago: "Q 15k", saldo: "Q 944k" },
  { num: 12, fecha: "15-ABR-27", pago: "Q 15k", saldo: "Q 936k" },
];

export default function Cotizador() {
  return (
    <div className="panel panel-cotizador" id="panelCotizador">
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-dot" />
          Cotizador · A 146 · Aluna 100
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
              <input className="cot-input" defaultValue={value} />
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
