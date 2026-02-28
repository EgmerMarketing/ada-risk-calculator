export interface QuestionnaireData {
  industry: string;
  state: string;
  hasWebsite: boolean;
  websitePlatform: string;
  hasAccessibilityFeatures: boolean;
  numberOfEmployees: string;
  annualRevenue: string;
  hasBeenSuedBefore: boolean;
}

export interface Question {
  id: keyof QuestionnaireData;
  title: string;
  subtitle?: string;
  type: 'select' | 'boolean' | 'radio';
  options: Array<{
    value: string | boolean;
    label: string;
    description?: string;
  }>;
}

export interface RiskResult {
  score: number;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  color: string;
  description: string;
}

export interface LawsuitStats {
  totalLawsuits: string;
  lawsuitsThisYear: string;
  topLawFirms: string;
  averageSettlement: string;
  averageDefenseCost: string;
  accessiBeFineStat: string;
  governmentDeadline: string;
}