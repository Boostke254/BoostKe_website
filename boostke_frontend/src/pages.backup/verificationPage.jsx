import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/verification.css"; // Add a new CSS file for custom styles
import { NavLink } from "react-router-dom";
import Back from "@mui/icons-material/ArrowBack";
import Alert from '@mui/material/Alert';


function Verification() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds

  const email = localStorage.getItem("email"); // Get email from localStorage

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }else{
        setIsResendDisabled(false);
    }
  }, [timeRemaining]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!verificationCode) {
      setErrMsg("Verification code is required.");
      setLoading(false);
      return;
    }

    try {
      // Send verification code along with email to the backend
      const response = await axios.post("user/verify", {
        email,
        verificationCode,
      });

      // On success, you could redirect to login or dashboard
      navigate("/login");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Invalid verification code or email.");
      } else if (error.response?.status === 500) {
        setErrMsg("Server Error");
      } else {
        setErrMsg("Verification failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerificationCode = async () => {
      setIsResendDisabled(true);
    try {
      const response = await axios.post("/user/resend-verification-code", {
        email,
      });

      setErrMsg(response.data.message);
      setTimeRemaining(120); // Reset timer after resend
    } catch (error) {
      setErrMsg(error.response?.data?.error || "Failed to resend verification code.");
    }
  };

  return (
    <div className="register">
      <div className="reg_image">
        <NavLink to="/">
          <Back sx={{ fontSize: 20 }} /> Homepage
        </NavLink>
        <div className="back_text">
          <h1>Start your luminous shopping journey with Boost KE</h1>
        </div>
      </div>
    
        <div className="verification py-5">
      <div className="verification-content mx-auto p-4 rounded shadow">
        <h2 className="text-center text-orange mb-4">Verify Your Account</h2>
        {isResendDisabled? <Alert severity="success">{errMsg}</Alert> : '' }
        <form onSubmit={handleSubmit} className="verification-form">
          <div className="form-group mb-3">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter Verification Code"
              className="form-control"
              required
            />
          </div>
          {loading ? (
            <button disabled={loading} className="loading_cursor btn btn-orange w-100">
              <CircularProgress thickness={6} size={18}/>
            </button>
          ) : (
            <button type="submit" className="btn btn-orange w-100">
              <b>Verify</b>
            </button>
          )}
        </form>
        <div className="text-center mt-3">
          <button
            onClick={handleResendVerificationCode}
            className={`btn btn-outline-orange ${isResendDisabled ? 'disabled' : ''}`}
            disabled={isResendDisabled}
          >
            {isResendDisabled ? `Resend code after ${timeRemaining}s` : 'Resend Verification Code'}
          </button>
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default Verification;
