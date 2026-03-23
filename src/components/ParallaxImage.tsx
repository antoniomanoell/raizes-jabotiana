import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  src: string;
  alt?: string;
  speed?: number;
  objectPosition?: string;
  style?: React.CSSProperties;
}

export const ParallaxImage = ({ src, alt = '', objectPosition = 'center center', style }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition, y }}
      />
    </div>
  );
};
