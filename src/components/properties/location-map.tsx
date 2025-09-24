'use client';

import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';


const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';


const LONDON_CENTER = {
  lat: 51.5074,
  lng: -0.1278
};


const PROPERTY_LOCATION = {
  lat: 51.5456,
  lng: -0.0025
};


const MapComponent = ({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | undefined>();

  useEffect(() => {
    if (ref.current && !map && typeof window !== 'undefined' && window.google) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#E5E3DF'
              }
            ]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#c9c9c9'
              }
            ]
          },
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off'
              }
            ]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_BOTTOM
        }
      });

      
      new window.google.maps.Marker({
        position: PROPERTY_LOCATION,
        map: newMap,
        title: 'Property Location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 20,
          fillColor: '#284E4C',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        },
        label: {
          text: '2',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 'bold'
        }
      });

      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  return <div ref={ref} className="w-full h-96 rounded-lg" />;
};


const FallbackMapComponent = () => (
  <div className="w-full h-96 rounded-lg relative overflow-hidden" style={{ backgroundColor: '#E5E3DF' }}>
 
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-8 left-8 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-12 left-16 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-16 left-12 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      <div className="absolute top-20 left-20 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-24 left-24 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-28 left-28 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-32 left-32 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      <div className="absolute top-36 left-36 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-40 left-40 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-44 left-44 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-48 left-48 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      <div className="absolute top-52 left-52 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-56 left-56 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-60 left-60 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-64 left-64 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      <div className="absolute top-68 left-68 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-72 left-72 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-76 left-76 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-80 left-80 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
      <div className="absolute top-84 left-84 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-88 left-88 w-2 h-2 bg-gray-400 rounded-full"></div>
      <div className="absolute top-92 left-92 w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="absolute top-96 left-96 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
    </div>
    

    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 opacity-30"></div>
    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 opacity-30"></div>
    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-300 opacity-20"></div>
    <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-300 opacity-20"></div>
    <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-gray-300 opacity-20"></div>
    <div className="absolute top-0 bottom-0 left-3/4 w-0.5 bg-gray-300 opacity-20"></div>

    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center" style={{ backgroundColor: '#284E4C' }}>
        <span className="text-white text-sm font-bold">2</span>
      </div>
    </div>
    
  
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
      <div className="text-sm text-gray-700">
        <div className="font-medium">Hackney Stratford</div>
        <div className="text-xs text-gray-500">London, UK</div>
      </div>
    </div>
 

    <div className="absolute bottom-4 left-4 flex flex-col space-y-1">
      <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
        <span className="text-lg">+</span>
      </button>
      <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50">
        <span className="text-lg">−</span>
      </button>
    </div>
    
   
    <div className="absolute bottom-4 left-12 text-xs text-gray-500">
      Google
    </div>
  </div>
);


const LoadingComponent = () => (
  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Loading map...</div>
  </div>
);


const ErrorComponent = () => (
  <div className="w-full h-96 bg-red-100 rounded-lg flex items-center justify-center">
    <div className="text-red-500">Error loading map</div>
  </div>
);


const LocationMap = () => {
  const [mapCenter] = useState(LONDON_CENTER);
  const [mapZoom] = useState(11);

  const render = useCallback((status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <LoadingComponent />;
      case Status.FAILURE:
        return <ErrorComponent />;
      case Status.SUCCESS:
        return <MapComponent center={mapCenter} zoom={mapZoom} />;
    }
  }, [mapCenter, mapZoom]);


  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-lg text-card-foreground p-6 mb-8 bg-white border-0 shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
          Location
        </h2>
        
        <div className="relative">
          <FallbackMapComponent />
        </div>

   
        <div className="mt-2 text-xs text-gray-500 text-right">
          Map data ©2025 Google
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="rounded-lg text-card-foreground p-6 mb-8 bg-white border-0 shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
        Location
      </h2>
      
      <div className="relative">
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} />
        
 
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <div className="text-sm text-gray-700">
            <div className="font-medium">Hackney Stratford</div>
            <div className="text-xs text-gray-500">London, UK</div>
          </div>
        </div>
      </div>

      
      <div className="mt-2 text-xs text-gray-500 text-right">
        Map data ©2025 Google
      </div>
    </motion.div>
  );
};

export default LocationMap;