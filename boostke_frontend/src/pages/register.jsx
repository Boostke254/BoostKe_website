import "../css/forms.css";
import Back from "@mui/icons-material/ArrowBack";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";
import VerificationAlert from "../components/VerificationAlert";
import { Helmet } from "react-helmet";
import GoogleSignUp from "../components/GoogleSignUp";
import CircularProgress from "@mui/material/CircularProgress";

const REG_URL = "/user/register";

function Register() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [selectedCode, setSelectedCode] = useState("254");
  const [number, setNumber] = useState(7);
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [accurate, setAccurate] = useState(false);
  const [phoneError, setPhoneError] = useState(null);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format!");
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setEmailError("Invalid email format!");
      setLoading(false);
      return;
    }

    const combinedNumber = selectedCode + number;

    if (cpassword !== password) {
      setAccurate(true);
      setLoading(false);
    } else {
      setAccurate(false);
      const formData = new FormData();
      formData.append("full_Name", name);
      formData.append("email", email);
      formData.append("mobile", combinedNumber);
      formData.append("password", password);

      try {
        // Post the registration data
        await axios.post(REG_URL, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Store email in localStorage
        localStorage.setItem("email", email);

        // After successful registration, redirect to verification page
        navigate("/verification"); // Change to your verification page route
      } catch (error) {
        console.log("Status code:", error.response.data.error);
        if (!error?.response) {
          setErrMsg("No Server Response");
        } else if (error.response?.status === 400) {
          setErrMsg(error.response.data.error);
        } else if (error.response?.status === 401) {
          setErrMsg(error.response.data.error);
        } else if (error.response?.status === 500) {
          setErrMsg("Server Error");
        } else {
          setErrMsg("Registration Failed");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setNumber(newPhoneNumber);

    if (newPhoneNumber.length !== 9 && newPhoneNumber.length > 1) {
      setPhoneError("Invalid phone number entered!");
    } else {
      setPhoneError(null);
    }
  };

  const handleCodeChange = (e) => {
    setSelectedCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length === 0) {
      setPasswordError(null);
    } else if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!/[A-Za-z]/.test(newPassword)) {
      setPasswordError("Password must contain at least one letter.");
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("Password must contain at least one number.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError(null);
    }
  };

  return (
    <div className="register">
      <Helmet>
        <title>Boost KE | Registration page</title>
        <meta
          name="description"
          content="Register for a new account on Boost KE and start your shopping journey."
        />
        <meta
          name="keywords"
          content="Boost KE, registration, create account, marketplace, Boost Kenya, boostke"
        />
        <meta property="og:title" content="Boost KE | Registration page" />
        <meta
          property="og:description"
          content="Register for a new account on Boost KE and start your shopping journey."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="reg_image">
        <a href="/">
          <Back sx={{ fontSize: 20 }} /> Homepage
        </a>
        <div className="back_text">
          <h1>Start your luminous shopping journey with Boost KE</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold md:text-xl">Account Registration</h1>
        <VerificationAlert
          message={accurate ? "Passwords do not match!" : errMsg}
          severity="error"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Names"
          disabled={loading}
          required
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email address"
          disabled={loading}
          required
        />
        {emailError && (
          <p style={{ color: "red", margin: 0, fontSize: 14 }}>{emailError}</p>
        )}

        <div className="dropdown">
          <select
            value={selectedCode}
            onChange={handleCodeChange}
            disabled={loading}
          >
            <option value="254">254</option>
            <option value="255" disabled>
              255
            </option>
            <option value="256" disabled>
              256
            </option>
          </select>
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            disabled={loading}
            required
          />
        </div>
        {phoneError && (
          <p style={{ color: "red", margin: 0, fontSize: 14 }}>{phoneError}</p>
        )}

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          disabled={loading}
          required
        />
        {passwordError && (
          <p style={{ color: "red", margin: 0, fontSize: 12 }}>
            {passwordError}
          </p>
        )}
        <input
          type="password"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          placeholder="Confirm password"
          disabled={loading}
          required
        />

        <div className="reg_link">
          <p className="mb-2">
            By signing up, you agree to our{" "}
            <a href="/rules">
              <b>Terms & Privacy Policy</b>
            </a>
          </p>
          {loading ? (
            <button disabled={loading} className="loading_cursor">
              <CircularProgress />
            </button>
          ) : (
            <button type="submit">
              <b>Sign Up</b>
            </button>
          )}
          <div className="login_btn_divider text-center d-flex text-secondary py-2">
            <div></div>
            or <div></div>
          </div>
          <div className="w-full mb-3 flex items-center justify-center">
            <GoogleSignUp />
          </div>
          <p className="flex items-center gap-1 justify-center md:justify-start">
            Already registered?
            <a href="/login">
              <b>Login</b>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
