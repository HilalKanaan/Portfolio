import { Suspense, lazy } from 'react';
import { motion, type Variants } from 'framer-motion';
import { social } from '@/data/social';
import { IconArrowUpRight, IconArrowDown, IconMail } from '../components/icons';

const Hero3DScene = lazy(() =>
  import('../components/hero-3d-scene').then((m) => ({ default: m.Hero3DScene }))
);

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Animation variants for the reveal
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
  }),
};

export function HeroSection() {
  return (
    <section
      className="relative flex flex-col justify-end px-[24px] pb-[88px] overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* 3D backdrop fills entire hero */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div style={{ background: 'var(--m-bg)', width: '100%', height: '100%' }} />}>
          <Hero3DScene />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Status pill — top of section */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="absolute"
          style={{ top: 'max(env(safe-area-inset-top), 28px)', left: 0, right: 0 }}
        >
          <div className="flex items-center justify-between">
            <div
              className="inline-flex items-center gap-[8px] px-[12px] py-[6px] rounded-full"
              style={{
                border: '1px solid var(--m-line-strong)',
                background: 'rgba(10, 10, 16, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--m-ink)',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="block w-[6px] h-[6px] rounded-full"
                style={{
                  background: 'var(--m-accent)',
                  boxShadow: 'var(--m-accent-glow)',
                }}
              />
              Available
            </div>
            <div
              className="m-eyebrow"
              style={{
                fontSize: 10,
                color: 'var(--m-ink-soft)',
              }}
            >
              HK · 2026
            </div>
          </div>
        </motion.div>

        {/* Display name — Instrument Serif */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          <h1
            className="m-0 m-display"
            style={{
              fontSize: 'clamp(72px, 22vw, 120px)',
              color: 'var(--m-ink)',
              lineHeight: 0.92,
            }}
          >
            Hilal
            <br />
            <span className="m-display-italic" style={{ color: 'var(--m-accent)' }}>
              Kanaan
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-[24px] mb-[36px] max-w-[420px]"
          style={{
            fontSize: 17,
            lineHeight: 1.5,
            color: 'var(--m-ink-soft)',
            fontWeight: 400,
          }}
        >
          Full-stack engineer crafting AI-powered products and interfaces that feel{' '}
          <span style={{ fontFamily: 'var(--m-display)', fontStyle: 'italic', color: 'var(--m-ink)' }}>
            inevitable
          </span>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="flex gap-[10px]"
        >
          <motion.a
            href={social.resume}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            className="flex-1 flex items-center justify-center gap-[8px] h-[56px] rounded-full no-underline relative overflow-hidden group"
            style={{
              background: 'var(--m-ink)',
              color: 'var(--m-bg)',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            <span className="relative z-10">View Resume</span>
            <IconArrowUpRight size={16} />
          </motion.a>
          <motion.a
            href={`mailto:${social.email}`}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center w-[56px] h-[56px] rounded-full no-underline"
            style={{
              border: '1px solid var(--m-line-strong)',
              background: 'rgba(14, 14, 20, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'var(--m-ink)',
            }}
            aria-label="Email Hilal"
          >
            <IconMail size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute z-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[6px]"
        style={{ bottom: 24, color: 'var(--m-ink-soft)' }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'block' }}
        >
          <IconArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}
