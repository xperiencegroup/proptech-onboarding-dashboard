import InterfazAluna from "./interfaz-aluna/interfaz-aluna";
import "./aluna-click-and-xperience.css";
import OverlayShadow from "../../components/overlays/overlay-shadow";

export default function AlunaClickAndXperience() {
  return (
    <div className="face face-front">
      <div className="face-front-frame">
        <div className="aluna-app">
          {/* Background styles */}
          <div className="aluna-bg" />
          <div className="aluna-bg-border" />
          <OverlayShadow />

          {/* Content */}
          <InterfazAluna />
        </div>
      </div>
    </div>
  );
}
