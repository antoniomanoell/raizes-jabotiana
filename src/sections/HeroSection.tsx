import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

export const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0A160E' }}>

      {/* Vídeo — fade-in suave quando pronto */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setVideoReady(true)}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      >
        <source src="https://pub-aec9354e5d204c648104cdc2bbd33f7a.r2.dev/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay escuro suave */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'rgba(10,22,14,0.25)',
      }} />

      {/* Logo Raízes + tagline — aparecem junto com o vídeo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: videoReady ? 1 : 0, y: videoReady ? 0 : 24 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 32,
        }}
      >
        <img
          src="/images/LogoRaizes.png"
          alt="Raízes Jabotiana"
          style={{
            width: isMobile ? 'min(280px, 80vw)' : 'min(420px, 55vw)',
            objectFit: 'contain',
          }}
        />
        <img
          src="/images/Texto1.png"
          alt="Único como a sua natureza"
          style={{
            width: isMobile ? 'min(340px, 85vw)' : 'min(520px, 65vw)',
            objectFit: 'contain', opacity: 0.92,
          }}
        />
      </motion.div>

      {/* Scroll indicator — aparece junto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 1.4, delay: 0.8 }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{
          fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.6)', fontFamily: "'Montserrat', sans-serif",
        }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1L8 9L15 1" stroke="rgba(201,168,76,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
