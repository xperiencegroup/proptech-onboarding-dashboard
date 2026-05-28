import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./side-menu.css";

const VALID_VIEWS = [
  "informacion",
  "ubicacion",
  "plano",
  "disponibilidad",
  "contacto",
] as const;
type Vista = (typeof VALID_VIEWS)[number];

const MENU_ITEMS: { vista: Vista; label: string; icon: React.ReactNode }[] = [
  {
    vista: "informacion",
    label: "Información",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  {
    vista: "ubicacion",
    label: "Ubicación",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    vista: "plano",
    label: "Plano de Conjunto",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    vista: "disponibilidad",
    label: "Disponibilidad",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <circle cx="12" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    vista: "contacto",
    label: "Contacto",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
];

const DEFAULT_VIEW: Vista = "informacion";

export default function SideMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMinimized, setIsMinimized] = useState(false);

  const rawVista = searchParams.get("vista");
  const activeVista: Vista = VALID_VIEWS.includes(rawVista as Vista)
    ? (rawVista as Vista)
    : DEFAULT_VIEW;

  const goVista = (vista: Vista) => {
    setSearchParams({ vista });
  };

  const toggleMenu = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`aluna-side-menu ${isMinimized ? "minimized" : ""}`}
      id="alunaSideMenu"
    >
      <button
        className="aluna-menu-toggle"
        id="alunaMenuToggle"
        title="Minimizar / maximizar menú"
        onClick={toggleMenu}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {MENU_ITEMS.map(({ vista, label, icon }) => (
        <div
          key={vista}
          className={`aluna-menu-item ${activeVista === vista ? "active" : ""}`}
          data-vista={vista}
          onClick={() => goVista(vista)}
        >
          {icon}
          <span className="aluna-menu-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
