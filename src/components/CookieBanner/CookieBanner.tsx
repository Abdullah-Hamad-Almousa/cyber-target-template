import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './CookieBanner.module.scss';

interface CookieBannerProps {
  language: string;
}

export default function CookieBanner({ language }: CookieBannerProps) {
  const [consent, setConsent] = useLocalStorage<boolean | null>('cookie-consent', null);
  const [visible, setVisible] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const accept = () => {
    setConsent(true);
    setVisible(false);
  };

  const decline = () => {
    setConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <p>
        {isAr
          ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك.'
          : 'We use cookies to enhance your browsing experience.'}
      </p>
      <div className={styles.actions}>
        <button className={styles.accept} onClick={accept} data-hover>
          {isAr ? 'موافق' : 'Accept'}
        </button>
        <button className={styles.decline} onClick={decline} data-hover>
          {isAr ? 'رفض' : 'Decline'}
        </button>
        <button className={styles.close} onClick={decline} aria-label="Close" data-hover>
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
