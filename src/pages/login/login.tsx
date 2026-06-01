import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import "./login.css";
import { useSessionStore } from "../../store/session/useSessionStore";

export default function Login() {
  const navigate = useNavigate();
  const { setSession, isLoggedIn } = useSessionStore();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Si ya hay sesión, redirigir directo
  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn, navigate]);

  // Escuchar cambios de auth (ej. OAuth callback)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const rawName = session.user.email?.split("@")[0] ?? "";
        setSession({
          isLoggedIn: true,
          userId: session.user.id,
          name: rawName.charAt(0).toUpperCase() + rawName.slice(1),
          email: session.user.email ?? "",
          avatarInitials: rawName.slice(0, 2).toUpperCase(),
          role: "Asesor",
        });
        navigate("/dashboard");
      }
    });
    return () => subscription.unsubscribe();
  }, [setSession, navigate]);

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) return;
    setIsLoading(true);
    setHasError(false);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email: `${credentials.username}@example.local`,
      password: credentials.password,
    });

    setIsLoading(false);

    if (error) {
      setHasError(true);
      setErrorMsg("Usuario o contraseña incorrectos");
      setTimeout(() => setHasError(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page">
      {/* Fondo atmosférico */}
      <div className="login-bg">
        <div className="login-bg-grid" />
        <div className="login-bg-glow login-bg-glow--tl" />
        <div className="login-bg-glow login-bg-glow--br" />
      </div>

      {/* Logo flotante */}
      <Link to={"/"} className="login-logo">
        <div className="login-logo-mark">
          <div className="login-logo-mark-inner" />
        </div>
        <div>
          <div className="login-logo-name">Aluna</div>
          <div className="login-logo-sub">Residencial</div>
        </div>
      </Link>

      {/* Card central */}
      <div className={`login-card ${hasError ? "login-card--error" : ""}`}>
        {/* Lado izquierdo — branding */}
        <div className="login-card-left">
          <div className="login-card-left-inner">
            <div className="login-eyebrow">Dashboard Xperience</div>
            <h1 className="login-headline">
              Tu pipeline,
              <br />
              <span className="login-headline-accent">en tiempo real.</span>
            </h1>
            <p className="login-tagline">
              Visualiza el journey de cada lead, sus simulaciones, comparaciones
              de unidades y el estado completo de tu operación.
            </p>
            <div className="login-stats">
              <div className="login-stat">
                <span className="login-stat-num">20+</span>
                <span className="login-stat-label">Leads activos</span>
              </div>
              <div className="login-stat-sep" />
              <div className="login-stat">
                <span className="login-stat-num">Q 4.2M</span>
                <span className="login-stat-label">Pipeline</span>
              </div>
              <div className="login-stat-sep" />
              <div className="login-stat">
                <span className="login-stat-num">87</span>
                <span className="login-stat-label">Score máx.</span>
              </div>
            </div>
          </div>
          <div className="login-card-left-border" />
        </div>

        {/* Lado derecho — form */}
        <div className="login-card-right">
          <div className="login-form-eyebrow">Acceso al sistema</div>
          <h2 className="login-form-title">Bienvenido</h2>
          <p className="login-form-sub">Ingresa con tu cuenta de asesor.</p>

          <div className="login-fields">
            <div className="login-field">
              <label className="login-label" htmlFor="login-user">
                Usuario
              </label>
              <div className="login-input-wrap">
                <svg
                  className="login-input-icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
                </svg>
                <input
                  id="login-user"
                  type="text"
                  placeholder="Nombre de usuario"
                  autoComplete="username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials((p) => ({ ...p, username: e.target.value }))
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="login-field">
              <div className="login-field-row">
                <label className="login-label" htmlFor="login-pass">
                  Contraseña
                </label>
              </div>
              <div className="login-input-wrap">
                <svg
                  className="login-input-icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
                <input
                  id="login-pass"
                  type="password"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials((p) => ({ ...p, password: e.target.value }))
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>

          {errorMsg && <div className="login-error-msg">{errorMsg}</div>}

          <button
            className={`login-btn-primary ${isLoading ? "login-btn-primary--loading" : ""}`}
            onClick={handleLogin}
            disabled={
              isLoading || !credentials.username || !credentials.password
            }
          >
            {isLoading ? (
              <span className="login-spinner" />
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            )}
            {isLoading ? "Ingresando..." : "Ingresar al dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
