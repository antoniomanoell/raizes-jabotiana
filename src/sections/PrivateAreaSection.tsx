import { useState, useEffect } from 'react';
import { RevealText } from '../components/RevealText';
import { GoldBadge } from '../components/GoldBadge';
import { GoldLine } from '../components/GoldLine';
import { useIsMobile } from '../hooks/useIsMobile';

const images = ['/images/img_041.jpg', '/images/img_044.jpg'];

export const PrivateAreaSection = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setCurrent(prev => (prev + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
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
        background: isMobile
          ? 'linear-gradient(to top, rgba(10,22,14,0.97) 0%, rgba(10,22,14,0.6) 40%, transparent 70%)'
          : 'linear-gradient(to top, rgba(10,22,14,0.95) 0%, rgba(10,22,14,0.35) 40%, transparent 65%)',
      }} />

      {/* Bottom-left text panel */}
      <div style={{
        position: isMobile ? 'absolute' : 'relative',
        bottom: isMobile ? 0 : undefined,
        left: isMobile ? 0 : undefined,
        right: isMobile ? 0 : undefined,
        zIndex: 2,
        paddingLeft: isMobile ? 28 : 80,
        paddingRight: isMobile ? 28 : undefined,
        paddingBottom: isMobile ? 60 : 80,
        paddingTop: isMobile ? 40 : undefined,
        maxWidth: isMobile ? undefined : 680,
        flex: isMobile ? undefined : 1,
      }}>
        <GoldBadge text="Quintal" />
        <RevealText
          text="O cenário perfeito para celebrar a vida."
          tag="h2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 52, fontWeight: 700,
            color: '#F5F0E8', lineHeight: 1.15,
            marginBottom: 24,
          }}
        />
        <GoldLine />
        <RevealText
          text="Ar puro dentro de casa."
          tag="p"
          delay={0.2}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? 15 : 18, color: '#E8E0D0', lineHeight: 1.7,
          }}
        />
      </div>

      {/* Bottom-right disclaimer */}
      <div style={{
        position: 'absolute', bottom: 20, right: 24,
        zIndex: 2, fontSize: 10,
        color: 'rgba(255,255,255,0.35)',
        fontStyle: 'italic', fontFamily: "'Montserrat', sans-serif",
      }}>
        Imagem meramente ilustrativa apresentando sugestão de reforma.
      </div>
    </section>
  );
};

export default PrivateAreaSection;
