import "./lead-row.css";
import { type Lead } from "../../../../../types/lead";

interface LeadRowProps {
  lead: Lead;
  selected?: boolean;
  onSelect: (key: string) => void;
}

export default function LeadRow({ lead, selected, onSelect }: LeadRowProps) {
  return (
    <div
      className={`lead-row${selected ? " selected" : ""}`}
      data-stage={lead.stage}
      data-leadkey={lead.initials + lead.folio}
      onClick={() => {
        if (selected) return;
        onSelect(lead.id);
      }}
    >
      <div
        className={`lead-avatar ${lead.heatStatus ? `${lead.heatStatus}` : "warm"}`}
      >
        {lead.initials}
        {lead.heatStatus === "hot" && <div className="lead-avatar-dot" />}
      </div>

      <div className="col-info">
        <div className="lead-name">{lead.name}</div>
        <div className="lead-meta">
          <span className="lead-meta-folio">{lead.folio}</span>
          {lead.times_visited && ` · ${lead.times_visited}`}
          {lead.last_units_visited &&
            ` · ${lead.last_units_visited.join(", ")}`}
        </div>
      </div>

      <div className="col-stage">
        <span className={`stage-pill ${lead.stage}`}>{lead.stage}</span>
      </div>

      <div className="col-touch">
        {lead.last_contact}
        <div className="col-touch-time">{lead.last_contact_purpose}</div>
      </div>

      <div className="lead-score">
        <div className={`score-num ${lead.heatStatus}`}>{lead.score}</div>
        <div className="score-bar">
          <div
            className="score-bar-fill"
            style={{
              width: `${lead.score}%`,
              ...(lead.heatStatus === "won"
                ? { background: "var(--status-won)" }
                : {}),
            }}
          />
        </div>
      </div>

      <div className="col-value">{lead.value}</div>

      <p className="col-source">
        <span className={`source-dot ${lead.source ?? "google"}`} />
        <span>
          {lead.source ? (
            <>
              <span className="uppercase">{lead?.source?.charAt(0)}</span>
              {lead?.source?.slice(1)}
            </>
          ) : (
            <span>Google</span>
          )}
        </span>
      </p>

      <div className="col-actions" />
    </div>
  );
}
