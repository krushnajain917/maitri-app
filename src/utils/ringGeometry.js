// Catmull-Rom -> cubic bezier hand-drawn ring generator, ported from the design bundle.
const CX = 190;
const CY = 190;

function wobble(t, phase) {
  return (
    1 +
    Math.sin(t * 3 + phase) * 0.1 +
    Math.cos(t * 4 + phase * 0.9) * 0.06 +
    Math.sin(t * 6 + phase * 0.6) * 0.03 +
    Math.cos(t * 9 + phase * 1.4) * 0.012
  );
}

export function ringPath(avgR, phase) {
  const n = 16;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2 - Math.PI / 2;
    const v = wobble(t, phase);
    pts.push([CX + avgR * v * Math.cos(t), CY + avgR * v * Math.sin(t)]);
  }
  const N = pts.length;
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % N];
    const p3 = pts[(i + 2) % N];
    const cp1x = (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1);
    const cp1y = (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1);
    const cp2x = (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1);
    const cp2y = (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1);
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
}

export function ringPoint(avgR, phase, t) {
  const v = wobble(t, phase);
  return [CX + avgR * v * Math.cos(t), CY + avgR * v * Math.sin(t)];
}

// Outer -> inner. Index 0 here = outermost (most recent year).
export const RING_DEFS = [
  { avgR: 168, phase: 0.0, strokeWidth: 2.5 },
  { avgR: 144, phase: 0.8, strokeWidth: 2.2 },
  { avgR: 120, phase: 1.7, strokeWidth: 2.0 },
  { avgR: 96, phase: 2.5, strokeWidth: 1.8 },
  { avgR: 74, phase: 3.1, strokeWidth: 1.6 },
  { avgR: 54, phase: 3.8, strokeWidth: 1.4 },
];

// Innermost decorative ring + pith pip, not selectable.
export const CORE_RING = { avgR: 34, phase: 4.5, strokeWidth: 1.2 };

export const CENTER = { cx: CX, cy: CY };
