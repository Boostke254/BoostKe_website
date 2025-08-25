import { useEffect, useState } from "react";
import axios, { BASE_URL } from "../api/axios";
import { useParams } from "react-router-dom";
import Phone from "@mui/icons-material/Phone";
import Message from "@mui/icons-material/Mail";
import { Helmet } from "react-helmet";
import Skeleton from "@mui/material/Skeleton";
import Modal from "@mui/material/Modal";
import MessageSeller from "../components/Chat/productChat";
import Carousel from "../components/ProductCarousel";
import ShopInfoCard from "../components/ShopInfoCard";

function View() {
  const [listing, setListing] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();

  const getPhotoUrl = (photo) =>
    photo.startsWith("http") ? photo : `${BASE_URL}${photo}`;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `/user/from-listings/getlisting/${params.listingId}`,
          { signal: controller.signal }
        );
        if (isMounted) {
          //console.log(response.data);
          setListing(response.data.listing);
          setLoadData(true);
        }
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListing();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [params.listingId]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (!loadData) {
    return (
      <div className="px-2 max-w-7xl mx-auto h-[100vh]">
        <div className="flex items-center gap-1 my-2">
          <Skeleton variant="rectangular" width="10%" height="20px" />
          <Skeleton variant="rectangular" width="20%" height="20px" />
          <Skeleton variant="rectangular" width="50%" height="20px" />
        </div>
        <div>
          <Skeleton variant="rectangular" width="100%" height="400px" />
        </div>
      </div>
    );
  }

  return (
    <div className="views px-4 py-6">
      {listing && (
        <>
          <Helmet>
            <title>
              {listing?.title} @ Your Trusted Marketplace Online | Boost Kenya
            </title>
            <meta name="description" content={listing?.description} />
            <meta property="og:title" content={listing?.title} />
            <meta property="og:description" content={listing?.description} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="BoostKE" />
            {/* Open Graph */}
            <meta property="og:title" content={listing?.title} />
            <meta property="og:description" content={listing?.description} />
            <meta property="og:image" content={listing?.photos[0]} />
            {/* Twitter */}
            <meta name="twitter:card" content={listing?.title} />
            <meta name="twitter:title" content={listing?.title} />
            <meta name="twitter:description" content={listing?.description} />
            <meta name="twitter:image" content={listing?.photos[0]} />
          </Helmet>

          {/* breadcrumbs */}
          <div className="flex justify-between items-center md:mt-2 pt-4 pb-2 md:py-4 text-[10px] md:text-xs">
            <nav className="flex items-center text-gray-600">
              <a href="/" className="text-amber-500 hover:underline">
                Home
              </a>
              <span className="mx-1 md:mx-2">/</span>
              <a
                href={`/categories/${listing?.category}`}
                className="hover:text-blue-500"
              >
                {listing?.category}
              </a>
              <span className="mx-1 md:mx-2">/</span>
              <span className="text-gray-400">{listing?.title}</span>
            </nav>
          </div>

          <div className="min-h-80 pb-6 grid md:grid-cols-2 gap-2">
            {/* Images */}
            <Carousel
              photos={listing.photos.map(getPhotoUrl)}
              onImageClick={handleImageClick}
            />

            {/* Details */}
            <div className="bg-white p-4 md:p-6 border border-gray-100 transition-all duration-300">
              {/* <h2 className="text-2xl font-semibold mb-3">
                Product: {listing.title}
              </h2> */}
              <h2 className="text-2xl font-semibold mb-3">
                #: {listing.title}
              </h2>
              <hr className="mb-4" />

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="text-gray-500">Posted On:</div>
                <div className="capitalize">
                  {new Date(listing.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long", // This ensures the full month name
                    day: "numeric",
                  })}
                </div>

                <div className="text-gray-500">Location:</div>
                <div className="capitalize">{listing.location}</div>

                <div className="text-gray-500">Price:</div>
                <div className="text-lg font-bold text-green-600">
                  Ksh. {Number(listing.price).toLocaleString("en-US")}
                </div>
              </div>

              <div className="w-full flex items-center justify-start h-25 overflow-hidden my-3">
                <ShopInfoCard
                  shop_id={listing.shop_id}
                  shop_logo={listing.shop_logo}
                  shop_name={listing.shop_name}
                />
              </div>

              {JSON.parse(localStorage.getItem("user")) !== null ? (
                <>
                  <div className="mt-5 flex justify-between md:justify-start gap-2 md:gap-4 text-amber-500">
                    {listing.contact_info?.mobile && (
                      <a
                        href={`tel:${listing.contact_info.mobile}`}
                        className="inline-flex items-center gap-2 text-sm  border-2 border-amber-500 w-1/2 md:w-fit rounded-md px-3 md:px-4 py-1 text-amber-500 ring-1 ring-rose-600/10 ring-inset hover:scale-105 transition-all duration-300 hover:bg-amber-500 hover:text-white justify-center"
                      >
                        <Phone fontSize="small" /> Call Vendor
                      </a>
                    )}
                    {listing.contact_info?.email && (
                      <a
                        href={`mailto:${listing.contact_info.email}`}
                        className="inline-flex items-center gap-2 text-sm border-2 border-amber-500 rounded-md px-3 md:px-4 py-1 text-amber-500 ring-1 ring-amber-600/10 ring-inset hover:scale-105 transition-all duration-300 hover:bg-amber-500 hover:text-white w-1/2 md:w-fit justify-center"
                      >
                        <Message fontSize="small" /> Email Vendor
                      </a>
                    )}
                  </div>
                  <div className="mt-4 w-full border-2 border-amber-400 rounded-md text-amber-500  transition-all duration-300 hover:scale-105 overflow-hidden">
                    <MessageSeller listing={listing} />
                  </div>
                </>
              ) : (
                <a
                  href="/login"
                  className="inline-flex items-center rounded-md bg-red-50 px-4 py-2 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset hover:scale-105 transition-all duration-300 mt-2"
                >
                  Please login to contact the seller.
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white md:mt-0 mb-4 transition-all duration-300 p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">
              Detailed description of{" "}
              <span className="font-medium text-orange-600">
                {listing.title}
              </span>
            </h2>
            {listing.description.split(/\r?\n/).map((line, index) => (
              <p key={index} className="text-gray-700 mb-2 leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          {/* Image Modal */}
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            className="flex items-center justify-center p-4"
          >
            <div className="bg-white p-4 rounded-md max-w-3xl w-full shadow-lg relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              >
                &times;
              </button>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Full Size"
                  className="w-full object-contain max-h-[80vh] rounded"
                />
              )}
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default View;
