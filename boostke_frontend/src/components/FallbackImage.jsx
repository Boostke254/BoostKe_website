import React, { useState } from "react";

const FallbackImage = ({
  src,
  alt,
  className = "",
  category = "default",
  fallbackText = "BOOST KE",
  width = 200, // default width
  height = 200, // default height
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
    setImageError(false);
  };

  // Generate fallback based on category
  const getFallbackSrc = () => {
    const baseUrl = `${
      import.meta.env.VITE_BASE_URL || "http://localhost:5000"
    }/uploads/placeholders`;
    const categoryMap = {
      Fashion: `${baseUrl}/fashion-placeholder.jpg`,
      Furnitures: `${baseUrl}/furniture-placeholder.png`,
      "Computers & Accessories": `${baseUrl}/tech-placeholder.png`,
      Foods: `${baseUrl}/food-placeholder.jpg`,
      default: `${baseUrl}/general-placeholder.jpg`,
    };
    return categoryMap[category] || categoryMap.default;
  };

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 ${className}`}
        style={{ width, height }}
        {...props}
      >
        <div className="text-center">
          <div className="text-blue-600 font-bold text-lg mb-2">
            {fallbackText}
          </div>
          <div className="text-blue-500 text-sm opacity-75">
            {category !== "default" ? category : "Product Image"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      {loading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${className}`}
          {...props}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <div className="text-gray-500 text-sm">Loading...</div>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} object-contain ${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
};

export default FallbackImage;
