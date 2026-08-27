'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  // 1. Reset scroll position immediately on route change to prevent blank screen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenisRef.current) {
        try {
          lenisRef.current.scrollTo(0, { immediate: true });
        } catch (e) {
          // ignore if lenis is unmounting
        }
      }
    }
  }, [pathname]);

  // 2. Initialize Lenis with proper requestAnimationFrame cleanup
  useEffect(() => {
    let lenis;
    let animFrameId;

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;

        lenis = new Lenis({
          duration: 1.0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothTouch: false,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        function raf(time) {
          if (lenis) {
            lenis.raf(time);
            animFrameId = requestAnimationFrame(raf);
          }
        }

        animFrameId = requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis smooth scroll fallback:', err);
      }
    };

    initLenis();

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
