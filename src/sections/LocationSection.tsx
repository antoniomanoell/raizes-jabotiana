import { ParallaxImage } from '../components/ParallaxImage';
import { RevealText } from '../components/RevealText';
import { GoldBadge } from '../components/GoldBadge';
import { GoldLine } from '../components/GoldLine';
import { useIsMobile } from '../hooks/useIsMobile';

export const LocationSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="localizacao" style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: isMobile ? 'flex-end' : 'center',
    }}>
      <ParallaxImage
        src="/images/img_002.jpg"
        alt="Jabotiana, Aracaju"
        objectPosition={isMobile ? '70% center' : 'center center'}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: isMobile
          ? 'linear-gradient(to top, rgba(10,22,14,0.97) 0%, rgba(10,22,14,0.6) 40%, transparent 70%)'
          : 'linear-gradient(to right, rgba(10,22,14,0.92) 0%, rgba(10,22,14,0.6) 45%, transparent 75%)',
      }} />

      {/* Text panel */}
      <div style={{
        position: isMobile ? 'absolute' : 'relative',
        bottom: isMobile ? 0 : undefined,
        left: isMobile ? 0 : undefined,
        right: isMobile ? 0 : undefined,
        zIndex: 2,
        width: isMobile ? undefined : '45%',
        paddingLeft: isMobile ? 28 : 80,
        paddingRight: isMobile ? 28 : undefined,
        paddingBottom: isMobile ? 60 : undefined,
        paddingTop: isMobile ? 40 : undefined,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <GoldBadge text="Localização" />
        <RevealText
          text="Jabotiana,"
          tag="h2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 58, fontWeight: 700,
            color: '#F5F0E8', lineHeight: 1.1,
          }}
        />
        <RevealText
          text="Aracaju – SE"
          tag="h2"
          delay={0.15}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 58, fontWeight: 700,
            color: '#F5F0E8', lineHeight: 1.1,
            marginBottom: 24,
          }}
        />
        <GoldLine width={60} delay={0.3} />
        <RevealText
          text="Um bairro que respira natureza, rodeado por mata preservada e qualidade de vida incomparável."
          tag="p"
          delay={0.4}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: isMobile ? 15 : 18, fontWeight: 300,
            color: '#E8E0D0', lineHeight: 1.7,
            maxWidth: 400,
          }}
        />
      </div>
    </section>
  );
};

export default LocationSection;
