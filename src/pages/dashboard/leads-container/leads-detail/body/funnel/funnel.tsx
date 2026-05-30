import "./funnel.css";

type FunnelStatus = "done" | "current" | "pending";

const FUNNEL_STAGES: {
  step: string;
  name: string;
  time: string;
  status: FunnelStatus;
  badge?: string;
  badgeType?: string;
}[] = [
  {
    step: "✓",
    name: "Prospecto",
    time: "12 ABR · 0 días",
    status: "done",
    badge: "Completado",
    badgeType: "signed",
  },
  {
    step: "✓",
    name: "En tour",
    time: "14 ABR · 2 días",
    status: "done",
    badge: "Completado",
    badgeType: "signed",
  },
  {
    step: "3",
    name: "Cotización",
    time: "22 ABR · activo · 5 días",
    status: "current",
    badge: "En curso",
    badgeType: "pending",
  },
  { step: "4", name: "Apartado", time: "Pendiente", status: "pending" },
  { step: "5", name: "Firma", time: "Pendiente", status: "pending" },
];

export default function Funnel() {
  return (
    <div className="panel funnel-panel">
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-dot" />
          Estado del funnel
        </div>
        <div className="panel-action">Editar →</div>
      </div>
      <div className="funnel-vertical">
        {FUNNEL_STAGES.map(
          ({ step, name, time, status, badge, badgeType }, i) => (
            <>
              <div key={name} className={`funnel-stage ${status}`}>
                <div className="funnel-step">{step}</div>
                <div className="funnel-stage-info">
                  <div className="funnel-stage-name">{name}</div>
                  <div className="funnel-stage-time">{time}</div>
                </div>
                {badge && (
                  <span
                    className={`contract-status ${badgeType}`}
                    style={{ fontSize: "0.55rem" }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              {i < FUNNEL_STAGES.length - 1 && (
                <div key={`c-${i}`} className="funnel-connector" />
              )}
            </>
          ),
        )}
      </div>
    </div>
  );
}
