import { NavLink, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import Back from "@mui/icons-material/ArrowBack";
import Image from "@mui/icons-material/Image";
import logo from "../images/logo_2.png";
import profile from "../images/profilee.png";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CircularProgress from "@mui/material/CircularProgress";
import imageCompression from "browser-image-compression";

const ProfilePhotoUpdate = ({ user }) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [image_add, setImage_add] = useState(null);
  const [imageName, setImageName] = useState("Choose new photo");
  const [previewImage, setPreviewImage] = useState(user?.photo_url || profile);

  const axiosPrivate = useAxiosPrivate();

  const backToProfile = () => {
    navigate("/profile");
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      setImage_add(compressedFile);
      setImageName(selectedFile.name);
    } catch (error) {
      console.error("Compression error:", error);
    }

    // Create a temporary URL for the selected image to preview it immediately
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("photo", image_add); // Only send the image

    try {
      const response = await axiosPrivate.put("/user/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handling the response after successful update
      alert("Profile photo updated successfully!");
      navigate("/profile");
    } catch (error) {
      // Handle the error as needed
      if (!error?.response) {
        setErrMsg("Photo size should be less than 5mb");
      } else if (error?.response.status === 400) {
        setErrMsg(error.response.data.error);
      } else if (error?.response.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        setErrMsg("Server failure!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="edit_profile_section">
        <NavLink to="/profile" className="pb-3">
          <Back color="warning" sx={{ fontSize: 35 }} />
        </NavLink>
        <h3>Edit Profile</h3>
        <div className="edit_panel_logo">
          <img src={logo} alt="logo" />
        </div>
      </div>

      {errMsg && (
        <Alert variant="filled" severity="error">
          {errMsg}
        </Alert>
      )}
      <div className="profile_photo">
        <label htmlFor="profile_pic_update" className="profile_pic_update">
          <img src={previewImage} alt="profile" /> {/* Use preview image */}
          <p className="pencil_icon">
            {imageName} <Image />
          </p>
        </label>
        <input
          type="file"
          id="profile_pic_update"
          onChange={handleImageChange}
          disabled={loading}
          required
          style={{ display: "none" }}
        />
      </div>
      <div className="buttons">
        {loading ? (
          <button className="loading_cursor" disabled>
            <CircularProgress
              thickness={6}
              size={20}
              sx={{ color: "#1b1c1e" }}
            />
          </button>
        ) : (
          <button type="submit">Update photo</button>
        )}
        <button type="button" onClick={backToProfile}>
          Discard
        </button>
      </div>
    </form>
  );
};

export default ProfilePhotoUpdate;
