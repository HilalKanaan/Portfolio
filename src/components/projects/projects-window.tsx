import { useState } from 'react';
import { WindowContent } from '@/components/window/window-content';
import { projects, type Project } from '@/data/projects';
import { trackProjectView, trackProjectLinkClick } from '@/lib/tracking';

function ProjectCard({
  project,
  isSelected,
  onSelect,
}: {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`p-[6px] cursor-pointer border border-transparent ${
        isSelected
          ? 'bg-[var(--color-win-highlight)] text-white border-[var(--color-win-darker)]'
          : 'hover:bg-[var(--color-win-light)]'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-[8px]">
        <span className="text-[28px] flex-shrink-0 leading-none">
          {project.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div
            className={`text-[12px] font-bold ${
              isSelected ? 'text-white' : ''
            }`}
          >
            {project.title}
          </div>
          <div
            className={`text-[11px] mt-[2px] leading-[1.4] ${
              isSelected ? 'text-[#ccc]' : 'text-[#555]'
            }`}
          >
            {project.description}
          </div>
          <div className="flex flex-wrap gap-[3px] mt-[4px]">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`text-[9px] px-[4px] py-[1px] ${
                  isSelected
                    ? 'bg-[#0000b0] text-[#ccc]'
                    : 'bg-[var(--color-win-light)] text-[#333] shadow-[var(--shadow-win-raised)]'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsWindow() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId);

  return (
    <WindowContent>
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex items-center gap-[2px] px-[4px] py-[2px] border-b border-[var(--color-win-dark)]">
          <span className="text-[11px] text-[#555]">
            {projects.length} project(s)
          </span>
          <div className="flex-1" />
          {selected?.link && (
            <a
              href={selected.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[20px] px-[8px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer flex items-center no-underline text-inherit"
              onClick={() => trackProjectLinkClick(selected.id, selected.link!)}
            >
              Live Demo
            </a>
          )}
          {selected?.github && (
            <a
              href={selected.github}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[20px] px-[8px] text-[11px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer flex items-center no-underline text-inherit"
            >
              Source Code
            </a>
          )}
        </div>

        {/* Project list */}
        <div className="flex-1 overflow-auto win-scrollbar">
          <div className="divide-y divide-[var(--color-win-light)]">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedId === project.id}
                onSelect={() => {
                  const newId = selectedId === project.id ? null : project.id;
                  setSelectedId(newId);
                  if (newId) trackProjectView(newId);
                }}
              />
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex-shrink-0 h-[20px] flex items-center px-[6px] border-t border-[var(--color-win-light)] shadow-[inset_0_1px_0_var(--color-win-dark)]">
          <span className="text-[11px] text-[#555]">
            {selected
              ? `${selected.title} — ${selected.tech.length} technologies`
              : 'Select a project to view details'}
          </span>
        </div>
      </div>
    </WindowContent>
  );
}
