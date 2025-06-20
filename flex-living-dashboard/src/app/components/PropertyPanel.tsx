"use client";
import React, { useState } from 'react';
import { PropertyStats } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { Card } from './ui/Card';

interface PropertyPanelProps {
  property: PropertyStats;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pendingReviews = property.reviews.filter(r => !r.approved && !r.rejected);

  return (
    <Card className="mb-4">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            Pending reviews
            <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs font-semibold">
              {property.pendingReviews}
            </span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Avg Rating: {property.averageRating}</span>
            <StarRating rating={property.averageRating} />
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">Pending: {property.pendingReviews}</span>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Stats Section */}
          <div className="p-6 grid grid-cols-3 gap-8">
            {/* Total Reviews */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Total Reviews</h4>
              <div className="text-3xl font-bold mb-2">{property.totalReviews}</div>
              
              {/* Rating Distribution */}
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs w-2">{star}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ 
                          width: `${((property.ratingDistribution[star] || 0) / property.totalReviews) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2">Overall: {property.averageRating}</div>
            </div>

            {/* Category Averages */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Category Averages</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Cleanliness</span>
                  <span className="font-medium">{property.categoryAverages.cleanliness}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Value</span>
                  <span className="font-medium">{property.categoryAverages.value}/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Communication</span>
                  <span className="font-medium">{property.categoryAverages.communication}/10</span>
                </div>
                <div className="flex justify-between mt-4 pt-2 border-t">
                  <span className="text-sm text-red-600">Common Issue</span>
                  <span className="font-medium text-red-600">{property.mostCommonComplaint}</span>
                </div>
              </div>
            </div>

            {/* Approved Reviews */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Approved Reviews</h4>
              <div className="text-3xl font-bold mb-2">{property.approvedReviews}</div>
              <div className="text-sm text-gray-500">
                Pending: {property.pendingReviews}
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="bg-gray-50 p-6">
            {pendingReviews.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {pendingReviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    propertyName={property.name}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">All reviews have been moderated!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
