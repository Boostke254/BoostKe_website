import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { counties } from "../components/Counties.js";
import "../css/style.css";
import heroImage from "../images/happy-people-Boost-KE.jpg";
import joinUsImage from "../images/Join-us-Boost-KE.jpg";
import revenueStreamsImage from "../images/revenue_streams.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Franchise = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Helmet>
        <title>Franchise Opportunities | Boost KE</title>
        <meta
          name="description"
          content="Join the Boost KE franchise network and become a successful entrepreneur in Kenya's growing marketplace."
        />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative flex flex-col justify-center items-center py-16 md:py-24 min-h-[60vh] md:min-h-[80vh] bg-cover bg-center bg-no-repeat rounded-xl mb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0.3)), url(${heroImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-orange-400/30 rounded-xl"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Be Part of Kenya's<br />
            <span className="text-white drop-shadow-lg">Biggest Impact Movement</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
            Join thousands of entrepreneurs transforming communities across Kenya through the BoostKE franchise network
          </p>
          
          <button className="bg-[#FFA500] hover:bg-[#FF8C00] text-white font-bold py-4 px-8 md:px-12 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
            Apply Now
          </button>
        </div>
      </div>

      {/* Revenue Streams Infographic */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Revenue Model
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the multiple income streams that make our franchise opportunity so profitable
          </p>
        </div>
        <div className="flex justify-center px-4">
          <img 
            src={revenueStreamsImage} 
            alt="Boost KE Revenue Streams Infographic" 
            className="max-w-full h-auto rounded-xl shadow-xl border-2 border-[#FFA500] hover:shadow-2xl transition-shadow duration-300"
          />
        </div>
      </section>

      {/* Simple Application Form */}
      <section className="bg-white rounded-xl shadow-xl p-8 mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Start Your Franchise Journey
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location/County</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
              required
            >
              <option value="">Select your county</option>
              {counties.map((county, index) => (
                <option key={index} value={county.toLowerCase()}>
                  {county}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFA500] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#FF8C00] transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Apply for Franchise
          </button>
        </form>
      </section>

      {/* CTA Section */}
      <section 
        className="text-center rounded-2xl p-8 md:p-12 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0.3)), url(${joinUsImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-400/20"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            Ready to Transform Your Future?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto drop-shadow-md">
            Join hundreds of successful franchise owners across Kenya and start building your business empire today.
          </p>
          <button className="bg-white text-[#FFA500] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Download Franchise Brochure
          </button>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
