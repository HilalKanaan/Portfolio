import { useEffect, useState } from 'react';

interface BatteryManagerLike {
  level: number;
  charging: boolean;
  addEventListener: (type: string, cb: () => void) => void;
  removeEventListener: (type: string, cb: () => void) => void;
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManagerLike>;
};

/** Real battery level 0–1 where supported (Chrome/Android); 1 elsewhere. */
export function useBattery(): { level: number; charging: boolean } {
  const [state, setState] = useState({ level: 1, charging: false });

  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery) return;

    let battery: BatteryManagerLike | null = null;
    let disposed = false;
    const update = () => {
      if (battery && !disposed) {
        setState({ level: battery.level, charging: battery.charging });
      }
    };

    nav.getBattery().then((b) => {
      if (disposed) return;
      battery = b;
      update();
      b.addEventListener('levelchange', update);
      b.addEventListener('chargingchange', update);
    });

    return () => {
      disposed = true;
      battery?.removeEventListener('levelchange', update);
      battery?.removeEventListener('chargingchange', update);
    };
  }, []);

  return state;
}
