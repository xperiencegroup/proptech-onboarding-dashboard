import { useOnboardingStore } from "../../../store/formulario/useOnboardingStore";
import "./right-side-panel.css";
import "../steps/steps.css";
import ProgressBar from "./progress-bar";
import Step1 from "../steps/step1";
import Step2 from "../steps/step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/step4";
import Step5 from "../steps/step5";

const STEPS: Record<number, React.ComponentType> = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Step4,
  5: Step5,
};

export default function RightSidePanel() {
  const currentStep = useOnboardingStore((state) => state.currentStep);

  const StepComponent = STEPS[currentStep];

  if (!StepComponent) {
    return null;
  }
  return (
    <>
      <div className="aluna-ob-pane">
        {/* Progress bar */}
        <ProgressBar />

        {/* Content */}
        <div className="aluna-ob-form">
          <StepComponent />
        </div>
      </div>
    </>
  );
}
