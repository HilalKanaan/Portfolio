import { useEffect, useState } from 'react';
import { trackVisit } from '@/lib/tracking';
import { HeroSection } from './sections/hero-section';
import { AboutSection } from './sections/about-section';
import { WorkSection } from './sections/work-section';
import { ExperienceSection } from './sections/experience-section';
import { SkillsSection } from './sections/skills-section';
import { ContactSection } from './sections/contact-section';
import { ChatFab } from './components/chat-fab';
import { ChatSheet } from './components/chat-sheet';

export function MobileApp() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <div className="mobile-app fixed inset-0">
      <div className="m-scroll">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </div>
      <ChatFab onClick={() => setChatOpen(true)} />
      <ChatSheet open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
