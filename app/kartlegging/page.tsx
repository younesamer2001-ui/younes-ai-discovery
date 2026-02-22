'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/* ────────────────────────────────────────────
   TRANSLATIONS
   ──────────────────────────────────────────── */
const T: Record<string, Record<string, string>> = {
  nav_brand: { no: "AI Integrasjon", en: "AI Integration" },
  phase1_title: { no: "Oppdag din AI-mulighet", en: "Discover your AI opportunity" },
  phase1_subtitle: { no: "Fyll inn kontaktinformasjon for å starte en gratis kartlegging av hvordan AI kan effektivisere din bedrift.", en: "Enter your contact information to start a free discovery of how AI can streamline your business." },
  company_name: { no: "Bedriftsnavn", en: "Company name" },
  contact_name: { no: "Kontaktperson", en: "Contact name" },
  email: { no: "E-post", en: "Email" },
  phone: { no: "Telefon", en: "Phone" },
  gdpr_note: { no: "Vi behandler dine data i henhold til GDPR og personopplysningsloven. Informasjonen brukes kun til å utarbeide din AI-analyse.", en: "We process your data in accordance with GDPR. Information is used solely to prepare your AI analysis." },
  start_btn: { no: "Start kartlegging", en: "Start Discovery" },
  next: { no: "Neste", en: "Next" },
  back: { no: "Tilbake", en: "Back" },
  step_of: { no: "Steg {c} av {t}", en: "Step {c} of {t}" },
  select_one: { no: "Velg ett alternativ", en: "Select one option" },
  select_multi: { no: "Velg opptil {n} alternativer", en: "Select up to {n} options" },
  select_multi_any: { no: "Velg alle som passer", en: "Select all that apply" },
  free_text_ph: { no: "Beskriv her...", en: "Describe here..." },
  optional: { no: "(Valgfritt)", en: "(Optional)" },
  results_title: { no: "Slik kan AI transformere din bransje", en: "How AI can transform your industry" },
  roi_title: { no: "Beregn din potensielle avkastning", en: "Calculate your potential return" },
  roi_missed: { no: "Anslåtte tapte henvendelser per måned", en: "Estimated missed inquiries per month" },
  roi_value: { no: "Gjennomsnittlig jobbverdi (NOK)", en: "Average job value (NOK)" },
  roi_conv: { no: "Konverteringsrate", en: "Conversion rate" },
  roi_lost_month: { no: "Tapt omsetning per måned", en: "Lost revenue per month" },
  roi_lost_year: { no: "Tapt omsetning per år", en: "Lost revenue per year" },
  roi_solution: { no: "Anbefalt løsning", en: "Recommended solution" },
  receptionist_title: { no: "Resepsjonist-sammenligningen", en: "Receptionist comparison" },
  receptionist_sol: { no: "Løsning", en: "Solution" },
  receptionist_cost: { no: "Månedlig kostnad", en: "Monthly cost" },
  receptionist_avail: { no: "Tilgjengelighet", en: "Availability" },
  receptionist_cap: { no: "Kapasitet", en: "Capacity" },
  pricing_limit: { no: "Vi tar inn maksimalt 3 nye kunder per måned for å sikre kvalitet.", en: "We onboard a maximum of 3 new clients per month to ensure quality." },
  compliance_title: { no: "Sikkerhet og regelverk", en: "Security and compliance" },
  generate_btn: { no: "Generer AI-analyse", en: "Generate AI analysis" },
  generating: { no: "Genererer din personlige analyse...", en: "Generating your personalized analysis..." },
  summary_title: { no: "Din AI-analyse", en: "Your AI analysis" },
  submit_btn: { no: "Send inn", en: "Submit" },
  submitting: { no: "Sender...", en: "Submitting..." },
  confirm_title: { no: "Takk for din henvendelse!", en: "Thank you for your inquiry!" },
  confirm_ref: { no: "Referansenummer", en: "Reference number" },
  confirm_next: { no: "Vi tar kontakt innen 24 timer for å diskutere anbefalingene med deg.", en: "We will contact you within 24 hours to discuss the recommendations with you." },
  confirm_steps_title: { no: "Neste steg", en: "Next steps" },
  confirm_step1: { no: "1. Vi gjennomgår analysen din grundig", en: "1. We thoroughly review your analysis" },
  confirm_step2: { no: "2. En rådgiver tar kontakt for en uforpliktende samtale", en: "2. An advisor contacts you for a no-obligation conversation" },
  confirm_step3: { no: "3. Vi utarbeider et skreddersydd forslag", en: "3. We prepare a customized proposal" },
  replaces: { no: "Erstatter", en: "Replaces" },
  saves: { no: "Sparer", en: "Saves" },
  builder_title: { no: "Bygg din pakke", en: "Build your package" },
  builder_subtitle: { no: "Velg løsningene du vil ha — vi tilpasser pris basert på valget ditt", en: "Select the solutions you want — we tailor pricing based on your selection" },
  builder_recommended: { no: "Anbefalt for din bransje", en: "Recommended for your industry" },
  builder_general: { no: "Flere automasjoner", en: "More automations" },
  builder_selected: { no: "valgt", en: "selected" },
  builder_none: { no: "Ingen valgt ennå", en: "None selected yet" },
  builder_tier: { no: "Estimert pakkenivå", en: "Estimated package level" },
  builder_time: { no: "Estimert tidsbesparelse", en: "Estimated time savings" },
  builder_scope: { no: "Kompleksitet", en: "Complexity" },
  builder_cta: { no: "Generer AI-analyse", en: "Generate AI analysis" },
  builder_summary: { no: "Din valgte pakke", en: "Your selected package" },
  builder_per_week: { no: "/uke", en: "/week" },
}

const t = (key: string, lang: string) => T[key]?.[lang] || T[key]?.['no'] || key

/* ────────────────────────────────────────────
   INDUSTRY DATA
   ──────────────────────────────────────────── */
const INDUSTRIES = [
  { id: 'bygg', no: 'Bygg & Håndverk', en: 'Construction & Trades' },
  { id: 'restaurant', no: 'Restaurant & Servering', en: 'Restaurant & Hospitality' },
  { id: 'helse', no: 'Helse & Omsorg', en: 'Healthcare' },
  { id: 'eiendom', no: 'Eiendom & Megling', en: 'Real Estate' },
  { id: 'advokat', no: 'Advokatfirma & Juss', en: 'Law Firm & Legal' },
  { id: 'regnskap', no: 'Regnskap & Revisjon', en: 'Accounting & Audit' },
  { id: 'butikk', no: 'Butikk & Netthandel', en: 'Retail & E-commerce' },
  { id: 'frisor', no: 'Frisør & Skjønnhet', en: 'Hair & Beauty' },
  { id: 'transport', no: 'Transport & Logistikk', en: 'Transport & Logistics' },
  { id: 'it', no: 'IT & Teknologi', en: 'IT & Technology' },
  { id: 'utdanning', no: 'Utdanning & Kurs', en: 'Education & Courses' },
  { id: 'annet', no: 'Annet', en: 'Other' },
]

type Rec = { name: string; desc: string; replaces: string; saves: string }
const INDUSTRY_RECOMMENDATIONS: Record<string, Record<string, Rec[]>> = {
  bygg: {
    no: [
      { name: "AI Telefonsvar med Nødtriage", desc: "Kunden ringer inn, AI svarer på norsk, kvalifiserer om det er nød eller rutine. Nøder videresendes umiddelbart med SMS, rutinesamtaler bookes i kalenderen.", replaces: "15-20 timer/uke med telefonhåndtering", saves: "15-20 t/uke" },
      { name: "Automatisert timebestilling + påminnelser", desc: "AI sjekker kalender, booker tid, sender bekreftelse på SMS og påminnelse før timen.", replaces: "Manuell booking og oppfølging", saves: "25% færre uteblivelser" },
      { name: "Instant tilbudskalkulering + oppfølging", desc: "Etter henvendelse genereres tilbud automatisk og sendes via SMS/e-post innen minutter. Automatisk oppfølging etter 48t og 5 dager.", replaces: "Manuell tilbudsskriving", saves: "20-30% høyere konvertering" },
      { name: "Automatisk Google-anmeldelse etter jobb", desc: "Jobb fullført, SMS med anmeldelseslenke sendes. Påminnelse etter 3 dager. Negativ tilbakemelding rutes privat til leder.", replaces: "Manuell anmeldelsesinnhenting", saves: "Kontinuerlig omdømmebygging" },
    ],
    en: [
      { name: "AI Phone Answering with Emergency Triage", desc: "Customer calls, AI answers in Norwegian, qualifies emergency vs routine. Emergencies forwarded immediately with SMS, routine calls booked into calendar.", replaces: "15-20 hrs/week phone handling", saves: "15-20 hrs/week" },
      { name: "Automated Appointment Booking + Reminders", desc: "AI checks calendar, books slot, sends confirmation SMS and reminder before appointment.", replaces: "Manual booking and follow-up", saves: "25% fewer no-shows" },
      { name: "Instant Quote Generation + Follow-up", desc: "After inquiry, auto-generates quote sent via SMS/email within minutes. Automated follow-up at 48h and 5 days.", replaces: "Manual quote writing", saves: "20-30% more lead conversion" },
      { name: "Post-Job Google Review Automation", desc: "Job complete, SMS with review link sent. Reminder after 3 days. Negative feedback routed privately to manager.", replaces: "Manual review collection", saves: "Continuous reputation building" },
    ],
  },
  restaurant: {
    no: [
      { name: "AI stemmebasert reservasjonsagent", desc: "Håndterer dato, tid, antall gjester, allergier. Sjekker tilgjengelighet og bekrefter via SMS. Fanger 50% av bestillinger etter stengetid.", replaces: "Manuell telefonreservasjon", saves: "50% flere bestillinger" },
      { name: "Uteblivelseshåndtering + venteliste", desc: "Påminnelser i flere trinn (48t, 24t, 2t) med bekreft/avbestill. Avbestillinger utløser ventelistekontakt.", replaces: "Manuell oppfølging", saves: "30-50% færre uteblivelser" },
      { name: "Automatisert anmeldelsesrespons", desc: "Overvåker Google/TripAdvisor, genererer personlige svar. Negative flagges for leder.", replaces: "Manuell anmeldelsesoppfølging", saves: "5-10 t/uke" },
      { name: "Meny-chatbot for henvendelser", desc: "Svarer på allergener, åpningstider, parkering, arrangementer 24/7.", replaces: "Repeterende kundehenvendelser", saves: "10-15 t/uke" },
    ],
    en: [
      { name: "AI Voice Reservation Agent", desc: "Handles date, time, party size, dietary needs. Checks availability and confirms via SMS. Captures 50% of after-hours bookings.", replaces: "Manual phone reservations", saves: "50% more bookings" },
      { name: "No-show Management + Waitlist", desc: "Tiered reminders (48h, 24h, 2h) with confirm/cancel. Cancellations trigger waitlist contact.", replaces: "Manual follow-up", saves: "30-50% fewer no-shows" },
      { name: "Automated Review Response", desc: "Monitors Google/TripAdvisor, generates personalized responses. Negatives flagged for manager.", replaces: "Manual review management", saves: "5-10 hrs/week" },
      { name: "Menu Inquiry Chatbot", desc: "Answers allergens, hours, parking, events 24/7.", replaces: "Repetitive customer inquiries", saves: "10-15 hrs/week" },
    ],
  },
  helse: {
    no: [
      { name: "AI timebestilling + telefonagent", desc: "Håndterer 50-100+ samtaler/dag, erstatter 1-2 resepsjonister. GDPR/helsepersonelloven-kompatibel.", replaces: "1-2 resepsjonister", saves: "50-100+ samtaler/dag" },
      { name: "Pasientregistrering før konsultasjon", desc: "Automatisert innsamling av pasientinformasjon før besøk. Sparer 4-6 timer/dag.", replaces: "Manuell dataregistrering", saves: "4-6 t/dag" },
      { name: "Timepåminnelser + ventelistehåndtering", desc: "Reduserer 15-30% uteblivelser gjennom automatiske påminnelser og smart venteliste.", replaces: "Manuell oppfølging", saves: "15-30% færre uteblivelser" },
      { name: "Reseptfornyelse og FAQ-håndtering", desc: "Automatiserer 30% av innkommende samtaler om reseptfornyelser og vanlige spørsmål.", replaces: "30% av innkommende samtaler", saves: "Betydelig tidsbesparelse" },
    ],
    en: [
      { name: "AI Appointment Management + Phone Agent", desc: "Handles 50-100+ calls/day, replaces 1-2 FTE receptionists. GDPR/healthcare-law compliant.", replaces: "1-2 receptionists", saves: "50-100+ calls/day" },
      { name: "Patient Intake Pre-visit Automation", desc: "Automated collection of patient information before visits. Saves 4-6 hours/day.", replaces: "Manual data entry", saves: "4-6 hrs/day" },
      { name: "Appointment Reminders + Waitlist Management", desc: "Reduces 15-30% no-show rates through automated reminders and smart waitlist.", replaces: "Manual follow-up", saves: "15-30% fewer no-shows" },
      { name: "Prescription Refill/FAQ Handling", desc: "Automates 30% of incoming calls about prescription refills and common questions.", replaces: "30% of incoming calls", saves: "Significant time savings" },
    ],
  },
  eiendom: {
    no: [
      { name: "AI leadkvalifisering via stemmeagent", desc: "Kvalifiserende spørsmål (kjøp/salg, tidslinje, budsjett). Scorer hot/warm/cold. Varme leads bookes umiddelbart.", replaces: "Manuell leadkvalifisering", saves: "Betydelig tidsbesparelse" },
      { name: "Automatisert visningsplanlegging", desc: "Foreslår visningstider, bekrefter med adresse, 24t påminnelse, oppfølging etter visning.", replaces: "Manuell planlegging", saves: "10-15 t/uke" },
      { name: "Eiendomsinformasjon chatbot", desc: "Svarer på kvm, fellesutgifter, byggeår, nabolag 24/7.", replaces: "Repeterende henvendelser", saves: "Tilgjengelig 24/7" },
      { name: "Markedsrapportgenerering", desc: "Månedlige automatiserte rapporter med lokale salgsdata og pristrender.", replaces: "Manuell rapportering", saves: "5-8 t/mnd" },
    ],
    en: [
      { name: "AI Lead Qualification Voice Agent", desc: "Qualifying questions (buy/sell, timeline, budget). Scored hot/warm/cold. Hot leads booked immediately.", replaces: "Manual lead qualification", saves: "Significant time savings" },
      { name: "Automated Viewing Scheduling", desc: "Proposes viewing slots, confirms with address, 24h reminder, post-viewing follow-up.", replaces: "Manual scheduling", saves: "10-15 hrs/week" },
      { name: "Property Information Chatbot", desc: "Answers sqm, fees, build year, neighborhood 24/7.", replaces: "Repetitive inquiries", saves: "Available 24/7" },
      { name: "Market Report Generation", desc: "Monthly automated reports with local sales data and price trends.", replaces: "Manual reporting", saves: "5-8 hrs/month" },
    ],
  },
  advokat: {
    no: [
      { name: "AI klientinntak og screening", desc: "Strukturerte spørsmål om juridisk problem, hastegrad, saksbeskrivelse. Screener levedyktighet, booker konsultasjon.", replaces: "Manuell inntaksprosess", saves: "10-15 t/uke" },
      { name: "Konfliktsjekk + avtaleautomatisering", desc: "Navnsøk mot klient-DB, foreslår tider, oppdragsbrev sendes automatisk.", replaces: "Manuell konfliktsjekk", saves: "5-8 t/uke" },
      { name: "Dokumentsammendrag + fristsporing", desc: "AI oppsummerer dokumenter, flagger risikoer, frister legges til kalender.", replaces: "Manuell dokumentgjennomgang", saves: "15-20 t/uke" },
      { name: "Automatiserte klientoppdateringer", desc: "Saksendringer utløser personlige oppdateringer. Månedlig sammendrag genereres automatisk.", replaces: "Manuell statusrapportering", saves: "5-10 t/uke" },
    ],
    en: [
      { name: "AI Client Intake Screening", desc: "Structured questions about legal issue, urgency, brief facts. Screens viability, books consultation.", replaces: "Manual intake process", saves: "10-15 hrs/week" },
      { name: "Conflict Checking + Appointment Automation", desc: "Name search against client DB, proposes times, engagement letter sent automatically.", replaces: "Manual conflict checking", saves: "5-8 hrs/week" },
      { name: "Document Summarization + Deadline Tracking", desc: "AI summarizes documents, flags risks, deadlines added to calendar.", replaces: "Manual document review", saves: "15-20 hrs/week" },
      { name: "Automated Client Status Updates", desc: "Case changes trigger personalized updates. Monthly summary generated automatically.", replaces: "Manual status reporting", saves: "5-10 hrs/week" },
    ],
  },
  regnskap: {
    no: [
      { name: "Automatisk dokumentinnsamling + fristpåminnelser", desc: "Kalenderdrevne påminnelser for MVA-frister. Klienter som ikke responderer får AI-telefonsamtale. Sparer 90-120 timer/år.", replaces: "Manuell dokumentjaging", saves: "90-120 t/år" },
      { name: "AI-chatbot for rutinehenvendelser", desc: "Håndterer MVA-frister, fradrag, kilometergodtgjørelse fra norsk regnskapskunnskapsbase.", replaces: "Repeterende henvendelser", saves: "10-15 t/uke" },
      { name: "Klient-onboarding automatisering", desc: "Velkomstsekvens, dokumentsjekkliste, manglende elementer påminnes automatisk. 3 uker til 3 dager.", replaces: "3 ukers onboarding", saves: "Redusert til 3 dager" },
      { name: "Automatisert finansiell rapportering", desc: "Månedlig avslutning, AI-analyse, klientsammendrag, avvik flagges automatisk.", replaces: "Manuell rapportering", saves: "10-20 t/mnd" },
    ],
    en: [
      { name: "Automated Document Collection + Deadline Reminders", desc: "Calendar-driven reminders before VAT deadlines. Non-responsive clients get AI voice call. Saves 90-120 hrs/year.", replaces: "Manual document chasing", saves: "90-120 hrs/year" },
      { name: "AI Chatbot for Routine Queries", desc: "Handles VAT deadlines, deductions, mileage from Norwegian accounting knowledge base.", replaces: "Repetitive inquiries", saves: "10-15 hrs/week" },
      { name: "Client Onboarding Automation", desc: "Welcome sequence, document checklist, missing items auto-reminded. 3 weeks to 3 days.", replaces: "3-week onboarding", saves: "Reduced to 3 days" },
      { name: "Automated Financial Reporting", desc: "Monthly close, AI analysis, client summary, anomalies flagged automatically.", replaces: "Manual reporting", saves: "10-20 hrs/month" },
    ],
  },
  butikk: {
    no: [
      { name: "Kundeservice chatbot + stemme-AI", desc: "Automatiserer 50% av henvendelser. Responstid fra 15 min til 23 sekunder.", replaces: "50% av kundehenvendelser", saves: "Respons: 15 min til 23 sek" },
      { name: "Ordresporing + returautomatisering", desc: "Håndterer «hvor er pakken min?» (20-30% av alle henvendelser) automatisk.", replaces: "20-30% av alle henvendelser", saves: "Betydelig tidsbesparelse" },
      { name: "AI produktanbefalingsmotor", desc: "Personlige anbefalinger basert på handlehistorikk og preferanser. 5-15% omsetningsvekst.", replaces: "Generiske anbefalinger", saves: "5-15% inntektsøkning" },
      { name: "Lagervarsler + etterspørselsprognoser", desc: "Automatiske varsler ved lavt lager, AI-drevet etterspørselsprognoser for optimal bestilling.", replaces: "Manuell lagerovervåking", saves: "Optimalt lagernivå" },
    ],
    en: [
      { name: "Customer Service Chatbot + Voice AI", desc: "Automates 50% of inquiries. Response time from 15 min to 23 seconds.", replaces: "50% of customer inquiries", saves: "Response: 15 min to 23 sec" },
      { name: "Order Tracking + Returns Automation", desc: "Handles 'where is my order?' (20-30% of all inquiries) automatically.", replaces: "20-30% of all inquiries", saves: "Significant time savings" },
      { name: "AI Product Recommendation Engine", desc: "Personalized recommendations based on purchase history. 5-15% revenue growth.", replaces: "Generic recommendations", saves: "5-15% revenue increase" },
      { name: "Inventory Alerts + Demand Forecasting", desc: "Automatic alerts at low stock, AI-driven demand forecasting for optimal ordering.", replaces: "Manual inventory monitoring", saves: "Optimal stock levels" },
    ],
  },
  frisor: {
    no: [
      { name: "AI telefonbooking", desc: "Fanger opp bestillinger etter stengetid 24/7. Sparer 10-20 timer/uke.", replaces: "Manuell telefonbooking", saves: "10-20 t/uke" },
      { name: "Uteblivelseshåndtering", desc: "SMS-påminnelser i flere trinn reduserer uteblivelser 30-50%, sparer ca. NOK 240 000/år.", replaces: "Manuell oppfølging", saves: "~240 000 kr/år" },
      { name: "Automatisk anmeldelsesinnhenting + lojalitetsprogram", desc: "Etter behandling sendes anmeldelsesforespørsler og lojalitetspoeng automatisk.", replaces: "Manuell anmeldelsesinnhenting", saves: "Kontinuerlig vekst" },
      { name: "AI produktanbefaling + mersalg", desc: "Personlige produktanbefalinger øker gjennomsnittlig kvittering 15-25%.", replaces: "Tilfeldig mersalg", saves: "15-25% høyere snittkvittering" },
    ],
    en: [
      { name: "AI Phone Booking", desc: "Captures after-hours appointments 24/7. Saves 10-20 hrs/week.", replaces: "Manual phone booking", saves: "10-20 hrs/week" },
      { name: "No-show Management", desc: "Tiered SMS reminders reduce no-shows 30-50%, saving ~NOK 240,000/year.", replaces: "Manual follow-up", saves: "~240,000 NOK/year" },
      { name: "Automated Review Generation + Loyalty Programs", desc: "Post-treatment review requests and loyalty points sent automatically.", replaces: "Manual review collection", saves: "Continuous growth" },
      { name: "AI Product Recommendation + Upsell", desc: "Personalized product recommendations increase average ticket 15-25%.", replaces: "Random upselling", saves: "15-25% higher avg ticket" },
    ],
  },
  transport: {
    no: [
      { name: "AI ekspedisjonskommunikasjonshub", desc: "Sparer 20-30 timer/uke per ekspeditører. Reduserer manuelt samtalevolum 70%.", replaces: "Manuell ekspedisjon", saves: "20-30 t/uke" },
      { name: "Kundeleveringssporingsvarsler", desc: "Automatiske statusoppdateringer reduserer statussamtaler med 80%.", replaces: "80% av statushenvendelser", saves: "80% færre samtaler" },
      { name: "Sjåførplanlegging + tilgjengelighetshåndtering", desc: "AI optimaliserer sjåførplaner basert på tilgjengelighet og krav.", replaces: "Manuell planlegging", saves: "Betydelig effektivisering" },
      { name: "Ruteoptimalisering + dokumentasjon", desc: "Sparer 15% på drivstoffkostnader gjennom smart ruteplanlegging.", replaces: "Manuell ruteplanlegging", saves: "15% drivstoffbesparelse" },
    ],
    en: [
      { name: "AI Dispatch Communication Hub", desc: "Saves 20-30 hrs/week per dispatcher. Reduces manual call volume 70%.", replaces: "Manual dispatch", saves: "20-30 hrs/week" },
      { name: "Customer Delivery Tracking Notifications", desc: "Automatic status updates reduce status calls by 80%.", replaces: "80% of status inquiries", saves: "80% fewer calls" },
      { name: "Driver Scheduling + Availability Management", desc: "AI optimizes driver schedules based on availability and requirements.", replaces: "Manual scheduling", saves: "Significant efficiency gains" },
      { name: "Route Optimization + Documentation", desc: "Saves 15% on fuel costs through smart route planning.", replaces: "Manual route planning", saves: "15% fuel cost savings" },
    ],
  },
  utdanning: {
    no: [
      { name: "Kurshenvendelse chatbot + stemme-AI", desc: "Håndterer 10-20 timer/uke med repeterende henvendelser om kurs, priser og tilgjengelighet.", replaces: "10-20 t/uke henvendelser", saves: "10-20 t/uke" },
      { name: "Påmeldings- og registreringsautomatisering", desc: "Betaling, bekreftelse, materialer, kalenderoppføring — alt automatisert.", replaces: "Manuell registrering", saves: "Sømløs prosess" },
      { name: "Automatisk sertifikatgenerering + mersalg", desc: "Kursgjennomføring utløser sertifikat og oppfølgingstilbud for videre kurs.", replaces: "Manuell sertifisering", saves: "Økt gjenkjøp" },
      { name: "Kapasitetshåndtering", desc: "Automatisk overvåking av kursfylling, ventelister og optimal klassefordeling.", replaces: "Manuell kapasitetsovervåking", saves: "Optimal ressursbruk" },
    ],
    en: [
      { name: "Course Inquiry Chatbot + Voice AI", desc: "Handles 10-20 hrs/week of repetitive inquiries about courses, prices and availability.", replaces: "10-20 hrs/week inquiries", saves: "10-20 hrs/week" },
      { name: "Enrollment + Registration Automation", desc: "Payment, confirmation, materials, calendar entry — all automated.", replaces: "Manual registration", saves: "Seamless process" },
      { name: "Automated Certificate Generation + Upselling", desc: "Course completion triggers certificate and follow-up offers.", replaces: "Manual certification", saves: "Increased repeat business" },
      { name: "Capacity Management", desc: "Automatic monitoring of course fill rates, waitlists and distribution.", replaces: "Manual capacity monitoring", saves: "Optimal resource use" },
    ],
  },
  it: {
    no: [
      { name: "AI telefonsvar og kundestøtte", desc: "Automatisk besvarelse av vanlige henvendelser, ruting av tekniske saker til riktig team.", replaces: "Manuell telefonhåndtering", saves: "15-20 t/uke" },
      { name: "Kundeservice-automatisering", desc: "Chatbot og e-post-AI for første-linje support, eskalering ved behov.", replaces: "Første-linje support", saves: "50% av henvendelser" },
      { name: "Intern arbeidsflytautomatisering", desc: "Automatisering av repetitive interne prosesser, rapportering og dokumenthåndtering.", replaces: "Manuelle prosesser", saves: "10-20 t/uke" },
      { name: "Rapporteringsautomatisering", desc: "Automatisk generering av klient- og prosjektrapporter med AI-analyse.", replaces: "Manuell rapportering", saves: "5-10 t/uke" },
    ],
    en: [
      { name: "AI Phone Answering & Customer Support", desc: "Automatic answering of common inquiries, routing of technical cases to the right team.", replaces: "Manual phone handling", saves: "15-20 hrs/week" },
      { name: "Customer Service Automation", desc: "Chatbot and email AI for first-line support, escalation when needed.", replaces: "First-line support", saves: "50% of inquiries" },
      { name: "Internal Workflow Automation", desc: "Automation of repetitive internal processes, reporting and document handling.", replaces: "Manual processes", saves: "10-20 hrs/week" },
      { name: "Reporting Automation", desc: "Automatic generation of client and project reports with AI analysis.", replaces: "Manual reporting", saves: "5-10 hrs/week" },
    ],
  },
  annet: {
    no: [
      { name: "AI telefonsvar", desc: "Automatisk telefonbesvarelse 24/7 med intelligent videresending og booking.", replaces: "Manuell telefonhåndtering", saves: "15-20 t/uke" },
      { name: "Kundeservice-automatisering", desc: "AI-drevet chatbot og e-post-håndtering for vanlige henvendelser.", replaces: "Repeterende kundehenvendelser", saves: "50% av henvendelser" },
      { name: "Intern arbeidsflytautomatisering", desc: "Automatisering av interne prosesser og oppgaver.", replaces: "Manuelle prosesser", saves: "10-15 t/uke" },
      { name: "Rapporteringsautomatisering", desc: "Automatisk generering av rapporter og analyser.", replaces: "Manuell rapportering", saves: "5-10 t/uke" },
    ],
    en: [
      { name: "AI Phone Answering", desc: "Automatic 24/7 phone answering with intelligent forwarding and booking.", replaces: "Manual phone handling", saves: "15-20 hrs/week" },
      { name: "Customer Service Automation", desc: "AI-powered chatbot and email handling for common inquiries.", replaces: "Repetitive customer inquiries", saves: "50% of inquiries" },
      { name: "Internal Workflow Automation", desc: "Automation of internal processes and tasks.", replaces: "Manual processes", saves: "10-15 hrs/week" },
      { name: "Reporting Automation", desc: "Automatic generation of reports and analytics.", replaces: "Manual reporting", saves: "5-10 hrs/week" },
    ],
  },
}

/* ────────────────────────────────────────────
   GENERAL AUTOMATIONS (available to all industries)
   ──────────────────────────────────────────── */
const GENERAL_AUTOMATIONS: Record<string, Rec[]> = {
  no: [
    { name: "Automatisk fakturering & purring", desc: "Fakturaer genereres og sendes automatisk etter fullført oppdrag. Purring går ut etter fastsatte intervaller uten manuelt arbeid.", replaces: "3-5 timer/uke med fakturahåndtering", saves: "3-5 t/uke" },
    { name: "AI Chatbot på nettsiden", desc: "Intelligent chatbot som svarer på vanlige spørsmål, kvalifiserer leads og booker møter — 24/7 uten ventetid.", replaces: "Manuell chat-support", saves: "10-15 t/uke" },
    { name: "Automatisert e-postoppfølging", desc: "Leads og kunder får automatiske, personaliserte e-poster basert på handling og tidspunkt. Ingen faller mellom stolene.", replaces: "Manuell e-post utsending", saves: "5-8 t/uke" },
    { name: "Social media auto-publisering", desc: "Innhold planlegges og publiseres automatisk på tvers av sosiale medier. AI foreslår innhold basert på bransjetrender.", replaces: "Manuell posting og planlegging", saves: "4-6 t/uke" },
    { name: "Kundetilfredshet & anmeldelser", desc: "Automatisk utsending av tilfredshetsmåling etter oppdrag. Fornøyde kunder sendes til Google Reviews, misfornøyde fanges opp internt.", replaces: "Manuell oppfølging av anmeldelser", saves: "2-3 t/uke" },
    { name: "Automatisert onboarding-flyt", desc: "Nye kunder mottar automatisk velkomst-e-post, kontrakter, skjemaer og oppstartsinfo uten manuelt arbeid.", replaces: "Manuell onboarding-prosess", saves: "3-4 t/uke" },
    { name: "Intern rapportering & dashboard", desc: "Automatisk genererte rapporter og dashboards som gir sanntidsoversikt over KPIer, omsetning og aktivitet.", replaces: "Manuell rapportskriving", saves: "4-6 t/uke" },
    { name: "Dokumentgenerering med AI", desc: "Kontrakter, tilbud og dokumenter genereres automatisk basert på maler og kundedata. Klar til signering på minutter.", replaces: "Manuell dokumentskriving", saves: "3-5 t/uke" },
  ],
  en: [
    { name: "Automated Invoicing & Reminders", desc: "Invoices are generated and sent automatically after completed work. Reminders go out at set intervals without manual effort.", replaces: "3-5 hours/week of invoice handling", saves: "3-5 h/week" },
    { name: "AI Website Chatbot", desc: "Intelligent chatbot that answers common questions, qualifies leads and books meetings — 24/7 with no wait time.", replaces: "Manual chat support", saves: "10-15 h/week" },
    { name: "Automated Email Follow-up", desc: "Leads and customers receive automatic, personalized emails based on actions and timing. No one falls through the cracks.", replaces: "Manual email sending", saves: "5-8 h/week" },
    { name: "Social Media Auto-publishing", desc: "Content is planned and published automatically across social media. AI suggests content based on industry trends.", replaces: "Manual posting and planning", saves: "4-6 h/week" },
    { name: "Customer Satisfaction & Reviews", desc: "Automatic satisfaction surveys after completed work. Happy customers are sent to Google Reviews, unhappy ones are caught internally.", replaces: "Manual review follow-up", saves: "2-3 h/week" },
    { name: "Automated Onboarding Flow", desc: "New customers automatically receive welcome emails, contracts, forms and onboarding info without manual work.", replaces: "Manual onboarding process", saves: "3-4 h/week" },
    { name: "Internal Reporting & Dashboard", desc: "Automatically generated reports and dashboards providing real-time overview of KPIs, revenue and activity.", replaces: "Manual report writing", saves: "4-6 h/week" },
    { name: "AI Document Generation", desc: "Contracts, quotes and documents are generated automatically based on templates and customer data. Ready for signing in minutes.", replaces: "Manual document writing", saves: "3-5 h/week" },
  ],
}

const JOB_VALUES: Record<string, number> = { bygg: 8000, restaurant: 3600, helse: 1500, eiendom: 70000, advokat: 15000, regnskap: 5000, butikk: 500, frisor: 800, transport: 3000, it: 5000, utdanning: 8000, annet: 3000 }
const MISSED_DEFAULTS: Record<string, number> = { daily: 60, weekly: 12, occasionally: 4, rarely: 1, unsure: 8 }

/* ────────────────────────────────────────────
   INDUSTRY-SPECIFIC QUESTIONS
   ──────────────────────────────────────────── */
type QuestionOption = { value: string; label: string }
type Question = { id: string; type: string; q: string; options?: QuestionOption[]; hasOther?: boolean; max?: number; optional?: boolean }

const INDUSTRY_QUESTIONS: Record<string, (lang: string) => Question[]> = {
  bygg: (lang) => [
    {
      id: 'ind_quotes', type: 'single',
      q: lang === 'no' ? 'Hvordan håndterer dere tilbudsforespørsler i dag?' : 'How do you handle quote requests today?',
      options: [
        { value: 'manual_slow', label: lang === 'no' ? 'Manuelt — tar ofte lang tid' : 'Manually — often takes a long time' },
        { value: 'manual_ok', label: lang === 'no' ? 'Manuelt — men det fungerer greit' : 'Manually — but it works okay' },
        { value: 'template', label: lang === 'no' ? 'Vi har maler, men det tar fortsatt tid' : 'We have templates, but it still takes time' },
        { value: 'system', label: lang === 'no' ? 'Vi har et system for det' : 'We have a system for it' },
      ],
    },
    {
      id: 'ind_field', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid brukes på koordinering mellom kontor og felt?' : 'How much time is spent coordinating between office and field?',
      options: [
        { value: 'a_lot', label: lang === 'no' ? 'Veldig mye — daglige telefoner og meldinger' : 'A lot — daily calls and messages' },
        { value: 'some', label: lang === 'no' ? 'Noe — men det går' : 'Some — but it works' },
        { value: 'little', label: lang === 'no' ? 'Lite — vi har gode rutiner' : 'Little — we have good routines' },
      ],
    },
  ],
  restaurant: (lang) => [
    {
      id: 'ind_reservations', type: 'single',
      q: lang === 'no' ? 'Hvordan håndterer dere bordreservasjoner?' : 'How do you handle table reservations?',
      options: [
        { value: 'phone_only', label: lang === 'no' ? 'Kun telefon' : 'Phone only' },
        { value: 'phone_online', label: lang === 'no' ? 'Telefon + nettside/app' : 'Phone + website/app' },
        { value: 'system', label: lang === 'no' ? 'Vi bruker et bookingsystem' : 'We use a booking system' },
        { value: 'walkin', label: lang === 'no' ? 'Mest drop-in' : 'Mostly walk-in' },
      ],
    },
    {
      id: 'ind_noshow', type: 'single',
      q: lang === 'no' ? 'Er no-shows (kunder som ikke dukker opp) et problem?' : 'Are no-shows a problem?',
      options: [
        { value: 'big', label: lang === 'no' ? 'Ja, det koster oss mye' : 'Yes, it costs us a lot' },
        { value: 'some', label: lang === 'no' ? 'Av og til' : 'Sometimes' },
        { value: 'no', label: lang === 'no' ? 'Ikke et stort problem' : 'Not a big problem' },
      ],
    },
  ],
  helse: (lang) => [
    {
      id: 'ind_patient_comms', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid brukes på pasient-/klientkommunikasjon utenom konsultasjoner?' : 'How much time is spent on patient/client communication outside consultations?',
      options: [
        { value: 'hours_daily', label: lang === 'no' ? 'Flere timer daglig' : 'Several hours daily' },
        { value: '1-2_hours', label: lang === 'no' ? '1–2 timer daglig' : '1–2 hours daily' },
        { value: 'little', label: lang === 'no' ? 'Relativt lite' : 'Relatively little' },
      ],
    },
    {
      id: 'ind_journal', type: 'single',
      q: lang === 'no' ? 'Bruker dere mye tid på journalføring og dokumentasjon?' : 'Do you spend a lot of time on record-keeping and documentation?',
      options: [
        { value: 'too_much', label: lang === 'no' ? 'Ja, det tar for mye tid' : 'Yes, it takes too much time' },
        { value: 'some', label: lang === 'no' ? 'Det er overkommelig' : 'It\'s manageable' },
        { value: 'digital', label: lang === 'no' ? 'Vi har gode digitale systemer' : 'We have good digital systems' },
      ],
    },
  ],
  eiendom: (lang) => [
    {
      id: 'ind_leads_volume', type: 'single',
      q: lang === 'no' ? 'Hvor mange henvendelser mottar dere i uken fra potensielle kjøpere/selgere?' : 'How many inquiries do you receive weekly from potential buyers/sellers?',
      options: [
        { value: '0-10', label: lang === 'no' ? 'Under 10' : 'Under 10' },
        { value: '10-30', label: lang === 'no' ? '10–30' : '10–30' },
        { value: '30-100', label: lang === 'no' ? '30–100' : '30–100' },
        { value: '100+', label: lang === 'no' ? 'Over 100' : 'Over 100' },
      ],
    },
    {
      id: 'ind_followup', type: 'single',
      q: lang === 'no' ? 'Hvor raskt klarer dere å følge opp nye leads?' : 'How quickly can you follow up on new leads?',
      options: [
        { value: 'instant', label: lang === 'no' ? 'Innen minutter' : 'Within minutes' },
        { value: 'hours', label: lang === 'no' ? 'Innen noen timer' : 'Within a few hours' },
        { value: 'next_day', label: lang === 'no' ? 'Neste virkedag' : 'Next business day' },
        { value: 'varies', label: lang === 'no' ? 'Varierer — noen faller mellom' : 'Varies — some fall through' },
      ],
    },
  ],
  advokat: (lang) => [
    {
      id: 'ind_intake', type: 'single',
      q: lang === 'no' ? 'Hvordan kvalifiserer dere nye klienter (intake)?' : 'How do you qualify new clients (intake)?',
      options: [
        { value: 'phone_meeting', label: lang === 'no' ? 'Telefon + møte med hver enkelt' : 'Phone + meeting with each one' },
        { value: 'form', label: lang === 'no' ? 'Skjema på nett + oppfølging' : 'Online form + follow-up' },
        { value: 'referral', label: lang === 'no' ? 'Mest via referanser' : 'Mostly via referrals' },
        { value: 'mixed', label: lang === 'no' ? 'Blanding av alt' : 'Mix of everything' },
      ],
    },
    {
      id: 'ind_timekeeping', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid bruker advokatene på timeføring og fakturering?' : 'How much time do lawyers spend on time tracking and billing?',
      options: [
        { value: 'too_much', label: lang === 'no' ? 'For mye — det er frustrerende' : 'Too much — it\'s frustrating' },
        { value: 'ok', label: lang === 'no' ? 'Det fungerer, men kan forbedres' : 'It works, but could be better' },
        { value: 'automated', label: lang === 'no' ? 'Vi har gode systemer for det' : 'We have good systems for it' },
      ],
    },
  ],
  regnskap: (lang) => [
    {
      id: 'ind_client_docs', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid brukes på å hente inn dokumenter fra kunder?' : 'How much time is spent collecting documents from clients?',
      options: [
        { value: 'too_much', label: lang === 'no' ? 'Altfor mye — vi må mase konstant' : 'Way too much — we have to nag constantly' },
        { value: 'some', label: lang === 'no' ? 'En del, men det går' : 'Quite a bit, but it works' },
        { value: 'smooth', label: lang === 'no' ? 'Det går ganske smertefritt' : 'It goes fairly smoothly' },
      ],
    },
    {
      id: 'ind_peak', type: 'single',
      q: lang === 'no' ? 'Hvordan håndterer dere toppperioder (årsoppgjør, MVA-frister)?' : 'How do you handle peak periods (year-end, VAT deadlines)?',
      options: [
        { value: 'overtime', label: lang === 'no' ? 'Overtid og stress' : 'Overtime and stress' },
        { value: 'extra_staff', label: lang === 'no' ? 'Vi leier inn ekstra folk' : 'We hire extra staff' },
        { value: 'managed', label: lang === 'no' ? 'Vi har gode rutiner for det' : 'We have good routines' },
      ],
    },
  ],
  butikk: (lang) => [
    {
      id: 'ind_channels', type: 'single',
      q: lang === 'no' ? 'Selger dere i fysisk butikk, på nett, eller begge deler?' : 'Do you sell in a physical store, online, or both?',
      options: [
        { value: 'physical', label: lang === 'no' ? 'Kun fysisk butikk' : 'Physical store only' },
        { value: 'online', label: lang === 'no' ? 'Kun nettbutikk' : 'Online store only' },
        { value: 'both', label: lang === 'no' ? 'Begge deler' : 'Both' },
      ],
    },
    {
      id: 'ind_customer_service', type: 'single',
      q: lang === 'no' ? 'Hvor mange kundehenvendelser (retur, spørsmål, klager) håndterer dere i uken?' : 'How many customer inquiries (returns, questions, complaints) do you handle per week?',
      options: [
        { value: '0-20', label: lang === 'no' ? 'Under 20' : 'Under 20' },
        { value: '20-50', label: lang === 'no' ? '20–50' : '20–50' },
        { value: '50-100', label: lang === 'no' ? '50–100' : '50–100' },
        { value: '100+', label: lang === 'no' ? 'Over 100' : 'Over 100' },
      ],
    },
  ],
  frisor: (lang) => [
    {
      id: 'ind_booking_system', type: 'single',
      q: lang === 'no' ? 'Hvordan booker kundene timer hos dere?' : 'How do customers book appointments with you?',
      options: [
        { value: 'phone_walkin', label: lang === 'no' ? 'Telefon og drop-in' : 'Phone and walk-in' },
        { value: 'online_system', label: lang === 'no' ? 'Nettbooking (f.eks. Planyo, Fixit)' : 'Online booking (e.g. Planyo, Fixit)' },
        { value: 'social', label: lang === 'no' ? 'Via sosiale medier / DM' : 'Via social media / DM' },
        { value: 'mixed', label: lang === 'no' ? 'Blanding av flere' : 'Mix of several' },
      ],
    },
    {
      id: 'ind_cancellations', type: 'single',
      q: lang === 'no' ? 'Opplever dere mye avbestillinger eller tomme tider?' : 'Do you experience many cancellations or empty slots?',
      options: [
        { value: 'a_lot', label: lang === 'no' ? 'Ja, det er et stort problem' : 'Yes, it\'s a big problem' },
        { value: 'some', label: lang === 'no' ? 'Av og til' : 'Sometimes' },
        { value: 'rare', label: lang === 'no' ? 'Sjelden' : 'Rarely' },
      ],
    },
  ],
  transport: (lang) => [
    {
      id: 'ind_dispatch', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid brukes på planlegging og koordinering av kjøretøy/sjåfører?' : 'How much time is spent planning and coordinating vehicles/drivers?',
      options: [
        { value: 'hours_daily', label: lang === 'no' ? 'Flere timer daglig' : 'Several hours daily' },
        { value: 'some', label: lang === 'no' ? 'Noe — men det fungerer' : 'Some — but it works' },
        { value: 'automated', label: lang === 'no' ? 'Vi har system for det meste' : 'We have systems for most of it' },
      ],
    },
    {
      id: 'ind_tracking', type: 'single',
      q: lang === 'no' ? 'Får kundene automatisk statusoppdateringer på leveranser?' : 'Do customers receive automatic delivery status updates?',
      options: [
        { value: 'no', label: lang === 'no' ? 'Nei, de må ringe oss' : 'No, they have to call us' },
        { value: 'partial', label: lang === 'no' ? 'Delvis — noen ganger' : 'Partially — sometimes' },
        { value: 'yes', label: lang === 'no' ? 'Ja, automatisk' : 'Yes, automatically' },
      ],
    },
  ],
  it: (lang) => [
    {
      id: 'ind_support_tickets', type: 'single',
      q: lang === 'no' ? 'Hvor mange support-henvendelser håndterer dere i uken?' : 'How many support tickets do you handle per week?',
      options: [
        { value: '0-20', label: lang === 'no' ? 'Under 20' : 'Under 20' },
        { value: '20-50', label: lang === 'no' ? '20–50' : '20–50' },
        { value: '50-100', label: lang === 'no' ? '50–100' : '50–100' },
        { value: '100+', label: lang === 'no' ? 'Over 100' : 'Over 100' },
      ],
    },
    {
      id: 'ind_onboarding_clients', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid brukes på onboarding av nye kunder?' : 'How much time is spent on onboarding new clients?',
      options: [
        { value: 'days', label: lang === 'no' ? 'Flere dager per kunde' : 'Several days per client' },
        { value: 'hours', label: lang === 'no' ? 'Noen timer per kunde' : 'A few hours per client' },
        { value: 'streamlined', label: lang === 'no' ? 'Vi har en effektiv prosess' : 'We have an efficient process' },
      ],
    },
  ],
  utdanning: (lang) => [
    {
      id: 'ind_enrollment', type: 'single',
      q: lang === 'no' ? 'Hvordan melder deltakere seg på kurs/programmer?' : 'How do participants enroll in courses/programs?',
      options: [
        { value: 'manual', label: lang === 'no' ? 'Manuelt via e-post/telefon' : 'Manually via email/phone' },
        { value: 'form', label: lang === 'no' ? 'Skjema på nett' : 'Online form' },
        { value: 'lms', label: lang === 'no' ? 'Via LMS/plattform' : 'Via LMS/platform' },
        { value: 'mixed', label: lang === 'no' ? 'Blanding av flere' : 'Mix of several' },
      ],
    },
    {
      id: 'ind_followup_students', type: 'single',
      q: lang === 'no' ? 'Hvor mye tid brukes på oppfølging og kommunikasjon med deltakere?' : 'How much time is spent on follow-up and communication with participants?',
      options: [
        { value: 'too_much', label: lang === 'no' ? 'Mye — det er en flaskehals' : 'A lot — it\'s a bottleneck' },
        { value: 'some', label: lang === 'no' ? 'En del, men det går' : 'Quite a bit, but it works' },
        { value: 'automated', label: lang === 'no' ? 'Vi har automatisert det meste' : 'We\'ve automated most of it' },
      ],
    },
  ],
  annet: (lang) => [
    {
      id: 'ind_biggest_bottleneck', type: 'single',
      q: lang === 'no' ? 'Hva er den største flaskehalsen i bedriften din akkurat nå?' : 'What is the biggest bottleneck in your business right now?',
      options: [
        { value: 'customer_comms', label: lang === 'no' ? 'Kundekommunikasjon' : 'Customer communication' },
        { value: 'admin', label: lang === 'no' ? 'Administrasjon og papirarbeid' : 'Administration and paperwork' },
        { value: 'sales', label: lang === 'no' ? 'Salg og markedsføring' : 'Sales and marketing' },
        { value: 'operations', label: lang === 'no' ? 'Drift og logistikk' : 'Operations and logistics' },
        { value: 'hiring', label: lang === 'no' ? 'Rekruttering og HR' : 'Recruitment and HR' },
      ],
    },
  ],
}

/* ────────────────────────────────────────────
   QUESTIONNAIRE STEPS
   ──────────────────────────────────────────── */
const buildQuestions = (lang: string, selectedIndustry?: string): Question[] => {
  const industryQ: Question[] = selectedIndustry && INDUSTRY_QUESTIONS[selectedIndustry]
    ? INDUSTRY_QUESTIONS[selectedIndustry](lang)
    : []

  return [
  /* ── 1. BRANSJE (lett start — identitet, ikke innsats) ── */
  {
    id: 'industry', type: 'single',
    q: lang === 'no' ? 'Hvilken bransje tilhører bedriften din?' : 'What industry is your business in?',
    options: INDUSTRIES.map((ind) => ({ value: ind.id, label: (ind as any)[lang] })),
    hasOther: true,
  },
  /* ── 1b-1c. BRANSJESPESIFIKKE SPØRSMÅL (injisert dynamisk) ── */
  ...industryQ,
  /* ── 2. STØRRELSE (fortsatt lett — bygger profil) ── */
  {
    id: 'size', type: 'single',
    q: lang === 'no' ? 'Hvor stort er teamet ditt?' : 'How big is your team?',
    options: [
      { value: 'solo', label: lang === 'no' ? 'Bare meg' : 'Just me' },
      { value: '2-5', label: lang === 'no' ? '2–5 personer' : '2–5 people' },
      { value: '6-15', label: lang === 'no' ? '6–15 personer' : '6–15 people' },
      { value: '16-50', label: lang === 'no' ? '16–50 personer' : '16–50 people' },
      { value: '51-200', label: lang === 'no' ? '51–200 personer' : '51–200 people' },
      { value: '200+', label: lang === 'no' ? 'Over 200' : 'Over 200' },
    ],
  },
  /* ── 3. KONTAKTKANALER (lett — beskrivende, ikke vurderende) ── */
  {
    id: 'contact_methods', type: 'multi',
    q: lang === 'no' ? 'Hvordan når kundene dere i dag?' : 'How do customers reach you today?',
    options: [
      { value: 'phone', label: lang === 'no' ? 'Telefon' : 'Phone' },
      { value: 'email', label: lang === 'no' ? 'E-post' : 'Email' },
      { value: 'form', label: lang === 'no' ? 'Kontaktskjema på nett' : 'Online form' },
      { value: 'social', label: lang === 'no' ? 'Sosiale medier / DM' : 'Social media / DM' },
      { value: 'walkin', label: lang === 'no' ? 'Drop-in / fysisk besøk' : 'Walk-in' },
      { value: 'chatbot', label: lang === 'no' ? 'Chat / chatbot' : 'Chat / chatbot' },
    ],
  },
  /* ── 4. SYSTEMER (nøytral kartlegging) ── */
  {
    id: 'tech', type: 'multi',
    q: lang === 'no' ? 'Hvilke verktøy og systemer bruker dere?' : 'What tools and systems do you use?',
    options: [
      { value: 'fiken', label: 'Fiken' }, { value: 'tripletex', label: 'Tripletex' },
      { value: 'visma', label: 'Visma' }, { value: 'poweroffice', label: 'PowerOffice' },
      { value: 'm365', label: 'Microsoft 365' }, { value: 'google', label: 'Google Workspace' },
      { value: 'slack', label: 'Slack / Teams' }, { value: 'hubspot', label: 'HubSpot / CRM' },
      { value: 'shopify', label: 'Shopify / Nettbutikk' }, { value: 'vipps', label: 'Vipps' },
      { value: 'calendly', label: 'Calendly / Cal.com' }, { value: 'facebook', label: 'Meta Business Suite' },
      { value: 'none', label: lang === 'no' ? 'Få / ingen digitale verktøy' : 'Few / none' },
    ],
    hasOther: true,
  },
  /* ── 5. FRIGJØRINGSMULIGHETER (reframet fra «pain» til vekst) ── */
  {
    id: 'pain', type: 'multi', max: 3,
    q: lang === 'no' ? 'Hvor vil dere frigjøre mest tid? (velg opptil 3)' : 'Where would you free up the most time? (pick up to 3)',
    options: [
      { value: 'phone_email', label: lang === 'no' ? 'Svare telefon og e-post' : 'Answering phone & email' },
      { value: 'invoicing', label: lang === 'no' ? 'Fakturering og purring' : 'Invoicing & reminders' },
      { value: 'customer_tracking', label: lang === 'no' ? 'Følge opp kunder' : 'Following up with customers' },
      { value: 'booking', label: lang === 'no' ? 'Timebestilling og kalender' : 'Booking & scheduling' },
      { value: 'marketing', label: lang === 'no' ? 'Markedsføring og innhold' : 'Marketing & content' },
      { value: 'leads', label: lang === 'no' ? 'Finne og følge opp nye kunder' : 'Finding & following up leads' },
      { value: 'reporting', label: lang === 'no' ? 'Rapportering og oversikt' : 'Reporting & dashboards' },
      { value: 'onboarding', label: lang === 'no' ? 'Onboarding av kunder' : 'Customer onboarding' },
      { value: 'internal', label: lang === 'no' ? 'Interne rutiner og oppgaver' : 'Internal routines & tasks' },
    ],
  },
  /* ── 6. TAPTE MULIGHETER (reframet fra «miss» til vekstpotensial) ── */
  {
    id: 'missed', type: 'single',
    q: lang === 'no' ? 'Hender det at henvendelser ikke blir fulgt opp i tide?' : 'Do inquiries sometimes go unanswered or get delayed?',
    options: [
      { value: 'daily', label: lang === 'no' ? 'Ja, det skjer ofte' : 'Yes, quite often' },
      { value: 'weekly', label: lang === 'no' ? 'Noen ganger i uken' : 'A few times a week' },
      { value: 'occasionally', label: lang === 'no' ? 'Av og til' : 'Occasionally' },
      { value: 'rarely', label: lang === 'no' ? 'Sjelden, vi er gode på det' : 'Rarely, we handle it well' },
      { value: 'unsure', label: lang === 'no' ? 'Vet ikke — har ikke oversikt' : 'Not sure — no tracking' },
    ],
  },
  /* ── 7. DRØMMESCENARIO (fremtidsrettet — bygger verdi) ── */
  { id: 'goals', type: 'text', q: lang === 'no' ? 'Hvis alt kunne gå på autopilot — hva ville du brukt tiden din på i stedet?' : 'If everything ran on autopilot — what would you spend your time on instead?' },
  /* ── 8. TIDSLINJE (urgency — men uten press) ── */
  {
    id: 'timeline', type: 'single',
    q: lang === 'no' ? 'Når er det aktuelt å starte?' : 'When would it make sense to start?',
    options: [
      { value: 'asap', label: lang === 'no' ? 'Jo før, jo bedre' : 'The sooner, the better' },
      { value: '1month', label: lang === 'no' ? 'I løpet av en måned' : 'Within a month' },
      { value: '3months', label: lang === 'no' ? 'I løpet av et kvartal' : 'Within a quarter' },
      { value: 'later', label: lang === 'no' ? 'Senere i år' : 'Later this year' },
      { value: 'exploring', label: lang === 'no' ? 'Bare nysgjerrig akkurat nå' : 'Just curious for now' },
    ],
  },
  /* ── 9. INVESTERINGSVILJE (erstatter budsjett — verdibasert framing) ── */
  {
    id: 'investment', type: 'single',
    q: lang === 'no' ? 'Hvor mye er det verdt å investere for å spare 20+ timer i måneden?' : 'How much would it be worth investing to save 20+ hours per month?',
    options: [
      { value: 'low', label: lang === 'no' ? 'Ønsker å starte lite og skalere' : 'Start small and scale' },
      { value: 'medium', label: lang === 'no' ? 'Klar for en skikkelig løsning' : 'Ready for a proper solution' },
      { value: 'high', label: lang === 'no' ? 'Vil ha full pakke — alt automatisert' : 'Full package — automate everything' },
      { value: 'roi_first', label: lang === 'no' ? 'Vis meg avkastningen først' : 'Show me the ROI first' },
    ],
  },
  /* ── 10. FRITEKST UTDYPING (enkel, valgfri) ── */
  { id: 'additional', type: 'text', optional: true, q: lang === 'no' ? 'Noe spesifikt du vil at vi tar hensyn til?' : 'Anything specific you\'d like us to consider?' },  /* optional — siste spørsmål trenger ikke blokkere */
]
}

/* TODO: Replace with actual Google Calendar appointment link when ENK is registered */
const BOOKING_URL = '#'

/* ────────────────────────────────────────────
   COMPLIANCE + RECEPTIONIST
   ──────────────────────────────────────────── */
const COMPLIANCE: Record<string, { title: string; desc: string }[]> = {
  no: [
    { title: 'GDPR-kompatibel', desc: 'All databehandling følger personopplysningsloven og GDPR.' },
    { title: 'Norsk datasenter', desc: 'Data lagres innenfor EØS via EU-baserte API-endepunkter.' },
    { title: 'EU AI Act-klar', desc: 'Full AI-transparens i henhold til Art. 50.' },
    { title: 'Databehandleravtale', desc: 'DPA inkludert i alle kontrakter.' },
    { title: 'Samtykkebasert opptak', desc: 'Samtaleopptak kun med aktivt samtykke.' },
  ],
  en: [
    { title: 'GDPR Compliant', desc: 'All data processing follows GDPR regulations.' },
    { title: 'European Data Center', desc: 'Data stored within EEA via EU-based API endpoints.' },
    { title: 'EU AI Act Ready', desc: 'Full AI disclosure compliance (Art. 50).' },
    { title: 'Data Processing Agreement', desc: 'DPA included with all contracts.' },
    { title: 'Consent-based Recording', desc: 'Call recording only with active caller consent.' },
  ],
}

const RECEPTIONIST: Record<string, { sol: string; cost: string; avail: string; cap: string }[]> = {
  no: [
    { sol: 'Ansatt resepsjonist', cost: '63 000 - 66 000 kr', avail: 'Man-fre, 8 timer', cap: '1 samtale om gangen' },
    { sol: 'Tradisjonell svarservice', cost: '2 000 - 15 000 kr', avail: 'Kontortid', cap: 'Delt kapasitet' },
    { sol: 'AI Resepsjonist (vår løsning)', cost: 'Tilpasset pris', avail: '24/7/365', cap: 'Ubegrenset samtidige' },
  ],
  en: [
    { sol: 'Employed receptionist', cost: '63,000 - 66,000 NOK', avail: 'Mon-Fri, 8 hours', cap: '1 call at a time' },
    { sol: 'Traditional answering service', cost: '2,000 - 15,000 NOK', avail: 'Office hours', cap: 'Shared capacity' },
    { sol: 'AI Receptionist (our solution)', cost: 'Custom pricing', avail: '24/7/365', cap: 'Unlimited simultaneous' },
  ],
}

/* ────────────────────────────────────────────
   UTILITY
   ──────────────────────────────────────────── */
const fmtNOK = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.', ',')} mill kr`
  return n.toLocaleString('nb-NO') + ' kr'
}

/* ────────────────────────────────────────────
   ANIMATED NUMBER
   ──────────────────────────────────────────── */
function AnimNum({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>(0)
  useEffect(() => {
    const end = value
    const dur = 800
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / dur, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(end * eased))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [value])
  return <span>{prefix}{display.toLocaleString('nb-NO')}{suffix}</span>
}

/* ────────────────────────────────────────────
   FRAMER MOTION VARIANTS
   ──────────────────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
}

/* ════════════════════════════════════════════
   MAIN APP COMPONENT
   ════════════════════════════════════════════ */
function KartleggingApp() {
  const searchParams = useSearchParams()
  const [lang, setLang] = useState('no')
  const [phase, setPhase] = useState(1)
  const [contact, setContact] = useState({ company: '', name: '', email: '', phone: '' })
  const [emailError, setEmailError] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [otherIndustry, setOtherIndustry] = useState('')
  const [roiInputs, setRoiInputs] = useState({ missed: 8, jobValue: 3000, convRate: 25 })
  const [aiSummary, setAiSummary] = useState('')
  const [generating, setGenerating] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [showResumeBanner, setShowResumeBanner] = useState(false)
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([])

  // ── Reset step when industry changes (so user sees new industry-specific questions) ──
  const prevIndustryRef = useRef(answers.industry)
  useEffect(() => {
    if (prevIndustryRef.current && prevIndustryRef.current !== answers.industry && phase === 2 && step > 0) {
      // Clear old industry-specific answers
      setAnswers(prev => {
        const cleaned = { ...prev }
        Object.keys(cleaned).forEach(k => { if (k.startsWith('ind_')) delete cleaned[k] })
        return cleaned
      })
      setStep(1) // go to first industry-specific question
    }
    prevIndustryRef.current = answers.industry
  }, [answers.industry, phase, step])

  // ── Pre-select industry from URL query param ──
  useEffect(() => {
    const bransje = searchParams.get('bransje')
    if (bransje) {
      const validIds = INDUSTRIES.map(i => i.id)
      if (validIds.includes(bransje)) {
        setAnswers(prev => ({ ...prev, industry: bransje }))
      }
    }
  }, [searchParams])

  // ── Load saved progress from localStorage ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kartlegging_progress')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.contact?.email && data.phase > 1 && data.phase < 8) {
          setShowResumeBanner(true)
        }
      }
    } catch {}
  }, [])

  const resumeProgress = () => {
    try {
      const saved = localStorage.getItem('kartlegging_progress')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.contact) setContact(data.contact)
        if (data.answers) setAnswers(data.answers)
        if (data.step !== undefined) setStep(data.step)
        if (data.phase) setPhase(data.phase)
        if (data.lang) setLang(data.lang)
        if (data.otherIndustry) setOtherIndustry(data.otherIndustry)
        if (data.selectedAutomations) setSelectedAutomations(data.selectedAutomations)
      }
    } catch {}
    setShowResumeBanner(false)
  }

  const dismissResume = () => {
    localStorage.removeItem('kartlegging_progress')
    setShowResumeBanner(false)
  }

  // ── Save progress to localStorage whenever state changes ──
  useEffect(() => {
    if (phase >= 2 && phase < 8) {
      try {
        localStorage.setItem('kartlegging_progress', JSON.stringify({
          contact, answers, step, phase, lang, otherIndustry, selectedAutomations,
        }))
      } catch {}
    }
    if (phase === 8) {
      localStorage.removeItem('kartlegging_progress')
    }
  }, [contact, answers, step, phase, lang, otherIndustry, selectedAutomations])

  const questions = buildQuestions(lang, answers.industry)
  const industry = answers.industry || 'annet'
  const recs = INDUSTRY_RECOMMENDATIONS[industry]?.[lang] || INDUSTRY_RECOMMENDATIONS.annet[lang]

  useEffect(() => {
    const jv = JOB_VALUES[industry] || 3000
    const missedKey = answers.missed || 'unsure'
    const missed = MISSED_DEFAULTS[missedKey] || 8
    setRoiInputs((prev) => ({ ...prev, jobValue: jv, missed }))
  }, [industry, answers.missed])

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const validatePhone = (p: string) => /^[\d\s+()-]{8,}$/.test(p.trim())
  const [phoneError, setPhoneError] = useState('')

  const handleContactSubmit = () => {
    if (!contact.company.trim() || !contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) return
    if (!validateEmail(contact.email)) { setEmailError(lang === 'no' ? 'Ugyldig e-postadresse' : 'Invalid email address'); return }
    if (!validatePhone(contact.phone)) { setPhoneError(lang === 'no' ? 'Ugyldig telefonnummer' : 'Invalid phone number'); return }
    setEmailError('')
    setPhoneError('')
    setPhase(2)
  }

  const currentQ = questions[step]
  const canNext = () => {
    if (!currentQ) return false
    const a = answers[currentQ.id]
    if (currentQ.optional) return true
    if (currentQ.type === 'text') return a && a.trim().length > 0
    if (currentQ.type === 'single') return !!a
    if (currentQ.type === 'multi') return Array.isArray(a) && a.length > 0
    return false
  }

  const handleAnswer = (qId: string, value: string, type: string) => {
    if (type === 'single') {
      setAnswers((p) => ({ ...p, [qId]: value }))
    } else if (type === 'multi') {
      setAnswers((p) => {
        const prev = p[qId] || []
        const max = currentQ?.max
        if (prev.includes(value)) return { ...p, [qId]: prev.filter((v: string) => v !== value) }
        if (max && prev.length >= max) return p
        return { ...p, [qId]: [...prev, value] }
      })
    } else {
      setAnswers((p) => ({ ...p, [qId]: value }))
    }
  }

  const nextStep = () => { if (step < questions.length - 1) setStep(step + 1); else setPhase(3) }
  const prevStep = () => { if (step > 0) setStep(step - 1); else setPhase(1) }

  const roiCalc = () => {
    const lostMonth = roiInputs.missed * roiInputs.jobValue * (roiInputs.convRate / 100)
    const lostYear = lostMonth * 12
    const autoCount = selectedAutomations.length
    const tierName = autoCount >= 6 ? 'Vekst' : autoCount >= 3 ? 'Profesjonell' : 'Starter'
    return { lostMonth: Math.round(lostMonth), lostYear: Math.round(lostYear), tierName }
  }

  const generateSummary = async () => {
    setGenerating(true)
    const industryLabel = INDUSTRIES.find((i) => i.id === industry)?.[lang as 'no' | 'en'] || industry
    // Collect industry-specific answers for AI context
    const indAnswers = Object.entries(answers)
      .filter(([k]) => k.startsWith('ind_'))
      .map(([k, v]) => {
        const q = questions.find(q => q.id === k)
        const label = q ? q.q : k
        const val = Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? (q?.options?.find(o => o.value === v)?.label || v) : String(v))
        return `${label}: ${val}`
      })
      .join('\n')
    const indSection = indAnswers ? `\nBransjespesifikke svar:\n${indAnswers}` : ''
    const indSectionEn = indAnswers ? `\nIndustry-specific answers:\n${indAnswers}` : ''
    const prompt = lang === 'no'
      ? `Du er en AI-forretningsrådgiver for et norsk selskap som selger AI-automatisering til SMB-er. Basert på følgende informasjon, generer en profesjonell analyse på norsk:\n\nBedrift: ${contact.company}\nBransje: ${industryLabel}\nStørrelse: ${answers.size}${indSection}\nØnsker å frigjøre tid på: ${(answers.pain || []).join(', ')}\nNåværende systemer: ${(answers.tech || []).join(', ')}\nKundekontaktmetoder: ${(answers.contact_methods || []).join(', ')}\nHenvendelser som ikke følges opp: ${answers.missed}\nInvesteringsvilje: ${answers.investment}\nTidslinje: ${answers.timeline}\nDrømmescenario: ${answers.goals || 'Ikke spesifisert'}\nValgte automasjoner: ${selectedAutomations.join(', ') || 'Ingen valgt'}\nTilleggsinformasjon: ${answers.additional || 'Ingen'}\n\nBruk de bransjespesifikke svarene aktivt til å tilpasse anbefalingene. Gi analyse i dette formatet:\nOPPSUMMERING: 3-4 setninger om bedriftssituasjonen\nANBEFALINGER: 3-5 spesifikke AI-løsninger med forklaringer\nPRIORITET: Hvilken løsning bør implementeres først og hvorfor\nESTIMERT ROI: Forventet avkastning basert på bransjedata`
      : `You are an AI business advisor for a Norwegian company selling AI automation to SMBs. Based on the following information, generate a professional analysis in English:\n\nCompany: ${contact.company}\nIndustry: ${industryLabel}\nSize: ${answers.size}${indSectionEn}\nWants to free up time on: ${(answers.pain || []).join(', ')}\nCurrent systems: ${(answers.tech || []).join(', ')}\nCustomer contact methods: ${(answers.contact_methods || []).join(', ')}\nUnanswered inquiries: ${answers.missed}\nInvestment willingness: ${answers.investment}\nTimeline: ${answers.timeline}\nDream scenario: ${answers.goals || 'Not specified'}\nSelected automations: ${selectedAutomations.join(', ') || 'None selected'}\nAdditional info: ${answers.additional || 'None'}\n\nUse the industry-specific answers to actively tailor recommendations. Provide analysis in this format:\nSUMMARY: 3-4 sentences about the business situation\nRECOMMENDATIONS: 3-5 specific AI solutions with explanations\nPRIORITY: Which solution to implement first and why\nESTIMATED ROI: Expected return based on industry data`

    try {
      const res = await fetch('/api/kartlegging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'analyze', prompt }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setAiSummary(data.summary || '')
    } catch {
      const r = roiCalc()
      setAiSummary(
        lang === 'no'
          ? `OPPSUMMERING:\n${contact.company} er en ${industryLabel.toLowerCase()}-bedrift med ${answers.size} ansatte som søker AI-integrasjonsløsninger. Basert på kartleggingen ser vi betydelige muligheter for effektivisering, spesielt innen ${(answers.pain || []).slice(0, 2).join(' og ')}.\n\nANBEFALINGER:\n${recs.map((rc: Rec, i: number) => `${i + 1}. ${rc.name}: ${rc.desc}`).join('\n')}\n\nPRIORITET:\nVi anbefaler å starte med ${recs[0]?.name} da dette gir raskest avkastning.\n\nPOTENSIAL:\nEstimert tapt omsetning uten AI: ca. ${fmtNOK(r.lostYear)} årlig. Anbefalt pakkenivå: ${r.tierName}. Book en samtale for tilpasset pris.`
          : `SUMMARY:\n${contact.company} is a ${industryLabel.toLowerCase()} business with ${answers.size} employees seeking AI integration solutions. We see significant opportunities, especially in ${(answers.pain || []).slice(0, 2).join(' and ')}.\n\nRECOMMENDATIONS:\n${recs.map((rc: Rec, i: number) => `${i + 1}. ${rc.name}: ${rc.desc}`).join('\n')}\n\nPRIORITY:\nWe recommend starting with ${recs[0]?.name} as this provides the fastest return.\n\nPOTENTIAL:\nEstimated lost revenue without AI: approx. ${fmtNOK(r.lostYear)} annually. Recommended tier: ${r.tierName}. Book a call for custom pricing.`
      )
    }
    setGenerating(false)
    setPhase(6)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const roi = roiCalc()
    try {
      const res = await fetch('/api/kartlegging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit',
          contact,
          answers: { ...answers, industryOther: otherIndustry },
          selectedAutomations,
          aiSummary,
          roiData: roi,
          recommendedTier: roi.tierName,
          language: lang,
        }),
      })
      const data = await res.json()
      setRefNumber(data.refNumber || 'YAI-' + Math.random().toString(36).substr(2, 8).toUpperCase())
    } catch {
      setRefNumber('YAI-' + Math.random().toString(36).substr(2, 8).toUpperCase())
    }
    setSubmitting(false)
    setPhase(8)
  }

  const roi = roiCalc()

  /* ── Styles ── */
  const gold = '#c9a96e'
  const bg = '#0a0a0f'
  const cardBg = 'rgba(255,255,255,0.03)'
  const cardBorder = 'rgba(255,255,255,0.06)'
  const textPrimary = '#f0f0f0'
  const textSecondary = 'rgba(255,255,255,0.55)'
  const textMuted = 'rgba(255,255,255,0.35)'

  const wrapStyle: React.CSSProperties = { minHeight: '100vh', background: `linear-gradient(180deg, ${bg} 0%, #0d0d15 50%, ${bg} 100%)`, color: textPrimary, fontFamily: "'DM Sans', sans-serif" }
  const containerStyle: React.CSSProperties = { maxWidth: 720, margin: '0 auto', padding: '24px 20px 60px' }
  const cardStyle: React.CSSProperties = { background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: '28px 24px' }
  const btnPrimary: React.CSSProperties = { background: gold, color: '#0a0a0f', border: 'none', borderRadius: 12, padding: '14px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", width: '100%', transition: 'opacity 0.2s' }
  const btnSecondary: React.CSSProperties = { background: 'transparent', color: textSecondary, border: `1px solid ${cardBorder}`, borderRadius: 10, padding: '10px 20px', fontWeight: 500, fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }
  const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: `1px solid ${cardBorder}`, borderRadius: 10, padding: '12px 16px', color: textPrimary, fontSize: 15, width: '100%', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif", outline: 'none' }
  const headingFont: React.CSSProperties = { fontFamily: "'Playfair Display', serif" }
  const optionBase: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: `1px solid ${cardBorder}`, borderRadius: 10, padding: '12px 16px', cursor: 'pointer', transition: 'all 0.15s', fontSize: 14, textAlign: 'left' }
  const optionSelected: React.CSSProperties = { ...optionBase, border: `1.5px solid ${gold}`, background: 'rgba(201,169,110,0.08)' }

  return (
    <div style={wrapStyle}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::selection{background:rgba(201,169,110,0.3)}input:focus,textarea:focus{border-color:rgba(201,169,110,0.4)!important;outline:none}@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 720, margin: '0 auto', padding: '20px 20px 0' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          <img src="/arxon-icon.png" alt="Arxon" style={{ width: 30, height: 30 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase' as const }}>Arxon</span>
        </a>
        <button onClick={() => setLang(lang === 'no' ? 'en' : 'no')} style={{ ...btnSecondary, padding: '6px 14px', fontSize: 13 }}>{lang === 'no' ? 'EN' : 'NO'}</button>
      </nav>

      {/* RESUME BANNER */}
      <AnimatePresence>
        {showResumeBanner && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ maxWidth: 720, margin: '12px auto 0', padding: '12px 20px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: '#f0f0f0' }}>
              {lang === 'no' ? '📋 Du har en ufullstendig kartlegging. Vil du fortsette?' : '📋 You have an incomplete discovery. Want to continue?'}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={resumeProgress} style={{ background: gold, color: bg, border: 'none', borderRadius: 8, padding: '6px 16px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                {lang === 'no' ? 'Fortsett' : 'Resume'}
              </button>
              <button onClick={dismissResume} style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 12px', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                {lang === 'no' ? 'Start på nytt' : 'Start fresh'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <div style={containerStyle}>
        <AnimatePresence mode="wait">

          {/* ═══════════ PHASE 1: CONTACT ═══════════ */}
          {phase === 1 && (
            <motion.div key="phase1" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <div style={{ textAlign: 'center', marginBottom: 36, marginTop: 40 }}>
                <h1 style={{ ...headingFont, fontSize: 'clamp(26px, 5vw, 36px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>{t('phase1_title', lang)}</h1>
                <p style={{ color: textSecondary, fontSize: 15, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>{t('phase1_subtitle', lang)}</p>
              </div>
              <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('company_name', lang)}</label>
                  <input style={inputStyle} value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('contact_name', lang)}</label>
                  <input style={inputStyle} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('email', lang)}</label>
                  <input type="email" style={{ ...inputStyle, borderColor: emailError ? '#ef4444' : cardBorder }} value={contact.email} onChange={(e) => { setContact({ ...contact, email: e.target.value }); setEmailError('') }} />
                  {emailError && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{emailError}</span>}
                </div>
                <div>
                  <label style={{ fontSize: 13, color: textSecondary, marginBottom: 6, display: 'block' }}>{t('phone', lang)} <span style={{ color: gold }}>*</span></label>
                  <input type="tel" style={{ ...inputStyle, borderColor: phoneError ? '#ef4444' : cardBorder }} value={contact.phone} onChange={(e) => { setContact({ ...contact, phone: e.target.value }); setPhoneError('') }} placeholder={lang === 'no' ? 'F.eks. 412 34 567' : 'E.g. 412 34 567'} />
                  {phoneError && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>{phoneError}</span>}
                </div>
                <button style={{ ...btnPrimary, marginTop: 8, opacity: (!contact.company || !contact.name || !contact.email || !contact.phone) ? 0.4 : 1 }} onClick={handleContactSubmit} disabled={!contact.company || !contact.name || !contact.email || !contact.phone}>{t('start_btn', lang)}</button>
                <p style={{ color: textMuted, fontSize: 12, lineHeight: 1.5, textAlign: 'center', marginTop: 4 }}>{t('gdpr_note', lang)}</p>
              </div>
            </motion.div>
          )}

          {/* ═══════════ PHASE 2: QUESTIONNAIRE ═══════════ */}
          {phase === 2 && currentQ && (
            <motion.div key={`phase2-${step}`} variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: textSecondary }}>{t('step_of', lang).replace('{c}', String(step + 1)).replace('{t}', String(questions.length))}</span>
                  <span style={{ fontSize: 13, color: gold }}>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${((step + 1) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${gold}, #a8884d)`, borderRadius: 2, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              <div style={cardStyle}>
                <h2 style={{ ...headingFont, fontSize: 20, fontWeight: 600, marginBottom: 6, lineHeight: 1.35 }}>{currentQ.q}</h2>
                {currentQ.optional && <span style={{ fontSize: 12, color: textMuted }}>{t('optional', lang)}</span>}
                {currentQ.type === 'single' && <p style={{ fontSize: 13, color: textMuted, marginBottom: 16, marginTop: 4 }}>{t('select_one', lang)}</p>}
                {currentQ.type === 'multi' && <p style={{ fontSize: 13, color: textMuted, marginBottom: 16, marginTop: 4 }}>{currentQ.max ? t('select_multi', lang).replace('{n}', String(currentQ.max)) : t('select_multi_any', lang)}</p>}

                {(currentQ.type === 'single' || currentQ.type === 'multi') && (
                  <div style={{ display: 'grid', gridTemplateColumns: (currentQ.options?.length || 0) > 6 ? '1fr 1fr' : '1fr', gap: 8, marginTop: 16 }}>
                    {currentQ.options?.map((opt) => {
                      const isSelected = currentQ.type === 'single' ? answers[currentQ.id] === opt.value : (answers[currentQ.id] || []).includes(opt.value)
                      return (
                        <motion.div key={opt.value} style={isSelected ? optionSelected : optionBase} onClick={() => handleAnswer(currentQ.id, opt.value, currentQ.type)}
                          whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }} whileTap={{ scale: 0.98 }}>
                          <span style={{ color: isSelected ? gold : textPrimary }}>{opt.label}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                {currentQ.id === 'industry' && answers.industry === 'annet' && (
                  <input placeholder={lang === 'no' ? 'Spesifiser bransje...' : 'Specify industry...'} style={{ ...inputStyle, marginTop: 12 }} value={otherIndustry} onChange={(e) => setOtherIndustry(e.target.value)} />
                )}

                {currentQ.type === 'text' && (
                  <textarea rows={4} placeholder={t('free_text_ph', lang)} style={{ ...inputStyle, resize: 'vertical', marginTop: 16, minHeight: 100 }} value={answers[currentQ.id] || ''} onChange={(e) => handleAnswer(currentQ.id, e.target.value, 'text')} />
                )}

                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button style={btnSecondary} onClick={prevStep}>{t('back', lang)}</button>
                  <button style={{ ...btnPrimary, opacity: canNext() || currentQ.optional ? 1 : 0.4 }} onClick={nextStep} disabled={!canNext() && !currentQ.optional}>{step === questions.length - 1 ? (lang === 'no' ? 'Se resultater' : 'See results') : t('next', lang)}</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════ PHASE 3: RESULTS ═══════════ */}
          {phase === 3 && (
            <motion.div key="phase3" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 32 }}>
                <h2 style={{ ...headingFont, fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>{t('results_title', lang)}</h2>
                <p style={{ color: textSecondary, fontSize: 14, textAlign: 'center', marginBottom: 28 }}>{INDUSTRIES.find((i) => i.id === industry)?.[lang as 'no' | 'en']}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {recs.map((rec: Rec, i: number) => (
                    <motion.div key={i} custom={i} variants={cardVariants} initial="initial" animate="animate" style={{ ...cardStyle, padding: '22px 22px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        <div style={{ minWidth: 36, height: 36, borderRadius: 8, background: 'rgba(201,169,110,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: gold, fontWeight: 700, fontSize: 15 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{rec.name}</h3>
                          <p style={{ color: textSecondary, fontSize: 13.5, lineHeight: 1.55, marginBottom: 12 }}>{rec.desc}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            <span style={{ fontSize: 12, color: textMuted, background: 'rgba(255,255,255,0.03)', padding: '4px 10px', borderRadius: 6, border: `1px solid ${cardBorder}` }}>{t('replaces', lang)}: {rec.replaces}</span>
                            <span style={{ fontSize: 12, color: gold, background: 'rgba(201,169,110,0.06)', padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(201,169,110,0.15)' }}>{t('saves', lang)}: {rec.saves}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ROI Calculator */}
              <div style={{ ...cardStyle, marginBottom: 28, padding: '28px 24px' }}>
                <h3 style={{ ...headingFont, fontSize: 22, fontWeight: 600, marginBottom: 20 }}>{t('roi_title', lang)}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>{t('roi_missed', lang)}</span><span style={{ color: gold }}>{roiInputs.missed}</span>
                    </label>
                    <input type="range" min={1} max={100} value={roiInputs.missed} onChange={(e) => setRoiInputs({ ...roiInputs, missed: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>{t('roi_value', lang)}</span><span style={{ color: gold }}>{roiInputs.jobValue.toLocaleString('nb-NO')}</span>
                    </label>
                    <input type="range" min={200} max={100000} step={100} value={roiInputs.jobValue} onChange={(e) => setRoiInputs({ ...roiInputs, jobValue: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: textSecondary, display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>{t('roi_conv', lang)}</span><span style={{ color: gold }}>{roiInputs.convRate}%</span>
                    </label>
                    <input type="range" min={5} max={80} value={roiInputs.convRate} onChange={(e) => setRoiInputs({ ...roiInputs, convRate: +e.target.value })} style={{ width: '100%', accentColor: gold }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 6 }}>{t('roi_lost_month', lang)}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}><AnimNum value={roi.lostMonth} suffix=" kr" /></div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: textMuted, marginBottom: 6 }}>{t('roi_lost_year', lang)}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}><AnimNum value={roi.lostYear} suffix=" kr" /></div>
                  </div>
                </div>
                <p style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: textSecondary, lineHeight: 1.5 }}>
                  {lang === 'no'
                    ? 'Bygg pakken din i neste steg, så diskuterer vi pris på samtalen.'
                    : 'Build your package in the next step, and we\'ll discuss pricing on the call.'}
                </p>
              </div>

              {/* Receptionist Comparison */}
              <div style={{ ...cardStyle, marginBottom: 28, padding: '24px 20px', overflowX: 'auto' }}>
                <h4 style={{ ...headingFont, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>{t('receptionist_title', lang)}</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${cardBorder}` }}>
                      {[t('receptionist_sol', lang), t('receptionist_cost', lang), t('receptionist_avail', lang), t('receptionist_cap', lang)].map((h) => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 6px', color: textMuted, fontWeight: 500, fontSize: 12 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RECEPTIONIST[lang].map((r, i) => (
                      <tr key={i} style={{ borderBottom: i < 2 ? `1px solid ${cardBorder}` : 'none', background: i === 2 ? 'rgba(201,169,110,0.04)' : 'transparent' }}>
                        <td style={{ padding: '10px 6px', fontWeight: i === 2 ? 600 : 400, color: i === 2 ? gold : textPrimary }}>{r.sol}</td>
                        <td style={{ padding: '10px 6px', color: textSecondary }}>{r.cost}</td>
                        <td style={{ padding: '10px 6px', color: i === 2 ? gold : textSecondary }}>{r.avail}</td>
                        <td style={{ padding: '10px 6px', color: i === 2 ? gold : textSecondary }}>{r.cap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Compliance */}
              <div style={{ ...cardStyle, marginBottom: 32, padding: '22px 22px' }}>
                <h4 style={{ ...headingFont, fontSize: 17, fontWeight: 600, marginBottom: 14 }}>{t('compliance_title', lang)}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {COMPLIANCE[lang].map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: gold, fontSize: 11, marginTop: 4 }}>&#9679;</span>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{c.title}</span>
                        <span style={{ fontSize: 12.5, color: textSecondary }}> — {c.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button style={btnPrimary} onClick={() => { /* Pre-select all industry recommendations */setSelectedAutomations(recs.map((r: Rec) => r.name)); setPhase(4) }}>
                {lang === 'no' ? 'Bygg din pakke →' : 'Build your package →'}
              </button>
            </motion.div>
          )}

          {/* ═══════════ PHASE 4: PACKAGE BUILDER ═══════════ */}
          {phase === 4 && (() => {
            const industryRecs = recs
            const generalRecs = GENERAL_AUTOMATIONS[lang] || GENERAL_AUTOMATIONS.no
            const allAutomations = [...industryRecs.map((r: Rec, i: number) => ({ ...r, source: 'industry' as const, idx: i })), ...generalRecs.map((r: Rec, i: number) => ({ ...r, source: 'general' as const, idx: i + industryRecs.length }))]
            const selected = allAutomations.filter(a => selectedAutomations.includes(a.name))
            const totalCount = selected.length

            /* Tier calculation */
            const tierLevel = totalCount <= 2 ? 'Starter' : totalCount <= 5 ? 'Profesjonell' : 'Vekst'
            const tierColor = tierLevel === 'Starter' ? '#6ee7b7' : tierLevel === 'Profesjonell' ? '#c9a96e' : '#a78bfa'

            /* Parse time savings */
            const parseHours = (s: string): number => {
              const m1 = s.match(/(\d+)-(\d+)\s*t/)
              if (m1) return (parseInt(m1[1]) + parseInt(m1[2])) / 2
              const m2 = s.match(/(\d+)\s*t/)
              if (m2) return parseInt(m2[1])
              return 0
            }
            const totalHours = selected.reduce((sum, a) => sum + parseHours(a.saves), 0)

            /* Scope bar (0-100) */
            const scopePercent = Math.min(100, Math.round((totalCount / 8) * 100))

            const toggleAutomation = (name: string) => {
              setSelectedAutomations(prev =>
                prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
              )
            }

            return (
              <motion.div key="phase4" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <div style={{ marginTop: 32, marginBottom: 28, textAlign: 'center' }}>
                  <h2 style={{ ...headingFont, fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 700, marginBottom: 8 }}>{t('builder_title', lang)}</h2>
                  <p style={{ color: textSecondary, fontSize: 14, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>{t('builder_subtitle', lang)}</p>
                </div>

                {/* ── Summary panel (sticky) ── */}
                <div style={{
                  ...cardStyle, marginBottom: 24, padding: '20px 22px',
                  border: `1.5px solid ${totalCount > 0 ? gold : cardBorder}`,
                  background: totalCount > 0 ? 'rgba(201,169,110,0.04)' : cardBg,
                  position: 'sticky', top: 12, zIndex: 10,
                  backdropFilter: 'blur(16px)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: totalCount > 0 ? 16 : 0 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{t('builder_summary', lang)}</span>
                    <span style={{ fontSize: 13, color: totalCount > 0 ? gold : textMuted }}>
                      {totalCount} {t('builder_selected', lang)}
                    </span>
                  </div>

                  {totalCount > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      {/* Tier */}
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: textMuted, marginBottom: 6 }}>{t('builder_tier', lang)}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: tierColor }}>{tierLevel}</div>
                      </div>
                      {/* Time */}
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: textMuted, marginBottom: 6 }}>{t('builder_time', lang)}</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: gold }}>~{Math.round(totalHours)}t{t('builder_per_week', lang)}</div>
                      </div>
                      {/* Scope */}
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: textMuted, marginBottom: 6 }}>{t('builder_scope', lang)}</div>
                        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, marginTop: 8 }}>
                          <div style={{ height: '100%', width: `${scopePercent}%`, background: `linear-gradient(90deg, #6ee7b7, ${gold}, #a78bfa)`, borderRadius: 3, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  {totalCount === 0 && (
                    <p style={{ fontSize: 13, color: textMuted, marginTop: 8 }}>{t('builder_none', lang)}</p>
                  )}
                </div>

                {/* ── Industry Recommendations ── */}
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: gold, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(201,169,110,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>★</span>
                    {t('builder_recommended', lang)}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {industryRecs.map((rec: Rec, i: number) => {
                      const isSelected = selectedAutomations.includes(rec.name)
                      return (
                        <motion.div key={`ind-${i}`}
                          style={{
                            ...cardStyle, padding: '18px 20px', cursor: 'pointer',
                            border: isSelected ? `1.5px solid ${gold}` : `1px solid ${cardBorder}`,
                            background: isSelected ? 'rgba(201,169,110,0.06)' : cardBg,
                          }}
                          whileHover={{ borderColor: isSelected ? gold : 'rgba(255,255,255,0.12)' }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => toggleAutomation(rec.name)}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 5, color: isSelected ? gold : textPrimary }}>{rec.name}</h4>
                              <p style={{ fontSize: 13, color: textSecondary, lineHeight: 1.5, marginBottom: 10 }}>{rec.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                <span style={{ fontSize: 11, color: textMuted, background: 'rgba(255,255,255,0.03)', padding: '3px 8px', borderRadius: 5, border: `1px solid ${cardBorder}` }}>{t('replaces', lang)}: {rec.replaces}</span>
                                <span style={{ fontSize: 11, color: gold, background: 'rgba(201,169,110,0.06)', padding: '3px 8px', borderRadius: 5, border: '1px solid rgba(201,169,110,0.15)' }}>{t('saves', lang)}: {rec.saves}</span>
                              </div>
                            </div>
                            <div style={{
                              minWidth: 28, height: 28, borderRadius: 8,
                              border: isSelected ? `2px solid ${gold}` : `2px solid rgba(255,255,255,0.15)`,
                              background: isSelected ? gold : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s', marginTop: 2,
                            }}>
                              {isSelected && <span style={{ color: bg, fontSize: 14, fontWeight: 700 }}>✓</span>}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* ── General Automations ── */}
                <div style={{ marginBottom: 28 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: textPrimary, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>+</span>
                    {t('builder_general', lang)}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {generalRecs.map((rec: Rec, i: number) => {
                      const isSelected = selectedAutomations.includes(rec.name)
                      return (
                        <motion.div key={`gen-${i}`}
                          style={{
                            ...cardStyle, padding: '18px 20px', cursor: 'pointer',
                            border: isSelected ? `1.5px solid ${gold}` : `1px solid ${cardBorder}`,
                            background: isSelected ? 'rgba(201,169,110,0.06)' : cardBg,
                          }}
                          whileHover={{ borderColor: isSelected ? gold : 'rgba(255,255,255,0.12)' }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => toggleAutomation(rec.name)}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 5, color: isSelected ? gold : textPrimary }}>{rec.name}</h4>
                              <p style={{ fontSize: 13, color: textSecondary, lineHeight: 1.5, marginBottom: 10 }}>{rec.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                <span style={{ fontSize: 11, color: textMuted, background: 'rgba(255,255,255,0.03)', padding: '3px 8px', borderRadius: 5, border: `1px solid ${cardBorder}` }}>{t('replaces', lang)}: {rec.replaces}</span>
                                <span style={{ fontSize: 11, color: gold, background: 'rgba(201,169,110,0.06)', padding: '3px 8px', borderRadius: 5, border: '1px solid rgba(201,169,110,0.15)' }}>{t('saves', lang)}: {rec.saves}</span>
                              </div>
                            </div>
                            <div style={{
                              minWidth: 28, height: 28, borderRadius: 8,
                              border: isSelected ? `2px solid ${gold}` : `2px solid rgba(255,255,255,0.15)`,
                              background: isSelected ? gold : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s', marginTop: 2,
                            }}>
                              {isSelected && <span style={{ color: bg, fontSize: 14, fontWeight: 700 }}>✓</span>}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* ── Navigation ── */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={btnSecondary} onClick={() => setPhase(3)}>{t('back', lang)}</button>
                  <button
                    style={{ ...btnPrimary, opacity: totalCount > 0 ? 1 : 0.4 }}
                    disabled={totalCount === 0}
                    onClick={() => setPhase(5)}>
                    {t('builder_cta', lang)}
                  </button>
                </div>
              </motion.div>
            )
          })()}

          {/* ═══════════ PHASE 5: GENERATING ═══════════ */}
          {phase === 5 && (
            <motion.div key="phase5" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', marginTop: 120 }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${gold}, #a8884d)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 22, fontWeight: 700, color: bg }}>AI</motion.div>
              <h2 style={{ ...headingFont, fontSize: 24, marginBottom: 12 }}>{t('generating', lang)}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: gold, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
              {!generating && !aiSummary && <div style={{ display: 'none' }}>{(() => { setTimeout(() => generateSummary(), 500); return '' })()}</div>}
            </motion.div>
          )}

          {/* ═══════════ PHASE 6: AI SUMMARY + BOOKING ═══════════ */}
          {phase === 6 && (
            <motion.div key="phase6" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <div style={{ marginTop: 32, marginBottom: 24, textAlign: 'center' }}>
                <h2 style={{ ...headingFont, fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 700 }}>{t('summary_title', lang)}</h2>
              </div>
              <div style={{ ...cardStyle, marginBottom: 24 }}>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.65, color: textSecondary }}>{aiSummary}</pre>
              </div>

              {/* Selected automations summary */}
              {selectedAutomations.length > 0 && (
                <div style={{ ...cardStyle, marginBottom: 24, padding: '18px 20px' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 12 }}>{t('builder_summary', lang)} ({selectedAutomations.length})</span>
                  {selectedAutomations.map((name, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 0' }}>
                      <span style={{ color: gold, fontSize: 12 }}>&#10003;</span>
                      <span style={{ fontSize: 13, color: textPrimary }}>{name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* ROI estimate */}
              <div style={{ ...cardStyle, marginBottom: 24, padding: '18px 20px' }}>
                <span style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                  {lang === 'no' ? 'Estimert tapt omsetning' : 'Estimated lost revenue'}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                  <div><span style={{ color: textMuted }}>{t('roi_lost_month', lang)}:</span> <span style={{ color: '#ef4444' }}>{fmtNOK(roi.lostMonth)}</span></div>
                  <div><span style={{ color: textMuted }}>{t('roi_lost_year', lang)}:</span> <span style={{ color: '#ef4444' }}>{fmtNOK(roi.lostYear)}</span></div>
                </div>
              </div>

              {/* Booking CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                style={{ ...cardStyle, marginBottom: 24, padding: '32px 24px', textAlign: 'center', border: `1.5px solid ${gold}`, background: 'rgba(201,169,110,0.04)' }}>
                <h3 style={{ ...headingFont, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                  {lang === 'no' ? 'Book en gratis samtale' : 'Book a free consultation'}
                </h3>
                <p style={{ fontSize: 13.5, color: textSecondary, marginBottom: 20, lineHeight: 1.55 }}>
                  {lang === 'no'
                    ? 'Vi gjennomgår analysen din og gir deg et tilpasset tilbud basert på pakken du har bygget.'
                    : 'We review your analysis and give you a custom offer based on the package you built.'}
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...btnPrimary, display: 'inline-block', textDecoration: 'none', textAlign: 'center', maxWidth: 320, margin: '0 auto' }}
                  onClick={() => { if (!submitting && !refNumber) handleSubmit() }}
                >
                  {lang === 'no' ? 'Book tid i kalenderen →' : 'Book a time →'}
                </a>
                <div style={{ marginTop: 16 }}>
                  {[
                    lang === 'no' ? '30 min uforpliktende samtale' : '30 min no-obligation call',
                    lang === 'no' ? 'Vi diskuterer pris og løsning' : 'We discuss pricing and solution',
                    lang === 'no' ? 'Du forplikter deg til ingenting' : 'No commitment required',
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 4 }}>
                      <span style={{ color: gold, fontSize: 11 }}>&#10003;</span>
                      <span style={{ fontSize: 12.5, color: textMuted }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Send inn uten å booke */}
              <div style={{ textAlign: 'center' }}>
                <button
                  style={{ ...btnSecondary, fontSize: 13 }}
                  onClick={() => { if (!submitting && !refNumber) handleSubmit(); setPhase(8) }}
                >
                  {lang === 'no' ? 'Send inn uten å booke — vi ringer deg' : 'Submit without booking — we\'ll call you'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase 7 removed — booking + submit now handled in Phase 6 */}

          {/* ═══════════ PHASE 8: CONFIRMATION + BOOKING ═══════════ */}
          {phase === 8 && (
            <motion.div key="phase8" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', marginTop: 60 }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,169,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: `2px solid ${gold}` }}>
                <span style={{ fontSize: 28, color: gold }}>&#10003;</span>
              </motion.div>
              <h2 style={{ ...headingFont, fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, marginBottom: 12 }}>{t('confirm_title', lang)}</h2>
              <div style={{ ...cardStyle, display: 'inline-block', padding: '10px 24px', marginBottom: 20 }}>
                <span style={{ fontSize: 13, color: textMuted }}>{t('confirm_ref', lang)}: </span>
                <span style={{ fontSize: 15, fontWeight: 600, color: gold, letterSpacing: 1 }}>{refNumber}</span>
              </div>

              {/* ── Booking CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                style={{ ...cardStyle, maxWidth: 500, margin: '0 auto 28px', padding: '32px 28px', border: `1.5px solid ${gold}`, background: 'rgba(201,169,110,0.04)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
                <h3 style={{ ...headingFont, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  {lang === 'no' ? 'Book en gratis samtale' : 'Book a free consultation'}
                </h3>
                <p style={{ color: textSecondary, fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
                  {lang === 'no'
                    ? 'Kartleggingen din er sendt! Book en samtale så diskuterer vi pris og løsning.'
                    : 'Your discovery is submitted! Book a call and we\'ll discuss pricing and solution.'}
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', background: gold, color: bg, border: 'none', borderRadius: 12,
                    padding: '16px 36px', fontWeight: 700, fontSize: 16, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    boxShadow: '0 8px 32px rgba(201,169,110,0.25)', transition: 'all 0.2s',
                  }}>
                  {lang === 'no' ? 'Velg tid i kalenderen →' : 'Pick a time in the calendar →'}
                </a>
                <p style={{ fontSize: 12, color: textMuted, marginTop: 14 }}>
                  {lang === 'no' ? '15 min · Gratis · Uforpliktende' : '15 min · Free · No obligations'}
                </p>
              </motion.div>

              {/* ── Next steps ── */}
              <div style={{ ...cardStyle, textAlign: 'left', maxWidth: 500, margin: '0 auto' }}>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>
                  {lang === 'no' ? 'Slik fungerer det videre' : 'What happens next'}
                </h4>
                {[
                  lang === 'no' ? '1. Book en tid som passer deg i kalenderen over' : '1. Book a time that works for you in the calendar above',
                  lang === 'no' ? '2. Vi gjennomgår AI-analysen din før samtalen' : '2. We review your AI analysis before the call',
                  lang === 'no' ? '3. Du får et skreddersydd tilbud basert på dine behov' : '3. You get a tailored offer based on your needs',
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: gold, fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{'→'}</span>
                    <p style={{ fontSize: 13.5, color: textSecondary, lineHeight: 1.5, margin: 0 }}>{s.substring(3)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════
   PAGE EXPORT WITH SUSPENSE
   ════════════════════════════════════════════ */
export default function KartleggingPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#c9a96e', fontSize: 18, fontFamily: "'DM Sans', sans-serif" }}>Laster...</div>
      </div>
    }>
      <KartleggingApp />
    </Suspense>
  )
}
