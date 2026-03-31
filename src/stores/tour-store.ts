import { create } from 'zustand';
import { TOUR_STEPS } from '@/data/tour-steps';
import { useWindowStore } from '@/stores/window-store';
import { useAIStore } from '@/stores/ai-store';
import { useVisitorStore } from '@/stores/visitor-store';
import { WINDOW_CONFIGS } from '@/hooks/use-ai-commands';
import { DEFAULT_WINDOW_SIZE, DEFAULT_WINDOW_MIN_SIZE } from '@/utils/constants';
import type { WindowType } from '@/types/window';

interface TourStore {
  isActive: boolean;
  currentStepIndex: number;
  hasCompletedTour: boolean;

  startTour: () => void;
  nextStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
}

function executeStepAction(stepIndex: number) {
  const step = TOUR_STEPS[stepIndex];
  if (step?.action?.type === 'openWindow') {
    const config = WINDOW_CONFIGS[step.action.windowType];
    if (config) {
      useWindowStore.getState().openWindow({
        id: step.action.windowType,
        type: step.action.windowType as WindowType,
        title: config.title,
        icon: config.icon,
        position: {
          x: 180 + Math.random() * 100,
          y: 60 + Math.random() * 80,
        },
        size: { ...DEFAULT_WINDOW_SIZE },
        minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
      });
    }
  }
}

export const useTourStore = create<TourStore>((set, get) => ({
  isActive: false,
  currentStepIndex: 0,
  hasCompletedTour: localStorage.getItem('hilalOS-tour-complete') === '1',

  startTour: () => {
    set({ isActive: true, currentStepIndex: 0 });
  },

  nextStep: () => {
    const { currentStepIndex } = get();
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= TOUR_STEPS.length) {
      get().completeTour();
      return;
    }

    set({ currentStepIndex: nextIndex });
    executeStepAction(nextIndex);
  },

  skipTour: () => {
    get().completeTour();
  },

  completeTour: () => {
    localStorage.setItem('hilalOS-tour-complete', '1');
    localStorage.setItem('hilalOS-visited', '1');
    set({ isActive: false, hasCompletedTour: true });

    // After the overlay fades out, open AI chat with a welcome message
    setTimeout(() => {
      useWindowStore.getState().openWindow({
        id: 'ai-chat',
        type: 'ai-chat',
        title: 'Hilal Agent',
        icon: '🔮',
        position: { x: 300, y: 100 },
        size: { ...DEFAULT_WINDOW_SIZE },
        minSize: { ...DEFAULT_WINDOW_MIN_SIZE },
      });
      const visitorType = useVisitorStore.getState().visitorType;
      const welcomeMsg = visitorType === 'recruiter'
        ? "Tour complete! I'm Hilal — the developer behind this OS. Since you're evaluating my work, I'd recommend starting with My Projects and My Experience. Feel free to ask me anything!"
        : "Tour complete! I'm Hilal — welcome to my portfolio OS. Explore freely, and ask me anything you're curious about!";
      useAIStore.getState().addSystemEvent(welcomeMsg);
    }, 500);
  },
}));
