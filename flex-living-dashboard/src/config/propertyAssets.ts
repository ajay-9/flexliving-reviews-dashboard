import { PropertyAssets } from '@/types/property';

/**
 * Generic property assets configuration
 * Does NOT customize based on listing name - purely generic approach
 * Only uses static fallback data for all properties
 * Images from public folder for consistency
 */

// Generic images that work for all properties
const GENERIC_PROPERTY_IMAGES = [
  '/images/property-1.jpg',
  '/images/property-2.jpg', 
  '/images/property-3.jpg',
  '/images/property-4.jpg'
];

// Generic amenities for rental properties
const STANDARD_AMENITIES = [
  'WiFi',
  'Kitchen',
  'Heating',
  'TV',
  'Essential amenities'
];

/**
 * Default property assets - same for ALL properties
 * No customization based on listing name or location
 */
export const DEFAULT_PROPERTY_ASSETS: PropertyAssets = {
  images: GENERIC_PROPERTY_IMAGES,
  pricing: {
    basePrice: 100,
    currency: 'GBP',
    cleaningFee: 20
  },
  capacity: {
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1
  },
  amenities: STANDARD_AMENITIES,
  location: {
    area: 'Area',    // Generic for all
    city: 'City',         // Generic for all
    postcode: 'Postcode'      // Generic for all
  },
  description: 'Comfortable accommodation with modern amenities and excellent connectivity. Perfect for travelers looking for a quality stay in London.'
};

/**
 * Get property assets - completely generic
 * Returns exactly the same assets for all properties
 * No customization based on listing name
 */
export function getPropertyAssets(listingName: string): PropertyAssets {
  // Return identical assets for all properties
  // Only use listing name for display purposes, not for customization
  return {
    ...DEFAULT_PROPERTY_ASSETS
  };
}
