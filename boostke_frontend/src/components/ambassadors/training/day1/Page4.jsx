import React from 'react';

const Page4 = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why Ambassadors Matter 🌟
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Ambassadors are not just promoters — they're pioneers.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#ffa500]/10 via-white to-[#e6940a]/10 rounded-2xl p-8 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          You are the frontline of this revolution
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa500] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✨</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Spark curiosity and guide people into the ecosystem
                </h4>
                <p className="text-gray-600">
                  You're the first point of contact, creating interest and showing the way forward.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#e6940a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📖</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Share stories, not scripts
                </h4>
                <p className="text-gray-600">
                  Authentic experiences resonate more than rehearsed pitches. Your journey inspires others.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa500] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏢</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Build flagship communities that grow with you
                </h4>
                <p className="text-gray-600">
                  Create thriving networks that evolve and expand over time.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#e6940a] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Earn through referrals, royalties, and revenue shares
                </h4>
                <p className="text-gray-600">
                  Multiple income streams that reward your efforts and grow with your success.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#ffa500] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👑</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Represent the movement with dignity, clarity, and culture
                </h4>
                <p className="text-gray-600">
                  You embody our values and carry our mission forward with pride and purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          The Ambassador Impact Model
        </h3>
        <div className="flex items-center justify-center space-x-4 text-sm font-medium">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#ffa500] rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
              1
            </div>
            <p className="text-gray-700">Connect</p>
          </div>
          <div className="text-[#ffa500] text-2xl">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#e6940a] rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
              2
            </div>
            <p className="text-gray-700">Engage</p>
          </div>
          <div className="text-[#ffa500] text-2xl">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#ffa500] rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
              3
            </div>
            <p className="text-gray-700">Transform</p>
          </div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-[#ffa500] to-[#e6940a] rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">
          Ambassadors are the heartbeat of Boost KE
        </h3>
        <p className="text-lg opacity-90">
          You don't just sell — you scale impact.
        </p>
      </div>
    </div>
  );
};

export default Page4;
