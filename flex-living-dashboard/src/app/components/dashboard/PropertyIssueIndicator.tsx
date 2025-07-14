import React from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, ThumbsUp, ArrowUpCircle } from 'lucide-react';

interface PropertyIssueIndicatorProps {
  issueLevel: 'critical' | 'emerging' | 'improvement' | 'good';
}

export const PropertyIssueIndicator: React.FC<PropertyIssueIndicatorProps> = ({ issueLevel }) => {
  const getIssueIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'emerging': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'improvement': return <ArrowUpCircle className="w-4 h-4 text-green-500" />;
      default: return <ThumbsUp className="w-4 h-4 text-blue-500" />;
    }
  };

  return getIssueIcon(issueLevel);
};
