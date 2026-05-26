import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";

const WIDTHS: Record<number, number> = { 1: 25, 2: 50, 3: 75, 4: 90, 5: 100 };
const LABELS: Record<number, string> = {
  1: "PASO 1 DE 3",
  2: "PASO 2 DE 3",
  3: "PERSONALIZAR · 1 DE 2",
  4: "PERSONALIZAR · 2 DE 2",
  5: "BIENVENIDA",
};

export default function ProgressBar() {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  const barWidth = WIDTHS[currentStep];
  const currentLabel = LABELS[currentStep];
  return (
    <div className="aluna-ob-pane-top">
      <div className="aluna-ob-progress-wrap">
        <div className="aluna-ob-progress">
          <div
            className="aluna-ob-progress-fill"
            id="obProgress"
            style={{ width: `${barWidth}%` }}
          ></div>
        </div>
        <div className="aluna-ob-step-label" id="obStepLabel">
          {currentLabel}
        </div>
      </div>
      <div className="aluna-ob-powered">
        XPERIENCE<strong>INTELLIGENCE</strong>
      </div>
    </div>
  );
}
