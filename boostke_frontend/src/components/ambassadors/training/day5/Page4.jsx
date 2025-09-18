import React from "react";

const Day5Page4 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Content Creation That Converts 🎬
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Boost KE is a movement, so make your content feel like culture. Incorporate Boost KE into your daily content and let it resonate with what you generate.
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Content Ideas</h3>
        <ul className="list-disc list-inside text-left text-lg mx-auto max-w-xl text-white">
          <li>Short videos: <span className="font-semibold">“A day in the life of a Boost Builder”</span></li>
          <li>Memes: <span className="font-semibold">“When your side hustle pays for your lunch”</span></li>
          <li>Testimonials: Share how Boost KE helped someone earn or grow</li>
          <li>Boost Boost Challenges: Create a viral moment with your own twist</li>
        </ul>
      </div>

      {/* Mission Card */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎬</span>
          Make It Real, Make It Fun
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "If it feels real, it will resonate. If it feels fun, it will spread. Let your content reflect your journey and invite others to join."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Day5Page4;
