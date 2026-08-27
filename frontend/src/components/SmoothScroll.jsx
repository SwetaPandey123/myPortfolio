'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  // Reset to top on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  // Init Lenis with consistent uniform speed
  useEffect(() => {
    let lenis;
    let animFrameId;

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;

        lenis = new Lenis({
          duration: 1.2,          // consistent duration everywhere
          easing: (t) => t < 0.5  // smooth ease-in-out, no fast/slow variance
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2,
          smoothTouch: false,     // native touch scroll (no lag on mobile)
          touchMultiplier: 1,
          wheelMultiplier: 1,     // uniform wheel speed
          infinite: false,
        });

        lenisRef.current = lenis;

        const raf = (time) => {
          lenis?.raf(time);
          animFrameId = requestAnimationFrame(raf);
        };
        animFrameId = requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis init failed, using native scroll:', err);
      }
    };

    initLenis();

    return () => {
      cancelAnimationFrame(animFrameId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
