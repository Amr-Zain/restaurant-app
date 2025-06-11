import { Marker, useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { FieldValues, Path, PathValue, useForm } from "react-hook-form";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};

const defaultCenter = {
  lat: 31.2001,
  lng: 29.9187,
};

const GoogleMapComponent = <TFormValues extends FieldValues>({
  form,
  isOpen,
}: {
  isOpen: boolean;
  form: ReturnType<typeof useForm<TFormValues>>;
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>(defaultCenter);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          setSelectedPosition(location);
          form.setValue(
            "lat" as Path<TFormValues>,
            location.lat.toString() as PathValue<
              TFormValues,
              Path<TFormValues>
            >,
          );
          form.setValue(
            "lng" as Path<TFormValues>,
            location.lng.toString() as PathValue<
              TFormValues,
              Path<TFormValues>
            >,
          );
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsGettingLocation(false);
        },
      );
    }
  }, [form, isOpen]);

  const onMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });
      form.setValue(
        "lat" as Path<TFormValues>,
        lat.toString() as PathValue<TFormValues, Path<TFormValues>>,
      );
      form.setValue(
        "lng" as Path<TFormValues>,
        lng.toString() as PathValue<TFormValues, Path<TFormValues>>,
      );
    }
  };
  if (!isLoaded) {
    return null;
  }

  return (
    <div className="space-y-2">
      {isGettingLocation && (
        <p className="text-sm text-gray-600">
          Getting your current location...
        </p>
      )}
      <div className="overflow-hidden rounded-lg border">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={15}
          onClick={onMapClick}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {selectedPosition && (
            <Marker
              position={selectedPosition}
              icon={{
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#4F46E5"/>
                            </svg>
                          `),
                scaledSize: new window.google.maps.Size(30, 30),
                anchor: new window.google.maps.Point(15, 30),
              }}
            />
          )}
        </GoogleMap>
      </div>
      {selectedPosition && (
        <p className="text-xs text-gray-600">
          Selected: {selectedPosition.lat.toFixed(6)},{" "}
          {selectedPosition.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default GoogleMapComponent;
