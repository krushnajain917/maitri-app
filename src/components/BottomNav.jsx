import { useEffect, useState } from 'react';
import { TreeIcon } from '../icons';

export default function BottomNav() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 480 : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: '#fff',
        borderTop: '1px solid #ebebeb',
        display: isMobile ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
      }}
    >
      <button aria-label="home" style={navBtnStyle}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <path d="M 2 10 L 11 2 L 20 10 L 20 21 L 14.5 21 L 14.5 15 L 7.5 15 L 7.5 21 L 2 21 Z" fill="#1a1a1a" />
        </svg>
      </button>
      <button aria-label="find a tree" style={navBtnStyle}>
        <TreeIcon width={21} height={27} fill="#bbb" />
      </button>
      <button aria-label="communities" style={navBtnStyle}>
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <circle cx="8.5" cy="6" r="4" stroke="#bbb" strokeWidth="1.5" />
          <circle cx="16.5" cy="6" r="4" stroke="#bbb" strokeWidth="1.5" />
          <path d="M 1 19.5 Q 1 13.5 8.5 13.5" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 12 15.5 Q 13.5 13.5 16.5 13.5 Q 23 13.5 23 19.5" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <button aria-label="profile" style={navBtnStyle}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="8.5" r="4.5" stroke="#bbb" strokeWidth="1.5" />
          <path d="M 2.5 21 Q 2.5 15 11 15 Q 19.5 15 19.5 21" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </nav>
  );
}

const navBtnStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 44,
  minHeight: 44,
  padding: 0,
};
