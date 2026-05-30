import "./presenter-banner.css";

export default function PresenterBanner() {
  return (
    <>
      {/* <!-- Greeting  --> */}
      <div className="greeting-bar">
        <div>
          <div className="greeting-eyebrow" id="greetingEyebrow">
            Cargando fecha…
          </div>
          <div className="greeting-title" id="greetingTitle">
            Buenas tardes, <span className="name">Carlos</span>.
          </div>
          <div className="greeting-sub" id="greetingSub">
            42 leads activos · 3 Experience Analysis nuevos · 1 en sesión ahora
          </div>
        </div>
        <div className="kpis">
          <div className="kpi">
            <div className="kpi-label">Prospectos · mes</div>
            <div className="kpi-value">
              20 <span className="kpi-delta">+6</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">En seguimiento</div>
            <div className="kpi-value">
              10 <span className="kpi-delta">+2</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Cerrados · mes</div>
            <div className="kpi-value">
              2 <span className="kpi-delta">+1</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Pipeline</div>
            <div className="kpi-value">Q 19.3M</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Conversión</div>
            <div className="kpi-value">10.0%</div>
          </div>
        </div>
      </div>
    </>
  );
}
