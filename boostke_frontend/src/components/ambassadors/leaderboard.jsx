import React, { useState } from 'react';

const monthlyData = [
  {
    rank: 1,
    name: 'Suraj Khandwal',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹9300',
    crown: 'gold',
    socials: {
      tiktok: '@suraj_boost',
      instagram: '@surajkhandwal',
      twitter: '@suraj_ke'
    }
  },
  {
    rank: 2,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹8900',
    crown: 'orange',
    socials: {
      tiktok: '@sarah_boost',
      instagram: '@sarahjohnson',
      twitter: '@sarah_ke'
    }
  },
  {
    rank: 3,
    name: 'Mike Chen',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹7010',
    crown: 'orange',
    socials: {
      tiktok: '@mike_boost',
      instagram: '@mikechen',
      twitter: '@mike_ke'
    }
  },
  {
    rank: 4,
    name: 'Lisa Park',
    avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹7000',
    crown: 'orange',
    socials: {
      tiktok: '@lisa_boost',
      instagram: '@lisapark',
      twitter: '@lisa_ke'
    }
  },
  {
    rank: 5,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹6900',
    crown: 'orange',
    socials: {
      tiktok: '@john_boost',
      instagram: '@johndoe',
      twitter: '@john_ke'
    }
  },
  {
    rank: 6,
    name: 'Priya Singh',
    avatar: 'https://randomuser.me/api/portraits/women/49.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹6900',
    crown: 'orange',
    socials: {
      tiktok: '@priya_boost',
      instagram: '@priyasingh',
      twitter: '@priya_ke'
    }
  },
  {
    rank: 7,
    name: 'Amit Patel',
    avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹6900',
    crown: 'orange',
    socials: {
      tiktok: '@amit_boost',
      instagram: '@amitpatel',
      twitter: '@amit_ke'
    }
  },
  {
    rank: 8,
    name: 'Riya Mehra',
    avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
    location: 'Jaipur, Rajasthan',
    achievement: 'Achievement',
    reward: '₹6900',
    crown: 'orange',
    socials: {
      tiktok: '@riya_boost',
      instagram: '@riyamehra',
      twitter: '@riya_ke'
    }
  },
];

const quarterlyData = monthlyData.map((item, idx) => ({
  ...item,
  reward: `₹${parseInt(item.reward.replace('₹','')) + 2000}`,
}));

function LeaderboardTabs() {
  const [tab, setTab] = useState('monthly');
  const data = tab === 'monthly' ? monthlyData : quarterlyData;

  return (
    <div className="mt-16">
      <div className="flex justify-center mb-8">
        <button
          className={`px-8 py-2 rounded-l-full font-semibold text-lg focus:outline-none transition-colors duration-200 ${tab === 'monthly' ? 'bg-white text-[#ffa500] shadow' : 'bg-white/30 text-white'}`}
          onClick={() => setTab('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-8 py-2 rounded-r-full font-semibold text-lg focus:outline-none transition-colors duration-200 ${tab === 'quarterly' ? 'bg-white text-[#ffa500] shadow' : 'bg-white/30 text-white'}`}
          onClick={() => setTab('quarterly')}
        >
          Quarterly
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md">
          {data.map((user, idx) => (
            <div key={user.rank} className="flex items-center px-6 py-4 border-b border-white/20 last:border-b-0 bg-white/20 hover:bg-white/10 transition-colors">
              {/* Crown */}
              <div className="w-10 flex-shrink-0 flex justify-center">
                {user.crown === 'gold' ? (
                  <span className="text-2xl">🥇</span>
                ) : (
                  <span className="text-2xl text-[#ffa500]">👑</span>
                )}
              </div>
              {/* Avatar */}
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover mx-3" />
              {/* Name & Location */}
              <div className="flex flex-col flex-grow">
                <span className="font-semibold text-white text-base">{user.name}</span>
                <span className="text-white/80 text-xs">{user.location}</span>
              </div>
              {/* Achievement */}
              <div className="flex items-center mx-6">
                <span className="bg-[#ffebc8] text-[#ffa500] px-3 py-1 rounded-full text-xs font-semibold mr-2">{user.achievement}</span>
                {/* Social Media Handles */}
                <span className="mx-1" title="TikTok">
                  <svg className="w-5 h-5 inline text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
                  </svg>
                </span>
                <span className="mx-1" title="Instagram">
                  <svg className="w-5 h-5 inline text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <span className="mx-1" title="X (Twitter)">
                  <svg className="w-5 h-5 inline text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </span>
              </div>
              {/* Reward */}
              <div className="flex items-center">
                <span className="text-[#ffa500] text-2xl mr-2">🏆</span>
                <span className="font-bold text-white text-lg">{user.reward}</span>
                <span className="text-white/80 text-xs ml-2">Rewards</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Leaderboard = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-[#ffa500] via-[#e6940a] to-[#ffa500]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Weekly Top Leaderboard</h2>
          <p className="text-xl text-white/80">
            See who's leading in reviews and referrals this week
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Reviews Card */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-[#ffa500] p-2 rounded-lg mr-3">⭐</span>
              Top Reviews
            </h3>
            
            <div className="space-y-4">
              {/* First Place */}
              <div className="flex items-center bg-[#ffa500]/30 rounded-xl p-4 border border-white/50">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Suraj Khandwal" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-white font-semibold">Suraj Khandwal</h4>
                  <p className="text-white/80 text-sm">Junior Salesman</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-lg mr-2">⭐</span>
                    <span className="text-white font-bold">35</span>
                    <span className="text-white/80 text-sm ml-1">Approved Reviews</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-[#ffa500] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Gold
                  </div>
                </div>
              </div>

              {/* Second Place */}
              <div className="flex items-center bg-white/10 rounded-xl p-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Sarah Johnson" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-gray-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-white font-semibold">Sarah Johnson</h4>
                  <p className="text-white/80 text-sm">Senior Advisor</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-lg mr-2">⭐</span>
                    <span className="text-white font-bold">28</span>
                    <span className="text-white/80 text-sm ml-1">Approved Reviews</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Silver
                  </div>
                </div>
              </div>

              {/* Third Place */}
              <div className="flex items-center bg-white/10 rounded-xl p-4">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Mike Chen" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h4 className="text-white font-semibold">Mike Chen</h4>
                  <p className="text-white/80 text-sm">Marketing Lead</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-lg mr-2">⭐</span>
                    <span className="text-white font-bold">22</span>
                    <span className="text-white/80 text-sm ml-1">Approved Reviews</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Bronze
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Referrals Card */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="bg-[#ffa500] p-2 rounded-lg mr-3">👥</span>
              Top Referrals
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left */}
              <div className="bg-[#ffa500]/30 rounded-xl p-4 border border-white/50">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Suraj Khandwal" 
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                  />
                  <h4 className="text-white font-semibold text-sm">Suraj Khandwal</h4>
                  <p className="text-white/80 text-xs">Junior Salesman</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-blue-300 mr-1">👥</span>
                      <span className="text-white font-bold">345</span>
                      <span className="text-white/80 ml-1">Referrals</span>
                    </div>
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-yellow-400 mr-1">💰</span>
                      <span className="text-white font-bold">₹200</span>
                      <span className="text-white/80 ml-1">Rewards</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Right */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Sarah Johnson" 
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                  />
                  <h4 className="text-white font-semibold text-sm">Sarah Johnson</h4>
                  <p className="text-white/80 text-xs">Senior Advisor</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-blue-300 mr-1">👥</span>
                      <span className="text-white font-bold">298</span>
                      <span className="text-white/80 ml-1">Referrals</span>
                    </div>
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-yellow-400 mr-1">💰</span>
                      <span className="text-white font-bold">₹180</span>
                      <span className="text-white/80 ml-1">Rewards</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Left */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Mike Chen" 
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                  />
                  <h4 className="text-white font-semibold text-sm">Mike Chen</h4>
                  <p className="text-white/80 text-xs">Marketing Lead</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-blue-300 mr-1">👥</span>
                      <span className="text-white font-bold">276</span>
                      <span className="text-white/80 ml-1">Referrals</span>
                    </div>
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-yellow-400 mr-1">💰</span>
                      <span className="text-white font-bold">₹165</span>
                      <span className="text-white/80 ml-1">Rewards</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Right */}
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format" 
                    alt="Lisa Park" 
                    className="w-12 h-12 rounded-full object-cover mx-auto mb-2"
                  />
                  <h4 className="text-white font-semibold text-sm">Lisa Park</h4>
                  <p className="text-white/80 text-xs">Sales Executive</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-blue-300 mr-1">👥</span>
                      <span className="text-white font-bold">254</span>
                      <span className="text-white/80 ml-1">Referrals</span>
                    </div>
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-yellow-400 mr-1">💰</span>
                      <span className="text-white font-bold">₹152</span>
                      <span className="text-white/80 ml-1">Rewards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Full Leaderboard Button */}
        <div className="text-center mt-8">
          <button className="bg-white text-[#ffa500] px-8 py-3 rounded-lg font-semibold hover:bg-[#ffebc8] transition-colors">
            View Full Leaderboard
          </button>
        </div>
      </div>

      {/* Monthly/Quarterly Leaderboard Section */}
      <LeaderboardTabs />
    </div>
  );
};

export default Leaderboard;
