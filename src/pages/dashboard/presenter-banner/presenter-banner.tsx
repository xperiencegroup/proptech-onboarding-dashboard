import { useEffect, useState } from "react";
import { useDashboardStore } from "../../../store/dashboard/useDashboardStore";
import "./presenter-banner.css";
import { useSessionStore } from "../../../store/session/useSessionStore";

export default function PresenterBanner() {
  const fetchLeads = useDashboardStore((state) => state.fetchLeads);
  const leads = useDashboardStore((state) => state.leads);
  const enSeguimiento = useDashboardStore((state) => state.enSeguimiento);
  const cerrados = useDashboardStore((state) => state.cerrados);
  const pipeline = useDashboardStore((state) => state.pipeline);
  const conversion = useDashboardStore((state) => state.conversion);
  const name = useSessionStore((state) => state.name);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <>
      {/* <!-- Greeting  --> */}
      <div className="greeting-bar">
        <div>
          <div className="greeting-eyebrow">
            {now.toLocaleDateString("es-MX", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" · "}
            {now.toLocaleTimeString("es-MX", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>

          <div className="greeting-title" id="greetingTitle">
            Buenas tardes, <span className="name">{name}</span>.
          </div>
          <div className="greeting-sub" id="greetingSub">
            {leads.length} leads activos · {leads.length} Experience Analysis
            nuevos · 1 en sesión ahora
          </div>
        </div>
        <div className="kpis">
          <div className="kpi">
            <div className="kpi-label">Prospectos · mes</div>
            <div className="kpi-value">
              {leads.length} <span className="kpi-delta">{leads.length}</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">En seguimiento</div>
            <div className="kpi-value">
              {enSeguimiento}{" "}
              <span className="kpi-delta">+{enSeguimiento}</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Cerrados · mes</div>
            <div className="kpi-value">
              {cerrados} <span className="kpi-delta">+{cerrados}</span>
            </div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Pipeline</div>
            <div className="kpi-value">{pipeline}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Conversión</div>
            <div className="kpi-value">{conversion}%</div>
          </div>
        </div>
      </div>
    </>
  );
}
