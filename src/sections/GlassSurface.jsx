/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useId } from 'react';

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId  = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);

  const containerRef   = useRef(null);
  const feImageRef     = useRef(null);
  const redChannelRef  = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const generateDisplacementMap = () => {
    const rect       = containerRef.current?.getBoundingClientRect();
    const actualWidth  = rect?.width  || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize   = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

  useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef,   offset: redOffset   },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef,  offset: blueOffset  }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });
    gaussianBlurRef.current?.setAttribute('stdDeviation', displace.toString());
  }, [
    width, height, borderRadius, borderWidth, brightness, opacity,
    blur, displace, distortionScale, redOffset, greenOffset, blueOffset,
    xChannel, yChannel, mixBlendMode
  ]);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(() => setTimeout(updateDisplacementMap, 0));
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);

  useEffect(() => {
    setSvgSupported(supportsSVGFilters());
  }, []);

  const supportsSVGFilters = () => {
    if (typeof window === 'undefined') return false;
    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) return false;
    if (/Firefox/.test(navigator.userAgent)) return false;
    const div = document.createElement('div');
    div.style.backdropFilter = `url(#${filterId})`;
    return div.style.backdropFilter !== '';
  };

  const containerStyle = {
    ...style,
    width:        typeof width  === 'number' ? `${width}px`  : width,
    height:       typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost':      backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id':        `url(#${filterId})`,
    position:   'relative',
    display:    'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transition: 'opacity 0.26s ease-out',
    ...(svgSupported ? {
      background:     'hsl(0 0% 100% / 0.04)',
      backdropFilter: `url(#${filterId}) saturate(${saturation})`,
      boxShadow: `
        0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
        0 0 10px 4px color-mix(in oklch, white, transparent 88%) inset,
        0px 4px 16px rgba(17,17,26,0.05),
        0px 8px 24px rgba(17,17,26,0.05),
        0px 16px 56px rgba(17,17,26,0.05)
      `,
    } : {
      background:           'rgba(255,255,255,0.08)',
      backdropFilter:       'blur(12px) saturate(1.8) brightness(1.1)',
      WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
      border:     '1px solid rgba(255,255,255,0.15)',
      boxShadow:  '0 8px 32px rgba(31,38,135,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
    }),
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <svg
        aria-hidden="true"
        style={{ width: '100%', height: '100%', pointerEvents: 'none', position: 'absolute', inset: 0, opacity: 0, zIndex: -1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />

            <feDisplacementMap ref={greenChannelRef} in="SourceGraphic" in2="map" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />

            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg"  in2="blue"  mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: 'inherit', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
