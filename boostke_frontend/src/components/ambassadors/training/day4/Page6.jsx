import React from 'react';

const Day4Page6 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e6940a] mb-4 drop-shadow-lg">End-of-Day Reflection 🌅</h2>
        <p className="text-xl text-gray-700 mb-8 font-semibold">Celebrate your new skills and confidence as an ecosystem guide!</p>
      </div>
      <div className="bg-gradient-to-br from-[#ffa500]/10 via-white to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Reflection
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
            “Today I learned that Boost KE is a movement—now I know how to guide people into the part that fits them best.”
          </blockquote>
        </div>
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#ffa500] text-white px-6 py-3 rounded-full">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold">Day 4 Complete!</span>
          </div>
          <p className="text-gray-600 mt-4">
            Ready for Day 5? Your journey as a BoostKE Ambassador continues!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day4Page6;
