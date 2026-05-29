const LEAD_STORAGE_KEY = "aluna_lead";
const LEAD_EXPIRY_DAYS = 30;

interface StoredLead {
  lead_id: string;
  folio: string;
  firstName: string;
  expiresAt: number;
}

export const leadStorage = {
  save: (lead: Omit<StoredLead, "expiresAt">) => {
    const expiresAt = Date.now() + LEAD_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(
      LEAD_STORAGE_KEY,
      JSON.stringify({ ...lead, expiresAt }),
    );
  },

  get: (): Omit<StoredLead, "expiresAt"> | null => {
    try {
      const raw = localStorage.getItem(LEAD_STORAGE_KEY);
      if (!raw) return null;

      const stored: StoredLead = JSON.parse(raw);
      if (Date.now() > stored.expiresAt) {
        localStorage.removeItem(LEAD_STORAGE_KEY);
        return null;
      }

      const { expiresAt, ...lead } = stored;
      return lead;
    } catch {
      return null;
    }
  },

  clear: () => localStorage.removeItem(LEAD_STORAGE_KEY),
};
