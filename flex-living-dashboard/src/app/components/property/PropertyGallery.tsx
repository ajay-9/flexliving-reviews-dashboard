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
      <div className="col-span-3 relative rounded-lg overflow-hidden">
        <img
          src={images[currentImage] || images[0]}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-rows-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div 
            key={index}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
              currentImage === index ? 'border-blue-500' : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={image}
              alt={`${propertyName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
