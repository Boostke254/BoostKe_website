import edit_image from "../images/edit.png";
import ProfileChange from "../components/ProfileChange";
import { NavLink } from "react-router-dom";
import Back from "@mui/icons-material/ArrowBack";
import logo from "../images/logo_2.png";
import ProfilePhotoUpdate from "../components/ProfilePhotoUpdate";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Helmet } from "react-helmet";
import Footer from "../components/footer";
import Skeleton from "@mui/material/Skeleton";

function Edit() {
  const [userProfile, setUserProfile] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get("/user/user", {
          signal: controller.signal,
        });

        if (isMounted) {
          // Mapping the response to match the structure
          const mappedUser = {
            user_id: response.data.user_id,
            full_name: response.data.full_name,
            email: response.data.email,
            mobile: response.data.mobile,
            photo_url:
              response.data.photo_url ||
              "https://dummyimage.com/1280x720/fff/aaa",
            balance: response.data.balance,
            created_at: response.data.created_at,
          };
          setUserProfile(mappedUser);
        }
      } catch (error) {
        if (error["message"] !== "canceled") {
          console.log(error);
        }

        if (error?.response?.status === 401) {
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    getUser();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate]);

  return (
    <>
      <Helmet>
        <title>Boost KE | Edit profile page</title>
        <meta name="description" content="Edit your Boost KE profile." />
      </Helmet>

      <div className="edit_profile_page">
        <div className="edit_profile">
          <div className="side_back">
            <img src={edit_image} alt="background_image" />
          </div>

          <div className="forms">
            {userProfile ? (
              <>
                <ProfilePhotoUpdate user={userProfile} />
                <ProfileChange user={userProfile} />
                {/* <PasswordChange user_profile={userProfile} /> */}
              </>
            ) : (
              <>
                <form>
                  <div className="edit_profile_section">
                    <div className="edit_profile_section">
                      <NavLink to="/profile" className="pb-3">
                        <Back color="warning" sx={{ fontSize: 35 }} />
                      </NavLink>
                      <h3>Edit Profile</h3>
                      <div className="edit_panel_logo">
                        <img src={logo} alt="logo" />
                      </div>
                    </div>
                  </div>

                  <div className="profile_photo">
                    <Skeleton variant="circular" width="150px" height="150px" />
                  </div>
                  <div className="buttons">
                    <Skeleton width="50%" height={40} />
                    <Skeleton width="50%" height={40} />
                  </div>
                </form>

                <form>
                  <Skeleton width="60%" height={40} />
                  <Skeleton width="100%" height={40} />

                  <Skeleton width="60%" height={40} />
                  <Skeleton width="100%" height={40} />

                  <Skeleton width="60%" height={40} />
                  <Skeleton width="100%" height={40} />
                  <div className="buttons">
                    <Skeleton width="50%" height={40} />
                    <Skeleton width="50%" height={40} />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Edit;
