import { motion } from 'framer-motion';
import { skillGroups } from '@/data/skills';

const DRIVE_LETTERS = ['C:', 'D:', 'E:', 'F:'];
const DRIVE_ICONS = ['🖥️', '⚙️', '🗄️', '🧰'];

/** Skills — each group is a local drive with a capacity bar. */
export function SkillsApp() {
  const maxItems = Math.max(...skillGroups.map((g) => g.items.length));

  return (
    <div className="pk-scroll pk-orb-clear flex-1 px-3 py-3 flex flex-col gap-3">
      {skillGroups.map((group, i) => {
        const fill = Math.round((group.items.length / maxItems) * 100);
        return (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24, delay: 0.08 * i }}
            className="win-raised px-3 py-3"
          >
            <div className="flex items-center gap-2.5">
              <span style={{ fontSize: 26 }} aria-hidden>
                {DRIVE_ICONS[i % DRIVE_ICONS.length]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold" style={{ fontSize: 14 }}>
                  {group.label} ({DRIVE_LETTERS[i % DRIVE_LETTERS.length]})
                </div>
                <div className="pk-tiny" style={{ color: 'var(--color-win-dark)', marginTop: 2 }}>
                  {group.items.length} modules installed
                </div>
              </div>
            </div>

            {/* Capacity bar */}
            <div className="pk-progress mt-2.5" style={{ height: 14, padding: 2 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fill}%` }}
                transition={{ duration: 0.7, delay: 0.15 + 0.08 * i, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--color-win-highlight)' }}
              />
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {group.items.map((item) => (
                <span key={item} className="pk-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
      <div className="pk-tiny text-center pb-2" style={{ color: 'var(--color-win-dark)' }}>
        {skillGroups.length} drive(s) · no corrupted sectors
      </div>
    </div>
  );
}
