import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import { counties } from "../components/Counties.js";
import "../css/style.css";
import heroImage from "../images/happy-people-Boost-KE.jpg";
import joinUsImage from "../images/Join-us-Boost-KE.jpg";
import revenueStreamsImage from "../images/revenue_streams.png";
import businessImage from "../images/Business-at-Boost-KE.jpg";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BusinessIcon from "@mui/icons-material/Business";
import SchoolIcon from "@mui/icons-material/School";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SecurityIcon from "@mui/icons-material/Security";
import CampaignIcon from "@mui/icons-material/Campaign";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";

const Franchise = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    preferredPackage: ''
  });

  const supportFeatures = [
    {
      icon: <SchoolIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      title: "Operations Manual",
      description: "Step-by-step guide covering day-to-day operations, standards, and best practices."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      title: "Legal & Compliance",
      description: "Guidance on licenses, permits, and compliance with local regulations."
    },
    {
      icon: <CampaignIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      title: "Branding & Marketing",
      description: "Nationwide brand power plus local marketing campaigns and social media assets."
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      title: "Technology Tools",
      description: "Access to POS systems, inventory management, and analytics dashboards"
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      title: "Mentorship",
      description: "Ongoing coaching from experienced franchise mentors and our corporate team."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      title: "Sales Training",
      description: "Hands-on training in customer service, up-selling, and driving repeat business."
    }
  ];

  const navigationItems = [
    "Memberships",
    "Innovation", 
    "Projects",
    "Vendor",
    "Commissions",
    "Smart Shops",
    "Ambassador",
    "Network"
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="homepage_listings">
      <Helmet>
        <title>Franchise Opportunities | Boost KE</title>
        <meta
          name="description"
          content="Join the Boost KE franchise network and become a successful entrepreneur in Kenya's growing marketplace."
        />
        <meta
          name="keywords"
          content="Boost KE franchise, business opportunity, Kenya franchise, entrepreneur, business ownership"
        />
        <meta property="og:title" content="Franchise Opportunities | Boost KE" />
        <meta
          property="og:description"
          content="Join the Boost KE franchise network and become a successful entrepreneur in Kenya's growing marketplace."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section with Background Image */}
      <div 
        className="relative flex flex-col justify-center items-center py-16 md:py-24 min-h-[60vh] md:min-h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0.3)), url(${heroImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-orange-400/30"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Be Part of Kenya's<br />
            <span className="text-white drop-shadow-lg">Biggest Impact Movement</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
            Join thousands of entrepreneurs transforming communities across Kenya through the BoostKE franchise network
          </p>
          
          <button className="bg-[#FFA500] hover:bg-[#FF8C00] text-white font-bold py-4 px-8 md:px-12 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
              <a href="#application-form">Apply Now</a>
          </button>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-3 rounded-full">
              <TrendingUpIcon sx={{ fontSize: 24, color: "white" }} className="mr-3" />
              <span className="font-semibold text-lg">Proven Success</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-3 rounded-full">
              <SupportAgentIcon sx={{ fontSize: 24, color: "white" }} className="mr-3" />
              <span className="font-semibold text-lg">Full Support</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-3 rounded-full">
              <BusinessIcon sx={{ fontSize: 24, color: "white" }} className="mr-3" />
              <span className="font-semibold text-lg">Quick Start</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Partner with Boost KE Section */}
      <section className="px-2 md:px-[77px] py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1B1C1E] leading-tight font-['Mada',sans-serif]">
                Why Partner<br />
                with <span className="text-[#FFA500]">Boost KE</span>
              </h2>
              
              <p className="text-lg text-[#7E7E7E] leading-relaxed">
                Boost KE is a trusted lifestyle brand with a loyal customer base across Kenya. After years of success, we're inviting entrepreneurs to grow with us
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-[#FFA500] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-[#1B1C1E] font-medium">Established brand recognition and customer trust</p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-[#FFA500] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-[#1B1C1E] font-medium">Proven business model with documented success</p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-[#FFA500] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-[#1B1C1E] font-medium">Comprehensive training and ongoing support system</p>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-[#FFA500] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-[#1B1C1E] font-medium">Multiple revenue streams for sustainable growth</p>
                </div>
              </div>
              
              <button className="bg-[#FFA500] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#FF8C00] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More About Partnership
              </button>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  src={businessImage} 
                  alt="Business professionals at Boost KE" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Orange geometric frames overlay */}
                <div className="absolute top-4 right-4 w-20 h-16 border-4 border-[#FFA500] rounded-lg transform rotate-12"></div>
                <div className="absolute top-12 right-16 w-16 h-20 border-4 border-[#FFA500] rounded-lg transform -rotate-6"></div>
                <div className="absolute bottom-8 left-8 w-24 h-16 border-4 border-[#FFA500] rounded-lg transform rotate-6"></div>
                <div className="absolute bottom-16 left-20 w-16 h-24 border-4 border-[#FFA500] rounded-lg transform -rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Partners Section */}
      <section className="px-2 md:px-[77px] py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <div className="mb-6">
                <GroupIcon sx={{ fontSize: 48, color: "#FFA500" }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B1C1E] mb-4 font-['Mada',sans-serif]">
                Meet Our <span className="text-[#FFA500]">Success Partners</span>
              </h2>
              <p className="text-lg text-[#7E7E7E] max-w-3xl mx-auto mb-8">
                Discover how our franchise partners are transforming their communities and building successful businesses across Kenya. From microhubs to premium business complexes, see the diversity of opportunities available.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFA500] mb-2">4</div>
                  <div className="text-sm text-[#7E7E7E]">Success Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFA500] mb-2">3</div>
                  <div className="text-sm text-[#7E7E7E]">Business Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFA500] mb-2">100%</div>
                  <div className="text-sm text-[#7E7E7E]">Success Rate</div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/success-partners')}
                className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white font-bold py-4 px-8 rounded-lg hover:from-[#FF8C00] hover:to-[#FF7700] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                Meet Our Success Partners
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Packages Section */}
      <section className="px-2 md:px-[77px] py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B1C1E] mb-4 font-['Mada',sans-serif]">
              Franchise Packages
            </h2>
            <p className="text-lg text-[#7E7E7E] max-w-3xl mx-auto">
              Choose the franchise level that best fits your investment capacity and business goals. Our hierarchical system ensures scalable growth and comprehensive support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* City/Regional Franchise */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-[#FFA500] transform scale-105">
              <div className="text-center mb-4">
                <span className="bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-bold">PREMIUM</span>
              </div>
              <div className="text-center mb-6">
                <LocationCityIcon sx={{ fontSize: 60, color: "#FFA500" }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#FFA500] text-center">City/Regional Franchise</h3>
              <p className="text-gray-600 mb-6 text-center">Parent account overseeing multiple District/Town franchises with comprehensive regional management capabilities.</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Oversee multiple district franchises</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Regional territory exclusivity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Revenue sharing from sub-franchises</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Strategic partnership support</span>
                </div>
              </div>
              
              <button className="w-full bg-[#FFA500] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#FF8C00] transition-colors">
                Learn More
              </button>
            </div>

            {/* District/Town Franchise */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200">
              <div className="text-center mb-4">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">POPULAR</span>
              </div>
              <div className="text-center mb-6">
                <HomeWorkIcon sx={{ fontSize: 60, color: "#FFA500" }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#FFA500] text-center">District/Town Franchise</h3>
              <p className="text-gray-600 mb-6 text-center">Mid-tier account managing operations, shops, and vendors within designated district or town boundaries.</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Manage shops and vendors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">District territory rights</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Vendor commission earnings</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Operational management tools</span>
                </div>
              </div>
              
              <button className="w-full bg-[#FFA500] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#FF8C00] transition-colors">
                Learn More
              </button>
            </div>

            {/* Micro/Community Franchise */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200">
              <div className="text-center mb-4">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">STARTER</span>
              </div>
              <div className="text-center mb-6">
                <StorefrontIcon sx={{ fontSize: 60, color: "#FFA500" }} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#FFA500] text-center">Micro/Community Franchise</h3>
              <p className="text-gray-600 mb-6 text-center">Grassroots-level account managing Smart Mobile Shops and local community onboarding initiatives.</p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Smart Mobile Shop management</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Local community onboarding</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Grassroots network building</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">Basic training and support</span>
                </div>
              </div>
              
              <button className="w-full bg-[#FFA500] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#FF8C00] transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-2 md:px-[77px] py-8">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Support Features */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B1C1E] mb-8 font-['Mada',sans-serif]">
              Complete Support System
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {supportFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border border-[#E6E5E5] hover:border-[#FFA500] transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1B1C1E] mb-3 font-['Inter',sans-serif]">
                    {feature.title}
                  </h3>
                  <p className="text-[#7E7E7E] leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional Benefits */}
            <div className="mt-12 bg-[#FAF1E2] p-6 md:p-8 rounded-lg border border-[#E6E5E5]">
              <h3 className="text-xl font-bold text-[#1B1C1E] mb-6 font-['Mada',sans-serif]">
                What You'll Receive
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Comprehensive training program",
                  "Marketing materials and campaigns", 
                  "Technology platform access",
                  "Ongoing operational support",
                  "Brand guidelines and assets",
                  "Legal documentation support",
                  "Territory protection rights",
                  "Performance analytics tools",
                  "Customer service training"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-[#FFA500] rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-[#1B1C1E] font-medium text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-[#E6E5E5]">
                <h3 id="franchise-journey-section" className="text-2xl font-bold text-[#1B1C1E] mb-6 font-['Mada',sans-serif]">
                  Start Your Journey
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#1B1C1E] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#E6E5E5] rounded-lg focus:outline-none focus:border-[#FFA500] focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-20 transition-all duration-300"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#1B1C1E] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#E6E5E5] rounded-lg focus:outline-none focus:border-[#FFA500] focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-20 transition-all duration-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1B1C1E] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E6E5E5] rounded-lg focus:outline-none focus:border-[#FFA500] focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1B1C1E] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E6E5E5] rounded-lg focus:outline-none focus:border-[#FFA500] focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-20 transition-all duration-300"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-[#1B1C1E] mb-2">
                      Location/County *
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E6E5E5] rounded-lg focus:outline-none focus:border-[#FFA500] focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-20 transition-all duration-300 appearance-none bg-white"
                    >
                      <option value="">Select your county</option>
                      {counties.map((county, index) => (
                        <option key={index} value={county.toLowerCase()}>
                          {county}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="preferredPackage" className="block text-sm font-medium text-[#1B1C1E] mb-2">
                      Preferred Franchise Package *
                    </label>
                    <select
                      id="preferredPackage"
                      name="preferredPackage"
                      value={formData.preferredPackage}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-[#E6E5E5] rounded-lg focus:outline-none focus:border-[#FFA500] focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-20 transition-all duration-300 appearance-none bg-white"
                    >
                      <option value="">Select your preferred package</option>
                      <option value="city-regional">City/Regional Franchise</option>
                      <option value="district-town">District/Town Franchise</option>
                      <option value="micro-community">Micro/Community Franchise</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFA500] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#FFB325] active:bg-[#B87903] transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Apply for Franchise
                  </button>

                  <p className="text-xs text-[#7E7E7E] text-center leading-relaxed">
                    By submitting this form, you agree to our Terms & Conditions and Privacy Policy. 
                    We'll contact you within 24 hours.
                  </p>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-[#E6E5E5]">
                  <h4 className="text-sm font-semibold text-[#1B1C1E] mb-4">
                    Need More Information?
                  </h4>
                  <div className="space-y-2 text-sm text-[#7E7E7E]">
                    <p>📧 franchise@boostke.co.ke</p>
                    <p>📞 +254 700 000 000</p>
                    <p>🕒 Mon-Fri: 8AM-6PM EAT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Streams Infographic */}
        <section className="mt-16 md:mt-20 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B1C1E] mb-4 font-['Mada',sans-serif]">
              Our Revenue Model
            </h2>
            <p className="text-lg text-[#7E7E7E] max-w-2xl mx-auto">
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

        {/* CTA Section */}
        <section 
          className="mt-16 md:mt-20 text-center rounded-2xl p-12 md:p-16 lg:p-20 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[400px] md:min-h-[500px] flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0.3)), url(${joinUsImage})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-400/20"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-['Mada',sans-serif] drop-shadow-lg">
              Ready to Transform Your Future?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto drop-shadow-md">
              Join hundreds of successful franchise owners across Kenya and start building your business empire today.
            </p>
            <button className="bg-white text-[#FFA500] font-bold py-4 px-8 rounded-lg hover:bg-[#FAFAFA] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Download Franchise Brochure
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Franchise;