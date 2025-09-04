import { useState, useEffect } from "react";
import axios from "../api/axios";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import { NavLink } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
import ListingsSlider from "../components/ListingsSlider";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const Shops = () => {
  const [shops, setShops] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("/shops/all");
        setShops(response.data.shops);
      } catch (err) {
        setError("Failed to fetch shops. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <>
      <Helmet>
        <title>Explore Verified Vendors and Shops on BoostKE</title>
        <meta
          name="description"
          content="Discover a wide range of trusted vendors and businesses on BoostKE. Browse shop profiles, see products offered, and connect with professionals across Kenya."
        />
        <meta
          name="keywords"
          content="vendors, shops, online marketplace, Kenyan businesses, professional services, BoostKE, vendor listings, shop directory"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Explore Verified Vendors and Shops on BoostKE"
        />
        <meta
          property="og:description"
          content="Find and connect with verified vendors on BoostKE. Explore shop details and learn about services offered by professionals in various industries."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostke.co.ke/vendors" />
        <meta
          property="og:image"
          content="https://boostke.co.ke/assets/vendor-preview.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Explore Verified Vendors and Shops on BoostKE"
        />
        <meta
          name="twitter:description"
          content="Browse professional shops and vendors offering quality services across Kenya, exclusively on BoostKE."
        />
        <meta
          name="twitter:image"
          content="https://boostke.co.ke/assets/vendor-preview.jpg"
        />
      </Helmet>
      <div className="max-w-7xl mx-auto px-2 md:p-4 min-h-screen">
        <motion.h2
          id="vendors"
          className="text-sm md:text-xl text-gray-700 font-semibold text-center md:text-left mt-3 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Vendors on the platform
        </motion.h2>

        {loading && (
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
        )}

        {error && (
          <div className="my-4">
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </div>
        )}

        {!loading && !error && (!shops || shops.length === 0) && (
          <motion.div
            className="text-center text-yellow-800 bg-yellow-100 py-4 px-6 rounded-md shadow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No vendors available at the moment. Please check back later!
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mb-10"
        >
          {shops &&
            shops.map(
              (shop) =>
                shop.shop_logo && (
                  <motion.div key={shop.shop_id} variants={cardVariants}>
                    <NavLink
                      onClick={() =>
                        (window.location.href = `/vendors/${shop.shop_name}/${shop.shop_id}`)
                      }
                      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-full h-35 md:h-60 overflow-hidden bg-amber-100">
                          <LazyLoadImage
                            src={
                              shop.shop_logo ||
                              "https://via.placeholder.com/150"
                            }
                            alt={`${shop.shop_name} shop`}
                            effect="blur"
                            className="!w-full !h-full object-cover"
                            wrapperClassName="w-full h-full"
                          />
                        </div>
                        <div className="px-4 py-4 flex flex-col justify-between gap-2">
                          <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-gray-500">
                            <CalendarTodayIcon sx={{ fontSize: 16 }} />
                            <time>
                              {new Date(shop.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </time>
                          </div>

                          <div className="flex items-center gap-1 md:gap-2 font-bold text-xs md:text-md line-clamp-1">
                            <StorefrontIcon sx={{ fontSize: 18 }} />
                            <span className=" line-clamp-2">
                              {shop.shop_name}
                            </span>
                          </div>

                          <div className="text-gray-700 text-[10px] md:text-xs line-clamp-2">
                            <span>{shop.shop_description}</span>
                          </div>
                        </div>
                      </motion.div>
                    </NavLink>
                  </motion.div>
                )
            )}
        </motion.div>

        <div className="mb-10">
          <ListingsSlider />
        </div>
      </div>
    </>
  );
};

export default Shops;
