import { useClock } from '@/hooks/use-clock';

export function SystemTray() {
  const time = useClock();

  return (
    <div className="h-[22px] px-[8px] flex items-center shadow-[inset_-1px_-1px_0_#dfdfdf,inset_1px_1px_0_#808080] text-[11px] ml-auto flex-shrink-0">
      <span>{time}</span>
    </div>
  );
}
