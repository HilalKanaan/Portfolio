import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { trackProjectLinkClick } from '@/lib/tracking';

interface ProjectBackProps {
  project: Project;
  onFlipBack: () => void;
}

export function ProjectBack({ project, onFlipBack }: ProjectBackProps) {
  return (
    <div className="w-full h-full p-5 flex flex-col">
      {/* Title */}
      <h3 className="text-[18px] font-bold text-white">{project.title}</h3>
      <p className="text-[11px] text-zinc-500 mt-0.5">by Hilal Kanaan</p>

      {/* Description */}
      <div className="mt-3 flex-1 overflow-y-auto scrollbar-hide">
        <p className="text-[12px] text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <p className="text-[10px] text-zinc-600 tracking-[2px] uppercase mt-4 mb-2">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded text-[10px] text-zinc-300 font-medium"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectLinkClick(project.id, project.link!)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[12px] font-medium text-white"
            style={{
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            🔗 Live Demo
          </motion.a>
        )}
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[12px] font-medium text-white"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            🐙 GitHub
          </motion.a>
        )}
      </div>

      {/* Flip back hint */}
      <motion.button
        className="mt-3 text-[11px] text-zinc-600 text-center"
        onClick={onFlipBack}
        whileTap={{ scale: 0.95 }}
      >
        ◄ Tap to flip back
      </motion.button>
    </div>
  );
}
