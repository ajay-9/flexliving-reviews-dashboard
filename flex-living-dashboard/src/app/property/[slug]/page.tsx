"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PropertyStats } from '@/types';
import { PropertyHeader } from '../../components/PropertyHeader';
import { PropertyGallery } from '../../components/PropertyGallery';
import { PropertyAmenities } from '../../components/PropertyAmenities';
import { PropertyBooking } from '../../components/PropertyBooking';
import { PropertyReviews } from '../../components/PropertyReviews';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/ui/Loader';
import { MapPin, Users, Bed, Bath } from 'lucide-react';

export default function PropertyPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<PropertyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/api/reviews/hostaway');
        const data = await response.json();
        
        if (data.status === 'success') {
          const properties = data.data.properties as PropertyStats[];
          const foundProperty = properties.find(p => p.slug === slug);
          
          if (foundProperty) {
            // Convert date strings back to Date objects
            const processedProperty = {
              ...foundProperty,
              reviews: foundProperty.reviews.map(review => ({
                ...review,
                date: new Date(review.date)
              }))
            };
            setProperty(processedProperty);
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
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'London Properties', href: '#' },
    { label: property.details.location.area },
    { label: property.name }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        <PropertyHeader 
          property={property.details}
          averageRating={property.averageRating}
          totalReviews={property.approvedReviews}
        />

        <div className="mb-8">
          <PropertyGallery 
            images={property.details.images}
            propertyName={property.name}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Overview */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Entire property hosted by Flex Living
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{property.details.capacity.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{property.details.capacity.bedrooms} bedroom{property.details.capacity.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{property.details.capacity.bathrooms} bathroom{property.details.capacity.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">FL</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {property.details.description}
              </p>
            </Card>

            {/* Amenities */}
            <PropertyAmenities amenities={property.details.amenities} />

            {/* Location */}
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Where you'll be</h3>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} />
                <span className="font-medium">
                  {property.details.location.area}, {property.details.location.city} {property.details.location.postcode}
                </span>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map would be displayed here</span>
              </div>
              <p className="text-gray-600 mt-4">
                Located in the heart of {property.details.location.area}, this property offers easy access to local attractions, restaurants, and transport links.
              </p>
            </Card>

            {/* Reviews Section */}
            <PropertyReviews property={property} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <PropertyBooking 
              property={property.details}
              averageRating={property.averageRating}
              totalReviews={property.approvedReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
