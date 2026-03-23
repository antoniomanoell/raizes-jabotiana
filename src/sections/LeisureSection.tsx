import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealText } from '../components/RevealText';
import { GoldBadge } from '../components/GoldBadge';
import { useIsMobile } from '../hooks/useIsMobile';

const images = ['/images/img_009.jpg', '/images/img_010.jpg'];

const pillTags = [
  'Piscina adulto e infantil',
  'Salão de festas',
  'Academia equipada',
  'Quadra poliesportiva',
  'Playground infantil',
  'Espaço pet',
];

export const LeisureSection = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setCurrent(prev => (prev + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="lazer" style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end',
    }}>
      {/* Crossfading images */}
      {images.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.4s ease',
          }}
        />
      ))}

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(10,22,14,0.95) 0%, rgba(10,22,14,0.4) 45%, transparent 70%)',
      }} />

      {/* Bottom-left text panel */}
      <div style={{
        position: 'relative', zIndex: 2,
        paddingLeft: isMobile ? 28 : 80,
        paddingRight: isMobile ? 28 : undefined,
        paddingBottom: isMobile ? 80 : 80,
        maxWidth: isMobile ? undefined : 700,
      }}>
        <GoldBadge text="Área de Lazer" />
        <RevealText
          text="Clube completo dentro do seu lar."
          tag="h2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 30 : 52, fontWeight: 700,
            color: '#F5F0E8', lineHeight: 1.1,
            marginBottom: 28,
          }}
        />
        {/* Pill tags with staggered animation */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {pillTags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                border: '1px solid rgba(201,168,76,0.4)',
                borderRadius: 9999,
                padding: isMobile ? '5px 12px' : '6px 16px',
                fontSize: isMobile ? 11 : 13,
                color: '#E8E0D0',
                fontFamily: "'Montserrat', sans-serif",
                background: 'rgba(10,22,14,0.4)',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeisureSection;
