import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  eyebrow: string;
  title?: string;
  italic?: string;
}

export function SectionHeader({ number, eyebrow, title, italic }: SectionHeaderProps) {
  return (
    <div className="mb-[28px]">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center gap-[14px] mb-[20px]"
      >
        <span
          className="m-eyebrow"
          style={{
            color: 'var(--m-accent)',
            fontFamily: 'var(--m-display)',
            fontSize: 14,
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            textTransform: 'none',
          }}
        >
          {number}
        </span>
        <span
          style={{
            flex: 1,
            height: 1,
            background:
              'linear-gradient(90deg, var(--m-line-strong), transparent)',
          }}
        />
        <span className="m-eyebrow">{eyebrow}</span>
      </motion.div>

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="m-display m-0"
          style={{
            fontSize: 'clamp(40px, 11vw, 56px)',
            color: 'var(--m-ink)',
            lineHeight: 1,
          }}
        >
          {title}
          {italic && (
            <>
              {' '}
              <span className="m-display-italic" style={{ color: 'var(--m-accent)' }}>
                {italic}
              </span>
            </>
          )}
        </motion.h2>
      )}
    </div>
  );
}
