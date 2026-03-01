-- ============================================================
-- Arxon AI – Full Supabase Schema
-- Purchase-gated automation workflows with n8n orchestration
-- ============================================================

-- 1. Integration credentials (customer API keys)
CREATE TABLE IF NOT EXISTS integration_credentials (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id   UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  service       TEXT NOT NULL,                    -- e.g. 'vipps', 'tripletex'
  credentials   JSONB NOT NULL DEFAULT '{}',      -- encrypted API keys
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','validating','valid','invalid','expired')),
  validated_at  TIMESTAMPTZ,
  error_message TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, service)
);

-- 2. Purchases / subscriptions
CREATE TABLE IF NOT EXISTS purchases (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id     UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  automation_key  TEXT NOT NULL,                   -- matches serviceCategories id + automation name slug
  package_tier    TEXT NOT NULL DEFAULT 'starter'
                    CHECK (package_tier IN ('starter','professional','growth','enterprise')),
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','paused','cancelled','expired')),
  price_nok       INTEGER NOT NULL DEFAULT 0,
  billing_cycle   TEXT NOT NULL DEFAULT 'monthly'
                    CHECK (billing_cycle IN ('monthly','quarterly','yearly','one-time')),
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Workflow templates (versioned n8n templates)
CREATE TABLE IF NOT EXISTS workflow_templates (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  automation_key  TEXT NOT NULL,
  version         INTEGER NOT NULL DEFAULT 1,
  name            TEXT NOT NULL,
  description     TEXT,
  n8n_template    JSONB NOT NULL,                 -- full n8n workflow JSON
  required_services TEXT[] NOT NULL DEFAULT '{}',  -- which integrations are needed
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(automation_key, version)
);

-- 4. Workflow instances (running customer workflows)
CREATE TABLE IF NOT EXISTS workflow_instances (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id       UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  purchase_id       UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  template_id       UUID NOT NULL REFERENCES workflow_templates(id),
  n8n_workflow_id   TEXT,                          -- ID from n8n API
  status            TEXT NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','creating','active','paused','error','stopped')),
  health            TEXT NOT NULL DEFAULT 'unknown'
                      CHECK (health IN ('unknown','healthy','degraded','failing','offline')),
  last_health_check TIMESTAMPTZ,
  error_message     TEXT,
  error_count       INTEGER NOT NULL DEFAULT 0,
  retry_count       INTEGER NOT NULL DEFAULT 0,
  max_retries       INTEGER NOT NULL DEFAULT 5,
  config            JSONB DEFAULT '{}',            -- runtime config overrides
  activated_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Workflow queue (resilient job queue)
CREATE TABLE IF NOT EXISTS workflow_queue (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id     UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  purchase_id     UUID NOT NULL REFERENCES purchases(id),
  action          TEXT NOT NULL
                    CHECK (action IN ('create','update','pause','resume','delete','retry','health_check')),
  payload         JSONB DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'queued'
                    CHECK (status IN ('queued','processing','completed','failed','dead_letter')),
  priority        INTEGER NOT NULL DEFAULT 0,      -- higher = more urgent
  attempts        INTEGER NOT NULL DEFAULT 0,
  max_attempts    INTEGER NOT NULL DEFAULT 5,
  last_error      TEXT,
  scheduled_for   TIMESTAMPTZ DEFAULT NOW(),       -- delayed execution support
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Workflow execution log (usage stats / ROI)
CREATE TABLE IF NOT EXISTS workflow_executions (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id       UUID NOT NULL REFERENCES workflow_instances(id) ON DELETE CASCADE,
  business_id       UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  n8n_execution_id  TEXT,
  status            TEXT NOT NULL DEFAULT 'running'
                      CHECK (status IN ('running','success','error','timeout')),
  started_at        TIMESTAMPTZ DEFAULT NOW(),
  finished_at       TIMESTAMPTZ,
  duration_ms       INTEGER,
  items_processed   INTEGER DEFAULT 0,             -- invoices sent, bookings made, etc.
  error_message     TEXT,
  metadata          JSONB DEFAULT '{}'             -- automation-specific data
);

-- 7. Onboarding progress tracker
CREATE TABLE IF NOT EXISTS onboarding_progress (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id     UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  purchase_id     UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  step            TEXT NOT NULL
                    CHECK (step IN ('purchased','integrations_pending','integrations_validated','review','activated','completed')),
  integrations_required TEXT[] NOT NULL DEFAULT '{}',
  integrations_connected TEXT[] NOT NULL DEFAULT '{}',
  activated_by_user BOOLEAN NOT NULL DEFAULT false,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX idx_purchases_business ON purchases(business_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_workflow_instances_business ON workflow_instances(business_id);
CREATE INDEX idx_workflow_instances_status ON workflow_instances(status);
CREATE INDEX idx_workflow_queue_status ON workflow_queue(status, scheduled_for);
CREATE INDEX idx_workflow_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX idx_workflow_executions_business ON workflow_executions(business_id);
CREATE INDEX idx_integration_credentials_business ON integration_credentials(business_id);
CREATE INDEX idx_onboarding_business ON onboarding_progress(business_id);

-- ============================================================
-- RLS Policies (customers only see their own data)
-- ============================================================
ALTER TABLE integration_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read/write their own data
CREATE POLICY "Users see own credentials"
  ON integration_credentials FOR ALL
  USING (business_id = auth.uid());

CREATE POLICY "Users see own purchases"
  ON purchases FOR ALL
  USING (business_id = auth.uid());

CREATE POLICY "Users see own workflows"
  ON workflow_instances FOR ALL
  USING (business_id = auth.uid());

CREATE POLICY "Users see own queue"
  ON workflow_queue FOR ALL
  USING (business_id = auth.uid());

CREATE POLICY "Users see own executions"
  ON workflow_executions FOR ALL
  USING (business_id = auth.uid());

CREATE POLICY "Users see own onboarding"
  ON onboarding_progress FOR ALL
  USING (business_id = auth.uid());

-- ============================================================
-- Functions
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_credentials_updated
  BEFORE UPDATE ON integration_credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_workflow_instances_updated
  BEFORE UPDATE ON workflow_instances
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_onboarding_updated
  BEFORE UPDATE ON onboarding_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-queue workflow creation on purchase
CREATE OR REPLACE FUNCTION on_purchase_created()
RETURNS TRIGGER AS $$
BEGIN
  -- Create onboarding progress entry
  INSERT INTO onboarding_progress (business_id, purchase_id, step, integrations_required)
  SELECT NEW.business_id, NEW.id, 'purchased',
    COALESCE(
      (SELECT required_services FROM workflow_templates
       WHERE automation_key = NEW.automation_key AND is_active = true
       ORDER BY version DESC LIMIT 1),
      '{}'
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_purchase_created
  AFTER INSERT ON purchases
  FOR EACH ROW EXECUTE FUNCTION on_purchase_created();

-- Auto-queue workflow when onboarding reaches 'activated'
CREATE OR REPLACE FUNCTION on_onboarding_activated()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.step = 'activated' AND OLD.step != 'activated' THEN
    INSERT INTO workflow_queue (business_id, purchase_id, action, priority)
    VALUES (NEW.business_id, NEW.purchase_id, 'create', 10);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_onboarding_activated
  AFTER UPDATE ON onboarding_progress
  FOR EACH ROW EXECUTE FUNCTION on_onboarding_activated();
