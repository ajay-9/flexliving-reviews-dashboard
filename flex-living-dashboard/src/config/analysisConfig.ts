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
  "confidence": 0.85
}

Rules:
- Response must be valid JSON only
- No markdown code blocks or formatting
- Summary must be exactly 2 lines, max 200 characters
- issueLevel must be one of: critical, emerging, improvement, good
- painPoints must be array of exactly 3 strings
- confidence must be number between 0 and 1

Reviews for {PROPERTY_NAME}:
{REVIEWS}

Respond with JSON only:`;
