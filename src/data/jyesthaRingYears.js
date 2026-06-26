import ring0 from '../assets/audio/jyestha-ring-0.wav';
import ring1 from '../assets/audio/jyestha-ring-1.wav';
import ring2 from '../assets/audio/jyestha-ring-2.wav';
import ring3 from '../assets/audio/jyestha-ring-3.wav';
import ring4 from '../assets/audio/jyestha-ring-4.wav';
import ring5 from '../assets/audio/jyestha-ring-5.wav';

// Ordered innermost ring (oldest) -> outermost ring (most recent).
export const jyesthaRingYears = [
  {
    year: 1895,
    age: 0,
    caption: 'a sapling on open land, no walls yet, no roads yet — just soil and sky.',
    audio: ring0,
  },
  {
    year: 1932,
    age: 37,
    caption: "a road is cut nearby. her roots learn to grow around concrete for the first time.",
    audio: ring1,
  },
  {
    year: 1968,
    age: 73,
    caption: "a building goes up where her shade used to fall. the ring is uneven — she's leaning now.",
    audio: ring2,
  },
  {
    year: 1999,
    age: 104,
    caption: 'construction returns, closer this time. a root is cut without warning. the ring shows the break.',
    audio: ring3,
  },
  {
    year: 2018,
    age: 123,
    caption: 'encroachment reaches her base. the soil around her is paved over on one side.',
    audio: ring4,
  },
  {
    year: 2025,
    age: 130,
    caption: 'her roots are failing where they were cut. she is the oldest tree here, and the most forgotten.',
    audio: ring5,
  },
];
