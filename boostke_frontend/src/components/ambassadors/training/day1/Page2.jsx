import React from 'react';

const Page2 = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          The Vision 🌍
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Boost KE isn't just a business. It's a blueprint for a new economy.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#ffa500]/10 via-[#e6940a]/5 to-[#ffa500]/10 rounded-2xl p-8 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          We're building a future where:
        </h3>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#ffa500] rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">1</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Innovation is community-powered
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Great ideas come from everywhere. We harness collective creativity to solve real problems and create lasting value.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#e6940a] rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">2</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Wealth creation is open-sourced
              </h4>
              <p className="text-gray-600 leading-relaxed">
                No gatekeepers, no barriers. Everyone has access to the tools, knowledge, and opportunities to build wealth.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#ffa500] rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">3</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Anyone can earn, grow, and co-own the future
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a student, vendor, creator, or dreamer — this is your launchpad to financial freedom.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">🎓</div>
          <p className="font-medium text-gray-900">Students</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">🛍️</div>
          <p className="font-medium text-gray-900">Vendors</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">🎨</div>
          <p className="font-medium text-gray-900">Creators</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
          <div className="text-3xl mb-2">✨</div>
          <p className="font-medium text-gray-900">Dreamers</p>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-[#ffa500] to-[#e6940a] rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">
          This is Africa's first Open Wealth & Impact Economy
        </h3>
        <p className="text-lg opacity-90">
          And you're one of its architects.
        </p>
      </div>
    </div>
  );
};

export default Page2;
