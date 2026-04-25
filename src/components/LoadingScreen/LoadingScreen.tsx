import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
  isLoading: boolean;
  language?: string;
}

export default function LoadingScreen({ isLoading, language = 'en' }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.spinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <div className={styles.spinnerInner} />
          </motion.div>
          <motion.div
            className={styles.logo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {language === 'ar' ? 'سيبر تارجت' : 'Cyber Target'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
