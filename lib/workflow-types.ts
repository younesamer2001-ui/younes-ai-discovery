/* ============================================================
   Arxon AI – Workflow System Types
   ============================================================ */

// ---- Integration Credentials ----
export interface IntegrationCredential {
  id: string
  business_id: string
  service: string
  credentials: Record<string, string>
  status: 'pending' | 'validating' | 'valid' | 'invalid' | 'expired'
  validated_at: string | null
  error_message: string | null
  created_at: string
  updated_at: string
}

// ---- Purchases ----
export interface Purchase {
  id: string
  business_id: string
  automation_key: string
  package_tier: 'starter' | 'professional' | 'growth' | 'enterprise'
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  price_nok: number
  billing_cycle: 'monthly' | 'quarterly' | 'yearly' | 'one-time'
  started_at: string
  expires_at: string | null
  cancelled_at: string | null
  created_at: string
}

// ---- Workflow Templates ----
export interface WorkflowTemplate {
  id: string
  automation_key: string
  version: number
  name: string
  description: string | null
  n8n_template: Record<string, unknown>
  required_services: string[]
  is_active: boolean
  created_at: string
}

// ---- Workflow Instances ----
export type WorkflowStatus = 'pending' | 'creating' | 'active' | 'paused' | 'error' | 'stopped'
export type HealthStatus = 'unknown' | 'healthy' | 'degraded' | 'failing' | 'offline'

export interface WorkflowInstance {
  id: string
  business_id: string
  purchase_id: string
  template_id: string
  n8n_workflow_id: string | null
  status: WorkflowStatus
  health: HealthStatus
  last_health_check: string | null
  error_message: string | null
  error_count: number
  retry_count: number
  max_retries: number
  config: Record<string, unknown>
  activated_at: string | null
  created_at: string
  updated_at: string
  // Joined
  template?: WorkflowTemplate
  purchase?: Purchase
}

// ---- Workflow Queue ----
export type QueueAction = 'create' | 'update' | 'pause' | 'resume' | 'delete' | 'retry' | 'health_check'
export type QueueStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'dead_letter'

export interface QueueJob {
  id: string
  business_id: string
  purchase_id: string
  action: QueueAction
  payload: Record<string, unknown>
  status: QueueStatus
  priority: number
  attempts: number
  max_attempts: number
  last_error: string | null
  scheduled_for: string
  started_at: string | null
  completed_at: string | null
  created_at: string
}

// ---- Workflow Executions (Usage Stats) ----
export interface WorkflowExecution {
  id: string
  workflow_id: string
  business_id: string
  n8n_execution_id: string | null
  status: 'running' | 'success' | 'error' | 'timeout'
  started_at: string
  finished_at: string | null
  duration_ms: number | null
  items_processed: number
  error_message: string | null
  metadata: Record<string, unknown>
}

// ---- Onboarding ----
export type OnboardingStep =
  | 'purchased'
  | 'integrations_pending'
  | 'integrations_validated'
  | 'review'
  | 'activated'
  | 'completed'

export interface OnboardingProgress {
  id: string
  business_id: string
  purchase_id: string
  step: OnboardingStep
  integrations_required: string[]
  integrations_connected: string[]
  activated_by_user: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
  // Joined
  purchase?: Purchase
}

// ---- Aggregated stats for dashboard ----
export interface WorkflowStats {
  total_executions: number
  successful_executions: number
  failed_executions: number
  total_items_processed: number
  avg_duration_ms: number
  uptime_percentage: number
  estimated_hours_saved: number
  estimated_nok_saved: number
}

// ---- Validation result ----
export interface ValidationResult {
  service: string
  valid: boolean
  message: string
  tested_at: string
}
