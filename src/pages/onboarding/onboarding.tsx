import OverlayShadow from "../../components/overlays/overlay-shadow";
import "./onboarding.css";
import LeftSidePanel from "./left-side-panel/left-side-panel";
import RightSidePanel from "./right-side-panel/right-side-panel";

export default function Onboarding() {
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
