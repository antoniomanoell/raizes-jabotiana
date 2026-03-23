import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface Plan {
  label: string;
  src: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  unitName: string;
  plans: Plan[];
}

const BTN_STYLE: React.CSSProperties = {
  background: 'rgba(201,168,76,0.08)',
  border: '1px solid rgba(201,168,76,0.2)',
  borderRadius: '50%',
  width: 44, height: 44,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', color: '#C9A84C',
  transition: 'background 0.2s',
  flexShrink: 0,
};

/* ── Lightbox fullscreen com zoom/pan ── */
const Lightbox = ({ src, label, onClose }: { src: string; label: string; onClose: () => void }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const resetZoom = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const changeZoom = (delta: number) => {
    setZoom(z => {
      const next = Math.min(4, Math.max(1, z + delta));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const onMouseUp = () => { isDragging.current = false; };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(3,10,5,0.97)',
        display: 'flex', flexDirection: 'column',
      }}
      onClick={onClose}
    >
      {/* Barra superior */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 24px', flexShrink: 0,
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          background: 'rgba(10,22,14,0.8)',
        }}
      >
        <span style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.7)',
        }}>{label}</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* − */}
          <button style={BTN_STYLE}
            onClick={() => changeZoom(-0.5)}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
            title="Diminuir zoom"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <span style={{
            fontSize: 11, color: '#C9A84C', fontFamily: "'Montserrat', sans-serif",
            letterSpacing: 1, minWidth: 40, textAlign: 'center',
          }}>{Math.round(zoom * 100)}%</span>

          {/* + */}
          <button style={BTN_STYLE}
            onClick={() => changeZoom(0.5)}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
            title="Aumentar zoom"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Reset */}
          {zoom > 1 && (
            <button style={BTN_STYLE}
              onClick={resetZoom}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
              title="Resetar zoom"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          )}

          <div style={{ width: 1, height: 24, background: 'rgba(201,168,76,0.2)', margin: '0 4px' }} />

          {/* Fechar */}
          <button style={BTN_STYLE}
            onClick={onClose}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
            title="Fechar (Esc)"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Área da imagem */}
      <div
        onClick={e => e.stopPropagation()}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{
          flex: 1, overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: zoom > 1 ? 'grab' : 'default',
          userSelect: 'none',
          padding: '24px',
        }}
      >
        <img
          src={src}
          alt={label}
          draggable={false}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: isDragging.current ? 'none' : 'transform 0.2s ease',
            transformOrigin: 'center center',
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── Modal principal (sem zoom interno) ── */
export const FloorPlanModal = ({ isOpen, onClose, unitName, plans }: Props) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => { if (isOpen) setActive(0); }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !lightboxOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, lightboxOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(5,14,8,0.92)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: isMobile ? '16px' : '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0F2318',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 12,
                width: isMobile ? '95vw' : '100%',
                maxWidth: isMobile ? undefined : 1100,
                height: isMobile ? '85vh' : undefined,
                maxHeight: isMobile ? undefined : '94vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
                flexShrink: 0,
              }}>
                <div>
                  <div style={{
                    fontSize: 10, letterSpacing: 4, textTransform: 'uppercase',
                    color: '#C9A84C', fontFamily: "'Montserrat', sans-serif", marginBottom: 3,
                  }}>Plantas Baixas</div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? 16 : 20, color: '#F5F0E8', fontWeight: 500,
                  }}>{unitName}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Botão ampliar em tela cheia */}
                  <button
                    style={BTN_STYLE}
                    onClick={() => setLightboxOpen(true)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                    title="Ampliar em tela cheia"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                    </svg>
                  </button>

                  <div style={{ width: 1, height: 24, background: 'rgba(201,168,76,0.2)', margin: '0 4px' }} />

                  {/* Fechar */}
                  <button
                    onClick={onClose}
                    style={BTN_STYLE}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.18)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                    title="Fechar"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
                flexShrink: 0,
              }}>
                {plans.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      flex: 1,
                      padding: isMobile ? '8px 10px' : '13px 12px',
                      background: 'none', border: 'none',
                      borderBottom: active === i ? '2px solid #C9A84C' : '2px solid transparent',
                      color: active === i ? '#C9A84C' : 'rgba(245,240,232,0.45)',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: isMobile ? 10 : 11, letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'color 0.2s, border-color 0.2s',
                      fontWeight: active === i ? 600 : 400,
                      minHeight: 44,
                    }}
                  >{p.label}</button>
                ))}
              </div>

              {/* Imagem — sem zoom, clique abre lightbox */}
              <div
                onClick={() => setLightboxOpen(true)}
                style={{
                  flex: 1, overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#0A160E',
                  cursor: 'zoom-in',
                  padding: isMobile ? '16px' : '24px',
                  position: 'relative',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={plans[active].src}
                    alt={plans[active].label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    draggable={false}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 4 }}
                  />
                </AnimatePresence>

                {/* Dica de clique */}
                <div style={{
                  position: 'absolute', bottom: 12, right: 14,
                  fontSize: 10, color: 'rgba(201,168,76,0.45)',
                  fontFamily: "'Montserrat', sans-serif", letterSpacing: 1,
                  pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                  {isMobile ? 'toque para ampliar' : 'clique para ampliar'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox fullscreen */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            src={plans[active].src}
            label={plans[active].label}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
