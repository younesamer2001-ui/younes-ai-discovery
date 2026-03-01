export interface IntegrationField {
  key: string
  label: string
  placeholder: string
  type: 'text' | 'password'
  helpText?: string
}

export interface IntegrationDef {
  service: string
  name: string
  description: string
  icon: string
  color: string
  category: string          // which industry/group
  fields: IntegrationField[]
  helpUrl: string
  helpLabel: string
  usedFor: string[]
}

export interface IntegrationState {
  fields: Record<string, string>
  status: 'pending' | 'connected' | 'error'
  showSecrets: Record<string, boolean>
  saving: boolean
  saved: boolean
}
