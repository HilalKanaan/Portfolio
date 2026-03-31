import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '@/data/experience';
import { HolographicSheen } from '../wallet/holographic-sheen';

const EXPERIENCE_COLORS: Record<string, string> = {
  'exp-1': '#8B5CF6',
  'exp-2': '#06B6D4',
  'exp-3': '#22C55E',
  'exp-4': '#F59E0B',
};

interface BoardingPassCardProps {
  expanded?: boolean;
}

export function BoardingPassCard({ expanded = false }: BoardingPassCardProps) {
  if (expanded) {
    return (
      <div
        className="w-full rounded-[16px] relative overflow-hidden"
        style={{
          background: '#0A0A0A',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <HolographicSheen />

        {/* Header */}
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-zinc-500 tracking-[3px] uppercase font-medium">
                ✈ Career Boarding Pass
              </p>
              <h2 className="text-[20px] font-bold text-white mt-1">
                Flight Log
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-600">PASSENGER</p>
              <p className="text-[12px] text-white font-medium">Hilal Kanaan</p>
            </div>
          </div>
        </div>

        {/* Perforation line */}
        <div className="mx-5 border-t border-dashed" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Flight itinerary */}
        <div className="p-5 pt-3 space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
          <AnimatePresence>
            {experiences.map((exp, i) => {
              const color = EXPERIENCE_COLORS[exp.id] || '#8B5CF6';
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-[18px]"
                      style={{ background: `${color}20` }}
                    >
                      {exp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[9px] tracking-[2px] uppercase font-medium" style={{ color }}>
                          Flight {i + 1}
                        </p>
                        <p className="text-[10px] text-zinc-600 flex-shrink-0">{exp.period}</p>
                      </div>
                      <h4 className="text-[14px] font-bold text-white mt-0.5">
                        {exp.role}
                      </h4>
                      <p className="text-[12px] text-zinc-400">{exp.company}</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed mt-2">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[9px] font-medium"
                            style={{
                              background: `${color}15`,
                              color: `${color}`,
                              border: `1px solid ${color}25`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Barcode footer */}
        <div className="px-5 pb-4 pt-2">
          <div className="border-t border-dashed mb-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-zinc-700 tracking-wider uppercase">
              {experiences.length} Flights · Class: Full Stack
            </p>
            <div className="flex gap-[1.5px]">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5"
                  style={{
                    width: Math.random() > 0.4 ? 2 : 1,
                    background: `rgba(255,255,255,${0.1 + Math.random() * 0.15})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Collapsed preview
  return (
    <div
      className="w-full h-full rounded-[16px] p-4 relative overflow-hidden"
      style={{
        background: '#0A0A0A',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <HolographicSheen />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-zinc-500 tracking-[3px] uppercase font-medium">
            ✈ Boarding Pass
          </p>
          <h2 className="text-[18px] font-bold text-white mt-1">Experience</h2>
          <p className="text-[12px] text-zinc-400">{experiences.length} Career Flights</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="text-[10px] text-zinc-600">LATEST</p>
          <p className="text-[11px] text-white font-medium">{experiences[0].role}</p>
          <p className="text-[10px] text-zinc-500">{experiences[0].company}</p>
        </div>
      </div>
      {/* Mini barcode */}
      <div className="absolute bottom-3 left-4 flex gap-[1px]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-3"
            style={{
              width: Math.random() > 0.5 ? 2 : 1,
              background: `rgba(255,255,255,${0.08 + Math.random() * 0.1})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
