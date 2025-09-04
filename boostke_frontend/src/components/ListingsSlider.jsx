import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NavLink } from "react-router-dom";
import "../css/style.css";
import { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "../api/axios";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL } from "../api/axios";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef } from "react";
import AddToCart from "./AddToCart";
import { Box } from "@mui/material";

function ListingsSlider() {
  const [listings, setListings] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const scrollRef = useRef(null);

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
          `/listings/all?page=${page}&limit=50`,
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

  return (
    <>
      <h2 className="mb-4 md:mb-6 text-sm md:text-xl font-semibold text-orange-500">
        View Popular Products
      </h2>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-1 md:gap-3 pb-2 scrollbar-hide scroll-smooth"
        >
          {loadData ? (
            listings.length > 0 ? (
              listings.map((listing) => {
                const listingImage = listing_image(listing.photos);

                if (!listing.photos || listing.photos.length === 0) return null;

                return (
                  <div
                    className="flex-none w-1/3 md:w-[200px] overflow-hidden bg-white shadow-md hover:scale-102 transition-all duration-150"
                    key={listing.listing_id}
                  >
                    <NavLink
                      className="block h-[150px] md:h-[180px]"
                      onClick={() => {
                        window.location.href = `/view/${listing.title}/${listing.listing_id}`;
                      }}
                    >
                      <div className="h-[70%]">
                        <LazyLoadImage
                          src={getPhotoUrl(listingImage)}
                          alt={listing.title}
                          effect="blur"
                          className="!w-full !h-full object-cover"
                          wrapperClassName="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col h-[30%] justify-between p-2">
                        <p className="text-[9px] md:text-xs font-semibold line-clamp-1 text-gray-700">
                          {listing.title}
                        </p>
                        <p className="text-[9px] md:text-xs font-bold text-green-600">
                          Ksh {parseFloat(listing.price).toLocaleString("en-US")}
                        </p>
                        <p className="text-gray-400 text-[9px] md:text-[10px] flex items-center gap-1">
                          <LocationOnIcon fontSize="12" />
                          {listing.location}
                        </p>
                      </div>
                    </NavLink>
                    
                    {/* Add to Cart Button */}
                    <Box sx={{ p: 0.5 }}>
                      <AddToCart
                        listing={{
                          listing_id: listing.listing_id,
                          title: listing.title,
                          price: listing.price,
                          item_type: 'product'
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
            [...Array(10)].map((_, index) => (
              <div className="flex-none w-[100px]" key={index}>
                <Skeleton variant="rectangular" width="100%" height="78%" />
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" />
                <Skeleton width="20%" height={10} />
              </div>
            ))
          )}

          <div className="listings-end flex-none w-[1px]"></div>
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => {
            scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-orange-100 p-2 rounded-full z-10"
        >
          <ChevronRightIcon className="text-orange-500" />
        </button>
      </div>

      {loading && (
        <div className="homepage_listings_loader mt-2">
          <CircularProgress thickness={6} size={25} color="secondary" />
        </div>
      )}
    </>
  );
}

export default ListingsSlider;
