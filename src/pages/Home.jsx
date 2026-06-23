import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import PageShell from '../components/PageShell';
import RingIllustration from '../components/RingIllustration';
import YearScrubber from '../components/YearScrubber';
import ScrollBranch from '../components/ScrollBranch';
import { useTreeRing } from '../hooks/useTreeRing';
import { useResponsive } from '../hooks/useResponsive';
import branchRight from '../assets/branches/branch-right.png';
import branchLeft from '../assets/branches/branch-left.png';
import { PersonBadgeIcon } from '../icons';

const HERO_DESCRIPTION =
  "she is 134 years old. she has just been diagnosed with a disease spreading through her trunk. she cannot call a doctor, so she is calling you instead.";
const CALLOUT_TEXT =
  'every ring of her trunk holds one year. you just felt 1892. there are 134 more years like this one, waiting for you to hear them.';
const SACRED_HEADING = 'she has been protecting us long before we noticed.';
const SACRED_BODY =
  'in india, a tree is rarely just a tree. a sacred thread around a peepal, a banyan watching over a village square, a grove no one dares to cut. for centuries, we have trusted trees to hold our stories, our gods, our shade. now it is her turn to need us.';

const RIGHT_BRANCHES = [
  { name: 'r1', top: 446, offset: -100, width: 390, rotate: -3, opacity: 0.92 },
  { name: 'r2', top: 1032, offset: -75, width: 268, rotate: -8, opacity: 0.84 },
  { name: 'r3', top: 1448, offset: -220, width: 400, rotate: -2, opacity: 0.9 },
  { name: 'r4', top: 2116, offset: -105, width: 340, rotate: -6, opacity: 0.86 },
];
const LEFT_BRANCHES = [
  { name: 'l1', top: 282, offset: -105, width: 350, rotate: 4, opacity: 0.88 },
  { name: 'l2', top: 878, offset: -75, width: 268, rotate: 7, opacity: 0.82 },
  { name: 'l3', top: 1604, offset: -200, width: 370, rotate: 3, opacity: 0.9 },
  { name: 'l4', top: 2284, offset: -88, width: 310, rotate: 5, opacity: 0.85 },
];

export default function Home() {
  const tree = useTreeRing();
  const r = useResponsive();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });

  return (
    <PageShell>
      <div style={{ maxWidth: r.contentMaxWidth, margin: '0 auto', padding: `0 ${r.sidePad}` }}>
        <div ref={heroRef} style={{ marginTop: r.heroPaddingTop, marginBottom: 4, textAlign: 'center' }}>
          <svg
            style={{ width: r.heroIllustrationSize, height: 'auto', display: 'inline-block' }}
            viewBox="0 0 227 273"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M113.546 0C116.796 0.601861 120.217 1.21276 123.429 1.9419C130.313 3.45504 136.794 6.35518 142.453 10.4556C155.58 20.0662 153.901 22.0957 171.518 20.0317C175.685 19.5435 187.053 22.8221 191.513 24.2447C203.701 28.1336 214.298 39.2262 219.618 50.3623C228.847 70.0105 228.884 95.0895 222.709 115.685C220.925 121.63 210.993 135.387 205.793 139.493C202.886 141.79 194.672 137.038 190.771 135.398C201.204 122.902 212.858 125.714 216.126 104.507C220.825 74.0244 213.27 37.0535 176.276 31.3907C166.721 29.9279 162.475 33.4186 165.803 42.4086C168.507 51.3522 169.391 63.5246 167.315 72.5491C166.138 77.6667 164.54 82.3464 163.62 87.8508C140.251 100.089 129.212 82.1557 129.732 61.3474C130.132 45.3427 133.51 39.9904 144.738 28.6173C145.813 17.7583 108.572 7.08149 99.4488 14.004C93.9673 18.1633 88.2357 22.3627 84.3633 28.2128C80.3344 34.2993 72.6637 41.757 81.4046 47.1024C93.9289 54.7151 107.823 72.569 105.022 87.7371L104.885 88.4572C105.679 90.3499 106.113 91.9807 104.057 93.3909C70.8113 116.188 60.0876 75.4317 61.1718 51.9116C45.5852 46.9774 33.186 49.5998 23.898 62.7384C16.957 72.5576 9.04236 87.8129 11.7624 100.092C15.2885 116.013 25.9843 132.937 39.747 142.322C53.6069 151.762 63.0008 150.031 77.4921 144.318C78.9272 143.747 84.6048 148.142 86.037 149.505L86.5719 150.02C81.6898 155.62 69.0503 160.191 61.6659 160.836C52.4669 161.639 37.9499 155.609 31.2603 148.979C17.1543 134.991 2.64725 113.303 0.0627818 93.4525C-1.34206 65.5757 20.99 37.5151 50.9648 38.5434C51.2465 38.553 60.1999 38.3483 60.2174 38.3421C66.3262 36.2044 70.5151 24.0173 75.0392 19.2901C87.9371 2.42837 93.152 2.7853 113.546 0ZM147.563 77.5631C148.888 79.479 148.223 79.0378 150.189 80.0158C158.654 78.8031 160.951 58.7426 159.027 52.2759C158.369 50.0614 157.171 42.7333 155.491 41.1104C149.899 42.6677 144.928 44.7917 142.021 50.1236C138.099 57.3165 138.02 70.859 143.762 77.2305C145.737 78.0519 145.164 77.7888 147.563 77.5631ZM93.1229 86.3835C95.2715 83.8895 95.1639 81.331 95.5718 78.0174C90.986 69.2146 82.2415 57.6101 71.6027 55.9685C70.8654 65.8614 71.7459 76.5065 78.1504 84.7221C81.5379 89.0681 88.9067 89.5455 93.1229 86.3835Z" fill="black" />
            <path d="M87.4925 113.988C107.07 112.551 116.291 131.959 120.72 147.327C121.835 148.108 124.151 150.552 125.226 151.621C130.83 146.456 138.825 126.483 147.933 118.026C174.306 111.261 177.954 136.009 176.23 154.919C175.481 163.143 176.995 172.081 172.664 179.728C170.724 183.156 164.437 184.129 160.87 184.921C157.393 180.339 146.599 168.155 148.933 162.515L150.341 162.21C156.275 163.641 159.163 166.52 162.439 171.181C165.445 161.673 167.368 141.473 164.367 131.811C152.704 124.786 149.665 135.584 144.353 144.544C136.87 155.399 125.731 181.086 124.123 194.226C123.885 196.178 125.028 198.231 125.053 199.674C125.094 202.083 124.779 205.2 124.549 207.621C124.077 208.441 123.767 208.588 122.922 209.024C125.196 219.704 120.086 258.4 113.926 268.35C111.608 269.555 108.442 271.603 106.134 273C104.039 270.449 99.8451 265.703 99.1141 262.524C95.6294 247.376 99.4173 228.245 101.458 212.848C102.133 207.757 105.913 197.762 107.196 192.433C108.41 187.393 113.165 180.498 113.238 174.756C113.387 162.94 111.095 145.348 105.736 134.713C104.784 132.824 101.042 128.553 99.6123 126.89C92.776 126.104 85.6704 127.32 84.0054 117.681C84.7858 115.317 85.135 115.662 87.4925 113.988Z" fill="black" />
          </svg>
        </div>

        <section style={{ textAlign: 'center', paddingTop: 0, paddingBottom: 4 }}>
          <p className="font-jost" style={{ fontWeight: 300, fontSize: 13, color: '#999', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
            meet
          </p>
          <h1 className="font-brush" style={{ fontWeight: 400, fontSize: r.heroHeadingSize, color: '#1a1a1a', lineHeight: 1.0, margin: '0 0 20px 0', letterSpacing: '0.03em' }}>
            rio
          </h1>
          <p className="font-jost" style={{ fontSize: r.heroBodySize, lineHeight: 1.65, color: '#555', maxWidth: 560, margin: '0 auto' }}>
            {HERO_DESCRIPTION}
          </p>
        </section>

        <RingIllustration size={r.ringSize} step={tree.step} onSelectStep={tree.selectStep} />

        <YearScrubber
          step={tree.step}
          stepCount={tree.stepCount}
          current={tree.current}
          onSelectStep={tree.selectStep}
          isPlaying={tree.isPlaying}
          onTogglePlay={tree.togglePlay}
        />

        <div style={{ background: '#F5F4F0', borderRadius: 12, padding: '22px 24px', marginBottom: 52 }}>
          <p className="font-jost" style={{ fontSize: 18, lineHeight: 1.75, color: '#4a4a4a', margin: 0 }}>
            {CALLOUT_TEXT}
          </p>
        </div>

        <section style={{ borderTop: '1px solid #ebebeb', paddingTop: 44, marginBottom: 52 }}>
          <p className="font-jost" style={{ fontWeight: 300, fontSize: 15, color: '#c0b8b0', letterSpacing: '0.05em', margin: '0 0 18px 0' }}>
            before you meet the rest of her family.
          </p>
          <h2 className="font-brush" style={{ fontWeight: 400, fontSize: r.sacredHeadingSize, color: '#1a1a1a', lineHeight: 1.2, maxWidth: 480, margin: '0 0 18px 0' }}>
            {SACRED_HEADING}
          </h2>
          <p className="font-jost" style={{ fontSize: 20, lineHeight: 1.75, color: '#555', maxWidth: 680, margin: '0 0 36px 0' }}>
            {SACRED_BODY}
          </p>

          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#141414', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 60, height: 60, border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                  <path d="M 3.5 1.5 L 18.5 11 L 3.5 20.5 Z" fill="rgba(255,255,255,0.85)" />
                </svg>
              </div>
            </div>
          </div>
          <p className="font-jost" style={{ fontWeight: 300, fontSize: 15, color: '#999', textAlign: 'center', margin: 0 }}>
            video · the sacred thread, 2 min.
          </p>
        </section>

        <section style={{ marginBottom: 52 }}>
          <p className="font-jost" style={{ fontWeight: 300, fontSize: 15, color: '#c0b8b0', letterSpacing: '0.05em', margin: '0 0 22px 0' }}>
            people like you are already doing this.
          </p>

          <div style={{ display: 'flex', gap: 16, overflowX: r.cardsOverflow, paddingBottom: 4, marginBottom: 20 }}>
            <SocialCard bg="#d8ece0" fill="#2d6a4f" name="asha's circle" desc="3 years protecting a 200-yr banyan." flex={r.cardFlex} minWidth={r.cardMinWidth} />
            <SocialCard bg="#b7dfc5" fill="#1b4332" name="5 strangers, 1 oak" desc="met online, now meet every rakhi." flex={r.cardFlex} minWidth={r.cardMinWidth} />
          </div>

          <button
            className="font-jost"
            style={{ width: '100%', border: '1.5px solid #1a1a1a', background: '#fff', borderRadius: 8, padding: '16px 24px', fontWeight: 500, fontSize: 17, color: '#1a1a1a', cursor: 'pointer' }}
          >
            see their stories.
          </button>
        </section>
      </div>

      {RIGHT_BRANCHES.map((b) => (
        <ScrollBranch key={b.name} side="r" src={branchRight} progress={scrollYProgress} {...b} />
      ))}
      {LEFT_BRANCHES.map((b) => (
        <ScrollBranch key={b.name} side="l" src={branchLeft} progress={scrollYProgress} {...b} />
      ))}
    </PageShell>
  );
}

function SocialCard({ bg, fill, name, desc, flex, minWidth }) {
  return (
    <div style={{ flex, minWidth, border: '1px solid #ebebeb', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PersonBadgeIcon width={22} height={26} fill={fill} />
        </div>
        <span className="font-jost" style={{ fontWeight: 500, fontSize: 17, color: '#1a1a1a', whiteSpace: 'nowrap' }}>
          {name}
        </span>
      </div>
      <p className="font-jost" style={{ fontSize: 16, color: '#777', lineHeight: 1.55, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}
