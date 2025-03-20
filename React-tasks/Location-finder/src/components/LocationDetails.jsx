import React from "react";
import { MapPin } from "lucide-react";

const LocationDetails = ({ location }) => {
  if (!location) return null;

  const placeName = location.name || location.display_name.split(",")[0];

  // Build a Google Maps URL for the view button
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    placeName
  )}`;

  return (
    <div className="details-card">
      <h2 className="details-title">{placeName}</h2>

      <div className="details-section">
        <h3 className="details-label">Full Address</h3>
        <p className="details-value">{location.display_name}</p>
      </div>

      <div className="details-grid">
        <div className="details-section">
          <h3 className="details-label">Latitude</h3>
          <p className="details-value">{location.latitude}</p>
        </div>
        <div className="details-section">
          <h3 className="details-label">Longitude</h3>
          <p className="details-value">{location.longitude}</p>
        </div>
      </div>

      {location.address && (
        <div className="details-section">
          <h3 className="details-label">Address Components</h3>
          <div className="address-components">
            {Object.entries(location.address).map(([key, value]) => (
              <div key={key} className="details-section">
                <h4 className="details-label capitalize">
                  {key.replace("_", " ")}
                </h4>
                <p className="details-value">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="view-place-button"
      >
        <MapPin size={16} />
        View on Google Maps
      </a>
    </div>
  );
};

export default LocationDetails;
