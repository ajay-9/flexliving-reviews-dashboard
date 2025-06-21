import React from 'react';
import { Card } from './ui/Card';

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Trends Card */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Trends</h3>
          
          {/* Cleanliness Trend */}
          <div className="mb-6">
            <div className="text-sm font-medium mb-1">Avg. Cleanliness</div>
            <div className="text-xs text-gray-500 mb-3">(4 months)</div>
            <div className="h-12 bg-gray-100 rounded flex items-center justify-center">
              <svg width="200" height="32" viewBox="0 0 200 32" className="text-blue-500">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  points="10,25 50,20 100,15 150,18 190,12"
                />
              </svg>
            </div>
          </div>

          {/* Communication Trend */}
          <div className="mb-6">
            <div className="text-sm font-medium mb-3">Avg. Communication</div>
            <div className="h-12 bg-gray-100 rounded flex items-center justify-center">
              <svg width="200" height="32" viewBox="0 0 200 32" className="text-green-500">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  points="10,20 50,16 100,22 150,14 190,18"
                />
              </svg>
            </div>
          </div>

          {/* Value Trend */}
          <div>
            <div className="text-sm font-medium mb-3">Avg. Value</div>
            <div className="h-12 bg-gray-100 rounded flex items-center justify-center">
              <svg width="200" height="32" viewBox="0 0 200 32" className="text-purple-500">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  points="10,18 50,24 100,16 150,20 190,14"
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>

      {/* Complaints Card */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Complaints <span className="text-sm font-normal text-gray-500">(30 Days)</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Cleanliness</span>
              <span className="font-semibold">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Value</span>
              <span className="font-semibold">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Communication</span>
              <span className="font-semibold">2</span>
            </div>
          </div>
        </div>
        
      </Card>
    </div>
  );
};
