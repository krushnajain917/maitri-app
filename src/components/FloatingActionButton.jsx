import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreeIcon } from '../icons';

export default function FloatingActionButton({ to = '/find' }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 480 : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isMobile ? 76 : 32,
        right: isMobile ? 16 : 32,
        zIndex: 45,
      }}
    >
      <button
        className="font-jost"
        onClick={() => navigate(to)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#1a1a1a',
          color: '#fff',
          border: 'none',
          borderRadius: 100,
          padding: '15px 26px',
          fontWeight: 500,
          fontSize: 17,
          cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
          whiteSpace: 'nowrap',
          minHeight: 44,
        }}
      >
        <TreeIcon width={17} height={22} fill="#fff" />
        {isMobile ? 'find a tree' : 'find a tree · tie a rakhi'}
      </button>
    </div>
  );
}
