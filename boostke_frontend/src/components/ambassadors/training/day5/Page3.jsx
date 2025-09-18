import React from "react";

const Day5Page3 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Referral Engine Setup 🔗
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Every ambassador gets a unique referral link. When someone joins through it, you earn.
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">How to Use Your Referral Link</h3>
        <ul className="list-disc list-inside text-left text-lg mx-auto max-w-xl text-white">
          <li>Share it in your bio, stories, and WhatsApp status</li>
          <li>Pair it with a personal message: <span className="font-semibold">“This changed how I earn — try it out”</span></li>
          <li>Track your clicks and conversions on your dashboard</li>
        </ul>
      </div>

      {/* Mission Card */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🔗</span>
          Your Digital Key
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "Your referral link unlocks opportunity. Share it with intention and track your impact."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day5Page3;
