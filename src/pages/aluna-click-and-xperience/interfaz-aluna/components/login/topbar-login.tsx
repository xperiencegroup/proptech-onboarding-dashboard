import { useState, useEffect } from "react";
import { supabase } from "../../../../../utils/supabase";
import "./topbar-login.css";
import { useNavigate } from "react-router-dom";

export default function TopbarLogin() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const alunaTryLogin = async () => {
    if (credentials.username && credentials.password) {
      const { error } = await supabase.auth.signInWithPassword({
        email: `${credentials.username}@example.local`,
        password: credentials.password,
      });

      if (!error) {
        setIsLogged(true);
      } else {
        setHasError(true);
        setTimeout(() => setHasError(false), 300);
      }
    }
  };

  const alunaLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setIsLogged(false);
      setCredentials({ username: "", password: "" });
    }
  };

  const alunaToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const alunaFlipToDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    // Leer sesión existente al montar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLogged(!!session);
    });

    // Escuchar cambios (login, logout, token refresh) si se refresca token en segundo plano
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* <!-- Login form (when nobody is logged in) --> */}
      <div
        className={`aluna-login ${isLogged ? "hidden" : ""} ${hasError ? "error" : ""}`}
        id="alunaLogin"
      >
        <div className="aluna-login-label">Iniciar Sesión</div>
        <div className="aluna-login-field">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
          </svg>
          <input
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            value={credentials.username}
            type="text"
            id="alunaUser"
            placeholder="Usuario:"
            autoComplete="off"
          />
        </div>
        <div className="aluna-login-field">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 018 0v3" />
          </svg>
          <input
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            value={credentials.password}
            type="password"
            id="alunaPass"
            placeholder="Contraseña:"
            autoComplete="off"
          />
        </div>
        <button className="aluna-login-btn" onClick={alunaTryLogin}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          INICIAR SESIÓN
        </button>
      </div>

      {/* <!-- Logged-in chip (when advisor is logged in) --> */}
      <div
        className={`aluna-logged ${isLogged ? "visible" : ""} ${isDropdownOpen ? "open" : ""}`}
        id="alunaLogged"
        onClick={alunaToggleDropdown}
      >
        <div className="aluna-logged-avatar" id="alunaAvatar">
          R
        </div>
        <div className="aluna-logged-name" id="alunaLoggedName">
          HOLA, ROBERTO
        </div>
        <svg
          className="aluna-logged-caret"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>

        <div className="aluna-dropdown" id="alunaDropdown">
          <div className="aluna-dropdown-item">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
            </svg>
            Ver perfil
          </div>
          <div
            className="aluna-dropdown-item highlight"
            onClick={alunaFlipToDashboard}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            Dashboard Xperience
          </div>
          <div className="aluna-dropdown-item danger" onClick={alunaLogout}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </div>
        </div>
      </div>
    </>
  );
}
