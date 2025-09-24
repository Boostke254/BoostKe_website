import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FallbackImage from "./FallbackImage";

const Carousel = ({ photos, onImageClick, category = "default" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Carousel */}
      <div className="relative w-full h-64 md:h-100 mb-4">
        <div className="overflow-hidden rounded-md border border-gray-100 shadow-sm h-full">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={photos[currentIndex]}
              className="w-full h-64 md:h-100"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <FallbackImage
                src={photos[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-64 md:h-100 object-contain cursor-pointer"
                category={category}
                onClick={() => onImageClick(photos[currentIndex])}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition cursor-pointer hover:bg-gray-100"
        >
          <NavigateBeforeIcon />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-100 transition cursor-pointer hover:bg-gray-100"
        >
          <NavigateNextIcon />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center bg-gray-50 py-2 items-center gap-2 overflow-x-auto scrollbar-hide">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded overflow-hidden border-2 cursor-pointer transition duration-300 ${
              index === currentIndex
                ? "border-orange-500"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <FallbackImage
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              category={category}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
