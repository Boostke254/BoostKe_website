import React from "react";
import { motion } from "framer-motion";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useEffect } from "react";

const ComingSoon = () => {
  useEffect(() => {
    // Scroll to top when the component mounts or the location changes
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center min-h-[50vh] p-6 bg-amber-50 rounded-2xl shadow-md"
    >
      <div className="bg-amber-100 p-4 rounded-full mb-4">
        <AccessTimeIcon fontSize="large" sx={{ color: "#fb923c" }} />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-2">
        Feature Coming Soon
      </h2>

      <p className="text-sm md:text-base text-gray-600 max-w-md mb-6">
        We're working on something exciting. Stay tuned for this new feature
        launch—it’s going to be worth the wait!
      </p>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white px-5 py-2 rounded-full cursor-pointer flex items-center gap-2"
      >
        <RocketLaunchIcon fontSize="small" />
        <span>Notify Me</span>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoon;
