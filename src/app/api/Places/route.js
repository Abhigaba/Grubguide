// src/app/api/places/route.js

import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const radius = searchParams.get('radius');
  const keyword = searchParams.get('keyword');
  const minrating = searchParams.get('minrating');
 
  const params = {
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    location,
    radius,
    type: 'restaurant',
    keyword,
    minrating
  };

  try {
    
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', { params });
    const places = response.data.results.filter(place => place.rating >= parseFloat(minrating));
    return new Response(JSON.stringify({ results: places }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data from Google Places API' }), { status: 500 });
  }
}
