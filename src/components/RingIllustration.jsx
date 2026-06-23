import { useCallback, useRef, useState } from 'react';
import { RING_DEFS, CORE_RING, CENTER, ringPath, ringPoint } from '../utils/ringGeometry';

const RADII = RING_DEFS.map((r) => r.avgR);
const VIEWBOX = { minX: -10, minY: -15, w: 400, h: 400 };

function clientToSvgPoint(svg, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const x = VIEWBOX.minX + ((clientX - rect.left) / rect.width) * VIEWBOX.w;
  const y = VIEWBOX.minY + ((clientY - rect.top) / rect.height) * VIEWBOX.h;
  return [x, y];
}

function nearestStepForRadius(radius) {
  let bestIdx = 0;
  let bestDist = Infinity;
  RADII.forEach((r, i) => {
    const dist = Math.abs(r - radius);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  });
  // RADII is outer -> inner; ring years are oldest(innermost) -> newest(outermost).
  return RADII.length - 1 - bestIdx;
}

export default function RingIllustration({ size, step, onSelectStep }) {
  const svgRef = useRef(null);
  const [angle, setAngle] = useState(-Math.PI / 2);
  const [dragging, setDragging] = useState(false);

  const handlePointer = useCallback(
    (clientX, clientY) => {
      const svg = svgRef.current;
      if (!svg) return;
      const [x, y] = clientToSvgPoint(svg, clientX, clientY);
      const dx = x - CENTER.cx;
      const dy = y - CENTER.cy;
      const radius = Math.sqrt(dx * dx + dy * dy);
      setAngle(Math.atan2(dy, dx));
      onSelectStep(nearestStepForRadius(radius));
    },
    [onSelectStep]
  );

  const onPointerDown = (e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointer(e.clientX, e.clientY);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    handlePointer(e.clientX, e.clientY);
  };
  const onPointerUp = (e) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const activeRingIdx = RADII.length - 1 - step;
  const activeDef = RING_DEFS[activeRingIdx];
  const [markerX, markerY] = ringPoint(activeDef.avgR, activeDef.phase, angle);

  return (
    <div style={{ textAlign: 'center', marginBottom: 0 }}>
      <svg
        ref={svgRef}
        viewBox="-10 -15 400 400"
        style={{ width: size, height: size, display: 'block', margin: '0 auto', cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {RING_DEFS.map((r, i) => (
          <path
            key={i}
            d={ringPath(r.avgR, r.phase)}
            stroke="#1a1a1a"
            strokeWidth={r.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={i === activeRingIdx ? 1 : 0.85}
          />
        ))}
        <path
          d={ringPath(CORE_RING.avgR, CORE_RING.phase)}
          stroke="#1a1a1a"
          strokeWidth={CORE_RING.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={markerX}
          cy={markerY}
          r="5.5"
          fill="#D6443C"
          style={{ transition: dragging ? 'none' : 'cx 0.3s ease, cy 0.3s ease' }}
        />
        <circle cx={CENTER.cx} cy={CENTER.cy} r="2" fill="#1a1a1a" opacity="0.25" />
      </svg>
    </div>
  );
}
