import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import ParticleCanvas from '@/components/ParticleCanvas/ParticleCanvas';
import styles from './CTA.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface CTAProps {
  language: string;
}

export default function CTA({ language }: CTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector(`.${styles.content}`),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.cta} id="cta" ref={sectionRef}>
      <div className={styles.particleBg}>
        <ParticleCanvas particleCount={40} speed={0.2} mouseInteraction={false} />
      </div>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h2>{isAr ? 'مستعد لتأمين عملك؟' : 'Ready to Secure Your Business?'}</h2>
        <p>
          {isAr
            ? 'احصل على تقييم أمني مجاني واكتشف كيف يمكننا حماية مؤسستك من التهديدات السيبرانية المتطورة.'
            : 'Get a free security assessment and discover how we can protect your organization from evolving cyber threats.'}
        </p>
        <MagneticButton variant="primary" href="#contact">
          {isAr ? 'طلب تقييم' : 'Request Assessment'}
          <ArrowRight size={16} className={isAr ? styles.arrowRtl : ''} />
        </MagneticButton>
      </div>
    </section>
  );
}
