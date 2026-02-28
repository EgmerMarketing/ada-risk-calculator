'use client';

import { useState, useMemo } from 'react';
import { questions } from '@/data/questions';
import { QuestionnaireData } from '@/types/questionnaire';
import { calculateRiskScore } from '@/utils/riskCalculation';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import RiskGauge from '@/components/RiskGauge';
import EmailCapture from '@/components/EmailCapture';
import { Scale, Shield, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  
  // Skip website platform question if user doesn't have a website
  const shouldShowQuestion = useMemo(() => {
    if (currentQuestion.id === 'websitePlatform') {
      return answers.hasWebsite === true;
    }
    return true;
  }, [currentQuestion.id, answers.hasWebsite]);

  const canProceed = useMemo(() => {
    const questionId = currentQuestion.id as keyof QuestionnaireData;
    return answers[questionId] !== undefined;
  }, [answers, currentQuestion.id]);

  const handleAnswerChange = (value: string | number | boolean) => {
    const questionId = currentQuestion.id as keyof QuestionnaireData;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (isLastQuestion || !shouldShowQuestion) {
      // Skip to results if this is the last question or if we should skip the current question
      setShowResults(true);
    } else {
      // Find next question that should be shown
      let nextStep = currentStep + 1;
      while (nextStep < questions.length) {
        const nextQuestion = questions[nextStep];
        if (nextQuestion.id === 'websitePlatform' && answers.hasWebsite !== true) {
          nextStep++;
          continue;
        }
        break;
      }
      
      if (nextStep >= questions.length) {
        setShowResults(true);
      } else {
        setCurrentStep(nextStep);
      }
    }
  };

  const riskScore = useMemo(() => {
    return calculateRiskScore(answers as QuestionnaireData);
  }, [answers]);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy mb-4">
              Your ADA Risk Assessment Results
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your responses, here&apos;s your business&apos;s risk level for ADA accessibility lawsuits
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Risk Score */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <RiskGauge riskScore={riskScore} />
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-navy mb-6 text-center">
                ADA Lawsuit Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-danger mb-2">15,332</div>
                  <div className="text-sm text-gray-600">Total lawsuits since 2022</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-danger mb-2">~4,000</div>
                  <div className="text-sm text-gray-600">Expected lawsuits in 2025</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-danger mb-2">90%</div>
                  <div className="text-sm text-gray-600">Filed by just 16 law firms</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-700 mb-2">$5K - $25K</div>
                  <div className="text-sm text-gray-600">Average settlement cost</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-700 mb-2">$10K - $50K</div>
                  <div className="text-sm text-gray-600">Legal defense costs</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-red-100 rounded-lg text-center">
                <div className="text-lg font-semibold text-danger mb-2">
                  Important Deadline: April 24, 2026
                </div>
                <div className="text-sm text-gray-700">
                  Federal accessibility standards become mandatory for all businesses
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Recommendations for Your Business
              </h3>
              <div className="space-y-4">
                {riskScore.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div className="text-gray-700">{recommendation}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email Capture */}
            <EmailCapture />

            {/* Start Over Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="bg-navy hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Take Assessment Again
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm">
            Built by <span className="font-semibold">Egmer Marketing</span>
          </footer>
        </div>
      </div>
    );
  }

  // Skip website platform question if no website
  if (!shouldShowQuestion) {
    // Auto-advance to next question
    setTimeout(handleNext, 0);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale className="w-8 h-8 text-navy" />
            <h1 className="text-4xl font-bold text-navy">
              ADA Lawsuit Risk Calculator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Assess your business&apos;s risk of ADA accessibility lawsuits with our comprehensive evaluation tool
          </p>
        </div>

        <ProgressBar current={currentStep + 1} total={questions.length} />

        <QuestionCard
          question={currentQuestion}
          value={answers[currentQuestion.id as keyof QuestionnaireData] ?? ''}
          onChange={handleAnswerChange}
          onNext={handleNext}
          canProceed={canProceed}
        />

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          Built by <span className="font-semibold">Egmer Marketing</span>
        </footer>
      </div>
    </div>
  );
}