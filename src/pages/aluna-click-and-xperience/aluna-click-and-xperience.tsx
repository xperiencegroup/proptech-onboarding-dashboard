import InterfazAluna from "./interfaz-aluna/interfaz-aluna";
import { leadStorage } from "../../utils/leadStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OverlayShadow from "../../components/overlays/overlay-shadow";
import "./aluna-click-and-xperience.css";

export default function AlunaClickAndXperience() {
  const navigate = useNavigate();
  const leadStored = leadStorage.get();

  useEffect(() => {
    if (!leadStored?.lead_id) {
      navigate("/onboarding", { replace: true });
    }

    // Escucha cambios en localStorage
    const handleStorage = () => {
      const lead = leadStorage.get();
      if (!lead?.lead_id) {
        navigate("/onboarding", { replace: true });
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!leadStored?.lead_id) return null;

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
