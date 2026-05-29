import OverlayShadow from "../../components/overlays/overlay-shadow";
import "./onboarding.css";
import LeftSidePanel from "./left-side-panel/left-side-panel";
import RightSidePanel from "./right-side-panel/right-side-panel";
import { leadStorage } from "../../utils/leadStorage";
import { useOnboardingStore } from "../../store/formulario/useOnboardingStore";
import { useEffect } from "react";

export default function Onboarding() {
  const goToStep = useOnboardingStore((state) => state.goToStep);

  useEffect(() => {
    const stored = leadStorage.get() ?? null;
    if (stored?.lead_id) {
      goToStep(5);
    }
  }, []);

  return (
    <div className="face face-front">
      <OverlayShadow />
      <div className="face-front-frame">
        <div className="aluna-onboarding">
          <LeftSidePanel />
          <RightSidePanel />
        </div>
      </div>
    </div>
  );
}
