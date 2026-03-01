/* ============================================================
   Arxon AI – Workflow Orchestrator
   Manages the lifecycle of n8n workflows:
   - Queue processing with retry logic
   - Workflow creation from templates
   - Health monitoring
   - Auto-retry on failure
   ============================================================ */

import {
  QueueJob,
  WorkflowInstance,
  WorkflowTemplate,
  WorkflowStats,
  HealthStatus,
} from './workflow-types'

// ---- n8n API Configuration ----

const N8N_BASE_URL = process.env.N8N_BASE_URL || 'http://localhost:5678'
const N8N_API_KEY = process.env.N8N_API_KEY || ''

const n8nHeaders = {
  'Content-Type': 'application/json',
  'X-N8N-API-KEY': N8N_API_KEY,
}

// ---- n8n API Client ----

export class N8nClient {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || N8N_BASE_URL
  }

  /** Create a new workflow from a template */
  async createWorkflow(
    template: WorkflowTemplate,
    credentials: Record<string, string>,
    businessName: string
  ): Promise<{ id: string; active: boolean }> {
    const workflowData = {
      ...template.n8n_template,
      name: `[${businessName}] ${template.name} v${template.version}`,
      active: false, // We activate separately after verification
    }

    // Inject customer credentials into n8n credential nodes
    this.injectCredentials(workflowData, credentials)

    const res = await fetch(`${this.baseUrl}/api/v1/workflows`, {
      method: 'POST',
      headers: n8nHeaders,
      body: JSON.stringify(workflowData),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`n8n workflow creation failed: ${res.status} – ${err}`)
    }

    return res.json()
  }

  /** Activate a workflow */
  async activateWorkflow(workflowId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/v1/workflows/${workflowId}/activate`, {
      method: 'PATCH',
      headers: n8nHeaders,
    })
    if (!res.ok) throw new Error(`Failed to activate workflow ${workflowId}`)
  }

  /** Deactivate a workflow */
  async deactivateWorkflow(workflowId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/v1/workflows/${workflowId}/deactivate`, {
      method: 'PATCH',
      headers: n8nHeaders,
    })
    if (!res.ok) throw new Error(`Failed to deactivate workflow ${workflowId}`)
  }

  /** Delete a workflow */
  async deleteWorkflow(workflowId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/v1/workflows/${workflowId}`, {
      method: 'DELETE',
      headers: n8nHeaders,
    })
    if (!res.ok) throw new Error(`Failed to delete workflow ${workflowId}`)
  }

  /** Get workflow execution history */
  async getExecutions(workflowId: string, limit = 20): Promise<unknown[]> {
    const res = await fetch(
      `${this.baseUrl}/api/v1/executions?workflowId=${workflowId}&limit=${limit}`,
      { headers: n8nHeaders }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
  }

  /** Check if a workflow is healthy */
  async checkHealth(workflowId: string): Promise<HealthStatus> {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/workflows/${workflowId}`, {
        headers: n8nHeaders,
      })
      if (!res.ok) return 'offline'

      const workflow = await res.json()
      if (!workflow.active) return 'offline'

      // Check recent executions
      const executions = await this.getExecutions(workflowId, 5) as Array<{ finished: boolean; stoppedAt?: string; status?: string }>
      if (executions.length === 0) return 'healthy' // No executions yet = just activated

      const recentErrors = executions.filter(e => !e.finished || e.status === 'error')
      if (recentErrors.length === 0) return 'healthy'
      if (recentErrors.length <= 2) return 'degraded'
      return 'failing'
    } catch {
      return 'offline'
    }
  }

  private injectCredentials(
    workflowData: Record<string, unknown>,
    credentials: Record<string, string>
  ) {
    // n8n stores credentials separately — this maps service names
    // to n8n credential IDs set up in the n8n instance
    const nodes = workflowData.nodes as Array<Record<string, unknown>> | undefined
    if (!nodes) return

    for (const node of nodes) {
      const credRef = node.credentials as Record<string, unknown> | undefined
      if (credRef) {
        // Each template node references credential placeholders
        // The orchestrator replaces them with actual customer credential IDs
        for (const [key, val] of Object.entries(credentials)) {
          if (credRef[key]) {
            credRef[key] = val
          }
        }
      }
    }
  }
}

// ---- Queue Processor ----

export class WorkflowQueueProcessor {
  private n8n: N8nClient
  private processing = false

  constructor(n8nClient?: N8nClient) {
    this.n8n = n8nClient || new N8nClient()
  }

  /** Process a single queue job */
  async processJob(
    job: QueueJob,
    context: {
      template: WorkflowTemplate
      instance?: WorkflowInstance
      credentials: Record<string, string>
      businessName: string
    }
  ): Promise<{ success: boolean; error?: string; n8nWorkflowId?: string }> {
    try {
      switch (job.action) {
        case 'create': {
          const result = await this.n8n.createWorkflow(
            context.template,
            context.credentials,
            context.businessName
          )
          // Activate after creation
          await this.n8n.activateWorkflow(result.id)
          return { success: true, n8nWorkflowId: result.id }
        }

        case 'pause': {
          if (!context.instance?.n8n_workflow_id) {
            return { success: false, error: 'No n8n workflow ID to pause' }
          }
          await this.n8n.deactivateWorkflow(context.instance.n8n_workflow_id)
          return { success: true }
        }

        case 'resume': {
          if (!context.instance?.n8n_workflow_id) {
            return { success: false, error: 'No n8n workflow ID to resume' }
          }
          await this.n8n.activateWorkflow(context.instance.n8n_workflow_id)
          return { success: true }
        }

        case 'delete': {
          if (!context.instance?.n8n_workflow_id) {
            return { success: false, error: 'No n8n workflow ID to delete' }
          }
          await this.n8n.deleteWorkflow(context.instance.n8n_workflow_id)
          return { success: true }
        }

        case 'retry': {
          // Retry = delete old + create new
          if (context.instance?.n8n_workflow_id) {
            try { await this.n8n.deleteWorkflow(context.instance.n8n_workflow_id) } catch { /* ignore */ }
          }
          const retryResult = await this.n8n.createWorkflow(
            context.template,
            context.credentials,
            context.businessName
          )
          await this.n8n.activateWorkflow(retryResult.id)
          return { success: true, n8nWorkflowId: retryResult.id }
        }

        case 'health_check': {
          if (!context.instance?.n8n_workflow_id) {
            return { success: false, error: 'No n8n workflow ID for health check' }
          }
          const health = await this.n8n.checkHealth(context.instance.n8n_workflow_id)
          return { success: true, n8nWorkflowId: context.instance.n8n_workflow_id }
        }

        default:
          return { success: false, error: `Unknown action: ${job.action}` }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: message }
    }
  }
}

// ---- Stats Calculator ----

/**
 * Calculate workflow stats from execution history.
 * Used to show ROI to customers.
 */
export function calculateWorkflowStats(
  executions: Array<{
    status: string
    duration_ms: number | null
    items_processed: number
    metadata: Record<string, unknown>
  }>,
  automationKey: string
): WorkflowStats {
  const total = executions.length
  const successful = executions.filter(e => e.status === 'success').length
  const failed = executions.filter(e => e.status === 'error').length
  const totalItems = executions.reduce((sum, e) => sum + (e.items_processed || 0), 0)
  const durations = executions.filter(e => e.duration_ms).map(e => e.duration_ms!)
  const avgDuration = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0

  // ROI estimation: each execution saves ~X minutes of manual work
  const minutesPerExecution = getManualMinutesEstimate(automationKey)
  const hoursSaved = (successful * minutesPerExecution) / 60
  const nokPerHour = 450 // average Norwegian hourly rate
  const nokSaved = hoursSaved * nokPerHour

  return {
    total_executions: total,
    successful_executions: successful,
    failed_executions: failed,
    total_items_processed: totalItems,
    avg_duration_ms: Math.round(avgDuration),
    uptime_percentage: total > 0 ? Math.round((successful / total) * 100) : 100,
    estimated_hours_saved: Math.round(hoursSaved * 10) / 10,
    estimated_nok_saved: Math.round(nokSaved),
  }
}

/** Estimated manual minutes saved per execution, by automation type */
function getManualMinutesEstimate(automationKey: string): number {
  const estimates: Record<string, number> = {
    'fakturering': 15,
    'booking': 8,
    'sms-paminnelse': 3,
    'lead-scraping': 30,
    'some-posting': 20,
    'epost-kampanje': 25,
    'kpi-rapporter': 45,
    'kundeoppfolging': 10,
    'anmeldelse-foresporsler': 5,
    'tilbudsberegning': 20,
    'gdpr-sletting': 15,
    'channel-manager': 12,
    'salongbooking': 8,
    'verksted-deler': 25,
    'visningsbooking': 15,
  }
  return estimates[automationKey] || 10 // default 10 min
}

// ---- Health Monitor ----

/**
 * Determines overall health status from multiple workflow instances.
 */
export function aggregateHealth(instances: WorkflowInstance[]): {
  overall: HealthStatus
  healthy: number
  degraded: number
  failing: number
  offline: number
} {
  const counts = { healthy: 0, degraded: 0, failing: 0, offline: 0, unknown: 0 }
  for (const inst of instances) {
    counts[inst.health]++
  }

  let overall: HealthStatus = 'healthy'
  if (counts.failing > 0 || counts.offline > 0) overall = 'failing'
  else if (counts.degraded > 0) overall = 'degraded'
  else if (counts.unknown === instances.length) overall = 'unknown'

  return {
    overall,
    healthy: counts.healthy,
    degraded: counts.degraded,
    failing: counts.failing,
    offline: counts.offline,
  }
}
