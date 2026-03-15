import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Logo glyph (matches Navbar / Footer) ─────────────────────────────────────
function LogoGlyph({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="6" fill="#1a0202"/>
      <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" stroke="rgba(224,17,17,0.35)"/>
      <path d="M8 26V10L18 20L28 10V26" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M8 10L18 20L28 10" stroke="#e01111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9"/>
    </svg>
  );
}

// ── Scanline canvas ──────────────────────────────────────────────────────────
function ScanlineCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    for (let y = 0; y < c.height; y += 3) {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, y, c.width, 1);
    }
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 3,
        opacity: 0.6,
      }}
    />
  );
}

// ── Particle field ────────────────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const count = window.innerWidth < 600 ? 18 : 36;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      const size = Math.random() * 2.5 + 0.8;
      const delay = Math.random() * 6;
      const dur   = Math.random() * 7 + 5;
      Object.assign(p.style, {
        position: "absolute",
        width: `${size}px`, height: `${size}px`,
        borderRadius: "50%",
        background: Math.random() > 0.6 ? "#e01111" : "rgba(255,255,255,0.5)",
        left: `${Math.random() * 100}%`,
        bottom: "-10px",
        opacity: 0,
        animation: `ldFloat ${dur}s ${delay}s linear infinite`,
      });
      el.appendChild(p);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }} />;
}

// ── Grid lines ────────────────────────────────────────────────────────────────
function GridLines() {
  const cols = 12;
  const rows = 8;
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, opacity:0.04 }}>
      {/* Vertical */}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <div key={`v${i}`} style={{
          position: "absolute", top:0, bottom:0,
          left: `${(i / cols) * 100}%`,
          width: 1, background: "#fff",
        }} />
      ))}
      {/* Horizontal */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <div key={`h${i}`} style={{
          position: "absolute", left:0, right:0,
          top: `${(i / rows) * 100}%`,
          height: 1, background: "#fff",
        }} />
      ))}
    </div>
  );
}

// ── Red orbs ──────────────────────────────────────────────────────────────────
function Orbs() {
  return (
    <>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", width: 600, height: 600,
          borderRadius: "50%", background: "rgba(224,17,17,0.14)",
          filter: "blur(100px)", top: -200, right: -150,
          pointerEvents: "none", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute", width: 400, height: 400,
          borderRadius: "50%", background: "rgba(224,17,17,0.1)",
          filter: "blur(80px)", bottom: -100, left: -80,
          pointerEvents: "none", zIndex: 0,
        }}
      />
    </>
  );
}

// ── Counter ───────────────────────────────────────────────────────────────────
function Counter({ value }) {
  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: "clamp(5rem, 20vw, 12rem)",
      lineHeight: 1,
      letterSpacing: "0.04em",
      color: "transparent",
      WebkitTextStroke: "1px rgba(224,17,17,0.25)",
      position: "absolute",
      bottom: "10%",
      right: "5%",
      userSelect: "none",
      pointerEvents: "none",
      zIndex: 1,
    }}>
      {String(value).padStart(2, "0")}
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ progress }) {
  return (
    <div style={{
      position: "absolute",
      bottom: 0, left: 0, right: 0,
      height: 2,
      background: "rgba(255,255,255,0.05)",
      zIndex: 5,
    }}>
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #8b0000, #e01111, #ff4444)",
          transformOrigin: "left",
        }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      {/* Glow dot at the tip */}
      <motion.div
        animate={{ left: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: -3,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "#e01111",
          boxShadow: "0 0 10px 3px rgba(224,17,17,0.6)",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

// ── Status ticker ─────────────────────────────────────────────────────────────
const STATUS_MSGS = [
  "Initialising systems...",
  "Loading components...",
  "Wiring up the AI stack...",
  "Hydrating UI layers...",
  "Compiling interactions...",
  "Almost there...",
];

// ── Main LoadingScreen ────────────────────────────────────────────────────────
export default function LoadingScreen({ onDone }) {
  // Remove isReady, use progress completion as triggerIt's
  const [progress,  setProgress]  = useState(0);
  const [msgIndex,  setMsgIndex]  = useState(0);
  const [exiting,   setExiting]   = useState(false);
  useEffect(() => {
    // Smoothly count up from 0 to 100 over 5 seconds
    const duration = 5000; // 5 seconds
    const interval = 16; // ~60fps
    const steps = Math.floor(duration / interval);
    let step = 0;
    const ticker = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.round((step / steps) * 100)));
      // Update status message based on progress
      const msgIdx = Math.floor((step / steps) * STATUS_MSGS.length);
      setMsgIndex(Math.min(msgIdx, STATUS_MSGS.length - 1));
      if (step >= steps) {
        clearInterval(ticker);
      }
    }, interval);
    return () => clearInterval(ticker);
  }, []);
  // ...existing code...

  // Trigger exit when progress is 100
  useEffect(() => {
    if (progress >= 100) {
      setExiting(true);
    }
  }, [progress]);

  // Call onDone after exit animation
  useEffect(() => {
    if (exiting) {
      const t = setTimeout(() => onDone?.(), 1000);
      return () => clearTimeout(t);
    }
  }, [exiting, onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -120 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position:   "fixed",
            inset:      0,
            background: "#0a0101",
            zIndex:     9999,
            overflow:   "hidden",
            display:    "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <style>{`
            @keyframes ldFloat {
              0%   { transform: translateY(0) scale(0);   opacity: 0;   }
              10%  { opacity: 0.7; }
              90%  { opacity: 0.3; }
              100% { transform: translateY(-100vh) scale(1.4); opacity: 0; }
            }
            @keyframes ldBlink {
              0%,100% { opacity: 1; }
              50%      { opacity: 0; }
            }
            @font-face {}
          `}</style>

          {/* Layers */}
          <GridLines />
          <Orbs />
          <ParticleField />
          <ScanlineCanvas />

          {/* Ghost BG text */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Exo 2', sans-serif",
            fontSize: "clamp(80px, 22vw, 260px)",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(224,17,17,0.06)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 1,
          }}>
            MK
          </div>

          {/* Center content */}
          <div style={{
            position: "relative",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <motion.div
                animate={{ rotate: [0, 0, 0] }}
                style={{
                  filter: "drop-shadow(0 0 18px rgba(224,17,17,0.5))",
                }}
              >
                <LogoGlyph size={52} />
              </motion.div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                  letterSpacing: "0.1em",
                  color: "#fff",
                  lineHeight: 1,
                }}>
                  MOSES<span style={{ color: "#e01111" }}>.</span>
                </span>
                <span style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "clamp(0.52rem, 1.5vw, 0.65rem)",
                  letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.28)",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}>
                  Fullstack · AI · Craft
                </span>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: "clamp(160px, 30vw, 320px)",
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(224,17,17,0.4), transparent)",
                transformOrigin: "center",
              }}
            />

            {/* Status message */}
            <AnimatePresence mode="wait">
              <motion.span
                key={msgIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "clamp(0.6rem, 1.8vw, 0.72rem)",
                  letterSpacing: "0.28em",
                  color: "rgba(255,255,255,0.28)",
                  textTransform: "uppercase",
                }}
              >
                {STATUS_MSGS[msgIndex]}
              </motion.span>
            </AnimatePresence>

            {/* Progress number + bar track */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              width: "clamp(200px, 36vw, 380px)",
            }}>
              {/* Percent */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <motion.span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
                    color: "#e01111",
                    lineHeight: 1,
                    letterSpacing: "0.04em",
                    filter: "drop-shadow(0 0 12px rgba(224,17,17,0.35))",
                  }}
                >
                  {progress}
                </motion.span>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
                  color: "rgba(224,17,17,0.5)",
                  letterSpacing: "0.1em",
                }}>
                  %
                </span>
              </div>

              {/* Track */}
              <div style={{
                width: "100%",
                height: 3,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 999,
                overflow: "hidden",
                position: "relative",
              }}>
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #6b0000, #e01111, #ff6666)",
                    borderRadius: 999,
                    transformOrigin: "left",
                  }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              {/* Tick marks */}
              <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 4,
              }}>
                {[0, 25, 50, 75, 100].map(n => (
                  <span key={n} style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.1em",
                    color: progress >= n
                      ? "rgba(224,17,17,0.55)"
                      : "rgba(255,255,255,0.1)",
                    transition: "color 0.3s",
                  }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Ghost counter bottom-right */}
          <Counter value={progress} />

          {/* Bottom-left metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "2rem",
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {[
              { k: "Stack",    v: "React · Node · Python · AI" },
              { k: "Location", v: "Lagos, NG"                   },
              { k: "Status",   v: "Available for work"          },
            ].map(({ k, v }) => (
              <div key={k} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.22em",
                  color: "rgba(224,17,17,0.5)",
                  textTransform: "uppercase",
                  minWidth: 54,
                }}>
                  {k}
                </span>
                <span style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.22)",
                }}>
                  {v}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Bottom-right — version tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              right: "2rem",
              zIndex: 4,
              fontFamily: "'Exo 2', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.1)",
              textTransform: "uppercase",
            }}
          >
            v2025 · Portfolio
          </motion.div>

          {/* Full-width bottom progress rail */}
          <ProgressBar progress={progress} />

        </motion.div>
      )}
    </AnimatePresence>
  );
}