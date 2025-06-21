import React from 'react';
import { Wifi, Car, Coffee, Tv, Wind, Utensils } from 'lucide-react';

interface PropertyAmenitiesProps {
  amenities: string[];
}

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi size={20} />,
  'Kitchen': <Utensils size={20} />,
  'Kitchenette': <Utensils size={20} />,
  'TV': <Tv size={20} />,
  'Heating': <Wind size={20} />,
  'Coffee Machine': <Coffee size={20} />,
  'Workspace': <Car size={20} />,
  'Iron': <Car size={20} />,
  'Markets nearby': <Car size={20} />,
  'Public Transport': <Car size={20} />,
  'Concierge': <Car size={20} />,
  'Garden Access': <Car size={20} />,
  'Theatre nearby': <Car size={20} />,
  'Restaurants': <Car size={20} />,
  'Nightlife': <Car size={20} />
};

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">What this place offers</h3>
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3 py-2">
            <div className="text-gray-600">
              {amenityIcons[amenity] || <Car size={20} />}
            </div>
            <span className="text-gray-800">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
