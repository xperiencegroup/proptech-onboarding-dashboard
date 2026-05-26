import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";

const PRESUPUESTO_OPTIONS = [
  "Hasta Q 600k",
  "Q 600 - 750k",
  "Q 750k - 900k",
  "Prefiero no decir",
];
const SUBSIDIO_OPTIONS = [
  "Sí, ya califico",
  "Quiero saber si califico",
  "No aplica para mí",
];
const INTERES_OPTIONS = [
  "Modelos de casa",
  "Amenidades",
  "Plan de financiamiento",
  "Ubicación",
];

export default function Step4() {
  const goToStep = useOnboardingStore((state) => state.goToStep);
  const setField = useOnboardingStore((state) => state.setField);
  const presupuesto = useOnboardingStore((state) => state.presupuesto);
  const subsidio = useOnboardingStore((state) => state.subsidio);
  const interes = useOnboardingStore((state) => state.interes);
  const finishOnboarding = useOnboardingStore(
    (state) => state.finishOnboarding,
  );

  return (
    <div className="aluna-ob-step-content" data-step="4">
      <div className="aluna-ob-question">Lo último — financiamiento</div>
      <div className="aluna-ob-helper">
        Aluna trabaja mucho con FHA y LIP. Esto nos ayuda a alinear opciones
        reales.
      </div>

      <div className="aluna-ob-block-label">
        Presupuesto que tienes en mente
      </div>
      <div className="aluna-ob-chips">
        {PRESUPUESTO_OPTIONS.map((op) => (
          <div
            key={op}
            className={`aluna-ob-chip ${presupuesto === op ? "active" : ""}`}
            onClick={() => setField("presupuesto", op)}
          >
            {op}
          </div>
        ))}
      </div>

      <div className="aluna-ob-block-label">
        ¿Cuentas con apoyo gubernamental (FHA / LIP)?
      </div>
      <div className="aluna-ob-chips">
        {SUBSIDIO_OPTIONS.map((op) => (
          <div
            key={op}
            className={`aluna-ob-chip ${subsidio === op ? "active" : ""}`}
            onClick={() => setField("subsidio", op)}
          >
            {op}
          </div>
        ))}
      </div>

      <div className="aluna-ob-block-label">
        ¿Qué te interesa explorar primero?
      </div>
      <div className="aluna-ob-chips">
        {INTERES_OPTIONS.map((op) => (
          <div
            key={op}
            className={`aluna-ob-chip ${interes === op ? "active" : ""}`}
            onClick={() => setField("interes", op)}
          >
            {op}
          </div>
        ))}
      </div>

      <div className="aluna-ob-actions">
        <button className="aluna-ob-btn link" onClick={() => goToStep(3)}>
          ← Atrás
        </button>
        <button className="aluna-ob-btn" onClick={finishOnboarding}>
          Iniciar experiencia
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
  );
}
