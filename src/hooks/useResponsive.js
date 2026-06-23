import { useEffect, useState } from 'react';

export function useResponsive() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = width <= 480;
  const isTablet = width > 480 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    contentMaxWidth: isDesktop ? '1140px' : isTablet ? '860px' : '100%',
    sidePad: isMobile ? '20px' : '24px',
    heroPaddingTop: isMobile ? '40px' : '72px',
    heroHeadingSize: isMobile ? '36px' : '72px',
    heroBodySize: isMobile ? '17px' : '22px',
    ringSize: isMobile ? '280px' : '520px',
    sacredHeadingSize: isMobile ? '24px' : '40px',
    heroIllustrationSize: isMobile ? '240px' : '360px',
    cardsOverflow: isMobile ? 'auto' : 'visible',
    cardFlex: isMobile ? 'none' : '1',
    cardMinWidth: isMobile ? '256px' : '0',
  };
}
