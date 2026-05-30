import { useUIStore } from "../../store/ui/useUIStore";
import "./dashboard.css";
import DBTopbar from "./db-topbar/db-topbar";
import FilterBar from "./filter-bar/filter-bar";
import LeadsContainer from "./leads-container/leads-container";
import PresenterBanner from "./presenter-banner/presenter-banner";

export default function Dashboard() {
  const isClientMode = useUIStore((state) => state.isClientMode);
  return (
    <div className={`face face-back ${isClientMode ? "presenter-mode" : ""}`}>
      <DBTopbar />
      <PresenterBanner />
      <FilterBar />
      <LeadsContainer />
    </div>
  );
}
