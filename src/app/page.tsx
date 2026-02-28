'use client';

import { useState } from 'react';
import { QuestionnaireData } from '@/types/questionnaire';
import { questions, calculateRiskScore, getRiskLevel, lawsuitStats } from '@/utils/questionnaire';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import ResultsPage from '@/components/ResultsPage';
import { Scale, Shield } from 'lucide-react';

const initialData: QuestionnaireData = {
  industry: '',
  state: '',
  hasWebsite: false,
  websitePlatform: '',
  hasAccessibilityFeatures: false,
  numberOfEmployees: '',
  annualRevenue: '',
  hasBeenSuedBefore: false
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>(initialData);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;

  const handleAnswerChange = (questionId: keyof QuestionnaireData, value: string | boolean) => {
    setData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setData(initialData);
    setShowResults(false);
  };

  const canProceed = () => {
    const currentValue = data[currentQuestion.id];
    return currentValue !== '' && currentValue !== null && currentValue !== undefined;
  };

  if (showResults) {
    const score = calculateRiskScore(data);
    const riskResult = getRiskLevel(score);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <ResultsPage 
            riskResult={riskResult}
            stats={lawsuitStats}
            onRestart={handleRestart}
          />
          <footer className="text-center mt-12 py-8 border-t border-gray-200">
            <p className="text-gray-600">
              Built by{' '}
              <span className="font-semibold text-navy-600">Egmer Marketing</span>
              {' '}— Custom-coded, accessible websites for small businesses
            </p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-navy-600 p-3 rounded-full">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-navy-800">
              ADA Lawsuit Risk Calculator
            </h1>
            <div className="bg-red-600 p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your business&apos;s risk of ADA website accessibility lawsuits 
            with our comprehensive assessment tool.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <ProgressBar current={currentStep + 1} total={totalSteps} />
        </div>

        {/* Current Question */}
        <QuestionCard
          question={currentQuestion}
          value={data[currentQuestion.id]}
          onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
          onNext={handleNext}
          canProceed={canProceed()}
        />

        {/* Footer */}
        <footer className="text-center mt-12 py-8">
          <p className="text-gray-500 text-sm">
            Assessment takes 2-3 minutes • Your data is never stored or shared
          </p>
        </footer>
      </div>
    </div>
  );
}