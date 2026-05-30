import "./filter-bar.css";

export default function FilterBar() {
  return (
    <div className="filter-bar">
      <span className="filter-label">Etapa</span>
      <button
        className="filter-chip active"
        data-stage="todos"
        // onClick="setFilter(this)"
      >
        Todos <span className="filter-chip-count">20</span>
      </button>
      <button
        className="filter-chip"
        data-stage="prospecto"
        // onClick="setFilter(this)"
      >
        Prospecto <span className="filter-chip-count">8</span>
      </button>
      <button
        className="filter-chip"
        data-stage="cotizacion"
        // onClick="setFilter(this)"
      >
        Cotización <span className="filter-chip-count">4</span>
      </button>
      <button
        className="filter-chip"
        data-stage="visita"
        // onClick="setFilter(this)"
      >
        Visita/Junta <span className="filter-chip-count">4</span>
      </button>
      <button
        className="filter-chip"
        data-stage="apartado"
        // onClick="setFilter(this)"
      >
        Apartado <span className="filter-chip-count">2</span>
      </button>
      <button
        className="filter-chip"
        data-stage="cerrado"
        // onClick="setFilter(this)"
      >
        Cerrado <span className="filter-chip-count">2</span>
      </button>
      <div className="filter-spacer"></div>

      <button
        id="clearSessionsBtn"
        className="session-leads-clear"
        // onClick="clearAllSessionLeads()"
        title="Borrar todos los leads de sesión generados por onboarding"
      >
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6" />
        </svg>
        Limpiar sesiones · <span className="count">0</span>
      </button>
    </div>
  );
}
