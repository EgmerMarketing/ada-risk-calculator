'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // In a real app, this would submit to a backend API
      console.log('Email submitted:', email);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-800 font-semibold mb-2">
          Thank you! Your report is on the way.
        </div>
        <div className="text-green-600 text-sm">
          Check your inbox for your comprehensive accessibility report and next steps.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-navy rounded-lg p-6">
      <div className="text-center mb-4">
        <Mail className="w-8 h-8 text-navy mx-auto mb-2" />
        <h3 className="text-lg font-bold text-navy mb-2">
          Get Your Full Accessibility Report
        </h3>
        <p className="text-gray-600 text-sm">
          Receive a detailed analysis with specific action items, compliance checklist, 
          and protection strategies tailored to your business.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter your business email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-danger hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Get My Free Report
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="text-xs text-gray-500 text-center mt-3">
        No spam. Unsubscribe anytime. Your privacy is protected.
      </div>
    </div>
  );
}