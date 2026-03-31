export interface TourStep {
  id: string;
  /** Matches a data-tour-id attribute in the DOM. null = no spotlight (centered). */
  targetId: string | null;
  title: string;
  message: string;
  action?: {
    type: 'openWindow';
    windowType: string;
  };
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    targetId: null,
    title: 'Welcome to HilalOS!',
    message:
      "Hey there! I'm Hilal's digital assistant. Let me give you a quick tour of this portfolio OS — it'll only take a moment!",
  },
  {
    id: 'my-computer',
    targetId: 'icon-my-computer',
    title: 'My Computer',
    message:
      "This is My Computer — Hilal's full tech stack lives here. React, TypeScript, Node.js, Python, and more.",
    action: { type: 'openWindow', windowType: 'my-computer' },
  },
  {
    id: 'projects',
    targetId: 'icon-projects',
    title: 'Project Archive',
    message:
      'The project folder. Real-world apps like an AI automotive platform and this very OS. Double-click to browse!',
    action: { type: 'openWindow', windowType: 'projects' },
  },
  {
    id: 'experience',
    targetId: 'icon-experience',
    title: 'Career Timeline',
    message:
      "Hilal's experience timeline — from QA intern to Full Stack Engineer at a government ministry. Each role was a level-up.",
  },
  {
    id: 'ai-chat',
    targetId: 'ai-orb',
    title: 'Meet the AI',
    message:
      "This glowing orb is Hilal's AI clone! Click it anytime to chat — ask about skills, projects, or just say hi.",
  },
];
