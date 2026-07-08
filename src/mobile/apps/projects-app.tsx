import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data/projects';
import { trackProjectLinkClick } from '@/lib/tracking';
import { haptic } from '../lib/haptics';

function ProjectRow({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        haptic();
        onOpen();
      }}
      className="win-raised w-full text-left cursor-pointer flex items-center gap-3 px-3 py-3 border-0"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <span style={{ fontSize: 30 }} aria-hidden>
        {project.icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold" style={{ fontSize: 14 }}>
          {project.title}
        </span>
        <span
          className="block truncate"
          style={{ fontSize: 11.5, color: 'var(--color-win-dark)' }}
        >
          {project.description}
        </span>
      </span>
      <span style={{ fontSize: 16, color: 'var(--color-win-dark)' }} aria-hidden>
        ▶
      </span>
    </motion.button>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <motion.div
      key={project.id}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className="absolute inset-0 flex flex-col"
      style={{ background: 'var(--color-win-bg)' }}
    >
      <div className="flex items-center gap-2 p-2">
        <button
          type="button"
          className="pk-btn font-bold"
          onClick={() => {
            haptic();
            onBack();
          }}
        >
          ◀ Back
        </button>
        <span className="truncate font-bold" style={{ fontSize: 13 }}>
          {project.title}
        </span>
      </div>
      <div className="pk-scroll pk-orb-clear flex-1 px-3 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="win-sunken flex items-center justify-center shrink-0"
            style={{ width: 64, height: 64, fontSize: 38 }}
            aria-hidden
          >
            {project.icon}
          </span>
          <div>
            <div className="font-bold" style={{ fontSize: 16 }}>
              {project.title}
            </div>
            <div className="pk-tiny" style={{ color: 'var(--color-win-dark)', marginTop: 4 }}>
              {project.tech.length} technologies
            </div>
          </div>
        </div>

        <p style={{ fontSize: 13.5, lineHeight: 1.55, margin: '0 0 14px' }}>
          {project.description}
        </p>

        <div className="pk-tiny" style={{ marginBottom: 6, color: 'var(--color-win-dark)' }}>
          Built with
        </div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="pk-chip">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pk-btn flex items-center justify-center gap-2 font-bold no-underline"
              style={{ minHeight: 48, color: 'var(--color-win-text)' }}
              onClick={() => {
                haptic();
                trackProjectLinkClick(project.id, project.link!);
              }}
            >
              🌐 Open Live Site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pk-btn flex items-center justify-center gap-2 no-underline"
              style={{ minHeight: 48, color: 'var(--color-win-text)' }}
              onClick={() => {
                haptic();
                trackProjectLinkClick(project.id, project.github!);
              }}
            >
              🐙 View Source
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** My Projects — Explorer folder with slide-in detail view. */
export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden">
      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-2">
        <span style={{ fontSize: 11 }}>Address</span>
        <span
          className="win-sunken flex-1 px-2 py-1 pk-pixel"
          style={{ fontSize: 16, color: '#000' }}
        >
          C:\My Projects
        </span>
      </div>

      <div className="pk-scroll pk-orb-clear flex-1 px-2 pb-3 flex flex-col gap-2">
        {projects.map((p) => (
          <ProjectRow key={p.id} project={p} onOpen={() => setSelected(p)} />
        ))}
      </div>

      <div
        className="flex items-center justify-between px-2"
        style={{ minHeight: 24, fontSize: 11 }}
      >
        <span>{projects.length} object(s)</span>
        <span>Shipped &amp; live ✓</span>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectDetail project={selected} onBack={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
