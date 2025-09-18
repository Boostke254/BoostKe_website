import React from "react";

const Day5Page5 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Activities 📝
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Take action and start building your digital hustle!
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Your Tasks</h3>
        <ul className="list-disc list-inside text-left text-lg mx-auto max-w-xl text-white">
          <li>Post a Boost Story: Choose one platform and draft a post that introduces Boost KE. Share the link below.</li>
          <li>Set Your Referral Goal: Write down how many people you want to reach this week.</li>
        </ul>
      </div>

      {/* Mission Card */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">📝</span>
          Take Action
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "Your digital hustle starts with action. Share your story, set your goals, and inspire others to join."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day5Page5;
