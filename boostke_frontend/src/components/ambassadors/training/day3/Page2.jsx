import React from 'react';

const Day3Page2 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Starting a Business Inside Boost KE 💡</h2>
        <p className="text-xl text-gray-600 mb-8">Boost KE is an open-source wealth engine. Anyone can enter, build, and earn.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#ffa500] mb-2">Flagship Community (Ambassadors)</h3>
          <p className="text-gray-700 mb-2">Build your own Boost hub. Every member, vendor, or innovator you bring in becomes part of your flagship. You earn for life through commissions, royalties, and revenue shares.</p>
        </div>
        <div className="bg-white border-2 border-[#e6940a] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#e6940a] mb-2">Franchising with Boost</h3>
          <p className="text-gray-700 mb-2">Own a Boost Franchise. These physical touchpoints give you territory rights, visibility, and revenue from microhubs operating under you.</p>
        </div>
        <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Freelancing & Skills Monetization</h3>
          <p className="text-gray-700 mb-2">Bring your talents—web development, design, events, content, training. Form a group, plug into Boost KE, and serve the ecosystem. You get clients, visibility, and steady income.</p>
        </div>
        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-600 mb-2">Co-Creation & Innovation</h3>
          <p className="text-gray-700 mb-2">Got an idea? Prototype it inside the Boost Open Infinity Hub. If it scales, you retain IP ownership and earn royalties for life.</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20 text-center">
        <blockquote className="italic text-[#e6940a] text-xl font-light">
          “You’re not just here to sell Boost KE. You’re here to start businesses within it and help others do the same.”
        </blockquote>
      </div>
    </div>
  );
};

export default Day3Page2;
