'use client';

import { useState, useEffect } from 'react';
import { RiskResult, LawsuitStats } from '@/types/questionnaire';
import { CheckCircle, ExternalLink, AlertTriangle, Mail } from 'lucide-react';

interface ResultsPageProps {
  riskResult: RiskResult;
  stats: LawsuitStats;
  onRestart: () => void;
}

export default function ResultsPage({ riskResult, stats, onRestart }: ResultsPageProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(riskResult.score);
    }, 500);
    return () => clearTimeout(timer);
  }, [riskResult.score]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real app, this would send the email to your backend
      console.log('Email submitted:', email);
    }
  };

  const gaugeColor = riskResult.level === 'Critical' ? '#b91c1c' : 
                    riskResult.level === 'High' ? '#dc2626' :
                    riskResult.level === 'Medium' ? '#ca8a04' : '#16a34a';

  const circumference = 2 * Math.PI * 60;
  const strokeDasharray = `${(animatedScore / 100) * circumference} ${circumference}`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Display */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold text-navy-800 mb-4">
          Your ADA Lawsuit Risk Assessment
        </h1>
        
        {/* Animated Gauge */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 144 144">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke={gaugeColor}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              className="transition-all duration-1500 ease-out"
              style={{
                strokeDashoffset: 0,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-navy-800">
              {animatedScore}
            </div>
            <div className="text-sm text-gray-600">Risk Score</div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-lg ${
          riskResult.level === 'Critical' ? 'bg-red-100 text-red-700' :
          riskResult.level === 'High' ? 'bg-red-50 text-red-600' :
          riskResult.level === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
          'bg-green-50 text-green-600'
        }`}>
          {riskResult.level === 'Critical' || riskResult.level === 'High' ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          {riskResult.level} Risk
        </div>

        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          {riskResult.description}
        </p>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-navy-800 mb-6">
          ADA Lawsuit Statistics
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.totalLawsuits}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.lawsuitsThisYear}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.topLawFirms}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.governmentDeadline}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.averageSettlement}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.averageDefenseCost}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{stats.accessiBeFineStat}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-navy-800 mb-6">
          Recommended Next Steps
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-navy-800">
                Get a Professional Accessibility Audit
              </h3>
              <p className="text-gray-600">
                Have experts identify specific issues on your website before they become lawsuits.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-navy-800">
                Use WAVE Web Accessibility Evaluator
              </h3>
              <p className="text-gray-600">
                Test your website for free at{' '}
                <a 
                  href="https://wave.webaim.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-navy-700 underline inline-flex items-center gap-1"
                >
                  wave.webaim.org
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-navy-800">
                Implement Basic Accessibility Features
              </h3>
              <p className="text-gray-600">
                Add alt text to images, ensure keyboard navigation, and improve color contrast.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture */}
      <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-xl shadow-lg p-8 text-white text-center">
        <Mail className="w-12 h-12 mx-auto mb-4 text-white" />
        <h2 className="text-2xl font-bold mb-2">
          Get Your Full Accessibility Report
        </h2>
        <p className="text-navy-100 mb-6 max-w-2xl mx-auto">
          Receive a detailed report with specific recommendations for your website, 
          plus ongoing updates about ADA compliance requirements.
        </p>

        {!isSubmitted ? (
          !showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="bg-white text-navy-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get My Free Report
            </button>
          ) : (
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-navy-800 placeholder-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Report
                </button>
              </div>
            </form>
          )
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg">
              <CheckCircle className="w-5 h-5 inline mr-2" />
              Report sent to {email}! Check your inbox.
            </div>
          </div>
        )}
      </div>

      {/* Restart Button */}
      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="text-navy-600 hover:text-navy-700 underline"
        >
          Take Assessment Again
        </button>
      </div>
    </div>
  );
}