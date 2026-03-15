import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconTelegram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const DIRECT = [
  { type: "Email",    val: "mosasiekode@gmail.com", href: "mailto:mosasiekode@gmail.com", icon: "✉" },
  { type: "Phone",    val: "+234 913 9XXX XXX",      href: "tel:+2349139300000",           icon: "📞" },
  { type: "Telegram", val: "@moseskolawole",           href: "https://t.me/moseskolawole",    icon: <IconTelegram /> },
];

const SOCIALS = [
  { name: "Email",    handle: "mosasiekode@gmail.com",     href: "mailto:mosasiekode@gmail.com",       icon: "✉" },
  { name: "GitHub",   handle: "@moseskolawole",              href: "https://github.com/moseskolawole",    icon: <IconGitHub /> },
  { name: "LinkedIn", handle: "Connect",                   href: "https://linkedin.com/in/moseskolawole", icon: <IconLinkedIn /> },
  { name: "Telegram", handle: "@moseskolawole",              href: "https://t.me/moseskolawole",           icon: <IconTelegram /> },
];

// ── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4,0,0.2,1], delay } },
});

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={s.sectionLabel}>
      {children}
      <span style={s.sectionLabelLine} />
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
export default function Contact() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-80px" });
  const isMobile = useBreakpoint(768);

  const sectionPad = isMobile ? "5rem 1.25rem 4rem" : "7rem 2.5rem 5rem";
  const colsStyle  = isMobile
    ? { ...s.cols, gridTemplateColumns: "1fr", gap: "3rem 0" }
    : s.cols;
  const subMargin  = isMobile ? "2rem" : "4rem";
  const statusMargin = isMobile ? "2rem" : "4rem";

  return (
    <section id="contact" ref={ref} style={{ ...s.section, padding: sectionPad }}>
      <TargetCursor targetSelector=".cursor-target" />

      {/* Animated gradient keyframe */}
      <style>{`
        @keyframes gradientMove {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes ctPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.3); }
        }
      `}</style>

      <div style={s.inner}>

        {/* ── HEADER ── */}
        <motion.div
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.08 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp(0)} style={s.eyebrow}>
            <span style={s.eyebrowLine} />
            <span style={s.eyebrowText}>Get In Touch</span>
          </motion.div>

          {/* "Let's Build" fuzzy heading */}
          <motion.h2 variants={fadeUp(0.05)} style={{ ...s.heading, marginBottom: "1.25rem" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:"0.1rem" }}>
              <span
                className="cursor-target"
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: isMobile ? "clamp(2.8rem,14vw,4rem)" : "clamp(3rem,7vw,5rem)",
                  fontWeight: 700,
                  background: "linear-gradient(90deg, #e01111, #fff, #e01111)",
                  backgroundSize: "200% auto",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                  animation: "gradientMove 2s linear infinite",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  filter: "drop-shadow(0 0 8px #e01111)",
                }}
              >
                <FuzzyText
                  fontFamily="'Bebas Neue',sans-serif"
                  fontSize={isMobile ? "clamp(2.8rem,14vw,4rem)" : "clamp(3rem,7vw,5rem)"}
                  fontWeight={700}
                  color="#fff"
                  enableHover={true}
                  fuzzRange={8}
                >
                  Let's Build
                </FuzzyText>
              </span>
            </div>
          </motion.h2>

          <motion.p
            variants={fadeUp(0.1)}
            style={{ ...s.sub, marginBottom: subMargin, fontSize: isMobile ? "0.9rem" : "1rem" }}
          >
            Open to <strong style={s.subStrong}>freelance projects</strong>,{" "}
            <strong style={s.subStrong}>full-time roles</strong>, and interesting
            collaborations. If you have a problem worth solving, let's talk.
          </motion.p>
        </motion.div>

        {/* ── STATUS LINE ── */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden" animate={inView ? "show" : "hidden"}
          style={{ ...s.statusRow, marginBottom: statusMargin }}
        >
          <span style={s.dot} />
          <span style={s.statusTxt}>
            <FuzzyText
              fontFamily="'Bebas Neue',sans-serif"
              fontSize="0.62rem"
              fontWeight={400}
              color="#e01111"
              enableHover={true}
              fuzzRange={6}
            >
              Available Now
            </FuzzyText>
          </span>
          <span style={s.statusSep}>·</span>
          <span className="cursor-target" style={s.statusDetail}>Remote / Lagos, NG</span>
        </motion.div>

        {/* ── TWO COLUMNS (stacked on mobile) ── */}
        <motion.div
          variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.1, delayChildren:0.2 } } }}
          initial="hidden" animate={inView ? "show" : "hidden"}
          style={colsStyle}
        >

          {/* LEFT — direct contact */}
          <motion.div variants={fadeUp(0)}>
            <SectionLabel>Direct Contact</SectionLabel>

            <div style={s.contactRows}>
              {DIRECT.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  style={s.contactRow}
                  className="cursor-target"
                >
                  <motion.span
                    variants={{ rest:{ color:"rgba(255,255,255,0.3)" }, hover:{ color:"#e01111" } }}
                    style={s.contactIcon}
                  >
                    {item.icon}
                  </motion.span>
                  <div style={s.contactMeta}>
                    <div style={s.contactType}>{item.type}</div>
                    <motion.div
                      variants={{ rest:{ color:"rgba(255,255,255,0.65)" }, hover:{ color:"#fff" } }}
                      style={{
                        ...s.contactVal,
                        fontSize: isMobile ? "0.82rem" : "0.9rem",
                        wordBreak: "break-all",
                      }}
                    >
                      {item.val}
                    </motion.div>
                  </div>
                  <motion.span
                    variants={{ rest:{ color:"rgba(255,255,255,0.15)", x:0 }, hover:{ color:"#e01111", x:4 } }}
                    style={s.arrow}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Meta / status pills */}
            <div style={s.metaRows}>
              {[
                { key:"Open to",  val:"Freelance · Full-time" },
                { key:"Response", val:"< 24 hours"            },
                { key:"Timezone", val:"WAT · UTC+1"           },
              ].map((item, i) => (
                <div key={i} style={s.metaRow} className="cursor-target">
                  <span style={s.metaKey}>{item.key}</span>
                  <span style={s.metaVal}>{item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — socials */}
          <motion.div variants={fadeUp(0.05)}>
            <SectionLabel>Online</SectionLabel>

            <div style={s.socials}>
              {SOCIALS.map((soc, i) => (
                <motion.a
                  key={i}
                  href={soc.href}
                  target={soc.href.startsWith("http") ? "_blank" : undefined}
                  rel={soc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  style={s.socialRow}
                  className="cursor-target"
                >
                  <motion.span
                    variants={{ rest:{ color:"rgba(255,255,255,0.3)" }, hover:{ color:"#e01111" } }}
                    style={s.socialIcon}
                  >
                    {soc.icon}
                  </motion.span>
                  <div style={s.socialMeta}>
                    <motion.span
                      variants={{ rest:{ color:"rgba(255,255,255,0.65)" }, hover:{ color:"#fff" } }}
                      style={s.socialName}
                    >
                      {soc.name}
                    </motion.span>
                    <motion.span
                      variants={{ rest:{ color:"rgba(255,255,255,0.25)" }, hover:{ color:"rgba(255,255,255,0.5)" } }}
                      style={s.socialHandle}
                    >
                      {soc.handle}
                    </motion.span>
                  </div>
                  <motion.span
                    variants={{ rest:{ color:"rgba(255,255,255,0.15)", x:0 }, hover:{ color:"#e01111", x:4 } }}
                    style={s.arrow}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* CTA — only visible on mobile after socials; sits naturally in flow */}
            {isMobile && (
              <motion.a
                href="mailto:mosasiekode@gmail.com"
                variants={fadeUp(0.1)}
                style={s.mobileCta}
              >
                Send a Message →
              </motion.a>
            )}
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const borderRow = "1px solid rgba(255,255,255,0.05)";

const s = {
  section: {
    position:   "relative",
    overflow:   "hidden",
    background: "#0a0101",
    fontFamily: "'Exo 2', sans-serif",
  },
  inner: {
    position: "relative",
    zIndex:   2,
    maxWidth: 1300,
    margin:   "0 auto",
  },

  // Header
  eyebrow: { display:"flex", alignItems:"center", gap:10, marginBottom:"1.5rem" },
  eyebrowLine: { width:28, height:1, background:"#e01111", flexShrink:0 },
  eyebrowText: { fontFamily:"'Exo 2',sans-serif", fontSize:"0.75rem", letterSpacing:"0.3em", color:"#e01111", textTransform:"uppercase" },
  heading: { fontFamily:"'Exo 2',sans-serif", letterSpacing:"0.03em", color:"#fff", lineHeight:1 },
  sub: {
    fontFamily: "'Exo 2',sans-serif",
    fontSize:   "1rem",
    color:      "rgba(255,255,255,0.35)",
    lineHeight: 1.75,
    maxWidth:   560,
  },
  subStrong: { color:"rgba(255,255,255,0.6)", fontWeight:500, fontFamily:"'Exo 2',sans-serif" },

  // Status
  statusRow: { display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" },
  dot: {
    width:8, height:8, borderRadius:"50%", background:"#e01111",
    flexShrink:0, animation:"ctPulse 2s ease-in-out infinite",
  },
  statusTxt: { fontFamily:"'Exo 2',sans-serif", fontSize:"0.78rem", letterSpacing:"0.2em", color:"#e01111", textTransform:"uppercase" },
  statusSep: { color:"rgba(255,255,255,0.15)", fontSize:"0.75rem" },
  statusDetail: { fontFamily:"'Exo 2',sans-serif", fontSize:"0.82rem", color:"rgba(255,255,255,0.3)" },

  // Cols
  cols: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 6rem", alignItems:"start" },

  // Section label
  sectionLabel: {
    fontFamily: "'Exo 2',sans-serif",
    fontSize: "0.65rem", letterSpacing:"0.3em", textTransform:"uppercase",
    color:"rgba(255,255,255,0.2)", marginBottom:"1.75rem",
    display:"flex", alignItems:"center", gap:10,
  },
  sectionLabelLine: { flex:1, height:1, background:"rgba(255,255,255,0.06)" },

  // Contact rows
  contactRows: { display:"flex", flexDirection:"column" },
  contactRow: {
    display:"flex", alignItems:"center", gap:16,
    padding:"1.1rem 0", borderBottom:borderRow, textDecoration:"none",
  },
  contactIcon: {
    fontSize:"1.05rem", flexShrink:0, width:22, textAlign:"center",
    display:"flex", alignItems:"center", justifyContent:"center",
  },
  contactMeta: { flex:1, minWidth:0 },
  contactType: { fontFamily:"'Exo 2',sans-serif", fontSize:"0.6rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:2 },
  contactVal: { fontSize:"0.9rem", fontWeight:500 },
  arrow: { fontSize:"0.85rem", flexShrink:0 },

  // Meta rows
  metaRows: { display:"flex", flexDirection:"column", marginTop:"2.5rem" },
  metaRow: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.75rem 0", borderBottom:borderRow },
  metaKey: { fontSize:"0.8rem", color:"rgba(255,255,255,0.25)" },
  metaVal: { fontFamily:"'Exo 2',sans-serif", fontSize:"0.75rem", letterSpacing:"0.1em", color:"rgba(255,255,255,0.55)", textTransform:"uppercase" },

  // Socials
  socials: { display:"flex", flexDirection:"column" },
  socialRow: { display:"flex", alignItems:"center", gap:16, padding:"1.1rem 0", borderBottom:borderRow, textDecoration:"none" },
  socialIcon: { fontSize:"1.05rem", flexShrink:0, width:22, display:"flex", alignItems:"center", justifyContent:"center" },
  socialMeta: { flex:1, display:"flex", flexDirection:"column", gap:2 },
  socialName: { fontFamily:"'Exo 2',sans-serif", fontSize:"1rem", letterSpacing:"0.06em", display:"block" },
  socialHandle: { fontSize:"0.75rem", display:"block" },

  // Mobile-only CTA button
  mobileCta: {
    display: "block",
    marginTop: "2rem",
    padding: "0.85rem 1.5rem",
    background: "#e01111",
    color: "#fff",
    fontFamily: "'Exo 2',sans-serif",
    fontSize: "0.82rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    textDecoration: "none",
    borderRadius: 999,
    textAlign: "center",
  },
};