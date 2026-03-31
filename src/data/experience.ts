export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
  icon: string;
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Backend Developer',
    company: 'Lebanese Ministry of Youth and Sports',
    period: 'Jan 2026 — Present',
    description:
      'Developing scalable RESTful APIs using Express.js for a national app targeting Lebanese youth, supporting 100+ active vendors. Designed secure backend services for real-time promo code validation and optimized database queries for performance at scale.',
    tech: ['Express.js', 'Node.js', 'RESTful APIs'],
    icon: '🏛️',
  },
  {
    id: 'exp-2',
    role: 'Full Stack Software Engineer',
    company: 'Freelance / Contract',
    period: 'Dec 2025 — Present',
    description:
      'Engineered a custom Google Maps-style tile system achieving 97% reduction in initial load times for a real estate platform. Architected responsive full-stack solutions with Next.js, React, and TypeScript featuring interactive admin dashboards.',
    tech: ['Next.js', 'React', 'TypeScript'],
    icon: '🚀',
  },
  {
    id: 'exp-3',
    role: 'Full Stack Development Intern',
    company: 'IDS Fintech',
    period: 'Aug — Oct 2025',
    description:
      'Designed and implemented SQL Server databases with optimized query structures. Spearheaded the integration of an AI recommendation engine delivering personalized user experiences by analyzing engagement and preferences.',
    tech: ['SQL Server', 'AI/ML', 'Node.js'],
    icon: '💳',
  },
  {
    id: 'exp-4',
    role: 'QA Engineering Intern',
    company: 'Toothpick',
    period: 'Jul — Sep 2025',
    description:
      'Engineered comprehensive manual exploratory testing scenarios and edge cases to stress-test complex web flows and CMS systems, uncovering critical vulnerabilities and production-level bugs.',
    tech: ['Manual Testing', 'CMS', 'Web QA'],
    icon: '🔍',
  },
];
