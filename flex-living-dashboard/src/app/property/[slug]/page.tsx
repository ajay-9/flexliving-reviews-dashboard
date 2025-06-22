"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PropertyStats } from '@/types/dashboard';
import { NormalizedReview } from '@/types/api';
import { PropertyDisplayData } from '@/types/property';
import { PropertyGallery } from '../../components/property/PropertyGallery';
import { PropertyHeader } from '../../components/property/PropertyHeader';
import { PropertyBooking } from '../../components/property/PropertyBooking';
import { PropertyAmenities } from '../../components/property/PropertyAmenities';
import { PropertyReviews } from '../../components/property/PropertyReviews';
import { Breadcrumbs } from '../../components/property/Breadcrumbs';
import { Loader } from '../../components/shared/ui/Loader';
import { getPropertyAssets } from '@/config/propertyAssets'
import { groupReviewsByProperty } from '@/utils/reviewHelpers';
import { slugify } from '@/utils/slugify';

/**
 * Public property display page
 * Shows property details and approved reviews only
 * Follows Flex Living design as per assessment
 */
export default function PropertyPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<PropertyDisplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/api/reviews/hostaway');
        const data = await response.json();
        
        if (data.status === 'success') {
          const reviews = data.data.reviews as NormalizedReview[];
          const properties = groupReviewsByProperty(reviews);
          
          // Find property by slug
          const foundProperty = properties.find(p => slugify(p.name) === slug);
          
          if (foundProperty) {
            // Get static assets for this property
            const assets = getPropertyAssets(foundProperty.name);
            
            // Convert to display format with approved reviews only
            const approvedReviews = foundProperty.reviews.filter(r => r.approved);
            
            const propertyDisplay: PropertyDisplayData = {
              name: foundProperty.name,
              slug: slug as string,
              assets,
              reviews: approvedReviews,
              averageRating: foundProperty.averageRating,
              categoryAverages: foundProperty.categoryAverages,
              totalApprovedReviews: approvedReviews.length
            };
            
            setProperty(propertyDisplay);
          } else {
            setError('Property not found');
          }
        } else {
          setError('Failed to load property data');
        }
      } catch (error) {
        console.error('Failed to fetch property:', error);
        setError('Network error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h1>
          <p className="text-gray-600">{error || 'The requested property could not be found.'}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'London Properties', href: '#' },
    { label: property.assets.location.area },
    { label: property.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation back to dashboard */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
            Flex Living
          </Link>
          <div className="text-xl font-semibold text-gray-800">
            Property Details
          </div>
          <Link 
            href="/" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Manage Reviews
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        <PropertyHeader 
          property={property}
          averageRating={property.averageRating}
          totalReviews={property.totalApprovedReviews}
        />

        <div className="mb-8">
          <PropertyGallery 
            images={property.assets.images}
            propertyName={property.name}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyAmenities amenities={property.assets.amenities} />
            <PropertyReviews property={property} />
          </div>
          
          <div className="lg:col-span-1">
            <PropertyBooking 
              property={property}
              averageRating={property.averageRating}
              totalReviews={property.totalApprovedReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
