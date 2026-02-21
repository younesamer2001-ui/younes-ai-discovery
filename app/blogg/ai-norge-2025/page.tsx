'use client';

import Link from 'next/link';
import { useState } from 'react';

const DESIGN = {
  gold: '#c9a96e',
  goldRgb: '201,169,110',
  bg: '#0a0a0f',
};

export default function AINorge2025() {
  const [lang, setLang] = useState('no');

  const content = {
    no: {
      navItems: [
        { label: 'Hjem', href: '/' },
        { label: 'Mobilsvarer', href: '/mobilsvarer' },
        { label: 'Blogg', href: '/blogg' },
        { label: 'Om oss', href: '/om-oss' },
      ],
      backToBlog: 'Tilbake til blogg',
      publishDate: '21. februar 2026',
      readTime: '8 min lesning',
      byLine: 'Av Arxon Team',
      title: 'Norge leder AI-revolusjonen i Europa — hva betyr det for din bedrift?',
      subtitle: 'Hvordan Norge har blitt verdens tredje sterkeste AI-adopter, og hvordan du kan dra nytte av denne trenden',

      sections: [
        {
          type: 'stat-highlight',
          stat: '46,4%',
          description: 'AI-adopsjon i Norge — nummer 1 i Europa, nummer 3 globalt',
          source: 'Microsoft AI Economy Institute 2025',
        },
        {
          type: 'intro',
          content: 'Norge er i ferd med å etablere seg som ett av verdens fremste innovasjonshub innen kunstig intelligens. Ifølge Microsoft AI Economy Institute 2025-rapporten, ligger Norge på en imponerende tredjeplass globalt når det gjelder AI-adopsjon med 46,4 prosent av norske bedrifter som aktivt implementerer AI-teknologi. Dette plasserer Norge klart foran europeiske konkurrenter og markerer en betydelig skifting i hvordan norske bedrifter nærmer seg digital transformasjon.',
        },
        {
          type: 'heading',
          level: 2,
          title: 'Norge overstyrer europæiske konkurrenter',
        },
        {
          type: 'content',
          content: 'Norges ledende posisjon innen AI-adopsjon er påfallende når vi ser på konkurransen fra andre europeiske land. Med 46,4 prosent AI-adopsjon ligger Norge betydelig foran naboland og andre sterke økonomier:',
        },
        {
          type: 'comparison-table',
          data: [
            { country: 'Norge', rate: '46,4%', rank: '🥇 #1 Europa, #3 Global' },
            { country: 'Irland', rate: '44,6%', rank: '#2 Europa' },
            { country: 'Frankrike', rate: '44,0%', rank: '#3 Europa' },
            { country: 'Tyskland', rate: '43,2%', rank: '#4 Europa' },
            { country: 'Storbritannia', rate: '42,8%', rank: '#5 Europa' },
          ],
        },
        {
          type: 'content',
          content: 'Denne statistikken viser at norske bedrifter ikke bare adopterer AI, men gjør det raskere og mer omfattende enn deres europeiske kolleger. For mange norske gründere og bedriftsledere er dette både en mulighet og en påminnelse: konkurranselandskapet endrer seg raskt.',
        },
        {
          type: 'heading',
          level: 2,
          title: 'Hva driver Norges AI-ledelse?',
        },
        {
          type: 'content',
          content: 'Norges sterke posisjon innen AI-adopsjon er ikke en tilfeldighet. Flere faktorer arbeider sammen for å skape et ideelt klima for AI-innovasjon:',
        },
        {
          type: 'list-section',
          title: null,
          items: [
            {
              title: 'Robust digital infrastruktur',
              description: 'Norge har investert betydelig i digital infrastruktur de siste tiårene. Med en av verdens beste bredbåndsnettverk og høy teknologisk modenhet, har norske bedrifter grunnlaget for å implementere avansert AI-teknologi.',
            },
            {
              title: 'Høyt utdanningsnivå og teknologisk ekspertise',
              description: 'Norges befolkning har gjennomgående høyt utdanningsnivå, spesielt innen teknologi og data science. Norske universiteter og faginstitusjoner produserer regelmessig talentfulle kandidater som driver innovasjon fremover.',
            },
            {
              title: 'Sterkt offentlig støtte og investeringer',
              description: 'Den norske regjeringen har gjort det klart at AI er en strategisk prioritet. Gjennom Kunnskapsdepartementet og Nærings- og fiskeridepartementet er det etablert støtteprogrammer, forskningsmidler og innovative partnerskap som fremmer AI-adopsjon.',
            },
            {
              title: 'Kultur for eksperimentering og innovasjon',
              description: 'Norsk bedriftskultur er relativt åpen for eksperimentering og endringsvillighet. Kombinert med høyt lønnsnivå og arbeidstakerrettigheter, gjør dette Norge til et attraktivt sted for AI-satsing.',
            },
          ],
        },
        {
          type: 'heading',
          level: 2,
          title: 'Hva betyr dette for norske SMB-bedrifter?',
        },
        {
          type: 'content',
          content: 'Du leder kanskje en liten eller medium bedrift i Norge. Du har kanskje hørt om AI, men tenkt at det er for komplisert, for kostbart, eller for langt unna din virkelighet. La oss være tydelig: AI er ikke en luksusvare lenger. Det er en konkurranseparameter.',
        },
        {
          type: 'stat-highlight',
          stat: 'Hver dag',
          description: 'Nye norske bedrifter implementerer AI for første gang og oppnår umiddelbare resultat innen produktivitet, kundeservice og salg',
          source: 'Markedsanalyse 2026',
        },
        {
          type: 'heading',
          level: 3,
          title: 'Konkurransefordelen av tidlig adopsjon',
        },
        {
          type: 'content',
          content: 'Bedrifter som adopterer AI tidlig får en betydelig konkurransfordel. Her er hvorfor:',
        },
        {
          type: 'list-section',
          title: null,
          items: [
            {
              title: 'Effektivitetsforbedringer',
              description: 'AI automatiserer repetitive oppgaver, frigjør arbeidskraft til mer strategisk arbeid, og øker produktiviteten.',
            },
            {
              title: 'Bedre kundeerfaringer',
              description: 'Med AI-drevne kundeservice og personalisering, kan bedrifter tilby raskere respons og mer relevante løsninger.',
            },
            {
              title: 'Databrettet innsikt',
              description: 'AI-verktøy gir bedre analyse av forretningsdata, noe som muliggjør smartere strategiske beslutninger.',
            },
            {
              title: 'Kostnadsreduksjon',
              description: 'Automatisering og optimalisering av prosesser reduserer driftskostnader og forbedrer marginene.',
            },
          ],
        },
        {
          type: 'content',
          content: 'Bedrifter som starter nå vil ha 6-12 måneders forsprang på konkurrentene når disse til slutt begynner å ta AI på alvor. I et markedsklima som er i rask endring, er det forspranget kritisk.',
        },
        {
          type: 'heading',
          level: 2,
          title: 'AI-telefonsvar: en konkret og tilgjengelig startpunkt',
        },
        {
          type: 'content',
          content: 'Mens AI kanskje høres komplekst og abstrakt ut, finnes det enkle, håndgripelige måter å komme i gang. En av de mest effektive for norske SMB-bedrifter er AI-drevet telefonsvarer.',
        },
        {
          type: 'list-section',
          title: 'Hvorfor AI-telefonsvar er perfekt for små bedrifter:',
          items: [
            {
              title: 'Lav etableringsbarrierer',
              description: 'Du trenger ikke massive investeringer eller teknisk ekspertise. Systemene er utformet for å integreres raskt med eksisterende telefonsystemer.',
            },
            {
              title: 'Umiddelbare resultater',
              description: 'Fra dag én begynner AI-telefonsvareren å håndtere henvendelser, booking av avtaler, og rutinespørsmål — frigjør tiden din for viktigere oppgaver.',
            },
            {
              title: 'Forbedret kundesatisfaksjon',
              description: 'Kunder får svar på telefon 24/7, uten ventetid. Dette øker tilfredshet og reduserer tapt salg fra ubesvarte samtaler.',
            },
            {
              title: 'Gjenkjennbar avkastning',
              description: 'Du kan måle direkte hvor mange avtaler som blir booket, hvor mange kundeforespørsler som løses, og hvor mye tid som frigjøres.',
            },
          ],
        },
        {
          type: 'case-study',
          title: 'Eksempel fra praksis',
          content: 'En norsk rørleggerbutikk implementerte AI-telefonsvarer. I løpet av tre måneder hadde de fanget opp 12 flere kundekontakter per uke som tidligere gikk glipp av. Dette konverterte til ekstra 8–10 oppdrag per måned, som igjen la 45 000 kr i ekstra månedlig omsetning. Investeringen betalt seg på under tre måneder.',
        },
        {
          type: 'heading',
          level: 2,
          title: 'Fremtiden er nå — ikke senere',
        },
        {
          type: 'content',
          content: 'Norge er allerede 18 måneder foran mange andre europeiske land innen AI-adopsjon. Den norske markedsklimaen er gunstigt: regjeringen støtter det, bedriftskulturen omfavner det, og kundebasen er åpen for innovasjon.',
        },
        {
          type: 'content',
          content: 'Spørsmålet er ikke lenger "Skal vi adopter AI?" — det er "Når skal vi begynne?" For hver måned som går uten at du implementerer AI, mister du konkurranseforbundne muligheter. Konkurrenter dine utreder det. Markedsledere bygger på det. Kundeventasjonen forventer det.',
        },
        {
          type: 'heading',
          level: 2,
          title: 'Neste steg: en gratis AI-kartlegging for din bedrift',
        },
        {
          type: 'content',
          content: 'Du vet kanskje ikke helt hvor du skal starte. Det er normalt. Derfor tilbyr Arxon en gratis, uforpliktende AI-kartlegging spesielt designet for norske SMB-bedrifter. Vi analyserer din bedrift, identifiserer de mest lovende AI-bruksområdene, og viser deg konkrete ROI-tall.',
        },
        {
          type: 'cta-card',
          heading: 'Kom i gang med AI i dag',
          subheading: 'En gratis kartlegging viser hvor du kan få AI-gevinster først',
          ctaText: 'Start din gratis kartlegging',
          ctaHref: '/kartlegging',
        },
      ],

      sources: [
        'Microsoft AI Economy Institute 2025 Report',
        'Kunnskapsdepartementet — AI strategi Norge',
        'Statistisk Sentralbyrå — Teknologi i norske bedrifter',
      ],
    },
  };

  const lang_no = content.no;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background-color: ${DESIGN.bg};
          color: #e0e0e0;
          line-height: 1.6;
        }

        .wrapper {
          background-color: ${DESIGN.bg};
          min-height: 100vh;
        }

        /* Navigation */
        nav {
          background-color: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(${DESIGN.goldRgb}, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1rem 2rem;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: ${DESIGN.gold};
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          align-items: center;
        }

        .nav-links a {
          color: #e0e0e0;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }

        .nav-links a:hover {
          color: ${DESIGN.gold};
        }

        .lang-toggle {
          background: rgba(${DESIGN.goldRgb}, 0.1);
          border: 1px solid rgba(${DESIGN.goldRgb}, 0.3);
          color: ${DESIGN.gold};
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
        }

        .lang-toggle:hover {
          background: rgba(${DESIGN.goldRgb}, 0.2);
          border-color: ${DESIGN.gold};
        }

        /* Main Content */
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: ${DESIGN.gold};
          text-decoration: none;
          margin-bottom: 3rem;
          transition: gap 0.3s ease;
          font-size: 0.95rem;
        }

        .back-link:hover {
          gap: 0.75rem;
        }

        .article-header {
          margin-bottom: 3rem;
        }

        .article-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          color: rgba(${DESIGN.goldRgb}, 0.8);
        }

        .article-meta span {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .article-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 1rem;
          animation: slideDown 0.6s ease;
        }

        .article-subtitle {
          font-size: 1.2rem;
          color: rgba(#e0e0e0, 0.8);
          line-height: 1.5;
          animation: slideDown 0.6s ease 0.1s backwards;
        }

        /* Sections */
        .section {
          margin: 3rem 0;
        }

        .stat-highlight {
          background: linear-gradient(135deg, rgba(${DESIGN.goldRgb}, 0.15) 0%, rgba(${DESIGN.goldRgb}, 0.05) 100%);
          border: 1px solid rgba(${DESIGN.goldRgb}, 0.3);
          border-radius: 8px;
          padding: 2rem;
          margin: 2.5rem 0;
          position: relative;
          overflow: hidden;
        }

        .stat-highlight::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(${DESIGN.goldRgb}, 0.1) 0%, transparent 70%);
          border-radius: 50%;
        }

        .stat-highlight-content {
          position: relative;
          z-index: 2;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 700;
          color: ${DESIGN.gold};
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-description {
          font-size: 1.1rem;
          color: #e0e0e0;
          margin-bottom: 0.5rem;
        }

        .stat-source {
          font-size: 0.85rem;
          color: rgba(${DESIGN.goldRgb}, 0.7);
          font-style: italic;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin: 2.5rem 0 1.5rem 0;
          line-height: 1.3;
          position: relative;
          padding-left: 1rem;
        }

        h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, ${DESIGN.gold} 0%, rgba(${DESIGN.goldRgb}, 0.3) 100%);
          border-radius: 2px;
        }

        h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 1.5rem 0 1rem 0;
        }

        p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #d0d0d0;
          margin-bottom: 1.5rem;
        }

        .intro-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #e0e0e0;
          margin-bottom: 2rem;
        }

        /* Comparison Table */
        .comparison-table {
          overflow-x: auto;
          margin: 2rem 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(${DESIGN.goldRgb}, 0.05);
          border-radius: 8px;
          overflow: hidden;
        }

        thead {
          background: rgba(${DESIGN.goldRgb}, 0.15);
        }

        th {
          padding: 1rem;
          text-align: left;
          color: ${DESIGN.gold};
          font-weight: 600;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(${DESIGN.goldRgb}, 0.2);
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid rgba(${DESIGN.goldRgb}, 0.1);
          color: #d0d0d0;
        }

        tbody tr:hover {
          background: rgba(${DESIGN.goldRgb}, 0.08);
        }

        /* List Sections */
        .list-section {
          margin: 2rem 0;
        }

        .list-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1.5rem;
          margin-top: 1rem;
        }

        .list-item {
          margin-bottom: 2rem;
          padding-left: 1.5rem;
          border-left: 2px solid rgba(${DESIGN.goldRgb}, 0.3);
          transition: border-color 0.3s ease;
        }

        .list-item:hover {
          border-left-color: ${DESIGN.gold};
        }

        .list-item-title {
          font-weight: 600;
          color: ${DESIGN.gold};
          margin-bottom: 0.5rem;
        }

        .list-item-description {
          color: #d0d0d0;
          line-height: 1.7;
        }

        /* Case Study */
        .case-study {
          background: linear-gradient(135deg, rgba(${DESIGN.goldRgb}, 0.1) 0%, rgba(${DESIGN.goldRgb}, 0.02) 100%);
          border: 1px solid rgba(${DESIGN.goldRgb}, 0.2);
          border-radius: 8px;
          padding: 2rem;
          margin: 2.5rem 0;
        }

        .case-study-title {
          font-weight: 600;
          color: ${DESIGN.gold};
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .case-study-content {
          color: #d0d0d0;
          line-height: 1.8;
        }

        /* CTA Card */
        .cta-card {
          background: linear-gradient(135deg, ${DESIGN.gold} 0%, rgba(${DESIGN.goldRgb}, 0.8) 100%);
          border-radius: 12px;
          padding: 2.5rem;
          margin: 3rem 0;
          text-align: center;
          color: ${DESIGN.bg};
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.8s ease;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .cta-subheading {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          opacity: 0.95;
        }

        .cta-button {
          display: inline-block;
          background-color: ${DESIGN.bg};
          color: ${DESIGN.gold};
          padding: 1rem 2.5rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid ${DESIGN.bg};
          font-size: 1rem;
        }

        .cta-button:hover {
          background-color: transparent;
          color: ${DESIGN.bg};
          border-color: ${DESIGN.bg};
        }

        /* Sources */
        .sources {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(${DESIGN.goldRgb}, 0.2);
        }

        .sources-title {
          font-weight: 600;
          color: ${DESIGN.gold};
          margin-bottom: 1rem;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .sources-list {
          list-style: none;
          font-size: 0.9rem;
        }

        .sources-list li {
          color: #b0b0b0;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .sources-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: ${DESIGN.gold};
        }

        /* Animations */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container {
            padding: 2rem 1.5rem;
          }

          .article-title {
            font-size: 2rem;
          }

          .article-subtitle {
            font-size: 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          h3 {
            font-size: 1.2rem;
          }

          .stat-number {
            font-size: 2.2rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-links a {
            font-size: 0.85rem;
          }

          .article-meta {
            flex-wrap: wrap;
            font-size: 0.85rem;
          }

          p {
            font-size: 1rem;
          }

          table {
            font-size: 0.9rem;
          }

          th, td {
            padding: 0.75rem;
          }

          .cta-heading {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 480px) {
          .article-title {
            font-size: 1.6rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .nav-container {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .nav-logo {
            width: 100%;
          }

          .nav-links {
            width: 100%;
            flex-wrap: wrap;
          }

          .cta-card {
            padding: 1.5rem;
          }

          .cta-heading {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="wrapper">
        {/* Navigation */}
        <nav>
          <div className="nav-container">
            <a href="/" className="nav-logo">Arxon</a>
            <ul className="nav-links">
              {lang_no.navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <button
                  className="lang-toggle"
                  onClick={() => setLang(lang === 'no' ? 'en' : 'no')}
                >
                  {lang === 'no' ? 'EN' : 'NO'}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container">
          {/* Back Link */}
          <a href="/blogg" className="back-link">
            ← {lang_no.backToBlog}
          </a>

          {/* Article Header */}
          <header className="article-header">
            <div className="article-meta">
              <span>{lang_no.publishDate}</span>
              <span>{lang_no.readTime}</span>
              <span>{lang_no.byLine}</span>
            </div>
            <h1 className="article-title">{lang_no.title}</h1>
            <p className="article-subtitle">{lang_no.subtitle}</p>
          </header>

          {/* Article Sections */}
          {lang_no.sections.map((section, idx) => {
            if (section.type === 'stat-highlight') {
              return (
                <div key={idx} className="section stat-highlight">
                  <div className="stat-highlight-content">
                    <div className="stat-number">{section.stat}</div>
                    <p className="stat-description">{section.description}</p>
                    <p className="stat-source">Kilde: {section.source}</p>
                  </div>
                </div>
              );
            }

            if (section.type === 'intro') {
              return (
                <p key={idx} className="intro-text">
                  {section.content}
                </p>
              );
            }

            if (section.type === 'heading') {
              const HeadingTag = `h${section.level}`;
              return (
                <HeadingTag key={idx} className="section">
                  {section.title}
                </HeadingTag>
              );
            }

            if (section.type === 'content') {
              return (
                <p key={idx} className="section">
                  {section.content}
                </p>
              );
            }

            if (section.type === 'comparison-table') {
              return (
                <div key={idx} className="section comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Land</th>
                        <th>AI-adopsjon</th>
                        <th>Rangering</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.data.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          <td>{row.country}</td>
                          <td>{row.rate}</td>
                          <td>{row.rank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            if (section.type === 'list-section') {
              return (
                <div key={idx} className="section list-section">
                  {section.title && (
                    <div className="list-section-title">{section.title}</div>
                  )}
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="list-item">
                      <div className="list-item-title">{item.title}</div>
                      <div className="list-item-description">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }

            if (section.type === 'case-study') {
              return (
                <div key={idx} className="section case-study">
                  <div className="case-study-title">{section.title}</div>
                  <div className="case-study-content">{section.content}</div>
                </div>
              );
            }

            if (section.type === 'cta-card') {
              return (
                <div key={idx} className="section cta-card">
                  <div className="cta-content">
                    <h2 className="cta-heading">{section.heading}</h2>
                    <p className="cta-subheading">{section.subheading}</p>
                    <a href={section.ctaHref} className="cta-button">
                      {section.ctaText}
                    </a>
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* Sources */}
          <div className="sources">
            <div className="sources-title">Kilder</div>
            <ul className="sources-list">
              {lang_no.sources.map((source, idx) => (
                <li key={idx}>{source}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
