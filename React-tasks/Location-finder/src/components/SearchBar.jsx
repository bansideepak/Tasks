import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";

const SearchBar = ({
  onSearch,
  loading,
  suggestions,
  onTyping,
  suggestionsLoading,
  onSelectSuggestion,
  clearSuggestions,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onTyping(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      clearSuggestions();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.display_name);
    onSelectSuggestion(suggestion);
    clearSuggestions();

    inputRef.current?.focus();
  };

  const handleClearSearch = () => {
    setQuery("");
    clearSuggestions();
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for a location..."
            className="search-input"
            aria-label="Search location"
          />

          {query && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="clear-button"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
          <span className="search-text">Search</span>
        </button>
      </form>

      {/* Suggestions dropdown */}

      {isFocused && suggestions.length > 0 && (
        <div className="suggestions-dropdown" ref={suggestionRef}>
          {suggestionsLoading ? (
            <div className="suggestion-loading">
              <Loader2 size={16} className="animate-spin" />
              <span>Loading suggestions...</span>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search size={14} className="suggestion-icon" />
                <div className="suggestion-text">
                  <div className="suggestion-primary">{suggestion.name}</div>
                  <div className="suggestion-secondary">
                    {suggestion.display_name}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
