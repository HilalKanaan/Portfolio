import type { WindowType } from '@/types/window';
import { WindowContent } from '@/components/window/window-content';
import { AiChatWindow } from '@/components/ai/ai-chat-window';
import { ProjectsWindow } from '@/components/projects/projects-window';
import { SettingsWindow } from '@/components/settings/settings-window';
import { ExperienceWindow } from '@/components/experience/experience-window';
import { SystemMonitorWindow } from '@/components/system-monitor/system-monitor-window';

interface WindowContentRendererProps {
  type: WindowType;
}

export function WindowContentRenderer({ type }: WindowContentRendererProps) {
  switch (type) {
    case 'my-computer':
      return (
        <WindowContent>
          <div className="grid grid-cols-4 gap-4 p-2">
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <span className="text-[32px]">💾</span>
              <span className="text-[11px] text-center">C: Drive<br />(Skills)</span>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <span className="text-[32px]">📁</span>
              <span className="text-[11px] text-center">Projects</span>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <span className="text-[32px]">📁</span>
              <span className="text-[11px] text-center">Experience</span>
            </div>
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              <span className="text-[32px]">💿</span>
              <span className="text-[11px] text-center">D: Drive<br />(Media)</span>
            </div>
          </div>
          <hr className="border-[var(--color-win-dark)] my-2" />
          <div className="p-2 text-[12px] text-[#555]">
            <p><strong>Skills / C: Drive Contents:</strong></p>
            <ul className="list-disc ml-4 mt-1 space-y-1">
              <li>React / TypeScript / Next.js</li>
              <li>Tailwind CSS / Framer Motion / Radix UI</li>
              <li>Node.js / Express.js / ASP.NET Core</li>
              <li>Python / Java / C++ / C#</li>
              <li>Firebase / Supabase / SQL Server / Prisma</li>
              <li>Recharts / Leaflet / Spline 3D</li>
              <li>Git / Docker / AI-ML Integration</li>
            </ul>
          </div>
        </WindowContent>
      );

    case 'network':
      return (
        <WindowContent>
          <div className="grid grid-cols-3 gap-6 p-4">
            <a
              href="https://github.com/HilalKanaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 cursor-pointer hover:bg-[var(--color-win-highlight)] hover:text-white p-2 no-underline text-inherit"
            >
              <span className="text-[40px]">🐙</span>
              <span className="text-[12px] text-center font-bold">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/hilalkanaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 cursor-pointer hover:bg-[var(--color-win-highlight)] hover:text-white p-2 no-underline text-inherit"
            >
              <span className="text-[40px]">💼</span>
              <span className="text-[12px] text-center font-bold">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/HilalKanaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 cursor-pointer hover:bg-[var(--color-win-highlight)] hover:text-white p-2 no-underline text-inherit"
            >
              <span className="text-[40px]">🐦</span>
              <span className="text-[12px] text-center font-bold">Twitter / X</span>
            </a>
          </div>
        </WindowContent>
      );

    case 'recycle-bin':
      return (
        <WindowContent>
          <div className="p-2 space-y-3">
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer">
              <span className="text-[24px]">📄</span>
              <div>
                <div className="text-[12px] font-bold">todo-app-v1.html</div>
                <div className="text-[11px] text-[#888]">My very first project. A single HTML file with inline CSS.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer">
              <span className="text-[24px]">📄</span>
              <div>
                <div className="text-[12px] font-bold">calculator-with-bugs.js</div>
                <div className="text-[11px] text-[#888]">Somehow 2+2 returned "22". Good times.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer">
              <span className="text-[24px]">📄</span>
              <div>
                <div className="text-[12px] font-bold">portfolio-v0.5-FINAL-FINAL.psd</div>
                <div className="text-[11px] text-[#888]">The design that never shipped. RIP.</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-[var(--color-win-highlight)] hover:text-white cursor-pointer">
              <span className="text-[24px]">📄</span>
              <div>
                <div className="text-[12px] font-bold">why-is-css-centering-hard.md</div>
                <div className="text-[11px] text-[#888]">A 500-word rant. Pre-flexbox era trauma.</div>
              </div>
            </div>
          </div>
        </WindowContent>
      );

    case 'about':
      return (
        <WindowContent>
          <div className="p-3 font-[var(--font-fixedsys)] text-[13px] leading-[1.6] space-y-3">
            <p className="font-bold text-[14px]">About Hilal Kanaan</p>
            <p>
              Hey! I'm Hilal Kanaan, a Full-Stack Developer & CS student
              at Beirut Arab University (AI Track, GPA 3.7/4.0). I love
              building interactive, creative web experiences -- and yes,
              I built an entire operating system as my portfolio.
            </p>
            <p>
              Currently a Backend Developer at the Lebanese Ministry of
              Youth and Sports, and a freelance Full Stack Engineer. I've
              built everything from AI-powered automotive platforms to
              custom map tile systems with 97% load time reductions.
            </p>
            <p>
              I specialize in React, Next.js, TypeScript, and Node.js.
              Previously interned at IDS Fintech (full-stack + AI) and
              Toothpick (QA engineering).
            </p>
            <p>
              Want to chat? Click the Hilal Agent icon or the floating orb
              -- it's literally me (well, an AI version of me).
            </p>
            <hr className="border-[var(--color-win-dark)]" />
            <p className="text-[11px] text-[#888]">
              HilalOS was built with React, TypeScript, Tailwind CSS,
              Zustand, Framer Motion, and Google Gemini AI. Hosted on Firebase.
            </p>
          </div>
        </WindowContent>
      );

    case 'projects':
      return <ProjectsWindow />;

    case 'experience':
      return <ExperienceWindow />;

    case 'ai-chat':
      return <AiChatWindow />;

    case 'settings':
      return <SettingsWindow />;

    case 'system-monitor':
      return <SystemMonitorWindow />;

    default:
      return (
        <WindowContent>
          <div className="p-4 text-[12px]">Content not found.</div>
        </WindowContent>
      );
  }
}
