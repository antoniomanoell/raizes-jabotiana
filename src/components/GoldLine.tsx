import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

export const GoldLine = ({ width = 60, delay = 0 }: { width?: number; delay?: number }) => {
  const { ref, isInView } = useReveal();
  return (
    <div ref={ref} style={{ overflow: 'hidden', marginBottom: 24 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
        style={{ height: 1, backgroundColor: '#C9A84C' }}
      />
    </div>
  );
};
