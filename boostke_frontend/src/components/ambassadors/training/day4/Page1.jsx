import React from 'react';

const Day4Page1 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#ffa500] mb-4 drop-shadow-lg">Know Your Ecosystem 🌐</h2>
        <p className="text-xl text-gray-700 mb-8 font-semibold">Theme: <span className="text-[#e6940a]">Unlocking futures.</span></p>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Day Objective
        </h3>
        <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
          <li>Understand Boost KE’s full digital ecosystem</li>
          <li>Know how each section creates income, opportunity, or innovation</li>
          <li>Learn how to match the right solution to the right person</li>
          <li>Practice pitching with clarity and confidence</li>
        </ul>
      </div>
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🌱</span>
          Boost KE: An Open Source Ecosystem
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Every section of Boost KE is designed to help someone earn, grow, or co-create. You’re not just promoting a product—you’re guiding people into a system that works for them.
        </p>
        <blockquote className="italic text-[#e6940a] text-xl font-light text-center">
          “Boost KE is where opportunity and wealth creation are open sourced for all.”
        </blockquote>
      </div>
    </div>
  );
};

export default Day4Page1;
