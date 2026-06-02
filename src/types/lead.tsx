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
  chat: LeadChat[];
  navigation: LeadNavigation[];
  quotes: LeadQuote[];
}

export interface LeadChat {
  id: string;
  session_id: string | null;
  role: string;
  content: string;
  created_at: string;
}

export interface LeadNavigation {
  id: string;
  view: string;
  duration_s: number | null;
  created_at: string;
}

export interface LeadQuote {
  id: string;
  lot_number: number | null;
  modelo: string | null;
  area: number | null;
  precio_lista: number | null;
  modalidad: string | null;
  tasa: number | null;
  enganche_pct: number | null;
  enganche_monto: number | null;
  financiado: number | null;
  plazo_anios: number | null;
  cuota_mensual: number | null;
  generado_en: string | null;
  created_at: string;
}
