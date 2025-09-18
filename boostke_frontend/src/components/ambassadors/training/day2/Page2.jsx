import React from 'react';

const Day2Page2 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What is BOWIE? 🏗️
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Understanding the Five Engines of Shared Wealth Creation
        </p>
      </div>

      {/* BOWIE Definition */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">BOWIE</h3>
        <h4 className="text-2xl font-light mb-6">Boost Open Wealth & Impact Economy</h4>
        <p className="text-xl leading-relaxed">
          A system designed to <strong>unlock opportunity</strong> instead of restricting it
        </p>
      </div>

      {/* Core Philosophy */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          🌟 The BOWIE Philosophy
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <blockquote className="text-xl text-center italic text-gray-800 leading-relaxed">
            "With BOWIE, success isn't for a few — it's <strong>shared by everyone who contributes</strong>."
          </blockquote>
        </div>
      </div>

      {/* The Five Engines */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          ⚙️ The Five Engines of BOWIE
        </h3>
        
        {/* Build Engine */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🔨</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-blue-900 mb-3">BUILD</h4>
              <p className="text-lg text-blue-800 mb-3">
                Create ideas, projects, and businesses
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700">
                  Turn your vision into reality. Whether it's a mobile app, a innovative solution, 
                  or a business concept, BOWIE provides the platform to build and prototype your ideas 
                  with support from the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Own Engine */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🛡️</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-green-900 mb-3">OWN</h4>
              <p className="text-lg text-green-800 mb-3">
                Protect your intellectual property (IP) and retain control
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700">
                  Your ideas remain <strong>yours</strong>. BOWIE ensures you maintain ownership 
                  of your intellectual property while benefiting from collaborative development. 
                  No idea theft, no exploitation—just fair ownership.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Engine */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">💼</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-purple-900 mb-3">WORK</h4>
              <p className="text-lg text-purple-800 mb-3">
                Access jobs, skills, and opportunities in the ecosystem
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700">
                  Find meaningful work, develop new skills, and contribute to projects 
                  that matter. The BOWIE ecosystem creates jobs and opportunities 
                  across all skill levels and interests.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invest Engine */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">📈</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-yellow-900 mb-3">INVEST</h4>
              <p className="text-lg text-yellow-800 mb-3">
                Back projects, earn returns, and support innovation
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700">
                  Support promising ideas with your resources—whether time, money, or expertise. 
                  As projects grow, investors share in the success through returns that benefit 
                  everyone in the ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Earn Engine */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">💰</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-orange-900 mb-3">EARN</h4>
              <p className="text-lg text-orange-800 mb-3">
                Generate income through royalties, tools, shops, and services
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700">
                  Create multiple income streams. Earn royalties from your innovations, 
                  generate revenue from tools and services, or build successful shops. 
                  BOWIE ensures creators are rewarded for their contributions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How They Work Together */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🔄 How the Engines Work Together
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-[#ffa500]">
              <h4 className="font-bold text-gray-900 mb-2">🔄 Continuous Cycle</h4>
              <p className="text-gray-700 text-sm">
                Each engine feeds into the others, creating a self-sustaining ecosystem of growth and opportunity.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-[#e6940a]">
              <h4 className="font-bold text-gray-900 mb-2">⚡ Amplified Impact</h4>
              <p className="text-gray-700 text-sm">
                When all engines work together, individual efforts are amplified across the entire network.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border-l-4 border-[#ffa500]">
              <h4 className="font-bold text-gray-900 mb-2">🤝 Mutual Benefit</h4>
              <p className="text-gray-700 text-sm">
                Success in one area creates opportunities and benefits in all other areas.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border-l-4 border-[#e6940a]">
              <h4 className="font-bold text-gray-900 mb-2">🌱 Scalable Growth</h4>
              <p className="text-gray-700 text-sm">
                The system grows stronger as more people participate, creating exponential value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambassador Insight */}
      <div className="bg-[#ffa500]/10 border border-[#ffa500]/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">💡</span>
          Ambassador Insight
        </h3>
        <p className="text-gray-700 leading-relaxed">
          When explaining BOWIE to others, focus on how <strong>all five engines work together</strong>. 
          It's not just about building or earning—it's about creating a complete ecosystem where 
          <strong>everyone's contribution is valued and rewarded</strong>. This is what makes BOWIE 
          revolutionary compared to traditional economic models.
        </p>
      </div>

      {/* Next Preview */}
      <div className="text-center bg-gradient-to-r from-[#e6940a]/10 to-[#ffa500]/10 rounded-xl p-6 border border-[#e6940a]/20">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Up Next: 🚀</h3>
        <p className="text-gray-700">
          Now that you understand the five engines, let's explore <strong>how BOWIE actually works</strong> 
          in practice—from open collaboration to smart systems!
        </p>
      </div>
    </div>
  );
};

export default Day2Page2;
