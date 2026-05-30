import "./leads-list.css";
import LeadRow from "./lead-row/lead-row";
import { useDashboardStore } from "../../../../store/dashboard/useDashboardStore";

export default function LeadsList() {
  const leads = useDashboardStore((state) => state.leads);
  const selectLeadId = useDashboardStore((state) => state.selectLeadId);
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);
  const selectLead = useDashboardStore((state) => state.selectLead);
  const handleSelectLead = (id: string) => {
    selectLead(id);
    selectLeadId(id);
  };

  return (
    <div className="leads-list">
      {/* Header */}
      <div
        className="lead-row header-row"
        style={{
          cursor: "default",
          borderBottom: "1px solid var(--bg-line-strong)",
          background: "transparent",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "0.6rem",
          color: "var(--text-dim)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "10px 28px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div />
        <div>Lead · Folio</div>
        <div>Etapa</div>
        <div>Último contacto</div>
        <div>Score</div>
        <div style={{ textAlign: "right" }}>Valor</div>
        <div />
      </div>

      {/* Rows */}
      {leads.map((lead, i) => (
        <LeadRow
          key={lead.initials + i}
          lead={lead}
          selected={lead.id === selectedLeadId}
          onSelect={(id) => handleSelectLead(id)}
        />
      ))}
    </div>
  );
}
