import { PropertyDetails } from '@/types';
import { slugify } from './slugify';

// Dynamic property data generator based on listing names from reviews
export function generatePropertyDetails(listingName: string): PropertyDetails {
  const slug = slugify(listingName);
  
  // Property-specific data based on actual listing names from mock data
  const propertyConfig: Record<string, Partial<PropertyDetails>> = {
    'the-shoreditch-loft': {
      description: 'A stunning industrial loft in the heart of Shoreditch, perfect for creative professionals and tourists. Features exposed brick walls, high ceilings, and modern amenities in London\'s most vibrant neighborhood.',
      location: {
        area: 'Shoreditch',
        city: 'London',
        postcode: 'E1 6QE',
        coordinates: { lat: 51.5223, lng: -0.0784 }
      },
      pricing: { basePrice: 120, currency: 'GBP', cleaningFee: 25 },
      capacity: { maxGuests: 4, bedrooms: 2, bathrooms: 1 },
      amenities: ['WiFi', 'Kitchen', 'Workspace', 'Heating', 'TV', 'Coffee Machine', 'Iron'],
      images: ['/images/properties/shoreditch-loft-1.jpg', '/images/properties/shoreditch-loft-2.jpg']
    },
    'camden-market-flat': {
      description: 'Cozy flat steps away from the famous Camden Market. Ideal for travelers who want to experience London\'s alternative culture, music venues, and diverse food scene.',
      location: {
        area: 'Camden',
        city: 'London', 
        postcode: 'NW1 8QP',
        coordinates: { lat: 51.5414, lng: -0.1471 }
      },
      pricing: { basePrice: 95, currency: 'GBP', cleaningFee: 20 },
      capacity: { maxGuests: 3, bedrooms: 1, bathrooms: 1 },
      amenities: ['WiFi', 'Kitchen', 'Heating', 'TV', 'Markets nearby', 'Public Transport'],
      images: ['/images/properties/camden-market-1.jpg', '/images/properties/camden-market-2.jpg']
    },
    'kensington-studio': {
      description: 'Elegant studio apartment in prestigious Kensington, offering luxury and convenience. Walking distance to Hyde Park, museums, and upscale shopping districts.',
      location: {
        area: 'Kensington',
        city: 'London',
        postcode: 'SW7 2AZ',
        coordinates: { lat: 51.4994, lng: -0.1746 }
      },
      pricing: { basePrice: 85, currency: 'GBP', cleaningFee: 15 },
      capacity: { maxGuests: 2, bedrooms: 1, bathrooms: 1 },
      amenities: ['WiFi', 'Kitchenette', 'Heating', 'TV', 'Concierge', 'Garden Access'],
      images: ['/images/properties/kensington-studio-1.jpg']
    },
    'soho-theatre-apartment': {
      description: 'Vibrant apartment in the heart of Soho\'s theatre district. Perfect for culture enthusiasts with easy access to West End shows, restaurants, and nightlife.',
      location: {
        area: 'Soho',
        city: 'London',
        postcode: 'W1D 4HS', 
        coordinates: { lat: 51.5142, lng: -0.1336 }
      },
      pricing: { basePrice: 110, currency: 'GBP', cleaningFee: 30 },
      capacity: { maxGuests: 4, bedrooms: 2, bathrooms: 1 },
      amenities: ['WiFi', 'Kitchen', 'Heating', 'TV', 'Theatre nearby', 'Restaurants', 'Nightlife'],
      images: ['/images/properties/soho-apartment-1.jpg']
    }
  };

  const config = propertyConfig[slug] || {};
  
  return {
    slug,
    name: listingName,
    description: config.description || `Beautiful property in London offering comfortable accommodation with modern amenities.`,
    location: config.location || {
      area: 'Central London',
      city: 'London',
      postcode: 'W1A 0AX',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    pricing: config.pricing || { basePrice: 100, currency: 'GBP', cleaningFee: 20 },
    capacity: config.capacity || { maxGuests: 2, bedrooms: 1, bathrooms: 1 },
    amenities: config.amenities || ['WiFi', 'Kitchen', 'Heating', 'TV'],
    images: config.images || ['/images/placeholder-property.jpg'],
    checkInOut: {
      checkIn: '15:00',
      checkOut: '11:00'
    },
    policies: {
      smoking: false,
      pets: false,
      parties: false
    }
  }; 
}

export function getAllPropertySlugs(propertyNames: string[]): string[] {
  return propertyNames.map(name => slugify(name));
}
