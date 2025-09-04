import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Skeleton from "@mui/material/Skeleton";
import { useParams, NavLink } from "react-router-dom";
import { Container, CircularProgress, Box, Button } from "@mui/material";
import { BASE_URL } from "../api/axios";
import { motion } from "framer-motion";
import "../css/shop.css";
import InboxIcon from "@mui/icons-material/Inbox";
import { Helmet } from "react-helmet";
import AddToCart from "../components/AddToCart";

const ShopProducts = () => {
  const { shopId, shopName } = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`/shop/${shopId}/listings`);
        setListings(response.data.listings);
        setLoadData(true);
      } catch (err) {
        console.error("Error fetching listings", err);
        setError(
          "No products available at this shop at the moment. Please check back later!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, [shopId]);

  if (loading) {
    return (
      <div className="flex flex-col px-2 max-w-7xl mx-auto">
        <div className="flex items-center my-4 gap-2">
          <Skeleton width="20%" height="10%" />
          <Skeleton width="20%" height="10%" />
        </div>
        <div className="mb-2">
          <Skeleton width="35%" height="30%" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[...Array(10)].map((_, index) => (
            <div className="mb-2 h-[220px]" key={index}>
              <Skeleton variant="rectangular" width="100%" height="50%" />
              <Skeleton width="60%" height="10%" />
              <Skeleton width="80%" height="20%" />
              <Skeleton width="100%" height="15%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{`${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )} | Products on BoostKE`}</title>
          <meta
            name="description"
            content={`Explore products offered by ${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )} on BoostKE. View listings, prices, and descriptions to shop with confidence.`}
          />
          <meta
            name="keywords"
            content={`products by ${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )}, ${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )} shop, vendor products, BoostKE listings, online marketplace Kenya`}
          />
          <meta name="robots" content="index, follow" />
          <meta
            property="og:title"
            content={`${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )} | Products on BoostKE`}
          />
          <meta
            property="og:description"
            content={`Discover items available at ${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )}. Find the latest products and deals from this verified BoostKE vendor.`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://boostke.co.ke/vendors/${shopName}/${shopId}`}
          />
          <meta
            property="og:image"
            content="https://boostke.co.ke/assets/shop-preview.jpg"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )} | Products on BoostKE`}
          />
          <meta
            name="twitter:description"
            content={`Shop top products from ${decodeURIComponent(
              shopName.replace(/-/g, " ")
            )} on BoostKE. Verified listings, fair prices, and trusted quality.`}
          />
          <meta
            name="twitter:image"
            content="https://boostke.co.ke/assets/shop-preview.jpg"
          />
        </Helmet>
        <div className="min-h-screen max-w-7xl mx-auto mt-5 md:mt-10 px-4">
          <motion.div
            className="text-[10px] md:text-sm text-gray-500 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NavLink
              to="/vendors"
              className="hover:underline text-amber-600 font-semibold"
            >
              Vendors
            </NavLink>{" "}
            &gt;{" "}
            <span className="font-semibold text-gray-700 capitalize">
              {decodeURIComponent(shopName.replace(/-/g, " "))}
            </span>
          </motion.div>
          <div className="min-h-100 flex items-center justify-center max-w-7xl mx-auto mt-10 px-15 text-center">
            <p className="w-full min-h-50 flex flex-col items-center justify-center pb-6 text-sm md:text-md text-center text-gray-400">
              <InboxIcon fontSize="large" className="mb-2 text-gray-300" />
              {error}
            </p>
          </div>
        </div>
      </>
    );
  }

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
      <Helmet>
        <title>{`${decodeURIComponent(
          shopName.replace(/-/g, " ")
        )} | Products on BoostKE`}</title>
        <meta
          name="description"
          content={`Explore products offered by ${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )} on BoostKE. View listings, prices, and descriptions to shop with confidence.`}
        />
        <meta
          name="keywords"
          content={`products by ${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )}, ${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )} shop, vendor products, BoostKE listings, online marketplace Kenya`}
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content={`${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )} | Products on BoostKE`}
        />
        <meta
          property="og:description"
          content={`Discover items available at ${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )}. Find the latest products and deals from this verified BoostKE vendor.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://boostke.com/vendors/${shopName}/${shopId}`}
        />
        <meta
          property="og:image"
          content="https://boostke.com/assets/shop-preview.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )} | Products on BoostKE`}
        />
        <meta
          name="twitter:description"
          content={`Shop top products from ${decodeURIComponent(
            shopName.replace(/-/g, " ")
          )} on BoostKE. Verified listings, fair prices, and trusted quality.`}
        />
        <meta
          name="twitter:image"
          content="https://boostke.com/assets/shop-preview.jpg"
        />
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto mt-5 md:mt-10 px-2 md:px-4">
        <motion.div
          className="text-[10px] md:text-sm text-gray-500 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <NavLink
            to="/vendors"
            className="hover:underline text-amber-600 font-semibold"
          >
            Vendors
          </NavLink>{" "}
          &gt;{" "}
          <span className="font-semibold text-gray-700 capitalize">
            {decodeURIComponent(shopName.replace(/-/g, " "))}
          </span>
        </motion.div>

        <h3 className="text-sm">Our Products</h3>

        <motion.div
          className="max-w-7xl mx-auto mt-5 md:mt-10 px-0 md:px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-[50vh]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {loadData ? (
            listings.map((listing) => {
              const listingImage = listing_image(listing.photos);

              return (
                <motion.div
                  key={listing.listing_id}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white rounded-md shadow-md overflow-hidden transform transition duration-300"
                >
                  <NavLink
                    to={`/view/${listing.title}/${listing.listing_id}`}
                    className="block"
                  >
                    <div className="bg-orange-50 h-50">
                      <LazyLoadImage
                        src={getPhotoUrl(listingImage)}
                        alt={listing.title}
                        className="!w-full !h-50 object-cover" // force Tailwind classes
                        wrapperClassName="w-full h-50" // set wrapper size explicitly
                        effect="blur"
                      />
                    </div>

                    <div className="p-2 md:p-4 flex flex-col justify-between gap-2">
                      <time className="inline-block text-xs font-semibold text-gray-500">
                        {new Date(listing.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                      <p className="text-xs font-semibold line-clamp-1">
                        {listing.title}
                      </p>
                      <p className="text-xs text-gray-800 line-clamp-2">
                        {listing.description}
                      </p>
                      <p className="text-xs text-green-600 font-bold">
                        Ksh {parseFloat(listing.price).toLocaleString("en-US")}
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
                        item_type: 'product'
                      }}
                      variant="button"
                      size="small"
                      showQuantity={true}
                    />
                  </Box>
                </motion.div>
              );
            })
          ) : (
            <>
              {[...Array(10)].map((_, index) => (
                <div key={index} className="product">
                  <Skeleton variant="rectangular" width="100%" height="78%" />
                  <Skeleton width="80%" height={20} />
                  <Skeleton width="60%" />
                  <Skeleton width="20%" height={10} />
                </div>
              ))}
            </>
          )}

          <div className="listings-end"></div>
        </motion.div>

        {loading && (
          <div className="homepage_listings_loader">
            <CircularProgress thickness={6} size={25} color="secondary" />
          </div>
        )}
      </div>
    </>
  );
};

export default ShopProducts;
