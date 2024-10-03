import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const GeoLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching geolocation: ", error);
          setError(
            "Unable to retrieve your location. Please check your browser settings and try again."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="geoWrapper flex flex-col items-center justify-center h-screen p-5 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Your Location
      </h2>
      {error ? (
        <p className="text-lg text-center text-red-600">{error}</p>
      ) : location.latitude && location.longitude ? (
        <div>
          <p className="text-lg mb-2 text-center text-gray-600">
            Latitude: {location.latitude.toFixed(6)}, Longitude:{" "}
            {location.longitude.toFixed(6)}
          </p>
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            className="rounded-lg shadow-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>You are here!</Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600">
          Fetching location... Please ensure you've allowed location access.
        </p>
      )}
    </div>
  );
};

export default GeoLocation;
