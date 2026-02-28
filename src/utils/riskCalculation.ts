import { QuestionnaireData, RiskScore } from '@/types/questionnaire';

export function calculateRiskScore(data: QuestionnaireData): RiskScore {
  let score = 0;
  const recommendations: string[] = [];

  // Industry scoring
  if (data.industry === 'ecommerce') {
    score += 20;
    recommendations.push('E-commerce businesses are frequently targeted due to public-facing websites');
  } else if (data.industry === 'healthcare') {
    score += 25;
    recommendations.push('Healthcare/government sectors face the highest lawsuit risk due to public accommodation requirements');
  }

  // High-lawsuit states
  const highLawsuitStates = ['NY', 'CA', 'FL', 'PA', 'MA'];
  if (highLawsuitStates.includes(data.state)) {
    score += 15;
    recommendations.push(`${getStateName(data.state)} is among the top 5 states for ADA lawsuit filings`);
  }

  // Website and accessibility features
  if (data.hasWebsite) {
    if (!data.hasAccessibilityFeatures) {
      score += 25;
      recommendations.push('Websites without accessibility features are prime targets for ADA lawsuits');
    } else {
      recommendations.push('Good: Your website has accessibility features, but ensure they meet WCAG 2.1 AA standards');
    }

    // Website platform
    const vulnerablePlatforms = ['wordpress', 'wix', 'squarespace'];
    if (data.websitePlatform && vulnerablePlatforms.includes(data.websitePlatform)) {
      score += 10;
      recommendations.push(`${getPlatformName(data.websitePlatform)} websites often lack comprehensive accessibility features out-of-the-box`);
    }
  } else {
    recommendations.push('No website reduces your digital accessibility risk significantly');
  }

  // Revenue range
  if (data.revenueRange === 'over-1m') {
    score += 10;
    recommendations.push('High-revenue businesses are more attractive targets for accessibility lawsuits');
  }

  // Employee count (50+ employees = stricter ADA requirements)
  if (data.employeeCount === '50+') {
    score += 5;
    recommendations.push('Businesses with 50+ employees have stricter ADA compliance requirements under federal law');
  }

  // Previous lawsuit history
  if (data.beenSued) {
    score += 20;
    recommendations.push('Previous ADA lawsuits indicate ongoing vulnerability and increased scrutiny');
  }

  // Determine risk level and color
  let level: RiskScore['level'];
  let color: string;

  if (score <= 25) {
    level = 'Low';
    color = '#10b981'; // green
  } else if (score <= 50) {
    level = 'Medium';
    color = '#f59e0b'; // yellow
  } else if (score <= 75) {
    level = 'High';
    color = '#dc2626'; // red
  } else {
    level = 'Critical';
    color = '#dc2626'; // red
  }

  // Add general recommendations based on score
  if (score > 50) {
    recommendations.unshift('Consider immediate accessibility audit and remediation');
    recommendations.push('Implement accessibility monitoring to prevent future issues');
  } else if (score > 25) {
    recommendations.push('Consider proactive accessibility improvements');
  }

  // Always add the deadline recommendation
  recommendations.push('Important: Federal accessibility standards become mandatory April 24, 2026');

  return {
    score: Math.min(score, 100), // Cap at 100
    level,
    color,
    recommendations
  };
}

function getStateName(code: string): string {
  const stateMap: { [key: string]: string } = {
    'NY': 'New York',
    'CA': 'California',
    'FL': 'Florida',
    'PA': 'Pennsylvania',
    'MA': 'Massachusetts'
  };
  return stateMap[code] || code;
}

function getPlatformName(platform: string): string {
  const platformMap: { [key: string]: string } = {
    'wordpress': 'WordPress',
    'wix': 'Wix',
    'squarespace': 'Squarespace'
  };
  return platformMap[platform] || platform;
}