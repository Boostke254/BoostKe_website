import banner from "../images/banner.svg";
import banner1 from "../images/banner1.svg";
import banner2 from "../images/banner3.svg";
import cars from "../images/cars.svg";
import apartments from "../images/apartments.svg";
import electronics from "../images/electronics.svg";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Banner() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [banner, banner1, banner2, cars, apartments, electronics];

  useEffect(() => {
    const preloadImages = () => {
      let loadedImagesCount = 0;
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImagesCount += 1;
          if (loadedImagesCount === images.length) {
            setImagesLoaded(true);
          }
        };
      });
    };

    preloadImages();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Auto switch image every 10 seconds

    return () => clearInterval(interval); // Clear interval on cleanup
  }, [images]);

  return (
    <>
      {imagesLoaded ? (
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-all duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  className="w-full h-auto object-cover"
                  src={src}
                  alt={`BoostKE Ad ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Optional: Add carousel controls (Previous and Next buttons) */}
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
              )
            }
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
              )
            }
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-64">
          <CircularProgress color="warning" />
        </div>
      )}
    </>
  );
}

export default Banner;
