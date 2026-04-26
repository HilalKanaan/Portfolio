import { motion } from 'framer-motion';
import { social } from '@/data/social';
import { SectionHeader } from '../components/section-header';
import {
  IconArrowUpRight,
  IconGithub,
  IconLinkedIn,
  IconX,
} from '../components/icons';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: social.github, Icon: IconGithub },
  { label: 'LinkedIn', href: social.linkedin, Icon: IconLinkedIn },
  { label: 'Twitter', href: social.twitter, Icon: IconX },
];

export function ContactSection() {
  return (
    <section className="relative px-[24px] pt-[100px] pb-[140px]">
      <SectionHeader number="05" eyebrow="Get in touch" />

      {/* Big editorial headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="m-display m-0"
        style={{
          fontSize: 'clamp(56px, 16vw, 88px)',
          color: 'var(--m-ink)',
          lineHeight: 0.95,
          marginBottom: 28,
        }}
      >
        Let's build
        <br />
        <span className="m-display-italic" style={{ color: 'var(--m-accent)' }}>
          something.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true, margin: '-80px' }}
        className="m-0 mb-[36px] max-w-[420px]"
        style={{
          fontSize: 16,
          lineHeight: 1.55,
          color: 'var(--m-ink-soft)',
        }}
      >
        Open to full-stack and backend roles, internships, and freelance contracts.
        Reply within 24 hours, usually faster.
      </motion.p>

      {/* Email card — main CTA */}
      <motion.a
        href={`mailto:${social.email}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        viewport={{ once: true, margin: '-80px' }}
        className="block relative rounded-[20px] no-underline overflow-hidden mb-[12px]"
        style={{
          background: 'var(--m-card)',
          border: '1px solid var(--m-line-strong)',
          padding: 24,
        }}
      >
        {/* Glow accent */}
        <div
          className="absolute"
          style={{
            top: '-50%',
            right: '-20%',
            width: '70%',
            height: '200%',
            background:
              'radial-gradient(ellipse, var(--m-accent-soft), transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative flex items-center justify-between gap-[16px]">
          <div className="flex-1 min-w-0">
            <div
              className="m-eyebrow mb-[8px]"
              style={{ fontSize: 9 }}
            >
              Email me
            </div>
            <div
              className="m-display"
              style={{
                fontSize: 22,
                color: 'var(--m-ink)',
                lineHeight: 1.1,
                wordBreak: 'break-all',
              }}
            >
              {social.email}
            </div>
          </div>
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(0, 229, 255, 0.4)',
                '0 0 0 16px rgba(0, 229, 255, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: 52,
              height: 52,
              background: 'var(--m-accent)',
              color: 'var(--m-bg)',
            }}
          >
            <IconArrowUpRight size={20} />
          </motion.div>
        </div>
      </motion.a>

      {/* Social row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-3 gap-[10px]"
      >
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.94 }}
            className="flex flex-col items-center justify-center gap-[10px] rounded-[16px] no-underline"
            style={{
              padding: '20px 12px',
              background: 'var(--m-card)',
              border: '1px solid var(--m-line)',
              color: 'var(--m-ink)',
            }}
            aria-label={label}
          >
            <Icon size={22} />
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--m-ink-soft)' }}>
              {label}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <div
        className="mt-[80px] pt-[24px] flex items-center justify-between"
        style={{
          borderTop: '1px solid var(--m-line)',
        }}
      >
        <div
          className="m-display-italic"
          style={{
            fontSize: 14,
            color: 'var(--m-muted)',
          }}
        >
          Hilal Kanaan
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'var(--m-muted)',
            letterSpacing: '0.06em',
          }}
        >
          © 2026 — Beirut
        </div>
      </div>
    </section>
  );
}
