import React from 'react';
import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';

interface Props {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
}

export const RevealText = ({ text, tag = 'p', className, delay = 0, stagger = 0.04, style }: Props) => {
  const { ref, isInView } = useReveal();
  const words = text.split(' ');
  const Tag = tag as React.ElementType;

  return (
    <Tag className={className} style={{ overflow: 'hidden', ...style }} ref={ref as React.Ref<HTMLElement>}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
