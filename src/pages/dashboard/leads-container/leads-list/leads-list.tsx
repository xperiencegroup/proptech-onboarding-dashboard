import "./leads-list.css";
import LeadRow from "./lead-row/lead-row";
import { useDashboardStore } from "../../../../store/dashboard/useDashboardStore";
import { FAKE_LEADS } from "../../../../data/fake-lead-data";

export default function LeadsList() {
  const selectLeadId = useDashboardStore((state) => state.selectLeadId);
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);
  const handleSelectLead = (id: string) => {
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
      {FAKE_LEADS.map((lead, i) => (
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
