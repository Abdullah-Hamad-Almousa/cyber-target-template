import type { ReactNode } from 'react';
import styles from './AnimatedBorder.module.scss';

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedBorder({ children, className = '' }: AnimatedBorderProps) {
  return (
    <div className={`${styles.wrapper} ${className}`} data-hover>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
