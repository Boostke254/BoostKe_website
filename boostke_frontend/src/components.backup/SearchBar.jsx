import { productCategories } from "../components/Categories";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/components.css";
import AdvancedSearchBar from "./AdvancedSearchBar";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const SearchBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [useAdvancedSearch, setUseAdvancedSearch] = useState(true);

  // Event handler for search input
  const handleSearch = (event) => {
    setValue(event.target.value);
  };

  // Event handler for category input
  const handleCat = (event) => {
    setCategory(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      const searchParams = new URLSearchParams({
        q: value.trim(),
        type: 'all'
      });
      
      if (category && category !== 'products') {
        searchParams.set('category', category);
      }
      
      navigate(`/search?${searchParams.toString()}`);
      setShowSearch(false); // Close the form after submission
      
      // Save to recent searches
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      const newSearch = { query: value.trim(), timestamp: Date.now() };
      const updatedSearches = [newSearch, ...recentSearches.filter(s => s.query !== value.trim())].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  };

  // Toggle search form visibility
  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
  };

  // Use advanced search for desktop, simple search for mobile
  if (!isMobile && useAdvancedSearch) {
    return (
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <AdvancedSearchBar />
      </Box>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-orange-300 rounded-md hidden md:flex items-center justify-between min-w-2/5"
      >
        <input
          type="text"
          value={value}
          onChange={handleSearch}
          placeholder="Search for products, properties, shops..."
          className="text-xs w-4/5 px-2 py-1 border-none outline-none"
          required
        />
        <select
          id="dropdown"
          className="text-xs w-1/5 border-none outline-none"
          value={category}
          onChange={handleCat}
        >
          <option value="">All</option>
          <option value="listings">Products</option>
          <option value="properties">Properties</option>
          <option value="shops">Shops</option>
          <option value="services">Services</option>
        </select>
        <button className="search_btn" type="submit" title="Search">
          <SearchIcon />
        </button>
      </form>

      {showSearch && (
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            value={value}
            onChange={handleSearch}
            className="text-[10px] w-5/7 px-1"
            placeholder="Search products, properties..."
            required
          />
          <select
            id="dropdown"
            className="text-[10px] w-2/7"
            value={category}
            onChange={handleCat}
          >
            <option value="">All</option>
            <option value="listings">Products</option>
            <option value="properties">Properties</option>
            <option value="shops">Shops</option>
            <option value="services">Services</option>
          </select>
          <button className="search_btn" type="submit" title="Search">
            <SearchIcon />
          </button>
        </form>
      )}

      <div className="search_icon" onClick={handleSearchIconClick}>
        <span>
          <SearchIcon color="warning" sx={{ fontSize: "16px" }} />
        </span>
      </div>
    </>
  );
};

export default SearchBar;
