import { HolographicSheen } from '../wallet/holographic-sheen';
import { MobileAvatar } from './mobile-avatar';

const TOP_SKILLS = [
  'React', 'TypeScript', 'Next.js', 'Node.js',
  'Tailwind', 'Framer Motion', 'Firebase', 'Supabase',
];

interface IdentityCardProps {
  expanded?: boolean;
}

export function IdentityCard({ expanded = false }: IdentityCardProps) {
  if (expanded) {
    return (
      <div
        className="w-full rounded-[16px] p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0A0A0A 0%, #1a1025 100%)',
          border: '1px solid rgba(139, 92, 246, 0.15)',
        }}
      >
        <HolographicSheen />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] text-purple-400 tracking-[3px] uppercase font-medium">
              Identity Card
            </p>
            <h2 className="text-[22px] font-bold text-white mt-1">Hilal Kanaan</h2>
            <p className="text-[13px] text-zinc-400">
              Full-Stack Developer & Creative Technologist
            </p>
          </div>
          <div className="text-[10px] text-zinc-600 text-right">
            <p>ID: HK-2026-001</p>
            <p>CLASS: Full Stack</p>
          </div>
        </div>

        {/* Avatar + Details row */}
        <div className="flex gap-4 mb-4">
          {/* 3D Avatar slot */}
          <div
            className="w-[140px] h-[180px] rounded-lg overflow-hidden flex-shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <MobileAvatar />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-2">
              <DetailRow label="EDU" value="Beirut Arab University" />
              <DetailRow label="TRACK" value="AI (GPA 3.7/4.0)" />
              <DetailRow label="GRAD" value="May 2026" />
              <DetailRow label="STATUS" value="Open to Work" highlight />
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-[12px] text-zinc-400 leading-relaxed mb-4">
          Building scalable APIs at the Lebanese Ministry of Youth and Sports while
          freelancing full-stack solutions with Next.js, React, and TypeScript.
          Previously interned at IDS Fintech (full-stack + AI) and Toothpick (QA).
          Built an entire Windows 95 simulation as a portfolio.
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {TOP_SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium text-purple-300"
              style={{
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Footer barcode */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] text-zinc-600 tracking-[2px] uppercase">
            Clearance: Full Stack
          </p>
          <div className="flex gap-[2px]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="h-4"
                style={{
                  width: Math.random() > 0.5 ? 2 : 1,
                  background: `rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Collapsed / preview
  return (
    <div
      className="w-full h-full rounded-[16px] p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0A0A0A 0%, #1a1025 100%)',
        border: '1px solid rgba(139, 92, 246, 0.15)',
      }}
    >
      <HolographicSheen />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-purple-400 tracking-[3px] uppercase font-medium">
            Identity Card
          </p>
          <h2 className="text-[18px] font-bold text-white mt-1">Hilal Kanaan</h2>
          <p className="text-[12px] text-zinc-400">Full-Stack Developer</p>
        </div>
        <div className="w-[60px] h-[60px] rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-full h-full bg-gradient-to-b from-purple-900/30 to-zinc-900 flex items-center justify-center">
            <span className="text-[24px]">👤</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        {TOP_SKILLS.slice(0, 4).map((s) => (
          <span key={s} className="px-2 py-0.5 rounded-full text-[9px] text-purple-300" style={{ background: 'rgba(139,92,246,0.12)' }}>
            {s}
          </span>
        ))}
      </div>
      <div className="absolute bottom-3 right-4 text-[9px] text-zinc-600">
        ID: HK-2026-001
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] text-zinc-600 tracking-[1px] uppercase">{label}</p>
      <p
        className={`text-[12px] font-medium ${
          highlight ? 'text-green-400' : 'text-zinc-300'
        }`}
      >
        {value}
      </p>
    </div>
  );
}
