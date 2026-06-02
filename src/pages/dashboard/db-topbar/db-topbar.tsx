import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./db-topbar.css";
import { useSessionStore } from "../../../store/session/useSessionStore";
import { useUIStore } from "../../../store/ui/useUIStore";
import { supabase } from "../../../utils/supabase";
import DBAlertas from "./db-alertas/db-alertas";
import { useDashboardStore } from "../../../store/dashboard/useDashboardStore";

export default function DBTopbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const selectedLeadId = useDashboardStore((state) => state.selectedLeadId);

  const { isClientMode, toggleClientMode, setSearchQuery, searchQuery } =
    useUIStore();
  const { name, avatarInitials, role, clearSession } = useSessionStore();

  const toggleViewMode = () => {
    toggleClientMode();
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      clearSession();
    }
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Shortcut ⌘K
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

      <div className="db-actions">
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

        <DBAlertas />

        <Link
          className="back-to-platform"
          to="https://aluna-clon-frontend.vercel.app/inicio"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Ir a Click &amp; Xperience
        </Link>

        {/* Perfil con dropdown */}
        <div className="vendor-chip-wrap" ref={dropdownRef}>
          <div
            className={`vendor-chip ${isProfileOpen ? "vendor-chip--open" : ""}`}
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <div className="vendor-avatar">{avatarInitials}</div>
            <div>
              <div className="vendor-name">{name}</div>
              <div className="vendor-role">{role}</div>
            </div>
            <svg
              className={`vendor-caret ${isProfileOpen ? "vendor-caret--open" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {isProfileOpen && (
            <div className="vendor-dropdown">
              <div className="vendor-dropdown-header">
                <div className="vendor-dropdown-avatar">{avatarInitials}</div>
                <div>
                  <div className="vendor-dropdown-name">{name}</div>
                  <div className="vendor-dropdown-email">{role}</div>
                </div>
              </div>
              <div className="vendor-dropdown-divider" />
              <button
                className="vendor-dropdown-item vendor-dropdown-item--danger"
                onClick={handleLogout}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
