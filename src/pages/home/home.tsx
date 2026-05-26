import { useNavigate } from "react-router-dom";
import OverlayShadow from "../../components/overlays/overlay-shadow";
import React from "react";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  const alunaDevShortcut:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = () => {
    navigate("/dashbaord");
  };

  const alunaStartOnboarding:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    navigate("/onboarding");
  };

  return (
    <div className="face face-front">
      <OverlayShadow />
      <div className="face-front-frame">
        <div className="aluna-welcome" id="alunaWelcome">
          <div className="aluna-welcome-stamp">ALUNA RESIDENCIAL · 2026</div>
          <div
            className="aluna-welcome-logo-wrap cursor-pointer"
            onClick={alunaDevShortcut}
            title="DEV · click para brincar al dashboard como Roberto"
          >
            <div className="aluna-welcome-logo">Aluna</div>
            <div className="aluna-welcome-sub">RESIDENCIAL</div>
            <div className="aluna-welcome-logo-hint">
              ⚡ DEV · saltar al dashboard
            </div>
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
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
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
