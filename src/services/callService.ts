import { CallLogItem, SEEDED_CALL_LOGS } from './mockData';
import { AuthUser } from '@/store/authStore';

const STORAGE_CALLS_KEY = 'ats_calls_cache_v1';

function getStoredCalls(): CallLogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_CALLS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return SEEDED_CALL_LOGS;
}

function saveStoredCalls(calls: CallLogItem[]) {
  try {
    localStorage.setItem(STORAGE_CALLS_KEY, JSON.stringify(calls));
  } catch (e) {
    console.error(e);
  }
}

export const callService = {
  getCallLogs: async (user?: AuthUser | null): Promise<CallLogItem[]> => {
    await new Promise((r) => setTimeout(r, 120));
    const all = getStoredCalls();

    if (!user) return all;

    if (user.role === 'Agent') {
      return all.filter((c) => c.agentId === user.id || c.agentName === user.name);
    }
    if (user.role === 'Team Leader' && user.teamId) {
      return all.filter((c) => c.teamId === user.teamId);
    }
    return all;
  },

  logCall: async (call: Omit<CallLogItem, 'id'>): Promise<CallLogItem> => {
    const all = getStoredCalls();
    const newCall: CallLogItem = {
      ...call,
      id: `call-${Date.now()}`,
    };
    const next = [newCall, ...all];
    saveStoredCalls(next);
    return newCall;
  },
};
