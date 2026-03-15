import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { FaShoePrints, FaTshirt, FaHeadphones, FaMobileAlt, FaLaptop, FaTabletAlt } from 'react-icons/fa';
import TargetCursor from './TargetCursor';
import FuzzyText from './FuzzyText';

// ── useBreakpoint ─────────────────────────────────────────────────────────────
function useBreakpoint(bp = 768) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [bp]);
  return isMobile;
}

// ── SVG icons ─────────────────────────────────────────────────────────────────
const IconExternal = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M7 1C3.69 1 1 3.69 1 7c0 2.65 1.72 4.9 4.1 5.69.3.05.41-.13.41-.28v-1c-1.67.36-2.02-.8-2.02-.8-.27-.69-.67-.87-.67-.87-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.41.66 1.75.5.05-.39.21-.66.38-.81-1.33-.15-2.73-.67-2.73-2.97 0-.66.23-1.19.62-1.61-.06-.15-.27-.76.06-1.59 0 0 .51-.16 1.66.62A5.8 5.8 0 017 4.8c.51 0 1.03.07 1.51.2 1.15-.78 1.66-.62 1.66-.62.33.83.12 1.44.06 1.59.39.42.62.95.62 1.61 0 2.31-1.4 2.82-2.74 2.97.22.19.41.56.41 1.13v1.68c0 .15.11.33.41.28A6.004 6.004 0 0013 7c0-3.31-2.69-6-6-6z" fill="currentColor"/>
  </svg>
);

// ── Unique preview visuals per project ────────────────────────────────────────
function PreviewAI() {
  return (
    <div style={{ ...s.preview, background: "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(224,17,17,0.18) 0%, #0f0202 70%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={s.aiIcon}
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <rect x="4" y="8" width="30" height="22" rx="5" stroke="#e01111" strokeWidth="1.8"/>
          <path d="M10 17h6M10 21h10" stroke="#e01111" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="26" cy="17" r="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          <path d="M13 8V5M25 8V5" stroke="#e01111" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M7 30l3-4M31 30l-3-4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>
  );
}

function PreviewData() {
  const bars = [45, 72, 55, 88, 60, 96, 70];
  return (
    <div style={{ ...s.preview, background: "linear-gradient(135deg,#0a0101 0%,#1a0303 50%,#0d0202 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <div style={{ position: "absolute", top: "40%", left: 0, right: 0, height: 1, background: "rgba(224,17,17,0.15)" }} />
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, padding: "0 12px" }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ scaleY: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            style={{
              width: 18, height: h,
              borderRadius: "3px 3px 0 0",
              background: i === 5 ? "#e01111" : i === 1 || i === 3 ? "rgba(224,17,17,0.7)" : "rgba(224,17,17,0.5)",
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PreviewNLP() {
  const lines = [
    { w: "55%", red: true }, { w: "80%" }, { w: "60%" }, { w: "90%" },
    { w: "70%", red: true }, { w: "40%" }, { w: "80%" }, { w: "60%" }, { w: "90%" },
  ];
  return (
    <div style={{ ...s.preview, background: "linear-gradient(160deg,#0a0101 0%,#160202 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-1, 0, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={s.docWrap}
      >
        {lines.map((l, i) => (
          <React.Fragment key={i}>
            {i === 4 && <div style={{ height: 5 }} />}
            <div style={{
              height: 5, borderRadius: 999,
              background: l.red ? "rgba(224,17,17,0.5)" : "rgba(255,255,255,0.12)",
              width: l.w, marginBottom: 6,
            }} />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function PreviewCollab() {
  const cursors = [
    { name: "Moses", color: "#e01111",              top: 10,  left: 10,  delay: 0   },
    { name: "Sarah",  color: "rgba(255,255,255,0.6)", top: 42,  left: 55,  delay: 1.2 },
    { name: "Ali",    color: "rgba(224,17,17,0.6)",  bottom: 12, right: 0, delay: 0.6 },
  ];
  return (
    <div style={{ ...s.preview, background: "radial-gradient(ellipse 90% 80% at 30% 50%,rgba(224,17,17,0.1) 0%,#0a0101 65%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 180, height: 120 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8 }} />
        {cursors.map((c, i) => (
          <motion.div
            key={i}
            animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
            style={{
              position: "absolute", top: c.top, left: c.left, bottom: c.bottom, right: c.right,
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(224,17,17,0.15)", border: "1px solid rgba(224,17,17,0.3)",
              borderRadius: 999, padding: "4px 10px 4px 6px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.7)",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
            {c.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PreviewEcom({ isMobile }) {
  const icons = [
    <FaShoePrints />, <FaTshirt />, <FaHeadphones />,
    <FaMobileAlt />, <FaLaptop />, <FaTabletAlt />,
  ];
  const active = [1, 3];
  // On mobile the wide card stacks vertically — preview becomes a horizontal strip
  const wrapStyle = isMobile
    ? { ...s.preview, borderBottom: "1px solid rgba(255,255,255,0.06)", borderRight: "none", width: "100%", height: 140 }
    : s.previewWide;
  return (
    <div style={{ ...wrapStyle, background: "linear-gradient(135deg,#0a0101,#180202,#0a0101)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 52px)", gap: 6 }}>
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            style={{
              width: 52, height: 52, borderRadius: 8, fontSize: "1.35rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${active.includes(i) ? "rgba(224,17,17,0.3)" : "rgba(255,255,255,0.08)"}`,
              background: active.includes(i) ? "rgba(224,17,17,0.12)" : "rgba(255,255,255,0.04)",
              color: active.includes(i) ? "#e01111" : "#fff",
            }}
          >
            {React.cloneElement(Icon, { style: { strokeWidth: 1, fontWeight: 200, width: 28, height: 28 } })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────────
function Tag({ children }) {
  return <span style={s.tag}>{children}</span>;
}

// ── Card links ────────────────────────────────────────────────────────────────
function CardLink({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ color: "#e01111", gap: 9 }}
      style={s.cardLink}
    >
      <Icon />
      {label}
    </motion.a>
  );
}

// ── Particles ─────────────────────────────────────────────────────────────────
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 28; i++) {
      const p = document.createElement("span");
      const size = Math.random() * 3 + 1;
      Object.assign(p.style, {
        position: "absolute", width: `${size}px`, height: `${size}px`,
        background: "#e01111", borderRadius: "50%",
        left: `${Math.random() * 100}%`, opacity: 0,
        animationName: "pjFloat", animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDuration: `${Math.random() * 8 + 6}s`,
        animationDelay: `${Math.random() * 8}s`,
      });
      el.appendChild(p);
    }
    return () => { if (el) el.innerHTML = ""; };
  }, []);
  return <div ref={ref} style={s.particles} aria-hidden />;
}

// ── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4,0,0.2,1], delay } },
});

// ── Projects ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useBreakpoint(768);

  const sectionPad  = isMobile ? "6rem 1rem 4rem"  : "10rem 2rem 7rem";
  const headerStyle = isMobile
    ? { ...s.header, gridTemplateColumns: "1fr", gap: "1.5rem" }
    : s.header;
  const gridStyle   = isMobile
    ? { ...s.grid, gridTemplateColumns: "1fr", gap: 16 }
    : s.grid;
  const moreStyle   = isMobile
    ? { ...s.more, flexDirection: "column", alignItems: "flex-start" }
    : s.more;

  return (
    <section id="projects" ref={ref} style={{ ...s.section, padding: sectionPad }}>
      <style>{`
        @keyframes pjFloat {
          0%   { transform:translateY(100vh) scale(0); opacity:0; }
          10%  { opacity:0.6; }
          90%  { opacity:0.3; }
          100% { transform:translateY(-20px) scale(1.5); opacity:0; }
        }
        @keyframes pjSweep { 0%{left:-60%} 100%{left:120%} }
        @keyframes pjBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>

      {/* BG FuzzyText with header and subheader */}
      <div style={{ position: 'relative', marginBottom: isMobile ? '2rem' : '3rem', minHeight: isMobile ? '140px' : '260px' }}>
        <div style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: "clamp(55px,18vw,200px)",
          color: "#e01111",
          letterSpacing: "0.04em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          textAlign: 'center',
          zIndex: 1,
        }} aria-hidden>
          <FuzzyText
            fontFamily="'Exo 2', sans-serif"
            fontWeight={400}
            color="#e01111"
            enableHover={true}
            baseIntensity={0.18}
            hoverIntensity={0.5}
            fontSize="clamp(55px,18vw,200px)"
            letterSpacing={0.04}
          >
            PROJECTS
          </FuzzyText>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 2, whiteSpace: 'nowrap', textAlign: 'center' }}>
          <motion.span
            className="cursor-target"
            variants={fadeUp(0)} initial="hidden" animate={inView ? "show" : "hidden"}
            style={{
              display: 'block',
              fontFamily: "'Exo 2', sans-serif",
              fontSize: isMobile ? "clamp(1.1rem,5vw,1.6rem)" : "clamp(1.6rem,4vw,2.4rem)",
              letterSpacing: "0.25em",
              color: "#fff",
            }}
          >
            MY PROJECTS
          </motion.span>
          <motion.p
            className="cursor-target"
            variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
            style={{
              fontSize: isMobile ? "clamp(0.52rem,2vw,0.72rem)" : "0.72rem",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.38)",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            AI, Fullstack, Data, and more
          </motion.p>
        </div>
      </div>

      <TargetCursor targetSelector=".cursor-target" />
      <div style={s.sweep} aria-hidden />
      <div style={s.orb1} aria-hidden />
      <div style={s.orb2} aria-hidden />
      <Particles />

      {/* HEADER */}
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.1 } } }}
        initial="hidden" animate={inView ? "show" : "hidden"}
        style={headerStyle}
      >
        <div>
          <motion.div variants={fadeUp(0)} style={s.eyebrow} className="cursor-target">
            <span style={s.eyebrowLine} />
            <span style={s.eyebrowText}>Selected Work</span>
          </motion.div>
          <motion.h2
            variants={fadeUp(0.05)}
            style={{
              ...s.heading,
              fontSize: isMobile ? "clamp(2rem,8vw,3rem)" : "clamp(2.8rem,6vw,4.5rem)",
            }}
            className="cursor-target"
          >
            Things I've<br /><em style={s.headingEm}>Built.</em>
          </motion.h2>
        </div>
        <motion.p variants={fadeUp(0.1)} style={s.writeup} className="cursor-target">
          A curated selection of projects spanning{" "}
          <strong style={s.writeupStrong}>AI engineering, fullstack development,</strong> and{" "}
          <strong style={s.writeupStrong}>data systems</strong>. Each one built to solve a real
          problem.. shipped, iterated, and refined until it works exactly as it should.
        </motion.p>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.09 } } }}
        initial="hidden" animate={inView ? "show" : "hidden"}
        style={gridStyle}
      >
        <ProjectCard variants={fadeUp(0)} preview={<PreviewAI />} title="AI Chatbot Platform"
          desc="Enterprise-grade conversational AI with RAG, custom agents, and a real-time analytics dashboard. Handles thousands of daily support interactions with 94% resolution rate."
          tags={["React","Node.js","LangChain","RAG"]} liveHref="#" codeHref="#" />

        <ProjectCard variants={fadeUp(0.08)} preview={<PreviewData />} title="Data Insights Dashboard"
          desc="Interactive analytics platform with real-time updates, D3.js charts, and a custom query builder. Reduced analyst reporting time by 60% at launch."
          tags={["React","D3.js","MongoDB"]} liveHref="#" codeHref="#" />

        <ProjectCard variants={fadeUp(0.16)} preview={<PreviewNLP />} title="Smart Resume Parser"
          desc="NLP-powered tool that extracts, structures, and scores resume data at scale. Processes thousands of documents per minute with custom spaCy pipelines."
          tags={["Python","spaCy","FastAPI","NLP"]} liveHref="#" codeHref="#" />

        <ProjectCard variants={fadeUp(0.24)} preview={<PreviewCollab />} title="Realtime Collab App"
          desc="Live document editing with presence indicators, conflict resolution, and granular permissions. Sub-100ms sync via Socket.io and operational transforms."
          tags={["React","Node.js","Socket.io"]} liveHref="#" codeHref="#" />

        {/* Wide card — stacks vertically on mobile */}
        <ProjectCard
          variants={fadeUp(0.32)}
          preview={<PreviewEcom isMobile={isMobile} />}
          wide={!isMobile}
          title="E-commerce Recommendation Engine"
          desc="Deep learning recommendation system using collaborative filtering and session-based models. Deployed on AWS Lambda, serving personalised results at 30ms P99 latency. Increased average order value by 23% in A/B testing."
          tags={["Python","TensorFlow","Flask","AWS Lambda","Deep Learning"]}
          liveHref="#" codeHref="#"
        />
      </motion.div>

      {/* MORE */}
      <motion.div
        variants={fadeUp(0.2)} initial="hidden" animate={inView ? "show" : "hidden"}
        style={moreStyle}
      >
        <p style={s.moreText}>
          <strong style={{ color:"rgba(255,255,255,0.6)", fontWeight:500 }}>5 projects shown.</strong>
          {" "}More on GitHub.. open source tools, experiments, and client work.
        </p>
        <motion.button
          className="cursor-target"
          whileHover={{
            background: "#fff",
            boxShadow: "0 0 20px rgba(224,17,17,0.4)",
            y: -1,
            color: "#e01111"
          }}
          whileTap={{ scale:0.97 }}
          style={{
            ...s.moreCta,
            width: isMobile ? "100%" : "auto",
            transition: "background 0.2s, box-shadow 0.2s, transform 0.15s, color 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          View All on GitHub
        </motion.button>
      </motion.div>
    </section>
  );
}

// ── Reusable card ─────────────────────────────────────────────────────────────
function ProjectCard({ variants, preview, title, desc, tags, liveHref, codeHref, wide = false }) {
  return (
    <motion.div
      className="cursor-target"
      variants={variants}
      whileHover={{
        y: -5,
        borderColor: "rgba(224,17,17,0.35)",
        boxShadow: "0 0 0 1px rgba(224,17,17,0.07) inset, 0 24px 60px rgba(0,0,0,0.6), 0 0 50px rgba(224,17,17,0.07)",
      }}
      style={{ ...s.card, ...(wide ? s.cardWide : {}) }}
    >
      <motion.div
        initial={{ opacity:0 }} whileHover={{ opacity:1 }}
        transition={{ duration:0.35 }}
        style={s.cardGlow} aria-hidden
      />
      {preview}
      <div style={s.body}>
        <div style={s.cardTitle}>{title}</div>
        <p style={s.cardDesc}>{desc}</p>
        <div style={s.tagsRow}>
          {tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div style={s.footer}>
          <CardLink href={liveHref} icon={IconExternal} label="view_live" />
          <CardLink href={codeHref} icon={IconGitHub}   label="source_code" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const glass = {
  background:           "rgba(17,2,2,0.85)",
  backdropFilter:       "blur(20px) saturate(1.3)",
  WebkitBackdropFilter: "blur(20px) saturate(1.3)",
  boxShadow:            "0 0 0 1px rgba(255,255,255,0.03) inset, 0 12px 40px rgba(0,0,0,0.5)",
};

const s = {
  section: {
    position:   "relative",
    background: "#0a0101",
    padding:    "10rem 2rem 7rem",
    overflow:   "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  sweep: {
    position:"absolute",top:0,left:"-60%",width:"40%",height:"100%",
    background:"linear-gradient(105deg,transparent 40%,rgba(224,17,17,0.025) 50%,transparent 60%)",
    animation:"pjSweep 9s ease-in-out infinite",pointerEvents:"none",
  },
  orb1: { position:"absolute",width:400,height:400,background:"rgba(224,17,17,0.06)",borderRadius:"50%",filter:"blur(80px)",top:-100,right:-100,pointerEvents:"none" },
  orb2: { position:"absolute",width:300,height:300,background:"rgba(224,17,17,0.04)",borderRadius:"50%",filter:"blur(80px)",bottom:0,left:-80,pointerEvents:"none" },
  particles: { position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0 },

  // Header
  header: {
    position:"relative", zIndex:2, maxWidth:1200, margin:"0 auto 3.5rem",
    display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"end",
  },
  eyebrow: { display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" },
  eyebrowLine: { display:"block", width:28, height:1, background:"#e01111" },
  eyebrowText: { fontFamily:"'Exo 2',sans-serif", fontSize:"0.75rem", letterSpacing:"0.3em", color:"#e01111", textTransform:"uppercase" },
  heading: { fontFamily:"'Exo 2',sans-serif", fontSize:"clamp(2.8rem,6vw,4.5rem)", letterSpacing:"0.04em", color:"#fff", lineHeight:1.05 },
  headingEm: { fontStyle:"italic", color:"#e01111", fontFamily:"'Exo 2',sans-serif" },
  writeup: { fontSize:"0.92rem", color:"rgba(255,255,255,0.38)", lineHeight:1.8, alignSelf:"end" },
  writeupStrong: { color:"rgba(255,255,255,0.7)", fontWeight:500 },

  // Grid
  grid: {
    position:"relative", zIndex:2, maxWidth:1200, margin:"0 auto",
    display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20,
  },

  // Card
  card: {
    ...glass,
    position:"relative", borderRadius:20, overflow:"hidden",
    border:"1px solid rgba(255,255,255,0.07)", cursor:"none",
    display:"flex", flexDirection:"column",
    transition:"border-color 0.35s,transform 0.35s,box-shadow 0.35s",
  },
  // wide card: row on desktop, column (default) on mobile via inline override
  cardWide: { gridColumn:"1 / -1", flexDirection:"row" },
  cardGlow: {
    position:"absolute", inset:0,
    background:"linear-gradient(135deg,rgba(224,17,17,0.05) 0%,transparent 55%,rgba(255,255,255,0.015) 100%)",
    pointerEvents:"none", borderRadius:"inherit", zIndex:0,
  },

  // Preview
  preview: {
    width:"100%", height:220, overflow:"hidden", flexShrink:0,
    borderBottom:"1px solid rgba(255,255,255,0.06)",
  },
  previewWide: {
    width:340, height:"auto", flexShrink:0,
    borderRight:"1px solid rgba(255,255,255,0.06)", borderBottom:"none",
  },

  // AI icon
  aiIcon: {
    width:80, height:80, borderRadius:22,
    background:"rgba(224,17,17,0.12)", border:"1.5px solid rgba(224,17,17,0.3)",
    display:"flex", alignItems:"center", justifyContent:"center",
  },
  // Doc
  docWrap: {
    width:130, background:"rgba(255,255,255,0.04)",
    border:"1px solid rgba(255,255,255,0.08)", borderRadius:10,
    padding:"14px 16px", display:"flex", flexDirection:"column",
  },

  // Body
  body: { padding:"1.5rem", display:"flex", flexDirection:"column", flex:1, position:"relative", zIndex:1 },
  cardTitle: {
    fontFamily:"'Exo 2',sans-serif",
    fontSize:"clamp(1.15rem,3vw,1.85rem)",
    letterSpacing:"0.04em", color:"#fff", marginBottom:"0.6rem", lineHeight:1.1,
  },
  cardDesc: { fontSize:"0.85rem", color:"rgba(255,255,255,0.4)", lineHeight:1.75, flex:1, marginBottom:"1.2rem" },
  tagsRow: { display:"flex", flexWrap:"wrap", gap:7, marginBottom:"1.2rem" },
  tag: {
    fontFamily:"'Exo 2',sans-serif", fontSize:"0.65rem", letterSpacing:"0.15em",
    color:"rgba(255,255,255,0.5)", border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:4, padding:"4px 9px", textTransform:"uppercase",
  },
  footer: {
    display:"flex", alignItems:"center", gap:"1rem",
    paddingTop:"1rem", borderTop:"1px solid rgba(255,255,255,0.06)", marginTop:"auto",
  },
  cardLink: {
    display:"inline-flex", alignItems:"center", gap:6,
    fontFamily:"'Exo 2',sans-serif", fontSize:"0.75rem", letterSpacing:"0.12em",
    color:"rgba(255,255,255,0.5)", textDecoration:"none", transition:"color 0.2s,gap 0.2s",
  },

  // More
  more: {
    position:"relative", zIndex:2, maxWidth:1200, margin:"1.5rem auto 0",
    display:"flex", alignItems:"center", justifyContent:"space-between",
    flexWrap:"wrap", gap:"1rem", padding:"1.2rem 1.75rem",
    border:"1px solid rgba(255,255,255,0.07)", borderRadius:12,
    background:"rgba(255,255,255,0.02)",
    backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)",
  },
  moreText: { fontSize:"0.82rem", color:"rgba(255,255,255,0.32)" },
  moreCta: {
    fontFamily:"'Exo 2',sans-serif", fontSize:"0.8rem", letterSpacing:"0.12em",
    color:"#fff", background:"#e01111", border:"none", borderRadius:999,
    padding:"9px 22px", cursor:"pointer",
    transition:"background 0.2s,box-shadow 0.2s,transform 0.15s",
    flexShrink:0,
  },
};