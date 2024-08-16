import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useRContext } from '../contexts/useRContext';
import { useBuisness } from '../contexts/useBuisness';
import MarkSelected from './MarkSelected';
import { usePlaces } from '../contexts/usePlaces';
import { useMap } from '../contexts/useMapContext';
const containerStyle = {
    width: '100%',
    height: '100%' 
  };


const center = {
    lat: -3.745,
    lng: -38.523
  };

  const options = {
    scrollwheel: false, 
  };

  const Map = () => {

    const {location,setloc} = useRContext()
    const { map, setMap } = useMap();
    const {selectedPlace} = useBuisness()
    const {places} = usePlaces()

    
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
          navigator.geolocation.getCurrentPosition(function (position) {
            const { latitude, longitude } = position.coords;
            setloc({ lat: latitude, lng: longitude })
            console.log(latitude, longitude)
          }, function (e) {
              return 
          }, {
              enableHighAccuracy: true
          });
          }
        }
      , [])

        useEffect(() => {
          if (map && selectedPlace.geometry) {
            map.panTo(selectedPlace.geometry.location)
          }
        },[selectedPlace])

    return (
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
         mapContainerStyle={containerStyle}
          center={location}
          options={options}
          zoom={17}
          className="outline-none"
          onLoad={map => setMap(map)}
        >
            <Marker position={location}
            icon={{
              url: "./user-location.png",
              scaledSize: {
                width:50,
                height: 50
              }
            }} />
            {places.map((n, index) => 
                  
            (<div key={index}>
            <MarkSelected place={n}></MarkSelected></div>))}
        </GoogleMap>
      </LoadScript>
    );
  }

export default Map;