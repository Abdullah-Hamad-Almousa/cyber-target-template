import { ShieldCheck, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import styles from './Footer.module.scss';

interface FooterProps {
  language: string;
}

export default function Footer({ language }: FooterProps) {
  const isAr = language === 'ar';

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo} aria-label="Cyber Target Home">
              <ShieldCheck size={28} className={styles.logoIcon} />
              <span>Cyber Target</span>
            </a>
            <p>
              {isAr
                ? 'حماية المؤسسات في جميع أنحاء العالم بحلول الأمن السيبراني المتقدمة والاستجابة الخبيرة للحوادث.'
                : 'Protecting organizations worldwide with advanced cybersecurity solutions and expert incident response.'}
            </p>
          </div>

          <div className={styles.links}>
            <h4>{isAr ? 'الشركة' : 'Company'}</h4>
            <ul>
              <li><a href="#services" data-hover>{isAr ? 'الخدمات' : 'Services'}</a></li>
              <li><a href="#why-us" data-hover>{isAr ? 'من نحن' : 'About'}</a></li>
              <li><a href="#" data-hover>{isAr ? 'الوظائف' : 'Careers'}</a></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>{isAr ? 'الموارد' : 'Resources'}</h4>
            <ul>
              <li><a href="#" data-hover>{isAr ? 'المدونة' : 'Blog'}</a></li>
              <li><a href="#" data-hover>{isAr ? 'دراسات الحالة' : 'Case Studies'}</a></li>
              <li><a href="#" data-hover>{isAr ? 'التوثيق' : 'Documentation'}</a></li>
            </ul>
          </div>

          <div className={`${styles.links} ${styles.contact}`}>
            <h4>{isAr ? 'اتصل بنا' : 'Contact'}</h4>
            <ul>
              <li>
                <a href="mailto:contact@cybertarget.example" className={styles.contactLink}>
                  <Mail size={16} />
                  <span dir="ltr">contact@cybertarget.example</span>
                </a>
              </li>
              <li>
                <Phone size={16} />
                <span dir="ltr">+1 (555) 000-0000</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>{isAr ? 'نيويورك، الولايات المتحدة' : 'New York, NY'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{isAr ? 'Cyber Target. جميع الحقوق محفوظة.' : 'Cyber Target. All rights reserved.'}</p>
          <div className={styles.social}>
            <a href="#" aria-label="LinkedIn" data-hover><Linkedin size={18} /></a>
            <a href="#" aria-label="Twitter" data-hover><Twitter size={18} /></a>
            <a href="#" aria-label="GitHub" data-hover><Github size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
