import { ParallaxImage } from '../components/ParallaxImage';
import { RevealText } from '../components/RevealText';
import { GoldBadge } from '../components/GoldBadge';
import { GoldLine } from '../components/GoldLine';
import { useIsMobile } from '../hooks/useIsMobile';

export const FamilySection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="familia" style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <ParallaxImage src="/images/img_027.jpg" alt="Para sua família" speed={0.15} />

      {/* Subtle overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(10,22,14,0.15)',
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'linear-gradient(to top, rgba(10,22,14,0.97) 0%, rgba(10,22,14,0.6) 40%, transparent 70%)'
          : 'linear-gradient(to top, rgba(10,22,14,0.9) 0%, rgba(10,22,14,0.3) 30%, transparent 60%)',
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
        paddingBottom: isMobile ? 60 : 100,
        paddingTop: isMobile ? 40 : undefined,
        maxWidth: isMobile ? undefined : '55%',
      }}>
        <GoldBadge text="Para sua família" />
        <RevealText
          text="Onde cada detalhe foi pensado para sua família."
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
          text="Raízes Jabotiana é o lugar onde memórias são construídas."
          tag="p"
          delay={0.2}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? 15 : 18, color: '#E8E0D0', lineHeight: 1.7,
          }}
        />
      </div>
    </section>
  );
};

export default FamilySection;
