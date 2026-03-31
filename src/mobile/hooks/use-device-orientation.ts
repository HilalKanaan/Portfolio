import { useEffect, useState, useCallback } from 'react';

interface OrientationState {
  beta: number;  // front-back tilt (-180 to 180)
  gamma: number; // left-right tilt (-90 to 90)
  supported: boolean;
}

const INITIAL: OrientationState = { beta: 0, gamma: 0, supported: false };

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<OrientationState>(INITIAL);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = useCallback(async () => {
    // iOS 13+ requires explicit permission
    const DOMEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };

    if (typeof DOMEvent.requestPermission === 'function') {
      try {
        const result = await DOMEvent.requestPermission();
        if (result === 'granted') {
          setPermissionGranted(true);
        }
      } catch {
        // Permission denied or unavailable
      }
    } else {
      // Non-iOS or older browsers — permission not needed
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    const handler = (e: DeviceOrientationEvent) => {
      setOrientation({
        beta: e.beta ?? 0,
        gamma: e.gamma ?? 0,
        supported: true,
      });
    };

    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, [permissionGranted]);

  // Auto-request on non-iOS (where no permission is needed)
  useEffect(() => {
    const DOMEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DOMEvent.requestPermission !== 'function') {
      setPermissionGranted(true);
    }
  }, []);

  return { ...orientation, requestPermission };
}
