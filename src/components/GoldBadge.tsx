import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

export const GoldBadge = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const { ref, isInView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
    >
      <div style={{ width: 32, height: 1, backgroundColor: '#C9A84C' }} />
      <span style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#D4B96A', fontFamily: "'Montserrat', sans-serif" }}>
        {text}
      </span>
      <div style={{ width: 32, height: 1, backgroundColor: '#C9A84C' }} />
    </motion.div>
  );
};
