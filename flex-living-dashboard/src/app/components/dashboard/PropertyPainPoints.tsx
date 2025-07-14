import React from 'react';
import { PropertyAnalysis } from '@/types/analysis';

interface PropertyPainPointsProps {
  analysis: PropertyAnalysis;
}

export const PropertyPainPoints: React.FC<PropertyPainPointsProps> = ({ analysis }) => {
  if (!analysis.painPoints.length) return null;

  return (
    <div className="mt-4 pt-4 border-t">
      <h5 className="font-medium text-gray-700 mb-2">AI-Detected Issues</h5>
      <ul className="space-y-1">
        {analysis.painPoints.slice(0, 3).map((point, index) => (
          <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
            <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};
