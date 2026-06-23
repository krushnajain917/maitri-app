import { HamburgerIcon, PersonIcon } from '../icons';

export default function Header({ onOpenMenu }) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #ebebeb' }}>
      <div className="px-5 sm:px-6" style={{ width: '100%', height: 56, display: 'flex', alignItems: 'center', position: 'relative' }}>
        <button
          onClick={onOpenMenu}
          aria-label="open menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', zIndex: 1 }}
        >
          <HamburgerIcon />
        </button>
        <span
          className="font-brush"
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 400, fontSize: 24, letterSpacing: '0.03em', color: '#1a1a1a', pointerEvents: 'none' }}
        >
          maitri
        </span>
        <button
          aria-label="profile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto', zIndex: 1 }}
        >
          <PersonIcon />
        </button>
      </div>
    </header>
  );
}
