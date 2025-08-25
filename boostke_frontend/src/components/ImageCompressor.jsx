import imageCompression from "browser-image-compression";

const handleImageUpload = async (event) => {
  const imageFile = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log("Original size:", imageFile.size / 1024, "KB");
    console.log("Compressed size:", compressedFile.size / 1024, "KB");

    // Proceed to upload compressedFile
  } catch (error) {
    console.error("Compression error:", error);
  }
};

<input type="file" accept="image/*" onChange={handleImageUpload} />;
