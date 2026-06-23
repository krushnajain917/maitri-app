import ring0 from '../assets/audio/ring-0.wav';
import ring1 from '../assets/audio/ring-1.wav';
import ring2 from '../assets/audio/ring-2.wav';
import ring3 from '../assets/audio/ring-3.wav';
import ring4 from '../assets/audio/ring-4.wav';
import ring5 from '../assets/audio/ring-5.wav';

// Ordered innermost ring (oldest) -> outermost ring (most recent).
export const ringYears = [
  {
    year: 1892,
    age: 0,
    caption: 'a seed takes root near the riverbank. the soil is soft, the rains are kind.',
    audio: ring0,
  },
  {
    year: 1920,
    age: 28,
    caption: 'a drought year. the ring is thin — she barely grew.',
    audio: ring1,
  },
  {
    year: 1947,
    age: 55,
    caption: 'a season of celebration nearby. children tie threads to her trunk for the first time.',
    audio: ring2,
  },
  {
    year: 1971,
    age: 79,
    caption: 'a wildfire passes close. you can hear it in this ring — the crackle, the silence after.',
    audio: ring3,
  },
  {
    year: 2004,
    age: 112,
    caption: 'a monsoon stronger than most. she loses a branch but holds her ground.',
    audio: ring4,
  },
  {
    year: 2025,
    age: 133,
    caption: 'the disease begins. the ring is faint, uneven. she is asking for help.',
    audio: ring5,
  },
];
