import React from 'react';

const ecosystemSections = [
  { icon: "💼", title: "Freelance", desc: "Monetize your skills and talents.", color: "from-blue-50 to-blue-100 border-blue-500 text-blue-900", concept: "Turn your skills into income by offering services, gigs, and expertise to the Boost KE community. Freelance empowers you to work on your terms and build your reputation." },
  { icon: "🛒", title: "Marketplace", desc: "Shop, sell, and grow your business.", color: "from-green-50 to-green-100 border-green-500 text-green-900", concept: "Access a vibrant digital marketplace where you can sell products, discover new opportunities, and grow your business with powerful tools and a supportive network." },
  { icon: "💡", title: "Innovators", desc: "Co-create, prototype, and earn royalties.", color: "from-purple-50 to-purple-100 border-purple-500 text-purple-900", concept: "Bring your ideas to life! Innovators is the space for creators to prototype, collaborate, and earn royalties from their inventions and solutions." },
  { icon: "👥", title: "Flagship Community", desc: "Build your own hub and earn for life.", color: "from-yellow-50 to-yellow-100 border-yellow-500 text-yellow-900", concept: "Lead your own community, onboard members, and earn lifetime income. Flagship Ambassadors create hubs of opportunity and support for others." },
  { icon: "🏪", title: "Vendors", desc: "Digital shops for local entrepreneurs.", color: "from-orange-50 to-orange-100 border-orange-500 text-orange-900", concept: "Set up a digital shop, reach new customers, and manage your business with ease. Vendors unlock new revenue streams and business growth." },
  { icon: "📈", title: "Franchise", desc: "Own territory, manage microhubs, earn revenue.", color: "from-pink-50 to-pink-100 border-pink-500 text-pink-900", concept: "Become a franchise owner, manage microhubs, and earn from the growth of your territory. Franchises expand Boost KE’s reach and impact." },
  { icon: "🌍", title: "Ecosystem", desc: "Connect, collaborate, and unlock opportunity.", color: "from-[#ffa500]/10 to-[#e6940a]/10 border-[#ffa500] text-[#e6940a]", concept: "The heart of Boost KE—where everyone connects, collaborates, and finds new ways to earn, grow, and innovate together." },
];

const Day4Page2 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ecosystem Overview 🗺️</h2>
        <p className="text-xl text-gray-600 mb-8">Explore every section and its unique opportunity.</p>
      </div>
      {/* Vibrant Gradient Hero */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Boost KE Digital Ecosystem</h3>
        <h4 className="text-2xl font-light mb-6">Open Source Wealth & Opportunity</h4>
        <p className="text-xl leading-relaxed">
          Every section is designed to <strong>unlock income, innovation, and impact</strong> for everyone.
        </p>
      </div>
      {/* Section Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Explore the Sections</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {ecosystemSections.map((section, idx) => (
            <div key={idx} className={`bg-gradient-to-r ${section.color} border-l-4 rounded-lg p-6 mb-4 shadow-md flex items-start`}>
              <div className="text-4xl mr-4">{section.icon}</div>
              <div>
                <h4 className="text-2xl font-bold mb-2">{section.title}</h4>
                <p className="text-lg mb-2">{section.desc}</p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700">{section.concept}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Inspirational Quote */}
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20 text-center">
        <blockquote className="italic text-[#e6940a] text-xl font-light">
          “Every section is a gateway to income, innovation, and impact.”
        </blockquote>
      </div>
    </div>
  );
};

export default Day4Page2;
