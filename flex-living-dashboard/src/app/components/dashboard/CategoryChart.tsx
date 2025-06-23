import React from 'react';

interface CategoryData {
  month: string;
  score: number;
}

interface CategoryChartProps {
  categoryName: string;
  data: CategoryData[];
  color: string;
}

export const CategoryChart: React.FC<CategoryChartProps> = ({
  categoryName,
  data,
  color
}) => {
  const calculateTrend = (data: CategoryData[]) => {
    const firstScore = data[0].score;
    const lastScore = data[data.length - 1].score;
    return lastScore - firstScore;
  };

  const trendValue = calculateTrend(data);
  const maxValue = 10;
  const minValue = 0;
  
  // ✅ INCREASED chart dimensions for better visibility
  const chartHeight = 140;
  const chartWidth = 340; // Increased width
  const barWidth = 55;    // Slightly wider bars
  const barSpacing = 25;  // ✅ INCREASED spacing between bars

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
      {/* Chart Title */}
      <h3 className="text-base font-semibold mb-4 text-gray-800 capitalize">
        {categoryName}
      </h3>
      
      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis Labels */}
        <div 
          className="absolute left-0 top-0 flex flex-col justify-between text-xs text-gray-500" 
          style={{ height: chartHeight }}
        >
          <span>10</span>
          <span className="transform -translate-y-1">5</span>
          <span>0</span>
        </div>
        
        {/* Chart Area */}
        <div className="ml-8 relative" style={{ height: chartHeight, width: chartWidth }}>
          {/* Grid Lines */}
          {[0, 2.5, 5, 7.5, 10].map((value) => (
            <div
              key={value}
              className="absolute w-full border-t border-gray-100"
              style={{
                bottom: `${(value / maxValue) * 100}%`,
              }}
            />
          ))}
          
          {/* Bars Container */}
          <div className="relative h-full">
            {data.map((item, index) => {
              const barHeight = ((item.score - minValue) / (maxValue - minValue)) * chartHeight;
              const leftPosition = index * (barWidth + barSpacing) + 20; // ✅ Centered start position
              
              return (
                <div key={item.month}>
                  {/* Bar */}
                  <div
                    className={`${color} rounded-t-sm transition-all duration-200 hover:opacity-80 absolute`}
                    style={{
                      width: barWidth,
                      height: Math.max(barHeight, 3),
                      bottom: 0,
                      left: leftPosition,
                    }}
                    title={`${item.month}: ${item.score}/10`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* X-axis labels positioned BELOW the chart */}
        <div 
          className="ml-8 mt-3 relative" 
          style={{ width: chartWidth }}
        >
          {data.map((item, index) => {
            const leftPosition = index * (barWidth + barSpacing) + 20; // Match bar position
            return (
              <span
                key={item.month}
                className="text-sm text-gray-600 font-medium absolute"
                style={{
                  left: leftPosition,
                  width: barWidth,
                  textAlign: 'center',
                }}
              >
                {item.month}
              </span>
            );
          })}
        </div>
      </div>
      
      {/* Trend Indicator */}
      <div className="mt-8 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Trend:</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              {trendValue > 0 ? '📈' : trendValue < 0 ? '📉' : '➡️'}
            </span>
            <span className={`text-sm font-semibold ${
              trendValue > 0 ? 'text-green-600' : 
              trendValue < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trendValue > 0 ? '+' : ''}{trendValue.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
