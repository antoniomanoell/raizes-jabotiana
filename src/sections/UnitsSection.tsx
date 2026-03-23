import { useState } from 'react';
import { motion } from 'framer-motion';
import { ParallaxImage } from '../components/ParallaxImage';
import { RevealText } from '../components/RevealText';
import { GoldBadge } from '../components/GoldBadge';
import { GoldLine } from '../components/GoldLine';
import { FloorPlanModal } from '../components/FloorPlanModal';
import { useIsMobile } from '../hooks/useIsMobile';

interface Plan {
  label: string;
  src: string;
}

interface UnitProps {
  id?: string;
  image: string;
  badge: string;
  title: string;
  objectPosition?: string;
  stats: { value: string; label: string }[];
  plans: Plan[];
}

const UnitPanel = ({ id, image, badge, title, objectPosition, stats, plans }: UnitProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <section id={id} style={{
        position: 'relative',
        height: isMobile ? undefined : '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex', alignItems: 'flex-end',
      }}>
        <ParallaxImage src={image} alt={badge} objectPosition={objectPosition} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(10,22,14,0.95) 0%, rgba(10,22,14,0.3) 40%, transparent 65%)',
        }} />

        {/* Bottom-left panel */}
        <div style={{
          position: 'relative', zIndex: 2,
          paddingLeft: isMobile ? 28 : 80,
          paddingRight: isMobile ? 28 : undefined,
          paddingBottom: isMobile ? 80 : 100,
          maxWidth: isMobile ? undefined : 620,
        }}>
          <GoldBadge text={badge} />
          <RevealText
            text={title}
            tag="h2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 32 : 56, fontWeight: 700,
              color: '#C9A84C', lineHeight: 1.1,
              marginBottom: 24,
            }}
          />
          <GoldLine />

          {/* Stats */}
          <div style={{ display: 'flex', gap: isMobile ? 24 : 40, marginTop: 8, marginBottom: 32, flexWrap: 'wrap' }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 18 : 26, color: '#C9A84C',
                  marginBottom: 6,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 11, letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#E8E0D0', fontFamily: "'Montserrat', sans-serif",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Botão Ver Plantas */}
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.6)',
              color: '#C9A84C',
              padding: isMobile ? '10px 20px' : '12px 28px',
              borderRadius: 40,
              fontSize: isMobile ? 12 : 12, fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: 2,
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.2s, border-color 0.2s',
              minHeight: 44,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.1)';
              e.currentTarget.style.borderColor = '#C9A84C';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)';
            }}
          >
            {/* Ícone planta */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
            Ver plantas
          </motion.button>
        </div>
      </section>

      <FloorPlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        unitName={badge}
        plans={plans}
      />
    </>
  );
};

export const UnitsSection = () => (
  <div id="tipologias">
    <UnitPanel
      image="/images/img_028.jpg"
      badge="Casa Essence"
      title="3 Quartos · 2 Suítes"
      stats={[
        { value: '141,63 m²', label: 'Área privativa padrão' },
      ]}
      plans={[
        { label: 'Térreo', src: '/images/planta-essence-terreo.jpg' },
        { label: 'Térreo Ampliado', src: '/images/planta-essence-terreo-ampliada.jpg' },
        { label: 'Superior', src: '/images/planta-essence-superior.jpg' },
      ]}
    />
    <UnitPanel
      image="/images/img_033.jpg"
      badge="Casa Prestige"
      title="4 Quartos · 1 Suíte"
      objectPosition="center bottom"
      stats={[
        { value: '201,95 m²', label: 'Área privativa padrão' },
      ]}
      plans={[
        { label: 'Térreo', src: '/images/planta-prestige-terreo.jpg' },
        { label: 'Térreo Ampliado', src: '/images/planta-prestige-terreo-ampliada.jpg' },
        { label: 'Superior', src: '/images/planta-prestige-superior.jpg' },
      ]}
    />
  </div>
);

export default UnitsSection;
