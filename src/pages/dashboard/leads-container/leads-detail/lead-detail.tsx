import { useDashboardStore } from "../../../../store/dashboard/useDashboardStore";
import DetailBody from "./body/detail-body";
import DetailHeader from "./header/detail-header";
import "./lead-detail.css";

export default function LeadDetail() {
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);

  return (
    <div
      className={`lead-detail ${selectedLeadId ? "show" : ""}`}
      id="leadDetail"
    >
      <div className="detail-header">
        <DetailHeader />
      </div>
      <div className="detail-body">
        <DetailBody />
      </div>
    </div>
  );
}
