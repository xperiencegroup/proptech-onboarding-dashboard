import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";

export default function Step2() {
  const goToStep = useOnboardingStore((state) => state.goToStep);
  const finishOnboarding = useOnboardingStore(
    (state) => state.finishOnboarding,
  );

  const handleClickContinue = () => {
    goToStep(3);
  };

  const handleSkipToFinal = () => {
    finishOnboarding();
  };
  return (
    // <!-- STEP 2: branch (¿personalizar?) -->
    <div className="aluna-ob-step-content" data-step="2">
      <div className="aluna-ob-branch">
        <div className="aluna-ob-branch-icon">✦</div>
        <div className="aluna-ob-question">
          ¿Quieres una experiencia a tu medida?
        </div>
        <div className="aluna-ob-helper">
          Si nos cuentas un poco más, Aluna se adapta: te sugerimos el modelo
          que mejor encaja y abrimos planes de financiamiento pre-evaluados para
          ti. Son solo 2 pasos más.
        </div>

        <div className="aluna-ob-perks">
          <div className="aluna-ob-perk">
            <div className="aluna-ob-perk-check">✓</div>Recomendación del modelo
            que mejor te queda — Aluna 90 o Aluna 100
          </div>
          <div className="aluna-ob-perk">
            <div className="aluna-ob-perk-check">✓</div>Cálculo de cuota mensual
            estimada con FHA y LIP
          </div>
          <div className="aluna-ob-perk">
            <div className="aluna-ob-perk-check">✓</div>Tu asesor llega
            preparado a la cita — no empiezas de cero
          </div>
        </div>

        <div className="aluna-ob-actions">
          <button className="aluna-ob-btn link" onClick={handleSkipToFinal}>
            Por ahora no, gracias
          </button>
          <button className="aluna-ob-btn" onClick={handleClickContinue}>
            Sí, continuar
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
