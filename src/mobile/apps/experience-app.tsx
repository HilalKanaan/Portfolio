import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

/** Experience — a Win95 timeline. */
export function ExperienceApp() {
  return (
    <div className="pk-scroll pk-orb-clear flex-1 px-3 py-3">
      {experiences.map((exp, i) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26, delay: 0.07 * i }}
          className="relative pl-6 pb-4"
        >
          {/* Rail */}
          {i < experiences.length - 1 && (
            <span
              className="absolute"
              style={{
                left: 7,
                top: 18,
                bottom: -4,
                width: 2,
                boxShadow: 'var(--shadow-win-pressed)',
              }}
              aria-hidden
            />
          )}
          <span
            className="absolute flex items-center justify-center"
            style={{
              left: 0,
              top: 4,
              width: 16,
              height: 16,
              background: 'var(--color-win-bg)',
              boxShadow: 'var(--shadow-win-raised)',
              fontSize: 8,
            }}
            aria-hidden
          >
            ●
          </span>

          <div className="win-raised px-3 py-3">
            <div
              className="pk-pixel"
              style={{ fontSize: 16, color: 'var(--color-win-title-active)' }}
            >
              {exp.period}
            </div>
            <div className="font-bold" style={{ fontSize: 14, marginTop: 2 }}>
              {exp.icon} {exp.role}
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-win-dark)', marginTop: 1 }}>
              {exp.company}
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.5, margin: '8px 0 10px' }}>
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span key={t} className="pk-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
      <div className="pk-tiny text-center pb-2" style={{ color: 'var(--color-win-dark)' }}>
        — end of timeline —
      </div>
    </div>
  );
}
