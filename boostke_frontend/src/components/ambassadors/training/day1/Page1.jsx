import React from 'react';

const Page1 = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to the Movement 🚀
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Your journey as a BoostKE Ambassador begins here
        </p>
      </div>

      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Objective
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Introduce Boost KE as <strong>Africa's first Open Wealth & Impact Economy</strong> — 
          a regenerative ecosystem where opportunities are co-created, and wealth is shared. 
          Anyone can come to Boost KE to build, contribute, and earn for life.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🏗️</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Build</h4>
          <p className="text-gray-600">
            Create opportunities and solutions that matter to your community
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🤝</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Contribute</h4>
          <p className="text-gray-600">
            Share your skills, ideas, and passion to grow the ecosystem
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">💰</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Earn</h4>
          <p className="text-gray-600">
            Generate sustainable income through multiple revenue streams
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-4">🌱</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Grow</h4>
          <p className="text-gray-600">
            Develop personally and professionally within our supportive community
          </p>
        </div>
      </div>

      <div className="text-center bg-[#ffa500]/5 rounded-xl p-6">
        <p className="text-lg text-gray-700 font-medium">
          "This is your invitation to be part of something bigger than yourself. 
          Welcome to the future of wealth creation in Africa."
        </p>
      </div>
    </div>
  );
};

export default Page1;
