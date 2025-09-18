import React from 'react';

const Day3Page3 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Storytelling Is Your Superpower 📖</h2>
        <p className="text-xl text-gray-600 mb-8">People don’t buy facts. They buy feelings. Your story is more powerful than any brochure.</p>
      </div>
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Structure Your Pitch</h3>
        <ul className="list-decimal ml-8 text-lg text-gray-700 space-y-2">
          <li><span className="font-bold text-[#ffa500]">Hook:</span> Start with a relatable problem or dream</li>
          <li><span className="font-bold text-[#ffa500]">Heart:</span> Share your personal “Why I Boost” story</li>
          <li><span className="font-bold text-[#ffa500]">Help:</span> Show how Boost KE solves that problem or fuels that dream</li>
          <li><span className="font-bold text-[#ffa500]">Hope:</span> End with a clear, warm invitation to join</li>
        </ul>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Example Pitch</h3>
        <blockquote className="italic text-[#e6940a] text-lg font-light">
          “I used to feel stuck—like I had ideas but no tools. Then I found Boost KE. Now I earn, I learn, and I help others do the same. You’d love it—especially the Innovators program. Want me to show you how it works?”
        </blockquote>
      </div>
    </div>
  );
};

export default Day3Page3;
