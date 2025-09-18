import React from "react";

const Day5Page2 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Social Selling 📲
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Boost KE thrives on platforms like WhatsApp, TikTok, and Instagram. You’re not just posting — you’re positioning yourself as a guide, a helper, a vibe.
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Social Selling Tips</h3>
        <ul className="list-disc list-inside text-left text-lg mx-auto max-w-xl text-white">
          <li>Use real stories, not just product links</li>
          <li>Keep it short, visual, and authentic</li>
          <li>End with a call to action: <span className="font-semibold">“DM me if you want to earn with Boost KE”</span></li>
        </ul>
      </div>

      {/* Mission Card */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">📱</span>
          Your Story is Your Strategy
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "Make every post count. Be authentic, be visual, and always invite others to join the movement."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day5Page2;
