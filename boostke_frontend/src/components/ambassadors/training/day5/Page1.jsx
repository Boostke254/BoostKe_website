import React from "react";

const Day5Page1 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Digital Hustle — Sell Online Like a Pro 📱
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Theme: <span className="font-semibold text-[#e6940a]">“Your phone is your prize. Your story is your strategy.”</span>
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Day 5: Digital Hustle
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, you’ll learn how to <strong>sell through social media and referrals</strong>, create content that connects and converts, set up your referral tools, and start building your digital presence as a Boost Builder.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Your Ambassador Mission
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "By the end of today, you’ll know how to <strong>sell with story, serve with content, and earn with every click</strong>. Your phone is your prize—let’s unlock its power!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day5Page1;
