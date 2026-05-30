import "./filter-bar.css";
import type { Lead, Stage } from "../../../types/lead";
import { useDashboardStore } from "../../../store/dashboard/useDashboardStore";
import { useUIStore } from "../../../store/ui/useUIStore";

type StageFilter = Stage | "todos";

const FILTERS: { label: string; value: StageFilter }[] = [
  { label: "Todos", value: "todos" },
  { label: "Prospecto", value: "prospecto" },
  { label: "Cotización", value: "cotizacion" },
  { label: "Visita/Junta", value: "visita" },
  { label: "Apartado", value: "apartado" },
  { label: "Cerrado", value: "cerrado" },
];

const countByStage = (leads: Lead[], stage: StageFilter) =>
  stage === "todos"
    ? leads.length
    : leads.filter((l) => l.stage === stage).length;

export default function FilterBar() {
  const leads = useDashboardStore((state) => state.leads);
  const { activeStage, setActiveStage } = useUIStore();

  return (
    <div className="filter-bar">
      <span className="filter-label">Etapa</span>
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          className={`filter-chip ${activeStage === value ? "active" : ""}`}
          onClick={() => setActiveStage(value)}
        >
          {label}{" "}
          <span className="filter-chip-count">
            {countByStage(leads, value)}
          </span>
        </button>
      ))}
      <div className="filter-spacer" />
    </div>
  );
}
