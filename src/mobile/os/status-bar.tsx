import { useClock } from '../lib/use-clock';
import { useBattery } from '../lib/use-battery';

function SignalGlyph() {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[3, 5, 7, 9].map((h) => (
        <span key={h} style={{ width: 3, height: h, background: '#fff' }} />
      ))}
    </span>
  );
}

function BatteryGlyph({ level, charging }: { level: number; charging: boolean }) {
  const pct = Math.round(level * 100);
  return (
    <span className="flex items-center gap-[4px]">
      <span className="pk-tiny" style={{ color: '#fff' }}>
        {charging ? '⚡' : ''}
        {pct}%
      </span>
      <span
        className="relative flex items-center"
        style={{ width: 20, height: 10, border: '1px solid #fff', padding: 1 }}
        aria-hidden
      >
        <span
          style={{
            width: `${Math.max(pct, 8)}%`,
            height: '100%',
            background: pct <= 20 && !charging ? '#ff4040' : '#00e000',
          }}
        />
        <span
          className="absolute"
          style={{ right: -3, top: 2, width: 2, height: 4, background: '#fff' }}
        />
      </span>
    </span>
  );
}

/** Phone-style status bar, HilalOS flavored. */
export function StatusBar() {
  const time = useClock();
  const battery = useBattery();

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-end justify-between px-3"
      style={{
        height: 'calc(var(--pk-status-h) + var(--pk-safe-top))',
        paddingTop: 'var(--pk-safe-top)',
        paddingBottom: 5,
        background: '#000',
        zIndex: 9000,
      }}
    >
      <span className="flex items-center gap-2">
        <SignalGlyph />
        <span className="pk-tiny" style={{ color: '#fff' }}>
          HilalNET
        </span>
      </span>
      <span className="flex items-center gap-3">
        <span className="pk-tiny" style={{ color: '#fff' }}>
          {time}
        </span>
        <BatteryGlyph level={battery.level} charging={battery.charging} />
      </span>
    </div>
  );
}
