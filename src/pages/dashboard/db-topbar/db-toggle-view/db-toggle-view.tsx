import { useDashboardStore } from "../../../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../../../store/ui/useUIStore";
import "./db-toggle-view.css";

export default function DbToggleView() {
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);

  const { isClientMode, toggleClientMode } = useUIStore();

  const toggleViewMode = () => {
    toggleClientMode();
  };
  return (
    <div
      className={`view-toggle ${isClientMode ? "client-mode" : ""} ${!selectedLeadId ? "view-toggle--disabled" : ""}`}
      id="viewToggle"
      onClick={selectedLeadId ? toggleViewMode : undefined}
      title={
        !selectedLeadId
          ? "Selecciona un lead para activar la vista cliente"
          : isClientMode
            ? "En vista cliente · click para volver a vista vendedor"
            : "En vista vendedor · click para vista cliente"
      }
    >
      <div className="view-toggle-track">
        <div className="view-toggle-thumb" />
      </div>
      <div className="view-toggle-labels">
        <span
          className={`view-toggle-label ${!isClientMode ? "active" : ""}`}
          data-view="vendor"
        >
          Vista vendedor
        </span>
        <span
          className={`view-toggle-label ${isClientMode ? "active" : ""}`}
          data-view="client"
        >
          Vista cliente
        </span>
      </div>
    </div>
  );
}
