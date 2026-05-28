import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./db-topbar.css";
import { useSessionStore } from "../../../store/session/useSessionStore";
import { useUIStore } from "../../../store/ui/useUIStore";
import DBAlertas from "./db-alertas/db-alertas";

export default function DBTopbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isClientMode, toggleClientMode, setSearchQuery, searchQuery } =
    useUIStore();
  const { name, avatarInitials, role } = useSessionStore();

  const toggleViewMode = () => {
    toggleClientMode();

    if (!isClientMode) {
      // si está pasando a cliente
      setTimeout(() => {
        document
          .querySelector(".panel-comparator")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="db-topbar">
      <div className="db-brand">
        {/* LOGO PLACEHOLDER · reemplazar div.db-brand-x por el logo oficial de Aluna */}
        <div
          className="db-brand-x logo-placeholder"
          title="LOGO PLACEHOLDER · reemplazar con logo oficial"
        >
          X
        </div>
        <div className="db-brand-name">
          <div className="db-brand-1">Dashboard Xperience</div>
          <div className="db-brand-2">ALUNA RESIDENCIAL 2026</div>
        </div>
      </div>

      {/* Vista cliente <-> Vista vendedor (toggle) */}
      <div
        className={`view-toggle ${isClientMode ? "client-mode" : ""}`}
        id="viewToggle"
        onClick={toggleViewMode}
        title={
          isClientMode
            ? "En vista cliente · click para volver a vista vendedor"
            : "En vista vendedor · click para vista cliente (concentra comparador/cotizador)"
        }
      >
        <div className="view-toggle-track">
          <div className="view-toggle-thumb"></div>
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

      <div className="db-actions">
        {/* Buscador */}
        <div className="db-search">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            id="dashSearch"
            placeholder="Buscar leads, folios, unidades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd>⌘K</kbd>
        </div>

        {/* Alertas */}
        <DBAlertas />

        {/* Volver a click & xperience */}
        <Link className="back-to-platform" to={"/click-and-xperience"}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a Click &amp; Xperience
        </Link>

        {/* Perfil del usuario */}
        <div className="vendor-chip">
          <div className="vendor-avatar">{avatarInitials}</div>
          <div>
            <div className="vendor-name">{name}</div>
            <div className="vendor-role">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
