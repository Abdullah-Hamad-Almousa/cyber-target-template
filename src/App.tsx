import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import Stats from '@/components/Stats/Stats';
import WhyUs from '@/components/WhyUs/WhyUs';
import FAQ from '@/components/FAQ/FAQ';
import ContactForm from '@/components/ContactForm/ContactForm';
import CTA from '@/components/CTA/CTA';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import BackToTop from '@/components/BackToTop/BackToTop';

function App() {
  const [theme, cycleTheme] = useTheme();
  const [language, toggleLanguage] = useLanguage();
  const [loading, setLoading] = useState(true);

  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={loading} language={language} />
      <CustomCursor />
      <ScrollProgress />
      <Navigation
        theme={theme}
        language={language}
        onThemeToggle={cycleTheme}
        onLanguageToggle={toggleLanguage}
      />
      <main>
        <Hero language={language} />
        <Services language={language} />
        <Stats language={language} />
        <WhyUs language={language} />
        <FAQ language={language} />
        <ContactForm language={language} />
        <CTA language={language} />
      </main>
      <Footer language={language} />
      <CookieBanner language={language} />
      <BackToTop />
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}

export default App;
