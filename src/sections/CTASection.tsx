import { motion } from 'framer-motion';
import { useReveal } from '../hooks/useReveal';
import { useIsMobile } from '../hooks/useIsMobile';

export const CTASection = () => {
  const { ref, isInView } = useReveal(0.3);
  const isMobile = useIsMobile();

  return (
    <section id="contato" style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background */}
      <img
        src="/images/fundo_final.png"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(10,22,14,0.5) 0%, rgba(10,22,14,0.35) 50%, rgba(10,22,14,0.65) 100%)',
      }} />

      {/* Conteúdo */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        padding: '0 40px',
        gap: 0,
        width: '100%',
      }}>

        {/* Logo Raízes */}
        <motion.img
          src="/images/LogoRaizes.png"
          alt="Raízes Jabotiana"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: isMobile ? 'min(240px, 70vw)' : 'min(320px, 55vw)',
            objectFit: 'contain',
            marginBottom: isMobile ? 20 : 32,
          }}
        />

        {/* Linha gold */}
        <div ref={ref} style={{ overflow: 'hidden', marginBottom: isMobile ? 18 : 28 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 120 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            style={{ height: 1, backgroundColor: '#C9A84C', margin: '0 auto' }}
          />
        </div>

        {/* Chamada */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 'clamp(18px, 5vw, 22px)' : 'clamp(22px, 2.5vw, 32px)',
            color: '#F5F0E8',
            fontWeight: 400,
            marginBottom: isMobile ? 20 : 32,
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          O seu lugar no meio da natureza<br />
          <span style={{ color: '#C9A84C' }}>está esperando por você.</span>
        </motion.p>

        {/* Botão WhatsApp */}
        <motion.a
          href="https://wa.me/5579988234054"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: '#25D366', color: '#fff',
            padding: isMobile ? '14px 28px' : '18px 52px',
            borderRadius: 40,
            fontSize: isMobile ? 14 : 16, fontWeight: 600,
            fontFamily: "'Montserrat', sans-serif",
            textDecoration: 'none',
            boxShadow: '0 8px 28px rgba(37,211,102,0.3)',
            marginBottom: isMobile ? 20 : 36,
            letterSpacing: 0.5,
            minHeight: 44,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Fale com um Especialista
        </motion.a>

        {/* Separador */}
        <div style={{
          width: 1,
          height: isMobile ? 28 : 40,
          background: 'rgba(201,168,76,0.3)',
          marginBottom: isMobile ? 18 : 28,
        }} />

        {/* Logo Impacto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
        >
          <img
            src="/images/impacto_logo.png"
            alt="Impacto Construções"
            style={{
              height: isMobile ? 36 : 50,
              objectFit: 'contain', opacity: 0.85,
            }}
          />

          {/* Links: site + Instagram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://construtoraimpacto.com.br"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11, letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#C9A84C',
                fontFamily: "'Montserrat', sans-serif",
                opacity: 0.7,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              construtoraimpacto.com.br
            </a>

            {/* Separador vertical */}
            <div style={{ width: 1, height: 14, background: 'rgba(201,168,76,0.35)' }} />

            {/* Instagram */}
            <a
              href="https://instagram.com/construtoraimpacto"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              style={{
                color: '#C9A84C', opacity: 0.7,
                display: 'flex', alignItems: 'center',
                transition: 'opacity 0.2s',
                minWidth: 44, minHeight: 44,
                justifyContent: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
