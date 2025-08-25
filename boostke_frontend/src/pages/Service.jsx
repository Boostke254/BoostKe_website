import LazyLoad from "react-lazyload";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Skeleton from "@mui/material/Skeleton";
import { BASE_URL } from "../api/axios";
import InboxIcon from "@mui/icons-material/Inbox";

function Service() {
  const { serviceId } = useParams(); // Destructure for clarity
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchListings = async () => {
      try {
        setIsLoading(true); // Start loading
        setError(null); // Reset error state

        // API request with query parameters for filtering
        const response = await axios.get("/filter/listings/filter-by-service", {
          params: { service: serviceId },
          signal: controller.signal,
        });

        if (isMounted) {
          setListings(response.data.listings); // Set fetched listings
        }
      } catch (error) {
        if (error.response) {
          // Handle known backend errors
          const { status, data } = error.response;
          if (status === 400) {
            setError("Please specify a valid service.");
          } else if (status === 404) {
            setError("No listings found in this service.");
          } else if (status === 500) {
            setError("Something went wrong on the server.");
          } else {
            setError(data?.error || "Failed to load listings.");
          }
        }
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchListings();

    return () => {
      isMounted = false; // Cleanup
      controller.abort(); // Cancel ongoing request
    };
  }, [serviceId]);

  const getPhotoUrl = (photo) => {
    // If the photo already starts with 'http', return as is
    if (photo.startsWith("http")) {
      return photo;
    }
    // Otherwise, prepend the base URL
    return `${BASE_URL}${photo}`;
  };

  return (
    <div className="category_products flex flex-col min-h-[80svh]">
      <p className="text-sm md:text-md">{serviceId}</p>
      <div className="category_product">
        {isLoading ? (
          // Show skeletons while loading
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[...Array(10)].map((_, index) => (
              <div className="mb-2 h-[250px]" key={index}>
                <Skeleton variant="rectangular" width="100%" height="65%" />
                <Skeleton width="80%" height="20%" />
                <Skeleton width="60%" height="10%" />
                <Skeleton width="20%" height="5%" />
              </div>
            ))}
          </div>
        ) : error ? (
          // Show error message
          <div className="w-full min-h-50 flex flex-col items-center justify-center px-10 pb-6 text-sm md:text-md text-center text-gray-400">
            <InboxIcon fontSize="large" className="mb-2 text-gray-300" />
            {error}
          </div>
        ) : listings.length > 0 ? (
          // Show listings if available
          <div className="listings">
            {listings.map(
              (listing) =>
                // Check if the listing has no photos
                listing.photos &&
                listing.photos.length > 0 && (
                  <NavLink
                    className="product"
                    to={`/view/${listing.title}/${listing.listing_id}`}
                    key={listing.listing_id}
                  >
                    <div className="img">
                      <LazyLoad offset={100}>
                        <img
                          className="theImage"
                          src={getPhotoUrl(listing.photos[0])}
                          alt="product_img"
                        />
                      </LazyLoad>
                    </div>
                    <div className="listing_details">
                      <p className="listing_title">
                        <b>{listing.title}</b>
                      </p>
                      <p>Ksh.{listing.price.toLocaleString("en-US")}</p>
                      <p className="">
                        <LocationOnIcon sx={{ fontSize: 14 }} />
                        {listing.location}
                      </p>
                    </div>
                  </NavLink>
                )
            )}
          </div>
        ) : (
          // Show no data message
          <div className="w-full min-h-50 flex flex-col items-center justify-center px-10 text-sm md:text-md text-center text-gray-400">
            <InboxIcon fontSize="large" className="mb-2 text-gray-300" />
            No listings in this service.
          </div>
        )}
      </div>
    </div>
  );
}

export default Service;
