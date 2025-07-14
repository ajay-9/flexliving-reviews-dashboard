import React from 'react';
import { PropertyAnalysis } from '@/types/analysis';

interface PropertySummaryProps {
  analysis: PropertyAnalysis | null;
}

export const PropertySummary: React.FC<PropertySummaryProps> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="mt-3 text-sm text-gray-700 bg-white/50 p-3 rounded-md border">
      {analysis.summary.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};
