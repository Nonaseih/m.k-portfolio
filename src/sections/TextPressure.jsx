import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  if (maxDist <= 0) return minVal;
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const TextPressure = ({
  text        = 'Compressa',
  fontFamily  = 'Compressa VF',
  fontUrl     = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
  width       = true,
  weight      = true,
  italic      = true,
  alpha       = false,
  flex        = true,
  stroke      = false,
  scale       = false,
  textColor   = '#FFFFFF',
  strokeColor = '#FF0000',
  className   = '',
  minFontSize = 48,
}) => {
  const containerRef = useRef(null);
  const titleRef     = useRef(null);
  const spansRef     = useRef([]);
  const mouseRef     = useRef({ x: 0, y: 0 });
  const cursorRef    = useRef({ x: 0, y: 0 });

  const [fontSize,   setFontSize]   = useState(minFontSize);
  const [scaleY,     setScaleY]     = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const hasVariableAxes = width || weight || italic;
  const chars = useMemo(() => text.split(''), [text]);

  // ── Mouse / touch tracking ────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current  = { x: left + w / 2, y: top + h / 2 };
      cursorRef.current = { ...mouseRef.current };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // ── Sizing ────────────────────────────────────────────────────────────────
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } =
      containerRef.current.getBoundingClientRect();

    if (containerW <= 0) return;

    // Drive font size from width only.
    // The /2 divisor gives more breathing room between letters (matches the
    // original intent of the formula but without the height-clamp that was
    // crushing the text when containerH was small or zero on first paint).
    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    // scale mode: stretch vertically to fill a fixed-height container.
    // Only activate when the parent explicitly has a non-zero height AND
    // the scale prop is true — never apply it by default.
    if (scale && containerH > 0) {
      requestAnimationFrame(() => {
        if (!titleRef.current) return;
        const textRect = titleRef.current.getBoundingClientRect();
        if (textRect.height > 0) {
          const yRatio = containerH / textRect.height;
          setScaleY(yRatio);
          setLineHeight(yRatio);
        }
      });
    }
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(debouncedSetSize);
    }

    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    let rafId;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist   = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width  / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          if (hasVariableAxes) {
            const axes = [];
            if (weight) axes.push(`'wght' ${Math.floor(getAttr(d, maxDist, 100, 900))}`);
            if (width)  axes.push(`'wdth' ${Math.floor(getAttr(d, maxDist, 5, 200))}`);
            if (italic) axes.push(`'ital' ${getAttr(d, maxDist, 0, 1).toFixed(2)}`);

            const newFVS = axes.join(', ');
            if (span.style.fontVariationSettings !== newFVS) {
              span.style.fontVariationSettings = newFVS;
            }
          } else if (span.style.fontVariationSettings) {
            span.style.fontVariationSettings = '';
          }

          if (alpha) {
            const alphaVal = getAttr(d, maxDist, 0, 1).toFixed(2);
            if (span.style.opacity !== alphaVal) span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, hasVariableAxes]);

  // ── Styles ────────────────────────────────────────────────────────────────
  const styleElement = useMemo(() => (
    <style>{`
      ${fontUrl ? `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }
      ` : ''}
      .tp-flex   { display: flex; justify-content: space-between; }
      .tp-stroke span { position: relative; color: ${textColor}; }
      .tp-stroke span::after {
        content: attr(data-char);
        position: absolute;
        left: 0; top: 0;
        color: transparent;
        z-index: -1;
        -webkit-text-stroke-width: 3px;
        -webkit-text-stroke-color: ${strokeColor};
      }
      .text-pressure-title { color: ${textColor}; }
    `}</style>
  ), [fontFamily, fontUrl, textColor, strokeColor]);

  const dynamicClassName = [
    className,
    flex   ? 'tp-flex'   : '',
    stroke ? 'tp-stroke' : '',
  ].filter(Boolean).join(' ');

  return (
    // KEY FIX: the wrapper must NOT have height: '100%' by default.
    // When the parent has no explicit height (e.g. height: auto), '100%'
    // resolves to 0 — measurements come back zero, the height clamp fires
    // at 0/0.72 = 0, and the font size gets floored to minFontSize while the
    // text is simultaneously squeezed into nothing.
    // Instead: let the wrapper be height: 'auto' so it expands to fit the h1.
    // Only switch to height: '100%' when scale=true (parent must have a
    // fixed height in that mode anyway).
    <div
      ref={containerRef}
      style={{
        position:   'relative',
        width:      '100%',
        height:     'clamp(180px, 18vw, 320px)',
        background: 'transparent',
        marginBottom: 'clamp(2px, 1vw, 8px)',
      }}
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform:   'uppercase',
          fontSize,
          lineHeight,
          transform:       `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin:          0,
          textAlign:       'center',
          userSelect:      'none',
          whiteSpace:      'nowrap',
          fontWeight:      100,
          width:           '100%',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            style={{
              display: 'inline-block',
              color:   stroke ? undefined : textColor,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;