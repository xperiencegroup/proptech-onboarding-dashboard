import "./filter-bar.css";
import type { Lead, Stage } from "../../../types/lead";
import { useDashboardStore } from "../../../store/dashboard/useDashboardStore";

const getQuantityByFilter = (array: Lead[], filterValue: Stage) => {
  const result = array.filter((a) => a.stage === filterValue);
  return result.length;
};

export default function FilterBar() {
  const leads = useDashboardStore((state) => state.leads);
  const leadsQuantity = leads.length;
  const leadsProspect = getQuantityByFilter(leads, "prospecto");
  const leadsQuotation = getQuantityByFilter(leads, "cotizacion");
  const leadsVisitOrMeet = getQuantityByFilter(leads, "visita");
  const leadsReserved = getQuantityByFilter(leads, "apartado");
  const leadsClosed = getQuantityByFilter(leads, "cerrado");

  return (
    <div className="filter-bar">
      <span className="filter-label">Etapa</span>
      <button
        className="filter-chip active"
        data-stage="todos"
        // onClick="setFilter(this)"
      >
        Todos <span className="filter-chip-count">{leadsQuantity}</span>
      </button>
      <button
        className="filter-chip"
        data-stage="prospecto"
        // onClick="setFilter(this)"
      >
        Prospecto <span className="filter-chip-count">{leadsProspect}</span>
      </button>
      <button
        className="filter-chip"
        data-stage="cotizacion"
        // onClick="setFilter(this)"
      >
        Cotización <span className="filter-chip-count">{leadsQuotation}</span>
      </button>
      <button
        className="filter-chip"
        data-stage="visita"
        // onClick="setFilter(this)"
      >
        Visita/Junta{" "}
        <span className="filter-chip-count">{leadsVisitOrMeet}</span>
      </button>
      <button
        className="filter-chip"
        data-stage="apartado"
        // onClick="setFilter(this)"
      >
        Apartado <span className="filter-chip-count">{leadsReserved}</span>
      </button>
      <button
        className="filter-chip"
        data-stage="cerrado"
        // onClick="setFilter(this)"
      >
        Cerrado <span className="filter-chip-count">{leadsClosed}</span>
      </button>
      <div className="filter-spacer"></div>
    </div>
  );
}
