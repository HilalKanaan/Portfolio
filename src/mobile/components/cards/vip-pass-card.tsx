import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '../../stores/wallet-store';
import { HolographicSheen } from '../wallet/holographic-sheen';
import { ProjectBack } from './project-back';
import { projects } from '@/data/projects';
import { trackProjectView } from '@/lib/tracking';
import { useEffect } from 'react';

const PROJECT_GRADIENTS: Record<string, string> = {
  hilalos: 'linear-gradient(135deg, #4338CA 0%, #7C3AED 100%)',
  corsa: 'linear-gradient(135deg, #DC2626 0%, #EA580C 100%)',
  'money-tracker': 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
  'student-rep': 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
};

interface VipPassCardProps {
  expanded?: boolean;
}

export function VipPassCard({ expanded = false }: VipPassCardProps) {
  const activeProjectIndex = useWalletStore((s) => s.activeProjectIndex);
  const isFlipped = useWalletStore((s) => s.isProjectFlipped);
  const toggleFlip = useWalletStore((s) => s.toggleProjectFlip);
  const nextProject = useWalletStore((s) => s.nextProject);
  const prevProject = useWalletStore((s) => s.prevProject);

  const project = projects[activeProjectIndex];

  useEffect(() => {
    if (expanded && project) {
      trackProjectView(project.id);
    }
  }, [expanded, project]);

  if (expanded) {
    return (
      <div className="w-full" style={{ perspective: '1200px' }}>
        <motion.div
          className="w-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          {/* FRONT */}
          <div
            className="w-full rounded-[16px] p-5 relative overflow-hidden"
            style={{
              background: '#0A0A0A',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              backfaceVisibility: 'hidden',
            }}
          >
            <HolographicSheen />

            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[3px] uppercase font-medium" style={{ color: '#D4AF37' }}>
                ✦ VIP Access
              </p>
              <p className="text-[11px] text-zinc-600">
                {activeProjectIndex + 1}/{projects.length}
              </p>
            </div>

            {/* Album art */}
            <div
              className="w-full aspect-[16/10] rounded-xl flex items-center justify-center mb-4"
              style={{ background: PROJECT_GRADIENTS[project.id] || PROJECT_GRADIENTS.hilalos }}
            >
              <motion.span
                className="text-[56px]"
                key={project.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                {project.icon}
              </motion.span>
            </div>

            {/* Project name */}
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-[20px] font-bold text-white">{project.title}</h3>
                <p className="text-[12px] text-zinc-500 mt-0.5">by Hilal Kanaan</p>
              </motion.div>
            </AnimatePresence>

            {/* Card number dots */}
            <div className="flex items-center gap-3 mt-4 mb-3">
              {Array.from({ length: 4 }).map((_, g) => (
                <div key={g} className="flex gap-1">
                  {Array.from({ length: 4 }).map((_, d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(212,175,55,0.3)' }} />
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <motion.button
                className="px-4 py-2 text-[12px] text-zinc-500"
                onClick={(e) => { e.stopPropagation(); prevProject(); }}
                whileTap={{ scale: 0.9 }}
              >
                ◄ Prev
              </motion.button>

              <motion.button
                className="px-5 py-2.5 rounded-lg text-[12px] font-medium"
                style={{
                  background: 'rgba(212,175,55,0.12)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: '#D4AF37',
                }}
                onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
                whileTap={{ scale: 0.95 }}
              >
                View Details ↻
              </motion.button>

              <motion.button
                className="px-4 py-2 text-[12px] text-zinc-500"
                onClick={(e) => { e.stopPropagation(); nextProject(); }}
                whileTap={{ scale: 0.9 }}
              >
                Next ►
              </motion.button>
            </div>

            <p className="text-[10px] text-zinc-700 text-center mt-3 tracking-wider uppercase">
              Member Since 2025 · Hilal Kanaan
            </p>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 rounded-[16px] overflow-hidden"
            style={{
              background: '#0A0A0A',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <ProjectBack project={project} onFlipBack={toggleFlip} />
          </div>
        </motion.div>
      </div>
    );
  }

  // Collapsed preview
  return (
    <div
      className="w-full h-full rounded-[16px] p-4 relative overflow-hidden"
      style={{
        background: '#0A0A0A',
        border: '1px solid rgba(212, 175, 55, 0.15)',
      }}
    >
      <HolographicSheen />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] tracking-[3px] uppercase font-medium" style={{ color: '#D4AF37' }}>
            ✦ VIP Access
          </p>
          <h2 className="text-[18px] font-bold text-white mt-1">Projects</h2>
          <p className="text-[12px] text-zinc-400">{projects.length} Featured Works</p>
        </div>
        <div
          className="w-[60px] h-[60px] rounded-xl flex items-center justify-center"
          style={{ background: PROJECT_GRADIENTS[project.id] }}
        >
          <span className="text-[28px]">{project.icon}</span>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <div className="flex gap-2">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: i === activeProjectIndex
                  ? '#D4AF37'
                  : 'rgba(212,175,55,0.2)',
              }}
            />
          ))}
        </div>
        <p className="text-[9px] text-zinc-600">Swipe to browse →</p>
      </div>
    </div>
  );
}
