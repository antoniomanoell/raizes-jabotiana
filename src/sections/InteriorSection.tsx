import { motion } from 'framer-motion';
import { ParallaxImage } from '../components/ParallaxImage';
import { RevealText } from '../components/RevealText';
import { useReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

export const InteriorSection = () => {
  const { ref, isInView } = useReveal(0.3);
  const isMobile = useIsMobile();

  return (
    <section style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
    }}>
      <ParallaxImage src="/images/img_038.jpg" alt="Acabamentos" />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'linear-gradient(to top, rgba(10,22,14,0.97) 0%, rgba(10,22,14,0.6) 40%, transparent 70%)'
          : 'linear-gradient(to right, rgba(10,22,14,0.95) 0%, rgba(10,22,14,0.5) 35%, transparent 60%)',
      }} />

      {/* Vertical gold line — desktop only */}
      {!isMobile && (
        <div
          ref={ref}
          style={{
            position: 'absolute', left: 72,
            top: '15%', bottom: '15%',
            width: 1, zIndex: 2, overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              height: '100%', width: '100%',
              backgroundColor: '#C9A84C',
              transformOrigin: 'top',
            }}
          />
        </div>
      )}

      {/* Text panel */}
      <div style={{
        position: isMobile ? 'absolute' : 'relative',
        bottom: isMobile ? 0 : undefined,
        left: isMobile ? 0 : undefined,
        right: isMobile ? 0 : undefined,
        zIndex: 2,
        paddingLeft: isMobile ? 28 : 100,
        paddingRight: isMobile ? 28 : undefined,
        paddingBottom: isMobile ? 60 : undefined,
        paddingTop: isMobile ? 40 : undefined,
        maxWidth: isMobile ? undefined : '45%',
      }}>
        <RevealText
          text="Interiores que respiram sofisticação."
          tag="h2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 52, lineHeight: 1.2,
            color: '#F5F0E8',
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
        Imagem meramente ilustrativa.
      </div>
    </section>
  );
};

export default InteriorSection;
