"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PropertyStats } from "@/types/dashboard";
import { NormalizedReview } from "@/types/api";
import { PropertyDisplayData } from "@/types/property";
import { PropertyGallery } from "../../components/property/PropertyGallery";
import { PropertyHeader } from "@/app/components/property/PropertyHeader";
import { PropertyBooking } from "../../components/property/PropertyBooking";
import { PropertyAmenities } from "../../components/property/PropertyAmenities";
import { PropertyReviews } from "../../components/property/PropertyReviews";
import { Breadcrumbs } from "../../components/property/Breadcrumbs";
import { Loader } from "../../components/shared/ui/Loader";
import { getPropertyAssets } from "@/config/propertyAssets";
import { groupReviewsByProperty } from "@/utils/reviewHelpers";
import { slugify } from "@/utils/slugify";
import { Footer } from "@/app/components/shared/Footer";
import { PropertyStayPolicies } from "@/app/components/property/PropertyStayPolicies";

export default function PropertyPage() {
  const { slug } = useParams();
  const [property, setProperty] = useState<PropertyDisplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch("/api/reviews/hostaway");
        const data = await response.json();

        if (data.status === "success") {
          const reviews = data.data.reviews as NormalizedReview[];
          const reviewsWithDates = reviews.map((review) => ({
            ...review,
            date: new Date(review.date),
          }));

          const properties = groupReviewsByProperty(reviewsWithDates);
          const foundProperty = properties.find(
            (p) => slugify(p.name) === slug
          );

          if (foundProperty) {
            // ✅ Get generic assets (same for all properties)
            const assets = getPropertyAssets(foundProperty.name);
            const approvedReviews = foundProperty.reviews.filter(
              (r) => r.approved
            );

            const propertyDisplay: PropertyDisplayData = {
              name: foundProperty.name,
              slug: slug as string,
              assets, // ✅ Generic assets: images, amenities, pricing, etc.
              reviews: approvedReviews,
              averageRating: foundProperty.averageRating,
              categoryAverages: foundProperty.categoryAverages,
              totalApprovedReviews: approvedReviews.length,
            };

            setProperty(propertyDisplay);
          } else {
            setError("Property not found");
          }
        } else {
          setError("Failed to load property data");
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
        setError("Network error occurred");
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Property not found
          </h1>
          <p className="text-gray-600">
            {error || "The requested property could not be found."}
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Use generic location data from assets
  const breadcrumbItems = [
    { label: "Properties", href: "#" },
    { label: property.assets.location.area }, // ✅ Generic "Area"
    { label: property.name },
  ];

  return (
    <div className="min-h-screen bg-flex-cream">
      {/* Header */}
      <PropertyHeader title={property.name} />

      <div className="pt-[88px]">
        {/* Main Container */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Property Title and Rating */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {property.name}
            </h1>
          </div>

          {/* Gallery - Uses generic images */}
          <PropertyGallery
            images={property.assets.images}
            propertyName={property.name}
          />

          {/* Property Host Section - Uses generic capacity data */}
          <div className="flex items-center justify-between py-6 border-b border-gray-200 mb-8">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Entire property hosted by Flex Living
              </h2>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>{property.assets.capacity.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛏️</span>
                  <span>
                    {property.assets.capacity.bedrooms} bedroom
                    {property.assets.capacity.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚿</span>
                  <span>
                    {property.assets.capacity.bathrooms} bathroom
                    {property.assets.capacity.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛏️</span>
                  <span>2 beds</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About This Property - Uses generic description */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  About this property
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-3">{property.assets.description}</p>
                  <button className="text-black-600 hover:text-blue-800 font-medium">
                    Read more
                  </button>
                </div>
              </div>

              {/* Amenities Section */}
              <PropertyAmenities amenities={property.assets.amenities} />

              {/* Stay Policies Section */}
              <PropertyStayPolicies />

              {/* Guest Reviews Section - Shows actual review data from API */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Guest Reviews</h3>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Manage Reviews →
                  </Link>
                </div>

                {/* Review category scores - From API data */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  {Object.entries(property.categoryAverages)
                    .slice(0, 3)
                    .map(([category, rating]) => (
                      <div key={category} className="text-center">
                        <div className="text-2xl font-bold">{rating}/10</div>
                        <div className="text-sm text-gray-600 capitalize">
                          {category}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Reviews display */}
                {property.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {property.reviews.slice(0, 6).map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                            <span className="font-semibold text-blue-600">
                              {review.guestName.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold">
                                {review.guestName}
                              </span>
                              <div className="flex text-yellow-400 text-sm">
                                ⭐⭐⭐⭐⭐
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {review.publicReview}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="mb-4">No approved reviews to display yet.</p>
                    <Link
                      href="/"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Go to dashboard to approve reviews →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Uses generic pricing */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <PropertyBooking
                  property={property}
                  averageRating={property.averageRating}
                  totalReviews={property.totalApprovedReviews}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
