import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BuildIcon from "@mui/icons-material/Build";
import CategoryIcon from "@mui/icons-material/Category";

export default function ToggleTabs() {
  const [activeTab, setActiveTab] = useState("categories");

  useEffect(() => {
    if (window.location.pathname.includes("services")) {
      setActiveTab("services");
    } else {
      setActiveTab("categories");
    }
  }, []);

  return (
    <div className="hidden relative w-fit md:mx-[77px] mx-auto my-2 md:mt-3 md:mb-1 bg-white rounded-md shadow-sm md:shadow-md">
      <div className="flex relative w-64 h-12 overflow-hidden rounded-md">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`absolute top-0 bottom-0 w-1/2 rounded-md bg-orange-100 z-0 ${
            activeTab === "services" ? "left-1/2" : "left-0"
          }`}
        />
        <button
          onClick={() => (window.location.href = "/categories")}
          className={`z-10 flex items-center justify-center w-1/2 px-2 py-1 md:p-2 font-medium transition-colors duration-200 rounded-md cursor-pointer text-[10px] md:text-xs ${
            activeTab === "categories"
              ? "text-orange-600"
              : "text-blue-600 hover:text-orange-500"
          }`}
        >
          <CategoryIcon fontSize="small" className="mr-2" />
          Product Categories
        </button>
        <button
          onClick={() => (window.location.href = "/services")}
          className={`z-10 flex items-center justify-center w-1/2 px-2 py-1 md:p-2 font-medium transition-colors duration-200 cursor-pointer rounded-md text-[10px] md:text-xs ${
            activeTab === "services"
              ? "text-orange-600"
              : "text-blue-600 hover:text-orange-500"
          }`}
        >
          <BuildIcon fontSize="small" className="mr-2" />
          Services
        </button>
      </div>
    </div>
  );
}
