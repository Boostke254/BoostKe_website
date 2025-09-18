import React from "react";

const Day6Page6 = ({ onFinish }) => (
  <div className="space-y-8">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">End of Training & Graduation 🎉</h2>
      <p className="text-xl text-gray-600 mb-8">“Today I stepped into my power. I’m not just trained — I’m transformed. I am a Boost ambassador.”</p>
    </div>
    <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold mb-4">Final Activities</h3>
      <ul className="list-disc list-inside text-left text-lg mx-auto max-w-xl text-white">
        <li>Final Pitch Challenge: Write or record your best Boost KE pitch. Use everything you’ve learned: story, clarity, confidence.</li>
        <li>Join the First 1,000 Wall: Submit your Boost name, pitch, and pledge to be featured as one of the founding ambassadors.</li>
      </ul>
    </div>
    <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center"><span className="text-3xl mr-3">🎉</span>Congratulations!</h3>
      <div className="bg-[#ffa500]/5 rounded-lg p-6">
        <p className="text-lg text-gray-700 italic text-center leading-relaxed">“You didn’t just finish training. You started a legacy. Welcome to the Boostfam!”</p>
      </div>
      <button
        className="mt-8 px-8 py-4 bg-[#ffa500] text-white font-bold rounded-xl shadow-lg hover:bg-[#e6940a] transition-all text-xl"
        onClick={onFinish}
      >
        Finish Training
      </button>
    </div>
  </div>
);

export default Day6Page6;
