import { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Sun, Moon, Shield, Menu, X } from 'lucide-react';
import type { Theme, Language } from '@/types';
import styles from './Navigation.module.scss';

interface NavigationProps {
  theme: Theme;
  language: Language;
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
}

const themeIcons: Record<Theme, React.ReactNode> = {
  light: <Sun size={18} />,
  dark: <Moon size={18} />,
  company: <Shield size={18} />,
};

export default function Navigation({
  theme,
  language,
  onThemeToggle,
  onLanguageToggle,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 50);
    if (currentY > lastScrollY && currentY > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinks = [
    { href: '#services', labelEn: 'Services', labelAr: 'الخدمات' },
    { href: '#why-us', labelEn: 'Why Us', labelAr: 'لماذا نحن' },
    { href: '#stats', labelEn: 'Impact', labelAr: 'التأثير' },
    { href: 'mailto:info@cybertarget.tech', labelEn: 'Contact', labelAr: 'اتصل بنا' },
  ];

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}
        role="navigation"
        aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
      >
        <div className={`container ${styles.inner}`}>
          <a href="#" className={styles.logo} aria-label={language === 'ar' ? 'الرئيسية - سيبر تارجت' : 'Cyber Target Home'}>
            <ShieldCheck size={28} className={styles.logoIcon} />
            <span>Cyber Target</span>
          </a>

          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} data-hover>
                  {language === 'ar' ? link.labelAr : link.labelEn}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.controls}>
            <button
              className={styles.iconBtn}
              onClick={onThemeToggle}
              aria-label={language === 'ar' ? 'تبديل الوضع' : 'Toggle theme'}
              title={language === 'ar' ? 'تبديل الوضع' : 'Toggle theme'}
              data-hover
            >
              {themeIcons[theme]}
            </button>
            <button
              className={styles.iconBtn}
              onClick={onLanguageToggle}
              aria-label={language === 'ar' ? 'تبديل اللغة' : 'Toggle language'}
              title={language === 'ar' ? 'تبديل اللغة' : 'Toggle language'}
              data-hover
            >
              <span className={styles.langLabel}>{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>
            <a href="mailto:info@cybertarget.tech" className={styles.cta} data-hover>
              <span>{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</span>
            </a>
            <button
              className={`${styles.iconBtn} ${styles.menuToggle}`}
              onClick={toggleMenu}
              aria-label={language === 'ar' ? 'تبديل القائمة' : 'Toggle menu'}
              aria-expanded={menuOpen}
              data-hover
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ''}`} onClick={() => setMenuOpen(false)} />

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)} className={styles.mobileLink}>
                {language === 'ar' ? link.labelAr : link.labelEn}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
