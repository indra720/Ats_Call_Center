import { LeadItem, SEEDED_LEADS } from './mockData';
import { AuthUser } from '@/store/authStore';

const STORAGE_LEADS_KEY = 'ats_leads_cache_v1';

function getStoredLeads(): LeadItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return SEEDED_LEADS;
}

function saveStoredLeads(leads: LeadItem[]) {
  try {
    localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error(e);
  }
}

export const leadService = {
  getLeads: async (user?: AuthUser | null): Promise<LeadItem[]> => {
    // Artificial delay to simulate real network/service layer
    await new Promise((r) => setTimeout(r, 120));
    const all = getStoredLeads();

    if (!user) return all;

    // Scope checking
    if (user.role === 'Agent') {
      return all.filter((l) => l.assignedToId === user.id || l.assignedToName === user.name);
    }
    if (user.role === 'Team Leader' && user.teamId) {
      return all.filter((l) => l.teamId === user.teamId);
    }
    // Admin, Supervisor, Viewer, etc. see all
    return all;
  },

  getLeadById: async (id: string): Promise<LeadItem | undefined> => {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredLeads().find((l) => l.id === id);
  },

  createLead: async (lead: Omit<LeadItem, 'id' | 'createdAt' | 'notesCount'>): Promise<LeadItem> => {
    const all = getStoredLeads();
    const newLead: LeadItem = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      notesCount: 0,
    };
    const next = [newLead, ...all];
    saveStoredLeads(next);
    return newLead;
  },

  updateLead: async (id: string, updates: Partial<LeadItem>): Promise<LeadItem> => {
    const all = getStoredLeads();
    const next = all.map((l) => (l.id === id ? { ...l, ...updates } : l));
    saveStoredLeads(next);
    return next.find((l) => l.id === id)!;
  },

  deleteLead: async (id: string): Promise<void> => {
    const all = getStoredLeads();
    const next = all.filter((l) => l.id !== id);
    saveStoredLeads(next);
  },
};
