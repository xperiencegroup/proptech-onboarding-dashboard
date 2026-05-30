export type Stage =
  | "cotizacion"
  | "apartado"
  | "cerrado"
  | "visita"
  | "prospecto";
type Source = "meta" | "google" | "referido" | "organic" | "feria";
type HeatStatus = "hot" | "warm" | "cool" | "won";

// Para la lista
export interface Lead {
  id: string;
  folio: string;
  name: string;
  initials: string;
  score: number;
  stage: Stage;
  last_contact: string;
  last_contact_purpose: string;
  source: Source;
  value: string;
  times_visited: string;
  last_units_visited: string[];
  heatStatus: HeatStatus;
}

// Para el detalle
export interface LeadDetail extends Lead {
  phone: string;
  email: string;
  detailed_source: string;
  activity: string;
  age?: string;
  family?: string;
  usage?: string;
  budget?: string;
  subsidy?: string;
  interest?: string;
  status: string;
  created_at: string;
}
