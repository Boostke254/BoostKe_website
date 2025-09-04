import profile from "../images/profilee.png";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Info, Logout, Settings, Person } from "@mui/icons-material";
import { Card, CardContent, Avatar, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuth } from "../context/AuthProvider";
import { BASE_URL } from "../api/axios";
import MessageBadge from "./MessageBadge";
import ContactMail from "@mui/icons-material/ContactMail";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CartIcon from "./CartIcon";

const NavProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/user", {
          signal: controller.signal,
        });
        if (isMounted) setUser(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
        if (error?.response?.status === 401) logout();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, logout]);

  const profile_pic = (photo_url) =>
    photo_url ? getPhotoUrl(photo_url) : profile;

  const getPhotoUrl = (photo) =>
    photo.startsWith("http") ? photo : `${BASE_URL}${photo}`;

  const upperCaseUserName = (full_name) =>
    full_name.split(" ")[0].toUpperCase();

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;

  return user ? (
    <div className="flex items-center relative">
      {/* Enhanced Cart Icon with badge */}
      <div className="hidden md:block me-3">
        <CartIcon 
          showCount={true}
          color="inherit"
          size="medium"
        />
      </div>
      <div className="block md:hidden me-3">
        <CartIcon 
          showCount={true}
          color="inherit"
          size="small"
        />
      </div>
      
      <MessageBadge />

      <div className="relative" ref={popupRef}>
        <div
          onClick={() => setShowPopup(!showPopup)}
          className="cursor-pointer flex items-center"
        >
          <span className="hidden sm:inline-block text-amber-700 font-medium me-2 text-[10px]">
            {upperCaseUserName(user.full_name)}
          </span>
          <div className="hidden md:block">
            <Avatar
              className="border-2 border-orange-500"
              alt="profile"
              src={profile_pic(user.photo_url)}
            />
          </div>
          <div className="block md:hidden">
            <Avatar
              className="border-2 border-orange-500"
              alt="profile"
              src={profile_pic(user.photo_url)}
              sx={{ height: "28px", width: "28px" }}
            />
          </div>
        </div>

        {showPopup && (
          <Card className="absolute top-12 right-0 w-44 md:w-45 rounded-xl shadow-lg z-50 bg-white">
            <div className="w-full bg-gray-50 flex flex-col items-start gap-1 px-4 py-2 overflow-hidden">
              <p className="w-full line-clamp-1 text-[8px] font-semibold text-gray-700">
                {user?.full_name}
              </p>
              <p className="w-full line-clamp-1 text-[8px] font-normal text-gray-700">
                {user?.email}
              </p>
            </div>
            <Divider />
            <CardContent className="flex flex-col gap-3.5 p-4">
              <a
                href="/profile"
                className="flex items-center text-xs text-gray-700 hover:text-amber-500 hover:scale-105 transition-transform"
              >
                <Person sx={{ fontSize: "12px" }} aria-label="Profile icon" />
                <span className="ml-2 font-medium">Profile</span>
              </a>

              <a
                href="/editprofile"
                className="flex items-center text-xs text-gray-700 hover:text-amber-500 hover:scale-105 transition-transform"
              >
                <Settings
                  sx={{ fontSize: "12px" }}
                  aria-label="Settings icon"
                />
                <span className="ml-2 font-medium">Settings</span>
              </a>

              <a
                href="/contact"
                className="flex items-center text-xs text-gray-700 hover:text-amber-500 hover:scale-105 transition-transform"
              >
                <ContactMail
                  sx={{ fontSize: "12px" }}
                  aria-label="Contact icon"
                />
                <span className="ml-2 font-medium">Contact Us</span>
              </a>

              <a
                href="https://retail.boostke.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vendor Dashboard"
                className="flex items-center text-xs text-gray-700 hover:text-amber-500 hover:scale-105 transition-transform"
              >
                <StorefrontIcon
                  sx={{ fontSize: "12px" }}
                  aria-label="Business icon"
                />
                <span className="ml-2 font-medium">Business Dashboard</span>
              </a>

              <a
                href="https://services.boostke.co.ke/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Manage your BoostKE Services"
                className="flex items-center text-xs text-gray-700 hover:text-amber-500 hover:scale-105 transition-transform"
              >
                <DesignServicesIcon
                  sx={{ fontSize: "12px" }}
                  aria-label="Services icon"
                />
                <span className="ml-2 font-medium">Manage Services</span>
              </a>

              <a
                href="/faqs"
                className="flex items-center text-xs text-gray-700 hover:text-amber-500 hover:scale-105 transition-transform"
              >
                <Info sx={{ fontSize: "12px" }} aria-label="Info icon" />
                <span className="ml-2 font-medium">FAQs</span>
              </a>

              <button
                onClick={logout}
                className="flex items-center text-xs text-red-500 hover:text-red-700 cursor-pointer hover:scale-105 transition-transform"
              >
                <Logout sx={{ fontSize: "12px" }} />
                <span className="ml-2 font-medium">Logout</span>
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  ) : (
    <div className="border-1 md:border-2 border-amber-500 rounded-sm md:rounded-md flex items-center justify-center py-1 md:py-2 px-3 md:px-4 text-[10px] md:text-base text-amber-500 font-medium hover:bg-amber-500 hover:text-white transition">
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};

export default NavProfile;
