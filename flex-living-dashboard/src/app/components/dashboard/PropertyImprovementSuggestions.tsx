import React from 'react';
import { PropertyAnalysis } from '@/types/analysis';
import { Lightbulb, TrendingUp, Target } from 'lucide-react';

interface PropertyImprovementSuggestionsProps {
  analysis: PropertyAnalysis;
}

export const PropertyImprovementSuggestions: React.FC<PropertyImprovementSuggestionsProps> = ({ analysis }) => {
  // FIXED: Add proper null checking for improvementSuggestions
  if (!analysis.improvementSuggestions || !analysis.improvementSuggestions.length) return null;

  const getImprovementConfig = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          icon: Target,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Urgent Actions Required',
          description: 'Immediate steps to address critical issues'
        };
      case 'emerging':
        return {
          icon: TrendingUp,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Preventive Measures',
          description: 'Actions to prevent issues from escalating'
        };
      case 'improvement':
        return {
          icon: Lightbulb,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Enhancement Opportunities',
          description: 'Ways to elevate guest experience further'
        };
      default:
        return {
          icon: Lightbulb,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Optimization Ideas',
          description: 'Suggestions to maintain high standards'
        };
    }
  };

  const config = getImprovementConfig(analysis.issueLevel);
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor} mt-4`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${config.color}`} />
        <h5 className={`font-semibold ${config.color}`}>{config.title}</h5>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{config.description}</p>
      
      <div className="space-y-2">
        <h6 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          Recommended Actions:
        </h6>
        <ul className="space-y-1">
          {analysis.improvementSuggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0"></span>
              <span className="font-medium">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Priority Indicator */}
      <div className="mt-3 text-xs text-gray-500">
        <span className="font-medium">Priority:</span>
        <span className={`ml-1 ${
          analysis.issueLevel === 'critical' ? 'text-red-600 font-semibold' :
          analysis.issueLevel === 'emerging' ? 'text-yellow-600 font-medium' :
          'text-green-600'
        }`}>
          {analysis.issueLevel === 'critical' ? 'HIGH' :
           analysis.issueLevel === 'emerging' ? 'MEDIUM' : 'LOW'}
        </span>
      </div>
    </div>
  );
};
