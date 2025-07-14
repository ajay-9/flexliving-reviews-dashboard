import React from 'react';
import { PropertyAnalysis } from '@/types/analysis';

interface PropertyAnalysisMetadataProps {
  analysis: PropertyAnalysis;
}

export const PropertyAnalysisMetadata: React.FC<PropertyAnalysisMetadataProps> = ({ analysis }) => {
  return (
    <div className="mt-3 text-xs text-gray-500 space-y-1">
      <div>Confidence: {Math.round(analysis.confidence * 100)}%</div>
      <div>Analyzed: {new Date(analysis.analyzedAt).toLocaleDateString()}</div>
      <div>Reviews: {analysis.reviewCount}</div>
    </div>
  );
};
