import { useState, useEffect } from "react";

const useGeocoding = () => {
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [selectedAmenityType, setSelectedAmenityType] = useState("all");

  const searchLocations = async (query) => {
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=1`,
        {
          headers: {
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "LocationFinderApp/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const data = await response.json();

      const formattedResults = data.map((place) => ({
        id: place.place_id,
        name: place.name || place.display_name.split(",")[0],
        display_name: place.display_name,
        latitude: parseFloat(place.lat),
        longitude: parseFloat(place.lon),
        type: place.type,
        address: place.address,
      }));

      setResults(formattedResults);

      if (formattedResults.length > 0) {
        setSelectedLocation(formattedResults[0]);
        fetchNearbyPlaces(formattedResults[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyPlaces = async (location) => {
    if (!location) return;

    setNearbyLoading(true);

    try {
      const radius = 2000; // 2km radius
      const query = `
        [out:json];
        (
          // Food & Drink
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="restaurant"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="cafe"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="fast_food"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="bar"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="pub"];
          
          // Shopping
          node(around:${radius},${location.latitude},${location.longitude})["shop"="supermarket"];
          node(around:${radius},${location.latitude},${location.longitude})["shop"="mall"];
          node(around:${radius},${location.latitude},${location.longitude})["shop"="convenience"];
          
          // Entertainment & Leisure
          node(around:${radius},${location.latitude},${location.longitude})["leisure"="park"];
          node(around:${radius},${location.latitude},${location.longitude})["tourism"="museum"];
          node(around:${radius},${location.latitude},${location.longitude})["tourism"="attraction"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="cinema"];
          
          // Services
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="bank"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="atm"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="pharmacy"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="hospital"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="fuel"];
          
          // Transportation
          node(around:${radius},${location.latitude},${location.longitude})["public_transport"="station"];
          node(around:${radius},${location.latitude},${location.longitude})["amenity"="parking"];
        );
        out body;
      `;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch nearby places");
      }

      const data = await response.json();

      const formattedNearbyPlaces = data.elements.map((place) => {
        // Determine the category based on tags
        let category = "";
        if (
          place.tags.amenity &&
          ["restaurant", "cafe", "fast_food", "bar", "pub"].includes(
            place.tags.amenity
          )
        ) {
          category = "dining";
        } else if (place.tags.shop) {
          category = "shopping";
        } else if (
          place.tags.tourism ||
          place.tags.leisure ||
          place.tags.amenity === "cinema"
        ) {
          category = "entertainment";
        } else if (
          ["bank", "atm", "pharmacy", "hospital", "fuel"].includes(
            place.tags.amenity
          )
        ) {
          category = "services";
        } else if (
          place.tags.public_transport ||
          place.tags.amenity === "parking"
        ) {
          category = "transportation";
        }

        // Get the appropriate type
        let type =
          place.tags.amenity ||
          place.tags.shop ||
          place.tags.tourism ||
          place.tags.leisure ||
          place.tags.public_transport ||
          "place";

        // Create a more descriptive name if available
        let displayName = place.tags.name || type;

        // additional relevant information
        const additionalInfo = [];
        if (place.tags.cuisine) {
          additionalInfo.push(
            `Cuisine: ${place.tags.cuisine.replace(";", ", ")}`
          );
        }
        if (place.tags.opening_hours) {
          additionalInfo.push(`Hours: ${place.tags.opening_hours}`);
        }
        if (place.tags.phone) {
          additionalInfo.push(`Phone: ${place.tags.phone}`);
        }
        if (place.tags.website) {
          additionalInfo.push(`Website: ${place.tags.website}`);
        }

        return {
          id: place.id,
          name: place.tags.name || capitalize(type),
          display_name: `${displayName}, near ${location.name}`,
          full_address: place.tags["addr:street"]
            ? `${place.tags["addr:housenumber"] || ""} ${
                place.tags["addr:street"]
              }, ${place.tags["addr:city"] || ""}`
            : null,
          latitude: place.lat,
          longitude: place.lon,
          type: type,
          category: category,
          tags: place.tags,
          additionalInfo: additionalInfo,
          distance: calculateDistance(
            location.latitude,
            location.longitude,
            place.lat,
            place.lon
          ),
        };
      });

      // Sort by distance
      formattedNearbyPlaces.sort((a, b) => a.distance - b.distance);

      setNearbyPlaces(formattedNearbyPlaces);
    } catch (err) {
      console.error("Error fetching nearby places:", err);
    } finally {
      setNearbyLoading(false);
    }
  };

  // Helper function to capitalize first letter
  const capitalize = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ");
  };

  // Helper function to calculate distance in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Filter nearby places by category
  const getFilteredNearbyPlaces = () => {
    if (selectedAmenityType === "all") {
      return nearbyPlaces;
    }
    return nearbyPlaces.filter(
      (place) => place.category === selectedAmenityType
    );
  };

  const getSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setSuggestionsLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=5`,
        {
          headers: {
            "Accept-Language": "en-US,en;q=0.9",
            "User-Agent": "LocationFinderApp/1.0",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();

      const formattedSuggestions = data.map((place) => ({
        id: place.place_id,
        name: place.name || place.display_name.split(",")[0],
        display_name: place.display_name,
      }));

      setSuggestions(formattedSuggestions);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const debouncedGetSuggestions = (query) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      getSuggestions(query);
    }, 300);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return {
    results,
    suggestions,
    selectedLocation,
    setSelectedLocation,
    nearbyPlaces,
    getFilteredNearbyPlaces,
    selectedAmenityType,
    setSelectedAmenityType,
    loading,
    nearbyLoading,
    suggestionsLoading,
    error,
    searchLocations,
    debouncedGetSuggestions,
    fetchNearbyPlaces,
    setSuggestions,
  };
};

export default useGeocoding;
