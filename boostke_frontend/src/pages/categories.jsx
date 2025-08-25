import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../css/cat.css";
import { Helmet } from "react-helmet";
import ToggleTabs from "../components/ToggleTabs";
import { productCategories } from "../components/Categories";
import Homelistings from "../components/Homelistings";
import { useEffect } from "react";

function Categories() {
  const location = useLocation(); // ✅ React-aware location

  useEffect(() => {
    // Scroll to top when the component mounts or the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Exploring different categories made easier! - Boost Kenya</title>
        <meta
          name="description"
          content="Explore a wide range of product categories at Boost KE, Kenya's leading marketplace. Find everything you need in one place."
        />
        <meta
          name="keywords"
          content="Boost KE, product categories, shopping, marketplace, Boost Kenya, boostke"
        />
        <meta
          property="og:title"
          content="Boost KE :: Exploring different categories made easier!"
        />
        <meta
          property="og:description"
          content="Explore a wide range of product categories at Boost KE, Kenya's leading marketplace. Find everything you need in one place."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostke.co.ke/categories" />
        <meta property="og:site_name" content="BoostKE" />
      </Helmet>

      <ToggleTabs />

      <div className="categories_body flex gap-2">
        <div className="categories flex gap-3">
          <h5>Product Categories</h5>
          <hr />
          {productCategories.map((category) => (
            <NavLink
              className="text-decoration-none"
              key={category}
              to={`/categories/${category}`}
            >
              {category}
            </NavLink>
          ))}
        </div>

        {location.pathname === "/categories" ? (
          <div className="w-full min-h-50 flex flex-col px-2 md:px-0 pb-6 text-xs md:text-md text-gray-400 text-center md:text-left">
            <div className="mb-2 md:my-2">
              <h2 className="text-gray-500 font-semibold">
                Select a category to explore
              </h2>
              <p className="text-gray-400 text-[10px] md:text-xs">
                Browse through our extensive range of categories to find exactly
                what you need. Or check out our featured listings below.
              </p>
            </div>
            <Homelistings />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Categories;
