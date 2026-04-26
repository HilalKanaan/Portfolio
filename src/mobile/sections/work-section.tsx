import { projects } from '@/data/projects';
import { SectionHeader } from '../components/section-header';
import { ProjectCard } from '../components/project-card';

export function WorkSection() {
  return (
    <section className="relative px-[24px] py-[100px]">
      <SectionHeader
        number="02"
        eyebrow="Selected Work"
        title="Things I've"
        italic="built."
      />
      <div className="flex flex-col gap-[20px]">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
