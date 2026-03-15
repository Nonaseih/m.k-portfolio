import React, { useEffect } from "react";
import { motion } from "framer-motion";

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

// ── Data ──────────────────────────────────────────────────────────────────────
const SITEMAP = [
  { label: "Home",       href: "#hero"       },
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

const SOCIALS = [
  { label: "GitHub",      href: "https://github.com/yourgithub" },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/jesutofunmi-kolawole-321696229" },
  { label: "Twitter / X", href: "https://x.com/Boanerges50" },
  { label: "Telegram",    href: "https://t.me/majib_18" },
];

const QUOTES = [
  "The best way to predict the future is to invent it.",
  "Simplicity is the ultimate sophistication.",
  "Creativity is intelligence having fun.",
];

// ── Logo ──────────────────────────────────────────────────────────────────────
function LogoGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="6" fill="#1a0202"/>
      <rect x="0.5" y="0.5" width="35" height="35" rx="5.5" stroke="rgba(224,17,17,0.3)"/>
      <path d="M8 26V10L18 20L28 10V26" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M8 10L18 20L28 10" stroke="#e01111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9"/>
    </svg>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <span style={s.sectionLabel}>{children}</span>;
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const isMobile = useBreakpoint(768);

  const handleLogoClick = (e) => {
    e.preventDefault();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer style={{ ...s.footer, padding: isMobile ? "3rem 1.25rem 2rem" : "4rem 2.5rem" }}>

      {/* ── MAIN GRID ── */}
      <div style={{
        ...s.inner,
        gridTemplateColumns: isMobile ? "1fr 1fr" : "auto 1fr 1fr auto",
        gap: isMobile ? "2rem" : "3rem",
      }}>

        {/* Logo — full width on mobile */}
        <a
          href="#hero"
          style={{ ...s.logo, gridColumn: isMobile ? "1 / -1" : "auto" }}
          className="cursor-target"
          onClick={handleLogoClick}
        >
          <LogoGlyph />
          MK<span style={{ color: "#e01111" }}>.</span>
        </a>

        {/* Sitemap */}
        <div>
          <SectionLabel>Sitemap</SectionLabel>
          <div style={s.links}>
            {SITEMAP.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ color: "#fff" }}
                style={s.link}
                className="cursor-target"
                onClick={e => handleNavClick(e, href)}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div>
          <SectionLabel>Socials</SectionLabel>
          <div style={s.links}>
            {SOCIALS.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ color: "#fff" }}
                style={s.link}
                className="cursor-target"
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Back to top — full width on mobile, right-aligned on desktop */}
        <div style={{
          display: "flex",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: isMobile ? "center" : "flex-start",
          gridColumn: isMobile ? "1 / -1" : "auto",
        }}>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ color: "#fff" }}
            style={s.topBtn}
            aria-label="Back to top"
            className="cursor-target"
          >
            Back to Top
            <motion.span
              whileHover={{ borderColor: "rgba(224,17,17,0.5)", color: "#e01111" }}
              style={s.topCircle}
              className="cursor-target"
            >↑</motion.span>
          </motion.button>
        </div>

      </div>

      {/* ── QUOTES ── */}
      <div style={{
        ...s.quotesBlock,
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "1rem" : "0",
        padding: isMobile ? "2rem 0" : "2.5rem 0 2rem",
        alignItems: "center",
      }}>
        {QUOTES.map((q, i) => (
          <React.Fragment key={i}>
            <blockquote style={{
              ...s.quote,
              fontSize: isMobile ? "0.82rem" : "0.88rem",
              flex: isMobile ? "unset" : 1,
              textAlign: "center",
              padding: isMobile ? "0 0.5rem" : "0 1.5rem",
              borderLeft: isMobile ? "none" : (i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none"),
              borderTop: isMobile ? (i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none") : "none",
              paddingTop: isMobile && i > 0 ? "1rem" : undefined,
            }}>
              "{q}"
            </blockquote>
          </React.Fragment>
        ))}
      </div>

      {/* ── NOTE ROW ── */}
      <div style={{
        ...s.noteRow,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "0.6rem" : "1rem",
      }}>
        <p style={s.noteTxt}>
          <strong className="cursor-target" style={{ color:"rgba(255,255,255,0.45)", fontWeight:500 }}>
            Prefer no forms?
          </strong>
          {" "}Hit "Let's Talk" at the navbar.
        </p>
        <span
          className="cursor-target"
          style={{
            fontFamily: "'Exo 2',sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ↩ Responds within 24h
        </span>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        ...s.bottom,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "0.4rem" : "0.75rem",
      }}>
        <span style={s.copy}>© {new Date().getFullYear()} Moses Kolawole. All rights reserved.</span>
        <span style={s.credit}>Built with <span style={{ color:"#e01111" }}>♥</span> &amp;&amp; lots of coffee</span>
      </div>

    </footer>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  footer: {
    background: "#0a0101",
    borderTop:  "1px solid rgba(255,255,255,0.06)",
    fontFamily: "'DM Sans', sans-serif",
  },
  inner: {
    maxWidth:            1300,
    margin:              "0 auto",
    display:             "grid",
    gridTemplateColumns: "auto 1fr 1fr auto",
    gap:                 "3rem",
    alignItems:          "start",
  },
  logo: {
    display:        "flex",
    alignItems:     "center",
    gap:            10,
    fontFamily:     "'Bebas Neue', sans-serif",
    fontSize:       "1rem",
    letterSpacing:  "0.1em",
    color:          "#fff",
    textDecoration: "none",
  },
  sectionLabel: {
    display:       "block",
    fontFamily:    "'Bebas Neue', sans-serif",
    fontSize:      "0.62rem",
    letterSpacing: "0.28em",
    color:         "rgba(255,255,255,0.2)",
    textTransform: "uppercase",
    marginBottom:  "1rem",
    paddingBottom: "0.75rem",
    borderBottom:  "1px solid rgba(255,255,255,0.06)",
  },
  links: { display:"flex", flexDirection:"column", gap:"0.55rem" },
  link: {
    fontSize:       "0.85rem",
    color:          "rgba(255,255,255,0.45)",
    textDecoration: "none",
    transition:     "color 0.2s",
    display:        "block",
  },
  topBtn: {
    display:       "flex",
    alignItems:    "center",
    gap:           8,
    fontFamily:    "'Bebas Neue', sans-serif",
    fontSize:      "0.68rem",
    letterSpacing: "0.2em",
    color:         "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    background:    "transparent",
    border:        "none",
    cursor:        "pointer",
    padding:       0,
    transition:    "color 0.2s",
    whiteSpace:    "nowrap",
  },
  topCircle: {
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    width:          32,
    height:         32,
    borderRadius:   "50%",
    border:         "1px solid rgba(255,255,255,0.12)",
    fontSize:       "0.9rem",
    color:          "rgba(255,255,255,0.4)",
    transition:     "border-color 0.2s, color 0.2s",
  },
  quotesBlock: {
    maxWidth:   1300,
    margin:     "0 auto",
    display:    "flex",
    borderTop:  "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  quote: {
    color:      "rgba(255,255,255,0.35)",
    fontStyle:  "italic",
    lineHeight: 1.7,
    margin:     0,
  },
  noteRow: {
    maxWidth:    1300,
    margin:      "0 auto",
    paddingTop:  "1.5rem",
    paddingBottom: "1.5rem",
    display:     "flex",
    alignItems:  "center",
    justifyContent: "space-between",
    flexWrap:    "wrap",
    gap:         "1rem",
  },
  noteTxt: {
    fontSize:   "0.82rem",
    color:      "rgba(255,255,255,0.22)",
    maxWidth:   500,
    lineHeight: 1.7,
    margin:     0,
  },
  bottom: {
    maxWidth:       1300,
    margin:         "0 auto",
    paddingTop:     "1.5rem",
    borderTop:      "1px solid rgba(255,255,255,0.05)",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    flexWrap:       "wrap",
    gap:            "0.75rem",
  },
  copy:   { fontSize:"0.75rem", color:"rgba(255,255,255,0.2)" },
  credit: { fontSize:"0.72rem", color:"rgba(255,255,255,0.18)" },
};