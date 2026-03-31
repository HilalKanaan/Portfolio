import { useState, useEffect } from 'react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function RetroCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);

  // Fetch real visitor count from Firestore
  useEffect(() => {
    getCountFromServer(collection(db, 'visitors'))
      .then((snap) => {
        const real = snap.data().count;
        setTarget(real > 0 ? real : 1);
      })
      .catch(() => {
        // Fallback to a random number if Firestore is unavailable
        setTarget(1000 + Math.floor(Math.random() * 9000));
      });
  }, []);

  // Animate counting up
  useEffect(() => {
    if (count >= target || target === 0) return;
    const step = Math.max(1, Math.floor((target - count) / 20));
    const timer = setTimeout(() => {
      setCount((c) => Math.min(c + step, target));
    }, 50);
    return () => clearTimeout(timer);
  }, [count, target]);

  const digits = String(count).padStart(6, '0');

  return (
    <div className="bg-black/80 border border-[#555] px-[8px] py-[4px] shadow-md">
      <div className="text-[8px] text-[#888] font-[var(--font-fixedsys)] text-center mb-[2px]">
        VISITORS
      </div>
      <div className="flex gap-[2px] justify-center">
        {digits.split('').map((d, i) => (
          <span
            key={i}
            className="bg-[#1a0a00] text-[#ff3300] font-[var(--font-fixedsys)] text-[14px] w-[14px] text-center leading-[18px] border border-[#333]"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="text-[7px] text-[#666] font-[var(--font-fixedsys)] text-center mt-[2px]">
        since 1995
      </div>
    </div>
  );
}
