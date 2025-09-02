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
import SecurityIcon from "@mui/icons-material/Security";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupsIcon from "@mui/icons-material/Groups";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import StoreIcon from "@mui/icons-material/Store";
import InnovationIcon from "@mui/icons-material/Lightbulb";
import TimelineIcon from "@mui/icons-material/Timeline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ComputerIcon from "@mui/icons-material/Computer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import GavelIcon from "@mui/icons-material/Gavel";
import PersonIcon from "@mui/icons-material/Person";

const Franchise = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    county: '',
    experience: '',
    investment: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Boost KE Franchise - Join Kenya's Biggest Impact Movement</title>
        <meta name="description" content="Join the Boost KE franchise network and be part of Kenya's biggest impact movement. Transform communities while building your business empire." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section */}
        <div 
          className="relative flex flex-col justify-center items-center py-16 md:py-24 min-h-[80vh] bg-cover bg-center bg-no-repeat rounded-3xl mb-16"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0.3)), url(${heroImage})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-orange-400/30 rounded-3xl"></div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Be Part of Kenya's<br />
              <span className="text-white drop-shadow-lg">Biggest Impact Movement</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
              Join thousands of entrepreneurs transforming communities across Kenya through the BoostKE franchise network
            </p>
            
            <button className="bg-[#FFA500] hover:bg-[#FF8C00] text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Apply Now
            </button>
          </div>
        </div>

        {/* 2. Why Join Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Why Join Boost KE?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <TrendingUpIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Proven Success</h3>
              <p className="text-gray-600">Join a network with documented success stories across Kenya</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <SupportAgentIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Full Support</h3>
              <p className="text-gray-600">Comprehensive training and ongoing operational support</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <BusinessIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Multiple Revenue</h3>
              <p className="text-gray-600">Diversified income streams for sustainable growth</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <NetworkCheckIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Community Impact</h3>
              <p className="text-gray-600">Make a real difference in your local community</p>
            </div>
          </div>
        </section>

        {/* 3. Franchise Packages */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Franchise Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Micro Franchise */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100">
              <h3 className="text-2xl font-bold mb-4 text-[#FFA500]">Micro Franchise</h3>
              <p className="text-3xl font-bold mb-6 text-gray-800">KSh 50K - 200K</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Digital platform access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Basic training program</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Community network support</span>
                </li>
              </ul>
              <button className="w-full bg-[#FFA500] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#FF8C00] transition-colors">
                Apply Now
              </button>
            </div>

            {/* City Franchise */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-[#FFA500] transform scale-105">
              <div className="text-center mb-4">
                <span className="bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-bold">POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#FFA500]">City Franchise</h3>
              <p className="text-3xl font-bold mb-6 text-gray-800">KSh 500K - 2M</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Full territory rights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Advanced training & tools</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Marketing support</span>
                </li>
              </ul>
              <button className="w-full bg-[#FFA500] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#FF8C00] transition-colors">
                Apply Now
              </button>
            </div>

            {/* National Franchise */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100">
              <h3 className="text-2xl font-bold mb-4 text-[#FFA500]">National Franchise</h3>
              <p className="text-3xl font-bold mb-6 text-gray-800">KSh 5M+</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Exclusive national rights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Complete business package</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon sx={{ fontSize: 20, color: "#FFA500" }} className="mr-3" />
                  <span>Strategic partnership</span>
                </li>
              </ul>
              <button className="w-full bg-[#FFA500] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#FF8C00] transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* 4. Revenue Streams */}
        <section className="mb-20 bg-white rounded-xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Revenue Streams</h2>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                <GroupsIcon sx={{ fontSize: 40, color: "white" }} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Memberships</h3>
              <p className="text-sm text-gray-600">Recurring revenue from member subscriptions</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                <MonetizationOnIcon sx={{ fontSize: 40, color: "white" }} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Vendor Commissions</h3>
              <p className="text-sm text-gray-600">Earnings from marketplace transactions</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                <NetworkCheckIcon sx={{ fontSize: 40, color: "white" }} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Ambassador Network</h3>
              <p className="text-sm text-gray-600">Income from referral programs</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                <StoreIcon sx={{ fontSize: 40, color: "white" }} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Smart Shops</h3>
              <p className="text-sm text-gray-600">Revenue from physical retail locations</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
                <InnovationIcon sx={{ fontSize: 40, color: "white" }} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Innovation Projects</h3>
              <p className="text-sm text-gray-600">Profits from new business ventures</p>
            </div>
          </div>
        </section>

        {/* 5. Franchise Process */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Franchise Process</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
              <h3 className="font-bold text-lg mb-2">Apply</h3>
              <p className="text-gray-600 max-w-xs">Submit your application and investment details</p>
            </div>
            <div className="hidden md:block w-16 h-1 bg-[#FFA500]"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
              <h3 className="font-bold text-lg mb-2">Screening</h3>
              <p className="text-gray-600 max-w-xs">Background check and interview process</p>
            </div>
            <div className="hidden md:block w-16 h-1 bg-[#FFA500]"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
              <h3 className="font-bold text-lg mb-2">Training</h3>
              <p className="text-gray-600 max-w-xs">Comprehensive business and operational training</p>
            </div>
            <div className="hidden md:block w-16 h-1 bg-[#FFA500]"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">4</div>
              <h3 className="font-bold text-lg mb-2">Launch</h3>
              <p className="text-gray-600 max-w-xs">Official opening with full support</p>
            </div>
            <div className="hidden md:block w-16 h-1 bg-[#FFA500]"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">5</div>
              <h3 className="font-bold text-lg mb-2">Grow</h3>
              <p className="text-gray-600 max-w-xs">Scale your business with ongoing mentorship</p>
            </div>
          </div>
        </section>

        {/* 6. Support & Training */}
        <section className="mb-20 bg-white rounded-xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Support & Training</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <MenuBookIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Operations Manual</h3>
              <p className="text-gray-600">Comprehensive guide to running your franchise</p>
            </div>
            <div className="text-center p-6">
              <ComputerIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Technology Tools</h3>
              <p className="text-gray-600">Latest digital platforms and management systems</p>
            </div>
            <div className="text-center p-6">
              <BrandingWatermarkIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Branding & Marketing</h3>
              <p className="text-gray-600">Professional marketing materials and campaigns</p>
            </div>
            <div className="text-center p-6">
              <SchoolIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Sales Training</h3>
              <p className="text-gray-600">Proven sales techniques and customer service</p>
            </div>
            <div className="text-center p-6">
              <GavelIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Legal & Compliance</h3>
              <p className="text-gray-600">Full legal support and regulatory compliance</p>
            </div>
            <div className="text-center p-6">
              <PersonIcon sx={{ fontSize: 60, color: "#FFA500" }} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Mentorship</h3>
              <p className="text-gray-600">One-on-one guidance from experienced franchisees</p>
            </div>
          </div>
        </section>

        {/* Revenue Streams Infographic */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Revenue Model</h2>
          <div className="flex justify-center">
            <img 
              src={revenueStreamsImage} 
              alt="Boost KE Revenue Streams Infographic" 
              className="max-w-full h-auto rounded-xl shadow-lg border border-[#FFA500]"
            />
          </div>
        </section>

        {/* 7. Closing Section */}
        <section 
          className="text-center rounded-2xl p-12 text-white relative overflow-hidden bg-cover bg-center bg-no-repeat mb-16"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 165, 0, 0.3)), url(${joinUsImage})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-400/20"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto drop-shadow-md">
              Join hundreds of successful franchise owners across Kenya and start building your business empire today.
            </p>
            <button className="bg-white text-[#FFA500] font-bold py-4 px-12 rounded-full text-xl hover:bg-[#FAFAFA] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Become a Franchise Partner
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Franchise;
