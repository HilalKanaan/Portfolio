import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Project } from '@/data/projects';
import { PROJECT_GLYPHS, IconArrowUpRight } from './icons';

const COLOR_THEMES: Record<string, { from: string; via: string; to: string; glow: string }> = {
  hilalos: {
    from: '#5B21B6',
    via: '#0891B2',
    to: '#1E1B4B',
    glow: 'rgba(99, 102, 241, 0.4)',
  },
  corsa: {
    from: '#DC2626',
    via: '#F97316',
    to: '#1E293B',
    glow: 'rgba(249, 115, 22, 0.4)',
  },
  'money-tracker': {
    from: '#10B981',
    via: '#06B6D4',
    to: '#064E3B',
    glow: 'rgba(16, 185, 129, 0.4)',
  },
  'student-rep': {
    from: '#2563EB',
    via: '#38BDF8',
    to: '#1E3A8A',
    glow: 'rgba(56, 189, 248, 0.4)',
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  // Tilt transforms based on touch position
  const rotateX = useTransform(my, [0, 1], [6, -6]);
  const rotateY = useTransform(mx, [0, 1], [-6, 6]);

  const Glyph = PROJECT_GLYPHS[project.id as keyof typeof PROJECT_GLYPHS] ?? PROJECT_GLYPHS.hilalos;
  const theme = COLOR_THEMES[project.id] ?? COLOR_THEMES.hilalos;

  const handleMove = (e: React.PointerEvent | React.TouchEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const point =
      'touches' in e
        ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
        : (e as React.PointerEvent);
    mx.set((point.clientX - rect.left) / rect.width);
    my.set((point.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={handleMove}
      onTouchMove={handleMove}
      onPointerLeave={reset}
      onTouchEnd={reset}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="relative block rounded-[20px] overflow-hidden no-underline"
    >
      {/* Outer card */}
      <div
        className="relative"
        style={{
          background: 'var(--m-card)',
          border: '1px solid var(--m-line)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: 'var(--m-shadow-card)',
        }}
      >
        {/* Animated mesh gradient art */}
        <div
          className="relative h-[180px] overflow-hidden"
          style={{
            background: `radial-gradient(120% 80% at 30% 20%, ${theme.from}, transparent 60%),
                         radial-gradient(100% 80% at 80% 80%, ${theme.via}, transparent 55%),
                         linear-gradient(135deg, ${theme.to}, #0A0A0F)`,
          }}
        >
          {/* Floating glow orb */}
          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 15, -10],
            }}
            transition={{
              duration: 8 + index * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute"
            style={{
              top: '40%',
              left: '20%',
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: theme.glow,
              filter: 'blur(48px)',
              pointerEvents: 'none',
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(0deg, white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            }}
          />

          {/* Custom SVG glyph */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'rgba(255, 255, 255, 0.95)',
              filter: 'drop-shadow(0 4px 24px rgba(0, 0, 0, 0.4))',
            }}
          >
            <Glyph size={72} />
          </div>

          {/* Index badge */}
          <div
            className="absolute top-[14px] left-[14px] flex items-center gap-[6px] px-[10px] py-[5px] rounded-full"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <span style={{ fontFamily: 'var(--m-display)', fontStyle: 'italic', fontSize: 12 }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span style={{ opacity: 0.6 }}>/</span>
            <span style={{ opacity: 0.6 }}>{String(4).padStart(2, '0')}</span>
          </div>

          {/* Hover/tap arrow */}
          <div
            className="absolute top-[14px] right-[14px] flex items-center justify-center w-[32px] h-[32px] rounded-full"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'white',
            }}
          >
            <IconArrowUpRight size={14} />
          </div>
        </div>

        {/* Body */}
        <div className="px-[20px] pt-[18px] pb-[20px]">
          <h3
            className="m-display m-0"
            style={{
              fontSize: 26,
              color: 'var(--m-ink)',
              lineHeight: 1.05,
              marginBottom: 8,
            }}
          >
            {project.title}
          </h3>
          <p
            className="m-0 mb-[16px]"
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: 'var(--m-ink-soft)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>

          {/* Marquee tech */}
          <div
            className="overflow-hidden"
            style={{
              borderTop: '1px solid var(--m-line)',
              paddingTop: 12,
              maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div
              className="flex items-center gap-[20px] whitespace-nowrap"
              style={{
                animation: `m-marquee ${30 + index * 4}s linear infinite`,
                width: 'max-content',
              }}
            >
              {[...project.tech, ...project.tech].map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--m-muted)',
                    letterSpacing: '0.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {t}
                  <span
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: '50%',
                      background: 'var(--m-accent)',
                      opacity: 0.5,
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
