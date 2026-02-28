'use client';

import { Question } from '@/types/questionnaire';
import { ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  onNext: () => void;
  canProceed: boolean;
}

export default function QuestionCard({ question, value, onChange, onNext, canProceed }: QuestionCardProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy mb-2">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-gray-600">
              {question.subtitle}
            </p>
          )}
        </div>

        <div className="space-y-3 mb-8">
          {question.type === 'boolean' && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={String(option.value)}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    value === option.value
                      ? 'border-navy bg-blue-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={question.id}
                      value={String(option.value)}
                      checked={value === option.value}
                      onChange={() => onChange(option.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-navy">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {question.type === 'radio' && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={String(option.value)}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    value === option.value
                      ? 'border-navy bg-blue-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={question.id}
                      value={String(option.value)}
                      checked={value === option.value}
                      onChange={() => onChange(option.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-navy">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {question.type === 'select' && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={String(option.value)}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    value === option.value
                      ? 'border-navy bg-blue-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name={question.id}
                      value={String(option.value)}
                      checked={value === option.value}
                      onChange={() => onChange(option.value)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-navy">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!canProceed}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
            canProceed
              ? 'bg-navy hover:opacity-90 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}