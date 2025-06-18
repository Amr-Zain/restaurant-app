"use client";

import { useAuthStore } from "@/stores/auth";
import { useEffect } from "react";

function Location() {
  const user = useAuthStore((state) => state.user);
  const setLocaion = useAuthStore((state) => state.setLocation);
  useEffect(() => {
    if (!user) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocaion(location);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  });
  return <></>
}

export default Location;
