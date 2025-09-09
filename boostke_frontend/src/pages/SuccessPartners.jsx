import React from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import "../css/style.css";
import royalbusinessImg from '../images/royalbusiness.png';
import ridgewaysImg from '../images/ridgeways.png';
import waterRefillingImg from '../images/water-refilling-station-2.png';
import waterImg from '../images/water.jpg';
import kelvinEnterpriseImg from '../images/collov-home-design-HxRvdKHVAYY-unsplash.jpg';
import ridgewaysAdditionalImg from '../images/images (5).jfif';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SuccessPartners = () => {
  const navigate = useNavigate();

  // Partner Categories with proper separation of concerns
  const partnerCategories = {
    featured: {
      title: "Featured Listed Partners",
      subtitle: "Premium Business Partners",
      description: "Our top-tier partners offering premium services and exceptional business solutions",
      badgeClass: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: <EmojiEventsIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      partners: [
        {
          id: 1,
          name: "Royal Business Empire",
          category: "Featured Listed",
          description: "Premier office space, business areas, hotels and clubs",
          image: royalbusinessImg,
          services: ["Premier Office Space", "Business Areas", "Hotels & Clubs", "Corporate Events"],
          location: "Nairobi, Kenya",
          phone: "+254 700 000 000",
          email: "info@royalbusiness.co.ke",
          website: "www.royalbusiness.co.ke",
          rating: 4.9,
          established: "2015",
          features: ["Premium Location", "24/7 Security", "Modern Facilities", "Event Hosting"]
        }
      ]
    },
    city: {
      title: "City Franchise Partners",
      subtitle: "Urban Excellence",
      description: "Strategic city-based franchises delivering quality services to urban communities",
      badgeClass: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: <BusinessIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      partners: [
        {
          id: 2,
          name: "Ridgeways Gardens",
          category: "City Franchise",
          description: "Garden, hotel and bar with premium hospitality services",
          image: ridgewaysAdditionalImg,
          services: ["Garden Services", "Hotel Accommodation", "Bar & Restaurant", "Event Venue"],
          location: "Ridgeways, Nairobi",
          phone: "+254 700 000 001",
          email: "info@ridgewaysgardens.co.ke",
          website: "www.ridgewaysgardens.co.ke",
          rating: 4.7,
          established: "2018",
          features: ["Beautiful Gardens", "Fine Dining", "Event Space", "Premium Service"]
        }
      ]
    },
    microhubs: {
      title: "MicroHub Partners",
      subtitle: "Community-Focused Solutions",
      description: "Local business partners providing essential services and products to communities",
      badgeClass: "bg-gradient-to-r from-green-500 to-green-700",
      icon: <HomeIcon sx={{ fontSize: 32, color: "#FFA500" }} />,
      partners: [
        {
          id: 3,
          name: "Kelvin Enterprise",
          category: "MicroHub",
          description: "Kitchen, home accessories and Davis & Shirtliff agent",
          image: kelvinEnterpriseImg,
          services: ["Kitchen Equipment", "Home Accessories", "Water Systems", "Technical Support"],
          location: "Nairobi, Kenya",
          phone: "+254 700 000 002",
          email: "info@kelvinenterprise.co.ke",
          rating: 4.6,
          established: "2020",
          features: ["Quality Products", "Expert Installation", "After-sales Service", "Affordable Prices"]
        },
        {
          id: 4,
          name: "Aquarium Water Services",
          category: "MicroHub",
          description: "Water refilling centre - our microhub 001",
          image: waterRefillingImg,
          services: ["Water Refilling", "Water Delivery", "Water Quality Testing", "Tank Cleaning"],
          location: "Nairobi, Kenya",
          phone: "+254 700 000 003",
          email: "info@aquariumwater.co.ke",
          rating: 4.8,
          established: "2019",
          features: ["Pure Water", "Fast Service", "Home Delivery", "Quality Guaranteed"]
        }
      ]
    }
  };

  // Partner Card Component
  const PartnerCard = ({ partner, badgeClass }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={partner.image} 
          alt={partner.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className={`absolute top-4 right-4 ${badgeClass} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
          {partner.category}
        </div>
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full flex items-center shadow-lg">
          <StarIcon sx={{ fontSize: 16, color: "#FFA500" }} className="mr-1" />
          {partner.rating}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Mada',sans-serif]">{partner.name}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <LocationOnIcon sx={{ fontSize: 16 }} className="mr-2" />
            {partner.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <EmojiEventsIcon sx={{ fontSize: 16 }} className="mr-2" />
            Est. {partner.established}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Services:</h4>
          <div className="flex flex-wrap gap-2">
            {partner.services.map((service, index) => (
              <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs border border-orange-200">
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
          <div className="grid grid-cols-2 gap-2">
            {partner.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          {partner.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <PhoneIcon sx={{ fontSize: 16 }} className="mr-2" />
              {partner.phone}
            </div>
          )}
          {partner.email && (
            <div className="flex items-center text-sm text-gray-600">
              <EmailIcon sx={{ fontSize: 16 }} className="mr-2" />
              {partner.email}
            </div>
          )}
          {partner.website && (
            <div className="flex items-center text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
              <LaunchIcon sx={{ fontSize: 16 }} className="mr-2" />
              {partner.website}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Category Section Component
  const CategorySection = ({ categoryKey, categoryData }) => (
    <section className="px-2 md:px-[77px] py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4 border border-orange-200">
            {categoryData.icon}
            <span className="ml-2 font-semibold">{categoryData.title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Mada',sans-serif]">
            {categoryData.subtitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {categoryData.description}
          </p>
        </div>
        
        <div className={`grid gap-8 ${categoryData.partners.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
          {categoryData.partners.map(partner => (
            <PartnerCard key={partner.id} partner={partner} badgeClass={categoryData.badgeClass} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="homepage_listings">
      <Helmet>
        <title>Our Success Partners | Boost KE</title>
        <meta
          name="description"
          content="Meet our success partners who have grown with BoostKe and become success stories in their respective industries"
        />
        <meta
          name="keywords"
          content="Boost KE partners, franchise success stories, business partners Kenya, success stories"
        />
        <meta property="og:title" content="Our Success Partners | Boost KE" />
        <meta
          property="og:description"
          content="Meet our success partners who have grown with BoostKe and become success stories in their respective industries"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-2 md:px-[77px] py-16">
          <button 
            onClick={() => navigate('/franchise')}
            className="flex items-center text-white hover:text-orange-200 mb-6 transition-colors duration-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} className="mr-2" />
            Back to Franchise
          </button>
          
          <div className="text-center">
            <div className="mb-6">
              <GroupIcon sx={{ fontSize: 64, color: "white" }} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-['Mada',sans-serif]">
              Meet Our Success Partners
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover the businesses that have grown with BoostKe and become success stories in their respective industries
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-orange-100">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4</div>
                <div className="text-sm md:text-base">Success Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">3</div>
                <div className="text-sm md:text-base">Business Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm md:text-base">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Categories */}
      {Object.entries(partnerCategories).map(([key, categoryData], index) => (
        <div key={key}>
          <CategorySection categoryKey={key} categoryData={categoryData} />
          {index < Object.keys(partnerCategories).length - 1 && (
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          )}
        </div>
      ))}

      {/* Call to Action */}
      <section className="px-2 md:px-[77px] py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
            <div className="mb-6">
              <TrendingUpIcon sx={{ fontSize: 48, color: "white" }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Mada',sans-serif]">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Become a BoostKe partner and grow your business with our proven franchise model
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/franchise')}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                Learn About Franchise
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="bg-orange-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-800 transition-all duration-300 transform hover:scale-105 border border-orange-700 shadow-lg text-lg"
              >
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessPartners;
