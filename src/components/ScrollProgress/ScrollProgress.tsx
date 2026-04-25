import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.scss';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.progressBar} aria-hidden="true">
      <div
        className={styles.progressFill}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
