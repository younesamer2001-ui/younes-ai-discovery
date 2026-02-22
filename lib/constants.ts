export const gold = '#c9a96e'
export const goldRgb = '201,169,110'
export const bg = '#0a0a0f'

export const tierColors = {
  starter: '#6ee7b7',
  professional: '#c9a96e',
  growth: '#a78bfa',
}

export const fonts = {
  body: "'DM Sans', sans-serif",
  heading: "'Playfair Display', serif",
}

export const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/' // TODO: Replace with actual Google Calendar booking link when ENK is registered

export const PHONE_NUMBER = '' // TODO: Add phone number when ENK is registered

export const GA_ID = '' // TODO: Add Google Analytics ID when Google account is created

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export const globalStyles = (extraCss = '') => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  ::selection { background: rgba(${goldRgb},0.3); }
  .cta-shimmer { background: linear-gradient(110deg, ${gold} 0%, #e0c88a 25%, ${gold} 50%, #a8884d 75%, ${gold} 100%); background-size: 200% 100%; animation: shimmer 3s linear infinite; }
  .cta-shimmer:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(${goldRgb},0.35) !important; }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .gold-hover { transition: all 0.3s ease; }
  .gold-hover:hover { border-color: rgba(${goldRgb},0.3) !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
  .show-mob { display: none !important; }
  @media (max-width: 768px) {
    .hide-mob { display: none !important; }
    .show-mob { display: flex !important; }
    .grid-2 { grid-template-columns: 1fr !important; }
    .grid-3 { grid-template-columns: 1fr !important; }
  }
  ${extraCss}
`
