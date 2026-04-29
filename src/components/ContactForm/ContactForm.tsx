import { useRef, useEffect } from 'react';
import { Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/MagneticButton/MagneticButton';
import GlassCard from '@/components/GlassCard/GlassCard';
import styles from './ContactForm.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface ContactFormProps {
  language: string;
}

export default function ContactForm({ language }: ContactFormProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector(`.${styles.header}`),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        section.querySelector(`.${styles.emailCta}`),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.contact} id="contact" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>{isAr ? 'اتصل بنا' : 'Contact'}</span>
          <h2 className={styles.title}>
            {isAr ? 'تواصل مع فريق الأمن' : 'Get in Touch'}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? 'أخبرنا باحتياجاتك الأمنية وسنرد عليك في غضون 24 ساعة.'
              : 'Tell us about your security needs and we will get back to you within 24 hours.'}
          </p>
        </div>

        <GlassCard className={styles.formCard}>
          <div className={styles.emailCta}>
            <Mail size={48} className={styles.emailIcon} />
            <p className={styles.emailText}>
              {isAr ? 'تواصل معنا عبر البريد الإلكتروني' : 'Reach us at'}
            </p>
            <MagneticButton variant="primary" href="mailto:nawaf.h@cybertarget.tech">
              <span>{isAr ? 'اتصل بنا' : 'Contact Us'}</span>
            </MagneticButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
