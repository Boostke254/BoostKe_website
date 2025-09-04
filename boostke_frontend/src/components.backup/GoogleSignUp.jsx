import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

const GoogleSignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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

        // Render Google Sign-Up button
        window.google.accounts.id.renderButton(
          document.getElementById("google-signup"),
          { theme: "outline", size: "large", text: "signup_with" } // Customize button
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
        navigate("/");
      }
    } catch (err) {
      console.error("Google Sign-Up failed", err);
    }
  };

  return <div id="google-signup"></div>;
};

export default GoogleSignUp;
