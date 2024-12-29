// 'use client';
// import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { icon } from 'leaflet';
// const iconUrl =
//   'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
// const markerIcon = icon({
//   iconUrl: iconUrl,
//   iconSize: [20, 30],
// });

// import { findCountryByCode } from '@/utils/countries';
// import CountryFlagAndName from '../card/CountryFlagAndName';
// import Title from './Title';

// function PropertyMap({ countryCode }: { countryCode: string }) {
//   const defaultLocation = [51.505, -0.09] as [number, number];
//   const location = findCountryByCode(countryCode)?.location as [number, number];

//   return (
//     <div className='mt-4'>
//       <div className='mb-4 '>
//         <Title text='Where you will be staying' />
//         <CountryFlagAndName countryCode={countryCode} />
//       </div>
//       <MapContainer
//         scrollWheelZoom={false}
//         zoomControl={false}
//         className='h-[50vh] rounded-lg relative z-0'
//         center={location || defaultLocation}
//         zoom={7}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />
//         <ZoomControl position='bottomright' />
//         <Marker
//           position={location || defaultLocation}
//           icon={markerIcon}
//         ></Marker>
//       </MapContainer>
//     </div>
//   );
// }
// export default PropertyMap;


'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { icon, Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

import { findCountryByCode } from '@/utils/countries';
import CountryFlagAndName from '../card/CountryFlagAndName';
import Title from './Title';

function PropertyMap({ countryCode }: { countryCode: string }) {
  const defaultLocation: [number, number] = [51.505, -0.09];
  const location = findCountryByCode(countryCode)?.location || defaultLocation;

  // Reference for Leaflet Map instance
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove(); // Explicitly remove Leaflet map
        leafletMapRef.current = null; // Reset the reference
      }
    };
  }, []);

  return (
    <div className="mt-4" ref={mapRef}>
      <div className="mb-4">
        <Title text="Where you will be staying" />
        <CountryFlagAndName countryCode={countryCode} />
      </div>
      <MapContainer
        center={location}
        zoom={7}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-[50vh] rounded-lg relative z-0"
        whenReady={(mapInstance) => {
          leafletMapRef.current = mapInstance.target; // Capture map instance
        }}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Marker position={location} icon={markerIcon} />
      </MapContainer>
    </div>
  );
}

export default PropertyMap;
