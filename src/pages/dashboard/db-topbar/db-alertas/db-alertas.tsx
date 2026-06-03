import { useDashboardStore } from "../../../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../../../store/ui/useUIStore";

export default function DBAlertas() {
  const { toggleAlerts, isAlertsOpen } = useUIStore();
  const leads = useDashboardStore((state) => state.leads);
  const selectLead = useDashboardStore((state) => state.selectLead);
  const selectLeadId = useDashboardStore((state) => state.selectLeadId);

  const lastLeads = [...leads].slice(0, 3);

  const openAlertLead = (id: string) => {
    selectLead(id);
    selectLeadId(id);
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
        <div className="badge">{lastLeads.length}</div>
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

        {lastLeads.map((lead) => (
          <div
            key={lead.id}
            className="alert-item"
            onClick={() => openAlertLead(lead.id)}
          >
            <div className="alert-avatar warm">{lead.initials}</div>
            <div className="alert-content">
              <div className="alert-name">{lead.name}</div>
              <div className="alert-desc">
                {lead.folio} · Score {lead.score} · {lead.stage}
              </div>
            </div>
            <span className="alert-status">
              {lead.stage === "prospecto" ? "NUEVO" : "HOY"}
            </span>
          </div>
        ))}

        <div className="alerts-footer">Ver todos los Experience Analysis →</div>
      </div>
    </>
  );
}
