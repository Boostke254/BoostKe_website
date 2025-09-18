import React from "react";

const Day5Page6 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          End-of-Day Reflection 💡
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Reflect on your journey and get ready to build your digital presence as a Boost Builder!
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">What Did You Learn?</h3>
        <p className="text-xl leading-relaxed">
          “Today I learned that my phone is for scaling. I now know how to sell with story, serve with content, and earn with every click.”
        </p>
      </div>

      {/* Mission Card */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">💡</span>
          Reflect & Build
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "Your digital journey starts here. Keep learning, keep sharing, and keep building your Boost presence!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day5Page6;
