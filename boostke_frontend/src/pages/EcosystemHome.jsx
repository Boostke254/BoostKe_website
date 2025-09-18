import React from "react";
import "../css/style.css";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

function EcosystemHome() {
  return (
    <div className="ecosystem-homepage">
      <Helmet>
        <title>Boost KE Infinity: The Ecosystem to Start, Grow & Scale Anything</title>
        <meta
          name="description"
          content="Trade, co-create, and build generational wealth. Sell, launch, grow with AI tools, join programs, and innovate together where people, ideas, and opportunities thrive."
        />
        <meta
          name="keywords"
          content="boostke ecosystem, boost infinity, trade, co-create, wealth building, AI tools, innovation, opportunities"
        />
        <meta
          property="og:title"
          content="Boost KE Infinity: The Ecosystem to Start, Grow & Scale Anything"
        />
        <meta
          property="og:description"
          content="Trade, co-create, and build generational wealth. Sell, launch, grow with AI tools, join programs, and innovate together where people, ideas, and opportunities thrive."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section with Background Image */}
      <div 
        className="hero-section relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.7), rgba(255, 140, 0, 0.8)), url('/images/ecosystemhome.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-6xl mx-auto text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Boost KE Infinity: The Ecosystem to Start,<br />
            Grow & Scale Anything
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto font-light leading-relaxed">
            Trade, co-create, and build generational wealth sell, launch, grow
            with AI tools, join programs, and innovate together where people,
            ideas, and opportunities thrive.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="hero-buttons flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            <NavLink
              to="/"
              className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-colors duration-300 text-sm md:text-base"
            >
              Start Selling
            </NavLink>
            
            <NavLink
              to="/services"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#ffa500] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base"
            >
              Explore Services
            </NavLink>
            
            <NavLink
              to="/ambassadors"
              className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-colors duration-300 text-sm md:text-base"
            >
              Join as Ambassador
            </NavLink>
            
            <NavLink
              to="/about"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#ffa500] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base"
            >
              Discover the Ecosystem
            </NavLink>
          </div>
        </div>
      </div>

      {/* Ecosystem Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              One Ecosystem, Many Doors to Growth.
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Getting started is easy. Create a free account, list your products or services, or explore what others 
              offer. Whether buying, selling, or hiring, the platform connects you with people and businesses and 
              gives you room to grow through sales, networks, and our ambassador or franchise programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
            {/* Sell & Trade */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200">
              <div className="bg-[#ffebc8] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-[#ffa500] text-2xl">📝</div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">List service or Product</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                post what you sell
              </p>
              <NavLink to="/products" className="bg-[#ffa500] hover:bg-[#e6940a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Products
              </NavLink>
            </div>

            {/* Earn & Network */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200">
              <div className="bg-[#ffebc8] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-[#ffa500] text-2xl">💼</div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Grow with us</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                and become an ambassador or Franchise
              </p>
              <NavLink to="/freelance" className="bg-[#ffa500] hover:bg-[#e6940a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Freelance
              </NavLink>
            </div>

            {/* Co-Create */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200">
              <div className="bg-[#ffebc8] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-[#ffa500] text-2xl">👥</div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Join our Innovation</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                & Co-Creation Hub to build future solutions
              </p>
              <NavLink to="/innovators" className="bg-[#ffa500] hover:bg-[#e6940a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Innovators
              </NavLink>
            </div>

            {/* Scale with AI */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200">
              <div className="bg-[#ffebc8] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-[#ffa500] text-2xl">🤖</div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Use Nova, our AI</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                assistant, to trade, market, and manage smarter.
              </p>
              <NavLink to="/nova-ai" className="bg-[#ffa500] hover:bg-[#e6940a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Nova AI
              </NavLink>
            </div>

            {/* Community Wealth */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-200">
              <div className="bg-[#ffebc8] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-[#ffa500] text-2xl">🌟</div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Be part of projects</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                that create lasting impact.
              </p>
              <button className="bg-[#ffa500] hover:bg-[#e6940a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Community Wealth
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Boost KE Different Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Boost KE Different
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Marketplace & Services */}
            <div className="text-center p-6">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/marketplace-icon.png" 
                  alt="Marketplace & Services" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Marketplace<br />& Services
              </h3>
            </div>

            {/* Innovation & Co-Creation Hub */}
            <div className="text-center p-6">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/innovation-hub-icon.png" 
                  alt="Innovation & Co-Creation Hub" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation &<br />Co-Creation Hub
              </h3>
            </div>

            {/* Franchise */}
            <div className="text-center p-6">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/franchise-icon.png" 
                  alt="Franchise" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Franchise
              </h3>
            </div>

            {/* Ambassadors Program */}
            <div className="text-center p-6">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/ambassadors-icon.png" 
                  alt="Ambassadors Program" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ambassadors<br />Program
              </h3>
            </div>

            {/* AI (Nova) */}
            <div className="text-center p-6">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/ai-nova-icon.png" 
                  alt="AI Nova" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI (Nova)
              </h3>
            </div>

            {/* Community Wealth Model */}
            <div className="text-center p-6">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/community-wealth-icon.png" 
                  alt="Community Wealth Model" 
                  className="w-24 h-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community<br />Wealth Model
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* More Than a Marketplace Section */}
      <div className="marketplace-bg py-20 md:py-32 relative overflow-hidden min-h-[700px] md:min-h-[800px] flex items-center">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Left Content Only */}
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
                More Than a<br />Marketplace
              </h2>
              <p className="text-lg md:text-2xl text-white leading-relaxed font-medium drop-shadow-xl max-w-2xl mb-8">
                Boost KE Infinity is not just a platform. 
                It's a living ecosystem where 
                businesses, innovators, and 
                communities come together. Whether 
                you're selling, co-creating, or 
                investing, you're not just trading—you're 
                growing wealth, creating 
                opportunities, and shaping the future 
                of business in Africa.
              </p>
              
              {/* Key Features List */}
              <div className="mb-10">
                <ul className="text-white text-lg md:text-xl space-y-3 drop-shadow-lg">
                  <li className="flex items-center">
                    <span className="text-[#ffa500] text-2xl mr-3">✓</span>
                    Trade products and services with ease
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#ffa500] text-2xl mr-3">✓</span>
                    Co-create innovative solutions together
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#ffa500] text-2xl mr-3">✓</span>
                    Build generational wealth through our programs
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#ffa500] text-2xl mr-3">✓</span>
                    Access AI-powered tools for growth
                  </li>
                </ul>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                <NavLink
                  to="/register"
                  className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-4 px-8 md:py-5 md:px-10 rounded-lg transition-colors duration-300 text-base md:text-lg drop-shadow-lg"
                >
                  Join the Ecosystem
                </NavLink>
                
                <NavLink
                  to="/about"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-[#ffa500] text-white font-semibold py-4 px-8 md:py-5 md:px-10 rounded-lg transition-all duration-300 text-base md:text-lg drop-shadow-lg"
                >
                  Learn More
                </NavLink>
              </div>

              {/* Stats or Additional Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
                <div className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffa500] drop-shadow-lg">1000+</div>
                  <div className="text-white text-sm md:text-base drop-shadow-md">Active Members</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffa500] drop-shadow-lg">500+</div>
                  <div className="text-white text-sm md:text-base drop-shadow-md">Products Listed</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-[#ffa500] drop-shadow-lg">50+</div>
                  <div className="text-white text-sm md:text-base drop-shadow-md">Success Stories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Highlight Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Programs Highlight
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Ambassador Program */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/ambassador-icon.png" 
                  alt="Ambassador Badge" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Become part of our frontline and earn as you grow with us.
              </p>
              <button className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm">
                Ambassador
              </button>
            </div>

            {/* Franchise Partners */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/franchise-icon.png" 
                  alt="Franchise Stores" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Scale with us by setting up a local Boost KE Hub.
              </p>
              <button className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm">
                Franchise Partners
              </button>
            </div>

            {/* Vendors & Freelancers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/vendor-shop.png" 
                  alt="Vendor Shop" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Sell your products and services to a ready market.
              </p>
              <button className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm">
                Vendors & Freelancers
              </button>
            </div>

            {/* Innovators */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <img 
                  src="/images/icons/innovation-bulb.png" 
                  alt="Innovation Bulb" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Turn ideas into products, earn royalties, and access funding.
              </p>
              <button className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm">
                Innovators
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ready to Grow With Us Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Ladder Image */}
            <div className="flex justify-center lg:justify-start">
              <img 
                src="/images/icons/Ladder 1.png" 
                alt="Growth Ladder" 
                className="max-w-full h-auto"
                style={{ maxHeight: '500px', maxWidth: '400px' }}
              />
            </div>
            
            {/* Right Side - Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Ready to Grow With Us?
              </h2>
              
              {/* Call-to-Action Buttons */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                <NavLink
                  to="/register"
                  className="block w-full bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-center text-lg"
                >
                  Join as a Member
                </NavLink>
                
                <NavLink
                  to="/"
                  className="block w-full bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-center text-lg"
                >
                  Explore the Marketplace
                </NavLink>
                
                <NavLink
                  to="/coming-soon"
                  className="block w-full bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-center text-lg"
                >
                  Become an Ambassador
                </NavLink>
                
                <NavLink
                  to="/coming-soon"
                  className="block w-full bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-center text-lg"
                >
                  Discover our Franchise Program
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join the Ecosystem?
          </h2>
          <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
            Start your journey today and become part of Kenya's most innovative business ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink
              to="/register"
              className="bg-white text-[#ffa500] hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Get Started Today
            </NavLink>
            <NavLink
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-[#ffa500] font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcosystemHome;