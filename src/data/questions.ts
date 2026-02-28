import { Question } from '@/types/questionnaire';

export const questions: Question[] = [
  {
    id: 'industry',
    title: 'What type of business do you operate?',
    subtitle: 'Different industries face varying levels of ADA lawsuit risk',
    type: 'radio',
    required: true,
    options: [
      {
        value: 'ecommerce',
        label: 'E-commerce/Retail',
        description: 'Online stores, retail websites, marketplaces'
      },
      {
        value: 'healthcare',
        label: 'Healthcare/Government',
        description: 'Medical practices, hospitals, government services'
      },
      {
        value: 'financial',
        label: 'Financial Services',
        description: 'Banking, insurance, investment services'
      },
      {
        value: 'professional',
        label: 'Professional Services',
        description: 'Law firms, consulting, accounting'
      },
      {
        value: 'hospitality',
        label: 'Hospitality/Travel',
        description: 'Hotels, restaurants, travel services'
      },
      {
        value: 'education',
        label: 'Education',
        description: 'Schools, universities, training centers'
      },
      {
        value: 'other',
        label: 'Other',
        description: 'Manufacturing, non-profit, other industries'
      }
    ]
  },
  {
    id: 'state',
    title: 'Which state is your business located in?',
    subtitle: 'Some states have higher rates of ADA lawsuit filings',
    type: 'select',
    required: true,
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
      { value: 'MI', label: 'Michigan' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'other', label: 'Other State' }
    ]
  },
  {
    id: 'hasWebsite',
    title: 'Does your business have a website?',
    subtitle: 'Websites are the primary target of ADA accessibility lawsuits',
    type: 'boolean',
    required: true,
    options: [
      {
        value: true,
        label: 'Yes, we have a website',
        description: 'Your business operates a website or web application'
      },
      {
        value: false,
        label: 'No website',
        description: 'Your business does not currently have a website'
      }
    ]
  },
  {
    id: 'websitePlatform',
    title: 'What platform is your website built on?',
    subtitle: 'Different platforms have varying accessibility capabilities',
    type: 'radio',
    required: true,
    options: [
      {
        value: 'wordpress',
        label: 'WordPress',
        description: 'Built on WordPress CMS'
      },
      {
        value: 'wix',
        label: 'Wix',
        description: 'Created with Wix website builder'
      },
      {
        value: 'squarespace',
        label: 'Squarespace',
        description: 'Built on Squarespace platform'
      },
      {
        value: 'shopify',
        label: 'Shopify',
        description: 'E-commerce site on Shopify'
      },
      {
        value: 'custom',
        label: 'Custom/Other',
        description: 'Custom development or other platform'
      }
    ]
  },
  {
    id: 'hasAccessibilityFeatures',
    title: 'Does your website have accessibility features?',
    subtitle: 'Accessibility features help ensure compliance with ADA requirements',
    type: 'boolean',
    required: true,
    options: [
      {
        value: true,
        label: 'Yes, accessibility features are implemented',
        description: 'Alt text for images, keyboard navigation, screen reader compatibility, etc.'
      },
      {
        value: false,
        label: 'No, no specific accessibility features',
        description: 'Website has not been specifically designed for accessibility'
      }
    ]
  },
  {
    id: 'employeeCount',
    title: 'How many employees does your business have?',
    subtitle: 'Larger businesses face stricter ADA requirements',
    type: 'radio',
    required: true,
    options: [
      {
        value: '1-14',
        label: '1-14 employees',
        description: 'Small business'
      },
      {
        value: '15-49',
        label: '15-49 employees',
        description: 'Medium business'
      },
      {
        value: '50+',
        label: '50+ employees',
        description: 'Large business with stricter ADA requirements'
      }
    ]
  },
  {
    id: 'revenueRange',
    title: 'What is your annual business revenue?',
    subtitle: 'Higher revenue businesses are more likely to be targeted',
    type: 'radio',
    required: true,
    options: [
      {
        value: 'under-250k',
        label: 'Under $250K',
        description: 'Small business revenue'
      },
      {
        value: '250k-1m',
        label: '$250K - $1M',
        description: 'Medium business revenue'
      },
      {
        value: 'over-1m',
        label: 'Over $1M',
        description: 'High revenue business - higher lawsuit risk'
      }
    ]
  },
  {
    id: 'beenSued',
    title: 'Has your business been sued for ADA compliance before?',
    subtitle: 'Previous lawsuits indicate higher ongoing risk',
    type: 'boolean',
    required: true,
    options: [
      {
        value: true,
        label: 'Yes, we have been sued',
        description: 'Previous ADA accessibility lawsuit or demand letter'
      },
      {
        value: false,
        label: 'No previous lawsuits',
        description: 'No history of ADA accessibility legal issues'
      }
    ]
  }
];