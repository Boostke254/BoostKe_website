import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileChange = ({ user }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState(7);
  const [names, setNames] = useState(7);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const backToProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    if (user) {
      setNames(user.full_name);
      setNumber(user.mobile);
      setEmail(user.email);
    }
  }, [user]);

  const handleNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setNumber(newPhoneNumber);

    // number validation logic
    if (newPhoneNumber.length !== 10 && newPhoneNumber.length > 1) {
      setPhoneError("Invalid Phone Number");
    } else {
      setPhoneError(null);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Invalid Email Address");
    } else {
      setEmailError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // number validation logic
    if (number.length !== 10 && number.length > 1) {
      setPhoneError("Invalid Phone Number");
      return;
    }

    // email validation logic
    if (!validateEmail(email)) {
      setEmailError("Invalid Email Address");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("full_name", names);
    formData.append("email", email);
    formData.append("mobile", number);

    try {
      await axiosPrivate.put("/user/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Successfully updated your details!");
      navigate("/profile");
    } catch (error) {
      if (!error?.response) {
        setErrMsg(error.message);
      } else if (error?.response.status === 400) {
        setErrMsg(error.response.data.error);
      } else if (error?.response.status === 401) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else if (error?.response.status === 500) {
        setErrMsg("Request Failed!");
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errMsg && (
        <Alert variant="filled" severity="error">
          {errMsg}
        </Alert>
      )}
      <label htmlFor="names">Full Names</label>
      <input
        type="text"
        id="names"
        value={names}
        onChange={(e) => setNames(e.target.value)}
        placeholder="Full Names"
        required
      />

      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email Address"
        required
      />
      {emailError && (
        <p style={{ color: "red", margin: 0, fontSize: 12, paddingBottom: 10 }}>
          {emailError}
        </p>
      )}

      <label htmlFor="number">Phone Number</label>
      <input
        type="text"
        id="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="i.e 07... or 01..."
        disabled={loading}
        required
      />
      {phoneError && (
        <p style={{ color: "red", margin: 0, fontSize: 12, paddingBottom: 10 }}>
          {phoneError}
        </p>
      )}

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
          <button type="submit">Update Info</button>
        )}
        <button onClick={backToProfile}>Discard</button>
      </div>
    </form>
  );
};

export default ProfileChange;
