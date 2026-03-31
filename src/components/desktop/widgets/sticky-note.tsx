import { useState, useEffect } from 'react';

const NOTES = [
  { title: 'TODO:', body: "- Ship this portfolio\n- Get hired\n- Celebrate" },
  { title: 'REMINDER:', body: "CSS is not a real\nprogramming language\n(it's an art form)" },
  { title: 'NOTE TO SELF:', body: "The recruiter is\nwatching. Look busy.\n\n...and professional." },
  { title: 'FUN FACT:', body: "This entire OS runs\nin a single browser tab.\nYou're welcome, RAM." },
  { title: 'MOTIVATION:', body: '"Ship it before it\'s\nperfect. Perfect is\nthe enemy of done."' },
];

export function StickyNote() {
  const [note] = useState(() => NOTES[Math.floor(Math.random() * NOTES.length)]);
  const [rotation] = useState(() => -3 + Math.random() * 6);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="w-[160px] shadow-md cursor-default transition-transform hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Tape effect */}
      <div className="flex justify-center -mb-[6px]" style={{ zIndex: 1, position: 'relative' }}>
        <div className="w-[50px] h-[12px] bg-[#ffffffaa] border border-[#ddd]" />
      </div>
      {/* Note body */}
      <div className="bg-[#fff7a1] p-[10px] pt-[12px] border border-[#e6d96e]">
        <div className="font-[var(--font-fixedsys)] text-[10px] font-bold text-[#333] mb-[4px]">
          {note.title}
        </div>
        <div className="font-[var(--font-fixedsys)] text-[9px] text-[#555] leading-[1.5] whitespace-pre-line">
          {note.body}
        </div>
      </div>
    </div>
  );
}
