import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { db, analyticsPromise } from './firebase';

let sessionDocId: string | null = null;

export async function trackVisit() {
  try {
    const ref = await addDoc(collection(db, 'visitors'), {
      timestamp: serverTimestamp(),
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      sessionId: crypto.randomUUID(),
      pageViews: [],
    });
    sessionDocId = ref.id;
  } catch (e) {
    console.warn('Visit tracking failed:', e);
  }
}

export async function trackWindowOpen(windowType: string) {
  const analytics = await analyticsPromise;
  if (analytics) {
    logEvent(analytics, 'window_open', { window_type: windowType });
  }
  if (sessionDocId) {
    updateDoc(doc(db, 'visitors', sessionDocId), {
      pageViews: arrayUnion(windowType),
    }).catch(() => {});
  }
}

export async function trackProjectView(projectId: string) {
  const analytics = await analyticsPromise;
  if (analytics) {
    logEvent(analytics, 'project_view', { project_id: projectId });
  }
}

export async function trackProjectLinkClick(projectId: string, url: string) {
  const analytics = await analyticsPromise;
  if (analytics) {
    logEvent(analytics, 'project_link_click', { project_id: projectId, url });
  }
}
