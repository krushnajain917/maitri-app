// Asymmetric, off-center, broken-ring generator for Jyestha — ported from the
// design bundle's embedded ring algorithm. Rings lean away from the
// encroachment side and carry gaps where roots/shade were physically cut.
const BASE_CX = 190;
const BASE_CY = 192;

function ringPts(avgR, phase, encroach) {
  const n = 48;
  const cx = BASE_CX - encroach * 14;
  const cy = BASE_CY + encroach * 5;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2 - Math.PI / 2;
    const organic =
      Math.sin(t * 3 + phase) * 0.075 +
      Math.cos(t * 5 + phase * 1.2) * 0.042 +
      Math.sin(t * 8 + phase * 0.85) * 0.022 +
      Math.cos(t * 13 + phase * 1.6) * 0.01;
    const encFactor = encroach * Math.max(0, Math.cos(t - 0.12)) * 0.44;
    const r = avgR * (1 + organic) * (1 - encFactor);
    pts.push({ t, x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) });
  }
  return pts;
}

function smoothSeg(pts, idxArr) {
  const N = pts.length;
  const g = (i) => pts[i % N];
  let d = `M ${g(idxArr[0]).x.toFixed(1)},${g(idxArr[0]).y.toFixed(1)}`;
  for (let k = 0; k < idxArr.length - 1; k++) {
    const p0 = g(idxArr[k > 0 ? k - 1 : 0]);
    const p1 = g(idxArr[k]);
    const p2 = g(idxArr[k + 1]);
    const p3 = g(idxArr[k < idxArr.length - 2 ? k + 2 : idxArr.length - 1]);
    d += ` C ${(p1.x + (p2.x - p0.x) / 6).toFixed(1)},${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ${(p2.x - (p3.x - p1.x) / 6).toFixed(1)},${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

export function ringPath(avgR, phase, encroach, gapRanges) {
  const pts = ringPts(avgR, phase, encroach);
  const N = pts.length;
  if (!gapRanges || gapRanges.length === 0) {
    let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
    for (let k = 0; k < N; k++) {
      const p0 = pts[(k - 1 + N) % N];
      const p1 = pts[k];
      const p2 = pts[(k + 1) % N];
      const p3 = pts[(k + 2) % N];
      d += ` C ${(p1.x + (p2.x - p0.x) / 6).toFixed(1)},${(p1.y + (p2.y - p0.y) / 6).toFixed(1)} ${(p2.x - (p3.x - p1.x) / 6).toFixed(1)},${(p2.y - (p3.y - p1.y) / 6).toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d + ' Z';
  }
  const isGap = pts.map((p) => gapRanges.some(([s, e]) => p.t >= s && p.t <= e));
  const segs = [];
  let cur = [];
  for (let i = 0; i < N; i++) {
    if (!isGap[i]) cur.push(i);
    else if (cur.length) {
      segs.push(cur);
      cur = [];
    }
  }
  if (cur.length) segs.push(cur);
  if (segs.length >= 2 && !isGap[0] && !isGap[N - 1]) {
    const merged = [...segs[segs.length - 1], ...segs[0].map((i) => i + N)];
    segs.splice(segs.length - 1, 1, merged);
    segs.shift();
  }
  return segs
    .filter((s) => s.length >= 2)
    .map((s) => smoothSeg(pts, s))
    .join(' ');
}

// Generalized marker placement: finds the ring point nearest a target angle,
// preserving Rio's drag-to-select interaction model.
export function ringPoint(avgR, phase, encroach, angle) {
  const pts = ringPts(avgR, phase, encroach);
  let best = pts[0];
  let bestDist = Infinity;
  for (const p of pts) {
    let d = Math.abs(p.t - angle);
    if (d > Math.PI) d = Math.PI * 2 - d;
    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }
  return [best.x, best.y];
}

// Outer -> inner. Index 0 = outermost (most recent year, 2025).
export const RING_DEFS = [
  { avgR: 162, phase: 0.1, encroach: 0.62, gapRanges: null, strokeWidth: 2.5 },
  { avgR: 140, phase: 1.2, encroach: 0.5, gapRanges: null, strokeWidth: 2.2 },
  { avgR: 118, phase: 2.1, encroach: 0.36, gapRanges: null, strokeWidth: 2.0 },
  { avgR: 96, phase: 3.0, encroach: 0.24, gapRanges: [[-0.3, 0.44]], strokeWidth: 1.8 },
  { avgR: 74, phase: 3.7, encroach: 0.12, gapRanges: [[-0.74, -0.32]], strokeWidth: 1.6 },
  { avgR: 52, phase: 4.4, encroach: 0.04, gapRanges: null, strokeWidth: 1.4 },
];

// Innermost decorative pith ring, not selectable.
export const CORE_DEF = { avgR: 32, phase: 5.1, encroach: 0.01, gapRanges: null, strokeWidth: 1.2 };

export const CENTER = { cx: BASE_CX, cy: BASE_CY };
