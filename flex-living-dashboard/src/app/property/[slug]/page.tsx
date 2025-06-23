"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { NormalizedReview } from "@/types/api";
import { PropertyDisplayData } from "@/types/property";
import { PropertyGallery } from "../../components/property/PropertyGallery";
import { PropertyHeader } from "@/app/components/property/PropertyHeader";
import { PropertyBooking } from "../../components/property/PropertyBooking";
import { PropertyAmenities } from "../../components/property/PropertyAmenities";
import { Breadcrumbs } from "../../components/property/Breadcrumbs";
import { Loader } from "../../components/shared/ui/Loader";
import { getPropertyAssets } from "@/config/propertyAssets";
import { groupReviewsByProperty } from "@/utils/reviewHelpers";
import { slugify } from "@/utils/slugify";
import { Footer } from "@/app/components/shared/Footer";
import { PropertyStayPolicies } from "@/app/components/property/PropertyStayPolicies";
import { GoogleReviews } from "@/app/components/property/GoogleReviews";
import { StarRating } from "@/app/components/shared/StarRating";
import { PropertyReviews } from "@/app/components/property/PropertyReviews";

export default function PropertyPage() {
  const { slug } = useParams();

  const [googlePlaceId, setGooglePlaceId] = useState<string | null>(null);
  const [property, setProperty] = useState<PropertyDisplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingPlaceId, setIsFetchingPlaceId] = useState(false);

  // Fetch Google Place ID only for GuestReady properties
  const fetchGooglePlaceId = async (propertyName: string) => {
    try {
      if (isFetchingPlaceId || googlePlaceId) {
        return;
      }

      if (!propertyName.toLowerCase().includes("guestready")) {
        return;
      }

      setIsFetchingPlaceId(true);

      const searchQuery = `${propertyName} London UK`;
      const response = await fetch(
        `/api/places/search?q=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error(`Search API responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success" && data.data.candidates?.[0]?.place_id) {
        const placeId = data.data.candidates[0].place_id;
        setGooglePlaceId(placeId);
      }
    } catch (error) {
      console.error("Failed to fetch Google Place ID:", error);
    } finally {
      setIsFetchingPlaceId(false);
    }
  };

  // Fetch property data and apply approval decisions from localStorage
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Get fresh review data from API
        const response = await fetch("/api/reviews/hostaway");
        const data = await response.json();

        if (data.status === "success") {
          const reviews = data.data.reviews as NormalizedReview[];
          const reviewsWithDates = reviews.map((review) => ({
            ...review,
            date: new Date(review.date),
          }));

          // Apply stored approval decisions from localStorage
          const storedState = localStorage.getItem("review-store");
          let reviewsWithApprovals = reviewsWithDates;

          if (storedState) {
            try {
              const { state } = JSON.parse(storedState);
              const approvalDecisions = state.approvalDecisions || {};

              reviewsWithApprovals = reviewsWithDates.map((review) => {
                const decision = approvalDecisions[review.id];
                if (decision === "approved") {
                  return { ...review, approved: true, rejected: false };
                } else if (decision === "rejected") {
                  return { ...review, approved: false, rejected: true };
                }
                return review;
              });
            } catch (error) {
              console.error("Error parsing stored approval decisions:", error);
            }
          }

          // Group reviews by property and calculate statistics
          const properties = groupReviewsByProperty(reviewsWithApprovals);
          const foundProperty = properties.find(
            (p) => slugify(p.name) === slug
          );

          if (foundProperty) {
            const assets = getPropertyAssets(foundProperty.name);

            // Fetch Google Place ID for eligible properties
            if (!googlePlaceId && !isFetchingPlaceId) {
              await fetchGooglePlaceId(foundProperty.name);
            }

            // Only show approved reviews on public page
            const approvedReviews = foundProperty.reviews.filter(
              (r) => r.approved === true
            );

            const propertyDisplay: PropertyDisplayData = {
              name: foundProperty.name,
              slug: slug as string,
              assets,
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

  const breadcrumbItems = [
    { label: "Properties", href: "#" },
    { label: property.assets.location.area },
    { label: property.name },
  ];

  return (
    <div className="min-h-screen bg-flex-cream">
      <PropertyHeader title={property.name} />

      <div className="pt-[88px]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Image gallery */}
          <PropertyGallery
            images={property.assets.images}
            propertyName={property.name}
          />

          {/* Host information section */}
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
            <div className="w-14 h-14 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-lg ml-6">
              FL
            </div>
          </div>

          {/* Two-column layout: content + booking widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - property details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  About this property
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-3">{property.assets.description}</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read more
                  </button>
                </div>
              </div>

              <PropertyAmenities amenities={property.assets.amenities} />
              <PropertyStayPolicies />
              <PropertyReviews property={property} />

              {/* Google Reviews */}
              {googlePlaceId && (
                <GoogleReviews
                  placeId={googlePlaceId}
                  propertyName={property.name}
                />
              )}
            </div>

            {/* Right column - booking widget */}
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
