import React from 'react';

const Day4Page5 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ffa500] mb-4 drop-shadow-lg">Activities: Matching Game & Pitch Challenge 🎲</h2>
        <p className="text-xl text-gray-700 mb-8 font-semibold">Practice guiding people and pitching Boost KE sections.</p>
      </div>
      <div className="bg-white border-2 border-[#e6940a] rounded-xl p-6 shadow-md mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ecosystem Matching Game</h3>
        <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
          <li>A student who wants to earn from online gigs <span className="font-bold text-[#e6940a]">→ Freelance</span></li>
          <li>A vendor who wants a digital shop <span className="font-bold text-[#e6940a]">→ Vendors</span></li>
          <li>A creator with an idea for a new app <span className="font-bold text-[#e6940a]">→ Innovators</span></li>
          <li>An influencer with a loyal fan base <span className="font-bold text-[#e6940a]">→ Flagship Community</span></li>
          <li>A local entrepreneur who wants to onboard businesses <span className="font-bold text-[#e6940a]">→ Marketplace</span></li>
        </ul>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20 shadow-lg mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Pitch a Section Challenge</h3>
        <p className="text-gray-700 mb-2">Choose one Boost KE section and write a short pitch for it. Use the format:</p>
        <ul className="list-decimal ml-8 text-lg text-gray-700 space-y-2">
          <li>Problem</li>
          <li>Section</li>
          <li>Promise</li>
        </ul>
        <div className="bg-white rounded-lg p-4 border border-gray-200 mt-4">
          <p className="italic text-[#e6940a] text-lg font-light">
            “Many creators have ideas but no way to build them. That’s why in Boost KE you get a space to co-create, fabricate, and earn. Your idea could be the next big thing.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day4Page5;
