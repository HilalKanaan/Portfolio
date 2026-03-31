import { useState } from 'react';
import { WindowContent } from '@/components/window/window-content';
import { experiences, type Experience } from '@/data/experience';

function TimelineNode({
  exp,
  isFirst,
  isLast,
  isSelected,
  onSelect,
}: {
  exp: Experience;
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div className="flex gap-[10px] cursor-pointer" onClick={onSelect}>
      {/* Timeline track */}
      <div className="flex flex-col items-center w-[20px] flex-shrink-0">
        {!isFirst && (
          <div className="w-[2px] h-[10px] bg-[var(--color-win-dark)]" />
        )}
        <div
          className={`w-[14px] h-[14px] rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected
              ? 'border-[var(--color-win-highlight)] bg-[var(--color-win-highlight)]'
              : 'border-[var(--color-win-dark)] bg-[var(--color-win-btn-face)]'
          }`}
        >
          {isSelected && (
            <div className="w-[6px] h-[6px] rounded-full bg-white" />
          )}
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 min-h-[20px] bg-[var(--color-win-dark)]" />
        )}
      </div>

      {/* Content card */}
      <div
        className={`flex-1 mb-[6px] p-[8px] border ${
          isSelected
            ? 'border-[var(--color-win-highlight)] bg-white shadow-[var(--shadow-win-sunken)]'
            : 'border-[var(--color-win-light)] bg-[var(--color-win-btn-face)] hover:border-[var(--color-win-dark)]'
        }`}
      >
        <div className="flex items-start gap-[6px]">
          <span className="text-[18px] leading-none">{exp.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-bold truncate">
                {exp.role}
              </span>
              <span className="text-[9px] text-[#888] flex-shrink-0 font-[var(--font-fixedsys)]">
                {exp.period}
              </span>
            </div>
            <div className="text-[10px] text-[#666] font-bold mt-[1px]">
              {exp.company}
            </div>
          </div>
        </div>

        {isSelected && (
          <div className="mt-[6px] pt-[6px] border-t border-[var(--color-win-light)]">
            <div className="text-[11px] leading-[1.5] text-[#333]">
              {exp.description}
            </div>
            <div className="flex flex-wrap gap-[3px] mt-[6px]">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-[4px] py-[1px] bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] text-[#333]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ExperienceWindow() {
  const [selectedId, setSelectedId] = useState<string>(experiences[0].id);

  // Calculate actual months of experience from period strings
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const totalMonths = experiences.reduce((sum, exp) => {
    const [startStr, endStr] = exp.period.split('—').map((s) => s.trim());

    // Parse end date first to extract year for start if needed
    const endParts = endStr.split(/\s+/);
    const end = endStr === 'Present'
      ? new Date()
      : new Date(Number(endParts[endParts.length - 1]), monthMap[endParts[0]] ?? 0);

    const startParts = startStr.split(/\s+/);
    const startMonth = monthMap[startParts[0]] ?? 0;
    // If start has no year (e.g. "Aug" in "Aug — Oct 2025"), use the end date's year
    const startYear = startParts.length > 1 ? Number(startParts[1]) : end.getFullYear();
    const start = new Date(startYear, startMonth);

    const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    return sum + Math.max(0, diff);
  }, 0);
  const totalYears = totalMonths / 12;

  return (
    <WindowContent>
      <div className="flex flex-col h-full">
        {/* Header bar - styled like Win95 address bar */}
        <div className="flex items-center gap-[6px] px-[6px] py-[4px] border-b border-[var(--color-win-dark)] bg-[var(--color-win-btn-face)]">
          <span className="text-[14px]">💼</span>
          <div className="flex-1 h-[20px] px-[4px] flex items-center text-[11px] bg-white shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#808080] font-[var(--font-fixedsys)]">
            C:\Hilal\Career\Experience\
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-[6px] py-[4px] border-b border-[var(--color-win-light)] bg-[var(--color-win-btn-face)]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[10px] text-[#555]">Career Progress:</span>
            <div className="flex-1 h-[14px] shadow-[var(--shadow-win-sunken)] bg-white">
              <div
                className="h-full bg-[var(--color-win-highlight)] transition-all duration-500"
                style={{ width: `${Math.min(100, (totalMonths / 24) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-[#555] font-[var(--font-fixedsys)]">
              {totalMonths >= 12
                ? `${Math.floor(totalYears)}+ yrs`
                : `${totalMonths} mos`}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-auto win-scrollbar p-[10px]">
          {experiences.map((exp, i) => (
            <TimelineNode
              key={exp.id}
              exp={exp}
              isFirst={i === 0}
              isLast={i === experiences.length - 1}
              isSelected={selectedId === exp.id}
              onSelect={() =>
                setSelectedId(selectedId === exp.id ? '' : exp.id)
              }
            />
          ))}
        </div>

        {/* Status bar */}
        <div className="flex-shrink-0 h-[20px] flex items-center px-[6px] border-t border-[var(--color-win-light)] shadow-[inset_0_1px_0_var(--color-win-dark)]">
          <span className="text-[11px] text-[#555]">
            {experiences.length} positions — {totalMonths >= 12
              ? `${Math.floor(totalYears)}+ years`
              : `${totalMonths} months`} of experience
          </span>
        </div>
      </div>
    </WindowContent>
  );
}
