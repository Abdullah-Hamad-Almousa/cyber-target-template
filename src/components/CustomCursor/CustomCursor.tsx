import { useEffect, useRef } from 'react';
import { isTouchDevice } from '@/utils/helpers';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    if (isTouchDevice()) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hover]')
      ) {
        isHoveringRef.current = true;
        cursor.classList.add(styles.hovering);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hover]')
      ) {
        isHoveringRef.current = false;
        cursor.classList.remove(styles.hovering);
      }
    };

    let rafId: number;
    const animate = () => {
      const ease = 0.15;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * ease;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * ease;

      cursor.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;
      dot.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true" />
      <div ref={cursorDotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
