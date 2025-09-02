import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HistoryIcon from '@mui/icons-material/History';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Typography,
  Button,
  Popper,
  ClickAwayListener,
  Fade,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider
} from '@mui/material';
import axios from '../api/axios';

const AdvancedSearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Advanced filter states
  const [searchType, setSearchType] = useState('all');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('relevance');

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const filtersRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    fetchPopularSearches();
  }, []);

  // Fetch popular searches
  const fetchPopularSearches = async () => {
    try {
      const response = await axios.get('/search/suggestions/popular?limit=5');
      setPopularSearches(response.data.suggestions);
    } catch (error) {
      console.warn('Failed to fetch popular searches:', error);
    }
  };

  // Fetch search suggestions with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      setLoading(true);
      const endpoints = [
        `/listings/suggestions?query=${query}&limit=3`,
        `/properties/suggestions?query=${query}&limit=3`,
        `/shops/suggestions?query=${query}&limit=3`
      ];

      const responses = await Promise.allSettled(
        endpoints.map(endpoint => axios.get(endpoint))
      );

      const allSuggestions = [];
      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          const suggestions = response.value.data.suggestions || [];
          allSuggestions.push(...suggestions);
        }
      });

      setSuggestions(allSuggestions.slice(0, 8));
      setShowSuggestions(true);
    } catch (error) {
      console.warn('Failed to fetch suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query = searchQuery, filters = {}) => {
    if (!query.trim()) return;

    // Save to recent searches
    const newRecentSearches = [
      query,
      ...recentSearches.filter(s => s !== query)
    ].slice(0, 10);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    // Build search URL with filters
    const searchParams = new URLSearchParams({
      q: query,
      ...filters,
      ...(category && { category }),
      ...(location && { location }),
      ...(priceRange[0] > 0 && { min_price: priceRange[0] }),
      ...(priceRange[1] < 100000 && { max_price: priceRange[1] }),
      ...(sortBy !== 'relevance' && { sort_by: sortBy }),
      ...(searchType !== 'all' && { type: searchType })
    });

    navigate(`/search?${searchParams.toString()}`);
    setShowSuggestions(false);
    setShowAdvancedFilters(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.suggestion);
    handleSearch(suggestion.suggestion);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const resetFilters = () => {
    setCategory('');
    setLocation('');
    setPriceRange([0, 100000]);
    setSortBy('relevance');
    setSearchType('all');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
      {/* Main Search Input */}
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          border: showSuggestions ? '2px solid #ff9800' : '1px solid #e0e0e0',
          borderRadius: 2
        }}
      >
        <TextField
          ref={searchInputRef}
          fullWidth
          variant="standard"
          placeholder="Search products, properties, or shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => setShowSuggestions(true)}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '16px' }
          }}
        />
        
        {searchQuery && (
          <IconButton onClick={clearSearch} size="small">
            <ClearIcon />
          </IconButton>
        )}
        
        <IconButton onClick={toggleAdvancedFilters} size="small" color="primary">
          <FilterListIcon />
        </IconButton>
        
        <IconButton 
          onClick={() => handleSearch()} 
          size="large" 
          color="primary"
          sx={{ ml: 1 }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* Search Suggestions Dropdown */}
      <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
        <Box sx={{ position: 'relative' }}>
          <Popper
            open={showSuggestions && (suggestions.length > 0 || popularSearches.length > 0 || recentSearches.length > 0)}
            anchorEl={searchInputRef.current}
            placement="bottom-start"
            style={{ width: searchInputRef.current?.offsetWidth, zIndex: 1300 }}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={200}>
                <Paper 
                  elevation={8} 
                  sx={{ 
                    mt: 1, 
                    maxHeight: 400, 
                    overflow: 'auto',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  {/* Live Suggestions */}
                  {suggestions.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
                        Suggestions
                      </Typography>
                      <List dense>
                        {suggestions.map((suggestion, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => handleSuggestionClick(suggestion)}
                            sx={{ py: 0.5 }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <SearchIcon color="action" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={suggestion.suggestion}
                              secondary={suggestion.type}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
                        Recent Searches
                      </Typography>
                      <List dense>
                        {recentSearches.slice(0, 3).map((search, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => handleSearch(search)}
                            sx={{ py: 0.5 }}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <HistoryIcon color="action" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={search} />
                          </ListItem>
                        ))}
                      </List>
                      <Divider />
                    </>
                  )}

                  {/* Popular Searches */}
                  {popularSearches.length > 0 && (
                    <>
                      <Typography variant="subtitle2" sx={{ p: 2, pb: 1, color: 'text.secondary' }}>
                        Trending Searches
                      </Typography>
                      <Box sx={{ p: 2, pt: 0 }}>
                        {popularSearches.map((search, index) => (
                          <Chip
                            key={index}
                            label={search.suggestion_text}
                            onClick={() => handleSearch(search.suggestion_text)}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                            icon={search.is_trending ? <TrendingUpIcon /> : undefined}
                            color={search.is_trending ? "primary" : "default"}
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </Paper>
              </Fade>
            )}
          </Popper>
        </Box>
      </ClickAwayListener>

      {/* Advanced Filters Panel */}
      <ClickAwayListener onClickAway={() => setShowAdvancedFilters(false)}>
        <Box sx={{ position: 'relative' }}>
          <Popper
            open={showAdvancedFilters}
            anchorEl={filtersRef.current || searchInputRef.current}
            placement="bottom-end"
            style={{ zIndex: 1300 }}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={200}>
                <Paper 
                  elevation={8} 
                  sx={{ 
                    mt: 1, 
                    p: 3, 
                    width: 350,
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Advanced Filters
                  </Typography>
                  
                  <FormControl fullWidth margin="normal" size="small">
                    <InputLabel>Search In</InputLabel>
                    <Select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      label="Search In"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="listings">Products & Services</MenuItem>
                      <MenuItem value="properties">Properties</MenuItem>
                      <MenuItem value="shops">Shops</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    margin="normal"
                    size="small"
                    placeholder="e.g., Electronics, Clothing"
                  />

                  <TextField
                    fullWidth
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    margin="normal"
                    size="small"
                    placeholder="e.g., Nairobi, Mombasa"
                  />

                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Price Range (KSh)
                    </Typography>
                    <Slider
                      value={priceRange}
                      onChange={(e, newValue) => setPriceRange(newValue)}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100000}
                      step={1000}
                      valueLabelFormat={(value) => `KSh ${value.toLocaleString()}`}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption">KSh 0</Typography>
                      <Typography variant="caption">KSh 100,000+</Typography>
                    </Box>
                  </Box>

                  <FormControl fullWidth margin="normal" size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                    >
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="newest">Newest First</MenuItem>
                      <MenuItem value="price_low">Price: Low to High</MenuItem>
                      <MenuItem value="price_high">Price: High to Low</MenuItem>
                      <MenuItem value="popular">Most Popular</MenuItem>
                    </Select>
                  </FormControl>

                  <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={resetFilters}
                      size="small"
                      fullWidth
                    >
                      Reset
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleSearch(searchQuery, {
                        category,
                        location,
                        min_price: priceRange[0],
                        max_price: priceRange[1],
                        sort_by: sortBy,
                        type: searchType
                      })}
                      size="small"
                      fullWidth
                    >
                      Apply Filters
                    </Button>
                  </Box>
                </Paper>
              </Fade>
            )}
          </Popper>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default AdvancedSearchBar;
