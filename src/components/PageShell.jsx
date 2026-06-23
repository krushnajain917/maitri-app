import { useState } from 'react';
import Header from './Header';
import HamburgerMenu from './HamburgerMenu';
import FloatingActionButton from './FloatingActionButton';
import BottomNav from './BottomNav';

export default function PageShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <main className="pb-[148px] tablet:pb-20 desktop:pb-20" style={{ position: 'relative' }}>
        {children}
      </main>
      <FloatingActionButton />
      <BottomNav />
    </>
  );
}
