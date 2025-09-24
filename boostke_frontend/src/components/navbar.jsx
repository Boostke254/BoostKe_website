import { NavLink } from "react-router-dom";
import "../css/components.css";
import Logo from "../images/boost_logo.png";
import NavProfile from "./NavProfile";
import SearchBar from "../components/SearchBar.jsx";

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `text-[10px] md:text-base px-2 pb-1 ${
      isActive
        ? "text-[#0c0e0c] border-b-2 border-[#0c0e0c]"
        : "text-white hover:text-gray-700"
    }`;

  return (
    <nav className="main_shopping_navbar">
      <div className="header">
        <div className="h-5 md:h-8 w-fit flex items-center justify-center overflow-hidden">
          <img
            src={Logo}
            className="h-full w-fit object-contain"
            alt="Boost Kenya Logo"
          />
        </div>

        <SearchBar />

        <NavProfile />
      </div>

      <ul className="flex items-center justify-around bg-[#ffa500] text-white md:p-2 pb-2">
        <li>
          <NavLink className={linkClasses} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/marketplace">
            Marketplace
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/vendors">
            Vendors
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/innovators">
            Innovators
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/freelance">
            Freelance
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/franchise">
            Franchise
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/kncci">
            KNCCI
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/blog">
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClasses} to="/ambassadors">
            Ambassadors
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
