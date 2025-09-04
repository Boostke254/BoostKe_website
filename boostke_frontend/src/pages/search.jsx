import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/style.css";
import LazyLoad from "react-lazyload";
import Skeleton from "@mui/material/Skeleton";
import axios from "../api/axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinearProgress from "@mui/material/LinearProgress";
import { BASE_URL } from "../api/axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AddToCart from "../components/AddToCart";
import {
  Divider,
  Pagination,
  Box,
  Typography,
  Chip,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Badge
} from "@mui/material";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryID = searchParams.get("q");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  const sortBy = searchParams.get("sort_by") || "relevance";
  const searchType = searchParams.get("type") || "listings";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();
  const [results, setResults] = useState({
    listings: [],
    properties: [],
    shops: [],
    all: []
  });
  const [pagination, setPagination] = useState({});
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState(searchType);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const performSearch = async () => {
      if (!queryID) return;

      try {
        setLoading(true);
        setLoadData(false);

        // Determine which search endpoint to use
        let endpoint = '';
        let params = new URLSearchParams({
          query: queryID,
          page: currentPage,
          limit: 20
        });

        // Add filters
        if (category) params.append('category', category);
        if (location) params.append('location', location);
        if (minPrice) params.append('min_price', minPrice);
        if (maxPrice) params.append('max_price', maxPrice);
        if (sortBy) params.append('sort_by', sortBy);

        switch (activeTab) {
          case 'listings':
            endpoint = `/listings/filter-by-search?${params.toString()}`;
            break;
          case 'properties':
            endpoint = `/properties/search?${params.toString()}`;
            break;
          case 'shops':
            endpoint = `/shops/search?${params.toString()}`;
            break;
          case 'all':
          default:
            params.append('type', 'all');
            endpoint = `/search/universal?${params.toString()}`;
            break;
        }

        const response = await axios.get(endpoint, {
          signal: controller.signal,
        });

        if (isMounted) {
          if (activeTab === 'all') {
            setResults({
              ...results,
              all: response.data.results || []
            });
          } else {
            setResults({
              ...results,
              [activeTab]: response.data[activeTab] || response.data.listings || response.data.properties || response.data.shops || []
            });
          }
          
          setPagination(response.data.pagination || {});
          setLoadData(true);
          setDataAvailable(true);
        }
      } catch (error) {
        setLoadData(true);
        if (error.message !== "canceled") {
          console.log(error);
          if (error?.response?.status === 404) {
            setDataAvailable(false);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    performSearch();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [queryID, category, location, minPrice, maxPrice, sortBy, activeTab, currentPage]);

  const handleTabChange = (event, newTab) => {
    if (newTab) {
      setActiveTab(newTab);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('type', newTab);
      newParams.delete('page'); // Reset to first page
      setSearchParams(newParams);
    }
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', newSortBy);
    newParams.delete('page'); // Reset to first page
    setSearchParams(newParams);
  };

  const handlePageChange = (event, page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page);
    setSearchParams(newParams);
  };

  const clearFilter = (filterName) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(filterName);
    newParams.delete('page'); // Reset to first page
    setSearchParams(newParams);
  };

  const getPhotoUrl = (photo) => {
    if (!photo) return '/placeholder-image.jpg';
    
    // If photo is already a full URL, fix the domain if needed
    if (photo.startsWith("http")) {
      // Replace old api.boostke.co.ke with current domain
      return photo
        .replace("http://api.boostke.co.ke/uploads/", "https://boostke.co.ke/uploads/")
        .replace("https://api.boostke.co.ke/uploads/", "https://boostke.co.ke/uploads/")
        .replace("http://boostke.co.ke/uploads/", "https://boostke.co.ke/uploads/");
    }
    
    // For relative paths, use current BASE_URL
    return `${BASE_URL}${photo.startsWith('/') ? photo : '/uploads/' + photo}`;
  };

  const getCurrentResults = () => {
    switch (activeTab) {
      case 'listings':
        return results.listings;
      case 'properties':
        return results.properties;
      case 'shops':
        return results.shops;
      case 'all':
      default:
        return results.all;
    }
  };

  const renderResultCard = (item, index) => {
    const isProperty = item.result_type === 'property' || activeTab === 'properties';
    const isShop = item.result_type === 'shop' || activeTab === 'shops';
    const isListing = item.result_type === 'listing' || activeTab === 'listings';

    const getItemLink = () => {
      if (isProperty) return `/property/${item.property_id || item.id}`;
      if (isShop) return `/shop/${item.shop_id || item.id}`;
      return `/view/${item.title}/${item.listing_id || item.id}`;
    };

    const getItemImage = () => {
      if (item.photos && item.photos.length > 0) {
        return getPhotoUrl(item.photos[0]);
      }
      return '/placeholder-image.jpg';
    };

    return (
      <Card 
        key={`${item.id || item.listing_id || item.property_id || item.shop_id}-${index}`}
        sx={{ 
          height: viewMode === 'list' ? 150 : 300,
          display: 'flex',
          flexDirection: viewMode === 'list' ? 'row' : 'column',
          '&:hover': { transform: 'translateY(-2px)' },
          transition: 'transform 0.2s'
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: viewMode === 'list' ? 150 : '100%',
            height: viewMode === 'list' ? 150 : 200,
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          image={getItemImage()}
          alt={item.title}
          onClick={() => navigate(getItemLink())}
        />
        <CardContent sx={{ flex: 1, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {isProperty && <Chip label="Property" size="small" color="primary" />}
            {isShop && <Chip label="Shop" size="small" color="secondary" />}
            {isListing && <Chip label="Product" size="small" color="default" />}
            {item.relevance_score && (
              <Chip 
                label={`${(item.relevance_score || 0).toFixed(1)}★`} 
                size="small" 
                sx={{ ml: 1 }} 
              />
            )}
          </Box>
          
          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate(getItemLink())}
          >
            {item.title || item.shop_name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.description?.substring(0, 100)}...
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {item.price && (
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                KSh {Number(item.price).toLocaleString()}
              </Typography>
            )}
            
            {(item.location || item.address || item.county) && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {item.location || item.address || item.county}
                </Typography>
              </Box>
            )}
          </Box>

          {isProperty && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {item.rooms} rooms • {item.bathrooms} bathrooms • {item.property_type}
              </Typography>
            </Box>
          )}

          {(item.view_count || item.views_count) && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {item.view_count || item.views_count} views
            </Typography>
          )}

          {/* Add to Cart Button for Listings/Products only */}
          {isListing && item.price && (
            <Box sx={{ mt: 1 }}>
              <AddToCart
                listing={{
                  listing_id: item.listing_id || item.id,
                  title: item.title,
                  price: item.price,
                  item_type: 'product'
                }}
                variant="button"
                size="small"
                showQuantity={true}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {loading && <LinearProgress />}
      
      {/* Breadcrumb and Header */}
      <div
        className="breadcrumb-container flex flex-col items-start justify-center py-4 md:py-6 px-2 md:px-[77px] bg-gray-50"
        role="navigation"
        aria-label="Breadcrumb"
      >
        <h4 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 flex items-center">
          <SearchIcon fontSize="small" className="mr-2 text-gray-500" />
          Search Results for "{queryID}"
        </h4>

        <div className="flex items-center text-xs md:text-sm text-gray-600 mb-4">
          <a href="/categories" className="hover:text-orange-500">
            All Categories
          </a>
          <ChevronRightIcon fontSize="small" className="mx-1 text-gray-500" />
          <span className="text-gray-800 font-medium">{queryID}</span>
        </div>

        {/* Active Filters */}
        {(category || location || minPrice || maxPrice) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {category && (
              <Chip 
                label={`Category: ${category}`} 
                onDelete={() => clearFilter('category')}
                size="small"
              />
            )}
            {location && (
              <Chip 
                label={`Location: ${location}`} 
                onDelete={() => clearFilter('location')}
                size="small"
              />
            )}
            {minPrice && (
              <Chip 
                label={`Min: KSh ${Number(minPrice).toLocaleString()}`} 
                onDelete={() => clearFilter('min_price')}
                size="small"
              />
            )}
            {maxPrice && (
              <Chip 
                label={`Max: KSh ${Number(maxPrice).toLocaleString()}`} 
                onDelete={() => clearFilter('max_price')}
                size="small"
              />
            )}
          </Box>
        )}
      </div>

      <div className="px-4 md:px-[77px] pb-4">
        <Divider />

        {/* Search Controls */}
        <Box sx={{ my: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          {/* Search Type Tabs */}
          <ToggleButtonGroup
            value={activeTab}
            exclusive
            onChange={handleTabChange}
            size="small"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="listings">Products</ToggleButton>
            <ToggleButton value="properties">Properties</ToggleButton>
            <ToggleButton value="shops">Shops</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Sort Control */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
                startAdornment={<SortIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price_low">Price: Low to High</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
              </Select>
            </FormControl>

            {/* View Mode Toggle */}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="grid">
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Results Count */}
        {pagination.total_results !== undefined && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {pagination.total_results} results found
            {pagination.total_results > 0 && ` (Page ${pagination.current_page} of ${pagination.total_pages})`}
          </Typography>
        )}

        {/* Search Results */}
        <Box sx={{ minHeight: '400px' }}>
          {loadData ? (
            getCurrentResults().length > 0 ? (
              dataAvailable ? (
                <>
                  <Grid 
                    container 
                    spacing={2}
                    sx={{ 
                      display: viewMode === 'list' ? 'block' : 'flex',
                      '& .MuiGrid-item': viewMode === 'list' ? { width: '100%' } : {}
                    }}
                  >
                    {getCurrentResults().map((item, index) => (
                      <Grid 
                        item 
                        xs={12} 
                        sm={viewMode === 'grid' ? 6 : 12} 
                        md={viewMode === 'grid' ? 4 : 12} 
                        lg={viewMode === 'grid' ? 3 : 12}
                        key={index}
                        sx={{ mb: viewMode === 'list' ? 2 : 0 }}
                      >
                        {renderResultCard(item, index)}
                      </Grid>
                    ))}
                  </Grid>

                  {/* Pagination */}
                  {pagination.total_pages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                      <Pagination
                        count={pagination.total_pages}
                        page={pagination.current_page}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                      />
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <InboxIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No results found for "{queryID}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Try adjusting your search terms or filters
                  </Typography>
                </Box>
              )
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <InboxIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No results found
                </Typography>
              </Box>
            )
          ) : (
            // Loading Skeleton
            <Grid container spacing={2}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={32} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={20} width="60%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </div>
    </>
  );
}

export default Search;
