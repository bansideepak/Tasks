import React from "react";
import {
  Building2,
  Home,
  MapPin,
  Utensils,
  Coffee,
  Beer,
  ShoppingBag,
  Bus,
  Landmark,
  School,
} from "lucide-react";

const LocationCard = ({
  location,
  selected,
  onClick,
  showDistance = false,
}) => {
  // Choose icon based on the type of location
  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "residential":
      case "house":
      case "apartment":
        return <Home size={16} />;
      case "commercial":
      case "office":
      case "retail":
        return <Building2 size={16} />;
      case "restaurant":
        return <Utensils size={16} />;
      case "cafe":
        return <Coffee size={16} />;
      case "bar":
      case "pub":
        return <Beer size={16} />;
      case "fast_food":
        return <Utensils size={16} />;
      case "shop":
      case "supermarket":
        return <ShoppingBag size={16} />;
      case "bus_stop":
      case "bus_station":
        return <Bus size={16} />;
      case "school":
      case "university":
      case "college":
        return <School size={16} />;
      case "tourism":
      case "attraction":
      case "monument":
        return <Landmark size={16} />;
      default:
        return <MapPin size={16} />;
    }
  };

  const placeName = location.name || location.display_name.split(",")[0];
  const placeType = location.type || "location";

  return (
    <div
      className={`location-card ${selected ? "selected" : ""}`}
      onClick={() => onClick(location)}
    >
      <h3 className="location-card-title">{placeName}</h3>
      <p className="location-card-subtitle">{location.display_name}</p>

      <div className="location-card-footer">
        <div className="location-card-type">
          {getIcon(placeType)}
          <span className="capitalize">{placeType}</span>
        </div>

        {showDistance && location.distance && (
          <div className="location-card-distance">
            {location.distance < 1
              ? `${Math.round(location.distance * 1000)}m away`
              : `${location.distance.toFixed(1)}km away`}
          </div>
        )}
      </div>

      {location.additionalInfo && location.additionalInfo.length > 0 && (
        <div className="location-card-details">
          {location.additionalInfo.map((info, index) => (
            <p key={index} className="location-detail-item">
              {info}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationCard;
