import { create } from 'zustand';

export interface ActiveCallState {
  isActive: boolean;
  isRinging: boolean;
  contactName: string;
  phoneNumber: string;
  companyName: string;
  leadId?: string;
  durationSeconds: number;
  isMuted: boolean;
  isOnHold: boolean;
  isRecording: boolean;
  isMinimized: boolean;
  isExpanded: boolean;
  callType: 'inbound' | 'outbound';
  aiSuggestions: string[];
  liveTranscript: { speaker: 'Agent' | 'Customer' | 'AI'; text: string; time: string }[];
  callNotes: string;
}

interface UIState {
  isMobileMenuOpen: boolean;
  isCommandPaletteOpen: boolean;
  isDevRoleSwitcherOpen: boolean;
  activeCall: ActiveCallState;

  // Actions
  setMobileMenuOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setDevRoleSwitcherOpen: (open: boolean) => void;
  startCall: (params: { contactName: string; phoneNumber: string; companyName?: string; leadId?: string; callType?: 'inbound' | 'outbound' }) => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleHold: () => void;
  toggleRecording: () => void;
  toggleCallExpanded: () => void;
  minimizeCall: (minimized: boolean) => void;
  tickCallDuration: () => void;
  addTranscriptLine: (speaker: 'Agent' | 'Customer' | 'AI', text: string) => void;
  setCallNotes: (notes: string) => void;
}

const initialCallState: ActiveCallState = {
  isActive: false,
  isRinging: false,
  contactName: '',
  phoneNumber: '',
  companyName: '',
  durationSeconds: 0,
  isMuted: false,
  isOnHold: false,
  isRecording: true,
  isMinimized: true,
  isExpanded: false,
  callType: 'outbound',
  aiSuggestions: [
    'Acknowledge customer inquiry regarding enterprise pricing tier.',
    'Offer demo scheduling for next Tuesday at 3:00 PM IST.',
    'Mention 15% annual billing discount for 20+ agent licenses.',
  ],
  liveTranscript: [
    { speaker: 'Agent', text: 'Hello, this is Aakash from ATS Call Center. Am I speaking with Rohit Sharma?', time: '00:03' },
    { speaker: 'Customer', text: 'Yes, speaking. I had requested a callback regarding your CRM auto-dialer solution.', time: '00:09' },
    { speaker: 'Agent', text: 'Thanks for reaching out Rohit! I see you currently have 25 sales reps looking for IVR routing and WhatsApp automation.', time: '00:18' },
  ],
  callNotes: 'Interested in WhatsApp integration and call recording compliance. Follow-up proposal due by Friday.',
};

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCommandPaletteOpen: false,
  isDevRoleSwitcherOpen: false,
  activeCall: initialCallState,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  setDevRoleSwitcherOpen: (open) => set({ isDevRoleSwitcherOpen: open }),

  startCall: ({ contactName, phoneNumber, companyName = 'Tech Solutions Pvt Ltd', leadId, callType = 'outbound' }) => {
    set({
      activeCall: {
        ...initialCallState,
        isActive: true,
        contactName,
        phoneNumber,
        companyName,
        leadId,
        callType,
        durationSeconds: 1,
        isMinimized: false,
        isExpanded: true,
      },
    });
  },

  endCall: () => {
    set((state) => ({
      activeCall: {
        ...state.activeCall,
        isActive: false,
        isExpanded: false,
        durationSeconds: 0,
      },
    }));
  },

  toggleMute: () => {
    set((state) => ({
      activeCall: { ...state.activeCall, isMuted: !state.activeCall.isMuted },
    }));
  },

  toggleHold: () => {
    set((state) => ({
      activeCall: { ...state.activeCall, isOnHold: !state.activeCall.isOnHold },
    }));
  },

  toggleRecording: () => {
    set((state) => ({
      activeCall: { ...state.activeCall, isRecording: !state.activeCall.isRecording },
    }));
  },

  toggleCallExpanded: () => {
    set((state) => ({
      activeCall: { ...state.activeCall, isExpanded: !state.activeCall.isExpanded },
    }));
  },

  minimizeCall: (minimized) => {
    set((state) => ({
      activeCall: { ...state.activeCall, isMinimized: minimized, isExpanded: !minimized },
    }));
  },

  tickCallDuration: () => {
    set((state) => {
      if (!state.activeCall.isActive) return state;
      return {
        activeCall: {
          ...state.activeCall,
          durationSeconds: state.activeCall.durationSeconds + 1,
        },
      };
    });
  },

  addTranscriptLine: (speaker, text) => {
    set((state) => {
      const minutes = Math.floor(state.activeCall.durationSeconds / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (state.activeCall.durationSeconds % 60).toString().padStart(2, '0');
      const time = `${minutes}:${seconds}`;
      return {
        activeCall: {
          ...state.activeCall,
          liveTranscript: [...state.activeCall.liveTranscript, { speaker, text, time }],
        },
      };
    });
  },

  setCallNotes: (notes) => {
    set((state) => ({
      activeCall: { ...state.activeCall, callNotes: notes },
    }));
  },
}));
