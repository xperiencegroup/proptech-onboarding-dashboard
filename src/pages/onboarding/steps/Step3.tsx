import { useState } from "react";
import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";

const RANGOS_EDAD = ["25-34", "35-44", "45-54", "55+"];
const INTEGRANTES_FAMILIA = ["1-2", "3-4", "5-6", "7 o más"];
const USO_OPTIONS = [
  "Vivir con mi familia",
  "Inversión / renta",
  "Casa de fin de semana",
  "Otro",
];

export default function Step3() {
  const goToStep = useOnboardingStore((state) => state.goToStep);
  const setField = useOnboardingStore((state) => state.setField);
  const edad = useOnboardingStore((state) => state.edad);
  const familia = useOnboardingStore((state) => state.familia);
  const uso = useOnboardingStore((state) => state.uso);

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const triggerShake = (keys: string[]) => {
    setErrors({});
    setTimeout(() => {
      const newErrors: Record<string, boolean> = {};
      keys.forEach((k) => (newErrors[k] = true));
      setErrors(newErrors);
    }, 40);
  };

  const handleClickContinue = () => {
    const missing: string[] = [];
    if (!edad) missing.push("edad");
    if (!familia) missing.push("familia");
    if (!uso) missing.push("uso");

    if (missing.length > 0) {
      triggerShake(missing);
      return;
    }

    goToStep(4);
  };

  return (
    <div className="aluna-ob-step-content" data-step="3">
      <div className="aluna-ob-question">Cuéntanos un poco de ti</div>
      <div className="aluna-ob-helper">
        Estos datos nos ayudan a sugerirte el modelo y el plan correctos.
      </div>

      <div
        className={`aluna-ob-block-label ${errors.edad ? "label-error" : ""}`}
      >
        Rango de edad
      </div>
      <div className={`aluna-ob-chips ${errors.edad ? "chips-shake" : ""}`}>
        {RANGOS_EDAD.map((op) => (
          <div
            key={op}
            className={`aluna-ob-chip ${edad === op ? "active" : ""}`}
            onClick={() => {
              setField("edad", op);
              setErrors((prev) => ({ ...prev, edad: false }));
            }}
          >
            {op}
          </div>
        ))}
      </div>

      <div
        className={`aluna-ob-block-label ${errors.familia ? "label-error" : ""}`}
      >
        Integrantes de la familia
      </div>
      <div className={`aluna-ob-chips ${errors.familia ? "chips-shake" : ""}`}>
        {INTEGRANTES_FAMILIA.map((op) => (
          <div
            key={op}
            className={`aluna-ob-chip ${familia === op ? "active" : ""}`}
            onClick={() => {
              setField("familia", op);
              setErrors((prev) => ({ ...prev, familia: false }));
            }}
          >
            {op}
          </div>
        ))}
      </div>

      <div
        className={`aluna-ob-block-label ${errors.uso ? "label-error" : ""}`}
      >
        ¿Para qué la usarás?
      </div>
      <div className={`aluna-ob-chips ${errors.uso ? "chips-shake" : ""}`}>
        {USO_OPTIONS.map((op) => (
          <div
            key={op}
            className={`aluna-ob-chip ${uso === op ? "active" : ""}`}
            onClick={() => {
              setField("uso", op);
              setErrors((prev) => ({ ...prev, uso: false }));
            }}
          >
            {op}
          </div>
        ))}
      </div>

      <div className="aluna-ob-actions">
        <button className="aluna-ob-btn link" onClick={() => goToStep(2)}>
          ← Atrás
        </button>
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
  );
}
