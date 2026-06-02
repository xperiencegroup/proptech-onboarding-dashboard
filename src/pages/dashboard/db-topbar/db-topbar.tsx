import { useRef, useEffect, useState } from "react";
import "./db-topbar.css";
import { useSessionStore } from "../../../store/session/useSessionStore";
import { supabase } from "../../../utils/supabase";
import DBAlertas from "./db-alertas/db-alertas";
import logoAlunaBlanco from "../../../assets/main/LogoPrincipal_blanco.png";
import DbToggleView from "./db-toggle-view/db-toggle-view";
import DbSearcher from "./db-searcher/db-searcher";

export default function DBTopbar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { name, avatarInitials, role, clearSession, userId } =
    useSessionStore();

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

  const handleEnterApp = () => {
    window.location.href = `https://aluna-clon-frontend.vercel.app/inicio?user_id=${userId}`;
  };

  return (
    <div className="db-topbar">
      {/* Logo y nombre */}
      <div className="db-brand">
        <div className="w-[clamp(59.17px,10.416667vw,80px)] h-fit">
          <img src={logoAlunaBlanco} alt="Logo de aluna" />
        </div>
        <div className="db-brand-name">
          <div className="db-brand-1">Xperience Intelligence</div>
          <div className="db-brand-2">ALUNA RESIDENCIAL 2026</div>
        </div>
      </div>

      {/* Toggle */}
      <DbToggleView />

      <div className="db-actions">
        {/* Buscador */}
        <DbSearcher />

        {/* Botón de alertas */}
        <DBAlertas />

        <button className="back-to-platform" onClick={handleEnterApp}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Ir a Click &amp; Xperience
        </button>

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
