import React from 'react';
import { PropertyAnalysis } from '@/types/analysis';
import { AlertTriangle, TrendingUp, CheckCircle, ThumbsUp } from 'lucide-react';

interface IssueDetectionPanelProps {
  analysis: PropertyAnalysis;
}

export const IssueDetectionPanel: React.FC<IssueDetectionPanelProps> = ({ analysis }) => {
  const getIssueConfig = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          title: 'Critical Issues',
          description: 'Requires immediate attention'
        };
      case 'emerging':
        return {
          icon: TrendingUp,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
          title: 'Emerging Concerns',
          description: 'Needs monitoring'
        };
      case 'improvement':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          title: 'Improvement Opportunities',
          description: 'Positive trends identified'
        };
      default:
        return {
          icon: ThumbsUp,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-200',
          title: 'Good Performance',
          description: 'No issues detected'
        };
    }
  };

  const config = getIssueConfig(analysis.issueLevel);
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${config.color}`} />
        <h4 className={`font-medium ${config.color}`}>{config.title}</h4>
      </div>
      <p className="text-sm text-gray-600">{config.description}</p>
      
      {analysis.confidence < 0.7 && (
        <div className="mt-2 text-xs text-gray-500">
          ⚠️ Low confidence analysis - may need manual review
        </div>
      )}
    </div>
  );
};
