/**
 * Application constants - separated for easy maintenance
 */
export const APP_CONFIG = {
  COMPANY_NAME: 'Flex Living',
  DEFAULT_RATING_SCALE: 10, // Hostaway uses 10-point scale
  DISPLAY_RATING_SCALE: 5,  // Display as 5-star system
} as const;

export const FILTER_OPTIONS = {
  CHANNELS: ['Airbnb', 'Booking.com', 'Direct Booking'], // Hardcode here since not in API
  TIME_PERIODS: [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' }
  ],
  RATINGS: [1, 2, 3, 4, 5]
} as const;
