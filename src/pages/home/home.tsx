import { useNavigate } from "react-router-dom";
import OverlayShadow from "../../components/overlays/overlay-shadow";
import React from "react";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const alunaStartOnboarding: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    navigate("/onboarding");
  };

  return (
    <div className="face face-front">
      <OverlayShadow />

      {/* Botón asesor — esquina superior derecha */}
      <button className="home-advisor-btn" onClick={() => navigate("/login")}>
        ¿Eres asesor?
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
      </button>

      <div className="face-front-frame">
        <div className="aluna-welcome" id="alunaWelcome">
          <div className="aluna-welcome-stamp">ALUNA RESIDENCIAL · 2026</div>
          <div className="aluna-welcome-logo-wrap">
            <div className="aluna-welcome-logo">Aluna</div>
            <div className="aluna-welcome-sub">RESIDENCIAL</div>
          </div>
          <div className="aluna-welcome-title">
            El lugar donde nace tu historia
            <br />y florece tu futuro.
          </div>
          <div className="aluna-welcome-text">
            Un residencial horizontal en Villa Nueva con 164 casas, respaldado
            por FHA y construido por Grupo MR2. Antes de entrar a explorar,
            cuéntanos un poco de ti.
          </div>
          <button className="aluna-welcome-cta" onClick={alunaStartOnboarding}>
            COMENZAR EXPERIENCIA
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <div className="aluna-welcome-corner">
            PROYECTO POR<strong>GRUPO MR2</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
