import React from 'react';
import { PropertyAnalysis } from '@/types/analysis';
import { Loader2, RefreshCw, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface AnalysisStatusProps {
  isAnalyzing: boolean;
  analysis: PropertyAnalysis | null;
  error: string | null;
  onRefresh: () => void;
}

export const AnalysisStatus: React.FC<AnalysisStatusProps> = ({
  isAnalyzing,
  analysis,
  error,
  onRefresh
}) => {
  // Show loading state
  if (isAnalyzing) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Analyzing...</span>
      </div>
    );
  }

  // Show error state with retry option
  if (error) {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <button
          onClick={onRefresh}
          className="text-sm text-red-600 hover:text-red-700 underline"
        >
          Retry Analysis
        </button>
      </div>
    );
  }

  // Show success state with refresh option
  if (analysis) {
    const isStale = Date.now() - new Date(analysis.analyzedAt).getTime() > 12 * 60 * 60 * 1000; // 12 hours
    
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span className="text-sm text-green-600">Analysis Complete</span>
        {isStale && <Clock className="w-4 h-4 text-yellow-500" />}
        <button
          onClick={onRefresh}
          className="text-sm text-gray-600 hover:text-gray-700 ml-2"
          title="Refresh analysis"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Show initial state
  return (
    <button
      onClick={onRefresh}
      className="text-sm text-blue-600 hover:text-blue-700 underline"
    >
      Start Analysis
    </button>
  );
};
