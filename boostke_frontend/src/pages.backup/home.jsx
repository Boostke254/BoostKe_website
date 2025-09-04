import { useState } from "react";
import "../css/style.css";
// import Banner from "../components/bannerCarousel";
import banner2 from "../images/HOME-PAGE-IMAGE-1.jpg";
import { counties } from "../components/Counties.js";
import Homelistings from "../components/Homelistings.jsx";
import { Helmet } from "react-helmet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { NavLink } from "react-router-dom";
import ProductCategories from "../components/ProductCategories.jsx";
import ServicesCategory from "../components/ServicesCategory.jsx";

function Home() {
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleCountyChange = (e) => setSelectedCounty(e.target.value);
  const handlePriceChange = (e) => setSelectedPriceRange(e.target.value);
  const handleSortChange = (e) => setSelectedSort(e.target.value);

  return (
    <div className="homepage_listings">
      <Helmet>
        <title>Boost KE</title>
        <meta
          name="description"
          content="Welcome to Boost KE, Kenya's leading marketplace."
        />
        <meta
          name="keywords"
          content="boostke, boost, marketplace, Boost Kenya, shopping, Boost KE"
        />
        <meta
          property="og:title"
          content="Boost KE | Kenya's No.1 Marketplace"
        />
        <meta
          property="og:description"
          content="Welcome to Boost KE, Kenya's leading marketplace."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* <div className="carousel home_carousel">
        <Banner />
      </div> */}

      <div className="relative flex flex-col justify-center items-center py-4 min-h-[20vh] md:min-h-[60vh]">
        <img
          className="w-[95vw] md:w-[90vw] h-auto object-cover"
          src={banner2}
          alt="Boost KE Ad"
        />

        <div className="absolute bottom-[-22%] md:bottom-[-5%] left-1/2 -translate-x-1/2 w-full flex flex-row justify-center items-center gap-1.5 md:gap-10 px-4">
          {/* Card 1 */}
          <a
            href="#marketplace"
            className="w-[32%] md:w-[20vw] lg:w-[15vw] bg-[#1b1c1ee1] p-2 md:p-3 rounded-sm md:rounded-lg flex flex-col gap-1 items-center text-white overflow-hidden"
          >
            <div className="flex items-center gap-2 font-semibold">
              <TrendingUpIcon sx={{ fontSize: 20 }} color="warning" />
              <h2 className="text-[11px] md:text-sm">Marketplace</h2>
            </div>
            <p className="font-light text-[10px] md:text-xs text-center md:px-4">
              Connect with buyers & sellers
            </p>
          </a>

          {/* Card 2 */}
          <NavLink
            to="/coming-soon"
            className="w-[32%] md:w-[20vw] lg:w-[15vw] bg-[#1b1c1ee1] p-2 md:p-3 rounded-sm md:rounded-lg flex flex-col gap-1 items-center text-white overflow-hidden"
          >
            <div className="flex items-center gap-2 font-semibold">
              <RememberMeIcon sx={{ fontSize: 20 }} color="warning" />
              <h2 className="text-[11px] md:text-sm">Membership</h2>
            </div>
            <p className="font-light text-[10px] md:text-xs text-center md:px-4">
              Unlock exclusive peaks & rewards
            </p>
          </NavLink>

          {/* Card 3 */}
          <NavLink
            to="/coming-soon"
            className="w-[32%] md:w-[20vw] lg:w-[15vw] bg-[#1b1c1ee1] p-2 md:p-3 rounded-sm md:rounded-lg flex flex-col items-center text-white overflow-hidden py-3"
          >
            <div className="flex items-center gap-2 font-semibold">
              <SmartToyIcon sx={{ fontSize: 20 }} color="warning" />
              <h2 className="text-[11px] md:text-sm">Nova</h2>
            </div>
            <p className="font-light text-[9px] md:px-4 md:text-xs text-center">
              AI-powered business assistance
            </p>
          </NavLink>
        </div>
      </div>

      <div className="px-2 md:px-[77px] mt-[60px] md:mt-[80px] min-h-70">
        <ProductCategories />
      </div>

      <div className="services_category px-2 md:px-[77px] mt-4 min-h-70">
        <ServicesCategory />
      </div>

      <div id="marketplace" className="px-2 md:px-[77px]">
        <h1 className="text-md md:text-2xl font-semibold">
          Explore Our Marketplace
        </h1>
      </div>
      <div className="products pt-1 pb-8">
        {/* <div className="hidden filters cats"> */}
        <div className="hidden">
          <div className="col-1">
            <select value={selectedCounty} onChange={handleCountyChange}>
              <option value="">Location:</option>
              {counties.map((county, index) => (
                <option key={index} value={county}>
                  {county}
                </option>
              ))}
            </select>

            <select value={selectedPriceRange} onChange={handlePriceChange}>
              <option value="">Price (Ksh):</option>
              <option value="1000">below 1000</option>
              <option value="1000-5000">1,000 - 5,000</option>
              <option value="5000-10000">5,000 - 10,000</option>
              <option value="10000-15000">10,000 - 15,000</option>
              <option value="15000-20000">15,000 - 20,000</option>
              <option value="20000-25000">20,000 - 25,000</option>
              <option value="25000-30000">25,000 - 30,000</option>
              <option value="30000">above 30,000</option>
            </select>
          </div>

          <select value={selectedSort} onChange={handleSortChange}>
            <option value="">Sort by:</option>
            <option value="Popular">Popular</option>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>

        <Homelistings
          selectedCounty={selectedCounty}
          selectedPriceRange={selectedPriceRange}
          selectedSort={selectedSort}
        />
      </div>
    </div>
  );
}

export default Home;
