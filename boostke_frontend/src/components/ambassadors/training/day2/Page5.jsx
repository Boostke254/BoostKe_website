import React from 'react';

const Day2Page5 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Generational Wealth & Legacy 🏆
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          How BOWIE Empowers Students, Businesses, Governments, and Investors
        </p>
      </div>

      {/* Generational Wealth Section */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Building Legacy & Generational Success</h3>
        <p className="text-xl leading-relaxed">
          BOWIE is about more than just income—it's about creating <strong>lasting impact</strong> and 
          <strong>wealth that endures for generations</strong>.
        </p>
      </div>

      {/* Examples Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Students Example */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
          <h4 className="text-xl font-bold text-blue-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">🎓</span> Students
          </h4>
          <p className="text-blue-800 mb-2">
            Class projects become businesses, earning royalties for years to come.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              "A student app built for campus now serves thousands, generating income for its creators."
            </p>
          </div>
        </div>
        {/* Small Businesses Example */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-6">
          <h4 className="text-xl font-bold text-green-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">🏪</span> Small Businesses
          </h4>
          <p className="text-green-800 mb-2">
            Scale with shared tools and collaborative innovation.
          </p>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-700 text-sm">
              "A local shop uses BOWIE's inventory tool, grows into a chain, and shares success with the community."
            </p>
          </div>
        </div>
        {/* Governments Example */}
        <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
          <h4 className="text-xl font-bold text-purple-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">🏛️</span> Governments
          </h4>
          <p className="text-purple-800 mb-2">
            Build smarter with innovation and inclusive growth.
          </p>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-purple-700 text-sm">
              "A city adopts BOWIE-powered solutions for transport, health, and education, benefiting all citizens."
            </p>
          </div>
        </div>
        {/* Investors Example */}
        <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
          <h4 className="text-xl font-bold text-yellow-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">💰</span> Investors
          </h4>
          <p className="text-yellow-800 mb-2">
            Fund growth with purpose and earn returns that uplift communities.
          </p>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-yellow-700 text-sm">
              "Investors back innovative projects, earning returns while supporting Africa's future."
            </p>
          </div>
        </div>
      </div>

      {/* Legacy Message */}
      <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          🌱 Legacy & Generational Impact
        </h3>
        <p className="text-gray-700 text-lg mb-4">
          BOWIE is designed so that <strong>success is shared</strong> and <strong>impact lasts</strong>—from students to governments, from local shops to global investors.
        </p>
        <blockquote className="italic text-[#e6940a] text-xl font-light">
          "When we build together, we all rise together."
        </blockquote>
      </div>

      {/* Next Preview */}
      <div className="text-center bg-gradient-to-r from-[#e6940a]/10 to-[#ffa500]/10 rounded-xl p-6 border border-[#e6940a]/20">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Final Step: 🚀</h3>
        <p className="text-gray-700">
          Ready to become a BOWIE ambassador? Let's see how you can inspire others and co-create the economy Africa deserves!
        </p>
      </div>
    </div>
  );
};

export default Day2Page5;
