import React from 'react';
import '../css/style.css';
import { Helmet } from "react-helmet";
import { Divider } from "@mui/material";

function KNCCI() {
  return (
    <div className="kncci-page">
      <Helmet>
        <title>KNCCI Partnership | Boost KE</title>
        <meta
          name="description"
          content="Explore the strategic partnership between Boost KE and KNCCI. Join thousands of Kenyan businesses benefiting from advocacy, networking, and business development support."
        />
        <meta
          name="keywords"
          content="KNCCI, Kenya National Chamber of Commerce, business advocacy, business development, Boost KE partnership, business membership"
        />
        <meta property="og:title" content="KNCCI Partnership | Boost KE" />
        <meta
          property="og:description"
          content="Explore the strategic partnership between Boost KE and KNCCI. Join thousands of Kenyan businesses benefiting from advocacy, networking, and business development support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostke.co.ke/kncci" />
        <meta property="og:site_name" content="BoostKE" />
      </Helmet>

      {/* Header Section */}
      <h1 className="text-center py-8 text-2xl md:text-6xl bg-gray-50 font-semibold text-gray-800">
        KNCCI Partnership
      </h1>
      <p className="text-center text-gray-600 text-sm md:text-base mb-4">
        Kenya National Chamber of Commerce and Industry
      </p>
      <Divider />

      {/* Hero Image Section */}
      <div className="relative w-full">
        <img 
          src="/src/images/KNCCI-HERO-IMAGE.jpg" 
          alt="Empowering Kenya's Business Community"
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-6">
          <h2 className="text-xl md:text-3xl font-semibold mb-2 text-center">
            Empowering Kenya's Business Community
          </h2>
          <p className="text-md md:text-lg text-center max-w-2xl mx-auto">
            Strategic advocacy and collaboration for business growth
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="about text-center">
        <div className="mission">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Our Partnership with KNCCI</h3>
          </div>
          <p className="text-justify">
            Boost Kenya has partnered with the Kenya National Chamber of Commerce and Industry (KNCCI) 
            to create a powerful ecosystem that supports business growth, innovation, and economic development 
            across Kenya. This collaboration brings together KNCCI's advocacy expertise and our technology 
            platform to provide comprehensive support for businesses of all sizes.
          </p>
        </div>
      </div>

      <Divider sx={{ margin: '40px 0' }} />

      {/* Services Section */}
      <div className="about">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">
          KNCCI Advocacy & Support Services
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">⚖️</div>
            <h4 className="font-semibold text-lg mb-3">Policy & Legal Advocacy</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Business policy formulation and advocacy</li>
              <li>• Regulatory compliance guidance</li>
              <li>• Trade dispute resolution</li>
              <li>• Legal framework advocacy</li>
            </ul>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="font-semibold text-lg mb-3">Business Development</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Market research and analysis</li>
              <li>• Business certification services</li>
              <li>• Export promotion support</li>
              <li>• Investment facilitation</li>
            </ul>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-semibold text-lg mb-3">Networking & Partnerships</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• B2B networking events</li>
              <li>• Trade mission participation</li>
              <li>• Strategic partnership facilitation</li>
              <li>• International trade connections</li>
            </ul>
          </div>
        </div>
      </div>

      <Divider sx={{ margin: '40px 0' }} />

      {/* Membership Benefits */}
      <div className="about">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">
          KNCCI Membership Benefits
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="font-semibold text-lg mb-4 text-center">Why Join KNCCI?</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 text-lg">✓</span>
                <div>
                  <h5 className="font-semibold">Government Contract Access</h5>
                  <p className="text-sm text-gray-600">Priority access to tenders and government procurement opportunities</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 text-lg">✓</span>
                <div>
                  <h5 className="font-semibold">Business Certification</h5>
                  <p className="text-sm text-gray-600">Official business verification and credibility enhancement</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 text-lg">✓</span>
                <div>
                  <h5 className="font-semibold">Training & Development</h5>
                  <p className="text-sm text-gray-600">Continuous learning opportunities and skill development programs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-orange-500 mr-3 text-lg">✓</span>
                <div>
                  <h5 className="font-semibold">Export Support</h5>
                  <p className="text-sm text-gray-600">International trade facilitation and export market access</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 text-center">Membership Categories</h4>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h5 className="font-semibold flex items-center">
                  <span className="mr-2">🏢</span>
                  Corporate Membership
                </h5>
                <p className="text-sm text-gray-600 mb-2">For established businesses and large corporations</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Full advocacy representation</li>
                  <li>• Premium networking access</li>
                  <li>• Policy consultation privileges</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h5 className="font-semibold flex items-center">
                  <span className="mr-2">🏪</span>
                  SME Membership
                </h5>
                <p className="text-sm text-gray-600 mb-2">For small and medium enterprises</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Business development support</li>
                  <li>• Sector-specific advocacy</li>
                  <li>• Growth facilitation programs</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h5 className="font-semibold flex items-center">
                  <span className="mr-2">👤</span>
                  Individual Membership
                </h5>
                <p className="text-sm text-gray-600 mb-2">For entrepreneurs and business professionals</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Professional networking</li>
                  <li>• Business mentorship</li>
                  <li>• Startup support services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider sx={{ margin: '40px 0' }} />

      {/* Call to Action */}
      <div className="text-center py-10 bg-orange-50">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Ready to Transform Your Business?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of Kenyan businesses already benefiting from KNCCI membership
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <a
            href="https://kncci.glueup.com/organization/6246/memberships/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-semibold transition-colors inline-block"
          >
            🚀 Register with KNCCI
          </a>
          <a
            href="https://kncci.glueup.com/organization/6246/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded font-semibold transition-colors inline-block"
          >
            📋 View Full Benefits
          </a>
        </div>
        
        <div className="text-sm text-gray-600">
          <p className="mb-3">📞 Contact KNCCI Directly:</p>
          <div className="text-center space-y-2">
            <p className="font-semibold">🏢 Telkom Plaza-Orange House 2nd Floor</p>
            <p>Ralph Bunche Road, Nairobi City, Kenya</p>
            <div className="flex flex-col md:flex-row gap-2 justify-center items-center mt-3">
              <a href="mailto:info@kenyachamber.or.ke" className="hover:text-orange-500 transition-colors">
                📧 info@kenyachamber.or.ke
              </a>
              <span className="hidden md:block">|</span>
              <a href="tel:+254203927000" className="hover:text-orange-500 transition-colors">
                📱 +254 203 927 000
              </a>
            </div>
          </div>
        </div>
      </div>

      <Divider sx={{ margin: '40px 0' }} />

      {/* Success Stories */}
      <div className="about">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">
          Partnership Success Stories
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="text-4xl mb-4 text-orange-500 opacity-30">"</div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              "The KNCCI-Boost Kenya partnership opened doors to international markets. 
              Our export revenue increased by 200% within 18 months of joining."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                SM
              </div>
              <div>
                <div className="font-semibold text-sm">Sarah Mwangi</div>
                <div className="text-xs text-gray-600">CEO, TechSolutions Kenya</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="text-4xl mb-4 text-orange-500 opacity-30">"</div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              "KNCCI's advocacy helped us navigate complex regulations and secure 
              KSh 50M in government contracts through their certification process."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                JK
              </div>
              <div>
                <div className="font-semibold text-sm">James Kiprotich</div>
                <div className="text-xs text-gray-600">Founder, AgriVest Limited</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-orange-500">
            <div className="text-4xl mb-4 text-orange-500 opacity-30">"</div>
            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
              "Through the networking events and trade missions, we established 
              partnerships across East Africa and expanded to 5 new countries."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">
                GW
              </div>
              <div>
                <div className="font-semibold text-sm">Grace Wanjiku</div>
                <div className="text-xs text-gray-600">Director, Fashion Forward</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider sx={{ margin: '40px 0' }} />

      {/* Resources Section */}
      <div className="about">
        <h3 className="text-xl md:text-2xl font-semibold text-center mb-8">
          Business Resources & Support
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
            <div className="text-3xl mb-3">📚</div>
            <h5 className="font-semibold text-sm mb-2">Business Guides</h5>
            <p className="text-xs text-gray-600 mb-3">Comprehensive guides for business development</p>
            <a href="https://www.kenyachamber.or.ke/" target="_blank" rel="noopener noreferrer" 
               className="text-orange-500 hover:text-orange-700 text-xs font-semibold">
              Access Resources →
            </a>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
            <div className="text-3xl mb-3">📊</div>
            <h5 className="font-semibold text-sm mb-2">Market Research</h5>
            <p className="text-xs text-gray-600 mb-3">Industry insights and market analysis</p>
            <a href="https://www.kenyachamber.or.ke/" target="_blank" rel="noopener noreferrer"
               className="text-orange-500 hover:text-orange-700 text-xs font-semibold">
              View Reports →
            </a>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
            <div className="text-3xl mb-3">📅</div>
            <h5 className="font-semibold text-sm mb-2">Events & Training</h5>
            <p className="text-xs text-gray-600 mb-3">Workshops and networking opportunities</p>
            <a href="https://www.kenyachamber.or.ke/" target="_blank" rel="noopener noreferrer"
               className="text-orange-500 hover:text-orange-700 text-xs font-semibold">
              View Events →
            </a>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors">
            <div className="text-3xl mb-3">🔗</div>
            <h5 className="font-semibold text-sm mb-2">Policy Updates</h5>
            <p className="text-xs text-gray-600 mb-3">Latest business policies and regulations</p>
            <a href="https://www.kenyachamber.or.ke/" target="_blank" rel="noopener noreferrer"
               className="text-orange-500 hover:text-orange-700 text-xs font-semibold">
              Stay Updated →
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-8 bg-gray-800 text-white">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Join the Movement
        </h3>
        <p className="text-sm mb-6 max-w-2xl mx-auto opacity-90">
          Be part of Kenya's business transformation. Together with KNCCI, 
          we're building a stronger, more competitive business environment for all.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://kncci.glueup.com/organization/6246/memberships/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-semibold transition-colors inline-block"
          >
            🚀 Start Your KNCCI Journey
          </a>
          <a
            href="/contact"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded font-semibold transition-colors inline-block"
          >
            💬 Contact Boost Kenya Team
          </a>
        </div>
      </div>
    </div>
  );
}

export default KNCCI;