"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { PropertyStats } from '@/types/dashboard';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { StarRating } from '../shared/StarRating';
import { ReviewCard } from './ReviewCard';
import { Card } from '../shared/ui/Card';
import { Button } from '../shared/ui/Button';
import { getPropertyAssets } from '@/config/propertyAssets';
import { slugify } from '@/utils/slugify'; // ← ADD THIS IMPORT

interface PropertyPanelProps {
  property: PropertyStats;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pendingReviews = property.reviews.filter(r => !r.approved && !r.rejected);
  
  // GENERATE MISSING DATA DYNAMICALLY
  const propertySlug = slugify(property.name);
  const propertyAssets = getPropertyAssets(property.name);

  return (
    <Card className="mb-4">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{property.name}</h3>
           
            <p className="text-sm text-gray-600 mt-1">
              {propertyAssets.location.area}, {propertyAssets.location.city}
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            Pending reviews
            <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs font-semibold">
              {property.pendingReviews}
            </span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Avg Rating: {property.averageRating}</span>
              <StarRating rating={property.averageRating} />
            </div>
          </div>
          
          {/* USE DYNAMIC SLUG INSTEAD OF property.slug */}
          <Link href={`/property/${propertySlug}`} onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ExternalLink size={14} />
              View Property Page
            </Button>
          </Link>
        </div>
      </div>

      {/* Rest of component stays exactly the same */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-6 grid grid-cols-3 gap-8">
            {/* Total Reviews */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Total Reviews</h4>
              <div className="text-3xl font-bold mb-2">{property.totalReviews}</div>
              
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

            {/* Category Averages - UPDATED TO HANDLE DYNAMIC CATEGORIES */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Category Averages</h4>
              <div className="space-y-2">
                {Object.entries(property.categoryAverages).slice(0, 3).map(([category, rating]) => (
                  <div key={category} className="flex justify-between">
                    <span className="text-sm capitalize">{category}</span>
                    <span className="font-medium">{rating}/10</span>
                  </div>
                ))}
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
