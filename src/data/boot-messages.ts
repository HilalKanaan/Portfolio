export interface BootMessage {
  text: string;
  delay: number;
}

export const biosMessages: BootMessage[] = [
  { text: 'Award Modular BIOS v6.00PG', delay: 200 },
  { text: 'Copyright (C) 1984-95, Award Software, Inc.', delay: 150 },
  { text: '', delay: 300 },
  { text: 'HILAL KANAAN PORTFOLIO SYSTEM BIOS', delay: 200 },
  { text: 'CPU: Creative Core i9-2025 @ 4.20 GHz', delay: 100 },
  { text: 'Memory Test: 640K OK', delay: 400 },
  { text: 'Memory Test: 32768K OK', delay: 200 },
  { text: '', delay: 200 },
  { text: 'Detecting Primary IDE Master... Hard Disk', delay: 300 },
  { text: 'Detecting Primary IDE Slave... CD-ROM', delay: 200 },
  { text: 'Detecting Secondary IDE Master... None', delay: 150 },
  { text: '', delay: 300 },
  { text: 'Loading HilalOS...', delay: 500 },
  { text: 'Initializing system drivers...', delay: 300 },
  { text: 'Starting HilalOS...', delay: 600 },
];

export const aiInterruptMessages: string[] = [
  '> WAIT.',
  '> This isn\'t a normal portfolio.',
  '> I\'m Hilal. Welcome to my OS.',
  '> Let me show you around...',
  '> Initializing HilalOS v1.0...',
];
