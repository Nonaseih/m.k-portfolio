import React, { useRef, useEffect } from "react";
import FuzzyText from './FuzzyText';
import { skillIconMap } from './SkillIcons';
import { motion, useInView } from "framer-motion";
import TargetCursor from './TargetCursor';

// ── Data ──────────────────────────────────────────────────────────────────────
const TICKER_LOGOS = [
  "React","Next.js","TypeScript","Python","LangChain","Node.js",
  "PostgreSQL","Docker","AWS","Framer Motion","FastAPI","Supabase",
  "Three.js","OpenAI","Prisma","Tailwind","GitHub Actions","Vercel",
  "RAG","Agents","Fine-tuning","Vector DBs","CI/CD","Linux",
];

const CARDS = [
  {
    cat: "Frontend",
    items: [
      { name: "React",          hot: true  },
      { name: "Next.js",        hot: false },
      { name: "TypeScript",     hot: false },
      { name: "Tailwind",       hot: false },
      { name: "Framer Motion",  hot: false },
      { name: "Three.js",       hot: false },
    ],
  },
  {
    cat: "Backend & Data",
    items: [
      { name: "Python",         hot: true  },
      { name: "Node.js",        hot: false },
      { name: "PostgreSQL",     hot: false },
      { name: "Supabase",       hot: false },
      { name: "FastAPI",        hot: false },
      { name: "Prisma",         hot: false },
    ],
  },
  {
    cat: "AI & ML",
    items: [
      { name: "LangChain",      hot: true  },
      { name: "OpenAI API",     hot: false },
      { name: "RAG Systems",    hot: false },
      { name: "Fine-tuning",    hot: false },
      { name: "Vector DBs",     hot: false },
      { name: "Agents",         hot: false },
    ],
  },
  {
    cat: "Infrastructure",
    items: [
      { name: "Docker",         hot: true  },
      { name: "AWS",            hot: false },
      { name: "Vercel",         hot: false },
      { name: "CI/CD",          hot: false },
      { name: "GitHub Actions", hot: false },
      { name: "Linux",          hot: false },
    ],
  },
];

const STATS = [
  { num: "6+",  label: "Languages",      sub: "Python, JS, TS, SQL, Bash…" },
  { num: "20+", label: "Frameworks",     sub: "Shipped in production"       },
  { num: "3+",  label: "Cloud Providers",sub: "AWS, GCP, Vercel"            },
  { num: "∞",   label: "Curiosity",      sub: "Still learning every day"    },
];

// ── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.4,0,0.2,1], delay } },
});

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

// ── Component ─────────────────────────────────────────────────────────────────
export default function Skills() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useBreakpoint(768);
  const isTablet = useBreakpoint(1024);

  // Responsive grid columns
  const cardGridCols = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)";
  const statGridCols = isMobile ? "1fr 1fr" : isTablet ? "1fr 1fr" : "repeat(4, 1fr)";
  const gridPad      = isMobile ? "0 1rem"  : "0 2rem";
  const cardPad      = isMobile ? "1.25rem 1.25rem 1.5rem" : "1.75rem 1.75rem 2rem";

  // Copy section: stack on mobile
  const copyStyle = isMobile
    ? { ...s.copy, gridTemplateColumns: "1fr", gap: "1.5rem", padding: gridPad }
    : isTablet
    ? { ...s.copy, padding: gridPad }
    : { ...s.copy, padding: gridPad };

  return (
    <section id="experience" ref={ref} style={s.section}>
      <TargetCursor targetSelector=".cursor-target" />

      {/* ── HEADER ── */}
      <div style={s.header}>
        <div style={s.bgText} aria-hidden>
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
            EXPERTISE
          </FuzzyText>
        </div>
        <div style={s.headerInner}>
          <motion.span
            variants={fadeUp(0)} initial="hidden" animate={inView ? "show" : "hidden"}
            style={{
              ...s.eyebrow,
              fontSize: isMobile ? "clamp(1.1rem,5vw,1.6rem)" : "clamp(1.6rem,4vw,2.4rem)",
            }}
            className="cursor-target"
          >
            MY ARSENAL
          </motion.span>
          <motion.p
            variants={fadeUp(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
            style={{
              ...s.roles,
              fontSize: isMobile ? "clamp(0.55rem,2.2vw,0.72rem)" : "0.72rem",
            }}
            className="cursor-target"
          >
            Tools&nbsp;·&nbsp;Frameworks&nbsp;·&nbsp;Disciplines
          </motion.p>
        </div>
      </div>

      {/* ── WRITEUP ── */}
      <motion.div
        variants={fadeUp(0.05)} initial="hidden" animate={inView ? "show" : "hidden"}
        style={copyStyle}
        className="cursor-target"
      >
        <div>
          <div style={s.copyTag} className="cursor-target">What I bring</div>
          <h2 style={{
            ...s.copyH,
            fontSize: isMobile ? "clamp(1.5rem,6vw,2rem)" : "clamp(1.8rem,4vw,3rem)",
          }}>
            Precision tools.<br />
            Applied with <em style={s.copyEm}>intent.</em>
          </h2>
        </div>
        <p style={s.copyRight}>
          Not a stack collector. Every tool here has been used in production, under real
          pressure, to ship real products. From{" "}
          <strong style={s.strong}>LLM pipelines</strong> to{" "}
          <strong style={s.strong}>pixel-perfect UIs..</strong> I know these systems
          deeply enough to know when to use them and when not to.
        </p>
      </motion.div>

      {/* ── TICKER ── */}
      <motion.div
        variants={fadeUp(0.12)} initial="hidden" animate={inView ? "show" : "hidden"}
        style={s.tickerWrap}
      >
        <div style={s.tickerFadeLeft}  aria-hidden />
        <div style={s.tickerFadeRight} aria-hidden />
        <div style={s.tickerTrack}>
          {[...TICKER_LOGOS, ...TICKER_LOGOS].map((logo, i) => {
            const Icon = skillIconMap[logo];
            return (
              <span key={i} style={s.tickerItem}>
                <span style={s.tickerDot} />
                {Icon && (
                  <Icon style={{
                    width: 24, height: 24, marginRight: 8,
                    verticalAlign: 'middle', color: '#e01111',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))'
                  }} />
                )}
                {logo}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* ── CARD GRID ── */}
      <div style={{
        ...s.grid,
        gridTemplateColumns: cardGridCols,
        padding: gridPad,
      }}>
        {CARDS.map((card, ci) => (
          <motion.div
            key={ci}
            className="cursor-target"
            variants={fadeUp(0.1 + ci * 0.08)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.35)", y: -3 }}
            style={{ ...s.card, padding: cardPad }}
          >
            <div style={s.cardDots} aria-hidden />
            <div style={s.cardSheen} aria-hidden />
            <span style={s.cardCat}>{card.cat}</span>
            <div style={s.cardItems}>
              {card.items.map((item, ii) => (
                <motion.div
                  key={ii}
                  whileHover={{ color: "#e01111", paddingLeft: 6 }}
                  style={{
                    ...s.cardItem,
                    ...(item.hot ? s.cardItemHot : {}),
                    fontSize: isMobile
                      ? "clamp(0.95rem,3.5vw,1.15rem)"
                      : "clamp(1.1rem,2.5vw,1.5rem)",
                    borderBottom: ii < card.items.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                  }}
                >
                  {item.name}
                  {item.hot && <span style={s.hotStar}>★</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── STAT BAR ── */}
      <div style={{
        ...s.statBar,
        gridTemplateColumns: statGridCols,
        padding: gridPad,
      }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp(0.15 + i * 0.06)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            whileHover={{ borderColor: "rgba(224,17,17,0.25)" }}
            style={{
              ...s.statCard,
              padding: isMobile ? "1rem 1.1rem" : "1.25rem 1.5rem",
              gap: isMobile ? 10 : 14,
            }}
            className="cursor-target"
          >
            <div style={{
              ...s.statNum,
              fontSize: isMobile ? "1.4rem" : "1.8rem",
            }}>
              {stat.num}
            </div>
            <div style={s.statText}>
              <strong style={{
                ...s.statLabel,
                fontSize: isMobile ? "0.78rem" : "0.85rem",
              }}>
                {stat.label}
              </strong>
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  section: {
    background:    "#0a0101",
    overflow:      "hidden",
    fontFamily:    "'Exo 2', sans-serif",
    paddingBottom: "5rem",
  },

  // Header
  header: {
    position:  "relative",
    textAlign: "center",
    padding:   "3.5rem 1rem 0",
    overflow:  "hidden",
  },
  bgText: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(55px,18vw,200px)",
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
  eyebrow: {
    display:       "block",
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(1.6rem,4vw,2.4rem)",
    letterSpacing: "0.25em",
    color:         "#fff",
  },
  roles: {
    fontSize:      "0.72rem",
    letterSpacing: "0.22em",
    color:         "rgba(255,255,255,0.38)",
    textTransform: "uppercase",
    marginTop:     6,
  },

  // Writeup
  copy: {
    maxWidth:            1300,
    margin:              "3rem auto 0",
    padding:             "0 2rem",
    display:             "grid",
    gridTemplateColumns: "1fr 1fr",
    gap:                 "3rem",
    alignItems:          "end",
  },
  copyTag: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "0.72rem",
    letterSpacing: "0.28em",
    color:         "#e01111",
    textTransform: "uppercase",
    display:       "flex",
    alignItems:    "center",
    gap:           10,
    marginBottom:  "1rem",
  },
  copyH: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(1.8rem,4vw,3rem)",
    color:         "#fff",
    letterSpacing: "0.04em",
    lineHeight:    1.1,
  },
  copyEm: {
    fontStyle: "italic",
    color:     "#e01111",
  },
  copyRight: {
    fontSize:    "0.9rem",
    color:       "rgba(255,255,255,0.38)",
    lineHeight:  1.8,
    borderLeft:  "2px solid rgba(224,17,17,0.2)",
    paddingLeft: "1.5rem",
  },
  strong: {
    color:      "rgba(255,255,255,0.7)",
    fontWeight: 500,
  },

  // Ticker
  tickerWrap: {
    margin:       "3rem 0 0",
    overflow:     "hidden",
    borderTop:    "1px solid rgba(255,255,255,0.07)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding:      "1rem 0",
    position:     "relative",
  },
  tickerFadeLeft: {
    position:      "absolute",
    top: 0, left: 0,
    width:         120,
    height:        "100%",
    background:    "linear-gradient(to right, #0a0101, transparent)",
    zIndex:        2,
    pointerEvents: "none",
  },
  tickerFadeRight: {
    position:      "absolute",
    top: 0, right: 0,
    width:         120,
    height:        "100%",
    background:    "linear-gradient(to left, #0a0101, transparent)",
    zIndex:        2,
    pointerEvents: "none",
  },
  tickerTrack: {
    display:   "flex",
    gap:       "3rem",
    width:     "max-content",
    animation: "skillsTicker 32s linear infinite",
  },
  tickerItem: {
    display:       "flex",
    alignItems:    "center",
    gap:           10,
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "0.95rem",
    letterSpacing: "0.18em",
    color:         "rgba(255,255,255,0.25)",
    whiteSpace:    "nowrap",
    cursor:        "default",
    transition:    "color 0.2s",
  },
  tickerDot: {
    display:      "inline-block",
    width:        4,
    height:       4,
    borderRadius: "50%",
    background:   "#e01111",
    opacity:      0.5,
    flexShrink:   0,
  },

  // Cards
  grid: {
    maxWidth: 1300,
    margin:   "3rem auto 0",
    padding:  "0 2rem",
    display:  "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap:      10,
  },
  card: {
    background:           "rgba(17,2,2,0.6)",
    border:               "1px solid rgba(255,255,255,0.07)",
    borderRadius:         16,
    padding:              "1.75rem 1.75rem 2rem",
    position:             "relative",
    overflow:             "hidden",
    backdropFilter:       "blur(12px) saturate(1.4)",
    WebkitBackdropFilter: "blur(12px) saturate(1.4)",
    transition:           "border-color 0.25s, transform 0.25s",
    cursor:               "default",
  },
  cardDots: {
    position:        "absolute",
    inset:           0,
    backgroundImage: "radial-gradient(circle, rgba(224,17,17,0.15) 1px, transparent 1px)",
    backgroundSize:  "24px 24px",
    pointerEvents:   "none",
    opacity:         0.4,
  },
  cardSheen: {
    position:     "absolute",
    inset:        0,
    background:   "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
    pointerEvents:"none",
    borderRadius: 16,
  },
  cardCat: {
    display:       "block",
    fontFamily:    "'DM Sans', sans-serif",
    fontSize:      "0.68rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color:         "rgba(255,255,255,0.38)",
    marginBottom:  "1.5rem",
    position:      "relative",
    zIndex:        1,
  },
  cardItems: {
    display:       "flex",
    flexDirection: "column",
    position:      "relative",
    zIndex:        1,
  },
  cardItem: {
    display:       "flex",
    alignItems:    "center",
    padding:       "0.55rem 0",
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "clamp(1.1rem,2.5vw,1.5rem)",
    letterSpacing: "0.08em",
    color:         "#fff",
    transition:    "color 0.2s, padding-left 0.2s",
  },
  cardItemHot: {
    color: "#e01111",
  },
  hotStar: {
    marginLeft: "auto",
    fontSize:   "0.6rem",
    color:      "#e01111",
    opacity:    0.6,
  },

  // Stat bar
  statBar: {
    maxWidth:            1300,
    margin:              "2.5rem auto 0",
    padding:             "0 2rem",
    display:             "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap:                 10,
  },
  statCard: {
    border:       "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12,
    padding:      "1.25rem 1.5rem",
    display:      "flex",
    alignItems:   "center",
    gap:          14,
    background:   "rgba(255,255,255,0.02)",
    transition:   "border-color 0.2s",
  },
  statNum: {
    fontFamily:    "'Exo 2', sans-serif",
    fontSize:      "1.8rem",
    color:         "#e01111",
    lineHeight:    1,
    letterSpacing: "0.02em",
    flexShrink:    0,
  },
  statText: {
    fontSize:   "0.78rem",
    color:      "rgba(255,255,255,0.38)",
    lineHeight: 1.4,
  },
  statLabel: {
    display:      "block",
    color:        "rgba(255,255,255,0.65)",
    fontWeight:   500,
    fontSize:     "0.85rem",
    marginBottom: 2,
  },
};