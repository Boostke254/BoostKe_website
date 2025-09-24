import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import ambassadorAPI from "../../api/ambassadorService";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";
import Leaderboard from "./leaderboard";
import TrainingModule from "./training/TrainingModule";
import happyBoostKE from "../../assets/images/ambassadors/Happy-BoostKE 1.png";
import roadmapImg from "../../assets/images/ambassadors/roadmap.png";
import bronzeBadge from "../../assets/images/ambassadors/icons/Bronze Badge copy .png";
import silverBadge from "../../assets/images/ambassadors/icons/SilverBadge.png";
import goldBadge from "../../assets/images/ambassadors/icons/Gold Badge.png";
import diamondBadge from "../../assets/images/ambassadors/icons/Diamond BADGE.png";
import platinumBadge from "../../assets/images/ambassadors/icons/PLATINUM BADGE.png";

function Ambassadors() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [ambassadorStats, setAmbassadorStats] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showTraining, setShowTraining] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) {
      fetchAmbassadorData();
    }
  }, [isAuthenticated]);

  const fetchAmbassadorData = async () => {
    setLoading(true);
    setError(null);
    try {
      const leaderboardData = await ambassadorAPI.getLeaderboard(5);
      setLeaderboard(leaderboardData.leaderboard || []);

      if (isAuthenticated) {
        try {
          const statsData = await ambassadorAPI.getStats();
          setAmbassadorStats(statsData);
        } catch (error) {
          console.log("User is not an ambassador yet");
        }

        try {
          const rewardsData = await ambassadorAPI.getRewards();
          setRewards(rewardsData.rewards || []);
        } catch (error) {
          console.log("No rewards data available");
        }
      }
    } catch (error) {
      console.error("Error fetching ambassador data:", error);
      setError("Failed to load ambassador data");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async () => {
    if (!isAuthenticated) {
      setError("Please login to claim rewards");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      if (rewards.length > 0) {
        await ambassadorAPI.claimReward(rewards[0].id);
        setSuccessMessage("Reward claimed successfully!");
        fetchAmbassadorData();
      } else {
        setError("No rewards available to claim");
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
      setError("Failed to claim reward");
    } finally {
      setLoading(false);
    }
  };

  const handleViewLeaderboard = () => {
    const leaderboardSection = document.getElementById("ambassadors-leaderboard-section");
    if (leaderboardSection) {
      leaderboardSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInviteNewMember = () => {
    if (!isAuthenticated) {
      setError("Please login to send invitations");
      navigate("/login");
      return;
    }
    navigate("/coming-soon");
  };

  const handleApplyNow = () => {
    if (!isAuthenticated) {
      setError("Please login to apply for ambassador program");
      navigate("/login");
      return;
    }
    navigate("/coming-soon");
  };

  const handleStartTraining = () => {
    navigate("/ambassadors/training");
  };

  if (showTraining) {
    return <TrainingModule onClose={() => setShowTraining(false)} />;
  }

  return (
    <div className="ambassadors-page">
      <Helmet>
        <title>Boost KE Ambassadors: From Vision to Victory, Your Legacy Awaits</title>
        <meta
          name="description"
          content="Join the Boost KE Ambassadors program and build your legacy. Earn rewards, climb the leaderboard, and invite new members to grow together."
        />
        <meta
          name="keywords"
          content="boostke ambassadors, ambassador program, rewards, legacy, vision to victory, networking"
        />
        <meta
          property="og:title"
          content="Boost KE Ambassadors: From Vision to Victory, Your Legacy Awaits"
        />
        <meta
          property="og:description"
          content="Join the Boost KE Ambassadors program and build your legacy. Earn rewards, climb the leaderboard, and invite new members to grow together."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {error && (
        <div className="mx-4 md:mx-[77px] mb-4">
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}
      
      {successMessage && (
        <div className="mx-4 md:mx-[77px] mb-4">
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        </div>
      )}

      <div 
        className="hero-section relative min-h-[75vh] flex items-center px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4), rgba(255, 140, 0, 0.3)), url(${happyBoostKE})`,
          backgroundSize: 'contain',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffa500'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffa500]/30 to-[#e6940a]/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="hidden lg:block"></div>
            
            <div className="text-left lg:pl-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white drop-shadow-lg">
                From Vision to<br />
                Victory, Your<br />
                Legacy Awaits
              </h1>

              <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-xl">💎</span>
                    </div>
                  </div>
                  <span className="text-white font-medium text-lg drop-shadow-md">Diamond Badge</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center relative">
                      <span className="text-green-600 font-bold text-sm">90%</span>
                      <div className="absolute inset-0 border-4 border-green-500 rounded-full" 
                           style={{ clipPath: 'polygon(0 0, 90% 0, 90% 100%, 0 100%)' }}>
                      </div>
                    </div>
                  </div>
                  <span className="text-white font-medium text-lg drop-shadow-md">Success Rate</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={handleClaimReward}
                  className="bg-white hover:bg-gray-100 text-[#ffa500] font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg text-sm md:text-base"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Claim Reward"}
                </button>
                
                <button 
                  onClick={handleViewLeaderboard}
                  className="bg-white hover:bg-gray-100 text-[#ffa500] font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg text-sm md:text-base"
                >
                  View Leaderboard
                </button>
                
                <button 
                  onClick={handleInviteNewMember}
                  className="bg-white hover:bg-gray-100 text-[#ffa500] font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg text-sm md:text-base"
                >
                  Invite New Member
                </button>
                
                <button 
                  onClick={handleStartTraining}
                  className="bg-[#ffa500] hover:bg-[#e6940a] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg text-sm md:text-base border-2 border-white"
                >
                  Start Training
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Mada',sans-serif]">
              The Road to Legacy
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src={roadmapImg} 
                  alt="The Road to Legacy - Ambassador Roadmap" 
                  className="w-full h-auto max-w-md mx-auto lg:max-w-full"
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-['Mada',sans-serif]">
                  Rise Through the Ranks
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                  Rise through the tiers from Aspire to The Invincibles each rank unlocks rewards, 
                  prestige, and new opportunities to build your business and brand.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 font-['Mada',sans-serif]">
                  Our Badges
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                      <img 
                        src={bronzeBadge} 
                        alt="Aspire Badge"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Aspire</h4>
                      <p className="text-gray-600 text-xs">Entry level</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                      <img 
                        src={silverBadge} 
                        alt="Visionary Partner Badge"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Visionary Partner</h4>
                      <p className="text-gray-600 text-xs">Building partnerships</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                      <img 
                        src={goldBadge} 
                        alt="Titan Influencer Badge"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Titan Influencer</h4>
                      <p className="text-gray-600 text-xs">Influential leader</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                      <img 
                        src={diamondBadge} 
                        alt="Legacy Creator Badge"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Legacy Creator</h4>
                      <p className="text-gray-600 text-xs">Creating impact</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                      <img 
                        src={platinumBadge} 
                        alt="The Invincibles Badge"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-700">The Invincibles</h4>
                      <p className="text-red-600 text-xs font-medium">Elite tier - Ultimate achievement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleApplyNow}
                  className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] hover:from-[#e6940a] hover:to-[#cc7a00] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Mada',sans-serif]">
              Milestones and Rewards
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-amber-700 mb-2">5</div>
              <div className="text-sm font-semibold text-gray-900 mb-4">Bronze Badge Holders</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Certificate of Participation (Beginner)</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-gray-600 mb-2">20</div>
              <div className="text-sm font-semibold text-gray-900 mb-4">Silver Badge Holders</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Certificate of Participation (Intermediate)</div>
                <div>• Exclusive Boost Ke merchandise</div>
                <div>• Social Media Promotions</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-yellow-600 mb-2">35</div>
              <div className="text-sm font-semibold text-gray-900 mb-4">Gold Badge Holders</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Internship Certificate (Master)</div>
                <div>• Additional Payment Cash Reward</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">50</div>
              <div className="text-sm font-semibold text-gray-900 mb-4">Diamond Badge Holders</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Certificate of Recognition by Boost KE</div>
                <div>• Payment Cash Reward (upto 2000 KES)</div>
                <div>• Feature on Boost KE Website and Social Media</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-amber-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">100</div>
              <div className="text-sm font-semibold text-gray-900 mb-4">Platinum Badge Holders</div>
              <div className="space-y-2 text-xs text-gray-600">
                <div>• Exclusive access to investors and other ventures within Boost KE</div>
                <div>• Featured Interview on Website and Social Media</div>
                <div>• Listed in Endorsements</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleApplyNow}
              className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-12 rounded-full transition-colors duration-300 text-lg shadow-lg"
            >
              Join Us Today
            </button>
          </div>
        </div>
      </div>

      <div id="ambassadors-leaderboard-section">
        <Leaderboard />
      </div>
    </div>
  );
}

export default Ambassadors;