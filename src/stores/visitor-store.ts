import { create } from 'zustand';
import { trackVisitorType } from '@/lib/tracking';

export type VisitorType = 'recruiter' | 'visitor' | null;

interface VisitorStore {
  visitorType: VisitorType;
  showVisitorDialog: boolean;
  setVisitorType: (type: 'recruiter' | 'visitor') => void;
}

const storedType = localStorage.getItem('hilalOS-visitor-type') as VisitorType;
const alreadyVisited = localStorage.getItem('hilalOS-visited') === '1';

export const useVisitorStore = create<VisitorStore>((set) => ({
  visitorType: storedType,
  showVisitorDialog: !alreadyVisited && !storedType,

  setVisitorType: (type) => {
    localStorage.setItem('hilalOS-visitor-type', type);
    trackVisitorType(type);
    set({ visitorType: type, showVisitorDialog: false });
  },
}));
