export interface ServiceAutomation {
  name: string
  desc: string
  benefit: string
  complexity: string
  implTime: string
}

export interface ServiceCategory {
  id: string
  title: string
  icon: string
  desc: string
  automations: ServiceAutomation[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    "id": "booking",
    "icon": "Phone",
    "desc": "AI-telefonsvarer, automatisk booking, ventelister og påminnelser. Aldri miss et anrop igjen.",
    "title": "Booking & Avtaler",
    "automations": [
      {
        "name": "AI-telefonsvarer 24/7",
        "desc": "Svarer alle anrop, booker befaring, sender SMS",
        "benefit": "Fanger 30-50% tapte henvendelser",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "AI-telefonsvarer med booking",
        "desc": "Svarer, sjekker ledig tid, booker time",
        "benefit": "Fanger kunder mens du klipper",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "AI-telefonsvarer førstekontakt",
        "desc": "Samler saksinfo, booker konsultasjon",
        "benefit": "Kvalifiserer klienter 24/7",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "AI-telefonsvar bestilling/reservasjon",
        "desc": "Bordbestilling og takeaway via telefon",
        "benefit": "AI svarer alltid, også i rushet",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "AI-telefonsvarer visning/info",
        "desc": "Svarer spørsmål, booker visning, samler kjøperinfo",
        "benefit": "Kvalifiserer interessenter 24/7",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "Visningsmatch",
        "desc": "Nye boliger → match mot kjøpere → varsling",
        "benefit": "Kjøpere varsles umiddelbart",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI-telefonsvarer timebestilling",
        "desc": "Svarer pasienter, sjekker tid, booker time",
        "benefit": "Avlaster resepsjonen 50-70%",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "Henvisning-tracking",
        "desc": "Logger henvisning → følger opp status",
        "benefit": "Ingen faller mellom stolene",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "KPI-rapport til Slack/e-post",
        "desc": "Nøkkeltall (bookinger, pasienter) → rapport",
        "benefit": "Ledelsen har oversikt",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "SoMe auto-post nye produkter",
        "desc": "Nytt produkt → AI-post → Instagram/Facebook",
        "benefit": "Markedsføring på autopilot",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI-telefonsvarer kundestøtte",
        "desc": "Svarer rutinespørsmål, booker møte for komplekse",
        "benefit": "Frigjør regnskapsførers tid",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "Timeregistrering → faktura",
        "desc": "Timer → auto faktura ved månedsslutt",
        "benefit": "Null glemte timer",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Intervjubooking",
        "desc": "Kandidat velger tid → begge får bekreftelse",
        "benefit": "Slipper 5 e-poster",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "AI-telefonsvarer verksted",
        "desc": "Registrerer bil/problem, booker verkstedtime",
        "benefit": "AI svarer, mekanikere jobber",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "Verksted-kalkyle",
        "desc": "Beskriver problem → AI estimerer pris/tid",
        "benefit": "Raskere tilbud",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI-booking med kvalifisering",
        "desc": "Booker → AI stiller spørsmål → du ser svarene",
        "benefit": "Slipper ukvalifiserte samtaler",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "Prosjektforespørsel-intake",
        "desc": "Brief → AI strukturerer + estimerer scope",
        "benefit": "Slipper 3 møter",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI-telefonsvar for påmelding",
        "desc": "Svarer kurs-spørsmål, melder på, booker prøve",
        "benefit": "Null tapt påmelding",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "KPI-dashboard oppdatering",
        "desc": "Daglig: MRR, brukere, tickets, uptime",
        "benefit": "Nøkkeltall uten å grave",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI-booking treningsøkter",
        "desc": "Ringer/melder på → AI booker økt",
        "benefit": "Fyller timer uten resepsjon",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "AI-telefonsvarer reservasjoner",
        "desc": "Svarer 24/7, sjekker tilgjengelighet, booker",
        "benefit": "Fanger gjester utenfor åpningstid",
        "complexity": "Middels",
        "implTime": "2-5d"
      },
      {
        "name": "Digital selvinnsjekking",
        "desc": "Lenke → nøkkelkode/info sendes automatisk",
        "benefit": "Skalerbar drift",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI show-notes generering",
        "desc": "Transkriberer → AI show notes + timestamps",
        "benefit": "Sparer 1-2 timer per episode",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Gjeste-booking workflow",
        "desc": "Invitasjon → booking → briefing-info",
        "benefit": "Profesjonell gjeste-håndtering",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      }
    ]
  },
  {
    "id": "leads",
    "icon": "Target",
    "desc": "Fang opp og kvalifiser leads automatisk. Fra første kontakt til signert avtale.",
    "title": "Leads & Salg",
    "automations": [
      {
        "name": "Lead-scraping",
        "desc": "Finner nye kunder fra Finn.no/Google Maps",
        "benefit": "Fyller pipeline automatisk",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nettskjema → CRM → e-postsekvens + varsling",
        "benefit": "Raskere respons, bedre pipeline",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Tapt anrop → AI-oppfølging",
        "desc": "Tapt anrop → AI-sammendrag → CRM + bookinglenke",
        "benefit": "Fanger tapte leads automatisk",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Lead-scoring ved visning",
        "desc": "Påmelding → bekreftelse → scorer interesse",
        "benefit": "Bedre konvertering",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Auto kandidat-oppfølging",
        "desc": "Statusoppdatering til alle i pipeline",
        "benefit": "Ingen radio silence",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Lead magnet-levering",
        "desc": "Gratis guide → e-postsekvens → coaching-tilbud",
        "benefit": "Konverterer leads",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "KPI-rapport",
        "desc": "Nøkkeltall (leads, portefølje) i rapport",
        "benefit": "Oversikt for ledelsen",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Trial → betalende konvertering",
        "desc": "Prøveperiode → onboarding → tilbud",
        "benefit": "Øker konverteringsrate",
        "complexity": "Middels",
        "implTime": "1-2d"
      }
    ]
  },
  {
    "id": "kundeoppfolging",
    "icon": "Users",
    "desc": "Hold kundene fornøyde med automatisk oppfølging, purring og anmeldelsesforespørsler.",
    "title": "Kundeoppfølging",
    "automations": [
      {
        "name": "Befaring-påminnelse + rute",
        "desc": "SMS 24t/1t før med Google Maps-lenke",
        "benefit": "Reduserer no-shows 60-80%",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Google-anmeldelse forespørsel",
        "desc": "SMS 3 dager etter jobb med anmeldelses-lenke",
        "benefit": "Dobler anmeldelser automatisk",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Auto-purring og betalingsoppfølging",
        "desc": "Åpne fakturaer → purring → eskalering",
        "benefit": "Bedre likviditet automatisk",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Automatisk venteliste",
        "desc": "Fullbooket → venteliste → varsel ved avbestilling",
        "benefit": "Null tapte inntekter",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Booking-påminnelse",
        "desc": "SMS 24t/2t før med avbestillingslenke",
        "benefit": "Reduserer no-shows 70%",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Rebestilling-påminnelse",
        "desc": "6 uker etter klipp → 'Tid for ny time?'",
        "benefit": "Automatisk retention",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "NPS → omtaleforespørsel",
        "desc": "Survey etter besøk → ved høy score → Google-omtale",
        "benefit": "Øker synlighet automatisk",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Frist- og frempåminnelser",
        "desc": "Varsling X dager før frister",
        "benefit": "Null glemte frister",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Timeregistrering-påminnelse",
        "desc": "Daglig påminnelse + auto-oppsummering",
        "benefit": "Øker fakturerbar tid 10-20%",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Kundeundersøkelse etter besøk",
        "desc": "SMS-survey 2t etter besøk",
        "benefit": "Fanger misnøye tidlig",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Visningspåminnelse",
        "desc": "SMS 24t/2t før med Maps-lenke",
        "benefit": "Reduserer no-shows",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Interessent-oppfølging",
        "desc": "Etter visning: auto e-post + AI-spørsmål",
        "benefit": "Systematisk oppfølging",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Utleie-administrasjon",
        "desc": "Husleie-påminnelse, kontrakter, vedlikehold",
        "benefit": "Utleie på autopilot",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Timepåminnelse med forberedelse",
        "desc": "SMS 48t/2t før med instruksjoner",
        "benefit": "Reduserer no-shows + forberedte pasienter",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Venteliste-håndtering",
        "desc": "Avbestilling → neste på liste varsles",
        "benefit": "Null inntektstap",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Oppfølging etter behandling",
        "desc": "Tilpasset melding 1, 7, 30 dager etter",
        "benefit": "Fanger komplikasjoner tidlig",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Resept-påminnelse",
        "desc": "Varsel når resept snart utløper",
        "benefit": "Bedre behandlingsresultat",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Forlatt handlekurv-oppfølging",
        "desc": "Ikke kjøpt → AI-mail 1t, 24t, 72t etter",
        "benefit": "Henter tilbake 10-15%",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Produktanmeldelse-forespørsel",
        "desc": "7d etter levering → anmeldelses-mail",
        "benefit": "3-5x flere anmeldelser",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Momsfrister-varsling",
        "desc": "Auto-påminnelse til kunder før frist",
        "benefit": "Null glemte frister",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Dokumentforespørsel-workflow",
        "desc": "Mangler bilag → auto-forespørsel → purring",
        "benefit": "Systemet maser, ikke du",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Kontraktfornyelse-varsling",
        "desc": "90/60/30 dager før → varsel + tilbud",
        "benefit": "Ingen kunder faller ut",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Service-påminnelse",
        "desc": "Auto-varsel basert på km/tid",
        "benefit": "Jevn inntektsstrøm",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Dekkskifte-påminnelse",
        "desc": "Okt/apr: 'Tid for dekkskifte!' + booking",
        "benefit": "Sesongomsetning sikret",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "EU-kontroll påminnelse",
        "desc": "2mnd/1mnd/2uker før → auto varsel",
        "benefit": "Fyller EU-kontroll-timer",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Google-anmeldelse etter service",
        "desc": "Fornøyd kunde → SMS med anmeldelseslenke",
        "benefit": "Bygger omdømme",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Oppfølging mellom sesjoner",
        "desc": "AI sender refleksjonsspørsmål → samler svar",
        "benefit": "Dypere coaching",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Testimonialer-innsamling",
        "desc": "Etter X sesjoner → auto forespørsel",
        "benefit": "Sosialt bevis automatisk",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Webinar-registrering + oppfølging",
        "desc": "Registrering → påminnelse → opptak → tilbud",
        "benefit": "Komplett webinar-funnel",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Fillevering + feedback",
        "desc": "Leverer filer → klient gir feedback i skjema",
        "benefit": "Strukturert feedback",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Betaling-påminnelse",
        "desc": "Auto påminnelse + purring ved ubetalt",
        "benefit": "Sikrer inntekt",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Onboarding ny SaaS-kunde",
        "desc": "Betaling → velkomst → veiledning → oppfølging",
        "benefit": "Reduserer churn",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Churn-prediksjon",
        "desc": "Bruksmønster → frafall-tegn → auto outreach",
        "benefit": "Redd kunder før oppsigelse",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Lisensfornyelse-varsling",
        "desc": "X dager før → påminnelse + fornyelseslenke",
        "benefit": "Reduserer churn",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Medlemspåminnelse",
        "desc": "SMS 2t før klasse med info",
        "benefit": "Reduserer no-shows",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Medlemsfornyelse",
        "desc": "30d før utløp → tilbud om fornyelse",
        "benefit": "Automatisk retention",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Prøvetime-oppfølging",
        "desc": "Etter gratis prøve → auto tilbud",
        "benefit": "Konverterer til medlemskap",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Påminnelser før event",
        "desc": "7d, 1d, 2t: program, info, parkering",
        "benefit": "Høyere oppmøte",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Oppfølging etter event",
        "desc": "Takk + bilder + evaluering + neste event",
        "benefit": "Bygger lojalitet",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Booking-bekreftelse + påminnelse",
        "desc": "Auto bekreftelse + SMS 24t før ankomst",
        "benefit": "Reduserer no-shows",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Gjeste-tilbakemelding + omtale",
        "desc": "Survey 24t etter utsjekking → omtaleforespørsel",
        "benefit": "Øker anmeldelser",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Auto-purring betalingsoppfølging",
        "desc": "Fakturaer → purring → eskalering",
        "benefit": "Bedre likviditet",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Event-påmelding og påminnelser",
        "desc": "Registrering → bekreftelse → påminnelser",
        "benefit": "Høyere oppmøte",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Medlemsfornyelse-påminnelse",
        "desc": "Xd før utløp → påminnelse + lenke",
        "benefit": "Reduserer frafall",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Churn-forebygging",
        "desc": "Bruksmønster → inaktivitet → auto outreach",
        "benefit": "Redd kunder før churn",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "NPS-survey + oppfølging",
        "desc": "Periodisk NPS → lav score → CS outreach",
        "benefit": "Fanger misnøye tidlig",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Husleie-påminnelse + purring",
        "desc": "Auto påminnelse + purring ved ubetalt",
        "benefit": "Bedre likviditet",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Ledigmelding og visning",
        "desc": "Ledig → annonse + booking + oppfølging",
        "benefit": "Raskere utleie",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Fornyelsespåminnelse",
        "desc": "Xd før utløp → påminnelse + fornyelses-lenke",
        "benefit": "Automatisk retention",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Helseattest-påminnelse",
        "desc": "Auto påminnelse om årlig kontroll",
        "benefit": "Bedre forebygging",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Klage-håndtering workflow",
        "desc": "Klage → kategoriseres → eskaleres → oppfølging",
        "benefit": "Kortere behandlingstid",
        "complexity": "Middels",
        "implTime": "1-2d"
      }
    ]
  },
  {
    "id": "markedsforing",
    "icon": "Megaphone",
    "desc": "Automatiser innholdsproduksjon, sosiale medier og e-postkampanjer.",
    "title": "Markedsføring",
    "automations": [
      {
        "name": "Instagram auto-posting",
        "desc": "Bilde → AI caption → auto-post",
        "benefit": "SoMe alltid aktiv",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Klientoppdatering via e-post",
        "desc": "Ukentlig statusmail til klient",
        "benefit": "Automatiserer klientkommunikasjon",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Dokumentarkiv + oppgave",
        "desc": "E-post-dokumenter → standardisert arkiv + oppgave",
        "benefit": "Bedre sporbarhet",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Meny-oppdatering på nett",
        "desc": "Oppdater ett sted → pusher til nett + SoMe",
        "benefit": "Slipper 5 manuelle oppdateringer",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "SoMe matbilder auto-post",
        "desc": "Bilde → AI caption + hashtags → auto-post",
        "benefit": "SoMe alltid aktiv",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI produktbeskrivelser",
        "desc": "Stikkord → AI-optimalisert produkttekst + SEO",
        "benefit": "Sparer timer på copywriting",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Kundesegmentering",
        "desc": "Auto: førstegangskjøper, lojal, inaktiv → kampanjer",
        "benefit": "Riktig melding til riktig kunde",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Referansesjekk-workflow",
        "desc": "Auto e-post med spørsmålsskjema → svar samles",
        "benefit": "Systematisk uten manuelt arbeid",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Automatisk kurslevering",
        "desc": "Kjøper kurs → moduler leveres via e-post",
        "benefit": "Kurs selger 24/7",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Instagram innholdsplan",
        "desc": "AI genererer ukentlig plan → auto-poster",
        "benefit": "Synlighet uten SoMe-timer",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "SoMe showcase auto-post",
        "desc": "Nye prosjektbilder → AI-post → SoMe",
        "benefit": "Kontinuerlig synlighet",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Instagram treningsinnhold",
        "desc": "AI-tips og motivasjon → auto-post",
        "benefit": "Synlighet uten tidsinvestering",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Sesongkampanjer",
        "desc": "AI-kampanjer basert på sesong og belegg",
        "benefit": "Fyller lavsesong",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Gjenkjøps-kampanje",
        "desc": "Gjester fra i fjor → invitasjon + rabatt",
        "benefit": "Retention uten oppfølging",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "AI-innholdsproduksjon",
        "desc": "AI genererer blogg, SoMe, nyhetsbrev",
        "benefit": "70% raskere produksjon",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "SEO-rangeringsovervåkning",
        "desc": "Daglig sjekk → varsler ved endringer",
        "benefit": "Proaktiv SEO",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Kampanjerapport-generering",
        "desc": "Data fra annonser → AI-rapport til klient",
        "benefit": "Sparer timer per klient",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "SoMe auto-scheduling",
        "desc": "AI-innhold → alle plattformer optimal tid",
        "benefit": "Konsistent tilstedeværelse",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Konkurranseanalyse",
        "desc": "Overvåker konkurrenters innhold + annonser",
        "benefit": "Alltid oppdatert",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Klientprosjekt-status",
        "desc": "Ukentlig auto-rapport om kampanjeresultater",
        "benefit": "Klient alltid informert",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "SoMe-innholdsgenerering",
        "desc": "AI poster om organisasjonens arbeid",
        "benefit": "Synlighet uten SoMe-ressurs",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Episode-publisering flerkanals",
        "desc": "Ny episode → Spotify, Apple, YouTube + SoMe",
        "benefit": "Publiser én gang, overalt",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Nyhetsbrev-automatisering",
        "desc": "Ukentlig med siste episoder + høydepunkter",
        "benefit": "Publikum engasjert uten arbeid",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Innholds-kalender",
        "desc": "AI månedlig plan basert på trender",
        "benefit": "Alltid planlagt innhold",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "Klipp-generering for SoMe",
        "desc": "Lange episoder → AI beste klipp → TikTok",
        "benefit": "Maks rekkevidde fra innhold",
        "complexity": "Høy",
        "implTime": "3-5d"
      }
    ]
  },
  {
    "id": "admin",
    "icon": "Cog",
    "desc": "Fjern manuelt arbeid med automatisert dokumenthåndtering, oppgavestyring og intern varsling.",
    "title": "Admin & Drift",
    "automations": [
      {
        "name": "Automatisk tilbudsforespørsel",
        "desc": "Kunden beskriver jobb → AI lager strukturert forespørsel",
        "benefit": "Sparer 20-30 min per forespørsel",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Prosjektstatus til kunde",
        "desc": "Ukentlig auto-oppdatering til kunden",
        "benefit": "Profesjonelt, kunden slipper ringe",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Materialliste-generator",
        "desc": "AI lager materialliste fra prosjektbeskrivelse",
        "benefit": "Sparer timer på planlegging",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Dokumentarkiv-automasjon",
        "desc": "Dokumenter mottas → standardisert arkivering",
        "benefit": "Bedre sporbarhet, mindre rot",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Produktanbefaling etter besøk",
        "desc": "AI sender produkttips basert på behandling",
        "benefit": "Øker produktsalg 15-25%",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "Bursdagshilsen + tilbud",
        "desc": "Auto-hilsen med rabattkode på bursdag",
        "benefit": "Driver repeatkjøp",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Saksdokument-oppsummering",
        "desc": "AI lager sammendrag med nøkkelpunkter og frister",
        "benefit": "Sparer 30-60 min per sak",
        "complexity": "Høy",
        "implTime": "3-7d"
      },
      {
        "name": "Avtale-/kontraktsgenerering",
        "desc": "AI fyller standardavtaler fra klientdata",
        "benefit": "Sparer timer på rutinekontrakter",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Ny klient onboarding",
        "desc": "Velkomstpakke, skjemaer, kalenderlenke",
        "benefit": "Profesjonelt førsteinntrykk",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Daglig råvarestatus",
        "desc": "Lagersjekk → bestillingsliste → leverandør",
        "benefit": "Reduserer matsvinn",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Ansattplan-varsling",
        "desc": "Vaktplan → SMS til ansatte",
        "benefit": "Null misforståelser om vakter",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Catering-kalkulator",
        "desc": "Antall gjester + event → AI foreslår meny + pris",
        "benefit": "Automatiserer tilbud",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Automatisk boligpresentasjon",
        "desc": "AI genererer boligbeskrivelse fra nøkkeldata",
        "benefit": "Sparer 30-60 min per bolig",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Budvarsel til selger",
        "desc": "Nytt bud → umiddelbar SMS til selger",
        "benefit": "Sanntids oppdatering",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Pasientskjema før konsultasjon",
        "desc": "Helseskjema 48t før → klar i journal",
        "benefit": "Sparer 10-15 min per konsultasjon",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Ny sak → oppgave i Trello/Asana",
        "desc": "Ny henvendelse → standard oppgavesett",
        "benefit": "Ingenting glemmes",
        "complexity": "Lav",
        "implTime": "2-6t"
      },
      {
        "name": "Ordrebekreftelse + tracking",
        "desc": "Ny ordre → personlig mail + tracking",
        "benefit": "Profesjonell kundeopplevelse",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Lagerstatus-varsling",
        "desc": "Under X enheter → varsel + 'Snart utsolgt'",
        "benefit": "Aldri utsolgt uten å vite det",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Retur-håndtering",
        "desc": "Returforespørsel → AI vurderer → returlabel",
        "benefit": "80% mindre manuell håndtering",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Konkurrentpris-overvåkning",
        "desc": "Sjekker konkurrentpriser daglig → varsler",
        "benefit": "Automatisk prisintelligens",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Bilagshåndtering med AI",
        "desc": "Bilde av kvittering → AI leser → regnskapssystem",
        "benefit": "Kunden slipper samle bilag",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "AI-screening av søknader",
        "desc": "AI scorer CV mot kravspek → rangerer",
        "benefit": "Minutter i stedet for timer",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "LinkedIn-sourcing",
        "desc": "Søker LinkedIn → samler → personlig outreach",
        "benefit": "Pipeline på autopilot",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Onboarding-checklist ny ansatt",
        "desc": "Signert → IT-tilgang, utstyr, velkomstpakke",
        "benefit": "Ingenting glemmes",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Stillings-publisering flerkanals",
        "desc": "Skriv én gang → Finn, LinkedIn, etc.",
        "benefit": "Bred distribusjon",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Reparasjonsstatus til kunde",
        "desc": "Auto SMS: diagnostikk → deler → klar",
        "benefit": "Profesjonelt, kunden slipper ringe",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Lagerbestilling deler",
        "desc": "Lav lagerstatus → auto bestilling/varsel",
        "benefit": "Aldri tom for deler",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Auto prosjekt-oppdatering",
        "desc": "Ukentlig statusmail til klient",
        "benefit": "Klient informert uten din tid",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Portfolio auto-oppdatering",
        "desc": "Ferdig prosjekt → AI case study → nettside",
        "benefit": "Portfolio alltid oppdatert",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "AI tilbudsgenerering",
        "desc": "AI lager tilbud basert på scope + standardpriser",
        "benefit": "Tilbud på minutter",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Kontrakt-sending",
        "desc": "Godkjent → auto kontrakt → signering",
        "benefit": "Raskere oppstart",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Kursplan-distribusjon",
        "desc": "Ny elev → auto kursplan + materiell",
        "benefit": "Elevene forberedt",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Fravær-varsling",
        "desc": "Elev møter ikke → varsel til foresatte",
        "benefit": "Oppdager frafall tidlig",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Sertifikat-generering",
        "desc": "Fullført → AI-sertifikat → sendes auto",
        "benefit": "Profesjonelt og skalerbart",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Ticket-triagering med AI",
        "desc": "AI kategoriserer, prioriterer, ruter til team",
        "benefit": "Sparer L1-support timer",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Serverovervåkning-varsling",
        "desc": "Sjekker status hvert 5 min → varsler",
        "benefit": "Oppdager problemer før kundene",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Release notes-generering",
        "desc": "Ny versjon → AI oppsummerer → brukervennlig",
        "benefit": "Profesjonell kommunikasjon",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Treningsprogram-levering",
        "desc": "AI-tilpasset program → ukentlig oppdatering",
        "benefit": "Skalerbar personlig trening",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Kostholdsplan-assistanse",
        "desc": "AI-kostholdsforslag basert på mål",
        "benefit": "Merverdi uten ekstra tid",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Registrering + bekreftelse",
        "desc": "Påmelding → bekreftelse + QR + kalender",
        "benefit": "Profesjonell registrering",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Leverandør-koordinering",
        "desc": "Auto tidslinje-mail til leverandører",
        "benefit": "Alle vet hva/når",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Budsjett-tracking",
        "desc": "Kostnader → auto budsjett vs. faktisk",
        "benefit": "Full kostnadskontroll",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Sponsor-kommunikasjon",
        "desc": "Auto status til sponsorer: tall, rekkevidde",
        "benefit": "Sponsorer som kommer tilbake",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Billettsalg-varsling",
        "desc": "Daglig: solgt, inntekt, kapasitet",
        "benefit": "Oversikt uten login",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Vedlikeholdslogg + varsling",
        "desc": "Logger behov → varsler ansatte → sporer",
        "benefit": "Bedre gjesteopplevelse",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Lokal opplevelsesguide",
        "desc": "AI-guide med lokale tips til gjester",
        "benefit": "Differensierer fra konkurrentene",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "KYC-dokumentinnhenting",
        "desc": "Auto forespørsel om ID → verifisering → status",
        "benefit": "Reduserer manuelt KYC-arbeid",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Transaksjonsovervåkning",
        "desc": "Sjekker transaksjoner → flagger mistenkelige",
        "benefit": "Anti-hvitvasking automatisert",
        "complexity": "Høy",
        "implTime": "3-5d"
      },
      {
        "name": "Kundeportal-varsling",
        "desc": "Auto varsel ved statusendringer",
        "benefit": "Kunden alltid informert",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "A/B-test resultater → Slack",
        "desc": "Signifikans nådd → auto varsel med vinner",
        "benefit": "Raskere beslutninger",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "Sendingssporing + kundevarsling",
        "desc": "Auto SMS ved hvert steg: hentet → levert",
        "benefit": "Færre supporthenvendelser",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Ruteoptimalisering-varsling",
        "desc": "Daglig ruteplan → SMS til sjåfører",
        "benefit": "Spart drivstoff og tid",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Lagerstatus-overvåkning",
        "desc": "Lav beholdning → varsel → trigger bestilling",
        "benefit": "Reduserer stans",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Avvikshåndtering",
        "desc": "Forsinkelse/skade → kunde-varsel + eskalering",
        "benefit": "Raskere respons",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Sjåfør-tilgjengelighetsplan",
        "desc": "Melder tilgjengelighet → auto vaktplan",
        "benefit": "Null misforståelser",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Frivillig-registrering + onboarding",
        "desc": "Ny frivillig → velkomst + oppgaver + info",
        "benefit": "Profesjonell oppstart",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Støttebrev-generering",
        "desc": "AI genererer søknader om tilskudd",
        "benefit": "Sparer timer",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Feature request-tracking",
        "desc": "Forespørsler → AI kategoriserer → Jira",
        "benefit": "Bygger produkt fra kundebehov",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Auto changelog/release notes",
        "desc": "Nye releases → AI release notes",
        "benefit": "Profesjonell uten dev-tid",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Vedlikeholdsforespørsel-workflow",
        "desc": "Beboer melder feil → rutes → status-oppdatering",
        "benefit": "Strukturert feilhåndtering",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Beboerportal-varsling",
        "desc": "Viktig info → auto til alle beboere",
        "benefit": "Alle informert",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Årsmøte-innkalling",
        "desc": "Auto innkalling + agenda + fullmaktsskjema",
        "benefit": "Lovpålagte frister overholdt",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Skademelding-intake",
        "desc": "Kunde melder skade → AI kategoriserer → ruter",
        "benefit": "Raskere saksbehandling",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Forsikringsbevis-generering",
        "desc": "Ny forsikring → auto bevis → sendes",
        "benefit": "Kunden får bevis umiddelbart",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Behandlingskoordinering",
        "desc": "Koordinerer forsikring-klinikk-pasient auto",
        "benefit": "Raskere behandling",
        "complexity": "Høy",
        "implTime": "2-3d"
      }
    ]
  },
  {
    "id": "rapportering",
    "icon": "BarChart3",
    "desc": "Få ukentlige rapporter og dashboards levert automatisk. Alltid oppdatert, null arbeid.",
    "title": "Rapportering",
    "automations": [
      {
        "name": "Ukentlig inntektsrapport",
        "desc": "Auto-sammendrag: omsetning, kunder, tjenester",
        "benefit": "Full oversikt uten manuelt arbeid",
        "complexity": "Middels",
        "implTime": "2-4t"
      },
      {
        "name": "Ukentlig salgsrapport",
        "desc": "Auto: mest solgt, inntekt, sammenligning",
        "benefit": "Innsikt uten manuell analyse",
        "complexity": "Middels",
        "implTime": "2-4t"
      },
      {
        "name": "Markedsrapport-generering",
        "desc": "AI lager kvartalsvis markedsrapport",
        "benefit": "Posisjonerer deg som ekspert",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Kvartalsrapport pasientstrøm",
        "desc": "Auto: nye pasienter, tjenester, inntekt",
        "benefit": "Data-drevet beslutning",
        "complexity": "Middels",
        "implTime": "2-4t"
      },
      {
        "name": "Månedsrapport-generering",
        "desc": "Nøkkeltall → AI-rapport → til kunden",
        "benefit": "Verdifull rapport automatisk",
        "complexity": "Høy",
        "implTime": "2-3d"
      },
      {
        "name": "Turnover-analyse",
        "desc": "Kvartalsrapport: ansettelser, avganger, KPI-er",
        "benefit": "Viser rekrutteringens verdi",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Klientfremgang-dashboard",
        "desc": "Auto-oppsummering mål, progresjon, neste steg",
        "benefit": "Øker retention",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "Karakterer/fremgang-rapport",
        "desc": "Auto fremgangsrapport til elev/foresatte",
        "benefit": "Øker tilfredshet",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "Evaluering etter kurs",
        "desc": "Auto survey → AI-rapport med innsikter",
        "benefit": "Forbedrer kurs med data",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Bug-rapport til Jira",
        "desc": "Skjema → AI kategoriserer → issue automatisk",
        "benefit": "Strukturerte rapporter",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Resultat-tracking",
        "desc": "Ukentlig: 'Hvordan gikk det?' → AI-analyse",
        "benefit": "Klient føler seg fulgt opp",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Live feedback under event",
        "desc": "QR → spørsmål → sanntids dashboard",
        "benefit": "Juster i sanntid",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Daglig beleggrapport",
        "desc": "Auto: belegg, inntekt, ankomster",
        "benefit": "Oversikt uten manuell sjekk",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Ukentlig KPI-rapport transport",
        "desc": "Auto: leveringer, forsinkelser, kostnader",
        "benefit": "Data-drevet optimalisering",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Årlig giverrapport",
        "desc": "Auto årsoppsummering til hver giver",
        "benefit": "Øker gjengivelsesrate",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Sponsorkommunikasjon",
        "desc": "Auto rapport til sponsorer: tall, rekkevidde",
        "benefit": "Fornyet sponsorat",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Bruksanalyse → Slack-rapport",
        "desc": "Daglig: aktive brukere, features, feil",
        "benefit": "Team ser data uten å grave",
        "complexity": "Middels",
        "implTime": "1d"
      },
      {
        "name": "Energi-/forbruksrapport",
        "desc": "Forbruksdata → rapport per enhet/bygg",
        "benefit": "Data-drevet energisparing",
        "complexity": "Middels",
        "implTime": "1-2d"
      }
    ]
  },
  {
    "id": "okonomi",
    "icon": "FileText",
    "desc": "Automatisk fakturering ved milepæler, levering eller fullført jobb.",
    "title": "Økonomi & Faktura",
    "automations": [
      {
        "name": "Faktura etter fullført jobb",
        "desc": "Jobb ferdig → AI genererer faktura automatisk",
        "benefit": "Faktura sendes samme dag",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Faktura ved milepæl",
        "desc": "Fase ferdig → auto delfaktura",
        "benefit": "Bedre cashflow",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Faktura etter levering",
        "desc": "Levering bekreftet → auto faktura",
        "benefit": "Bedre likviditet",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Donasjon-bekreftelse + takkemail",
        "desc": "Ny donasjon → takkebrev + skatteinfo",
        "benefit": "Donorer føler seg verdsatt",
        "complexity": "Lav",
        "implTime": "2-4t"
      },
      {
        "name": "Felleskostnader-beregning",
        "desc": "Auto beregning og fakturering per enhet",
        "benefit": "Rettferdig, null manuelt",
        "complexity": "Middels",
        "implTime": "1-2d"
      },
      {
        "name": "Portefølje-rapport",
        "desc": "Auto: aktive forsikringer, utbetalinger, rate",
        "benefit": "Oversikt for ledelsen",
        "complexity": "Middels",
        "implTime": "1-2d"
      }
    ]
  },
  {
    "id": "compliance",
    "icon": "ShieldCheck",
    "desc": "Hold deg i tråd med regelverk. Automatisert samtykke-logging og audit trail.",
    "title": "Compliance & GDPR",
    "automations": [
      {
        "name": "Konfliktsøk",
        "desc": "Auto-sjekk nye klienter mot eksisterende saker",
        "benefit": "Lovpålagt sjekk på sekunder",
        "complexity": "Høy",
        "implTime": "1-2d"
      },
      {
        "name": "GDPR samtykke- og audit-logg",
        "desc": "Loggfører samtykke/avmelding i audit-spor",
        "benefit": "Compliance-risiko redusert",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      },
      {
        "name": "Samtykke- og audit-logg",
        "desc": "Samtykke-logging for helsekommunikasjon",
        "benefit": "Lovpålagt for helse",
        "complexity": "Middels",
        "implTime": "0.5-1d"
      }
    ]
  }
]