import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { ParallaxImage } from '../components/ParallaxImage';
import { RevealText } from '../components/RevealText';
import { GoldBadge } from '../components/GoldBadge';
import { useIsMobile } from '../hooks/useIsMobile';

interface StatItem {
  display: string;
  numericEnd?: number;
  label: string;
}

const stats: StatItem[] = [
  { display: '164', numericEnd: 164, label: 'Unidades' },
  { display: '46.707 m²', label: 'Área Total' },
  { display: '3 ou 4', label: 'Quartos' },
  { display: '2', label: 'Vagas' },
];

function AnimatedCounter({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export const AerialSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="implantacao" style={{
      position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
    }}>
      <ParallaxImage src="/images/img_021.jpg" alt="Vista aérea" />

      {/* Subtle overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(10,22,14,0.2)',
      }} />
      {/* Top gradient */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(10,22,14,0.85) 0%, transparent 100%)',
      }} />
      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
        zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(10,22,14,0.85) 0%, transparent 100%)',
      }} />

      {/* Top-center title */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', paddingTop: isMobile ? 60 : 80,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingLeft: 20, paddingRight: 20,
      }}>
        <GoldBadge text="Implantação Geral" />
        <RevealText
          text="164 casas em harmonia com a natureza ao redor."
          tag="h2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 26 : 48, lineHeight: 1.25,
            color: '#F5F0E8', maxWidth: 680,
            textAlign: 'center',
          }}
        />
      </div>

      {/* Bottom stats row */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        width: '100%', maxWidth: 900,
        paddingBottom: isMobile ? 40 : 60,
        paddingLeft: isMobile ? 20 : 40,
        paddingRight: isMobile ? 20 : 40,
        gap: isMobile ? 0 : undefined,
      }}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: isMobile ? undefined : 1,
              width: isMobile ? '50%' : undefined,
              textAlign: 'center',
              borderLeft: isMobile
                ? (i % 2 !== 0 ? '1px solid rgba(201,168,76,0.25)' : 'none')
                : (i > 0 ? '1px solid rgba(201,168,76,0.25)' : 'none'),
              borderTop: isMobile && i >= 2 ? '1px solid rgba(201,168,76,0.25)' : 'none',
              padding: isMobile ? '14px 10px' : '20px 16px',
            }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 30 : 42, fontWeight: 600,
              color: '#C9A84C', lineHeight: 1,
              marginBottom: 8,
            }}>
              {stat.numericEnd !== undefined
                ? <AnimatedCounter end={stat.numericEnd} />
                : stat.display}
            </div>
            <div style={{
              width: 30, height: 1,
              backgroundColor: '#C9A84C',
              margin: '8px auto',
            }} />
            <div style={{
              fontSize: 11, letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#E8E0D0', fontFamily: "'Montserrat', sans-serif",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AerialSection;
