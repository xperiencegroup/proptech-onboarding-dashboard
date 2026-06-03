import { useEffect } from "react";
import { useDashboardStore } from "../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../store/ui/useUIStore";
import "./dashboard.css";
import DBTopbar from "./db-topbar/db-topbar";
import FilterBar from "./filter-bar/filter-bar";
import LeadsContainer from "./leads-container/leads-container";
import ChatDrawer from "./leads-container/leads-detail/chat-drawer/chat-drawer";
import PresenterBanner from "./presenter-banner/presenter-banner";

export default function Dashboard() {
  const isClientMode = useUIStore((state) => state.isClientMode);
  const initSocket = useDashboardStore((state) => state.initSocket);
  const destroySocket = useDashboardStore((state) => state.destroySocket);

  useEffect(() => {
    initSocket();
    return () => destroySocket();
  }, []);
  return (
    <div className={`face face-back ${isClientMode ? "presenter-mode" : ""}`}>
      <DBTopbar />
      <PresenterBanner />
      <FilterBar />
      <LeadsContainer />
      <ChatDrawer />
    </div>
  );
}
