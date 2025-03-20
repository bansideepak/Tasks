import React from "react";
import { ExternalLink } from "lucide-react";

const LocationMap = ({ location }) => {
  if (!location) {
    return (
      <div className="map-container">
        <p className="map-placeholder">Select a location to view on map</p>
      </div>
    );
  }

  // The key change is adding a proper zoom level (zoom=12)
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    location.longitude - 0.1
  }%2C${location.latitude - 0.1}%2C${location.longitude + 0.1}%2C${
    location.latitude + 0.1
  }&layer=mapnik&marker=${location.latitude}%2C${location.longitude}&zoom=12`;

  // For the "View in Google Maps" button
  const placeName = encodeURIComponent(
    location.name || location.display_name.split(",")[0]
  );
  const googleMapsViewUrl = `https://www.google.com/maps/search/?api=1&query=${placeName}`;

  return (
    <div className="map-container">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={openStreetMapUrl}
        style={{ border: 0 }}
        title={`Map of ${location.name || "selected location"}`}
        allowFullScreen
      ></iframe>

      <a
        href={googleMapsViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="map-button"
      >
        <ExternalLink size={16} />
        View in Google Maps
      </a>
    </div>
  );
};

export default LocationMap;
