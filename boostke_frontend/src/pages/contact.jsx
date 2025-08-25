import { useState } from "react";
import "../css/about.css";
import banner from "../images/sidebar.svg";
import Alert from "@mui/material/Alert";
import axios from "../api/axios";
import { Helmet } from "react-helmet";
import { useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [sentForm, setSentForm] = useState(false);
  const [error, setError] = useState(null);
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    lastName: "",
    user_email: "",
    user_subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setSentForm(false);
    setError(null);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/message/contact", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSentForm(true);
        setFormData({
          user_name: "",
          lastName: "",
          user_email: "",
          user_subject: "",
          message: "",
        });
      } else {
        console.log(response);
        setError(
          response.data.error || "Failed to send the message. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Failed to send the message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact Us | BoostKE</title>
        <meta
          name="description"
          content="Contact Us | Reach out with any questions or remarks. We're here to help and provide you with the information you need."
        />
        <meta
          name="keywords"
          content="Boost KE, contact, support, customer service, Kenya marketplace, Boost Kenya, boostke"
        />
        <meta property="og:title" content="Contact Us | BoostKE" />
        <meta
          property="og:description"
          content="Contact Boost KE with any questions or remarks. We're here to help and provide you with the information you need."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostke.co.ke/contact" />
        <meta property="og:site_name" content="BoostKE" />
      </Helmet>
      <div className="contact-banner text-center">
        <h1>Contact Us</h1>
        <p>Any question or remarks? Just write us a message</p>
      </div>
      <div className="contact_body">
        <div className="contact_banner">
          <img loading="lazy" src={banner} alt="Contact Banner" />
        </div>
        <form ref={form} onSubmit={handleSubmission}>
          {error && <Alert severity="error">{error}</Alert>}
          {sentForm && (
            <Alert severity="success">Message successfully sent!</Alert>
          )}
          <div className="fields">
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="First Name *"
              disabled={loading}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name "
              disabled={loading}
            />
          </div>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="Email Address*"
            disabled={loading}
            required
          />
          <input
            type="text"
            name="user_subject"
            value={formData.user_subject}
            onChange={handleChange}
            placeholder="Subject *"
            disabled={loading}
            required
          />
          <textarea
            name="message"
            cols="30"
            rows="10"
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
            disabled={loading}
            required
          ></textarea>
          <div className="text-end">
            <button type="submit" disabled={loading}>
              Send Message{" "}
              {loading && (
                <CircularProgress
                  thickness={8}
                  size={12}
                  sx={{ ml: 1, color: "#fff" }}
                />
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="map text-center">
        <h5>
          <b>MAP LOCATION</b>
        </h5>
        <iframe
          width="100%"
          height="450"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8072632214457!2d37.70580027389328!3d0.1348907642783115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17883c967d5c1517%3A0x94e1dbf4dfea47bd!2sMeru%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2ske!4v1717474209877!5m2!1sen!2ske"
          frameBorder="0"
          style={{ border: 0 }}
          aria-hidden="false"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
