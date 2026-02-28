'use client';

import { useEffect, useState } from 'react';
import { RiskScore } from '@/types/questionnaire';

interface RiskGaugeProps {
  riskScore: RiskScore;
}

export default function RiskGauge({ riskScore }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(riskScore.score);
    }, 500);

    return () => clearTimeout(timer);
  }, [riskScore.score]);

  const strokeWidth = 8;
  const radius = 60;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={riskScore.color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 2s ease-in-out',
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-3xl font-bold"
              style={{ color: riskScore.color }}
            >
              {animatedScore}
            </div>
            <div className="text-xs text-gray-500">out of 100</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div
          className="text-2xl font-bold mb-1"
          style={{ color: riskScore.color }}
        >
          {riskScore.level} Risk
        </div>
        <div className="text-gray-600 text-sm">
          ADA Lawsuit Risk Score
        </div>
      </div>
    </div>
  );
}