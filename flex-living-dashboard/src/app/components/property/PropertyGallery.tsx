import React, { useState } from 'react';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, propertyName }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="mb-8">
      {/* Gallery grid - matches reference exactly */}
      <div className="grid grid-cols-2 gap-2 h-96">
        
        {/* Main large image - left half */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={images[currentImage] || images[0] || '/images/property-1.jpg'}
            alt={propertyName}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right side - 2x2 grid of thumbnails */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index} 
              className="relative rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setCurrentImage(index + 1)}
            >
              <img
                src={image || '/images/property-1.jpg'}
                alt={`${propertyName} ${index + 2}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              />
              {/* "View all photos" overlay on last image */}
              {index === 3 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">📷 View all photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
