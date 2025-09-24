import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NavLink } from "react-router-dom";
import "../css/style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "../api/axios";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL } from "../api/axios";
import FallbackImage from "./FallbackImage";
import AddToCart from "./AddToCart";
import { Box } from "@mui/material";

function Homelistings({ selectedCounty, selectedPriceRange, selectedSort }) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loadData, setLoadData] = useState(false);

  // State for Pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track mount status
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
          //   console.log("Listings data:", response.data.listings);
          setListings((prevListings) => [
            ...prevListings,
            ...response.data.listings,
          ]);
          setLoadData(true);
          setHasMore(response.data.listings.length > 0);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error(error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getListings(page);

    return () => {
      isMounted = false; // Cleanup mount status
      controller.abort();
    };
  }, [page]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    const target = document.querySelector(".listings-end");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loading]);

  const listing_image = (photos) => {
    return photos.length > 0 ? photos[0] : "/path/to/placeholder-image.jpg";
  };

  const filterListings = () => {
    return listings.filter((listing) => {
      let isMatch = true;

      if (!listing.location || listing.price == null) {
        return false;
      }

      if (
        selectedCounty &&
        listing.location.toLowerCase() !== selectedCounty.toLowerCase()
      ) {
        isMatch = false;
      }

      if (selectedPriceRange) {
        const price = parseFloat(listing.price);
        switch (selectedPriceRange) {
          case "1000":
            if (price >= 1000) isMatch = false;
            break;
          case "1000-5000":
            if (price < 1000 || price > 5000) isMatch = false;
            break;
          case "5000-10000":
            if (price < 5000 || price > 10000) isMatch = false;
            break;
          case "10000-15000":
            if (price < 10000 || price > 15000) isMatch = false;
            break;
          case "15000-20000":
            if (price < 15000 || price > 20000) isMatch = false;
            break;
          case "20000-25000":
            if (price < 20000 || price > 25000) isMatch = false;
            break;
          case "25000-30000":
            if (price < 25000 || price > 30000) isMatch = false;
            break;
          case "30000":
            if (price <= 30000) isMatch = false;
            break;
          default:
            break;
        }
      }

      return isMatch;
    });
  };

  const sortedListings = () => {
    let filteredListings = filterListings();

    if (selectedSort === "Latest") {
      filteredListings = filteredListings.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (selectedSort === "Oldest") {
      filteredListings = filteredListings.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    }

    return filteredListings;
  };

  const getPhotoUrl = (photo) => {
    if (!photo) return "/placeholder-image.jpg";

    console.log("Original photo URL:", photo);

    // If photo is already a full URL, handle it appropriately
    if (photo.startsWith("http")) {
      // For local development, ensure localhost URLs work
      if (photo.includes("localhost:5000")) {
        return photo;
      }
      // Replace production URLs with localhost for development
      return photo
        .replace(
          "http://api.boostke.co.ke/api/uploads/",
          "http://localhost:5000/api/"
        )
        .replace(
          "https://api.boostke.co.ke/api/uploads/",
          "http://localhost:5000/api/"
        )
        .replace(
          "http://boostke.co.ke/api/uploads/",
          "http://localhost:5000/api/"
        )
        .replace(
          "https://boostke.co.ke/api/uploads/",
          "http://localhost:5000/api/"
        );
    }

    // For relative paths, use current BASE_URL
    return `${BASE_URL}${photo.startsWith("/") ? photo : "/uploads/" + photo}`;
  };

  const filteredAndSortedListings = sortedListings();

  return (
    <>
      <div className="listings">
        {loadData ? (
          listings.length > 0 ? (
            listings.map((listing) => {
              const listingImage = listing_image(listing.photos);

              if (listing.photos === null || listing.photos.length === 0) {
                // Check if the listing has no photos
                return null; // Skip rendering if no image
              }

              return (
                <div className="product" key={listing.listing_id}>
                  <NavLink
                    onClick={() => {
                      window.location.href = `/view/${listing.title}/${listing.listing_id}`;
                    }}
                  >
                    <div className="img">
                      <div className="h-full">
                        <FallbackImage
                          src={getPhotoUrl(listingImage)}
                          alt={listing.title}
                          className="!w-full !h-full object-cover"
                          category={listing.category}
                        />
                      </div>
                    </div>
                    <div className="listing_details">
                      <p className="listing_title">{listing.title}</p>
                      <p className="listing_details_amount">
                        Ksh {parseFloat(listing.price).toLocaleString("en-US")}
                      </p>
                      <p>
                        <LocationOnIcon fontSize="12" />
                        {listing.location}
                      </p>
                    </div>
                  </NavLink>

                  {/* Add to Cart Button */}
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
                </div>
              );
            })
          ) : (
            <div className="no-listings-message text-center text-secondary">
              You have no listings yet. Please add some listings to see them
              here.
            </div>
          )
        ) : (
          <>
            {[...Array(10)].map((_, index) => (
              <NavLink className="product" key={index}>
                <Skeleton variant="rectangular" width="100%" height="78%" />
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" />
                <Skeleton width="20%" height={10} />
              </NavLink>
            ))}
          </>
        )}

        <div className="listings-end"></div>
      </div>

      {loading && (
        <div className="homepage_listings_loader">
          <CircularProgress thickness={6} size={25} color="secondary" />
        </div>
      )}
    </>
  );
}

export default Homelistings;
