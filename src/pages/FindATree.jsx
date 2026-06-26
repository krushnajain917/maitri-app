import { useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '../components/PageShell';
import RingIllustration from '../components/RingIllustration';
import YearScrubber from '../components/YearScrubber';
import { useTreeRing } from '../hooks/useTreeRing';
import { useResponsive } from '../hooks/useResponsive';
import { jyesthaRingYears } from '../data/jyesthaRingYears';
import { RING_DEFS, CORE_DEF, CENTER, ringPath, ringPoint } from '../utils/jyesthaRingGeometry';
import branchRight from '../assets/branches/branch-right.png';
import branchLeft from '../assets/branches/branch-left.png';
import { TreeIcon } from '../icons';

const STATUS_COLOR = { critical: '#D6443C', attention: '#E8962A', stable: '#4D8B63' };
const STATUS_LABEL = { critical: 'critical', attention: 'needs attention', stable: 'stable' };
const STATUS_BG = { critical: '#fdf0ef', attention: '#fef7ec', stable: '#eef6f1' };

const MAP_MARKERS = [
  { id: 'jyestha', left: 38, top: 6, status: 'critical', z: 4, clickable: true },
  { id: 'pappayya', left: 19, top: 72, status: 'attention', z: 3, clickable: false },
  { id: 'meghna', left: 15, top: 46, status: 'stable', z: 3, clickable: false },
  { id: 'kadam', left: 32, top: 72, status: 'attention', z: 3, clickable: false },
  { id: 'neela', left: 45, top: 62, status: 'critical', z: 4, clickable: false },
  { id: 'tamara', left: 43, top: 70, status: 'stable', z: 3, clickable: false },
];

const TREE_LIST = [
  { id: 'jyestha', name: 'jyestha', subtitle: '130-yr banyan · aarey fringe', status: 'critical', clickable: true },
  { id: 'pappayya', name: 'pappayya', subtitle: '89-yr peepal · shivaji park', status: 'attention', clickable: false },
  { id: 'meghna', name: 'meghna', subtitle: '65-yr gulmohar · bandra hill road', status: 'stable', clickable: false },
  { id: 'kadam', name: 'kadam', subtitle: '112-yr rain tree · dadar TT', status: 'attention', clickable: false },
  { id: 'neela', name: 'neela', subtitle: '78-yr neem · dharavi edge', status: 'critical', clickable: false },
  { id: 'tamara', name: 'tamara', subtitle: '95-yr tamarind · matunga colony', status: 'stable', clickable: false },
];

const JYESTHA_RINGS = RING_DEFS.map((def) => ({ ...def, d: ringPath(def.avgR, def.phase, def.encroach, def.gapRanges) }));
const JYESTHA_CORE_D = ringPath(CORE_DEF.avgR, CORE_DEF.phase, CORE_DEF.encroach, CORE_DEF.gapRanges);
const jyesthaPointAt = (ringDef, angle) => ringPoint(ringDef.avgR, ringDef.phase, ringDef.encroach, angle);

const JYESTHA_NAME = 'jyestha';
const JYESTHA_SPEC = '130-yr banyan · ficus benghalensis';
const JYESTHA_LOC = 'aarey fringe, p-south · encroachment and root damage';
const JYESTHA_OPENING =
  "hi, this is jyestha. she's the oldest tree on maitri — and the one most at risk of being forgotten. encroachment is eating into her roots, and no one's stepped in yet.";
const JYESTHA_FUNDING = '₹18,000 of ₹35,000 raised';
const JYESTHA_FUNDING_PCT = 51;
const JYESTHA_FUNDING_DESC = 'funds go toward legal intervention against encroachment and root stabilisation.';

const RIGHT_BRANCHES = [
  { name: 'r1', top: 320, offset: -140, width: 380, rotate: -3, opacity: 0.92 },
  { name: 'r2', top: 820, offset: -100, width: 260, rotate: -7, opacity: 0.86 },
  { name: 'r3', top: 1280, offset: -120, width: 320, rotate: -5, opacity: 0.9 },
];
const LEFT_BRANCHES = [
  { name: 'l1', top: 570, offset: -110, width: 300, rotate: 5, opacity: 0.88 },
  { name: 'l2', top: 1050, offset: -80, width: 240, rotate: 8, opacity: 0.84 },
  { name: 'l3', top: 1600, offset: -130, width: 360, rotate: 4, opacity: 0.9 },
];

const BRANCH_REFERENCE_REACH = Math.max(
  ...RIGHT_BRANCHES.map((b) => b.width + b.offset),
  ...LEFT_BRANCHES.map((b) => b.width + b.offset)
);

function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
      <path
        d="M 4 2 Q 5.5 1 7 3.5 L 8 6.5 Q 9 8.5 7 9.5 Q 6.5 10 7 11.5 Q 8.5 15.5 12.5 17.5 Q 14 18 14.5 17 Q 15.5 15.5 17.5 16.5 L 19.5 17.5 Q 21.5 18.5 20.5 20 Q 18.5 23 15.5 20.5 Q 8 15.5 3.5 8 Q 1 4.5 4 2 Z"
        stroke="#1a1a1a"
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusPill({ status }) {
  return (
    <span
      className="font-jost"
      style={{
        display: 'inline-block',
        background: STATUS_BG[status],
        color: STATUS_COLOR[status],
        fontSize: 12,
        fontWeight: 500,
        padding: '4px 12px',
        borderRadius: 100,
      }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function StaticBranch({ name, side, top, offset, width, rotate, opacity, src }) {
  return (
    <motion.img
      data-branch={name}
      src={src}
      alt=""
      initial={{ x: side === 'l' ? 160 : -160, opacity: 0 }}
      animate={{ x: 0, opacity }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        top,
        [side === 'l' ? 'left' : 'right']: offset,
        width,
        pointerEvents: 'none',
        zIndex: 0,
        rotate: `${rotate}deg`,
      }}
    />
  );
}

export default function FindATree() {
  const r = useResponsive();
  const [view, setView] = useState('map');
  const [tied, setTied] = useState(false);
  const tree = useTreeRing(jyesthaRingYears);

  const branchScale = Math.min(1, r.branchSafeReach / BRANCH_REFERENCE_REACH);
  const mapHeight = r.isMobile ? '52vh' : r.isTablet ? '58vh' : '64vh';

  const openProfile = () => {
    setView('jyestha');
    setTied(false);
  };
  const backToMap = () => setView('map');

  if (view === 'jyestha') {
    return (
      <PageShell>
        <div style={{ maxWidth: r.contentMaxWidth, margin: '0 auto', padding: `0 ${r.sidePad}`, position: 'relative' }}>
          <button
            onClick={backToMap}
            className="font-jost"
            style={{
              background: 'none',
              border: 'none',
              padding: '20px 0 4px',
              fontSize: 14,
              fontWeight: 400,
              color: '#888',
              cursor: 'pointer',
            }}
          >
            ← back to map
          </button>

          <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 20 }}>
            <div style={{ marginBottom: 14 }}>
              <StatusPill status="critical" />
            </div>
            <h1
              className="font-brush"
              style={{ fontWeight: 400, fontSize: r.isMobile ? '36px' : '56px', color: '#1a1a1a', lineHeight: 1.05, margin: '0 0 12px 0', letterSpacing: '0.03em' }}
            >
              {JYESTHA_NAME}
            </h1>
            <p className="font-jost" style={{ fontSize: 15, color: '#777', margin: '0 0 4px 0' }}>
              {JYESTHA_SPEC}
            </p>
            <p className="font-jost" style={{ fontSize: 14, color: '#999', margin: 0 }}>
              {JYESTHA_LOC}
            </p>
          </div>

          <div style={{ background: '#F5F4F0', borderRadius: 12, padding: '22px 24px', marginBottom: 32 }}>
            <p className="font-jost" style={{ fontSize: 17, lineHeight: 1.7, color: '#4a4a4a', margin: 0 }}>
              {JYESTHA_OPENING}
            </p>
          </div>

          <RingIllustration
            size={r.ringSize}
            step={tree.step}
            onSelectStep={tree.selectStep}
            rings={JYESTHA_RINGS}
            coreD={JYESTHA_CORE_D}
            coreStrokeWidth={CORE_DEF.strokeWidth}
            center={CENTER}
            pointAt={jyesthaPointAt}
            markerColor="#D6443C"
          />

          <YearScrubber
            step={tree.step}
            stepCount={tree.stepCount}
            current={tree.current}
            onSelectStep={tree.selectStep}
            isPlaying={tree.isPlaying}
            onTogglePlay={tree.togglePlay}
          />

          <div style={{ borderTop: '1px solid #ebebeb', paddingTop: 28, marginTop: 24, marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span className="font-jost" style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a' }}>
                {JYESTHA_FUNDING}
              </span>
              <span className="font-jost" style={{ fontSize: 15, fontWeight: 500, color: '#D6443C' }}>
                {JYESTHA_FUNDING_PCT}%
              </span>
            </div>
            <div style={{ height: 6, background: '#f0efed', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ width: `${JYESTHA_FUNDING_PCT}%`, height: '100%', background: '#D6443C' }} />
            </div>
            <p className="font-jost" style={{ fontSize: 14, lineHeight: 1.6, color: '#888', margin: 0 }}>
              {JYESTHA_FUNDING_DESC}
            </p>
          </div>

          <button
            className="font-jost"
            style={{
              width: '100%',
              background: '#fff',
              border: '1.5px solid #1a1a1a',
              borderRadius: 8,
              padding: '16px 24px',
              fontWeight: 500,
              fontSize: 16,
              color: '#1a1a1a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <PhoneIcon />
            call the ngo / sanctuary
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
            <button
              onClick={() => setTied(true)}
              className="font-jost"
              style={{ background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 10, padding: '22px 16px', textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>just you</div>
              <div style={{ fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.45 }}>a personal bond — tie your own rakhi</div>
            </button>
            <button
              onClick={() => setTied(true)}
              className="font-jost"
              style={{ position: 'relative', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 10, padding: '22px 16px', textAlign: 'left', cursor: 'pointer' }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 12,
                  background: '#D6443C',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 400,
                  padding: '3px 10px',
                  borderRadius: 10,
                  letterSpacing: '0.03em',
                }}
              >
                popular
              </span>
              <div style={{ fontWeight: 500, fontSize: 17, marginBottom: 8 }}>join a raksha circle</div>
              <div style={{ fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.58)', lineHeight: 1.45 }}>pool care with others</div>
            </button>
          </div>

          {tied && (
            <p className="font-jost" style={{ fontSize: 15, color: '#4D8B63', textAlign: 'center', margin: '0 0 28px 0' }}>
              thank you — you've tied a rakhi for jyestha.
            </p>
          )}
        </div>

        {RIGHT_BRANCHES.map((b) => (
          <StaticBranch key={b.name} side="r" src={branchRight} {...b} offset={b.offset * branchScale} width={b.width * branchScale} />
        ))}
        {LEFT_BRANCHES.map((b) => (
          <StaticBranch key={b.name} side="l" src={branchLeft} {...b} offset={b.offset * branchScale} width={b.width * branchScale} />
        ))}
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div style={{ position: 'relative', height: mapHeight, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, #d6e6f0 0%, #cfe3e0 35%, #d8e8d2 60%, #cde0d6 100%)',
          }}
        >
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} preserveAspectRatio="none">
            <path d="M0,30 Q25,10 50,28 T100,22" stroke="#b9cdd6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            <path d="M0,60 Q35,75 60,58 T100,68" stroke="#bcd0c4" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            <path d="M10,0 Q15,50 8,100" stroke="#c4d6dc" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
            <path d="M70,0 Q65,40 75,100" stroke="#c4d6dc" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            display: 'flex',
            gap: 10,
            zIndex: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              background: '#fff',
              borderRadius: 100,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#999" strokeWidth="1.4" />
              <line x1="11.5" y1="11.5" x2="15" y2="15" stroke="#999" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              className="font-jost"
              placeholder="search location or tree species"
              style={{ border: 'none', outline: 'none', fontSize: 14, color: '#1a1a1a', flex: 1, background: 'transparent' }}
            />
          </div>
          <button
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              background: '#1a1a1a',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            }}
            aria-label="my location"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" fill="#fff" />
              <circle cx="8" cy="8" r="6" stroke="#fff" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        {MAP_MARKERS.map((m) => (
          <button
            key={m.id}
            onClick={m.clickable ? openProfile : undefined}
            disabled={!m.clickable}
            style={{
              position: 'absolute',
              left: `${m.left}%`,
              top: `${m.top}%`,
              transform: 'translate(-50%, -100%)',
              zIndex: m.z,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: m.clickable ? 'pointer' : 'default',
            }}
            aria-label={m.id}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#fff',
                border: `2px solid ${STATUS_COLOR[m.status]}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TreeIcon width={13} height={17} fill={STATUS_COLOR[m.status]} />
            </div>
          </button>
        ))}

        <div
          className="font-jost"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: '#fff',
            borderRadius: 10,
            padding: '12px 16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            zIndex: 10,
          }}
        >
          {['critical', 'attention', 'stable'].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: s === 'stable' ? 0 : 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[s], display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: '#666' }}>{STATUS_LABEL[s]}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: r.contentMaxWidth, margin: '0 auto', padding: `0 ${r.sidePad}` }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#ddd' }} />
        </div>

        <div style={{ padding: '18px 0 8px' }}>
          <h2 className="font-brush" style={{ fontWeight: 400, fontSize: r.isMobile ? '24px' : '32px', color: '#1a1a1a', margin: '0 0 4px 0' }}>
            nearby trees
          </h2>
          <p className="font-jost" style={{ fontSize: 14, color: '#999', margin: 0 }}>
            mumbai · 6 trees
          </p>
        </div>

        <div>
          {TREE_LIST.map((t) => (
            <button
              key={t.id}
              onClick={t.clickable ? openProfile : undefined}
              disabled={!t.clickable}
              className="font-jost"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px 0',
                borderBottom: '1px solid #f5f5f5',
                background: 'none',
                border: 'none',
                borderBottomWidth: 1,
                textAlign: 'left',
                cursor: t.clickable ? 'pointer' : 'default',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: STATUS_BG[t.status],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TreeIcon width={18} height={23} fill={STATUS_COLOR[t.status]} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span className="font-jost" style={{ fontWeight: 500, fontSize: 17, color: '#1a1a1a' }}>
                    {t.name}
                  </span>
                  <span style={{ fontSize: 14, color: '#999' }}>{t.subtitle}</span>
                </div>
                <StatusPill status={t.status} />
              </div>
              {t.clickable && (
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M 1.5 1 L 7 7 L 1.5 13" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
