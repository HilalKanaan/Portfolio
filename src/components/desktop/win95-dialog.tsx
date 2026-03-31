import { motion } from 'framer-motion';

interface Win95DialogProps {
  title: string;
  icon: string;
  message: string;
  buttons: { label: string; onClick: () => void }[];
}

export function Win95Dialog({
  title,
  icon,
  message,
  buttons,
}: Win95DialogProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      <motion.div
        className="relative bg-[var(--color-win-bg)] shadow-[var(--shadow-win-frame)] min-w-[320px] max-w-[420px]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.15, type: 'spring', stiffness: 400 }}
      >
        {/* Title bar */}
        <div className="win-title-active flex items-center gap-[4px] px-[4px] py-[2px]">
          <span className="text-[12px]">{icon}</span>
          <span className="text-white text-[12px] font-bold flex-1">
            {title}
          </span>
          <button className="w-[16px] h-[14px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] text-[10px] leading-none flex items-center justify-center cursor-pointer">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-[12px] p-[16px]">
          <span className="text-[32px] flex-shrink-0">{icon}</span>
          <p className="text-[12px] leading-[1.6] pt-[6px]">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-[6px] pb-[12px] px-[16px]">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className="h-[23px] min-w-[75px] px-[12px] text-[12px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] active:shadow-[var(--shadow-win-pressed)] cursor-pointer border-none"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
