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
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(industry => industry.slug === slug)
}
