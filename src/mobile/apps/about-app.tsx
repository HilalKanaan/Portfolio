import { bio } from '@/data/bio';

/** About Me.txt — Notepad. */
export function AboutApp() {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div
        className="pk-scroll pk-orb-clear pk-selectable flex-1 px-4 py-3 pk-pixel"
        style={{ background: '#fff', fontSize: 19, lineHeight: 1.45, color: '#000' }}
      >
        <div style={{ color: 'var(--color-win-title-active)' }}>
          {'='.repeat(26)}
          <br />
          &nbsp;HILAL_KANAAN.TXT
          <br />
          {'='.repeat(26)}
        </div>
        <br />
        {bio.tagline}
        <br />
        <br />
        {bio.paragraph}
        <br />
        <br />
        <div style={{ color: 'var(--color-win-title-active)' }}>[ SYSTEM INFO ]</div>
        {bio.meta.map((m) => (
          <div key={m.label}>
            &gt; {m.label.toUpperCase()}: {m.value}
          </div>
        ))}
        <br />
        <div style={{ color: 'var(--color-win-title-active)' }}>[ MISSION ]</div>
        &gt; Build interfaces that feel inevitable —<br />
        &nbsp;&nbsp;and the systems behind them.
        <br />
        <br />
        <span className="pk-blink">▌</span>
      </div>
      <div
        className="flex items-center justify-between px-2"
        style={{ minHeight: 24, fontSize: 11, color: 'var(--color-win-text)' }}
      >
        <span>Ln 18, Col 1</span>
        <span>100% · UTF-8</span>
      </div>
    </div>
  );
}
