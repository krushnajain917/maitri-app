import { NavLink } from 'react-router-dom';
import { CloseIcon, HomeIcon, AboutIcon, CommunitiesIcon, TreeIcon, PersonIcon } from '../icons';

const ITEMS = [
  { to: '/', label: 'home', Icon: HomeIcon, iconW: 26, iconH: 35 },
  { to: '/about', label: 'about us', Icon: AboutIcon, iconW: 26, iconH: 28 },
  { to: '/communities', label: 'communities', Icon: CommunitiesIcon, iconW: 26, iconH: 31 },
  { to: '/find', label: 'find a tree', Icon: TreeIcon, iconW: 21, iconH: 27 },
  { to: '/you', label: 'you', Icon: PersonIcon, iconW: 18, iconH: 36 },
];

export default function HamburgerMenu({ open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.32)',
          zIndex: 99,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 288,
          background: '#fff',
          zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '6px 0 32px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 20px 40px',
        }}
      >
        <button
          onClick={onClose}
          aria-label="close menu"
          style={{ alignSelf: 'flex-end', background: 'none', border: 'none', cursor: 'pointer', padding: 8, marginBottom: 12, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <CloseIcon />
        </button>

        {ITEMS.map(({ to, label, Icon, iconW, iconH }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 18px',
              borderRadius: 8,
              background: isActive ? '#F5F4F0' : 'transparent',
              marginBottom: 4,
              cursor: 'pointer',
              textDecoration: 'none',
            })}
          >
            <Icon width={iconW} height={iconH} />
            <span className="font-jost" style={{ fontWeight: 500, fontSize: 19, color: '#1a1a1a' }}>
              {label}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
