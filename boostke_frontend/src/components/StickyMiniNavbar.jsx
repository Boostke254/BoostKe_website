import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/boost_logo.png";

const StickyMiniNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-[9px] md:text-xs font-medium py-1 md:p-2 transition ${
      isActive
        ? "text-black border-b-1 border-black"
        : "text-gray-600 hover:text-black"
    }`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed flex items-center justify-between gap-1 md:gap-10 top-0 left-0 right-0 bg-white shadow z-50 px-2 md:px-[77px]">
      <div className="flex items-center justify-center w-10 md:w-14">
        <img
          src={Logo}
          alt="Boost KE Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex w-full md:w-fit justify-around md:justify-center md:gap-2 py-2">
        <NavLink className={linkClasses} to="/">
          Home
        </NavLink>
        <NavLink className={linkClasses} to="/categories">
          Products
        </NavLink>
        <NavLink className={linkClasses} to="/services">
          Services
        </NavLink>
        <NavLink className={linkClasses} to="/vendors">
          Vendors
        </NavLink>
        {/* <NavLink className={linkClasses} to="/innovators">
          Innovators
        </NavLink> */}
        <NavLink className={linkClasses} to="/freelance">
          Freelancers
        </NavLink>
        <NavLink className={linkClasses} to="/profile">
          My Account
        </NavLink>
      </div>
    </div>
  );
};

export default StickyMiniNavbar;
