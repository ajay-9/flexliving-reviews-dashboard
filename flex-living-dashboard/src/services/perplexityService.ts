import { PerplexityResponse } from "@/types/analysis";
import { ANALYSIS_CONFIG, PERPLEXITY_PROMPT } from "@/config/analysisConfig";
import { NormalizedReview } from "@/types/api";

class PerplexityService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.perplexity.ai/chat/completions";
  private requestCount = 0;
  private lastRequestTime = 0;

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY || "";
    if (!this.apiKey) {
      console.error("Perplexity API key not found");
    }
  }

  private async enforceRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < ANALYSIS_CONFIG.REQUEST_DELAY) {
      const waitTime = ANALYSIS_CONFIG.REQUEST_DELAY - timeSinceLastRequest;
      console.log(
        `⏳ Rate limiting: waiting ${waitTime}ms before next API call`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;
    console.log(`📊 Perplexity API call #${this.requestCount}`);
  }

  private formatReviewsForPrompt(reviews: NormalizedReview[]): string {
    return reviews
      .map((review) => {
        const categories = Object.entries(review.categoryRatings)
          .map(([cat, rating]) => `${cat}: ${rating}/10`)
          .join(", ");

        return `Rating: ${review.rating}/10, Categories: ${categories}, Review: "${review.publicReview}"`;
      })
      .join("\n\n");
  }

  private cleanMarkdownResponse(content: string): string {
    let cleaned = content.trim();

    // Remove opening code block markers
    if (cleaned.startsWith("```json")) {
      console.log("🧹 Cleaning JSON markdown blocks from AI response");
      cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith("```")) {
      console.log("🧹 Cleaning generic markdown blocks from AI response");
      cleaned = cleaned.substring(3);
    }

    // Remove closing code block markers
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.substring(0, cleaned.length - 3);
    }

    return cleaned.trim();
  }

  async analyzeProperty(
    propertyName: string,
    reviews: NormalizedReview[]
  ): Promise<PerplexityResponse> {
    console.log("=== Perplexity API Call ===");
    console.log("Property:", propertyName);
    console.log("Reviews count:", reviews.length);
    console.log("API Key present:", !!this.apiKey);

    if (!this.apiKey) {
      throw new Error("Perplexity API key not configured");
    }

    await this.enforceRateLimit();

    const reviewText = this.formatReviewsForPrompt(reviews);
    const prompt = PERPLEXITY_PROMPT.replace("{REVIEWS}", reviewText).replace(
      "{PROPERTY_NAME}",
      propertyName
    );

    console.log(` Prompt length: ${prompt.length} characters`);

    const requestBody = {
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "You are a property management analyst. Provide concise, actionable insights in valid JSON format only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: ANALYSIS_CONFIG.MAX_TOKENS,
      temperature: 0.2,
      top_p: 0.9,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        ANALYSIS_CONFIG.API_TIMEOUT
      );

      console.log(`🌐 Making API call to Perplexity...`);

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log(`📡 Perplexity API response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(
          `Perplexity API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      console.log(`✅ Perplexity AI response received successfully`);

      // FIXED: Correct array access syntax
      let responseContent = data.choices?.[0]?.message?.content;

      if (!responseContent) {
        throw new Error("No content in Perplexity response");
      }

      console.log(
        `📄 Raw AI response length: ${responseContent.length} characters`
      );

      // Clean markdown code blocks from response
      responseContent = this.cleanMarkdownResponse(responseContent);

      // Parse JSON response
      let parsedResponse: PerplexityResponse;
      try {
        parsedResponse = JSON.parse(responseContent);
        console.log(
          `✅ AI response parsed successfully - Issue Level: ${parsedResponse.issueLevel}, Confidence: ${parsedResponse.confidence}`
        );
      } catch (parseError) {
        console.error("Failed to parse AI JSON response:", responseContent);
        throw new Error(
          `AI did not return valid JSON: ${(parseError as Error).message}`
        );
      }

      console.log(`=== Perplexity AI Analysis Complete ===`);

      return parsedResponse;
    } catch (error) {
      console.error("Perplexity API call failed:", error);
      throw error;
    }
  }
}

export const perplexityService = new PerplexityService();
