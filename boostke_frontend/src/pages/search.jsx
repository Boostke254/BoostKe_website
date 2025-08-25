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
import { Divider } from "@mui/material";

function Search() {
  const [searchParams] = useSearchParams();
  const queryID = searchParams.get("q");

  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListings = async (query) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/listings/filter-by-search?query=${query}`,
          {
            signal: controller.signal,
          }
        );

        if (isMounted) {
          setListings(response.data.listings);
          setLoadData(true);
          setDataAvailable(true);
        }
      } catch (error) {
        setLoadData(true);
        if (error.message !== "canceled") {
          console.log(error);
        }

        if (error?.response?.status === 401) {
          navigate("/login");
        } else if (error?.response?.status === 404) {
          setDataAvailable(false);
        }
      } finally {
        setLoading(false);
      }
    };

    getListings(queryID);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [queryID, navigate]);

  const getPhotoUrl = (photo) => {
    // If the photo already starts with 'http', return as is
    if (photo.startsWith("http")) {
      return photo;
    }
    // Otherwise, prepend the base URL, ensuring no duplicate slashes
    return `${BASE_URL.replace(/\/$/, "")}/${photo}`;
  };

  return (
    <>
      {loading && (
        <div className="linear_loader">
          <LinearProgress color="warning" />
        </div>
      )}

      <div className="search_comp bg-gray-50 min-h-[80svh]">
        <div
          className="breadcrumb-container flex flex-col items-start justify-center py-4 md:py-6 px-2 md:px-[77px] bg-gray-50"
          role="navigation"
          aria-label="Breadcrumb"
        >
          <h4 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 flex items-center">
            <SearchIcon fontSize="small" className="mr-2 text-gray-500" />
            Search Results
          </h4>

          <div className="flex items-center text-xs md:text-sm text-gray-600">
            <a
              href="/categories"
              className="hover:text-orange-500"
              title="View all product categories"
            >
              Product Categories
            </a>
            <ChevronRightIcon fontSize="small" className="mx-1 text-gray-500" />
            <span className="text-gray-800 font-medium">{queryID}</span>
          </div>
        </div>

        <div className="px-4 md:px-[77px] pb-4">
          <Divider />
        </div>

        <div className="listings ">
          {loadData ? (
            listings.length > 0 ? (
              dataAvailable ? (
                listings.map((listing, index) => (
                  <NavLink
                    className="product"
                    to={`/view/${listing.title}/${listing["listing_id"]}`}
                    key={`${listing["listing_id"]}-${index}`}
                  >
                    <div className="img">
                      <LazyLoad offset={100}>
                        <img
                          className="theImage"
                          src={getPhotoUrl(listing.photos[0])}
                          alt={`Product image for ${listing.title}`} // More descriptive alt text
                        />
                      </LazyLoad>
                    </div>
                    <div className="listing_details">
                      <p className="listing_title">{listing["title"]}</p>
                      <p className="listing_details_amount">
                        Ksh {listing["price"].toLocaleString("en-US")}
                      </p>
                      <p>
                        <LocationOnIcon fontSize="12" />
                        {listing["location"]}
                      </p>
                    </div>
                  </NavLink>
                ))
              ) : (
                <div className="w-full min-h-50 flex flex-col items-center justify-center px-10 text-sm md:text-md text-center text-gray-600">
                  <InboxIcon fontSize="large" className="mb-2 text-gray-600" />
                  No listings in this category.
                </div>
              )
            ) : (
              <div className="w-full min-h-50 flex flex-col items-center justify-center px-10 text-sm md:text-md text-center text-gray-600">
                <InboxIcon fontSize="large" className="mb-2 text-gray-600" />
                No listings in this category.
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
      </div>
    </>
  );
}

export default Search;
