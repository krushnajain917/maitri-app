import { useCallback, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '../icons';

export default function YearScrubber({ step, stepCount, current, onSelectStep, isPlaying, onTogglePlay }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const stepFromClientX = useCallback(
    (clientX) => {
      const track = trackRef.current;
      if (!track) return step;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(pct * (stepCount - 1));
    },
    [step, stepCount]
  );

  const onPointerDown = (e) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    onSelectStep(stepFromClientX(e.clientX));
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    onSelectStep(stepFromClientX(e.clientX));
  };
  const onPointerUp = (e) => {
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const percent = stepCount > 1 ? (step / (stepCount - 1)) * 100 : 0;

  return (
    <div style={{ textAlign: 'center', maxWidth: 340, margin: '0 auto 8px' }}>
      <p className="font-jost" style={{ fontWeight: 500, fontSize: 20, color: '#1a1a1a', margin: '0 0 4px 0' }}>
        {current.year} · age {current.age}
      </p>
      <p className="font-jost" style={{ fontWeight: 300, fontSize: 14, color: '#888', lineHeight: 1.4, margin: '0 0 10px 0' }}>
        {current.caption}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'pause' : 'play'}
          style={{
            flexShrink: 0,
            width: 30,
            height: 30,
            background: '#fff',
            border: '1.5px solid #1a1a1a',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            minWidth: 36,
            minHeight: 36,
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{ flex: 1, position: 'relative', height: 24, display: 'flex', alignItems: 'center', cursor: dragging ? 'grabbing' : 'pointer', touchAction: 'none' }}
        >
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: '#ddd', borderRadius: 1, transform: 'translateY(-50%)' }} />
          <div
            style={{
              position: 'absolute',
              left: `${percent}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 10,
              height: 10,
              background: '#D6443C',
              borderRadius: '50%',
              transition: dragging ? 'none' : 'left 0.2s ease',
            }}
          />
        </div>
      </div>
      <p className="font-jost" style={{ fontWeight: 300, fontSize: 12, color: '#c0b8b0', lineHeight: 1.4 }}>
        drag the rings or the slider — each year has its own sound.
      </p>
    </div>
  );
}
