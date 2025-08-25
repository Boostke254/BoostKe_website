import profile_default from "../images/profilee.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mpesa from "../components/Mpesa";
import MyListings from "../components/MyListings";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/ShoppingCart";
import CalIcon from "@mui/icons-material/CalendarMonth";
import TelIcon from "@mui/icons-material/Phone";
import Shop from "@mui/icons-material/House";
import House from "@mui/icons-material/Apartment";
import Post_Add from "@mui/icons-material/Add";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../context/AuthProvider";
import { Helmet } from "react-helmet";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

import ExploreIcon from "@mui/icons-material/Explore";
import ListingsSlider from "../components/ListingsSlider";

function Profile() {
  const [loadData, setLoadData] = useState(false);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { user, logout } = useAuth();

  // console.log(user)

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/user", {
          signal: controller.signal,
        });

        //console.log(response.data);

        if (isMounted) {
          setProfile(response.data);
          setLoadData(true);
          setEmail(response.data.email);
          setBalance(response.data.balance);
        }
      } catch (error) {
        if (error?.message !== "canceled") {
          console.log(error);
        }

        if (error?.response?.status === 401) {
          logout();
        }
      }
    };

    getUser();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate]);

  const profile_pic = (full_url) => {
    // let newUrl = full_url ? `http://localhost:5000/${full_url}` : "";
    return full_url || profile_default;
  };

  const upperCaseUserName = (profile_name) => {
    return profile_name.charAt(0).toUpperCase() + profile_name.slice(1);
  };

  const goToShop = () => {
    window.location.href = "https://retail.boostke.co.ke";
  };

  const goToHousing = () => {
    window.location.href = "/coming-soon";
  };

  const goToServices = () => {
    window.location.href = "https://services.boostke.co.ke";
  };

  return (
    <div className="dashboard">
      <Helmet>
        <title>User Profile page | Boost KE</title>
        <meta
          name="description"
          content="View and manage your profile on Boost KE."
        />
        <meta
          name="keywords"
          content="Boost KE, profile, user profile, manage profile, Kenya marketplace, boostke, Boost Kenya"
        />
        <meta property="og:title" content="Boost KE | Profile page" />
        <meta
          property="og:description"
          content="View and manage your profile on Boost KE."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="profile_dashboard">
        {loadData ? (
          <>
            <div className="text-center">
              <div>
                {profile.photo_url ? (
                  <img src={profile_pic(profile.photo_url)} alt="profile" />
                ) : (
                  <img src={profile_default} alt="profile" />
                )}
                <NavLink to="/editprofile" className="edit-prof-link">
                  Edit profile
                </NavLink>
              </div>
              <h5 className="profile_name_h5">
                <PersonIcon fontSize="20" />:{" "}
                {upperCaseUserName(profile.full_name)}
              </h5>
            </div>

            <div className="bg-white w-1/2 md:w-full mx-auto overflow-ellipsis">
              <h6 className="text-orange-600 text-md font-semibold mb-4 border-b border-orange-100 pb-2">
                Your Details
              </h6>
              <p className="flex items-center gap-2 text-gray-700 mb-2 truncate w-full">
                <span className="text-orange-500">
                  <EmailIcon />
                </span>
                <span className="text-[10px] md:text-sm truncate w-full">
                  {profile.email}
                </span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 mb-2">
                <span className="text-orange-500">
                  <TelIcon />
                </span>
                <span className="text-[10px] md:text-sm">{profile.mobile}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <span className="text-orange-500">
                  <CalIcon />
                </span>
                <span className="text-xs md:text-sm">
                  {new Date(profile.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>

            <div className="buttons flex flex-col gap-3 mt-4">
              <a
                className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow transition-all duration-200 cursor-pointer"
                href="/coming-soon"
              >
                <Post_Add />
                <span className="font-medium text-xs md:text-md">
                  Apply as a Freelancer
                </span>
              </a>

              <button
                onClick={goToHousing}
                className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow transition-all duration-200 cursor-pointer"
              >
                <House />
                <span className="font-medium text-xs md:text-md">
                  Showcase your Innovation
                </span>
              </button>

              <button
                onClick={goToShop}
                className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow transition-all duration-200 cursor-pointer"
              >
                <Shop />
                <span className="font-medium text-xs md:text-md">
                  Manage Your Shop
                </span>
              </button>

              <button
                onClick={goToServices}
                className="flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow transition-all duration-200 cursor-pointer"
              >
                <DesignServicesIcon />
                <span className="font-medium text-xs md:text-md">
                  Manage Your Services
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <Skeleton variant="square" width="150px" height="120px" />
              <Skeleton width="80%" height={20} />
            </div>

            <div className="profile_dash_details">
              <Skeleton width="80%" height="40%" />
              <Skeleton width="100%" height={30} />
              <Skeleton width="80%" height={30} />
              <Skeleton width="80%" height={30} />
            </div>

            <div className="buttons">
              <Skeleton width="100%" height={60} />
              <Skeleton width="100%" height={60} />
            </div>
          </>
        )}
      </div>

      <div className="profile_details">
        <div className="wallet">
          <h5>Profile Dashboard</h5>
          <p className="text-secondary my-2 md:my-0">
            Wallet Balance:{" "}
            <b>
              ksh{" "}
              {balance
                ? parseFloat(balance).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : 0.0}
            </b>
          </p>

          <Mpesa />
        </div>
        <div className="recent">
          <h5>Your Recent Listings</h5>
          <div className="my-listings">
            {loadData ? (
              <MyListings profileEmail={email} />
            ) : (
              <div className="slider-container">
                {[...Array(2)].map((_, index) => (
                  <NavLink className="user_listing product card" key={index}>
                    <div className="img">
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="user_listing_details">
                      <div className="date">
                        <Skeleton width="50%" height="10%" />
                        <div>
                          <Skeleton width="50px" height="35px" />
                          <Skeleton width="50px" height="35px" />
                        </div>
                      </div>
                      <Skeleton width="60%" height="30%" />
                      <Skeleton width="60%" height="30%" />
                      <Skeleton width="60%" height="30%" />
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col gap-3 max-w-md mb-8">
          <h2 className="text-lg font-semibold text-gray-800">
            Explore Opportunities
          </h2>

          <a
            href="/categories"
            className="inline-flex items-center justify-between text-sm text-orange-600 hover:underline"
          >
            Explore Popular Categories
            <ArrowForwardIcon fontSize="small" />
          </a>

          <a
            href="/services"
            className="inline-flex items-center gap-1 rounded-md bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10 hover:bg-pink-100 transition"
          >
            <ExploreIcon fontSize="small" />
            Discover BoostKE Services
          </a>
        </div>

        <div className="mb-10">
          <ListingsSlider />
        </div>
      </div>
    </div>
  );
}

export default Profile;
