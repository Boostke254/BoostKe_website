import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios, { BASE_URL } from "../api/axios";
import FallbackImage from "./FallbackImage";
import AddToCart from "./AddToCart";
import "../css/style.css";

function Homelistings({ selectedCounty, selectedPriceRange, selectedSort }) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loadData, setLoadData] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListings = async (page) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/listings/all?page=${page}&limit=10`,
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          setListings((prev) => [...prev, ...response.data.listings]);
          setLoadData(true);
          setHasMore(response.data.listings.length > 0);
        }
      } catch (error) {
        if (error.name !== "CanceledError") console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getListings(page);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [page]);

  // Infinite Scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading]);

  const getPhotoUrl = (photo) => {
    if (!photo) return "/placeholder-image.jpg";

    if (photo.startsWith("http")) {
      return photo
        .replace("http://api.boostke.co.ke/uploads/", "http://localhost:5000")
        .replace("https://api.boostke.co.ke/uploads/", "http://localhost:5000")
        .replace("http://boostke.co.ke/uploads/", "http://localhost:5000")
        .replace("https://boostke.co.ke/uploads/", "http://localhost:5000");
    }

    return `${BASE_URL}${photo.startsWith("/") ? photo : "/uploads/" + photo}`;
  };

  const filterListings = () => {
    return listings.filter((listing) => {
      let isMatch = true;

      if (!listing.location || listing.price == null) return false;

      if (
        selectedCounty &&
        listing.location.toLowerCase() !== selectedCounty.toLowerCase()
      ) {
        isMatch = false;
      }

      if (selectedPriceRange) {
        const price = parseFloat(listing.price);
        const ranges = {
          1000: (p) => p < 1000,
          "1000-5000": (p) => p >= 1000 && p <= 5000,
          "5000-10000": (p) => p >= 5000 && p <= 10000,
          "10000-15000": (p) => p >= 10000 && p <= 15000,
          "15000-20000": (p) => p >= 15000 && p <= 20000,
          "20000-25000": (p) => p >= 20000 && p <= 25000,
          "25000-30000": (p) => p >= 25000 && p <= 30000,
          30000: (p) => p > 30000,
        };
        if (ranges[selectedPriceRange] && !ranges[selectedPriceRange](price)) {
          isMatch = false;
        }
      }

      return isMatch;
    });
  };

  const sortedListings = () => {
    let filtered = filterListings();

    if (selectedSort === "Latest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (selectedSort === "Oldest") {
      filtered = filtered.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    return filtered;
  };

  const filteredAndSortedListings = sortedListings();

  return (
    <>
      <Box
        className="listings"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
      >
        {loadData ? (
          filteredAndSortedListings.length > 0 ? (
            filteredAndSortedListings.map((listing) => {
              const listingImage =
                listing.photos?.[0] || "/placeholder-image.jpg";

              return (
                <Card
                  key={listing.listing_id}
                  className="product"
                  sx={{ borderRadius: 2, boxShadow: 3 }}
                >
                  <NavLink
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/view/${listing.title}/${listing.listing_id}`);
                    }}
                  >
                    {/* Fixed image size container */}
                    <Box
                      sx={{
                        width: "100%",
                        height: 200,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#f9f9f9",
                      }}
                    >
                      <FallbackImage
                        src={getPhotoUrl(listingImage)}
                        alt={listing.title}
                        className="object-cover w-full h-full"
                        category={listing.category}
                      />
                    </Box>
                  </NavLink>

                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {listing.title}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      Ksh {parseFloat(listing.price).toLocaleString("en-US")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocationOnIcon fontSize="small" /> {listing.location}
                    </Typography>
                  </CardContent>

                  <Box sx={{ p: 1 }}>
                    <AddToCart
                      listing={{
                        listing_id: listing.listing_id,
                        title: listing.title,
                        price: listing.price,
                        item_type: "product",
                      }}
                      variant="button"
                      size="small"
                      showQuantity={true}
                    />
                  </Box>
                </Card>
              );
            })
          ) : (
            <Typography
              className="no-listings-message"
              align="center"
              color="text.secondary"
            >
              No listings match your filters.
            </Typography>
          )
        ) : (
          [...Array(10)].map((_, index) => (
            <Card
              key={index}
              className="product"
              sx={{ borderRadius: 2, boxShadow: 2 }}
            >
              <Skeleton variant="rectangular" width="100%" height={200} />
              <CardContent>
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </CardContent>
            </Card>
          ))
        )}

        <div ref={observerRef} className="listings-end"></div>
      </Box>

      {loading && (
        <Box
          className="homepage_listings_loader"
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <CircularProgress thickness={6} size={25} color="secondary" />
        </Box>
      )}
    </>
  );
}

export default Homelistings;
