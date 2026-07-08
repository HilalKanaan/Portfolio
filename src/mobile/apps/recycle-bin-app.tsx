import { useState } from 'react';
import { haptic } from '../lib/haptics';

const DELETED_FILES = [
  { name: 'my_first_website_2019.html', size: '14KB', note: 'Comic Sans everywhere. Zero regrets.' },
  { name: 'jquery_spaghetti.js', size: '2.3MB', note: '$(document).ready(function(){ ...never again' },
  { name: 'center_div_attempt_47.css', size: '9KB', note: 'margin: auto did it on attempt 48.' },
  { name: 'php_phase.tar.gz', size: '87MB', note: 'We agreed never to speak of this.' },
  { name: 'lorem_ipsum_final_FINAL_v3.doc', size: '1KB', note: 'The naming convention of champions.' },
  { name: 'imposter_syndrome.sys', size: '640KB', note: 'Deleted. Shipped things instead.' },
];

/** Recycle Bin — the personality easter egg. */
export function RecycleBinApp() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="pk-scroll pk-orb-clear flex-1 px-2 py-2 flex flex-col gap-1.5">
        {DELETED_FILES.map((f, i) => (
          <button
            key={f.name}
            type="button"
            onClick={() => {
              haptic();
              setSelected(selected === i ? null : i);
            }}
            className="text-left border-0 cursor-pointer px-2 py-2"
            style={{
              background: selected === i ? 'var(--color-win-highlight)' : 'transparent',
              color: selected === i ? '#fff' : 'var(--color-win-text)',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 44,
            }}
          >
            <span className="flex items-center gap-2">
              <span aria-hidden>📄</span>
              <span className="pk-pixel truncate" style={{ fontSize: 17 }}>
                {f.name}
              </span>
              <span className="ml-auto shrink-0" style={{ fontSize: 10, opacity: 0.7 }}>
                {f.size}
              </span>
            </span>
            {selected === i && (
              <span className="block pl-6 pt-1" style={{ fontSize: 11.5, fontStyle: 'italic' }}>
                “{f.note}”
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 px-2 py-2">
        <button
          type="button"
          className="pk-btn flex-1"
          disabled
          style={{ opacity: 0.5, minHeight: 44 }}
        >
          Restore
        </button>
        <span className="flex-1" style={{ fontSize: 11, color: 'var(--color-win-dark)' }}>
          Some things belong in the past. That's called growth.
        </span>
      </div>
    </div>
  );
}
