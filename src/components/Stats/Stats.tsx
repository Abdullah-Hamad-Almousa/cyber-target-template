import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreatRadar from '@/components/ThreatRadar/ThreatRadar';
import styles from './Stats.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  target: number;
  suffix: string;
  labelEn: string;
  labelAr: string;
}

const stats: Stat[] = [
  { target: 300, suffix: '+', labelEn: 'Clients Protected', labelAr: 'عميل محمي' },
  { target: 100, suffix: '+', labelEn: 'Threats Blocked Daily', labelAr: 'تهديدات يتم حظرها يوميًا' },
  { target: 10, suffix: '+', labelEn: 'Years of Experience', labelAr: 'سنوات من الخبرة' },
];

interface StatsProps {
  language: string;
}

export default function Stats({ language }: StatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const animatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    animatedRef.current = false;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        onEnter: () => {
          if (animatedRef.current) return;
          animatedRef.current = true;

          stats.forEach((stat, i) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.target,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[i] = Math.floor(obj.val);
                  return next;
                });
              },
            });
          });
        },
      });

      gsap.fromTo(
        section.querySelectorAll(`.${styles.item}`),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const isAr = language === 'ar';

  return (
    <section className={styles.stats} id="stats" ref={sectionRef}>
      <div className={styles.radarBg}>
        <ThreatRadar />
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div key={stat.labelEn} className={styles.item}>
              <div className={styles.number}>
                <span dir="ltr">{counts[i]}{stat.suffix}</span>
              </div>
              <div className={styles.label}>{isAr ? stat.labelAr : stat.labelEn}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
