import "../css/forms.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import Alert from "@mui/material/Alert";
import Back from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";
import Logo from "../images/boost_logo.png";
import { useAuth } from "../context/AuthProvider";
import GoogleSignIn from "../components/GoogleSignIn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LOGIN_URL = "/user/login";

function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });

      // console.log(response.data)
      login(response.data);

      const accessToken = response?.data?.token; // Updated to match backend
      // setAuth({ accessToken });
      // localStorage.setItem("accessToken", accessToken);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Server Timeout");
      } else if (error?.response.status === 400) {
        setErrMsg(error.response.data.error);
      } else if (error?.response.status === 403) {
        setErrMsg("Please verify your email first.");
      } else if (error?.response.status === 401) {
        setErrMsg("Invalid login details!");
      } else if (error?.response.status === 500) {
        setErrMsg("Server failure!");
      } else {
        setErrMsg("Login Failed");
      }

      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Go back function
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login">
      <Helmet>
        <title>Boost KE :: Login page</title>
        <meta
          name="description"
          content="Login to Boost KE to access your account and explore our services."
        />
        <meta
          name="keywords"
          content="Boost KE, login, user account, marketplace, Boost Kenya, boostke"
        />
        <meta property="og:title" content="Boost KE :: Login page" />
        <meta
          property="og:description"
          content="Login to Boost KE to access your account and explore our services."
        />
        <meta property="og:url" content="https://boostke.co.ke/login" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BoostKE" />
      </Helmet>
      <div className="login_image">
        <button onClick={handleGoBack}>
          <Back sx={{ fontSize: 20 }} /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="h-8 mt-[20%] mb-4 flex">
          <img
            src={Logo}
            className="h-8 w-fit object-contain"
            alt="BoostKE Logo"
          />
        </div>

        <h2 className="text-lg md:text-2xl">Welcome Back,</h2>
        {errMsg ? (
          <Alert variant="filled" severity="error">
            {errMsg}
          </Alert>
        ) : (
          ""
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter email address"
          disabled={loading}
          required
          className="email_input"
          autoComplete="email"
        />
        <div className="password-input-wrapper border-1 border-gray-700 flex items-center relative p-4 rounded-md">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={loading}
            autoComplete="current-password"
            className="flex-grow-1 border-none outline-none"
            required
          />
          <span
            className="toggle-password text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </span>
        </div>

        <div className="reg_link">
          <div className="fp">
            <NavLink to="/forgotpassword">forgot password?</NavLink>
          </div>
          {loading ? (
            <button className="loading_cursor" disabled>
              <CircularProgress
                thickness={6}
                size={18}
                sx={{ color: "#1b1c1e" }}
              />
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
          <div className="login_btn_divider text-center d-flex text-secondary py-2">
            <div></div>
            or <div></div>
          </div>
          <div className=" flex items-center justify-center">
            <GoogleSignIn /> {/* Google Sign-In Button */}
          </div>
          <p>
            Not registered? <a href="/register">Create account</a>{" "}
          </p>
        </div>

        <div className="login_form_footer">
          2025 &copy; Boost KE | <a href="/rules">Terms & Conditions</a>
        </div>
      </form>

      <div className="login_footer">
        Copyright &copy; 2025 <span className="ps-2 pe-2">|</span> Boost KE{" "}
        <span className="ps-2 pe-2">|</span>{" "}
        <NavLink to="/rules">Terms & Conditions</NavLink>
      </div>
    </div>
  );
}

export default Login;
