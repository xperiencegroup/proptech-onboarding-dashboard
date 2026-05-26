import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";

export default function Step1() {
  const goToStep = useOnboardingStore((state) => state.goToStep);
  const handleClickContinue = () => {
    goToStep(2);
  };
  return (
    <>
      {/* <!-- STEP 1: datos obligatorios --> */}
      <div className="aluna-ob-step-content" data-step="1">
        <div className="aluna-ob-question">Empecemos por conocerte</div>
        <div className="aluna-ob-helper">
          Estos son los únicos campos obligatorios. Con esto te abrimos tu folio
          y te mandamos tu información por WhatsApp y correo.
        </div>

        <form className="aluna-ob-row">
          <div className="aluna-ob-field full">
            <label className="aluna-ob-label">
              Nombre completo <span className="req">*</span>
            </label>
            <input
              type="text"
              className="aluna-ob-input"
              id="obName"
              placeholder="Tu nombre y apellido"
              autoComplete="off"
            />
          </div>
          <div className="aluna-ob-field">
            <label className="aluna-ob-label">
              Teléfono <span className="req">*</span>
            </label>
            <input
              type="tel"
              className="aluna-ob-input"
              id="obPhone"
              placeholder="+502 0000 0000"
              autoComplete="off"
            />
          </div>
          <div className="aluna-ob-field">
            <label className="aluna-ob-label">
              Correo <span className="req">*</span>
            </label>
            <input
              type="email"
              className="aluna-ob-input"
              id="obEmail"
              placeholder="tu@correo.com"
              autoComplete="off"
            />
          </div>
        </form>

        <div className="aluna-ob-actions">
          <button className="aluna-ob-btn" onClick={handleClickContinue}>
            Continuar
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
    </>
  );
}
