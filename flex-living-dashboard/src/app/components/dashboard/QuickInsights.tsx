import React from 'react';

interface CategoryData {
  month: string;
  score: number;
}

interface ChannelData {
  channel: string;
  reviews: number;
  rating: number;
  color: string;
}

interface InsightData {
  icon: string;
  text: string;
  type: 'positive' | 'warning' | 'info' | 'trend';
}

interface QuickInsightsProps {
  categoryData: {
    cleanliness: CategoryData[];
    communication: CategoryData[];
    value: CategoryData[];
  };
  channelData: ChannelData[];
}

export const QuickInsights: React.FC<QuickInsightsProps> = ({ 
  categoryData, 
  channelData 
}) => {
  
  // ✅ DYNAMIC INSIGHTS GENERATOR
  const generateInsights = (): InsightData[] => {
    const insights: InsightData[] = [];
    
    // 1. Analyze category trends and performance
    const categories = Object.entries(categoryData);
    
    categories.forEach(([categoryName, data]) => {
      const latestScore = data[data.length - 1].score;
      const firstScore = data[0].score;
      const trend = latestScore - firstScore;
      const latestMonth = data[data.length - 1].month;
      
      // High performing categories
      if (latestScore >= 9.0) {
        insights.push({
          icon: '📈',
          text: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} scores consistently high (${latestScore}/10)`,
          type: 'positive'
        });
      }
      
      // Low performing categories needing attention
      else if (latestScore < 8.0) {
        insights.push({
          icon: '⚠️',
          text: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} ratings need attention (${latestScore}/10)`,
          type: 'warning'
        });
      }
      
      // Strong positive trends
      if (trend >= 0.5) {
        insights.push({
          icon: '🎯',
          text: `${latestMonth} shows ${categoryName} improvement trend (+${trend.toFixed(1)})`,
          type: 'trend'
        });
      }
      
      // Declining trends
      else if (trend <= -0.3) {
        insights.push({
          icon: '📉',
          text: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} declining since ${data[0].month} (-${Math.abs(trend).toFixed(1)})`,
          type: 'warning'
        });
      }
    });
    
    // 2. Analyze channel performance
    const bestChannel = channelData.reduce((best, current) => 
      current.rating > best.rating ? current : best
    );
    
    const mostReviews = channelData.reduce((most, current) => 
      current.reviews > most.reviews ? current : most
    );
    
    // Best rating channel
    if (bestChannel.rating >= 4.5) {
      insights.push({
        icon: 'ℹ️',
        text: `${bestChannel.channel} bookings show highest satisfaction (${bestChannel.rating}/5)`,
        type: 'info'
      });
    }
    
    // Volume leader
    if (mostReviews.reviews >= 50) {
      insights.push({
        icon: '📊',
        text: `${mostReviews.channel} leads in review volume (${mostReviews.reviews} reviews)`,
        type: 'info'
      });
    }
    
    // 3. Overall performance insights
    const allLatestScores = categories.map(([, data]) => data[data.length - 1].score);
    const averageScore = allLatestScores.reduce((sum, score) => sum + score, 0) / allLatestScores.length;
    const latestMonth = categories[0][1][categories[0][1].length - 1].month;
    
    if (averageScore >= 8.5) {
      insights.push({
        icon: '🌟',
        text: `${latestMonth} shows excellent overall performance (${averageScore.toFixed(1)}/10 avg)`,
        type: 'positive'
      });
    }
    
    // 4. Growth insights
    const totalTrend = categories.reduce((sum, [, data]) => {
      const trend = data[data.length - 1].score - data[0].score;
      return sum + trend;
    }, 0);
    
    if (totalTrend > 1.0) {
      insights.push({
        icon: '📈',
        text: `Consistent growth across all categories over 4 months (+${totalTrend.toFixed(1)} total)`,
        type: 'trend'
      });
    }
    
    // Return top 4 most relevant insights
    return insights.slice(0, 4);
  };

  const insights = generateInsights();

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-blue-100';
      case 'trend':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      {/* Section Header */}
      <div className="flex items-center mb-4">
        <span className="text-lg mr-2">📊</span>
        <h3 className="text-base font-semibold text-gray-800">Quick Insights</h3>
      </div>
      
      {/* Dynamic Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start space-x-3">
            {/* Icon */}
            <div className={`${getIconBackground(insight.type)} p-2 rounded-lg flex-shrink-0`}>
              <span className="text-sm">{insight.icon}</span>
            </div>
            
            {/* Text */}
            <p className="text-sm text-gray-700 leading-relaxed flex-1">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
