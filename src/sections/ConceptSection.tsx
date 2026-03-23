import { ParallaxImage } from '../components/ParallaxImage';
import { RevealText } from '../components/RevealText';
import { useIsMobile } from '../hooks/useIsMobile';

export const ConceptSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="conceito" style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <ParallaxImage src="/images/img_005.jpg" alt="Conceito" objectPosition={isMobile ? '20% center' : 'center center'} />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(10,22,14,0.6)',
      }} />

      {/* Glassmorphism card */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(15,35,24,0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 4,
        padding: isMobile ? '36px 28px' : '60px 80px',
        maxWidth: 760,
        width: '90%',
        margin: isMobile ? '0 20px' : undefined,
        textAlign: 'center',
      }}>

        <RevealText
          text="Viver bem é se reconectar com o que realmente importa."
          tag="h2"
          delay={0.1}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 24 : 36,
            lineHeight: 1.4,
            color: '#F5F0E8',
            marginBottom: 16,
          }}
        />
        <RevealText
          text="Natureza, família e lar."
          tag="p"
          delay={0.4}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 24 : 36,
            lineHeight: 1.4,
            color: '#C9A84C',
          }}
        />
      </div>
    </section>
  );
};

export default ConceptSection;
