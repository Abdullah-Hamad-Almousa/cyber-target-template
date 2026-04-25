import { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '@/components/GlassCard/GlassCard';
import styles from './FAQ.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const faqData: FAQItem[] = [
  {
    questionEn: 'What industries do you specialize in?',
    questionAr: 'في أي قطاعات تختص؟',
    answerEn: 'We serve finance, healthcare, technology, government, and critical infrastructure sectors. Our team has deep expertise in compliance requirements specific to each industry including HIPAA, PCI-DSS, NIST, and ISO 27001.',
    answerAr: 'نخدم قطاعات المالية والرعاية الصحية والتكنولوجيا والحكومة والبنية التحتية الحيوية. فريقنا لديه خبرة عميقة في متطلبات الامتثال الخاصة بكل قطاع بما في ذلك HIPAA وPCI-DSS وNIST وISO 27001.',
  },
  {
    questionEn: 'How quickly can you respond to an incident?',
    questionAr: 'ما سرعة استجابتكم للحوادث؟',
    answerEn: 'Our Security Operations Center operates 24/7/365 with an average initial response time of under 15 minutes. For retainer clients, we guarantee a 5-minute response for critical severity incidents.',
    answerAr: 'مركز عمليات الأمن لدينا يعمل على مدار الساعة طوال أيام الأسبوع بمتوسط وقت استجابة أولي أقل من 15 دقيقة. للعملاء المشتركين، نضمن استجابة خلال 5 دقائق للحوادث الحرجة.',
  },
  {
    questionEn: 'Do you offer cloud security assessments?',
    questionAr: 'هل تقدمون تقييمات أمن السحابة؟',
    answerEn: 'Yes. We provide comprehensive cloud security posture management for AWS, Azure, and Google Cloud environments. This includes configuration reviews, identity access assessments, and continuous compliance monitoring.',
    answerAr: 'نعم. نقدم إدارة شاملة للوضع الأمني للسحابة لبيئات AWS وAzure وGoogle Cloud. يتضمن ذلك مراجعات التكوين وتقييمات الوصول إلى الهوية والمراقبة المستمرة للامتثال.',
  },
  {
    questionEn: 'What certifications do your analysts hold?',
    questionAr: 'ما الشهادات التي يحملها محللوكم؟',
    answerEn: 'Our team includes CISSP, CEH, OSCP, GSEC, and GPEN certified professionals. Every engagement is led by senior analysts with 10+ years of hands-on experience in offensive and defensive security.',
    answerAr: 'يتضمن فريقنا محترفين معتمدين بشهادات CISSP وCEH وOSCP وGSEC وGPEN. كل مشروع يقوده محللون كبار لديهم أكثر من 10 سنوات من الخبرة العملية في الأمن الهجومي والدفاعي.',
  },
  {
    questionEn: 'Can you help with compliance and audits?',
    questionAr: 'هل يمكنكم المساعدة في الامتثال والتدقيق؟',
    answerEn: 'Absolutely. We assist with GDPR, ISO 27001, SOC 2, HIPAA, and PCI-DSS compliance. Our audit preparation services include gap analysis, remediation planning, and evidence collection.',
    answerAr: 'بالتأكيد. نساعد في الامتثال لـ GDPR وISO 27001 وSOC 2 وHIPAA وPCI-DSS. تشمل خدمات إعداد التدقيق لدينا تحليل الفجوات وتخطيط الإصلاح وجمع الأدلة.',
  },
  {
    questionEn: 'Is there a minimum contract length?',
    questionAr: 'هل هناك حد أدنى لمدة العقد؟',
    answerEn: 'We offer flexible engagement models. Managed security services start with a 6-month commitment, while project-based work like penetration testing and assessments can be scoped as one-time engagements.',
    answerAr: 'نقدم نماذج مرنة للمشاركة. تبدأ خدمات الأمن المُدارة بالتزام 6 أشهر، بينما يمكن تحديد نطاق العمل المستند إلى المشاريع مثل اختبار الاختراق والتقييمات كمشاريع لمرة واحدة.',
  },
];

interface FAQProps {
  language: string;
}

export default function FAQ({ language }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAr = language === 'ar';

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

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

      const items = section.querySelectorAll(`.${styles.item}`);
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector(`.${styles.list}`), start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.faq} id="faq" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
          <h2 className={styles.title}>
            {isAr ? 'الأسئلة المتكررة' : 'Frequently Asked Questions'}
          </h2>
          <p className={styles.subtitle}>
            {isAr
              ? 'كل ما تحتاج لمعرفته حول خدمات الأمن السيبراني لدينا.'
              : 'Everything you need to know about our cybersecurity services.'}
          </p>
        </div>

        <div className={styles.list}>
          {faqData.map((item, i) => (
            <div key={i} className={styles.item}>
              <GlassCard className={`${styles.card} ${openIndex === i ? styles.open : ''}`}>
                <button
                  className={styles.question}
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  data-hover
                >
                  <span>{isAr ? item.questionAr : item.questionEn}</span>
                  <span className={styles.icon}>
                    {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <div
                  className={styles.answer}
                  style={{
                    maxHeight: openIndex === i ? '300px' : '0px',
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <p>{isAr ? item.answerAr : item.answerEn}</p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
