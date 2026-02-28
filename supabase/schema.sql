-- =============================================
-- Arxon Dashboard — Supabase Schema
-- Kjør dette i Supabase SQL Editor
-- =============================================

-- 1. Customers (dine kunder / bedrifter)
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),          -- kobler til Supabase Auth
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  website text,
  industry text,                                     -- f.eks. 'bygg', 'salong', 'bilverksted'
  plan text default 'starter',                       -- starter, professional, growth
  notify_email boolean default true,
  notify_sms boolean default false,
  notify_new_lead boolean default true,
  notify_missed_call boolean default true,
  notify_booking boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Calls (anrop håndtert av AI-telefonsvarer)
create table if not exists calls (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  caller_number text,
  caller_name text,
  direction text default 'incoming',                -- incoming / outgoing
  status text default 'answered',                   -- answered / missed / voicemail
  duration_seconds integer default 0,
  ai_summary text,                                  -- AI-generert oppsummering av samtalen
  sentiment text default 'neutral',                 -- positive / neutral / negative
  recording_url text,                               -- evt. lenke til opptak
  lead_created boolean default false,               -- om anropet genererte en lead
  created_at timestamptz default now()
);

-- 3. Leads (leads fanget av AI)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  call_id uuid references calls(id),               -- evt. koblet til et anrop
  name text not null,
  company text,
  phone text,
  email text,
  industry text,
  location text,
  score integer default 5 check (score >= 1 and score <= 10),
  status text default 'new',                        -- new / hot / warm / cold / converted / lost
  source text default 'ai-phone',                   -- ai-phone / website / kartlegging / manual
  ai_notes text,                                    -- AI-genererte notater
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Bookings (møter booket automatisk)
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  lead_id uuid references leads(id),
  client_name text not null,
  client_company text,
  booking_type text default 'demo',                 -- demo / kartlegging / oppfolging / implementering
  meeting_date date not null,
  start_time time not null,
  end_time time not null,
  method text default 'video',                      -- video / phone / in-person
  status text default 'confirmed',                  -- confirmed / pending / cancelled / completed
  booked_via text default 'ai-phone',               -- ai-phone / website / kartlegging / manual
  notes text,
  created_at timestamptz default now()
);

-- 5. Automations (hvilke automatiseringer kunden har aktive)
create table if not exists automations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  name text not null,                               -- f.eks. 'AI-telefonsvarer'
  status text default 'setup',                      -- active / setup / paused / error
  uptime_percent numeric(5,2) default 0,
  last_active_at timestamptz,
  config jsonb default '{}',                        -- evt. konfigurasjon
  created_at timestamptz default now()
);

-- =============================================
-- Indexes for performance
-- =============================================
create index if not exists idx_calls_customer on calls(customer_id);
create index if not exists idx_calls_created on calls(created_at desc);
create index if not exists idx_leads_customer on leads(customer_id);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_bookings_customer on bookings(customer_id);
create index if not exists idx_bookings_date on bookings(meeting_date);
create index if not exists idx_automations_customer on automations(customer_id);

-- =============================================
-- Row Level Security (RLS)
-- Kunder kan kun se sin egen data
-- =============================================
alter table customers enable row level security;
alter table calls enable row level security;
alter table leads enable row level security;
alter table bookings enable row level security;
alter table automations enable row level security;

-- Customers: users can only see their own record
create policy "Users can view own customer record"
  on customers for select
  using (user_id = auth.uid());

create policy "Users can update own customer record"
  on customers for update
  using (user_id = auth.uid());

-- Calls: users can only see calls for their customer
create policy "Users can view own calls"
  on calls for select
  using (customer_id in (select id from customers where user_id = auth.uid()));

-- Leads: users can only see their own leads
create policy "Users can view own leads"
  on leads for select
  using (customer_id in (select id from customers where user_id = auth.uid()));

create policy "Users can update own leads"
  on leads for update
  using (customer_id in (select id from customers where user_id = auth.uid()));

-- Bookings: users can only see their own bookings
create policy "Users can view own bookings"
  on bookings for select
  using (customer_id in (select id from customers where user_id = auth.uid()));

-- Automations: users can only see their own automations
create policy "Users can view own automations"
  on automations for select
  using (customer_id in (select id from customers where user_id = auth.uid()));

-- =============================================
-- Service role policy (for n8n / backend)
-- n8n bruker service_role key som bypasser RLS
-- Så ingen ekstra policies trengs for insert
-- =============================================
