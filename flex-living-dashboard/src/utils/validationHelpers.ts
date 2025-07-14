import { PerplexityResponse, AnalysisValidation } from '@/types/analysis';
import { ANALYSIS_CONFIG } from '@/config/analysisConfig';

export function validateAnalysisResponse(response: PerplexityResponse): AnalysisValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!response.summary) {
    errors.push('Summary is required');
  }

  if (!response.issueLevel) {
    errors.push('Issue level is required');
  }

  if (!Array.isArray(response.painPoints)) {
    errors.push('Pain points must be an array');
  }

  if (typeof response.confidence !== 'number') {
    errors.push('Confidence must be a number');
  }

  // Validate summary length
  if (response.summary) {
    const lines = response.summary.split('\n').filter(line => line.trim());
    if (lines.length > ANALYSIS_CONFIG.MAX_SUMMARY_LINES) {
      warnings.push(`Summary has ${lines.length} lines, expected max ${ANALYSIS_CONFIG.MAX_SUMMARY_LINES}`);
    }

    if (response.summary.length > ANALYSIS_CONFIG.MAX_SUMMARY_CHARS) {
      warnings.push(`Summary too long: ${response.summary.length} chars, max ${ANALYSIS_CONFIG.MAX_SUMMARY_CHARS}`);
    }
  }

  // Validate issue level
  const validLevels = ['critical', 'emerging', 'improvement', 'good'];
  if (response.issueLevel && !validLevels.includes(response.issueLevel)) {
    errors.push(`Invalid issue level: ${response.issueLevel}`);
  }

  // Validate pain points
  if (response.painPoints) {
    if (response.painPoints.length > 3) {
      warnings.push(`Too many pain points: ${response.painPoints.length}, expected max 3`);
    }

    response.painPoints.forEach((point, index) => {
      if (typeof point !== 'string' || point.trim().length === 0) {
        errors.push(`Pain point ${index + 1} is invalid`);
      }
    });
  }

  // Validate confidence
  if (response.confidence !== undefined) {
    if (response.confidence < 0 || response.confidence > 1) {
      errors.push('Confidence must be between 0 and 1');
    }

    if (response.confidence < ANALYSIS_CONFIG.MIN_CONFIDENCE_SCORE) {
      warnings.push(`Low confidence score: ${response.confidence}`);
    }
  }
if (!Array.isArray(response.improvementSuggestions)) {
    errors.push('Improvement suggestions must be an array');
  } else {
    if (response.improvementSuggestions.length !== 3) {
      warnings.push(`Expected 3 improvement suggestions, got ${response.improvementSuggestions.length}`);
    }

    response.improvementSuggestions.forEach((suggestion, index) => {
      if (typeof suggestion !== 'string' || suggestion.trim().length === 0) {
        errors.push(`Improvement suggestion ${index + 1} is invalid`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function sanitizeAnalysisResponse(response: PerplexityResponse): PerplexityResponse {
  return {
    summary: response.summary?.substring(0, ANALYSIS_CONFIG.MAX_SUMMARY_CHARS) || 'Analysis unavailable',
    issueLevel: ['critical', 'emerging', 'improvement', 'good'].includes(response.issueLevel) 
      ? response.issueLevel 
      : 'emerging',
    painPoints: (response.painPoints || [])
      .filter(point => typeof point === 'string' && point.trim())
      .slice(0, 3),
    improvementSuggestions: (response.improvementSuggestions || []) // NEW: Sanitize suggestions
      .filter(suggestion => typeof suggestion === 'string' && suggestion.trim())
      .slice(0, 3),
    confidence: Math.max(0, Math.min(1, response.confidence || 0))
  };
}
export function createFallbackAnalysis(propertyName: string, reviewCount: number): PerplexityResponse {
  return {
    summary: `Analysis unavailable for ${propertyName}. Based on ${reviewCount} reviews.`,
    issueLevel: 'emerging',
    painPoints: ['Analysis temporarily unavailable', 'Please try again later'],
    improvementSuggestions: ['System maintenance', 'Manual review recommended', 'Try again later'], // ADD THIS LINE
    confidence: 0.1
  };
}


export function validateAndCleanResponse(rawContent: string): PerplexityResponse {
  try {
    // Clean markdown formatting
    let cleaned = rawContent.trim();
    
    // Remove code block markers
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.substring(3);
    }
    
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.substring(0, cleaned.length - 3);
    }
    
    // Parse JSON
    const parsed = JSON.parse(cleaned.trim());
    
    // Validate structure
    const validation = validateAnalysisResponse(parsed);
    if (!validation.isValid) {
      throw new Error(`Invalid response structure: ${validation.errors.join(', ')}`);
    }
    
    return sanitizeAnalysisResponse(parsed);
    
  } catch (error) {
    console.error('Response validation failed:', error);
    console.error('Raw content:', rawContent);
    let errorMessage = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      errorMessage = (error as any).message;
    }
    throw new Error(`Failed to parse AI response: ${errorMessage}`);
  }
}
