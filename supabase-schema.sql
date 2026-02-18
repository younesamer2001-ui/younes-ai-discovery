-- ============================================
-- Younes AI Discovery — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Businesses (users who sign up)
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  language TEXT DEFAULT 'no' CHECK (language IN ('no', 'en')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Discovery Sessions
CREATE TABLE IF NOT EXISTS discovery_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'expired')),
  industry TEXT,
  company_size TEXT,
  primary_challenge TEXT,
  budget TEXT,
  ai_experience TEXT,
  tools TEXT[] DEFAULT '{}',
  current_step INT DEFAULT 0,
  total_steps INT DEFAULT 12,
  ai_summary JSONB DEFAULT '{}',
  final_recommendation TEXT,
  priority_score INT CHECK (priority_score >= 1 AND priority_score <= 10),
  language TEXT DEFAULT 'no',
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Individual Q&A pairs
CREATE TABLE IF NOT EXISTS discovery_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES discovery_sessions(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  question TEXT NOT NULL,
  question_type TEXT DEFAULT 'single_choice',
  options JSONB DEFAULT '[]',
  answer TEXT NOT NULL,
  ai_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Submissions (what admin sees)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES discovery_sessions(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'discussing', 'accepted', 'rejected')),
  full_report JSONB DEFAULT '{}',
  team_notes TEXT,
  assigned_to TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_business ON discovery_sessions(business_id);
CREATE INDEX IF NOT EXISTS idx_answers_session ON discovery_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovery_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can read/write their own data
CREATE POLICY "Users can view own business" ON businesses
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own business" ON businesses
  FOR INSERT WITH CHECK (auth.uid()::text = id::text);

CREATE POLICY "Users can update own business" ON businesses
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can view own sessions" ON discovery_sessions
  FOR SELECT USING (business_id::text = auth.uid()::text);

CREATE POLICY "Users can insert own sessions" ON discovery_sessions
  FOR INSERT WITH CHECK (business_id::text = auth.uid()::text);

CREATE POLICY "Users can update own sessions" ON discovery_sessions
  FOR UPDATE USING (business_id::text = auth.uid()::text);

CREATE POLICY "Users can view own answers" ON discovery_answers
  FOR SELECT USING (
    session_id IN (
      SELECT id FROM discovery_sessions WHERE business_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert own answers" ON discovery_answers
  FOR INSERT WITH CHECK (
    session_id IN (
      SELECT id FROM discovery_sessions WHERE business_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can view own submissions" ON submissions
  FOR SELECT USING (business_id::text = auth.uid()::text);

CREATE POLICY "Users can insert own submissions" ON submissions
  FOR INSERT WITH CHECK (business_id::text = auth.uid()::text);

-- Admin policies (for service role key - bypasses RLS automatically)
-- Admin dashboard will use the service_role_key which bypasses RLS
