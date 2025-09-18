import React from 'react';

const Day3Page1 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">The Art of Selling 🗣️</h2>
        <p className="text-xl text-gray-600 mb-8">Theme: <span className="font-semibold text-[#ffa500]">Speak with soul. Sell with service.</span></p>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Day Objective
        </h3>
        <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
          <li>Understand that selling is about helping, not hustling</li>
          <li>Learn how to pitch Boost KE using storytelling and emotion</li>
          <li>Practice handling objections with empathy</li>
          <li>Begin building their own confident sales voice</li>
        </ul>
      </div>
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🤝</span>
          Sales = Service
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Selling isn’t convincing. It’s caring. When you pitch Boost KE, you’re not pushing a product—you’re offering someone a chance to earn, grow, and belong.
        </p>
        <blockquote className="italic text-[#e6940a] text-xl font-light text-center">
          “If you truly believe Boost KE can help someone, then sharing it is an act of service.”
        </blockquote>
      </div>
    </div>
  );
};

export default Day3Page1;
