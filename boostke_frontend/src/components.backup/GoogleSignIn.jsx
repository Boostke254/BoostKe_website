import "../css/forms.css";
import { useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "375389616803-cpl55trg7p8kafdk91qmriqk90ptk63o.apps.googleusercontent.com", // Replace with your client ID
          callback: handleGoogleSignUp,
        });

        // Render Google Sign-in button
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin"),
          { theme: "outline", size: "large", text: "signin_with" } // Customize button
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleSignUp = async (response) => {
    const idToken = response.credential;

    try {
      const res = await axios.post("/auth/user/google", { token: idToken });
      //console.log(res);

      if (res.status === 200) {
        login(res.data);
        navigate(from, { replace: true });
        // navigate("/shopping/home");
      }
    } catch (err) {
      console.error("Google Sign-In failed", err);
    }
  };

  return <div id="google-signin"></div>;
};

export default GoogleSignIn;
