import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../css/cat.css";
import { Helmet } from "react-helmet";
import ToggleTabs from "../components/ToggleTabs";
import { generalServices } from "../components/Services";
import { useEffect } from "react";

function Services() {
  const location = useLocation(); // ✅ React-aware location

  useEffect(() => {
    // Scroll to top when the component mounts or the location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Explore Reliable Services in Kenya | Boost KE</title>
        <meta
          name="description"
          content="Browse trusted service providers in Kenya. From plumbing to beauty, Boost KE connects you to quality services near you."
        />
        <meta
          property="og:title"
          content="Explore Reliable Services in Kenya | Boost KE"
        />
        <meta
          property="og:description"
          content="Browse trusted service providers in Kenya. From plumbing to beauty, Boost KE connects you to quality services near you."
        />
        <meta property="og:url" content="https://boostke.co.ke/services" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Boost KE" />
        <meta property="og:locale" content="en_KE" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://boostke.co.ke/services" />
      </Helmet>
      <ToggleTabs />
      <div className="categories_body flex gap-2">
        <div className="categories flex gap-3">
          <h5>BoostKE Services</h5>
          <hr />
          {generalServices.map((service) => (
            <NavLink
              className="text-decoration-none text-xs md:text-sm"
              key={service}
              to={`/services/${service}`}
            >
              {service}
            </NavLink>
          ))}
        </div>

        {location.pathname === "/services" ? (
          <div className="w-full min-h-50 flex flex-col px-2 md:px-0 pb-6 text-xs md:text-md text-gray-400 text-center md:text-left">
            <div className="mb-2 md:my-2">
              <h2 className="text-gray-500 font-semibold">
                Select a service to explore
              </h2>
              <p className="text-gray-400 text-[10px] md:text-xs">
                Browse through our extensive range of services to find exactly
                what you need. Or check out our featured listings below.
              </p>
            </div>
            <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-10 text-base md:text-lg text-center text-gray-400">
              <p>No Services posted at the moment.</p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default Services;
