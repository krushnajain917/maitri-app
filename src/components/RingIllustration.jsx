import { useCallback, useMemo, useRef, useState } from 'react';
import { RING_DEFS, CORE_RING, CENTER, ringPath, ringPoint } from '../utils/ringGeometry';

const VIEWBOX = { minX: -10, minY: -15, w: 400, h: 400 };

const DEFAULT_RINGS = RING_DEFS.map((r) => ({ ...r, d: ringPath(r.avgR, r.phase) }));
const DEFAULT_CORE_D = ringPath(CORE_RING.avgR, CORE_RING.phase);
const defaultPointAt = (ringDef, angle) => ringPoint(ringDef.avgR, ringDef.phase, angle);

function clientToSvgPoint(svg, clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  const x = VIEWBOX.minX + ((clientX - rect.left) / rect.width) * VIEWBOX.w;
  const y = VIEWBOX.minY + ((clientY - rect.top) / rect.height) * VIEWBOX.h;
  return [x, y];
}

export default function RingIllustration({
  size,
  step,
  onSelectStep,
  rings = DEFAULT_RINGS,
  coreD = DEFAULT_CORE_D,
  coreStrokeWidth = CORE_RING.strokeWidth,
  center = CENTER,
  pointAt = defaultPointAt,
  markerColor = '#D6443C',
}) {
  const svgRef = useRef(null);
  const [angle, setAngle] = useState(-Math.PI / 2);
  const [dragging, setDragging] = useState(false);

  const radii = useMemo(() => rings.map((r) => r.avgR), [rings]);

  const nearestStepForRadius = useCallback(
    (radius) => {
      let bestIdx = 0;
      let bestDist = Infinity;
      radii.forEach((r, i) => {
        const dist = Math.abs(r - radius);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      // radii is outer -> inner; ring years are oldest(innermost) -> newest(outermost).
      return radii.length - 1 - bestIdx;
    },
    [radii]
  );

  const handlePointer = useCallback(
    (clientX, clientY) => {
      const svg = svgRef.current;
      if (!svg) return;
      const [x, y] = clientToSvgPoint(svg, clientX, clientY);
      const dx = x - center.cx;
      const dy = y - center.cy;
      const radius = Math.sqrt(dx * dx + dy * dy);
      setAngle(Math.atan2(dy, dx));
      onSelectStep(nearestStepForRadius(radius));
    },
    [onSelectStep, center, nearestStepForRadius]
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

  const activeRingIdx = radii.length - 1 - step;
  const activeDef = rings[activeRingIdx];
  const [markerX, markerY] = pointAt(activeDef, angle);

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
        {rings.map((r, i) => (
          <path
            key={i}
            d={r.d}
            stroke="#1a1a1a"
            strokeWidth={r.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={i === activeRingIdx ? 1 : 0.85}
          />
        ))}
        <path
          d={coreD}
          stroke="#1a1a1a"
          strokeWidth={coreStrokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={markerX}
          cy={markerY}
          r="5.5"
          fill={markerColor}
          style={{ transition: dragging ? 'none' : 'cx 0.3s ease, cy 0.3s ease' }}
        />
        <circle cx={center.cx} cy={center.cy} r="2" fill="#1a1a1a" opacity="0.25" />
      </svg>
    </div>
  );
}
