import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EditListingModal from "./EditListingModal"; // Import the modal component
import LazyLoad from "react-lazyload";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL } from "../api/axios";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const MyListings = ({ profileEmail }) => {
  const [listings, setListings] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const [selectedListing, setSelectedListing] = useState(null); // Selected listing for editing
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListings = async () => {
      try {
        const response = await axiosPrivate.get(
          "/filter/listings/filter-by-email",
          {
            params: { email: profileEmail },
            signal: controller.signal,
          }
        );

        if (isMounted) {
          //console.log(response.data.listings);
          setListings(response.data.listings);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoadData(true);
      }
    };

    getListings();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, profileEmail]);

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

  const handleDelete = async (title, listing_id) => {
    if (window.confirm(`Do you want to delete ${title}?`)) {
      try {
        await axiosPrivate.delete(`/user/delete/listings/${listing_id}`);
        setListings((prev) =>
          prev.filter((listing) => listing.listing_id !== listing_id)
        );
        alert("Successfully deleted!");
        navigate("/profile");
      } catch (error) {
        console.error("Error deleting listing:", error);
        alert("Failed to delete post!");
      }
    }
  };

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    setModalOpen(true); // Open the modal
  };

  return (
    <div className="slider-container">
      {loadData ? (
        listings.length ? (
          listings.map((listing) => (
            <NavLink
              className="h-45 md:h-50 relative overflow-hidden flex items-center w-full md:w-1/2 z-0 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
              key={listing.listing_id}
              // to={`/view/${listing.listing_id}`}
            >
              <div className="h-full w-2/5 md:w-1/2">
                <img
                  className="h-full w-full object-cover"
                  src={getPhotoUrl(listing.photos[0])}
                  alt="product_img"
                />
              </div>

              <div className="flex flex-col h-full gap-2 justify-even w-3/5 md:w-1/2 p-4">
                <div className="date">
                  <time className="text-xs md:text-sm text-gray-500">
                    {new Date(listing.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <div className="absolute top-2 right-2 flex gap-1 md:gap-2">
                    {/* <button
                      className="edit_btn"
                      onClick={() => handleEdit(listing)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="delete_btn"
                      onClick={() =>
                        handleDelete(listing.title, listing.listing_id)
                      }
                    >
                      <DeleteIcon />
                    </button> */}
                    <button
                      className="z-50 hover:scale-105 cursor-pointer text-blue-500"
                      onClick={() =>
                        (window.location.href = `https://retail.boostke.co.ke`)
                      }
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="cursor-pointer hover:scale-105 text-rose-500"
                      onClick={() =>
                        (window.location.href = `https://retail.boostke.co.ke`)
                      }
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 font-semibold text-sm md:text-base line-clamp-1">
                  {listing.title}
                </p>
                <p className="font-bold text-green-600 text-sm md:text-lg">
                  KSh. {Number(listing.price).toLocaleString("en-US")}
                </p>
                <p className="text-gray-700 line-clamp-1 text-xs">
                  {listing.location}
                </p>
                {/* View Count */}
                <div className="view_count text-sm text-gray-500 flex items-center gap-1 font-seminold">
                  <VisibilityOutlinedIcon fontSize="small" />
                  <span>{listing.view_count} views</span>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <p>No listings found for this email.</p>
        )
      ) : (
        <div>
          <CircularProgress color="warning" />
        </div>
      )}

      {/* Modal Component for Editing Listing */}
      {selectedListing && (
        <EditListingModal
          listing={selectedListing}
          open={modalOpen}
          onClose={() => setModalOpen(false)} // Close modal
          refreshListings={() => setListings((prev) => [...prev])} // Refresh listings after edit
        />
      )}
    </div>
  );
};

export default MyListings;
