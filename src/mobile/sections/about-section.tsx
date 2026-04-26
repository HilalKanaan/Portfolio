import { motion } from 'framer-motion';
import { SectionHeader } from '../components/section-header';

const META = [
  { label: 'Education', value: 'BAU · CS', detail: 'AI Track · GPA 3.7' },
  { label: 'Based in', value: 'Beirut, LB', detail: 'Open globally' },
  { label: 'Currently', value: 'Available', detail: 'For new roles' },
];

export function AboutSection() {
  return (
    <section className="relative px-[24px] py-[100px]">
      <SectionHeader number="01" eyebrow="About" />

      {/* Pull quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-80px' }}
        className="m-0 mb-[44px]"
      >
        <p
          className="m-display m-0"
          style={{
            fontSize: 'clamp(32px, 8.5vw, 44px)',
            lineHeight: 1.08,
            color: 'var(--m-ink)',
            letterSpacing: '-0.02em',
          }}
        >
          I build interfaces that feel{' '}
          <span className="m-display-italic" style={{ color: 'var(--m-accent)' }}>
            inevitable
          </span>{' '}
          —<br />
          and the systems behind them.
        </p>
      </motion.blockquote>

      {/* Body paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true, margin: '-80px' }}
        className="m-0 mb-[40px]"
        style={{
          fontSize: 16,
          lineHeight: 1.65,
          color: 'var(--m-ink-soft)',
          maxWidth: 460,
        }}
      >
        I'm a Computer Science student at Beirut Arab University on the AI track, and a backend developer at the
        Lebanese Ministry of Youth and Sports. On the side, I freelance — building full-stack products,
        AI-powered tools, and the occasional Windows 95 simulation as a portfolio.
      </motion.p>

      {/* Meta grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-3 gap-[10px]"
      >
        {META.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-[14px] p-[14px]"
            style={{
              background: 'var(--m-card)',
              border: '1px solid var(--m-line)',
            }}
          >
            <div
              className="m-eyebrow"
              style={{ fontSize: 9, marginBottom: 8 }}
            >
              {m.label}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--m-ink)',
                letterSpacing: '-0.01em',
                marginBottom: 2,
              }}
            >
              {m.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--m-muted)' }}>
              {m.detail}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
