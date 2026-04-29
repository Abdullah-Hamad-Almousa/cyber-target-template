import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ParticleCanvas from '@/components/ParticleCanvas/ParticleCanvas';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import styles from './Hero.module.scss';

interface HeroProps {
  language: string;
}

export default function Hero({ language }: HeroProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll('.word');
    gsap.fromTo(
      words,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.5,
      }
    );
  }, [language]);

  const isAr = language === 'ar';

  const headlineWords = isAr
    ? ['أمن', 'مستقبلك', 'الرقمي']
    : ['Secure', 'Your', 'Digital', 'Future'];

  const accentIndices = isAr ? [2] : [2, 3];

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.particleBg}>
        <ParticleCanvas particleCount={80} speed={0.3} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.text}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className={styles.dot} />
            <span>{isAr ? 'أمان المؤسسات' : 'Enterprise Security'}</span>
          </motion.div>

          <h1 className={`${styles.headline} ${isAr ? styles.headlineAr : ''}`} ref={headlineRef} key={language}>
            {headlineWords.map((word, i) => (
              <span key={i} className={styles.wordWrap}>
                <span
                  className={`${styles.word} ${accentIndices.includes(i) ? styles.accent : ''}`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            className={styles.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {isAr
              ? 'خدمات أمن سيبراني على مستوى المؤسسات لحماية بنيتك التحتية الرقمية على مدار الساعة.'
              : 'Enterprise-grade cybersecurity services protecting your digital infrastructure 24/7. From threat detection to incident response, we keep your business safe.'}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <MagneticButton variant="primary" href="#contact">
              {isAr ? 'احصل على الحماية' : 'Get Protected'}
              <ArrowRight size={16} className={styles.arrow} />
            </MagneticButton>
            <MagneticButton variant="outline" href="#services">
              {isAr ? 'خدماتنا' : 'Our Services'}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className={styles.image}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <img
            src="/images/hero-soc.jpeg"
            alt="Cybersecurity operations center"
            className={styles.imageImg}
          />
        </motion.div>
      </div>
    </section>
  );
}
