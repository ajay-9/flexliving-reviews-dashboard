import React from 'react';

interface ChannelData {
  channel: string;
  reviews: number;
  rating: number;
  color: string;
}

interface ChannelChartProps {
  data: ChannelData[];
}

export const ChannelChart: React.FC<ChannelChartProps> = ({ data }) => {
  const maxReviews = Math.max(...data.map(item => item.reviews));
  const chartHeight = 140;
  const chartWidth = 340; // ✅ Increased width
  const barWidth = 60;    // ✅ Wider bars for better visibility
  const barSpacing = 30;  // ✅ More spacing between bars

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
      {/* Chart Title */}
      <h3 className="text-base font-semibold mb-4 text-gray-800">
        Channel Performance
      </h3>
      
      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis Labels */}
        <div 
          className="absolute left-0 top-0 flex flex-col justify-between text-xs text-gray-500" 
          style={{ height: chartHeight }}
        >
          <span>{maxReviews}</span>
          <span>{Math.floor(maxReviews / 2)}</span>
          <span>0</span>
        </div>
        
        {/* Chart Area */}
        <div className="ml-8 relative" style={{ height: chartHeight, width: chartWidth }}>
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((value) => (
            <div
              key={value}
              className="absolute w-full border-t border-gray-100"
              style={{
                bottom: `${value * 100}%`,
              }}
            />
          ))}
          
          {/* Bars Container */}
          <div className="relative h-full">
            {data.map((item, index) => {
              const barHeight = (item.reviews / maxReviews) * chartHeight;
              const leftPosition = index * (barWidth + barSpacing) + 20; // ✅ Centered positioning
              
              return (
                <div key={item.channel}>
                  {/* Bar */}
                  <div
                    className={`${item.color} rounded-t-sm transition-all duration-200 hover:opacity-80 absolute`}
                    style={{
                      width: barWidth,
                      height: Math.max(barHeight, 3),
                      bottom: 0,
                      left: leftPosition,
                    }}
                    title={`${item.channel}: ${item.reviews} reviews`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* X-axis labels */}
        <div 
          className="ml-8 mt-3 relative" 
          style={{ width: chartWidth }}
        >
          {data.map((item, index) => {
            const leftPosition = index * (barWidth + barSpacing) + 20;
            return (
              <span
                key={item.channel}
                className="text-sm text-gray-600 font-medium absolute"
                style={{
                  left: leftPosition,
                  width: barWidth,
                  textAlign: 'center',
                }}
              >
                {item.channel}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
