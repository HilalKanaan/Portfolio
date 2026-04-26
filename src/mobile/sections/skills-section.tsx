import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '@/data/skills';
import { SectionHeader } from '../components/section-header';

export function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section className="relative px-[24px] py-[100px]">
      <SectionHeader
        number="04"
        eyebrow="Skills & Tools"
        title="The"
        italic="stack."
      />

      {/* Group selector */}
      <div className="flex gap-[8px] mb-[28px] flex-wrap">
        {skillGroups.map((g, i) => (
          <button
            key={g.label}
            onClick={() => setActiveGroup(i)}
            className="cursor-pointer relative"
            style={{
              padding: '10px 16px',
              borderRadius: 999,
              border: '1px solid var(--m-line-strong)',
              background:
                activeGroup === i ? 'var(--m-ink)' : 'transparent',
              color: activeGroup === i ? 'var(--m-bg)' : 'var(--m-ink-soft)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '-0.005em',
              transition: 'all 0.3s ease',
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Constellation */}
      <Constellation
        items={skillGroups[activeGroup].items}
        groupIndex={activeGroup}
      />
    </section>
  );
}

interface Position {
  x: number;
  y: number;
}

function Constellation({ items, groupIndex }: { items: string[]; groupIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-compute scattered positions in a 320×420 layout, deterministic per item index
  const positions = items.map<Position>((_, i) => {
    const seed = (i * 73 + groupIndex * 19) % 100;
    const angle = (i / items.length) * Math.PI * 2 + (seed / 100) * 0.6;
    const radius = 110 + (seed % 40);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.78,
    };
  });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{
        width: '100%',
        height: 380,
        maxWidth: 380,
      }}
    >
      {/* Center node */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
        }}
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 64,
          height: 64,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, var(--m-accent), transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'var(--m-accent)',
          boxShadow: '0 0 24px var(--m-accent)',
        }}
      />

      {/* Connection lines (SVG) */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        {positions.map((p, i) => (
          <motion.line
            key={`line-${groupIndex}-${i}`}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${p.x}px)`}
            y2={`calc(50% + ${p.y}px)`}
            stroke="var(--m-line-strong)"
            strokeWidth="0.5"
            strokeDasharray="2,4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 0.6,
              delay: 0.05 * i,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>

      {/* Skill orbs */}
      {items.map((item, i) => (
        <DraggableSkill
          key={`${groupIndex}-${item}`}
          label={item}
          initialX={positions[i].x}
          initialY={positions[i].y}
          delay={0.1 + i * 0.05}
        />
      ))}
    </div>
  );
}

function DraggableSkill({
  label,
  initialX,
  initialY,
  delay,
}: {
  label: string;
  initialX: number;
  initialY: number;
  delay: number;
}) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -180, right: 180, top: -180, bottom: 180 }}
      dragElastic={0.4}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 18,
      }}
      whileDrag={{ scale: 1.08, zIndex: 10 }}
      whileTap={{ scale: 1.05 }}
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: 0.6,
      }}
      animate={{
        opacity: 1,
        x: initialX,
        y: initialY,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.6, delay, type: 'spring', damping: 14 },
        x: { duration: 0.6, delay, type: 'spring', damping: 16 },
        y: { duration: 0.6, delay, type: 'spring', damping: 16 },
      }}
      className="absolute select-none cursor-grab active:cursor-grabbing"
      style={{
        top: '50%',
        left: '50%',
        marginLeft: -1,
        marginTop: -1,
        padding: '8px 14px',
        borderRadius: 999,
        background: 'rgba(14, 14, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--m-line-strong)',
        color: 'var(--m-ink)',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      }}
    >
      {label}
    </motion.div>
  );
}
