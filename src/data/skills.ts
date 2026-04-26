export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'ASP.NET Core', 'REST APIs'],
  },
  {
    label: 'Data',
    items: ['Firebase', 'Firestore', 'Supabase', 'SQL Server', 'PostgreSQL', 'Prisma'],
  },
  {
    label: 'Languages & Tools',
    items: ['Python', 'Java', 'C++', 'C#', 'Git', 'Docker', 'AI/ML Integration'],
  },
];
