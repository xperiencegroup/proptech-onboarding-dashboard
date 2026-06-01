import { useDashboardStore } from "../../../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../../../store/ui/useUIStore";

interface Alert {
  key: string;
  initials: string;
  avatarType: "warm" | "cool" | "hot";
  name: string;
  desc: string;
  time: string;
  statusType?: "hot" | "";
}

const ALERTS: Alert[] = [
  {
    key: "patricio",
    initials: "PT",
    avatarType: "warm",
    name: "Patricio Treviño Garza",
    desc: "Cerró sesión hace <strong>8 min</strong> · Score 87 · A146",
    time: "NUEVO",
    statusType: "hot",
  },
  {
    key: "roberto",
    initials: "RS",
    avatarType: "cool",
    name: "Roberto Salinas",
    desc: "Cerró sesión hace <strong>1h 23 min</strong> · Score 76 · A111",
    time: "2H",
  },
  {
    key: "andrea",
    initials: "AC",
    avatarType: "cool",
    name: "Andrea Cantú",
    desc: "Cerró sesión hace <strong>5h</strong> · Score 64 · A155, A151",
    time: "HOY",
  },
];

export default function DBAlertas() {
  const { toggleAlerts, isAlertsOpen } = useUIStore();
  const leads = useDashboardStore((state) => state.leads);
  const lastConnections = [...leads]
    .sort(
      (a, b) =>
        new Date(b.last_contact).getTime() - new Date(a.last_contact).getTime(),
    )
    .slice(0, 3);

  console.log(lastConnections);

  const openAlertLead = (key: string) => {
    console.log("lead:", key);
  };

  return (
    <>
      <div
        className="db-icon-btn"
        title="Alertas · Experience Analysis nuevos"
        onClick={toggleAlerts}
        id="alertsBtn"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
        >
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
        </svg>
        <div className="badge">{ALERTS.length}</div>
      </div>

      <div
        className={`alerts-dropdown ${isAlertsOpen ? "show" : ""}`}
        id="alertsDropdown"
      >
        <div className="alerts-header">
          <div className="alerts-title">Experience Analysis nuevos</div>
          <div className="alerts-subtitle">
            Listos para revisar · post-sesión
          </div>
        </div>

        {ALERTS.map((alert) => (
          <div
            key={alert.key}
            className="alert-item"
            onClick={() => openAlertLead(alert.key)}
          >
            <div className={`alert-avatar ${alert.avatarType}`}>
              {alert.initials}
            </div>
            <div className="alert-content">
              <div className="alert-name">{alert.name}</div>
              <div
                className="alert-desc"
                dangerouslySetInnerHTML={{ __html: alert.desc }}
              />
            </div>
            <span className={`alert-status ${alert.statusType ?? ""}`}>
              {alert.time}
            </span>
          </div>
        ))}

        <div className="alerts-footer">Ver todos los Experience Analysis →</div>
      </div>
    </>
  );
}
