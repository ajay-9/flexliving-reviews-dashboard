import React from 'react';
import { PropertyDisplayData } from '@/types';
import { StarRating } from '../shared/StarRating';

interface PropertyBookingProps {
  property: PropertyDisplayData;
  averageRating: number;
  totalReviews: number;
}

export const PropertyBooking: React.FC<PropertyBookingProps> = ({ 
  property, 
  averageRating, 
  totalReviews 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">£120</span>
          <span className="text-gray-600">night</span>
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} size={16} />
          <span className="text-sm font-medium">{averageRating}</span>
          <span className="text-sm text-gray-600">({totalReviews} reviews)</span>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-IN</label>
            <div className="text-sm text-gray-600">Mar 15, 2025</div>
          </div>
          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">CHECK-OUT</label>
            <div className="text-sm text-gray-600">Mar 18, 2025</div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-3">
          <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
          <div className="text-sm text-gray-600">2 guests</div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
        Reserve
      </button>

      <div className="text-center text-sm text-gray-600 mb-4">
        You won't be charged yet
      </div>

      {/* Hardcoded pricing summary */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>£120 x 3 nights</span>
          <span>£360</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Cleaning fee</span>
          <span>£25</span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-2">
          <span>Total</span>
          <span>£385</span>
        </div>
      </div>
    </div>
  );
};
