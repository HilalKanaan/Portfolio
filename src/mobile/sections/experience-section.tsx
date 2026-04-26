import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { experiences } from '@/data/experience';
import { SectionHeader } from '../components/section-header';

const CARD_WIDTH_PCT = 80; // each card occupies ~80vw

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // The scroll travels through (n-1) card widths worth of horizontal distance
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(experiences.length - 1) * CARD_WIDTH_PCT}vw`]
  );
  const smoothX = useSpring(x, { damping: 28, stiffness: 180, mass: 0.6 });

  // Active card index for the dot indicator
  const activeIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, experiences.length - 1]
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${experiences.length * 100}vh` }}
    >
      {/* Sticky pinned viewport */}
      <div
        className="sticky top-0 flex flex-col overflow-hidden"
        style={{ height: '100dvh' }}
      >
        {/* Header */}
        <div className="px-[24px] pt-[60px] pb-[24px]">
          <SectionHeader
            number="03"
            eyebrow="Experience"
            title="Where I've"
            italic="worked."
          />
        </div>

        {/* Horizontal scrolling track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            className="flex gap-[16px] pl-[24px]"
            style={{ x: smoothX }}
          >
            {experiences.map((e, i) => (
              <motion.div
                key={e.id}
                className="flex-shrink-0 rounded-[20px] relative overflow-hidden"
                style={{
                  width: '76vw',
                  maxWidth: 380,
                  minHeight: 420,
                  background: 'var(--m-card)',
                  border: '1px solid var(--m-line)',
                }}
              >
                {/* Number watermark */}
                <span
                  className="m-display-italic absolute"
                  style={{
                    top: -12,
                    right: -8,
                    fontSize: 220,
                    color: 'var(--m-line-strong)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Accent gradient corner */}
                <div
                  className="absolute top-0 left-0 w-[140px] h-[140px]"
                  style={{
                    background:
                      'radial-gradient(circle at top left, var(--m-accent-soft), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div className="relative p-[24px] flex flex-col h-full">
                  {/* Period chip */}
                  <span
                    className="self-start mb-[20px] px-[10px] py-[5px] rounded-full"
                    style={{
                      border: '1px solid var(--m-line-strong)',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--m-accent)',
                    }}
                  >
                    {e.period}
                  </span>

                  {/* Role */}
                  <h3
                    className="m-display m-0 mb-[6px]"
                    style={{
                      fontSize: 26,
                      lineHeight: 1.1,
                      color: 'var(--m-ink)',
                    }}
                  >
                    {e.role}
                  </h3>

                  {/* Company */}
                  <p
                    className="m-0 mb-[20px]"
                    style={{
                      fontSize: 14,
                      color: 'var(--m-ink-soft)',
                      fontWeight: 500,
                    }}
                  >
                    {e.company}
                  </p>

                  {/* Description */}
                  <p
                    className="m-0 mb-[20px] flex-1"
                    style={{
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: 'var(--m-ink-soft)',
                    }}
                  >
                    {e.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-[6px]">
                    {e.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10.5,
                          padding: '4px 10px',
                          borderRadius: 999,
                          border: '1px solid var(--m-line-strong)',
                          color: 'var(--m-muted)',
                          fontWeight: 500,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="flex-shrink-0" style={{ width: 24 }} />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="px-[24px] py-[24px] flex items-center gap-[10px]">
          {experiences.map((_, i) => (
            <Dot key={i} index={i} active={activeIndex} />
          ))}
          <span
            className="ml-auto m-eyebrow"
            style={{ fontSize: 10, color: 'var(--m-ink-soft)' }}
          >
            ↕ Scroll to navigate
          </span>
        </div>
      </div>
    </section>
  );
}

function Dot({
  index,
  active,
}: {
  index: number;
  active: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(active, (v) => {
    const dist = Math.abs(v - index);
    return Math.max(0.2, 1 - dist * 0.7);
  });
  const width = useTransform(active, (v) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 24 : 6;
  });

  return (
    <motion.span
      style={{
        height: 6,
        width,
        borderRadius: 999,
        background: 'var(--m-accent)',
        opacity,
        display: 'block',
      }}
    />
  );
}
