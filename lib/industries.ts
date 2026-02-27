export interface Automation {
  name: string
  desc: string
  benefit: string
  complexity: string
}

export interface Industry {
  title: string
  subtitle: string
  slug: string
  icon: string
  automations: Automation[]
  count: number
}

export const industries: Industry[] = [
  {
    "title": "Bygg & Håndverk",
    "subtitle": "Rørleggere, elektrikere, malere, snekkere, entreprenører",
    "slug": "bygg-og-handverk",
    "icon": "Hammer",
    "automations": [
      {
        "name": "AI-telefonsvarer 24/7",
        "desc": "Finn svarer alle anrop automatisk, booker befaring, sender SMS-bekreftelse",
        "benefit": "Håndverkere mister 30-50% av henvendelser fordi de er ute på jobb. Fanger opp ALT.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk tilbudsforespørsel",
        "desc": "Kunden beskriver jobben via telefon/skjema → AI lager strukturert forespørsel → sendes til eier",
        "benefit": "Sparer 20-30 min per forespørsel. Kunden får svar raskt, du får strukturert info.",
        "complexity": "Middels"
      },
      {
        "name": "Befaring-påminnelse + rute",
        "desc": "SMS/e-post påminnelse 24t og 1t før befaring med Google Maps-lenke",
        "benefit": "Reduserer no-shows med 60-80%. Kunden vet nøyaktig når du kommer.",
        "complexity": "Lav"
      },
      {
        "name": "Faktura etter fullført jobb",
        "desc": "Når jobb markeres ferdig → AI genererer faktura basert på timebruk og materialer",
        "benefit": "Slipper å sitte om kvelden og skrive fakturaer. Sendes samme dag.",
        "complexity": "Middels"
      },
      {
        "name": "Prosjektstatus til kunde",
        "desc": "Automatisk ukentlig oppdatering til kunden: 'Vi er 60% ferdig, neste steg er...'",
        "benefit": "Profesjonelt inntrykk. Kunden slipper å ringe og spørre.",
        "complexity": "Lav"
      },
      {
        "name": "Google-anmeldelse forespørsel",
        "desc": "3 dager etter ferdig jobb → SMS med lenke til Google-anmeldelse",
        "benefit": "Dobler antall anmeldelser. Bygger omdømme automatisk.",
        "complexity": "Lav"
      },
      {
        "name": "Lead-scraping fra Finn.no/Google Maps",
        "desc": "Finner nye potensielle kunder (nybygg, renoveringer) automatisk",
        "benefit": "Fyller pipeline uten manuelt arbeid. Finner oppdrag før konkurrentene.",
        "complexity": "Høy"
      },
      {
        "name": "Materialliste-generator",
        "desc": "AI leser prosjektbeskrivelse og foreslår materialliste med estimerte priser",
        "benefit": "Sparer timer på planlegging. Reduserer glemte materialer.",
        "complexity": "Høy"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead fra nettskjema/webhook pushes til CRM og starter e-postsekvens; intern varsling til Slack/Teams.",
        "benefit": "Raskere respons, færre leads faller mellom stoler, bedre pipeline-kvalitet.",
        "complexity": "Lav"
      },
      {
        "name": "Tapt anrop → AI-sammendrag → oppfølging i CRM",
        "desc": "Når anrop ikke besvares, opprettes lead/sak, AI lager sammendrag, SMS/e-post med bookinglenke.",
        "benefit": "Fanger opp tapte leads, korter responstid og standardiserer oppfølging.",
        "complexity": "Middels"
      },
      {
        "name": "Dokumentinnhenting → strukturert arkiv",
        "desc": "Dokumenter mottas via e-post/skjema, navngis standardisert, lagres i Drive og oppgave opprettes.",
        "benefit": "Raskere saksbehandling, mindre rot og bedre sporbarhet.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk purring og betalingsoppfølging",
        "desc": "Henter åpne fakturaer og sender purring etter definert løp; eskalerer ved manglende betaling.",
        "benefit": "Bedre likviditet, mindre manuelt arbeid og mer konsistent oppfølging.",
        "complexity": "Middels"
      }
    ],
    "count": 12
  },
  {
    "title": "Salong & Skjønnhet",
    "subtitle": "Frisører, hudpleie, negledesign, barbershop, spa",
    "slug": "salong-og-skjonnhet",
    "icon": "Scissors",
    "automations": [
      {
        "name": "AI-telefonsvarer med booking",
        "desc": "Finn svarer, sjekker ledig tid, booker time, sender bekreftelse",
        "benefit": "Salonger mister kunder mens de klipper. AI fanger opp alle henvendelser.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk venteliste",
        "desc": "Fullbooket? Kunden legges på venteliste → varsles automatisk ved avbestilling",
        "benefit": "Fyller kansellerte timer automatisk. Null tapte inntekter.",
        "complexity": "Middels"
      },
      {
        "name": "Booking-påminnelse",
        "desc": "SMS 24t og 2t før timen med avbestillingslenke",
        "benefit": "Reduserer no-shows med 70%. Gir tid til å fylle kansellerte timer.",
        "complexity": "Lav"
      },
      {
        "name": "Produktanbefaling etter besøk",
        "desc": "AI sender personlig produkttips basert på behandlingen kunden fikk",
        "benefit": "Øker produktsalg med 15-25%. Kunden føler seg ivaretatt.",
        "complexity": "Middels"
      },
      {
        "name": "Instagram auto-posting",
        "desc": "Tar bilde av nytt resultat → AI lager caption → poster automatisk",
        "benefit": "Holder sosiale medier aktive uten ekstra arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Bursdagshilsen + tilbud",
        "desc": "Automatisk hilsen på kundens bursdag med 15% rabattkode",
        "benefit": "Personlig touch som driver repeatkjøp.",
        "complexity": "Lav"
      },
      {
        "name": "Rebestilling-påminnelse",
        "desc": "6 uker etter siste klipp → 'Tid for ny time?'-melding med bookinglenke",
        "benefit": "Automatisk retention. Kunden glemmer ikke å booke.",
        "complexity": "Lav"
      },
      {
        "name": "Ukentlig inntektsrapport",
        "desc": "Automatisk sammendrag: omsetning, antall kunder, mest populære tjenester",
        "benefit": "Full oversikt uten å telle manuelt.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead fra nettskjema pushes til CRM og starter e-postsekvens med intern varsling.",
        "benefit": "Raskere respons, bedre pipeline-kvalitet.",
        "complexity": "Lav"
      },
      {
        "name": "NPS/tilbakemelding → omtaleforespørsel",
        "desc": "Etter behandling sendes kort survey; ved høy score sendes automatisk forespørsel om Google/Facebook-omtale.",
        "benefit": "Øker synlighet og sosialt bevis med minimal manuell innsats.",
        "complexity": "Lav"
      }
    ],
    "count": 10
  },
  {
    "title": "Advokatkontor & Juridisk",
    "subtitle": "Advokater, advokatfirmaer, juridisk rådgivning, regnskap, inkasso",
    "slug": "advokatkontor-og-juridisk",
    "icon": "Scale",
    "automations": [
      {
        "name": "AI-telefonsvarer for førstekontakt",
        "desc": "Finn tar imot nye henvendelser, samler saksinfo, booker konsultasjon",
        "benefit": "Advokater er opptatt i møter/retten. AI kvalifiserer klienter 24/7.",
        "complexity": "Middels"
      },
      {
        "name": "Saksdokument-oppsummering",
        "desc": "Last opp dokument → AI lager sammendrag med nøkkelpunkter og frister",
        "benefit": "Sparer 30-60 min per sak på dokumentgjennomgang.",
        "complexity": "Høy"
      },
      {
        "name": "Frist- og frempåminnelser",
        "desc": "Automatisk varsling X dager før frister (tilsvar, ankefrister, foreldelse)",
        "benefit": "Null glemte frister. Reduserer malpractice-risiko.",
        "complexity": "Middels"
      },
      {
        "name": "Klientoppdatering via e-post",
        "desc": "Ukentlig statusmail til klient: 'Saken din er i fase X, neste steg er Y'",
        "benefit": "Klienter klager ofte over manglende info. Automatiserer dette.",
        "complexity": "Lav"
      },
      {
        "name": "Avtale-/kontraktsgenerering",
        "desc": "AI fyller ut standardavtaler basert på klientdata og sakstype",
        "benefit": "Sparer timer på rutinekontrakter. Reduserer feil.",
        "complexity": "Høy"
      },
      {
        "name": "Timeregistrering-påminnelse",
        "desc": "Daglig påminnelse om å registrere timer + auto-oppsummering til faktura",
        "benefit": "Sikrer at alle timer faktureres. Øker omsetning 10-20%.",
        "complexity": "Lav"
      },
      {
        "name": "Ny klient onboarding",
        "desc": "Automatisk velkomstmail, fullmaktsskjema, informasjonsskjema, kalenderlenke",
        "benefit": "Profesjonelt førsteinntrykk. Samler all info før første møte.",
        "complexity": "Middels"
      },
      {
        "name": "Konfliktsøk",
        "desc": "Sjekker automatisk nye klientnavn mot eksisterende saker for interessekonflikter",
        "benefit": "Lovpålagt sjekk gjort på sekunder i stedet for manuelt.",
        "complexity": "Høy"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead fra nettskjema pushes til CRM, starter e-postsekvens, intern varsling til Slack/Teams.",
        "benefit": "Raskere respons, færre leads faller mellom stoler.",
        "complexity": "Lav"
      },
      {
        "name": "Dokumentinnhenting → strukturert arkiv + oppgave",
        "desc": "Dokumenter mottas via e-post/skjema, navngis standardisert, lagres i Drive/SharePoint og oppgave opprettes.",
        "benefit": "Raskere saksbehandling, mindre rot og bedre sporbarhet.",
        "complexity": "Middels"
      },
      {
        "name": "Samtykke- og audit-logg (GDPR)",
        "desc": "Loggfører markedsføringssamtykke/avmelding og viktige hendelser i audit-spor.",
        "benefit": "Reduserer compliance-risiko og gjør det enklere å dokumentere samtykke.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk purring og betalingsoppfølging",
        "desc": "Henter åpne fakturaer og sender purring etter definert løp; eskalerer ved manglende betaling.",
        "benefit": "Bedre likviditet, mindre manuelt arbeid.",
        "complexity": "Middels"
      }
    ],
    "count": 12
  },
  {
    "title": "Restaurant & Café",
    "subtitle": "Restauranter, kafeer, bakeri, matlevering, catering",
    "slug": "restaurant-og-caf",
    "icon": "UtensilsCrossed",
    "automations": [
      {
        "name": "AI-telefonsvar for bestilling/reservasjon",
        "desc": "Tar imot bordbestillinger og takeaway-bestillinger via telefon",
        "benefit": "Travle restauranter mister bestillinger i rushet. AI svarer alltid.",
        "complexity": "Middels"
      },
      {
        "name": "Daglig råvarestatus",
        "desc": "Sjekker lagerstatus → genererer bestillingsliste → sender til leverandør",
        "benefit": "Aldri tom for varer. Reduserer matsvinn og hastebestillinger.",
        "complexity": "Middels"
      },
      {
        "name": "Meny-oppdatering på nett",
        "desc": "Oppdater meny i ett system → pusher automatisk til nettside, sosiale medier",
        "benefit": "Slipper å oppdatere 5 steder manuelt.",
        "complexity": "Middels"
      },
      {
        "name": "Ansattplan-varsling",
        "desc": "Vaktplan publiseres → alle ansatte får SMS med sine vakter",
        "benefit": "Null misforståelser om vakter.",
        "complexity": "Lav"
      },
      {
        "name": "Kundeundersøkelse etter besøk",
        "desc": "Automatisk SMS med kort spørreundersøkelse 2t etter besøk",
        "benefit": "Fanger misnøye tidlig. Hindrer dårlige anmeldelser.",
        "complexity": "Lav"
      },
      {
        "name": "Catering-kalkulator",
        "desc": "Kunden fyller inn antall gjester + type event → AI foreslår meny + pris",
        "benefit": "Automatiserer tilbudsgivning. Kunden får svar på minutter.",
        "complexity": "Middels"
      },
      {
        "name": "Sosiale medier matbilder",
        "desc": "Last opp bilde → AI lager caption + hashtags → poster til Instagram/Facebook",
        "benefit": "Holder SoMe aktiv uten ekstra arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Ukentlig salgsrapport",
        "desc": "Automatisk oppsummering: mest solgte retter, inntekt per dag, sammenligning forrige uke",
        "benefit": "Innsikt uten manuell analyse.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead/forespørsel fra nettskjema pushes til CRM, starter e-postsekvens, varsling til ansatte.",
        "benefit": "Raskere respons på bestillinger og catering-forespørsler.",
        "complexity": "Lav"
      },
      {
        "name": "NPS/tilbakemelding → omtaleforespørsel",
        "desc": "Etter besøk sendes kort survey; ved høy score sendes automatisk forespørsel om Google-omtale.",
        "benefit": "Øker synlighet og sosialt bevis automatisk.",
        "complexity": "Lav"
      }
    ],
    "count": 10
  },
  {
    "title": "Eiendomsmegling",
    "subtitle": "Meglere, eiendomsutvikling, boligutleie, eiendomsforvaltning",
    "slug": "eiendomsmegling",
    "icon": "Home",
    "automations": [
      {
        "name": "AI-telefonsvarer for visning/info",
        "desc": "Svarer spørsmål om boligen, booker visning, samler kjøperinfo",
        "benefit": "Meglere er på visning hele dagen. AI kvalifiserer interessenter 24/7.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk boligpresentasjon",
        "desc": "AI genererer boligbeskrivelse basert på nøkkeldata (areal, beliggenhet, standard)",
        "benefit": "Sparer 30-60 min per bolig på å skrive tekst.",
        "complexity": "Middels"
      },
      {
        "name": "Visningsmatch",
        "desc": "Nye boliger → match mot registrerte kjøpere → automatisk varsling",
        "benefit": "Kjøpere varsles umiddelbart. Gir raskere salg.",
        "complexity": "Middels"
      },
      {
        "name": "Visningspåminnelse",
        "desc": "SMS 24t og 2t før visning med adresse og Google Maps-lenke",
        "benefit": "Reduserer no-shows. Kjøpere finner lett frem.",
        "complexity": "Lav"
      },
      {
        "name": "Interessent-oppfølging",
        "desc": "Etter visning: automatisk e-post med info + AI-spørsmål om interesse",
        "benefit": "Systematisk oppfølging uten manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Budvarsel til selger",
        "desc": "Nytt bud mottatt → umiddelbar SMS/e-post til selger med buddetaljer",
        "benefit": "Selger er alltid oppdatert i sanntid.",
        "complexity": "Lav"
      },
      {
        "name": "Utleie-administrasjon",
        "desc": "Husleie-påminnelse, kontraktfornyelse-varsel, vedlikeholdsforespørsel-logging",
        "benefit": "Alt rundt utleie på autopilot.",
        "complexity": "Middels"
      },
      {
        "name": "Markedsrapport-generering",
        "desc": "Henter prisdata → AI lager kvartalsvis markedsrapport for område",
        "benefit": "Posisjonerer deg som ekspert. Ferdig rapport på 2 min.",
        "complexity": "Høy"
      },
      {
        "name": "Visningspåmelding → automatisk oppfølging og lead-scoring",
        "desc": "Tar imot visningspåmelding, sender bekreftelse, scorer lead basert på respons/interesse.",
        "benefit": "Bedre konvertering fra interessenter til budgivere.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead fra nettskjema pushes til CRM og starter e-postsekvens.",
        "benefit": "Raskere respons, bedre pipeline-kvalitet.",
        "complexity": "Lav"
      },
      {
        "name": "Samtykke- og audit-logg (GDPR)",
        "desc": "Loggfører samtykke/avmelding og hendelser i audit-spor for compliance.",
        "benefit": "Reduserer compliance-risiko.",
        "complexity": "Middels"
      },
      {
        "name": "Dokumentinnhenting → strukturert arkiv",
        "desc": "Dokumenter mottas via e-post, navngis standardisert, lagres i Drive og oppgave opprettes.",
        "benefit": "Raskere saksbehandling, bedre sporbarhet.",
        "complexity": "Middels"
      }
    ],
    "count": 12
  },
  {
    "title": "Helse & Klinikk",
    "subtitle": "Tannlege, fysioterapeut, psykolog, kiropraktor, legekontorer",
    "slug": "helse-og-klinikk",
    "icon": "HeartPulse",
    "automations": [
      {
        "name": "AI-telefonsvarer for timebestilling",
        "desc": "Svarer pasienter, sjekker tilgjengelig tid, booker time",
        "benefit": "Resepsjonen er overbelastet. AI avlaster med 50-70% av anrop.",
        "complexity": "Middels"
      },
      {
        "name": "Timepåminnelse med forberedelse",
        "desc": "SMS 48t + 2t før: 'Husk å ta med røntgenbilder/møte fastende'",
        "benefit": "Reduserer no-shows + pasienter er forberedt.",
        "complexity": "Lav"
      },
      {
        "name": "Venteliste-håndtering",
        "desc": "Avbestilling → neste på venteliste varsles → bekrefter ny time",
        "benefit": "Fyller timer automatisk. Null inntektstap.",
        "complexity": "Middels"
      },
      {
        "name": "Pasientskjema før konsultasjon",
        "desc": "Automatisk utsending av helseskjema 48t før time → svar klart i journalen",
        "benefit": "Sparer 10-15 min per konsultasjon.",
        "complexity": "Middels"
      },
      {
        "name": "Oppfølging etter behandling",
        "desc": "AI sender tilpasset oppfølgingsmelding 1, 7, 30 dager etter behandling",
        "benefit": "Pasientene føler seg ivaretatt. Fanger opp komplikasjoner tidlig.",
        "complexity": "Middels"
      },
      {
        "name": "Resept-påminnelse",
        "desc": "Påminnelse når resept snart utløper: 'Din resept går ut om 2 uker'",
        "benefit": "Pasienten husker å fornye. Bedre behandlingsresultat.",
        "complexity": "Lav"
      },
      {
        "name": "Henvisning-tracking",
        "desc": "Logger henvisning → følger opp status → varsler lege når svar mottas",
        "benefit": "Ingen henvisninger faller mellom stolene.",
        "complexity": "Middels"
      },
      {
        "name": "Kvartalsrapport pasientstrøm",
        "desc": "Automatisk oversikt: nye pasienter, gjengangere, populære tjenester, inntekt",
        "benefit": "Data-drevet beslutningsgrunnlag.",
        "complexity": "Middels"
      },
      {
        "name": "Tapt anrop → AI-sammendrag → oppfølging i CRM",
        "desc": "Tapt anrop oppretter automatisk lead/sak, AI lager sammendrag, SMS/e-post med bookinglenke.",
        "benefit": "Fanger opp tapte leads, korter responstid.",
        "complexity": "Middels"
      },
      {
        "name": "Samtykke- og audit-logg (GDPR)",
        "desc": "Loggfører samtykke/avmelding og hendelser i audit-spor for helsekommunikasjon.",
        "benefit": "Reduserer compliance-risiko. Lovpålagt for helse.",
        "complexity": "Middels"
      },
      {
        "name": "Daglig/ukentlig KPI-rapport til Slack/e-post",
        "desc": "Samler nøkkeltall (bookinger, pasienter, purringer) og sender rapport.",
        "benefit": "Gir ledelsen oversikt uten manuell rapportering.",
        "complexity": "Lav"
      },
      {
        "name": "Ny sak → prosjekt/oppgave i Trello/Asana",
        "desc": "Ved ny henvendelse opprettes standard oppgavesett med deadlines og ansvarlig.",
        "benefit": "Standardiserer leveranse, reduserer glemt arbeid.",
        "complexity": "Lav"
      }
    ],
    "count": 12
  },
  {
    "title": "E-handel & Nettbutikk",
    "subtitle": "Shopify, WooCommerce, nettbutikker, dropshipping, detaljhandel",
    "slug": "e-handel-og-nettbutikk",
    "icon": "ShoppingCart",
    "automations": [
      {
        "name": "Ordrebekreftelse + tracking",
        "desc": "Ny ordre → personlig bekreftelsesmail + tracking-oppdateringer automatisk",
        "benefit": "Profesjonell kundeopplevelse uten manuelt arbeid.",
        "complexity": "Lav"
      },
      {
        "name": "Forlatt handlekurv-oppfølging",
        "desc": "Kunde legger varer i kurv men kjøper ikke → AI-mail 1t, 24t, 72t etter",
        "benefit": "Henter tilbake 10-15% av forlatte handlekurver.",
        "complexity": "Middels"
      },
      {
        "name": "Produktanmeldelse-forespørsel",
        "desc": "7 dager etter levering → 'Hvordan likte du produktet?'-mail med anmeldelses-lenke",
        "benefit": "Øker antall anmeldelser 3-5x. Bygger tillit.",
        "complexity": "Lav"
      },
      {
        "name": "Lagerstatus-varsling",
        "desc": "Produkt under X enheter → varsler deg + automatisk 'Snart utsolgt' på produktsiden",
        "benefit": "Aldri utsolgt uten å vite det. Skaper urgency.",
        "complexity": "Middels"
      },
      {
        "name": "AI produktbeskrivelser",
        "desc": "Legg inn stikkord → AI genererer optimalisert produktbeskrivelse med SEO",
        "benefit": "Sparer timer på copywriting. Bedre søkesynlighet.",
        "complexity": "Middels"
      },
      {
        "name": "Kundesegmentering",
        "desc": "Automatisk segmentering: førstegangskjøper, lojal kunde, inaktiv → ulike kampanjer",
        "benefit": "Riktig melding til riktig kunde. Øker konvertering.",
        "complexity": "Høy"
      },
      {
        "name": "Retur-håndtering",
        "desc": "Kunde sender returforespørsel → AI vurderer → genererer returlabel + instruksjoner",
        "benefit": "Reduserer manuell håndtering med 80%.",
        "complexity": "Middels"
      },
      {
        "name": "Konkurrentpris-overvåkning",
        "desc": "Sjekker konkurrenters priser daglig → varsler ved store prisendringer",
        "benefit": "Alltid konkurransedyktig. Automatisk prisintelligens.",
        "complexity": "Høy"
      },
      {
        "name": "Sosiale medier auto-post",
        "desc": "Nye produkter → AI lager post med bilde + tekst → poster til Instagram/Facebook",
        "benefit": "Markedsføring på autopilot.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead fra nettbutikk pushes til CRM, starter e-postsekvens.",
        "benefit": "Raskere respons, konverterer besøkende til kunder.",
        "complexity": "Lav"
      }
    ],
    "count": 10
  },
  {
    "title": "Regnskap & Konsulenter",
    "subtitle": "Regnskapsførere, revisorer, konsulentfirmaer, rådgivere",
    "slug": "regnskap-og-konsulenter",
    "icon": "Calculator",
    "automations": [
      {
        "name": "AI-telefonsvarer for kundestøtte",
        "desc": "Svarer rutinespørsmål om frister, moms, bilag → booker møte for komplekse saker",
        "benefit": "Frigjør regnskapsførers tid til verdiskapende arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Bilagshåndtering",
        "desc": "Kunden tar bilde av kvittering → AI leser, kategoriserer, sender til regnskapssystem",
        "benefit": "Kunden slipper å samle bilag. Du slipper å purre.",
        "complexity": "Høy"
      },
      {
        "name": "Momsfrister-varsling",
        "desc": "Automatisk påminnelse til alle kunder X dager før momsoppgave-frist",
        "benefit": "Null glemte frister. Fornøyde kunder.",
        "complexity": "Lav"
      },
      {
        "name": "Månedsrapport-generering",
        "desc": "Henter nøkkeltall fra regnskapssystem → AI lager lesbar rapport → sender til kunden",
        "benefit": "Verdifull rapport levert automatisk. Kunden ser verdien.",
        "complexity": "Høy"
      },
      {
        "name": "Dokumentforespørsel-workflow",
        "desc": "Mangler bilag/info → automatisk forespørsel til kunden → purring ved ingen svar",
        "benefit": "Slipper å mase manuelt. Systemet følger opp.",
        "complexity": "Middels"
      },
      {
        "name": "Ny klient onboarding",
        "desc": "Velkomstpakke, tilgangsskjema, info om hva kunden trenger å levere",
        "benefit": "Profesjonell oppstart. Samler alt du trenger.",
        "complexity": "Middels"
      },
      {
        "name": "Kontraktfornyelse-varsling",
        "desc": "90, 60, 30 dager før kontrakten utløper → automatisk varsel + fornyelses-tilbud",
        "benefit": "Ingen kunder faller ut. Øker retention.",
        "complexity": "Lav"
      },
      {
        "name": "Timeregistrering → faktura",
        "desc": "Konsulent registrerer timer → automatisk fakturagenerering ved månedsslutt",
        "benefit": "Null glemte timer. Alt faktureres.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Rekruttering & Bemanning",
    "subtitle": "Rekrutteringsbyrå, bemanning, HR-avdelinger",
    "slug": "rekruttering-og-bemanning",
    "icon": "UserSearch",
    "automations": [
      {
        "name": "AI-screening av søknader",
        "desc": "AI leser CV + søknad → scorer mot kravspesifikasjon → rangerer kandidater",
        "benefit": "Reduserer screeningtid fra timer til minutter per stilling.",
        "complexity": "Høy"
      },
      {
        "name": "Automatisk kandidat-oppfølging",
        "desc": "Statusoppdatering til alle kandidater i pipeline: mottatt, under vurdering, intervju",
        "benefit": "Kandidater klager ofte over radio silence. Automatiserer all kommunikasjon.",
        "complexity": "Middels"
      },
      {
        "name": "Intervjubooking",
        "desc": "Kandidat mottar lenke → velger tidspunkt → begge parter får bekreftelse",
        "benefit": "Slipper 5 e-poster frem og tilbake for å finne tid.",
        "complexity": "Lav"
      },
      {
        "name": "Referansesjekk-workflow",
        "desc": "Kandidat oppgir referanser → automatisk e-post med spørsmålsskjema → svar samles",
        "benefit": "Systematisk referansesjekk uten manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "LinkedIn-sourcing",
        "desc": "Søker LinkedIn basert på kriterier → samler profiler → sender personlig outreach",
        "benefit": "Bygger pipeline automatisk.",
        "complexity": "Høy"
      },
      {
        "name": "Onboarding-checklist ny ansatt",
        "desc": "Når kandidat signerer → trigger onboarding: IT-tilgang, utstyr, velkomstpakke",
        "benefit": "Ingenting glemmes ved nyansettelse.",
        "complexity": "Middels"
      },
      {
        "name": "Stillings-publisering flerkanals",
        "desc": "Skriv stilling én gang → publiseres til Finn, LinkedIn, Karrierestart automatisk",
        "benefit": "Sparer tid og sikrer bred distribusjon.",
        "complexity": "Høy"
      },
      {
        "name": "Turnover-analyse",
        "desc": "Automatisk kvartalsrapport: antall ansettelser, avganger, tid-til-ansettelse, kostnader",
        "benefit": "Data som viser verdien av rekrutteringsarbeidet.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Bilverksted & Bilforhandler",
    "subtitle": "Verksted, bilpleie, bilforhandler, dekkhotell",
    "slug": "bilverksted-og-bilforhandler",
    "icon": "Car",
    "automations": [
      {
        "name": "AI-telefonsvarer verksted",
        "desc": "Tar imot henvendelser, registrerer bilmerke/problem, booker verkstedtime",
        "benefit": "Mekanikere kan ikke ta telefonen. AI fanger opp alle henvendelser.",
        "complexity": "Middels"
      },
      {
        "name": "Service-påminnelse",
        "desc": "Automatisk varsel basert på km-stand/tid siden siste service",
        "benefit": "Kunden glemmer aldri service. Jevn inntektsstrøm.",
        "complexity": "Lav"
      },
      {
        "name": "Dekkskifte-påminnelse",
        "desc": "Oktober/april: 'Tid for dekkskifte!' → bookinglenke",
        "benefit": "Sesongbasert omsetning sikret automatisk.",
        "complexity": "Lav"
      },
      {
        "name": "Reparasjonsstatus til kunde",
        "desc": "Bil sjekket inn → automatisk oppdatering: 'Diagnostikk ferdig', 'Deler bestilt', 'Klar for henting'",
        "benefit": "Kunden slipper å ringe og spørre. Profesjonelt.",
        "complexity": "Middels"
      },
      {
        "name": "Verksted-kalkyle",
        "desc": "Kunde beskriver problem → AI estimerer pris og tid → sender tilbud",
        "benefit": "Raskere tilbud. Kunden bestemmer seg fortere.",
        "complexity": "Middels"
      },
      {
        "name": "EU-kontroll påminnelse",
        "desc": "Automatisk varsling 2 mnd, 1 mnd, 2 uker før EU-kontroll utløper",
        "benefit": "Verdifullt for kunden. Fyller EU-kontroll-timer.",
        "complexity": "Lav"
      },
      {
        "name": "Google-anmeldelse etter service",
        "desc": "Fornøyd kunde → automatisk SMS med anmeldelseslenke",
        "benefit": "Bygger omdømme uten innsats.",
        "complexity": "Lav"
      },
      {
        "name": "Lagerbestilling deler",
        "desc": "Del brukt → automatisk bestilling eller varsel når lagerstatus er lav",
        "benefit": "Aldri tom for vanlige deler.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead fra nettskjema pushes til CRM med e-postsekvens og intern varsling.",
        "benefit": "Raskere respons, bedre pipeline.",
        "complexity": "Lav"
      }
    ],
    "count": 9
  },
  {
    "title": "Coaching & Personlig Utvikling",
    "subtitle": "Livscoach, businesscoach, mentorer, kursarrangører",
    "slug": "coaching-og-personlig-utvikling",
    "icon": "Target",
    "automations": [
      {
        "name": "AI-bookingsystem med kvalifisering",
        "desc": "Potensiell klient booker → AI stiller kvalifiseringsspørsmål → du ser svarene før samtalen",
        "benefit": "Slipper gratissamtaler med ukvalifiserte. Bedre forberedt.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk kurslevering",
        "desc": "Klient kjøper kurs → daglige/ukentlige moduler leveres automatisk via e-post",
        "benefit": "Kurs selger 24/7 uten din tid.",
        "complexity": "Middels"
      },
      {
        "name": "Oppfølging mellom sesjoner",
        "desc": "AI sender refleksjonsspørsmål mellom coaching-sesjoner → samler svar til neste møte",
        "benefit": "Dypere coaching. Klienten jobber mellom øktene.",
        "complexity": "Middels"
      },
      {
        "name": "Testimonialer-innsamling",
        "desc": "Etter X sesjoner → automatisk forespørsel om testimonial → formateres for nettside",
        "benefit": "Bygger sosialt bevis automatisk.",
        "complexity": "Lav"
      },
      {
        "name": "Webinar-registrering + oppfølging",
        "desc": "Registreringsskjema → bekreftelse → påminnelse → opptak etterpå → tilbud",
        "benefit": "Komplett webinar-funnel uten manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Instagram innholdsplan",
        "desc": "AI genererer ukentlig innholdsplan basert på dine temaer → poster automatisk",
        "benefit": "Synlighet uten timer på SoMe.",
        "complexity": "Middels"
      },
      {
        "name": "Klientfremgang-dashboard",
        "desc": "Automatisk oppsummering av klientens mål, progresjon og neste steg",
        "benefit": "Viser verdi tydelig. Øker retention.",
        "complexity": "Middels"
      },
      {
        "name": "Lead magnet-levering",
        "desc": "Last ned gratis e-bok/guide → automatisk e-postsekvens → tilbud om coaching",
        "benefit": "Konverterer leads til betalende klienter.",
        "complexity": "Lav"
      }
    ],
    "count": 8
  },
  {
    "title": "Kreativt Byrå & Freelancere",
    "subtitle": "Designere, videografer, fotografer, tekstforfattere, webdesignere",
    "slug": "kreativt-byra-og-freelancere",
    "icon": "Palette",
    "automations": [
      {
        "name": "Prosjektforespørsel-intake",
        "desc": "Klient fyller ut brief → AI strukturerer og estimerer scope → du får ferdig oversikt",
        "benefit": "Slipper 3 møter for å forstå hva kunden vil ha.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk prosjekt-oppdatering",
        "desc": "Ukentlig statusmail til klient: 'Designforslaget er 70% ferdig, leveres torsdag'",
        "benefit": "Klienten føler seg informert uten at du bruker tid.",
        "complexity": "Lav"
      },
      {
        "name": "Faktura ved milepæl",
        "desc": "Når prosjektfase markeres ferdig → automatisk delfaktura genereres",
        "benefit": "Bedre cashflow. Faktura sendes umiddelbart.",
        "complexity": "Middels"
      },
      {
        "name": "Portfolio auto-oppdatering",
        "desc": "Nytt prosjekt ferdig → AI lager case study-tekst → publiseres til nettside",
        "benefit": "Portfolio alltid oppdatert uten ekstra arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Fillevering + feedback",
        "desc": "Leverer filer via lenke → klient gir feedback i skjema → organisert i prosjektmappe",
        "benefit": "Strukturert feedback. Ingen kaotiske e-post-tråder.",
        "complexity": "Middels"
      },
      {
        "name": "Tilbudsgenerering",
        "desc": "AI lager tilbud basert på prosjekttype, scope og dine standardpriser",
        "benefit": "Profesjonelle tilbud på minutter i stedet for timer.",
        "complexity": "Middels"
      },
      {
        "name": "Sosiale medier showcase",
        "desc": "Nye prosjektbilder → AI lager post → publiseres med relevant hashtags",
        "benefit": "Viser arbeidet ditt kontinuerlig.",
        "complexity": "Middels"
      },
      {
        "name": "Kontrakt-sending",
        "desc": "Prosjekt godkjent → automatisk kontrakt med pre-utfylt info → signering via e-post",
        "benefit": "Raskere oppstart. Profesjonelt.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Utdanning & Kurs",
    "subtitle": "Privatskole, kjøreskole, musikkskole, kodekurs, online-kurs",
    "slug": "utdanning-og-kurs",
    "icon": "GraduationCap",
    "automations": [
      {
        "name": "AI-telefonsvar for påmelding",
        "desc": "Svarer spørsmål om kurs, priser, ledig plass → melder på eller booker prøvetime",
        "benefit": "Fanger opp interesserte umiddelbart. Null tapt påmelding.",
        "complexity": "Middels"
      },
      {
        "name": "Kursplan-distribusjon",
        "desc": "Ny elev → automatisk utsending av kursplan, materiell, og startinfo",
        "benefit": "Elevene er forberedt. Slipper å sende manuelt.",
        "complexity": "Lav"
      },
      {
        "name": "Fravær-varsling",
        "desc": "Elev møter ikke → automatisk varsel til foresatte/eleven + loggføring",
        "benefit": "Oppdager frafall tidlig. Viktig for gjennomføringsrate.",
        "complexity": "Middels"
      },
      {
        "name": "Karakterer/fremgang-rapport",
        "desc": "Automatisk ukentlig/månedlig fremgangsrapport til elev og eventuelt foresatte",
        "benefit": "Foreldre verdsetter oppdateringer. Øker tilfredshet.",
        "complexity": "Middels"
      },
      {
        "name": "Venteliste-håndtering",
        "desc": "Kurs fullt → venteliste → automatisk varsel ved ledig plass",
        "benefit": "Fyller plasser umiddelbart. Ingen manuell oppfølging.",
        "complexity": "Lav"
      },
      {
        "name": "Evaluering etter kurs",
        "desc": "Automatisk spørreundersøkelse ved kursslutt → rapport med innsikter",
        "benefit": "Forbedrer kursene basert på data.",
        "complexity": "Lav"
      },
      {
        "name": "Sertifikat-generering",
        "desc": "Fullført kurs → AI genererer sertifikat med navn og dato → sendes automatisk",
        "benefit": "Profesjonelt og skalerbart.",
        "complexity": "Middels"
      },
      {
        "name": "Betaling-påminnelse kurs",
        "desc": "Automatisk påminnelse før forfall + purring ved ubetalt",
        "benefit": "Sikrer inntekt uten manuelt purrearbeid.",
        "complexity": "Lav"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Raskere respons, bedre påmelding.",
        "complexity": "Lav"
      }
    ],
    "count": 9
  },
  {
    "title": "IT & Tech-selskaper",
    "subtitle": "SaaS, utvikling, IT-support, MSP, tech-startup",
    "slug": "it-og-tech-selskaper",
    "icon": "Monitor",
    "automations": [
      {
        "name": "Ticket-triagering med AI",
        "desc": "Ny supporthenvendelse → AI kategoriserer, prioriterer, og ruter til riktig team",
        "benefit": "Sparer L1-support timer. Raskere respons.",
        "complexity": "Høy"
      },
      {
        "name": "Serverovervåkning-varsling",
        "desc": "Sjekker serverstatus hvert 5. min → varsler ved nedetid/høy belastning",
        "benefit": "Oppdager problemer før kundene merker det.",
        "complexity": "Middels"
      },
      {
        "name": "Onboarding ny SaaS-kunde",
        "desc": "Ny betaling → velkomstmail → oppsettveiledning → oppfølging dag 1, 3, 7, 30",
        "benefit": "Reduserer churn drastisk. Kunden kommer i gang.",
        "complexity": "Middels"
      },
      {
        "name": "Churn-prediksjon",
        "desc": "Analyse av bruksmønster → varsel når kunde viser tegn til frafall → trigger outreach",
        "benefit": "Redd kunder før de sier opp.",
        "complexity": "Høy"
      },
      {
        "name": "Bug-rapport til Jira/Linear",
        "desc": "Kunden rapporterer bug via skjema → AI kategoriserer → oppretter issue automatisk",
        "benefit": "Strukturerte bug-rapporter uten manuell inntasting.",
        "complexity": "Middels"
      },
      {
        "name": "Release notes-generering",
        "desc": "Ny versjon → AI oppsummerer commits → genererer brukervennlige release notes",
        "benefit": "Profesjonell kommunikasjon uten devs som skriver.",
        "complexity": "Middels"
      },
      {
        "name": "Lisensfornyelse-varsling",
        "desc": "X dager før lisens utløper → automatisk påminnelse + fornyelses-lenke",
        "benefit": "Sikrer fornyelse. Reduserer churn.",
        "complexity": "Lav"
      },
      {
        "name": "KPI-dashboard oppdatering",
        "desc": "Daglig oppsummering av MRR, aktive brukere, support-tickets, uptime",
        "benefit": "Hele teamet ser nøkkeltall uten å grave.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Trening & Fitness",
    "subtitle": "PT, treningssenter, yogastudio, kampsport, dansestudio",
    "slug": "trening-og-fitness",
    "icon": "Dumbbell",
    "automations": [
      {
        "name": "AI-booking av treningsøkter",
        "desc": "Medlem ringer/melder seg på via telefon → AI booker økt/klasse",
        "benefit": "Resepsjonen er ofte ubemannet. AI fyller timene.",
        "complexity": "Middels"
      },
      {
        "name": "Medlemspåminnelse",
        "desc": "SMS 2t før klasse: 'Husk yoga kl 18! Ta med matte.'",
        "benefit": "Reduserer no-shows. Bedre klasseopplevelse.",
        "complexity": "Lav"
      },
      {
        "name": "Treningsprogram-levering",
        "desc": "Ny klient → AI lager tilpasset treningsprogram basert på mål → ukentlig oppdatering",
        "benefit": "Skalerbar personlig trening.",
        "complexity": "Høy"
      },
      {
        "name": "Medlemsfornyelse",
        "desc": "30 dager før medlemskap utløper → automatisk tilbud om fornyelse med rabatt",
        "benefit": "Forhindrer frafall. Automatisk retention.",
        "complexity": "Lav"
      },
      {
        "name": "Resultat-tracking",
        "desc": "Ukentlig spørsmål: 'Hvordan gikk treningen?' → AI analyserer fremgang → rapport til PT",
        "benefit": "PT ser fremgang uten å spørre. Klienten føler seg fulgt opp.",
        "complexity": "Middels"
      },
      {
        "name": "Instagram treningsinnhold",
        "desc": "AI genererer treningstips, motivasjonsposter, ukens øvelse → poster automatisk",
        "benefit": "Synlighet og autoritet uten tidsinvestering.",
        "complexity": "Middels"
      },
      {
        "name": "Prøvetime-oppfølging",
        "desc": "Etter gratis prøvetime → automatisk oppfølging: 'Hva synes du? Her er tilbudet.'",
        "benefit": "Konverterer prøvetimer til medlemskap.",
        "complexity": "Lav"
      },
      {
        "name": "Kostholdsplan-assistanse",
        "desc": "AI genererer enkle kostholdsforslag basert på klientens mål",
        "benefit": "Merverdi for klienten uten ekstra PT-tid.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Event & Arrangement",
    "subtitle": "Eventbyrå, bryllup, konferanser, festivaler, messer",
    "slug": "event-og-arrangement",
    "icon": "CalendarDays",
    "automations": [
      {
        "name": "Registrering + bekreftelse",
        "desc": "Deltaker registrerer seg → bekreftelsesmail med QR-kode → kalenderinvitasjon",
        "benefit": "Profesjonell registreringsprosess uten manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Påminnelser før event",
        "desc": "7 dager, 1 dag, 2 timer før: program, praktisk info, parkering",
        "benefit": "Høyere oppmøte. Deltagere er forberedt.",
        "complexity": "Lav"
      },
      {
        "name": "Leverandør-koordinering",
        "desc": "Automatisk tidslinje-mail til alle leverandører X dager før event",
        "benefit": "Alle vet hva de skal gjøre og når.",
        "complexity": "Middels"
      },
      {
        "name": "Live feedback under event",
        "desc": "QR-kode → kort spørsmål → sanntids dashboard med tilbakemeldinger",
        "benefit": "Juster i sanntid basert på deltakerfeedback.",
        "complexity": "Middels"
      },
      {
        "name": "Oppfølging etter event",
        "desc": "Takk-mail + bilder + evaluering + neste event-info",
        "benefit": "Bygger lojalitet og gjensalg.",
        "complexity": "Lav"
      },
      {
        "name": "Budsjett-tracking",
        "desc": "Alle kostnader logges → automatisk budsjett vs. faktisk-rapport",
        "benefit": "Full kostnadskontroll uten Excel-magi.",
        "complexity": "Middels"
      },
      {
        "name": "Sponsor-kommunikasjon",
        "desc": "Automatisk statusoppdatering til sponsorer: eksponering, deltakertall, SoMe-rekkevidde",
        "benefit": "Sponsorer fornøyde = sponsorer som kommer tilbake.",
        "complexity": "Middels"
      },
      {
        "name": "Billettsalg-varsling",
        "desc": "Daglig oppdatering: solgte billetter, inntekt, gjenstående kapasitet",
        "benefit": "Oversikt uten å logge inn i billettportalen.",
        "complexity": "Lav"
      }
    ],
    "count": 8
  },
  {
    "title": "Reiseliv & Overnatting",
    "subtitle": "Hotell, hytter, B&B, campingplass, turoperatører",
    "slug": "reiseliv-og-overnatting",
    "icon": "Plane",
    "automations": [
      {
        "name": "AI-telefonsvarer for reservasjoner",
        "desc": "Svarer gjester 24/7, sjekker tilgjengelighet, booker rom/hytte.",
        "benefit": "Gjester ringer ofte utenfor åpningstider. AI fanger opp ALT.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens + intern varsling",
        "desc": "Nytt lead fra nettskjema pushes til CRM og starter e-postsekvens.",
        "benefit": "Raskere respons, bedre pipeline-kvalitet.",
        "complexity": "Lav"
      },
      {
        "name": "Booking-bekreftelse + påminnelse",
        "desc": "Automatisk bekreftelsesmail + SMS-påminnelse 24t før ankomst med praktisk info.",
        "benefit": "Reduserer no-shows, profesjonelt inntrykk.",
        "complexity": "Lav"
      },
      {
        "name": "Check-in/ut automatisering",
        "desc": "Digital selvinnsjekking via lenke → nøkkelkode/info sendes automatisk.",
        "benefit": "Slipper manuell innsjekking. Skalerbar drift.",
        "complexity": "Middels"
      },
      {
        "name": "Gjeste-tilbakemelding etter opphold",
        "desc": "Automatisk SMS med survey 24t etter utsjekking → omtaleforespørsel ved høy score.",
        "benefit": "Øker anmeldelser, fanger opp misnøye tidlig.",
        "complexity": "Lav"
      },
      {
        "name": "Sesongbaserte kampanjer",
        "desc": "AI genererer tilpassede kampanjer basert på sesong, belegg og historikk.",
        "benefit": "Fyller ledig kapasitet automatisk i lavsesong.",
        "complexity": "Middels"
      },
      {
        "name": "Vedlikeholdslogg + varsling",
        "desc": "Logger vedlikeholdsbehov for rom/enheter → varsler ansatte → sporer fullføring.",
        "benefit": "Ingenting glemmes. Bedre gjesteopplevelse.",
        "complexity": "Middels"
      },
      {
        "name": "Daglig beleggrapport",
        "desc": "Automatisk oppsummering: belegg, inntekt, ankomster, avganger.",
        "benefit": "Oversikt uten manuell sjekk.",
        "complexity": "Lav"
      },
      {
        "name": "Gjenkjøps-kampanje",
        "desc": "Gjester som besøkte i fjor → automatisk invitasjon med rabatt.",
        "benefit": "Retention uten manuell oppfølging.",
        "complexity": "Lav"
      },
      {
        "name": "Lokal opplevelsesguide",
        "desc": "AI-generert guide med lokale tips, restauranter og aktiviteter sendt til gjester.",
        "benefit": "Merverdi for gjesten. Differensierer fra konkurrentene.",
        "complexity": "Middels"
      }
    ],
    "count": 10
  },
  {
    "title": "Finans & Fintech",
    "subtitle": "Fintech, forsikring, rådgivning, regnskapsbyrå, inkasso",
    "slug": "finans-og-fintech",
    "icon": "Landmark",
    "automations": [
      {
        "name": "KYC-dokumentinnhenting automatisert",
        "desc": "Ny kunde → automatisk forespørsel om ID-dokumenter → verifisering → statusoppdatering.",
        "benefit": "Reduserer manuelt KYC-arbeid drastisk. Compliance-vennlig.",
        "complexity": "Høy"
      },
      {
        "name": "Transaksjonsovervåkning + varsling",
        "desc": "Sjekker transaksjoner mot regler → flagger mistenkelige mønstre → varsler compliance.",
        "benefit": "Anti-hvitvasking. Oppdager uregelmessigheter automatisk.",
        "complexity": "Høy"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Raskere respons, bedre konvertering.",
        "complexity": "Lav"
      },
      {
        "name": "Automatisk purring og betalingsoppfølging",
        "desc": "Henter åpne fakturaer og sender purring etter definert løp.",
        "benefit": "Bedre likviditet, mindre manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Samtykke- og audit-logg (GDPR)",
        "desc": "Loggfører samtykke/avmelding i audit-spor for finanskommunikasjon.",
        "benefit": "Reduserer compliance-risiko. Påkrevd i finans.",
        "complexity": "Middels"
      },
      {
        "name": "Daglig/ukentlig KPI-rapport",
        "desc": "Samler nøkkeltall (leads, portefølje, transaksjoner) i rapport.",
        "benefit": "Gir ledelsen oversikt uten manuell rapportering.",
        "complexity": "Lav"
      },
      {
        "name": "Kundeportal-varsling",
        "desc": "Automatisk varsling ved statusendringer på kundens saker/søknader.",
        "benefit": "Kunden er alltid informert uten å ringe.",
        "complexity": "Middels"
      },
      {
        "name": "Rente-/markedsrapport-generering",
        "desc": "AI genererer ukentlig markedsoppdatering med nøkkeltall for kunder.",
        "benefit": "Posisjonerer deg som ekspert. Automatisert.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Markedsføring & SEO-byrå",
    "subtitle": "Digital markedsføring, SEO, innholdsbyrå, SoMe-byrå",
    "slug": "markedsforing-og-seo-byra",
    "icon": "Megaphone",
    "automations": [
      {
        "name": "AI-innholdsproduksjon",
        "desc": "AI genererer blogginnlegg, SoMe-poster, nyhetsbrev basert på emner og tone.",
        "benefit": "Kutter produksjonstid med 70%. Alltid friskt innhold.",
        "complexity": "Middels"
      },
      {
        "name": "SEO-rangeringsovervåkning",
        "desc": "Sjekker søkeordrangeringer daglig → varsler ved store endringer.",
        "benefit": "Oppdager fall umiddelbart. Proaktiv SEO.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Raskere respons, bedre pipeline.",
        "complexity": "Lav"
      },
      {
        "name": "Kampanjerapport-generering",
        "desc": "Automatisk henter data fra annonseplattformer → AI lager klientrapport.",
        "benefit": "Sparer timer per klient per måned.",
        "complexity": "Høy"
      },
      {
        "name": "Sosiale medier auto-scheduling",
        "desc": "AI-generert innhold postes automatisk til alle plattformer på optimal tid.",
        "benefit": "Konsistent tilstedeværelse uten manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Konkurranseanalyse",
        "desc": "Overvåker konkurrenters innhold, rangeringer og annonser automatisk.",
        "benefit": "Alltid oppdatert på konkurrenter.",
        "complexity": "Høy"
      },
      {
        "name": "A/B-test resultater → Slack",
        "desc": "Når A/B-test når signifikans → automatisk varsel med vinner.",
        "benefit": "Raskere beslutninger. Ingen manuell sjekk.",
        "complexity": "Middels"
      },
      {
        "name": "Klientprosjekt-status",
        "desc": "Ukentlig automatisk statusrapport til klienter om kampanjeresultater.",
        "benefit": "Klienten er alltid informert. Profesjonelt.",
        "complexity": "Lav"
      }
    ],
    "count": 8
  },
  {
    "title": "Logistikk & Transport",
    "subtitle": "Transportselskap, budbil, lager, shipping, last mile",
    "slug": "logistikk-og-transport",
    "icon": "Truck",
    "automations": [
      {
        "name": "Sendingssporing + kundevarsling",
        "desc": "Automatisk SMS/e-post til kunde ved hvert steg: hentet, underveis, levert.",
        "benefit": "Kunden vet alltid hvor pakken er. Færre supporthenvendelser.",
        "complexity": "Middels"
      },
      {
        "name": "Ruteoptimalisering-varsling",
        "desc": "Daglig ruteplan genereres → SMS til sjåfører med optimalisert rekkefølge.",
        "benefit": "Spart drivstoff og tid. Bedre levering.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Raskere respons, bedre pipeline.",
        "complexity": "Lav"
      },
      {
        "name": "Lagerstatus-overvåkning",
        "desc": "Sjekker lagernivå → varsler ved lav beholdning → trigger bestilling.",
        "benefit": "Aldri tom for varer. Reduserer stans.",
        "complexity": "Middels"
      },
      {
        "name": "Avvikshåndtering",
        "desc": "Forsinkelse/skade → automatisk varsel til kunde og intern eskalering.",
        "benefit": "Raskere respons. Bedre kundeopplevelse.",
        "complexity": "Middels"
      },
      {
        "name": "Faktura etter levering",
        "desc": "Levering bekreftet → automatisk faktura genereres og sendes.",
        "benefit": "Faktura sendes samme dag. Bedre likviditet.",
        "complexity": "Middels"
      },
      {
        "name": "Sjåfør-tilgjengelighetsplan",
        "desc": "Sjåfører melder tilgjengelighet → automatisk vaktplan → varsling.",
        "benefit": "Null misforståelser om vakter.",
        "complexity": "Lav"
      },
      {
        "name": "Ukentlig KPI-rapport transport",
        "desc": "Automatisk oppsummering: antall leveringer, forsinkelser, kostnader.",
        "benefit": "Data-drevet optimalisering.",
        "complexity": "Lav"
      }
    ],
    "count": 8
  },
  {
    "title": "NGO & Ideell sektor",
    "subtitle": "Frivillige organisasjoner, veldedighet, stiftelser, foreninger",
    "slug": "ngo-og-ideell-sektor",
    "icon": "Heart",
    "automations": [
      {
        "name": "Donasjon-bekreftelse + takkemail",
        "desc": "Ny donasjon → automatisk takkebrev med kvittering og skatteinformasjon.",
        "benefit": "Donorer føler seg verdsatt. Skattefradrag-info automatisk.",
        "complexity": "Lav"
      },
      {
        "name": "Frivillig-registrering + onboarding",
        "desc": "Ny frivillig melder seg → velkomstpakke, oppgaveoversikt, kontaktinfo.",
        "benefit": "Profesjonell oppstart. Frivillige vet hva de skal gjøre.",
        "complexity": "Lav"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead/støttespiller fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Bedre pipeline for støttespillere.",
        "complexity": "Lav"
      },
      {
        "name": "Event-påmelding og påminnelser",
        "desc": "Registrering til arrangementer → bekreftelse → påminnelser.",
        "benefit": "Høyere oppmøte, bedre planlegging.",
        "complexity": "Lav"
      },
      {
        "name": "Årlig giverrapport",
        "desc": "Automatisk årsoppsummering til hver giver: dine bidrag, hva de har muliggjort.",
        "benefit": "Øker gjengivelsesrate. Donorer ser sin påvirkning.",
        "complexity": "Middels"
      },
      {
        "name": "SoMe-innholdsgenerering",
        "desc": "AI lager poster om organisasjonens arbeid basert på oppdateringer.",
        "benefit": "Synlighet uten dedikert SoMe-ressurs.",
        "complexity": "Middels"
      },
      {
        "name": "Medlemsfornyelse-påminnelse",
        "desc": "X dager før medlemskap utløper → påminnelse + fornyelseslenke.",
        "benefit": "Reduserer frafall. Automatisk retention.",
        "complexity": "Lav"
      },
      {
        "name": "Støttebrev-generering",
        "desc": "AI genererer søknader om støtte/tilskudd basert på maler og prosjektdata.",
        "benefit": "Sparer timer på søknadsskriving.",
        "complexity": "Høy"
      }
    ],
    "count": 8
  },
  {
    "title": "Media & Podkast",
    "subtitle": "Podcast, YouTube, innholdsproduksjon, mediehus, bloggere",
    "slug": "media-og-podkast",
    "icon": "Mic",
    "automations": [
      {
        "name": "Episode-publisering flerkanals",
        "desc": "Ny episode → automatisk distribusjon til Spotify, Apple, YouTube + SoMe-poster.",
        "benefit": "Publiser én gang, distribuer overalt.",
        "complexity": "Middels"
      },
      {
        "name": "AI show-notes generering",
        "desc": "Transkriberer episode → AI genererer show notes, nøkkelpunkter og timestamps.",
        "benefit": "Sparer 1-2 timer per episode.",
        "complexity": "Middels"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead/lytter fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Bygger lytterbasen systematisk.",
        "complexity": "Lav"
      },
      {
        "name": "Nyhetsbrev-automatisering",
        "desc": "Ukentlig nyhetsbrev med siste episoder, blogginnlegg og høydepunkter.",
        "benefit": "Holder publikum engasjert uten manuelt arbeid.",
        "complexity": "Lav"
      },
      {
        "name": "Sponsorkommunikasjon",
        "desc": "Automatisk rapport til sponsorer: nedlastinger, rekkevidde, demografi.",
        "benefit": "Sponsorer fornøyde = fornyet sponsorat.",
        "complexity": "Middels"
      },
      {
        "name": "Gjeste-booking workflow",
        "desc": "Potensielle gjester får invitasjon → booker tid → briefing-info sendes.",
        "benefit": "Profesjonell gjeste-håndtering.",
        "complexity": "Middels"
      },
      {
        "name": "Innholds-kalender",
        "desc": "AI genererer månedlig innholdsplan basert på trender og tema-strategi.",
        "benefit": "Alltid planlagt innhold. Mindre stress.",
        "complexity": "Middels"
      },
      {
        "name": "Klipp-generering for SoMe",
        "desc": "Lange episoder → AI identifiserer beste klipp → formaterer for TikTok/Reels.",
        "benefit": "Maksimal rekkevidde fra eksisterende innhold.",
        "complexity": "Høy"
      }
    ],
    "count": 8
  },
  {
    "title": "SaaS & Produktselskaper",
    "subtitle": "SaaS-startups, produktselskaper, plattformer, apper",
    "slug": "saas-og-produktselskaper",
    "icon": "Cloud",
    "automations": [
      {
        "name": "Trial → Betalende konvertering",
        "desc": "Ny prøveperiode → onboarding-sekvens → oppfølging → konverteringstilbud.",
        "benefit": "Øker konverteringsrate fra trial til betalt.",
        "complexity": "Middels"
      },
      {
        "name": "Churn-forebygging",
        "desc": "Analyse av bruksmønster → varsel ved inaktivitet → automatisk outreach.",
        "benefit": "Redd kunder før de churner.",
        "complexity": "Høy"
      },
      {
        "name": "Leadskjema → CRM → sekvens",
        "desc": "Nytt lead fra nettskjema pushes til CRM med e-postsekvens.",
        "benefit": "Raskere respons, bedre pipeline.",
        "complexity": "Lav"
      },
      {
        "name": "Feature request-tracking",
        "desc": "Brukerforespørsler samles automatisk → kategoriseres → prioriteres.",
        "benefit": "Bygger produkt basert på kundebehov.",
        "complexity": "Middels"
      },
      {
        "name": "Automatisk changelog/release notes",
        "desc": "Nye commits/releases → AI genererer brukervennlige release notes.",
        "benefit": "Profesjonell kommunikasjon uten dev-tid.",
        "complexity": "Middels"
      },
      {
        "name": "NPS-survey + oppfølging",
        "desc": "Periodisk NPS-survey → ved lav score automatisk outreach fra CS-team.",
        "benefit": "Fanger misnøye tidlig. Bedre kundetilfredshet.",
        "complexity": "Middels"
      },
      {
        "name": "Bruksanalyse → Slack-rapport",
        "desc": "Daglig oppsummering av aktive brukere, feature-bruk, feil.",
        "benefit": "Hele teamet ser bruksdata uten å grave.",
        "complexity": "Middels"
      },
      {
        "name": "Lisensfornyelse-varsling",
        "desc": "X dager før lisens utløper → automatisk påminnelse + fornyelses-lenke.",
        "benefit": "Sikrer fornyelse. Reduserer churn.",
        "complexity": "Lav"
      }
    ],
    "count": 8
  },
  {
    "title": "Eiendomsforvaltning",
    "subtitle": "Borettslag, sameie, forvaltningsselskap, utleieforvaltning",
    "slug": "eiendomsforvaltning",
    "icon": "Building2",
    "automations": [
      {
        "name": "Vedlikeholdsforespørsel-workflow",
        "desc": "Beboer melder feil via skjema → kategoriseres → rutes til riktig håndverker → status-oppdatering.",
        "benefit": "Strukturert feilhåndtering. Beboer informert automatisk.",
        "complexity": "Middels"
      },
      {
        "name": "Husleie-påminnelse + purring",
        "desc": "Automatisk påminnelse før forfall + purring ved ubetalt husleie.",
        "benefit": "Bedre likviditet, mindre manuelt arbeid.",
        "complexity": "Lav"
      },
      {
        "name": "Kontraktfornyelse-varsling",
        "desc": "90, 60, 30 dager før leiekontrakt utløper → varsel + fornyelses-tilbud.",
        "benefit": "Ingen kontrakter glemmes. Øker retention.",
        "complexity": "Lav"
      },
      {
        "name": "Beboerportal-varsling",
        "desc": "Viktig info til beboere (dugnader, vedlikehold, møter) sendes automatisk.",
        "benefit": "Alle beboere informert. Slipper oppslagstavle.",
        "complexity": "Lav"
      },
      {
        "name": "Energi-/forbruksrapport",
        "desc": "Henter forbruksdata → genererer rapport per enhet/bygg.",
        "benefit": "Energibesparende tiltak basert på data.",
        "complexity": "Middels"
      },
      {
        "name": "Felleskostnader-beregning",
        "desc": "Automatisk beregning og fakturering av felleskostnader per enhet.",
        "benefit": "Null manuell beregning. Rettferdig fordeling.",
        "complexity": "Middels"
      },
      {
        "name": "Årsmøte-innkalling",
        "desc": "Automatisk utsending av innkalling, agenda, fullmaktsskjema til alle eiere.",
        "benefit": "Alt automatisert. Lovpålagte frister overholdt.",
        "complexity": "Lav"
      },
      {
        "name": "Ledigmelding og visning",
        "desc": "Ledig enhet → automatisk annonse + visningsbooking + interessent-oppfølging.",
        "benefit": "Raskere utleie. Mindre tomgangsleie.",
        "complexity": "Middels"
      }
    ],
    "count": 8
  },
  {
    "title": "Helseforsikring & Privat Helse",
    "subtitle": "Forsikringsselskap, privatklinikk, helseforsikring, tannhelseforsikring",
    "slug": "helseforsikring-og-privat-helse",
    "icon": "ShieldCheck",
    "automations": [
      {
        "name": "Skademelding-intake automatisert",
        "desc": "Kunde melder skade via skjema → AI kategoriserer → rutes til saksbehandler.",
        "benefit": "Raskere saksbehandling. Kunden slipper å ringe.",
        "complexity": "Middels"
      },
      {
        "name": "Forsikringsbevis-generering",
        "desc": "Ny forsikring → automatisk forsikringsbevis genereres og sendes.",
        "benefit": "Kunden får bevis umiddelbart. Profesjonelt.",
        "complexity": "Middels"
      },
      {
        "name": "Fornyelsespåminnelse",
        "desc": "X dager før forsikring utløper → automatisk påminnelse med fornyelses-lenke.",
        "benefit": "Reduserer frafall. Automatisk retention.",
        "complexity": "Lav"
      },
      {
        "name": "Helseattest-påminnelse",
        "desc": "Automatisk påminnelse til kunder om årlig helseattest/kontroll.",
        "benefit": "Bedre forebygging. Kunden føler seg ivaretatt.",
        "complexity": "Lav"
      },
      {
        "name": "Klage-håndtering workflow",
        "desc": "Klage mottas → kategoriseres → eskaleres → svar genereres → oppfølging.",
        "benefit": "Strukturert klagehåndtering. Kortere behandlingstid.",
        "complexity": "Middels"
      },
      {
        "name": "Samtykke- og audit-logg",
        "desc": "Loggfører samtykke for helsekommunikasjon og behandling.",
        "benefit": "Compliance-vennlig. Lovpålagt for helse.",
        "complexity": "Middels"
      },
      {
        "name": "Portefølje-rapport",
        "desc": "Automatisk månedlig rapport: aktive forsikringer, utbetalinger, fornyelsesrate.",
        "benefit": "Oversikt for ledelsen uten manuelt arbeid.",
        "complexity": "Middels"
      },
      {
        "name": "Behandlingskoordinering",
        "desc": "Koordinerer mellom forsikring, klinikk og pasient automatisk.",
        "benefit": "Raskere behandling. Bedre pasientopplevelse.",
        "complexity": "Høy"
      }
    ],
    "count": 8
  }
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug)
}