import "./dashboard.css";
import DBTopbar from "./db-topbar/db-topbar";
import FilterBar from "./filter-bar/filter-bar";
import LeadsContainer from "./leads-container/leads-container";
import PresenterBanner from "./presenter-banner/presenter-banner";

export default function Dashboard() {
  return (
    <div className="face face-back">
      <DBTopbar />
      <PresenterBanner />
      <FilterBar />
      <LeadsContainer />
    </div>
  );
}
