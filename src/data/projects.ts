export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  icon: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 'hilalos',
    title: 'HilalOS Portfolio',
    description:
      'A fully interactive Windows 95 simulation built as a portfolio website. Features draggable windows, a boot sequence, AI assistant powered by Gemini, and retro theming.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Gemini AI'],
    icon: '🖥️',
    link: 'https://sentient-os-portfolio.web.app',
  },
  {
    id: 'corsa',
    title: 'Corsa',
    description:
      'AI-powered automotive management platform featuring Smart Garage, a Marketplace with 50K+ listings from 500+ verified dealers, AI Diagnostics, Car Compare, Find Mechanics, Parts Sourcing, and Market Intelligence with depreciation tracking.',
    tech: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Recharts', 'Leaflet', 'Spline 3D'],
    icon: '🏎️',
    link: 'https://corsa-pi.vercel.app/',
  },
  {
    id: 'money-tracker',
    title: 'Money Spending Tracker',
    description:
      'Personal finance management app for tracking spending habits with a dashboard balance view, categorized expense tracking, and detailed transaction history.',
    tech: ['React', 'Firebase', 'Firestore'],
    icon: '💰',
    link: 'https://mom-tracker-final-b8bac.web.app/',
  },
  {
    id: 'student-rep',
    title: 'Student Representative Platform',
    description:
      'Institutional portal for Faculty of Science student representatives to submit, discuss, and track issues through the Faculty Council. Features an admin dashboard for management and moderation.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    icon: '🎓',
    link: 'https://studentrepresentative.online/admin',
  },
];
