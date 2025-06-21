import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, propertyName }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="grid grid-cols-4 gap-2 h-96">
      {/* Main Image */}
      <div className="col-span-3 relative rounded-lg overflow-hidden">
        <Image
          src={images[currentImage] || '/images/placeholder-property.jpg'}
          alt={propertyName}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Thumbnail Grid */}
      <div className="grid grid-rows-4 gap-2">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
              currentImage === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={images[index] || '/images/placeholder-property.jpg'}
              alt={`${propertyName} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
