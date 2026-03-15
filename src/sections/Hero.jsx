import React from 'react';
import Hyperspeed from './Hyperspeed';
import TextPressure from './TextPressure';
import TargetCursor from './TargetCursor';

// ─────────────────────────────────────────────────────────────────────────────
// Hyperspeed config — red/white/dark tones to match the portfolio palette
// Memoized as a constant so WebGL scene never recreates on re-render
// ─────────────────────────────────────────────────────────────────────────────
const HYPERSPEED_OPTIONS = {
  distortion: 'mountainDistortion',
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 50,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.05, 400 * 0.15],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.2, 0.2],
  carFloorSeparation: [0.05, 1],
  colors: {
    roadColor:     0x080808,
    islandColor:   0x0a0a0a,
    background:    0x000000,
    shoulderLines: 0x131318,
    brokenLines:   0x131318,
    leftCars:  [0xff102a, 0xeb383e, 0xff102a],
    rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
    sticks:    0xdadafa
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section id="hero" style={styles.section}>

      {/* ── Hyperspeed background (full bleed, behind everything) ── */}
      <div style={styles.bgLayer}>
        <Hyperspeed effectOptions={HYPERSPEED_OPTIONS} />
      </div>

      {/* ── Bottom vignette ── */}
      <div style={styles.bottomFade} />

      {/* ── Hero content ── */}
      <div style={styles.content}>

        {/* Large interactive name — TextPressure (moved to top for mobile) */}
        <div className="name-wrap" style={styles.nameWrap}>
          <TextPressure
            text="M|Kolawole"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            scale={false}
            textColor="#ffffff"
            strokeColor="#e01111"
            minFontSize={48}
            className="cursor-target"
          />
        </div>

        {/* Eyebrow tag (red color, target cursor) */}
        <div className="cursor-target" style={{ position: 'relative', display: 'inline-block' }}>
          <span style={styles.eyebrowTextNavbarRed}>Fullstack · AI Engineer</span>
        </div>
        {/* TargetCursor overlay */}
        <TargetCursor targetSelector=".cursor-target" />

        {/* Red accent title line */}
        <p style={{ ...styles.redTitle, fontFamily: "'Exo 2', sans-serif" }}>
          Building at the edge of <em style={styles.em}>intelligence.</em>
        </p>

        {/* Sub-copy */}
        <p style={{ ...styles.sub, fontFamily: "'Exo 2', sans-serif" }}>
          I design and ship fullstack products powered by frontier AI —
          from architecture to deployment, fast and without shortcuts.
        </p>

        {/* CTA row */}
        <div style={styles.ctaRow}>
          <a
            href="#projects"
            className="cursor-target"
            style={{ ...styles.ctaPrimary, fontFamily: "'Exo 2', sans-serif" }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#e01111';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#e01111';
              e.currentTarget.style.color = '#fff';
            }}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="cursor-target"
            style={{ ...styles.ctaSecondary, fontFamily: "'Exo 2', sans-serif" }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
            }}
          >
            Let's Talk
          </a>
        </div>

        {/* Scroll nudge */}
        <div style={styles.scrollNudge}>
          <span style={styles.scrollArrow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
              <path d="M12 6v8m0 0l-4-4m4 4l4-4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span style={{ ...styles.scrollLabel, fontFamily: "'Exo 2', sans-serif" }}>scroll</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = {
  section: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: '#0a0101',
  },
  '@media (max-width: 600px)': {
    section: {
      minHeight: '100vh',
      padding: '0',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    content: {
      marginTop: '6vh',
      padding: '8px 0.5rem 0 0.5rem',
      gap: '1rem',
    },
    nameWrap: {
      marginTop: '8vh',
      marginBottom: '0',
    },
    ctaRow: {
      flexDirection: 'column',
      gap: 8,
    },
    scrollNudge: {
      marginTop: '12px',
    },
  },

  // Hyperspeed fills the full section
  bgLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    // #lights and canvas are styled via Hyperspeed.css:
    // #lights { width: 100%; height: 100%; overflow: hidden; position: absolute; }
    // canvas  { width: 100%; height: 100%; }
  },

  // Hard black fade at the very bottom (into next section)
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '12vh',
    zIndex: 2,
    background: 'linear-gradient(to top, #0a0101 0%, transparent 100%)',
  },

  // All content sits above overlays
  content: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '12px 1.5rem 0 1.5rem',
    maxWidth: 1400,
    width: '100%',
    gap: '1.5rem',
    marginTop: '14vh', // moves hero content even lower
  },
  // Eyebrow text with navbar font
  eyebrowTextNavbarRed: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize: '1.15rem',
    fontWeight: 200,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#e01111',
    lineHeight: 1,
    marginBottom: '2px',
  },
  nameWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
       marginTop: '2px',
       marginBottom: '1px',
  },

  // ── Red italic subtitle ──
  redTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.6)',
    margin: 0,
    lineHeight: 1.2,
  },
  em: {
    fontStyle: 'italic',
    color: '#e01111',
  },

  // ── Sub copy ──
  sub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
    color: 'rgba(255,255,255,0.38)',
    maxWidth: 520,
    lineHeight: 1.75,
    margin: 0,
  },

  // ── CTA row ──
  ctaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#e01111',
    color: '#ffffff',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1rem',
    letterSpacing: '0.1em',
    padding: '12px 28px',
    borderRadius: 999,
    textDecoration: 'none',
    transition: 'background 0.6s, color 0.6s, box-shadow 0.2s, transform 0.15s',
    // hover handled inline or via CSS:
    // :hover { background: #cc0f0f; box-shadow: 0 0 28px rgba(224,17,17,0.5); transform: translateY(-1px); }
  },
  ctaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'transparent',
    color: 'rgba(255,255,255,0.65)',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '1rem',
    letterSpacing: '0.1em',
    padding: '11px 28px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.18)',
    textDecoration: 'none',
    transition: 'color 0.2s, border-color 0.2s',
    // :hover { color: #fff; border-color: rgba(255,255,255,0.45); }
  },

  // ── Scroll nudge ──
  scrollNudge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    marginTop: '24px',
    opacity: 0.85,
  },
  scrollArrow: {
    display: 'block',
    width: 24,
    height: 24,
    marginBottom: 2,
    animation: 'floatArrow 1.2s infinite ease-in-out',
    opacity: 0.7,
  },
  scrollLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '0.65rem',
    letterSpacing: '0.25em',
    color: '#ffffff',
    textTransform: 'uppercase',
    opacity: 0.85,
    marginTop: 0,
  },
  '@keyframes floatArrow': {
    '0%':   { transform: 'translateY(0)' },
    '25%':  { transform: 'translateY(-8px)' },
    '50%':  { transform: 'translateY(8px)' },
    '75%':  { transform: 'translateY(-8px)' },
    '100%': { transform: 'translateY(0)' },
  },
};

