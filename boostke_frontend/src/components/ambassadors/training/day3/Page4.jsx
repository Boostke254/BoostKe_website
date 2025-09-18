import React from 'react';

const Day3Page4 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Magnetic Conversations 🧲</h2>
        <p className="text-xl text-gray-600 mb-8">Great ambassadors don’t talk at people—they talk with them.</p>
      </div>
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Tips for Magnetic Conversations</h3>
        <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
          <li>Ask questions: <span className="italic">“What kind of side hustle would excite you?”</span></li>
          <li>Listen actively: Repeat what they say to show you understand</li>
          <li>Guide gently: <span className="italic">“Based on what you said, Boost KE could be perfect for you.”</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Day3Page4;
