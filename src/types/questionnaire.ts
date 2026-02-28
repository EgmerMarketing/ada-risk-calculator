export interface QuestionOption {
  value: string | number | boolean;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: 'boolean' | 'radio' | 'select';
  options: QuestionOption[];
  required: boolean;
}

export interface QuestionnaireData {
  industry: string;
  state: string;
  hasWebsite: boolean;
  websitePlatform?: string;
  hasAccessibilityFeatures: boolean;
  employeeCount: string;
  revenueRange: string;
  beenSued: boolean;
}

export interface RiskScore {
  score: number;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  color: string;
  recommendations: string[];
}