import React from 'react';

const Day2Page6 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Call to Action for Ambassadors 🚀
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Empower Yourself & Others to Build the Economy Africa Deserves
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">This is the Boost KE Open Source Economy</h3>
        <p className="text-xl leading-relaxed">
          Powered by people, guided by purpose. <br />
          <span className="font-semibold">Let’s build smarter, compete better, and earn together.</span>
        </p>
        <p className="mt-6 text-lg">
          <span className="font-bold">Join us and co-create the economy Africa deserves.</span>
        </p>
      </div>

      {/* Ambassador Activities */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">📝</span>
          Activities & Reflection
        </h3>
        <div className="space-y-4">
          <div className="bg-[#ffa500]/10 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">1. Share the BOWIE Vision</h4>
            <p className="text-gray-700 text-sm">
              Write a short message or record a video explaining BOWIE to a friend, classmate, or colleague. How would you inspire them to join?
            </p>
          </div>
          <div className="bg-[#e6940a]/10 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">2. Identify an Opportunity</h4>
            <p className="text-gray-700 text-sm">
              Think of a problem in your community or school. How could BOWIE help solve it? Sketch out your idea and share it with the group.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">3. Reflection</h4>
            <p className="text-gray-700 text-sm">
              What does "shared success" mean to you? How can you help others benefit from the BOWIE model?
            </p>
          </div>
        </div>
      </div>

      {/* End-of-Day Reflection */}
      <div className="bg-gradient-to-br from-[#ffa500]/10 via-white to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🌅</span>
          End-of-Day Reflection
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
            "Today I've learned that BOWIE is a movement for open wealth and impact. I am part of building a future bigger and brighter for Africa and the world."
          </blockquote>
        </div>
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#ffa500] text-white px-6 py-3 rounded-full">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold">Day 2 Complete!</span>
          </div>
          <p className="text-gray-600 mt-4">
            Ready for Day 3? Your journey as a BoostKE Ambassador continues!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day2Page6;
