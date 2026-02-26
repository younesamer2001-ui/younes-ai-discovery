export const gold = '#c9a96e'
export const goldLight = '#e2c47d'
export const goldDark = '#b8944a'
export const goldRgb = '201,169,110'
export const bg = '#08081a'

export const tierColors = {
  starter: '#6ee7b7',
  professional: '#c9a96e',
  growth: '#a78bfa',
}

export const fonts = {
  body: "'Inter', system-ui, -apple-system, sans-serif",
  heading: "'Inter', system-ui, -apple-system, sans-serif",
}

export const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/' // TODO: Replace with actual Google Calendar booking link when ENK is registered

export const PHONE_NUMBER = '+4778896386'

export const GA_ID = '' // TODO: Add Google Analytics ID when Google account is created

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export const globalStyles = (extraCss = '') => `
  ::selection { background: rgba(${goldRgb},0.3); }

  /* ── Gold CTA button ── */
  .gold-btn {
    background: linear-gradient(135deg, ${goldLight}, ${gold}, ${goldDark});
    color: #0a0a0f;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 24px rgba(${goldRgb}, 0.2), 0 0 0 1px rgba(${goldRgb}, 0.3);
  }
  .gold-btn:hover {
    box-shadow: 0 8px 40px rgba(${goldRgb}, 0.35), 0 0 0 1px rgba(${goldRgb}, 0.4);
    transform: translateY(-2px);
  }
  .gold-btn::after {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  .gold-btn:hover::after { transform: translateX(100%); }

  /* ── Glass button ── */
  .glass-btn {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(${goldRgb}, 0.2);
    color: ${gold};
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }
  .glass-btn:hover {
    background: rgba(${goldRgb}, 0.06);
    border-color: rgba(${goldRgb}, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(${goldRgb}, 0.1);
  }

  /* ── Glow Card ── */
  .glow-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    position: relative;
    transition: all 0.4s ease;
  }
  .glow-card:hover {
    border-color: rgba(var(--glow-color, 255,255,255), 0.12);
    box-shadow: 0 0 30px rgba(var(--glow-color, ${goldRgb}), 0.04), 0 0 60px rgba(var(--glow-color, ${goldRgb}), 0.02);
    background: rgba(255,255,255,0.025);
  }

  /* ── Gold hover for cards ── */
  .gold-hover { transition: all 0.3s ease; }
  .gold-hover:hover { border-color: rgba(${goldRgb},0.2) !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(${goldRgb},0.04); }

  /* ── Hover lift ── */
  .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .hover-lift:hover { transform: translateY(-3px); }

  /* ── Section glow ── */
  .section-glow {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 800px; height: 500px;
    background: radial-gradient(ellipse, rgba(${goldRgb}, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Gold gradient text ── */
  .text-gradient-gold {
    background: linear-gradient(135deg, ${goldLight}, ${gold}, ${goldDark});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Legacy compat */
  .cta-shimmer { background: linear-gradient(135deg, ${goldLight}, ${gold}, ${goldDark}); color: #0a0a0f; border: none; cursor: pointer; position: relative; overflow: hidden; transition: all 0.3s ease; box-shadow: 0 4px 24px rgba(${goldRgb}, 0.2); }
  .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }

  .show-mob { display: none !important; }
  @media (max-width: 768px) {
    .hide-mob { display: none !important; }
    .show-mob { display: flex !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
  }
  ${extraCss}
`
