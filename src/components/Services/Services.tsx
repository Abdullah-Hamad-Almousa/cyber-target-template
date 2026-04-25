import { useRef, useEffect } from 'react';
import { Activity, AlertTriangle, Cloud, Eye, ClipboardCheck, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '@/components/GlassCard/GlassCard';
import styles from './Services.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  icon: React.ReactNode;
  badge: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const services: ServiceItem[] = [
  {
    icon: <Activity size={20} />,
    badge: 'Active',
    titleEn: 'Threat Detection',
    titleAr: 'اكتشاف التهديدات',
    descEn: 'AI-powered monitoring that identifies anomalies before they become breaches.',
    descAr: 'مراقبة مدعومة بالذكاء الاصطناعي تحدد حالات الشذوذ قبل أن تصبح اختراقات.',
  },
  {
    icon: <AlertTriangle size={20} />,
    badge: '24/7',
    titleEn: 'Incident Response',
    titleAr: 'الاستجابة للحوادث',
    descEn: '24/7 rapid response team to contain, investigate, and remediate security incidents.',
    descAr: 'فريق استجابة سريع على مدار الساعة لاحتواء الحوادث الأمنية والتحقيق فيها وإصلاحها.',
  },
  {
    icon: <Cloud size={20} />,
    badge: 'Enabled',
    titleEn: 'Cloud Security',
    titleAr: 'أمن السحابة',
    descEn: 'Secure your multi-cloud infrastructure with continuous compliance and posture management.',
    descAr: 'أمن بنيتك التحتية متعدد السحب مع الامتثال المستمر وإدارة الوضع الأمني.',
  },
  {
    icon: <Eye size={20} />,
    badge: 'Running',
    titleEn: 'Penetration Testing',
    titleAr: 'اختبار الاختراق',
    descEn: 'Identify vulnerabilities with expert-led simulated attacks and detailed remediation plans.',
    descAr: 'حدد نقاط الضعف من خلال محاكاة هجمات بقيادة خبراء وخطط تصحيح مفصلة.',
  },
  {
    icon: <ClipboardCheck size={20} />,
    badge: 'Compliant',
    titleEn: 'Compliance & Audit',
    titleAr: 'الامتثال والتدقيق',
    descEn: 'Stay compliant with GDPR, ISO 27001, SOC 2, and industry-specific regulations.',
    descAr: 'ابقَ متوافقًا مع GDPR وISO 27001 وSOC 2 واللوائح الخاصة بالصناعة.',
  },
  {
    icon: <Users size={20} />,
    badge: 'Scheduled',
    titleEn: 'Security Training',
    titleAr: 'التدريب الأمني',
    descEn: 'Build a human firewall with tailored awareness programs and phishing simulations.',
    descAr: 'ابنِ جدارًا ناريًا بشريًا من خلال برامج الوعي المخصصة ومحاكاة التصيد.',
  },
];

interface ServicesProps {
  language: string;
}

export default function Services({ language }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const isAr = language === 'ar';

  return (
    <section className={styles.services} id="services" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>{isAr ? 'ما نقوم به' : 'What We Do'}</span>
          <h2 className={styles.title}>
            {isAr ? 'خدمات أمن شاملة' : 'Comprehensive Security Services'}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? 'حماية شاملة مصممة خصيصًا لمشهد التهديدات الفريد لمؤسستك.'
              : "End-to-end protection tailored to your organization's unique threat landscape."}
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.titleEn}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
            >
              <GlassCard tilt glow>
                <div className={styles.cardHeader}>
                  <div className={styles.icon}>{service.icon}</div>
                  <span className={styles.badge}>
                    <span className={styles.badgeDot} />
                    {service.badge}
                  </span>
                </div>
                <h3>{isAr ? service.titleAr : service.titleEn}</h3>
                <p>{isAr ? service.descAr : service.descEn}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
