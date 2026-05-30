import { useDashboardStore } from "../../../store/dashboard/useDashboardStore";
import "./leads-container.css";
import LeadDetail from "./leads-detail/lead-detail";
import LeadsList from "./leads-list/leads-list";

export default function LeadsContainer() {
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);
  return (
    <div
      className={`leads-container ${selectedLeadId ? "collapsed" : ""}`}
      id="leadsContainer"
    >
      <LeadsList />
      <LeadDetail />
    </div>
  );
}
