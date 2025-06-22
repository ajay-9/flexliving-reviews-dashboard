import React from 'react';
import { MapPin, Share, Heart } from 'lucide-react';
import { PropertyDisplayData } from '@/types';  // ← CHANGED
import { StarRating } from '../shared/StarRating';
import { Button } from '../shared/ui/Button';

interface PropertyHeaderProps {
  property: PropertyDisplayData;  // ← CHANGED to PropertyDisplayData
  averageRating: number;
  totalReviews: number;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ 
  property, 
  averageRating, 
  totalReviews 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>  {/* ✅ Now works! */}
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <StarRating rating={averageRating} size={16} />
              <span className="font-medium">{averageRating}</span>
              <span className="text-gray-600">({totalReviews} reviews)</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={16} />
              <span>{property.assets.location.area}, {property.assets.location.city}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Share size={16} />
            Share
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Heart size={16} />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
