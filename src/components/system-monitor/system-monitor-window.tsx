import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  getCountFromServer,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { WindowContent } from '@/components/window/window-content';

interface VisitorDoc {
  timestamp: Timestamp | null;
  referrer: string;
  userAgent: string;
  screenSize: string;
  sessionId: string;
  pageViews: string[];
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  recentVisitors: VisitorDoc[];
  topReferrers: { referrer: string; count: number }[];
  topPages: { page: string; count: number }[];
  browsers: { browser: string; count: number }[];
}

function parseBrowser(ua: string): string {
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}

function formatTime(ts: Timestamp | null): string {
  if (!ts) return 'Unknown';
  const d = ts.toDate();
  return d.toLocaleString();
}

export function SystemMonitorWindow() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'pages'>('overview');

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    try {
      const visitorsRef = collection(db, 'visitors');

      // Total count
      const totalSnap = await getCountFromServer(visitorsRef);
      const total = totalSnap.data().count;

      // Time-based queries
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [todaySnap, weekSnap, monthSnap] = await Promise.all([
        getCountFromServer(query(visitorsRef, where('timestamp', '>=', Timestamp.fromDate(startOfDay)))),
        getCountFromServer(query(visitorsRef, where('timestamp', '>=', Timestamp.fromDate(startOfWeek)))),
        getCountFromServer(query(visitorsRef, where('timestamp', '>=', Timestamp.fromDate(startOfMonth)))),
      ]);

      // Recent visitors
      const recentQuery = query(visitorsRef, orderBy('timestamp', 'desc'), limit(50));
      const recentSnap = await getDocs(recentQuery);
      const recentVisitors = recentSnap.docs.map((d) => d.data() as VisitorDoc);

      // Aggregate stats from recent visitors
      const referrerMap = new Map<string, number>();
      const pageMap = new Map<string, number>();
      const browserMap = new Map<string, number>();

      recentVisitors.forEach((v) => {
        const ref = v.referrer || 'direct';
        referrerMap.set(ref, (referrerMap.get(ref) || 0) + 1);

        const browser = parseBrowser(v.userAgent || '');
        browserMap.set(browser, (browserMap.get(browser) || 0) + 1);

        (v.pageViews || []).forEach((p) => {
          pageMap.set(p, (pageMap.get(p) || 0) + 1);
        });
      });

      const toSorted = (map: Map<string, number>, keyName: string) =>
        Array.from(map.entries())
          .map(([k, count]) => ({ [keyName]: k, count }) as Record<string, string | number>)
          .sort((a, b) => (b.count as number) - (a.count as number))
          .slice(0, 5);

      setStats({
        total,
        today: todaySnap.data().count,
        thisWeek: weekSnap.data().count,
        thisMonth: monthSnap.data().count,
        recentVisitors,
        topReferrers: toSorted(referrerMap, 'referrer') as Stats['topReferrers'],
        topPages: toSorted(pageMap, 'page') as Stats['topPages'],
        browsers: toSorted(browserMap, 'browser') as Stats['browsers'],
      });
    } catch (e) {
      console.error('Failed to load stats:', e);
    } finally {
      setLoading(false);
    }
  }

  const tabClass = (tab: string) =>
    `px-[8px] py-[2px] text-[11px] cursor-pointer ${
      activeTab === tab
        ? 'bg-[var(--color-win-btn-face)] shadow-[var(--shadow-win-raised)] font-bold'
        : 'bg-[var(--color-win-dark)] text-[#555]'
    }`;

  return (
    <WindowContent>
      <div className="flex flex-col h-full text-[11px] font-[var(--font-fixedsys)]">
        {/* Tabs */}
        <div className="flex gap-[1px] px-[4px] pt-[4px] border-b border-[var(--color-win-dark)]">
          <button className={tabClass('overview')} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button className={tabClass('visitors')} onClick={() => setActiveTab('visitors')}>
            Recent Visitors
          </button>
          <button className={tabClass('pages')} onClick={() => setActiveTab('pages')}>
            Analytics
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto win-scrollbar p-[6px]">
          {loading ? (
            <div className="flex items-center justify-center h-full text-[#888]">
              <span>Loading system metrics...</span>
            </div>
          ) : !stats ? (
            <div className="text-[#888] text-center pt-4">
              Failed to load data. Is Firestore enabled?
            </div>
          ) : activeTab === 'overview' ? (
            <OverviewTab stats={stats} />
          ) : activeTab === 'visitors' ? (
            <VisitorsTab visitors={stats.recentVisitors} />
          ) : (
            <AnalyticsTab stats={stats} />
          )}
        </div>

        {/* Status bar */}
        <div className="flex-shrink-0 h-[20px] flex items-center px-[6px] border-t border-[var(--color-win-light)] shadow-[inset_0_1px_0_var(--color-win-dark)]">
          <span className="text-[11px] text-[#555]">
            {stats ? `${stats.total} total sessions tracked` : 'Loading...'}
          </span>
          <div className="flex-1" />
          <button
            className="text-[10px] text-[#0000aa] underline cursor-pointer bg-transparent border-none"
            onClick={loadStats}
          >
            Refresh
          </button>
        </div>
      </div>
    </WindowContent>
  );
}

function OverviewTab({ stats }: { stats: Stats }) {
  return (
    <div className="space-y-[8px]">
      {/* Counters */}
      <div className="grid grid-cols-4 gap-[4px]">
        <StatBox label="Total" value={stats.total} />
        <StatBox label="Today" value={stats.today} />
        <StatBox label="This Week" value={stats.thisWeek} />
        <StatBox label="This Month" value={stats.thisMonth} />
      </div>

      {/* Top Referrers */}
      <div>
        <div className="font-bold mb-[2px] text-[12px]">Top Referrers</div>
        <div className="bg-white border border-[var(--color-win-dark)] shadow-[var(--shadow-win-pressed)]">
          {stats.topReferrers.length === 0 ? (
            <div className="p-[4px] text-[#888]">No data yet</div>
          ) : (
            stats.topReferrers.map((r, i) => (
              <div
                key={i}
                className="flex justify-between px-[4px] py-[2px] even:bg-[var(--color-win-light)]"
              >
                <span className="truncate flex-1">{r.referrer}</span>
                <span className="ml-[8px] text-[#0000aa] font-bold">{r.count}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Browsers */}
      <div>
        <div className="font-bold mb-[2px] text-[12px]">Browsers</div>
        <div className="bg-white border border-[var(--color-win-dark)] shadow-[var(--shadow-win-pressed)]">
          {stats.browsers.map((b, i) => (
            <div
              key={i}
              className="flex justify-between px-[4px] py-[2px] even:bg-[var(--color-win-light)]"
            >
              <span>{b.browser}</span>
              <span className="text-[#0000aa] font-bold">{b.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisitorsTab({ visitors }: { visitors: VisitorDoc[] }) {
  return (
    <div className="bg-white border border-[var(--color-win-dark)] shadow-[var(--shadow-win-pressed)]">
      {/* Header */}
      <div className="flex bg-[var(--color-win-btn-face)] border-b border-[var(--color-win-dark)] font-bold">
        <div className="w-[140px] px-[4px] py-[2px] border-r border-[var(--color-win-dark)]">
          Time
        </div>
        <div className="w-[100px] px-[4px] py-[2px] border-r border-[var(--color-win-dark)]">
          Referrer
        </div>
        <div className="w-[80px] px-[4px] py-[2px] border-r border-[var(--color-win-dark)]">
          Screen
        </div>
        <div className="flex-1 px-[4px] py-[2px]">Pages Viewed</div>
      </div>
      {/* Rows */}
      {visitors.length === 0 ? (
        <div className="p-[4px] text-[#888]">No visitors yet</div>
      ) : (
        visitors.map((v, i) => (
          <div
            key={i}
            className="flex even:bg-[var(--color-win-light)] hover:bg-[var(--color-win-highlight)] hover:text-white"
          >
            <div className="w-[140px] px-[4px] py-[1px] border-r border-[var(--color-win-light)] truncate">
              {formatTime(v.timestamp)}
            </div>
            <div className="w-[100px] px-[4px] py-[1px] border-r border-[var(--color-win-light)] truncate">
              {v.referrer || 'direct'}
            </div>
            <div className="w-[80px] px-[4px] py-[1px] border-r border-[var(--color-win-light)]">
              {v.screenSize}
            </div>
            <div className="flex-1 px-[4px] py-[1px] truncate">
              {(v.pageViews || []).join(', ') || '-'}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function AnalyticsTab({ stats }: { stats: Stats }) {
  return (
    <div className="space-y-[8px]">
      {/* Most Viewed Windows */}
      <div>
        <div className="font-bold mb-[2px] text-[12px]">Most Viewed Windows</div>
        <div className="bg-white border border-[var(--color-win-dark)] shadow-[var(--shadow-win-pressed)]">
          {stats.topPages.length === 0 ? (
            <div className="p-[4px] text-[#888]">No data yet</div>
          ) : (
            stats.topPages.map((p, i) => {
              const maxCount = stats.topPages[0]?.count || 1;
              const pct = Math.round((p.count / maxCount) * 100);
              return (
                <div key={i} className="px-[4px] py-[2px] even:bg-[var(--color-win-light)]">
                  <div className="flex justify-between">
                    <span>{p.page}</span>
                    <span className="text-[#0000aa] font-bold">{p.count}</span>
                  </div>
                  <div className="h-[6px] bg-[var(--color-win-dark)] mt-[1px]">
                    <div
                      className="h-full bg-[var(--color-win-highlight)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Referrer breakdown */}
      <div>
        <div className="font-bold mb-[2px] text-[12px]">Traffic Sources</div>
        <div className="bg-white border border-[var(--color-win-dark)] shadow-[var(--shadow-win-pressed)]">
          {stats.topReferrers.length === 0 ? (
            <div className="p-[4px] text-[#888]">No data yet</div>
          ) : (
            stats.topReferrers.map((r, i) => {
              const maxCount = stats.topReferrers[0]?.count || 1;
              const pct = Math.round((r.count / maxCount) * 100);
              return (
                <div key={i} className="px-[4px] py-[2px] even:bg-[var(--color-win-light)]">
                  <div className="flex justify-between">
                    <span className="truncate flex-1">{r.referrer}</span>
                    <span className="text-[#0000aa] font-bold ml-[8px]">{r.count}</span>
                  </div>
                  <div className="h-[6px] bg-[var(--color-win-dark)] mt-[1px]">
                    <div
                      className="h-full bg-[#008080]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-[var(--color-win-dark)] shadow-[var(--shadow-win-pressed)] p-[4px] text-center">
      <div className="text-[16px] font-bold text-[#0000aa]">{value}</div>
      <div className="text-[9px] text-[#555]">{label}</div>
    </div>
  );
}
