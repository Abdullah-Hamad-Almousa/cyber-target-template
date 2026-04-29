import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyUs.module.scss';

gsap.registerPlugin(ScrollTrigger);

const itemsEn = [
  'Certified security professionals (CISSP, CEH, OSCP) on every engagement',
  'Average incident response time under 15 minutes',
  'Custom security architectures tailored to your risk profile',
  'Transparent reporting with actionable intelligence',
  '24/7/365 Security Operations Center monitoring',
];

const itemsAr = [
  'محترفو أمن معتمدون (CISSP، CEH، OSCP) في كل مشروع',
  'متوسط وقت الاستجابة للحوادث أقل من 15 دقيقة',
  'هندسات أمنية مخصصة مصممة وفقًا لملف المخاطر الخاص بك',
  'تقارير شفافة مع معلومات قابلة للتنفيذ',
  'مركز عمليات الأمن على مدار الساعة طوال أيام الأسبوع',
];

interface WhyUsProps {
  language: string;
}

export default function WhyUs({ language }: WhyUsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';
  const items = isAr ? itemsAr : itemsEn;

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
        section.querySelector(`.${styles.image}`),
        { opacity: 0, x: isAr ? 40 : -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      const listItems = section.querySelectorAll(`.${styles.listItem}`);
      gsap.fromTo(
        listItems,
        { opacity: 0, x: isAr ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector(`.${styles.list}`), start: 'top 80%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.whyUs} id="why-us" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>{isAr ? 'لماذا تختارنا' : 'Why Choose Us'}</span>
          <h2 className={styles.title}>
            {isAr ? 'موثوق به من قادة الصناعة' : 'Trusted by Industry Leaders'}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? 'نجمع بين التكنولوجيا المتقدمة والخبرة العميقة لتحقيق نتائج أمنية لا مثيل لها.'
              : 'We combine cutting-edge technology with deep expertise to deliver unmatched security outcomes.'}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.image}>
            <img
              src="/images/why-us.jpeg"
              alt="Why choose Cyber Target"
              className={styles.imageImg}
            />
          </div>

          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={i} className={styles.listItem}>
                <span className={styles.check}>
                  <Check size={14} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
