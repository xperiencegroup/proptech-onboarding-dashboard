import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";

export default function Step5() {
  const navigate = useNavigate();
  const name = useOnboardingStore((state) => state.name);
  const lead = useOnboardingStore((state) => state.lead);
  const reset = useOnboardingStore((state) => state.reset);

  const firstName = name.split(" ")[0] || "Visitante";

  const handleEnterApp = () => {
    reset();
    navigate("/click-and-xperience");
  };

  return (
    <div className="aluna-ob-step-content" data-step="5">
      <div className="aluna-ob-final">
        <div className="aluna-ob-final-icon">✦</div>
        <div className="aluna-ob-final-hello">
          Hola, <span>{firstName}</span>
        </div>
        <div className="aluna-ob-final-title">Aluna te está esperando</div>

        <div className="aluna-ob-final-folio">
          <div className="aluna-ob-final-folio-label">Tu Folio</div>
          <div className="aluna-ob-final-folio-code">{lead?.folio}</div>
        </div>

        <div className="aluna-ob-final-text">
          Te enviamos tu folio y un brochure con la información completa por
          WhatsApp y correo. Guárdalo — si visitas el showroom, este código nos
          permite continuar tu experiencia desde donde la dejaste.
        </div>

        <div className="aluna-ob-channels">
          <div className="aluna-ob-channel">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 3.5A11.85 11.85 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.5 4.2 1.5 6L0 24l6.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.3zm-8.5 18.4c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.3 0-5.5 4.5-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9 1.9 1.9 2.9 4.4 2.9 7 0 5.5-4.5 9.9-10 9.9z" />
            </svg>
            WhatsApp enviado
          </div>
          <div className="aluna-ob-channel">
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
            </svg>
            Correo enviado
          </div>
        </div>

        <div
          className="aluna-ob-actions"
          style={{ justifyContent: "flex-start" }}
        >
          <button className="aluna-ob-btn" onClick={handleEnterApp}>
            Explorar Aluna
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
        </div>
      </div>
    </div>
  );
}
