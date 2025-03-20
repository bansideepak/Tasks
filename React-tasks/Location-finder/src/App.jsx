import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import LocationCard from "./components/LocationCard";
import LocationMap from "./components/LocationMap";
import LocationDetails from "./components/LocationDetails";
import Spinner from "./components/Spinner";
import useGeocoding from "./hooks/useGeocoding";
import { ArrowLeft } from "lucide-react";

function App() {
  const {
    results,
    suggestions,
    selectedLocation,
    setSelectedLocation,
    nearbyPlaces,
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
  } = useGeocoding();

  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile && showDetails) {
        setShowDetails(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showDetails]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);

    if (isMobile) {
      setShowDetails(true);
    }
  };
  const handleBackToResults = () => {
    setShowDetails(false);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSelectedLocation(suggestion);
    searchLocations(suggestion.display_name);

    if (isMobile) {
      setShowDetails(true);
    }
  };

  const filteredPlaces =
    selectedAmenityType === "all"
      ? nearbyPlaces
      : nearbyPlaces.filter((place) => place.category === selectedAmenityType);

  const categoryButtons = [
    { id: "all", label: "All" },
    { id: "dining", label: "Dining" },
    { id: "shopping", label: "Shopping" },
    { id: "entertainment", label: "Entertainment" },
    { id: "services", label: "Services" },
    { id: "transportation", label: "Transportation" },
  ];

  return (
    <ThemeProvider>
      <div className="app-layout">
        <Header />

        <main className="main-content">
          <div className="container">
            <div className="mb-8">
              <SearchBar
                onSearch={searchLocations}
                loading={loading}
                suggestions={suggestions || []}
                onTyping={debouncedGetSuggestions}
                suggestionsLoading={suggestionsLoading}
                onSelectSuggestion={handleSuggestionSelect}
                clearSuggestions={() => setSuggestions([])}
              />
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {showDetails && isMobile && (
              <button
                onClick={handleBackToResults}
                className="back-button mb-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-2)",
                  background: "none",
                  border: "none",
                  color: "var(--color-primary)",
                  cursor: "pointer",
                  padding: "var(--spacing-2) 0",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                <ArrowLeft size={16} />
                Back to Results
              </button>
            )}

            <div className="grid-results-details">
              <div className={showDetails && isMobile ? "hidden" : ""}>
                <h2 className="results-title">Search Results</h2>

                <div className="results-container">
                  {loading ? (
                    <div className="flex-center py-8">
                      <Spinner size="lg" />
                    </div>
                  ) : (
                    <>
                      {/* Main search result */}
                      {results.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-gray-500 mb-2">
                            Main Location
                          </h3>
                          {results.map((location) => (
                            <LocationCard
                              key={
                                location.id ||
                                `${location.latitude}-${location.longitude}`
                              }
                              location={location}
                              isSelected={selectedLocation?.id === location.id}
                              onClick={handleLocationSelect}
                            />
                          ))}
                        </div>
                      )}

                      {results.length > 0 && (
                        <div
                          className="category-filters"
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            margin: "1rem 0",
                          }}
                        >
                          {categoryButtons.map((category, index) => (
                            <button
                              key={category.id}
                              style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "1.25rem",
                                backgroundColor:
                                  selectedAmenityType === category.id
                                    ? "var(--color-primary)"
                                    : "var(--color-background-secondary)",
                                color:
                                  selectedAmenityType === category.id
                                    ? "white"
                                    : "var(--color-text-primary)",
                                border: "1px solid var(--color-border)",
                                cursor: "pointer",
                                fontWeight:
                                  selectedAmenityType === category.id
                                    ? "600"
                                    : "400",
                                fontSize: "0.875rem",
                                transition: "all 0.2s ease",
                                minWidth: "80px",
                                textAlign: "center",
                              }}
                              onClick={() =>
                                setSelectedAmenityType(category.id)
                              }
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Nearby places */}
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Nearby Places
                        </h3>

                        {nearbyLoading ? (
                          <div className="flex-center py-4">
                            <Spinner size="md" />
                          </div>
                        ) : nearbyPlaces.length > 0 ? (
                          <div className="space-y-3">
                            {filteredPlaces.map((place) => (
                              <LocationCard
                                key={place.id}
                                location={place}
                                selected={selectedLocation?.id === place.id}
                                onClick={handleLocationSelect}
                                showDistance={true}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 py-2">
                            {selectedLocation
                              ? "No nearby places found"
                              : "Search for a location to see nearby places"}
                          </p>
                        )}
                      </div>

                      {results.length === 0 && nearbyPlaces.length === 0 && (
                        <p className="results-empty">
                          No locations found. Try searching for a place.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Map and Details Column */}
              <div
                className={`space-y-6 ${
                  !showDetails && isMobile && results.length > 0 ? "hidden" : ""
                }`}
                style={{
                  gridColumn: showDetails && isMobile ? "1 / -1" : "auto",
                }}
              >
                <LocationMap location={selectedLocation} />
                <LocationDetails location={selectedLocation} />
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              © {new Date().getFullYear()} Location Finder App | Using
              OpenStreetMap data
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
