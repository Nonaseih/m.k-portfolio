import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// ── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",       id: "hero"       },
  { label: "About",      id: "about"      },
  { label: "Experience", id: "experience" },
  { label: "Projects",   id: "projects"   },
  { label: "Contact",    id: "contact"    },
];

// ── ContactDrawer ─────────────────────────────────────────────────────────────
function ContactDrawer({ open, onClose }) {
  const [sent, setSent]   = useState(false);
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSent(false), 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={ds.backdrop}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={ds.drawer}
          >
            {/* Header */}
            <div style={ds.header}>
              <div>
                <div style={ds.eyebrow}>
                  <span style={ds.eyebrowDot} />
                  Available Now
                </div>
                <div style={ds.titleBlock}>
                  <span style={ds.titleMain}>Let's Build</span>
                  <span style={ds.titleItalic}>Something.</span>
                </div>
              </div>
              <button onClick={handleClose} style={ds.closeBtn} aria-label="Close">✕</button>
            </div>

            {/* Body */}
            <div style={ds.body}>
              {!sent ? (
                <>
                  <div style={ds.quickRows}>
                    {[
                      { type: "Email",    val: "mosasiekode@gmail.com", href: "mailto:mosasiekode@gmail.com", bg: "rgba(224,17,17,0.1)",  bc: "rgba(224,17,17,0.2)",  icon: "✉" },
                      { type: "Telegram", val: "@moseskolawole",         href: "https://t.me/moseskolawole",   bg: "rgba(29,161,242,0.1)", bc: "rgba(29,161,242,0.2)", icon: "✈" },
                    ].map((item) => (
                      <motion.a
                        key={item.type}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        whileHover={{ background: "rgba(224,17,17,0.04)", borderColor: "rgba(224,17,17,0.2)" }}
                        style={ds.quickRow}
                      >
                        <div style={{ ...ds.quickIcon, background: item.bg, border: `1px solid ${item.bc}` }}>{item.icon}</div>
                        <div>
                          <div style={ds.quickType}>{item.type}</div>
                          <div style={ds.quickVal}>{item.val}</div>
                        </div>
                        <motion.span whileHover={{ x: 3, color: "#e01111" }} style={ds.arrow}>→</motion.span>
                      </motion.a>
                    ))}
                  </div>

                  <div style={ds.divider}>
                    <span style={ds.dividerLine} />
                    <span style={ds.dividerTxt}>Or send a message</span>
                    <span style={ds.dividerLine} />
                  </div>

                  <form onSubmit={handleSubmit} style={ds.form}>
                    <div style={ds.formRow}>
                      <div style={ds.formGroup}>
                        <label style={ds.label}>Name</label>
                        <input style={ds.input} type="text" placeholder="Your name" required
                          value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div style={ds.formGroup}>
                        <label style={ds.label}>Email</label>
                        <input style={ds.input} type="email" placeholder="your@email.com" required
                          value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                    </div>
                    <div style={ds.formGroup}>
                      <label style={ds.label}>Subject</label>
                      <input style={ds.input} type="text" placeholder="What's this about?"
                        value={form.subject} onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))} />
                    </div>
                    <div style={ds.formGroup}>
                      <label style={ds.label}>Message</label>
                      <textarea
                        style={{ ...ds.input, resize: "none", height: 110 }}
                        placeholder="Tell me about your project..." required rows={4}
                        value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                    <div style={ds.formFooter}>
                      <motion.button
                        type="submit"
                        whileHover={{ background: "#cc0f0f", boxShadow: "0 0 20px rgba(224,17,17,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        style={ds.submitBtn}
                      >
                        Send Message →
                      </motion.button>
                      <button type="button" onClick={handleClose} style={ds.cancelBtn}>Cancel</button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={ds.success}
                >
                  <div style={ds.successIcon}>✓</div>
                  <h3 style={ds.successTitle}>Message Sent.</h3>
                  <p style={ds.successSub}>Thanks for reaching out.. I'll get back to you within 24 hours.</p>
                  <motion.button
                    whileHover={{ background: "#cc0f0f" }} whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    style={{ ...ds.submitBtn, width: "auto", padding: "10px 28px", flex: "none" }}
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  // ── ALL hooks declared first, unconditionally ─────────────────────────────
  const [active,      setActive]      = useState(NAV_LINKS[0].label);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [isMobile,    setIsMobile]    = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [scrolled,    setScrolled]    = useState(false);

  // Resize → isMobile
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll → scrolled flag + active section highlight
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollY = window.scrollY + 100; // offset for fixed navbar
      let current = NAV_LINKS[0].label;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= scrollY) current = link.label;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (id, label) => (e) => {
    // Only prevent default if JS is enabled
    if (e && e.preventDefault) e.preventDefault();
    setActive(label);
    // For mobile, close menu first, then scroll
    if (isMobile) {
      setMobileOpen(false);
      setTimeout(() => scrollTo(id), 350); // Wait for menu animation
    } else {
      scrollTo(id);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <nav style={nav.bar}>
        <div style={nav.inner}>

          {/* Logo */}
          <a
            href="#hero"
            onClick={handleNavClick("hero", "Home")}
            style={nav.logo}
            className="cursor-target"
          >
            <LogoGlyph />
            <motion.span
              style={nav.wordmark}
              animate={{ opacity: scrolled ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              MOSES<span style={{ color: "#e01111" }}>.</span>
            </motion.span>
          </a>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {NAV_LINKS.map((link) => (
                <div key={link.label} style={nav.linkRow} className="cursor-target">
                  <motion.a
                    href={`#${link.id}`}
                    onClick={handleNavClick(link.id, link.label)}
                    style={{
                      ...nav.link,
                      color: active === link.label ? "#fff" : "rgba(255,255,255,0.55)",
                    }}
                    whileHover="hover"
                  >
                    {link.label}
                    <motion.span
                      style={nav.underline}
                      animate={active === link.label ? { scaleX: 1 } : { scaleX: 0 }}
                      variants={{ hover: { scaleX: 1 } }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </motion.a>
                </div>
              ))}
            </div>
          )}

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Desktop CTA */}
            {!isMobile && (
              <motion.button
                whileHover={{ background: "#e01111", color: "#fff", boxShadow: "0 0 24px rgba(224,17,17,0.45)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDrawerOpen(true)}
                style={nav.cta}
                animate={{ opacity: scrolled ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="cursor-target"
              >
                Let's Talk
              </motion.button>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <button
                onClick={() => setMobileOpen(v => !v)}
                style={nav.ham}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {[
                  { w: 24, color: "#fff"    },
                  { w: 16, color: "#e01111" },
                  { w: 20, color: "#fff"    },
                ].map(({ w, color }, i) => (
                  <motion.span
                    key={i}
                    animate={
                      mobileOpen
                        ? i === 0 ? { width: 24, rotate: -42, y: 6.5 }
                        : i === 1 ? { opacity: 0, x: 10 }
                        : { width: 24, rotate: 42, y: -6.5 }
                        : { width: w, rotate: 0, opacity: 1, x: 0, y: 0 }
                    }
                    transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      display: "block",
                      height: 1.5,
                      borderRadius: 2,
                      transformOrigin: "center",
                      width: w,
                      background: color,
                    }}
                  />
                ))}
              </button>
            )}
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {mobileOpen && isMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              style={{
                overflow: "hidden",
                background: "rgba(10,1,1,0.97)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open:   { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
                  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                }}
                style={{
                  padding: "1rem 1.5rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={`#${link.id}`}
                    onClick={handleNavClick(link.id, link.label)}
                    variants={{
                      open:   { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -16 },
                    }}
                    whileHover={{ x: 5 }}
                    style={{
                      display: "block",
                      background: active === link.label ? "rgba(224,17,17,0.06)" : "transparent",
                      borderLeft: `2px solid ${active === link.label ? "#e01111" : "transparent"}`,
                      color: active === link.label ? "#fff" : "rgba(255,255,255,0.45)",
                      fontFamily: "'Exo 2', sans-serif",
                      fontWeight: 200,
                      fontSize: "0.78rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      padding: "9px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      borderRadius: "0 6px 6px 0",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile Let's Talk CTA */}
                <motion.button
                  variants={{
                    open:   { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -16 },
                  }}
                  onClick={() => { setMobileOpen(false); setDrawerOpen(true); }}
                  style={{
                    background:   "rgba(224,17,17,0.06)",
                    borderLeft:   "2px solid #e01111",
                    borderTop:    "none",
                    borderRight:  "none",
                    borderBottom: "none",
                    color:        "#e01111",
                    fontFamily:   "'Exo 2', sans-serif",
                    fontWeight:   200,
                    fontSize:     "0.78rem",
                    letterSpacing:"0.18em",
                    textTransform:"uppercase",
                    padding:      "9px 16px",
                    textAlign:    "left",
                    cursor:       "pointer",
                    borderRadius: "0 6px 6px 0",
                    marginTop:    8,
                  }}
                >
                  Let's Talk
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// ── Nav styles ────────────────────────────────────────────────────────────────
const nav = {
  bar: {
    position:        "fixed",
    top:             0,
    left:            0,
    width:           "100%",
    zIndex:          50,
    background:      "none",
    padding:         "0.6rem 0",
  },
  inner: {
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "space-between",
    maxWidth:        1400,
    margin:          "0 auto",
    padding:         "0 1rem",
    gap:             "1.5rem",
  },
  logo: {
    display:         "flex",
    alignItems:      "center",
    gap:             "0.4rem",
    textDecoration:  "none",
    flexShrink:      0,
  },
  wordmark: {
    fontFamily:      "'Exo 2', sans-serif",
    fontWeight:      700,
    fontSize:        "1rem",
    color:           "#fff",
    letterSpacing:   "0.04em",
  },
  linkRow: {
    display:              "flex",
    alignItems:           "center",
    gap:                  "0.25rem",
    background:           "rgba(30,20,20,0.18)",
    borderRadius:         "2rem",
    padding:              "0.25rem 0.6rem",
    backdropFilter:       "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    boxShadow:            "0 2px 12px 0 rgba(224,17,17,0.08)",
  },
  link: {
    position:        "relative",
    fontWeight:      600,
    fontSize:        "1.05rem",
    textDecoration:  "none",
    padding:         "3px 7px",
    borderRadius:    "999px",
    transition:      "color 0.25s",
    cursor:          "pointer",
    whiteSpace:      "nowrap",
  },
  underline: {
    display:         "block",
    position:        "absolute",
    left:            14,
    right:           14,
    bottom:          2,
    height:          2,
    background:      "#e01111",
    borderRadius:    2,
    transformOrigin: "left",
  },
  cta: {
    background:   "#fff",
    color:        "#1a0202",
    fontWeight:   700,
    fontSize:     "1.08rem",
    border:       "none",
    borderRadius: "2rem",
    padding:      "0.7rem 2.2rem",
    boxShadow:    "0 2px 16px rgba(0,0,0,0.07)",
    cursor:       "pointer",
    transition:   "background 0.2s, color 0.2s",
    flexShrink:   0,
  },
  ham: {
    display:        "flex",
    flexDirection:  "column",
    gap:            5,
    width:          32,
    height:         32,
    justifyContent: "center",
    alignItems:     "flex-end",
    background:     "transparent",
    border:         "none",
    cursor:         "pointer",
    padding:        0,
  },
};

// ── Drawer styles ─────────────────────────────────────────────────────────────
const ds = {
  backdrop:     { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 998 },
  drawer:       { position: "fixed", top: 0, right: 0, height: "100%", width: "min(440px, 100vw)", background: "#0d0101", borderLeft: "1px solid rgba(255,255,255,0.07)", zIndex: 999, display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(0,0,0,0.6)" },
  header:       { padding: "1.75rem 1.75rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 },
  eyebrow:      { display: "flex", alignItems: "center", gap: 7, fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.62rem", letterSpacing: "0.28em", color: "#e01111", textTransform: "uppercase", marginBottom: "0.35rem" },
  eyebrowDot:   { display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#e01111" },
  titleBlock:   { display: "flex", flexDirection: "column", lineHeight: 1 },
  titleMain:    { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.9rem", fontWeight: 700, color: "#fff", letterSpacing: "0.04em" },
  titleItalic:  { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.9rem", fontStyle: "italic", color: "#e01111", letterSpacing: "0.04em" },
  closeBtn:     { width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s, color 0.2s", flexShrink: 0, marginTop: 2 },
  body:         { flex: 1, overflowY: "auto", padding: "1.5rem 1.75rem 1rem", display: "flex", flexDirection: "column", gap: "1rem" },
  quickRows:    { display: "flex", flexDirection: "column", gap: 0 },
  quickRow:     { display: "flex", alignItems: "center", gap: 14, padding: "0.85rem 0.75rem", borderRadius: 10, textDecoration: "none", border: "1px solid transparent", transition: "background 0.2s, border-color 0.2s" },
  quickIcon:    { width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 },
  quickType:    { fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 2 },
  quickVal:     { fontSize: "0.88rem", fontWeight: 500, color: "rgba(255,255,255,0.75)" },
  arrow:        { color: "rgba(255,255,255,0.2)", fontSize: "0.82rem", marginLeft: "auto", flexShrink: 0 },
  divider:      { display: "flex", alignItems: "center", gap: 10 },
  dividerLine:  { flex: 1, height: 1, background: "rgba(255,255,255,0.06)", display: "block" },
  dividerTxt:   { fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" },
  form:         { display: "flex", flexDirection: "column", gap: "0.85rem" },
  formRow:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" },
  formGroup:    { display: "flex", flexDirection: "column", gap: 5 },
  label:        { fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" },
  input:        { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "0.75rem 1rem", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s" },
  formFooter:   { display: "flex", gap: 10, marginTop: 4 },
  submitBtn:    { flex: 1, background: "#e01111", color: "#fff", border: "none", borderRadius: 10, padding: 13, fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.12em", cursor: "pointer", transition: "background 0.2s, box-shadow 0.2s" },
  cancelBtn:    { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px 18px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", cursor: "pointer", transition: "background 0.2s, color 0.2s" },
  success:      { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "2rem", textAlign: "center" },
  successIcon:  { width: 56, height: 56, borderRadius: "50%", background: "rgba(224,17,17,0.12)", border: "1px solid rgba(224,17,17,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", color: "#e01111" },
  successTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "#fff", letterSpacing: "0.06em" },
  successSub:   { fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 280 },
};

export default Navbar;
export const SimpleNavbar = Navbar;