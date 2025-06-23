import React from 'react';
import { CategoryChart } from './CategoryChart';
import { ChannelChart } from './ChannelChart';
import { QuickInsights } from './QuickInsights';

export const Sidebar: React.FC = () => {
  // ✅ Category performance data
  const categoryMonthlyData = {
    cleanliness: [
      { month: 'Mar', score: 6.2 },
      { month: 'Apr', score: 7.5 },
      { month: 'May', score: 7.0 },
      { month: 'Jun', score: 8.9 }
    ],
    communication: [
      { month: 'Mar', score: 6.0 },
      { month: 'Apr', score: 7.1 },
      { month: 'May', score: 9.2 },
      { month: 'Jun', score: 6.4 }
    ],
    value: [
      { month: 'Mar', score: 6.5 },
      { month: 'Apr', score: 7.6 },
      { month: 'May', score: 7.8 },
      { month: 'Jun', score: 8.5 }
    ]
  };

  const channelData = [
    { channel: 'Airbnb', reviews: 55, rating: 4.5, color: 'bg-red-500' },
    { channel: 'Booking.com', reviews: 42, rating: 4.2, color: 'bg-blue-600' },
    { channel: 'Direct', reviews: 28, rating: 4.7, color: 'bg-green-600' }
  ];

  // ✅ Quick Insights Data
  const quickInsightsData = [
    {
      icon: '📈',
      text: 'Communication scores consistently high (9.2/10)',
      type: 'positive' as const
    },
    {
      icon: '⚠️',
      text: 'Value ratings need attention (7.8/10)',
      type: 'warning' as const
    },
    {
      icon: 'ℹ️',
      text: 'Direct bookings show highest satisfaction (4.7/5)',
      type: 'info' as const
    },
    {
      icon: '🎯',
      text: 'June shows peak performance trend',
      type: 'trend' as const
    }
  ];

  return (
    <div className="w-85 bg-gray-50 p-4 overflow-y-auto h-full">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Analytics Overview</h2>
      
      {/* Category Charts */}
      <div className="space-y-4">
        <CategoryChart 
          categoryName="cleanliness" 
          data={categoryMonthlyData.cleanliness} 
          color="bg-green-500" 
        />
        
        <CategoryChart 
          categoryName="communication" 
          data={categoryMonthlyData.communication} 
          color="bg-blue-500" 
        />
        
        <CategoryChart 
          categoryName="value" 
          data={categoryMonthlyData.value} 
          color="bg-purple-500" 
        />
        
        {/* Channel Performance */}
        <ChannelChart data={channelData} />
        
        {/* Quick Insights */}
        <QuickInsights 
          categoryData={categoryMonthlyData} 
          channelData={channelData} 
        />
      </div>
    </div>
  );
};
