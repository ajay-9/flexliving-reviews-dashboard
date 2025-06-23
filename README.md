# FlexLiving Reviews Dashboard

A modern property management dashboard that enables managers to moderate guest reviews and display approved reviews on public property pages.

## Overview

The FlexLiving Reviews Dashboard is a comprehensive solution for property managers to assess property performance based on guest reviews. It integrates with Hostaway API for review data and includes Google Reviews integration for enhanced property insights.

## Features

-**Property Management Dashboard** - Intuitive interface for review moderation
-**Review Approval System** - Approve/reject reviews for public display
-**Analytics & Insights** - Property performance metrics and trends
-**Advanced Filtering** - Filter by rating, category, channel, and time
-**Google Reviews Integration** - Real-time Google Places API integration
-**Responsive Design** - Modern UI consistent with Flex Living branding

## Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework for production-grade applications
- **TypeScript** - Type-safe development with enhanced IDE support
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Zustand** - Lightweight state management with localStorage persistence
- **Lucide React** - Modern icon library for UI components

### Backend/API
- **Next.js API Routes** - Server-side endpoints with TypeScript support
- **Google Places API** - External integration for location-based review data
- **Hostaway API** - Property management system integration (mocked for assessment)

### Development Tools
- **ESLint** - Code quality and consistency enforcement
- **PostCSS** - CSS processing and optimization

## Installation

1. **Clone the repository**
git clone <repository-url>
cd flexliving-reviews-dashboard


2. **Install dependencies**
npm install


3. **Set up environment variables**
Create a `.env.local` file in the root directory:
- GOOGLE_PLACES_API_KEY=your_google_places_api_key
- HOSTAWAY_API_KEY=your_hostaway_api_key
- HOSTAWAY_ACCOUNT_ID=61148


4. **Run the development server**
npm run dev


5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

### Component Structure
```
 src/
├── app/
│ ├── api/ # Server-side API routes
│ │ ├── places/search/ # Google Places search
│ │ └── reviews/ # Review data endpoints
│ ├── components/
│ │ ├── dashboard/ # Manager interface components
│ │ ├── property/ # Public property page components
│ │ └── shared/ # Reusable UI components
│ └── property/[slug]/ # Dynamic property pages
├── store/ # Zustand state management
├── types/ # TypeScript interfaces
├── utils/ # Helper functions and business logic
└── config/ # Application configuration
```

### Key Design Decisions

#### 1. State Management Strategy
**Decision**: Zustand with localStorage persistence for review approval decisions
// Store approval decisions persistently
approvalDecisions: Record<number, 'approved' | 'rejected'>

#### 2. Review Processing Logic
**Decision**: Separation between raw API data and business logic processing

**Flow**:
1. Fetch raw reviews from Hostaway API
2. Normalize data structure (`NormalizedReview` type)
3. Apply stored approval decisions from localStorage
4. Calculate property statistics from approved reviews only
5. Display results in dashboard and public pages

## API Endpoints

### Hostaway Reviews API
- **Endpoint**: `/api/reviews/hostaway`
- **Method**: GET
- **Description**: Fetches and normalizes review data from Hostaway API with mock fallback
- **Features**:
  - caching to reduce API calls
  - Rate limiting 
  - Graceful fallback to mock data for assessment demonstration

### Google Places Search API
- **Endpoint**: `/api/places/search`
- **Method**: GET
- **Parameters**: `q` (search query)
- **Description**: Finds Google Place ID for properties
- **Features**:
  - caching for stable location data
  - Rate limiting to prevent quota exhaustion

### Google Reviews API
- **Endpoint**: `/api/reviews/google`
- **Method**: GET
- **Parameters**: `placeId` (Google Place ID)
- **Description**: Fetches reviews from Google Places API
- **Features**:
  - caching for review content stability
  - Limited to 5 most recent reviews for performance
  - Cost-conscious API management

  -  - NOTE !!! - I have implemented GOOGLE REVIEWS ONLY FOR ONE PLACE. JUST TO SHOW IMPLEMENTATION AND TO SAVE API CALL COST.

## Google Reviews Integration

### Implementation Success
✅ **Successfully Integrated**: Google Places API integration functional
- Real-time fetching of GuestReady London reviews (4.7/5 rating, 1,061 total reviews)
- Dynamic Place ID lookup based on property names
- Proper review normalization and display

### Technical Approach
1. **Places Search**: Find Place ID using property name + location
2. **Places Details**: Fetch reviews using Place ID
3. **Component Integration**: Display alongside Hostaway reviews with clear separation

### API Configuration
**Key Finding**: Google API keys with website restrictions cannot be used for server-side calls
- **Solution Applied**: Removed all API key restrictions for server-side compatibility
- **Production Recommendation**: Use IP-based restrictions instead of HTTP referrer restrictions

## Development

### Key Files
- `src/store/reviewStore.ts` - Main state management with persistence
- `src/utils/reviewHelpers.ts` - Business logic for review processing
- `src/app/api/reviews/hostaway/route.ts` - Hostaway API integration
- `src/app/api/reviews/google/route.ts` - Google Reviews API integration
- `src/app/property/[slug]/page.tsx` - Dynamic property pages

### Testing the API Routes
Test Hostaway reviews endpoint
curl http://localhost:3000/api/reviews/hostaway

Test Google Places search
curl "http://localhost:3000/api/places/search?q=GuestReady%20London"

Test Google Reviews
curl "http://localhost:3000/api/reviews/google?placeId=PLACE_ID"

## License

This project is developed as part of the Flex Living assessment.
