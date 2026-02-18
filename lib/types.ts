export interface Business {
  id: string
  email: string
  full_name: string
  company_name: string
  phone?: string
  website?: string
  language: 'no' | 'en'
  created_at: string
}

export interface DiscoverySession {
  id: string
  business_id: string
  status: 'in_progress' | 'completed' | 'expired'
  industry: string
  company_size: string
  primary_challenge: string
  budget: string
  ai_experience: string
  tools: string[]
  current_step: number
  total_steps: number
  ai_summary: AISummary
  final_recommendation: string | null
  priority_score: number | null
  language: 'no' | 'en'
  created_at: string
  completed_at: string | null
}

export interface AISummary {
  company_name: string
  industry: string
  size: string
  challenge: string
  findings: string[]
  direction: string[]
}

export interface DiscoveryAnswer {
  id: string
  session_id: string
  step_number: number
  question: string
  question_type: 'single_choice' | 'multi_choice' | 'free_text' | 'scale'
  options: string[]
  answer: string
  ai_note: string
  created_at: string
}

export interface Submission {
  id: string
  session_id: string
  business_id: string
  status: 'new' | 'reviewed' | 'discussing' | 'accepted' | 'rejected'
  full_report: FullReport
  team_notes: string | null
  assigned_to: string | null
  reviewed_at: string | null
  created_at: string
  // Joined fields
  business?: Business
  session?: DiscoverySession
}

export interface FullReport {
  business: {
    name: string
    company: string
    email: string
    phone?: string
    website?: string
  }
  profile: {
    industry: string
    size: string
    challenge: string
    budget: string
    ai_experience: string
    tools: string[]
  }
  discovery_answers: {
    question: string
    answer: string
  }[]
  ai_summary: AISummary
  recommendation: string
  priority_score: number
}

export interface AIQuestion {
  question: string
  options: string[]
  question_type: 'single_choice' | 'multi_choice' | 'free_text'
  is_final: boolean
}
