export const ANALYSIS_CONFIG = {
  // Caching
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  MIN_REVIEWS_FOR_ANALYSIS: 5,
  
  // Rate limiting
  CONCURRENT_ANALYSES: 2, // Max concurrent analyses
  REQUEST_DELAY: 3000, // 3 seconds between requests
  MAX_RETRIES: 3,
  
  // Validation
  MAX_SUMMARY_LINES: 2,
  MAX_SUMMARY_CHARS: 200,
  MIN_CONFIDENCE_SCORE: 0.6,
  
  // Issue detection thresholds
  CRITICAL_THRESHOLD: 3.0, // Average rating below 3.0
  EMERGING_THRESHOLD: 3.5, // Average rating below 3.5
  IMPROVEMENT_THRESHOLD: 4.0, // Average rating above 4.0
  
  // Perplexity API
  API_TIMEOUT: 30000, // 30 seconds
  MAX_TOKENS: 500,
};

export const PERPLEXITY_PROMPT = `
You are a property management analyst. Analyze the provided reviews and respond with ONLY a valid JSON object (no markdown formatting, no code blocks).

Required JSON format:
{
  "summary": "2-line summary here (max 200 chars)",
  "issueLevel": "critical|emerging|improvement|good",
  "painPoints": ["point 1", "point 2", "point 3"],
  "improvementSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "confidence": 0.85
}

Analysis Guidelines:
- CRITICAL: Major problems requiring immediate action (rating < 3.0)
- EMERGING: Warning signs that need monitoring (rating 3.0-3.5)  
- IMPROVEMENT: Positive trends with growth opportunities (rating > 4.0)
- GOOD: Consistent satisfactory performance (rating 3.5-4.0)

For painPoints, identify specific current issues:
- Critical: "Cleanliness failures", "Maintenance breakdowns", "Communication gaps"
- Emerging: "Minor cleanliness issues", "Response delays", "Connectivity problems"
- Improvement: "Service enhancement opportunities", "Amenity upgrades", "Guest experience refinement"
- Good: "Minor optimization areas", "Maintenance scheduling", "Service consistency"

For improvementSuggestions, provide actionable keywords to boost ratings:
- Always include 3 specific, actionable improvement keywords
- Focus on highest-impact areas that guests mention most
- Use concise phrases like "Faster check-in", "Deep cleaning protocol", "24/7 support"
- Prioritize suggestions that address the most frequent complaints

Rules:
- Response must be valid JSON only
- No markdown code blocks or formatting
- Summary must be exactly 2 lines, max 200 characters
- issueLevel must be one of: critical, emerging, improvement, good
- painPoints must be array of exactly 3 strings describing current issues
- improvementSuggestions must be array of exactly 3 actionable improvement keywords
- confidence must be number between 0 and 1

Reviews for {PROPERTY_NAME}:
{REVIEWS}

Respond with JSON only:`;
