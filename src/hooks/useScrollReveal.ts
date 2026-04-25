import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 30,
      x = 0,
      scale = 1,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      ease = 'power3.out',
      start = 'top 85%',
    } = options;

    const children = stagger > 0 ? el.children : undefined;
    const targets = children ? Array.from(children) : el;

    const tween = gsap.fromTo(
      targets,
      { y, x, scale, opacity },
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
