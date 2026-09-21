import { siteConfig } from '@/lib/site-config';

type GoogleReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  rating?: number;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
};

type GooglePlace = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GoogleReview[];
};

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID || siteConfig.googlePlaceId;

  if (!apiKey || !placeId || placeId.startsWith('[')) {
    return Response.json({ status: 'unconfigured', reviews: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews',
      },
    });

    if (!response.ok) {
      console.error(`Google Places request failed with status ${response.status}`);
      return Response.json({ status: 'error', reviews: [] }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }

    const place = await response.json() as GooglePlace;
    const reviews = (place.reviews ?? [])
      .filter((review) => review.text?.text && review.authorAttribution?.displayName && review.googleMapsUri && typeof review.rating === 'number')
      .map((review, index) => ({
        id: review.name || `${placeId}-${index}`,
        authorName: review.authorAttribution?.displayName || 'Google reviewer',
        authorUri: review.authorAttribution?.uri,
        authorPhotoUri: review.authorAttribution?.photoUri,
        rating: review.rating || 0,
        relativeTime: review.relativePublishTimeDescription || '',
        text: review.text?.text || '',
        googleMapsUri: review.googleMapsUri || place.googleMapsUri || siteConfig.googleProfileUrl,
      }));

    return Response.json({
      status: 'ready',
      placeName: place.displayName?.text || siteConfig.name,
      rating: place.rating,
      reviewCount: place.userRatingCount,
      googleMapsUri: place.googleMapsUri || siteConfig.googleProfileUrl,
      reviews,
    }, { headers: cacheHeaders });
  } catch (error) {
    console.error('Google Places request could not be completed', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ status: 'error', reviews: [] }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
