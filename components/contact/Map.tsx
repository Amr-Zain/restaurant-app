"use client";

import React, { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import { Loader2 } from "lucide-react";

interface Location {
  id: number;
  name: string;
  address: string;
  position: { lat: number; lng: number };
}

interface MapProps {
  locations: Location[];
}

const HospitalMap: React.FC<MapProps> = ({ locations }) => {
  const libraries = () => ["places"];

  const mapCenter = useMemo(() => {
    if (locations.length === 0) return { lat: 37.7749, lng: -122.4194 };

    const latSum = locations.reduce((sum, loc) => sum + loc.position.lat, 0);
    const lngSum = locations.reduce((sum, loc) => sum + loc.position.lng, 0);
    return {
      lat: latSum / locations.length,
      lng: lngSum / locations.length,
    };
  }, [locations]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      scrollwheel: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#1a3d7c" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#1a3d7c" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#1a3d7c" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#e0f2e9" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "road",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#c9d6df" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#a2d2ff" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#1a3d7c" }],
        },
      ],
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-4">
      <div className="mt-4 h-[500px] overflow-hidden rounded-xl border border-gray-200 shadow-lg">
        <GoogleMap
          options={mapOptions}
          zoom={locations.length === 1 ? 14 : 11}
          center={mapCenter}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {locations.map((store) => (
            <Marker
              key={store.id}
              position={store.position}
              label={{
                text: store.name,
                color: "#1a3d7c",
                fontSize: "12px",
                fontWeight: "bold",
                className: "map-marker-label",
              }}
              title={store.address}
              icon={{
                path: "M28.8422 4.88597C26.5027 2.54117 23.5198 0.943706 20.2715 0.296043C17.0232 -0.351621 13.6557 -0.0203228 10.5959 1.24795C7.53605 2.51621 4.92163 4.66435 3.08399 7.4201C1.24635 10.1758 0.268224 13.4151 0.273577 16.7274C0.264557 18.9262 0.691731 21.1049 1.53038 23.1375C2.36902 25.1701 3.60248 27.0162 5.15936 28.5689L16.3007 39.7102C16.3926 39.8021 16.5018 39.8751 16.6219 39.9248C16.742 39.9746 16.8707 40.0002 17.0008 40.0002C17.1308 40.0002 17.2595 39.9746 17.3796 39.9248C17.4998 39.8751 17.6089 39.8021 17.7008 39.7102L28.8422 28.5689C31.9714 25.4223 33.728 21.1651 33.728 16.7274C33.728 12.2898 31.9714 8.0325 28.8422 4.88597ZM17.0008 27.3366C11.0937 27.3366 6.28803 22.5308 6.28803 16.6238C6.28803 10.7167 11.0937 5.91097 17.0008 5.91097C22.9078 5.91097 27.7136 10.7167 27.7136 16.6238C27.7136 22.5309 22.9078 27.3366 17.0008 27.3366ZM25.7333 16.6238C25.7333 18.3509 25.221 20.0392 24.2614 21.4752C23.3019 22.9112 21.938 24.0305 20.3423 24.6914C18.7466 25.3522 16.9908 25.5251 15.2969 25.1881C13.603 24.8511 12.047 24.0194 10.8258 22.7981C9.60453 21.5768 8.77287 20.0208 8.43595 18.3269C8.09903 16.6329 8.27199 14.8771 8.93295 13.2815C9.59391 11.6858 10.7132 10.322 12.1492 9.36249C13.5853 8.40296 15.2736 7.89081 17.0008 7.89081C19.3161 7.89336 21.5358 8.81426 23.173 10.4515C24.8101 12.0887 25.7309 14.3085 25.7333 16.6238Z",
                fillColor: "#5A6AE8",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
                scale: 1,
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default HospitalMap;