import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TargetCursor from "./TargetCursor";
import FuzzyText from './FuzzyText';

// ── Data ──────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "2020", text: "Started with Python & data science fundamentals" },
  { year: "2021", text: "Dived into fullstack — React, Node, PostgreSQL" },
  { year: "2022", text: "First ML models in production; landed early clients" },
  { year: "2023", text: "LangChain, vector DBs, fine-tuning — AI-first products" },
  { year: "Now",  text: "Shipping intelligent, high-performance digital products", isNow: true },
];

const TOOLS = ["VS Code","GitHub","Docker","Postman","Figma","Vercel","AWS","Supabase","LangChain"];

const SOCIALS = [
  { name: "GitHub",      handle: "@moseskolapo", href: "#", iconBg: "rgba(255,255,255,0.05)", iconColor: "rgba(255,255,255,0.7)", icon: "⌥" },
  { name: "LinkedIn",    handle: "Connect",      href: "#", iconBg: "rgba(10,102,194,0.15)",  iconColor: "#0a66c2",              icon: "in" },
  { name: "Twitter / X", handle: "@moseskolapo", href: "#", iconBg: "rgba(29,161,242,0.1)",   iconColor: "#1da1f2",              icon: "✕" },
];

const INTERESTS = [
  "AI Research","System Design","Developer Tooling","Open Source",
  "WebGL / 3D","Product Strategy","LLM Evals","Micro-interactions","SaaS Architecture",
];

const WHAT_I_DO = [
  { icon: "</>", text: "Fullstack web apps, APIs & microservices" },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H13L13 2Z"
          stroke="#e01111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: "LLM agents, RAG pipelines & AI tooling"
  },
  { icon: "◈", text: "Scalable cloud architecture & CI/CD" },
  { icon: "◎", text: "Clean, component-driven UI systems" },
];

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 2.2 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const raf    = useRef(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const ms = duration * 1000;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / ms, 1);
      const e = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = Math.floor(e * to) + suffix;
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, to, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

// ── Fade-up variant factory ───────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay } },
});

// ── Shared card ───────────────────────────────────────────────────────────────
function CardLabel({ children }) {
  return <span style={s.cardLbl}>{children}</span>;
}

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

// ── About ─────────────────────────────────────────────────────────────────────
export default function About() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useBreakpoint(768);

  // Responsive overrides
  const gridPad   = isMobile ? "0 1rem"   : "0 2rem";
  const cardPad   = isMobile ? "1.25rem"  : "2rem";

  const grid1Style = isMobile
    ? { ...s.grid1, gridTemplateColumns: "1fr", gridTemplateRows: "auto", padding: gridPad }
    : { ...s.grid1, padding: gridPad };

  // On mobile: stats sit side-by-side
  const statsWrapStyle = isMobile
    ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }
    : { display: "contents" };

  const grid2Style = isMobile
    ? { ...s.grid2, gridTemplateColumns: "1fr", padding: gridPad }
    : { ...s.grid2, padding: gridPad };

  const grid3Style = { ...s.grid3, padding: gridPad };

  const heroCardStyle = isMobile
    ? { ...s.card, padding: cardPad }
    : { ...s.card, ...s.heroCard, padding: cardPad };

  return (
    <>
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        hoverDuration={0.2}
        parallaxOn={true}
      />

      <section id="about" ref={ref} style={s.section}>

        {/* ── HEADER ── */}
        <div style={s.header}>
          <div className="cursor-target" style={s.bgText} aria-hidden>
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover
              fontFamily="'Exo 2', sans-serif"
              fontWeight={300}
              fontSize={s.bgText.fontSize}
              color="#e01111"
            >
              ABOUT ME
            </FuzzyText>
          </div>
          <div style={s.headerInner}>
            <motion.span
              className="cursor-target"
              variants={fadeUp(0)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={s.whoLabel}
            >
              WHO I AM
            </motion.span>
            <motion.p
              className="cursor-target"
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={s.roles}
            >
              Fullstack Engineer&nbsp;·&nbsp;AI Builder&nbsp;·&nbsp;Digital Craftsman
            </motion.p>
          </div>
        </div>

        {/* ── BENTO GRID 1 ── */}
        <div style={grid1Style}>

          {/* Hero card */}
          <motion.div
            className="cursor-target"
            variants={fadeUp(0.05)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
            style={heroCardStyle}
          >
            <div style={s.scatterDots} aria-hidden />
            <CardLabel>Who I Am</CardLabel>
            <div style={s.heroNames}>
              {["Fullstack","Engineer","AI","Builder","Premium","Products"].map((w, i) => (
                <div
                  key={i}
                  style={{
                    ...s.heroNameLine,
                    ...(i % 2 === 1 ? s.heroNameRed : {}),
                    fontSize: isMobile ? "clamp(1.6rem,8vw,2.4rem)" : "clamp(2rem,4vw,3rem)",
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
            <p style={s.heroDesc}>
              Turning complex systems into experiences you ship fast, scale confidently,
              and can't stop iterating on.
            </p>
          </motion.div>

          {/* Stats — side-by-side on mobile via wrapper div */}
          <div style={statsWrapStyle}>
            {/* Years */}
            <motion.div
              className="cursor-target"
              variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
              whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
              style={{ ...s.card, padding: cardPad }}
            >
              <CardLabel>Years Experience</CardLabel>
              <div style={{ ...s.statNum, fontSize: isMobile ? "clamp(2.8rem,12vw,4rem)" : "clamp(3.5rem,8vw,5rem)" }}>
                <Counter to={5} suffix="+" />
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div
              className="cursor-target"
              variants={fadeUp(0.15)} initial="hidden" animate={inView ? "show" : "hidden"}
              whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
              style={{ ...s.card, padding: cardPad }}
            >
              <CardLabel>Projects Built</CardLabel>
              <div style={{ ...s.statNum, fontSize: isMobile ? "clamp(2.8rem,12vw,4rem)" : "clamp(3.5rem,8vw,5rem)" }}>
                <Counter to={30} suffix="+" />
              </div>
            </motion.div>
          </div>

          {/* Profile image */}
          <motion.div
            className="cursor-target"
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
            style={{ ...s.card, ...s.imageBox, padding: cardPad }}
          >
            <CardLabel>Profile</CardLabel>
            <div style={s.imageWrap}>
              <img
                src="/assets/profile.jpg"
                alt="Profile"
                style={s.profileImg}
              />
            </div>
          </motion.div>

          {/* What I do */}
          <motion.div
            className="cursor-target"
            variants={fadeUp(0.25)} initial="hidden" animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
            style={{ ...s.card, padding: cardPad }}
          >
            <CardLabel>What I Do</CardLabel>
            <ul style={s.wiList}>
              {WHAT_I_DO.map((item, i) => (
                <li key={i} style={s.wiItem}>
                  <span style={s.wiIcon}>{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* ── BENTO GRID 2 ── */}
        <div style={grid2Style}>

          {/* Timeline */}
          <motion.div
            className="cursor-target"
            variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
            style={{ ...s.card, padding: cardPad }}
          >
            <CardLabel>My Story</CardLabel>
            <div style={s.timeline}>
              {TIMELINE.map((item, i) => (
                <div key={i} style={s.tlItem}>
                  <div style={s.tlDotCol}>
                    <div style={{ ...s.tlDot, ...(item.isNow ? { background: "#ff4444" } : {}) }} />
                    {i < TIMELINE.length - 1 && <div style={s.tlLine} />}
                  </div>
                  <div>
                    <div style={{ ...s.tlYear, ...(item.isNow ? { color: "#ff4444" } : {}) }}>
                      {item.year}
                    </div>
                    <div style={s.tlText}>{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools + Socials column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            <motion.div
              className="cursor-target"
              variants={fadeUp(0.15)} initial="hidden" animate={inView ? "show" : "hidden"}
              whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
              style={{ ...s.card, padding: cardPad }}
            >
              <CardLabel>Tools I Use</CardLabel>
              <div style={s.toolsWrap}>
                {TOOLS.map((t, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ borderColor: "rgba(224,17,17,0.5)", color: "#fff" }}
                    style={s.toolPill}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="cursor-target"
              variants={fadeUp(0.2)} initial="hidden" animate={inView ? "show" : "hidden"}
              whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
              style={{ ...s.card, padding: cardPad }}
            >
              <CardLabel>Find Me Online</CardLabel>
              <div style={s.socials}>
                {SOCIALS.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ background: "rgba(255,255,255,0.03)" }}
                    style={s.socialRow}
                  >
                    <div style={s.socialLeft}>
                      <div style={{ ...s.socialIcon, background: social.iconBg, color: social.iconColor }}>
                        {social.icon}
                      </div>
                      <div>
                        <div style={s.socialName}>{social.name}</div>
                        <div style={s.socialHandle}>{social.handle}</div>
                      </div>
                    </div>
                    <span style={s.socialArrow}>→</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── INTERESTS ── */}
        <div style={grid3Style}>
          <motion.div
            className="cursor-target"
            variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.3)" }}
            style={{ ...s.card, padding: isMobile ? "1.25rem" : "2rem" }}
          >
            <CardLabel>Interests</CardLabel>
            <div style={s.interestsWrap}>
              {INTERESTS.map((item, i) => (
                <motion.span
                  key={i}
                  whileHover={{ borderColor: "rgba(224,17,17,0.45)", color: "#fff", background: "rgba(224,17,17,0.05)" }}
                  style={s.intPill}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

      </section>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  section: {
    background: "#0a0101",
    padding:    "0 0 5rem",
    overflow:   "hidden",
    fontFamily: "'Exo 2', sans-serif",
    position:   "relative",
  },

  // Header
  header: {
    position:  "relative",
    textAlign: "center",
    padding:   "3rem 1rem 1.5rem",
    overflow:  "hidden",
  },
  bgText: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(60px,18vw,220px)",
    color:         "#e01111",
    letterSpacing: "0.04em",
    lineHeight:    1,
    userSelect:    "none",
    pointerEvents: "none",
  },
  headerInner: {
    position:  "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex:    2,
    whiteSpace:"nowrap",
  },
  whoLabel: {
    display:       "block",
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(1.2rem,4vw,2.2rem)",
    letterSpacing: "0.25em",
    color:         "#fff",
  },
  roles: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(0.58rem, 2vw, 0.72rem)",
    letterSpacing: "0.22em",
    color:         "rgba(255,255,255,0.38)",
    textTransform: "uppercase",
    marginTop:     6,
  },

  // Shared card
  card: {
    background:   "#110202",
    border:       "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    padding:      "2rem",
    position:     "relative",
    overflow:     "hidden",
    transition:   "border-color 0.25s",
    fontWeight:   100,
    letterSpacing: "0.12em",
    boxShadow:    "0 4px 24px 0 rgba(224,17,17,0.08)",
    marginBottom: "1.2rem",
  },
  cardLbl: {
    display:       "block",
    fontFamily:    "'Bebas Neue', sans-serif",
    fontSize:      "0.68rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color:         "rgba(255,255,255,0.38)",
    marginBottom:  "1.2rem",
  },

  // Grids — base (desktop), overridden inline on mobile
  grid1: {
    display:             "grid",
    gridTemplateColumns: "1.4fr 0.8fr 0.8fr",
    gridTemplateRows:    "auto auto",
    gap:                 10,
    padding:             "0 2rem",
    maxWidth:            1300,
    margin:              "0 auto 10px",
  },
  grid2: {
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 10,
    padding:             "0 2rem",
    maxWidth:            1300,
    margin:              "0 auto 10px",
  },
  grid3: {
    padding:  "0 2rem",
    maxWidth: 1300,
    margin:   "0 auto",
  },

  // Hero card (desktop only — mobile overrides gridRow via heroCardStyle)
  heroCard: {
    gridRow:       "1 / 3",
    display:       "flex",
    flexDirection: "column",
    minHeight:     360,
  },
  scatterDots: {
    position:        "absolute",
    inset:           0,
    backgroundImage: "radial-gradient(circle, rgba(224,17,17,0.18) 1px, transparent 1px)",
    backgroundSize:  "28px 28px",
    pointerEvents:   "none",
    opacity:         0.5,
  },
  heroNames: { marginBottom: "auto" },
  heroNameLine: {
    fontFamily: "'Exo 2', sans-serif",
    fontSize:   "clamp(2rem,4vw,3rem)",
    fontWeight: 600,
    lineHeight: 1.1,
    color:      "#fff",
  },
  heroNameRed: { color: "#e01111" },
  heroDesc: {
    fontSize:   "0.85rem",
    color:      "rgba(255,255,255,0.38)",
    lineHeight: 1.7,
    marginTop:  "auto",
    paddingTop: "1.5rem",
    borderTop:  "1px solid rgba(255,255,255,0.07)",
  },

  // Stats
  statNum: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(3.5rem,8vw,5rem)",
    color:         "#e01111",
    lineHeight:    1,
    letterSpacing: "0.02em",
    marginTop:     "0.5rem",
  },

  // Profile image box
  imageBox: {
    display:        "flex",
    flexDirection:  "column",
    alignItems:     "center",
    justifyContent: "center",
    minHeight:      "220px",
    background:     "rgba(255,255,255,0.02)",
    borderRadius:   "18px",
    boxShadow:      "0 2px 16px 0 rgba(224,17,17,0.07)",
    gap:            "1rem",
    transition:     "background 0.3s, box-shadow 0.3s",
  },
  imageWrap: {
    width:        "120px",
    height:       "120px",
    borderRadius: "50%",
    overflow:     "hidden",
    boxShadow:    "0 2px 12px 0 rgba(224,17,17,0.12)",
    border:       "2px solid rgba(224,17,17,0.15)",
    background:   "#1a1a1a",
    display:      "flex",
    alignItems:   "center",
    justifyContent: "center",
    transition:   "box-shadow 0.3s, border 0.3s",
  },
  profileImg: {
    width:        "100%",
    height:       "100%",
    objectFit:    "cover",
    borderRadius: "50%",
    display:      "block",
    filter:       "brightness(0.95) contrast(1.05)",
    boxShadow:    "0 1px 8px 0 rgba(224,17,17,0.09)",
    transition:   "filter 0.3s, box-shadow 0.3s",
  },

  // What I do
  wiList:  { listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem", marginTop: "0.75rem" },
  wiItem:  { display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 },
  wiIcon:  {
    width: 22, height: 22, borderRadius: 6,
    background: "rgba(224,17,17,0.12)", border: "1px solid rgba(224,17,17,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, fontSize: "0.65rem", color: "#e01111", marginTop: 1,
  },

  // Timeline
  timeline: { display: "flex", flexDirection: "column", marginTop: "0.75rem" },
  tlItem:   { display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 14px", paddingBottom: "1.4rem" },
  tlDotCol: { display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 },
  tlDot:    { width: 9, height: 9, borderRadius: "50%", background: "#e01111", border: "2px solid rgba(224,17,17,0.4)", flexShrink: 0 },
  tlLine:   { flex: 1, width: 1, background: "rgba(255,255,255,0.07)", marginTop: 4 },
  tlYear:   { fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", color: "#e01111", marginBottom: 2 },
  tlText:   { fontSize: "0.85rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.5, fontWeight: 100, letterSpacing: "0.18em" },

  // Tools
  toolsWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1rem" },
  toolPill: {
    fontSize: "0.78rem", color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.07)", borderRadius: 999,
    padding: "5px 14px", cursor: "default", transition: "border-color 0.2s, color 0.2s",
    fontWeight: 100,
    letterSpacing: "0.18em",
  },

  // Socials
  socials:    { display: "flex", flexDirection: "column", gap: 2, marginTop: "1rem" },
  socialRow:  {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0.65rem 6px", borderBottom: "1px solid rgba(255,255,255,0.07)",
    textDecoration: "none", cursor: "pointer", borderRadius: 6, transition: "background 0.2s",
  },
  socialLeft:   { display: "flex", alignItems: "center", gap: 12 },
  socialIcon:   {
    width: 34, height: 34, borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.07)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.9rem", fontWeight: 600,
  },
  socialName:   { fontSize: "0.9rem", fontWeight: 500, color: "rgba(255,255,255,0.8)" },
  socialHandle: { fontSize: "0.75rem", color: "rgba(255,255,255,0.38)", fontWeight: 100, letterSpacing: "0.18em" },
  socialArrow:  { color: "rgba(255,255,255,0.38)", fontSize: "0.85rem" },

  // Interests
  interestsWrap: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1rem" },
  intPill: {
    fontSize: "0.82rem", color: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8,
    padding: "7px 16px", cursor: "default", transition: "all 0.2s",
    fontWeight: 100,
    letterSpacing: "0.18em",
  },
};