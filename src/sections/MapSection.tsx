import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReveal } from '../hooks/useReveal';

import 'leaflet/dist/leaflet.css';

const EMPREENDIMENTO = { lat: -10.93812913352161, lng: -37.09400819940538 };

const GMAPS_URL = `https://www.google.com/maps/search/?api=1&query=${EMPREENDIMENTO.lat},${EMPREENDIMENTO.lng}`;

const POIS = [
  { label: 'Porto Arboreto', distance: '700 m', lat: -10.944292657323668, lng: -37.09231847804838, icon: '🏡', customImg: '/images/impacto-selo.png' },
  { label: 'Villa Asturias', distance: '800 m', lat: -10.945086388368814, lng: -37.09165100981246, icon: '🏡', customImg: '/images/impacto-selo.png' },
  { label: 'Regina Deli', distance: '900 m', lat: -10.944338148873857, lng: -37.089347340709026, icon: '🥖' },
  { label: 'Ferreira Costa', distance: '2,2 km', lat: -10.945926679798164, lng: -37.075372914356635, icon: '🪑' },
  { label: 'Supermercado', distance: '1,2 km', lat: -10.93855134001783, lng: -37.08251054472708, icon: '🛒' },
  { label: 'Detran', distance: '1,8 km', lat: -10.941368502298292, lng: -37.078337428615704, icon: '🚗' },
  { label: 'Teatro Tobias Barreto', distance: '2,5 km', lat: -10.948476034893945, lng: -37.07309693707216, icon: '🎭' },
  { label: 'UFS', distance: '2,1 km', lat: -10.925988427629365, lng: -37.1031660998295, icon: '🎓' },
  { label: 'Shopping Jardins', distance: '3,8 km', lat: -10.943028008236716, lng: -37.05996706557233, icon: '🛍️' },
  { label: 'Parque da Sementeira', distance: '4,2 km', lat: -10.944670881876853, lng: -37.05613994723328, icon: '🌳' },
];

export const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { ref: sectionRef, isInView } = useReveal(0.1);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!isInView || mapInstanceRef.current) return;

    import('leaflet').then((leaflet) => {
      const L = leaflet.default;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current || mapInstanceRef.current) return;

      const map = L.map(mapRef.current, {
        center: [EMPREENDIMENTO.lat, EMPREENDIMENTO.lng],
        zoom: isMobile ? 14 : 15,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: !isMobile,
      });

      mapInstanceRef.current = map;

      // CartoDB Voyager — limpo, moderno, não escuro demais
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }
      ).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Marker principal — Raízes Jabotiana (ouro pulsante)
      const mainIcon = L.divIcon({
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div class="main-pin"></div>
          </div>
        `,
        className: '',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      L.marker([EMPREENDIMENTO.lat, EMPREENDIMENTO.lng], { icon: mainIcon })
        .addTo(map)
        .bindTooltip(
          `<div style="background:#0F2318;border:1px solid #C9A84C;color:#F5F0E8;padding:8px 14px;border-radius:6px;font-family:'Montserrat',sans-serif;font-size:11px;letter-spacing:1.5px;white-space:nowrap;font-weight:600;">
            ✦ RAÍZES JABOTIANA
          </div>`,
          { permanent: true, direction: 'top', offset: [0, -16], className: 'custom-tooltip' }
        );

      // Markers dos POIs
      POIS.forEach((poi: any) => {
        const innerContent = poi.customImg
          ? `<img src="${poi.customImg}" style="width:22px;height:22px;object-fit:contain;transform:rotate(45deg);" />`
          : `<span style="transform: rotate(45deg); font-size: 14px; line-height: 1;">${poi.icon}</span>`;

        const poiIcon = L.divIcon({
          html: `
            <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45));
            ">
              <div style="
                background: #0F2318;
                border: 2.5px solid #C9A84C;
                border-radius: 50% 50% 50% 0;
                width: 32px; height: 32px;
                transform: rotate(-45deg);
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.35);
              ">
                ${innerContent}
              </div>
              <div style="
                width: 4px; height: 4px; border-radius: 50%;
                background: rgba(15,35,24,0.4);
                margin-top: 1px;
              "></div>
            </div>
          `,
          className: '',
          iconSize: [32, 40],
          iconAnchor: [16, 40],
        });

        L.marker([poi.lat, poi.lng], { icon: poiIcon })
          .addTo(map)
          .bindTooltip(
            `<div style="background:#0F2318;border:1px solid rgba(201,168,76,0.5);color:#F5F0E8;padding:8px 14px;border-radius:8px;font-family:'Montserrat',sans-serif;font-size:11px;white-space:nowrap;line-height:1.6;box-shadow:0 4px 16px rgba(0,0,0,0.3);">
              <strong style="font-size:12px;">${poi.label}</strong>
              <span style="display:block;color:#C9A84C;font-size:10px;margin-top:3px;">📍 ${poi.distance} do empreendimento</span>
            </div>`,
            { direction: 'top', offset: [0, -44], className: 'custom-tooltip' }
          );
      });

    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef as any}
      style={{ position: 'relative', background: '#0A160E', isolation: 'isolate' }}
    >
      {/* Mapa — ocupa toda a seção */}
      <div style={{ position: 'relative' }}>
        <div
          ref={mapRef}
          style={{ width: '100%', height: isMobile ? '100svh' : '100vh' }}
        />

        {/* Título sobreposto no topo do mapa */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(10,22,14,0.78) 0%, rgba(10,22,14,0.35) 50%, transparent 100%)',
            padding: isMobile ? '32px 24px 60px' : '40px 0 80px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}
        >
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 24 : 36,
            fontWeight: 700,
            color: '#F5F0E8',
            lineHeight: 1.2,
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.6)',
            margin: 0,
          }}>
            Tudo que você precisa,
          </h2>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 24 : 36,
            fontWeight: 700,
            color: '#C9A84C',
            lineHeight: 1.2,
            textAlign: 'center',
            textShadow: '0 2px 16px rgba(0,0,0,0.6)',
            margin: 0,
          }}>
            pertinho de você.
          </h2>
        </motion.div>

        {/* Botões na base do mapa */}
        <div style={{
          position: 'absolute', bottom: 28, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 12, zIndex: 1000, pointerEvents: 'none',
        }}>
          {/* Recentralizar */}
          <motion.button
            onClick={() => mapInstanceRef.current?.setView(
              [EMPREENDIMENTO.lat, EMPREENDIMENTO.lng],
              isMobile ? 14 : 15,
              { animate: true }
            )}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            title="Voltar ao Raízes Jabotiana"
            style={{
              pointerEvents: 'auto',
              background: 'rgba(10,22,14,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,168,76,0.45)',
              borderRadius: '50%',
              width: 42, height: 42,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" strokeWidth="1.5" />
            </svg>
          </motion.button>

          {/* Google Maps */}
          <motion.a
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(10,22,14,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,168,76,0.45)',
              borderRadius: 40,
              padding: '12px 28px',
              color: '#F5F0E8',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              letterSpacing: 2.5,
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              whiteSpace: 'nowrap' as const,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Abrir no Google Maps
          </motion.a>
        </div>
      </div>

      <style>{`
        .main-pin {
          width: 22px; height: 22px; border-radius: 50%;
          background: #C9A84C;
          border: 3px solid #fff;
          box-shadow: 0 0 0 4px rgba(201,168,76,0.3);
          animation: raizes-pulse 2s ease-in-out infinite;
        }
        @keyframes raizes-pulse {
          0%   { box-shadow: 0 0 0 4px rgba(201,168,76,0.3); }
          50%  { box-shadow: 0 0 0 10px rgba(201,168,76,0.08); }
          100% { box-shadow: 0 0 0 4px rgba(201,168,76,0.3); }
        }
        .custom-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-tooltip::before { display: none !important; }
        .leaflet-control-zoom a {
          background: #0F2318 !important;
          color: #C9A84C !important;
          border-color: rgba(201,168,76,0.25) !important;
        }
        .leaflet-control-zoom a:hover { background: rgba(201,168,76,0.12) !important; }
        .leaflet-control-attribution {
          background: rgba(10,22,14,0.65) !important;
          color: rgba(245,240,232,0.3) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: rgba(201,168,76,0.4) !important; }
      `}</style>
    </section>
  );
};

export default MapSection;
