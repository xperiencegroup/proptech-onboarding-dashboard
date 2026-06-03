// XperienceAnalytics.tsx
import "./detail-analytics.css";
import { useDashboardStore } from "../../../../../../store/dashboard/useDashboardStore";
import Metrics from "./metrics/metrics";
import Timeline from "./timeline/timeline";
import TimeBars from "./time-bars/time-bars";

export default function XperienceAnalytics() {
  const selectedLead = useDashboardStore((state) => state.selectedLead);

  if (!selectedLead) return null;

  const navigation = selectedLead.navigation ?? [];
  const quotes = selectedLead.quotes ?? [];

  return (
    <div className="panel panel-analytics">
      <div className="panel-header">
        <div className="panel-title featured">
          <span className="panel-title-dot" />
          Xperience Analytics
          <span className="panel-title-flag">Xperience</span>
        </div>
        <div className="panel-action">Sesión completa →</div>
      </div>

      <Metrics navigation={navigation} quotes={quotes} />

      {/* Path real desde BD */}
      <div className="path-section-title">
        Path del cliente · cómo navegó la plataforma
      </div>
      <Timeline navigation={navigation} />

      {/* Time bars */}
      <TimeBars navigation={navigation} />
    </div>
  );
}
