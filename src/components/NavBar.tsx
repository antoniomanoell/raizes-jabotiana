import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const links = [
  { label: 'Conceito', href: '#conceito' },
  { label: 'Localização', href: '#localizacao' },
  { label: 'Lazer', href: '#lazer' },
  { label: 'Tipologias', href: '#tipologias' },
  { label: 'Contato', href: '#contato' },
];

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '0 24px' : '0 60px', height: 72,
          backgroundColor: scrolled ? 'rgba(10,22,14,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease',
        }}
      >
        <img
          src="/images/impacto_logo.png"
          alt="Impacto Construções"
          style={{ height: isMobile ? 28 : 40, objectFit: 'contain' }}
        />

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 40 }}>
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                style={{
                  fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                  color: '#E8E0D0', textDecoration: 'none', fontFamily: "'Montserrat', sans-serif",
                  opacity: 0.8, transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile hamburger button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              minWidth: 44, minHeight: 44,
            }}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                <line x1="0" y1="2" x2="24" y2="2" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="10" x2="24" y2="10" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="18" x2="24" y2="18" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        )}
      </motion.nav>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              background: 'rgba(8,18,11,0.97)',
              backdropFilter: 'blur(16px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 40,
            }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                onClick={(e) => handleClick(e, link.href)}
                style={{
                  fontSize: 20, letterSpacing: 4, textTransform: 'uppercase',
                  color: '#E8E0D0', textDecoration: 'none',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
