import { useEffect, useState } from 'react';

function format(date: Date) {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${ampm}`;
}

export function useClock(): string {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    const tick = () => setTime(format(new Date()));
    const interval = setInterval(tick, 10_000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
