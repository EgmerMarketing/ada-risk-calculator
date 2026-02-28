import { Question, QuestionnaireData, RiskResult, LawsuitStats } from '@/types/questionnaire';

export const questions: Question[] = [
  {
    id: 'industry',
    title: 'What industry is your business in?',
    subtitle: 'Some industries face higher lawsuit risk than others',
    type: 'select',
    options: [
      { value: 'retail', label: 'Retail / E-commerce', description: 'Online or physical retail stores' },
      { value: 'healthcare', label: 'Healthcare', description: 'Medical practices, hospitals, clinics' },
      { value: 'government', label: 'Government / Public', description: 'Government agencies, public services' },
      { value: 'financial', label: 'Financial Services', description: 'Banks, insurance, financial advisors' },
      { value: 'education', label: 'Education', description: 'Schools, universities, training' },
      { value: 'hospitality', label: 'Hospitality', description: 'Hotels, restaurants, travel' },
      { value: 'technology', label: 'Technology', description: 'Software, IT services, tech companies' },
      { value: 'other', label: 'Other', description: 'Professional services, manufacturing, etc.' }
    ]
  },
  {
    id: 'state',
    title: 'Which state is your business located in?',
    subtitle: 'Lawsuit volume varies significantly by state',
    type: 'select',
    options: [
      { value: 'NY', label: 'New York' },
      { value: 'CA', label: 'California' },
      { value: 'FL', label: 'Florida' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'TX', label: 'Texas' },
      { value: 'IL', label: 'Illinois' },
      { value: 'OH', label: 'Ohio' },
      { value: 'GA', label: 'Georgia' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'other', label: 'Other State' }
    ]
  },
  {
    id: 'hasWebsite',
    title: 'Does your business have a website?',
    subtitle: 'Most ADA lawsuits target business websites',
    type: 'boolean',
    options: [
      { value: true, label: 'Yes', description: 'We have a business website' },
      { value: false, label: 'No', description: 'No website currently' }
    ]
  },
  {
    id: 'websitePlatform',
    title: 'What platform is your website built on?',
    subtitle: 'Some platforms are more frequently targeted',
    type: 'select',
    options: [
      { value: 'wordpress', label: 'WordPress', description: 'Most common CMS platform' },
      { value: 'shopify', label: 'Shopify', description: 'E-commerce platform' },
      { value: 'wix', label: 'Wix', description: 'Website builder' },
      { value: 'squarespace', label: 'Squarespace', description: 'Website builder' },
      { value: 'custom', label: 'Custom Built', description: 'Custom development' },
      { value: 'other', label: 'Other Platform', description: 'Different platform or unsure' }
    ]
  },
  {
    id: 'hasAccessibilityFeatures',
    title: 'Does your website have accessibility features?',
    subtitle: 'Screen readers, keyboard navigation, alt text, etc.',
    type: 'boolean',
    options: [
      { value: true, label: 'Yes', description: 'We have implemented accessibility features' },
      { value: false, label: 'No / Unsure', description: 'No accessibility features or not sure' }
    ]
  },
  {
    id: 'numberOfEmployees',
    title: 'How many employees does your business have?',
    subtitle: 'Larger businesses may face additional scrutiny',
    type: 'radio',
    options: [
      { value: '1-10', label: '1-10 employees', description: 'Small business' },
      { value: '11-49', label: '11-49 employees', description: 'Medium business' },
      { value: '50-249', label: '50-249 employees', description: 'Large business' },
      { value: '250+', label: '250+ employees', description: 'Enterprise business' }
    ]
  },
  {
    id: 'annualRevenue',
    title: 'What is your approximate annual revenue?',
    subtitle: 'Higher revenue businesses are often targeted more frequently',
    type: 'radio',
    options: [
      { value: 'under-100k', label: 'Under $100K', description: 'Startup / very small business' },
      { value: '100k-500k', label: '$100K - $500K', description: 'Small business' },
      { value: '500k-1m', label: '$500K - $1M', description: 'Growing business' },
      { value: '1m-5m', label: '$1M - $5M', description: 'Established business' },
      { value: '5m+', label: 'Over $5M', description: 'Large business' }
    ]
  },
  {
    id: 'hasBeenSuedBefore',
    title: 'Has your business been sued for accessibility issues before?',
    subtitle: 'Previous lawsuits can indicate ongoing risk',
    type: 'boolean',
    options: [
      { value: true, label: 'Yes', description: 'We have faced accessibility lawsuits' },
      { value: false, label: 'No', description: 'No previous accessibility lawsuits' }
    ]
  }
];

export function calculateRiskScore(data: QuestionnaireData): number {
  let score = 0;

  // Base score for having a website
  if (data.hasWebsite) {
    score += 10;
  }

  // Industry risk
  if (data.industry === 'retail') {
    score += 20; // E-commerce sites
  } else if (data.industry === 'healthcare' || data.industry === 'government') {
    score += 25; // Healthcare/government
  }

  // High lawsuit volume states
  if (['NY', 'CA', 'FL', 'PA', 'MA'].includes(data.state)) {
    score += 15;
  }

  // No accessibility features
  if (!data.hasAccessibilityFeatures && data.hasWebsite) {
    score += 25;
  }

  // Website platform risk
  if (['wordpress', 'wix', 'squarespace'].includes(data.websitePlatform)) {
    score += 10;
  }

  // Revenue risk
  if (['1m-5m', '5m+'].includes(data.annualRevenue)) {
    score += 10;
  }

  // Previous lawsuit
  if (data.hasBeenSuedBefore) {
    score += 20;
  }

  // Employee count risk
  if (data.numberOfEmployees === '50-249' || data.numberOfEmployees === '250+') {
    score += 5;
  }

  return Math.min(100, score);
}

export function getRiskLevel(score: number): RiskResult {
  if (score >= 75) {
    return {
      score,
      level: 'Critical',
      color: 'text-red-700',
      description: 'Your business has multiple high-risk factors. Immediate action recommended.'
    };
  } else if (score >= 50) {
    return {
      score,
      level: 'High',
      color: 'text-red-600',
      description: 'Your business has several risk factors that should be addressed soon.'
    };
  } else if (score >= 25) {
    return {
      score,
      level: 'Medium',
      color: 'text-yellow-600',
      description: 'Your business has some risk factors worth monitoring and improving.'
    };
  } else {
    return {
      score,
      level: 'Low',
      color: 'text-green-600',
      description: 'Your business currently has relatively low risk, but stay vigilant.'
    };
  }
}

export const lawsuitStats: LawsuitStats = {
  totalLawsuits: "15,332 lawsuits since 2022",
  lawsuitsThisYear: "Nearly 4,000 in 2025 alone",
  topLawFirms: "90% filed by just 16 law firms",
  averageSettlement: "Average settlement: $5,000-$25,000",
  averageDefenseCost: "Average defense cost: $10,000-$50,000",
  accessiBeFineStat: "FTC fined accessiBe $1M for misleading overlay claims",
  governmentDeadline: "April 24, 2026: Government deadline (awareness = more private lawsuits)"
};