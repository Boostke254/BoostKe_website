import React from 'react';

const Day3Page6 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Activities, Pitch Practice & Reflection 📝</h2>
        <p className="text-xl text-gray-600 mb-8">Apply what you’ve learned and build your confident sales voice.</p>
      </div>
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Roleplay Challenge</h3>
        <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
          <li>A student says, “I don’t think I’m good at selling.”</li>
          <li>A friend says, “Is Boost KE legit?”</li>
          <li>A vendor says, “I already sell on Instagram—why Boost?”</li>
        </ul>
        <p className="text-gray-700 mt-4">Write your answer using empathy, storytelling, and clarity.</p>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Pitch Practice</h3>
        <p className="text-gray-700">Write your Boost KE pitch using the 4-part structure: <br /><span className="font-semibold">Hook – Heart – Help – Hope</span></p>
      </div>
      <div className="bg-white border-2 border-[#e6940a] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Affirmations</h3>
        <blockquote className="italic text-[#e6940a] text-xl font-light text-center">
          “I’m not selling. I’m serving. I’m not convincing. I’m connecting. I am a Boost Builder.”
        </blockquote>
      </div>
      <div className="bg-gradient-to-br from-[#ffa500]/10 via-white to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🌅</span>
          End-of-Day Reflection
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
            “Today I learned that selling isn’t about pressure—it’s about purpose. My story is my strength.”
          </blockquote>
        </div>
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#ffa500] text-white px-6 py-3 rounded-full">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold">Day 3 Complete!</span>
          </div>
          <p className="text-gray-600 mt-4">
            Ready for Day 4? Your journey as a BoostKE Ambassador continues!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day3Page6;
