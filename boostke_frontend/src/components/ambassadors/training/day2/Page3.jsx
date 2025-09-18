import React from 'react';

const Day2Page3 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          How BOWIE Works ⚙️
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          From Open Collaboration to Smart Systems
        </p>
      </div>

      {/* Core Principle */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">The BOWIE Growth Formula</h3>
        <p className="text-xl">
          <strong>Open Collaboration</strong> + <strong>Smart Systems</strong> = <strong>Shared Success</strong>
        </p>
      </div>

      {/* Four Key Components */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          🔧 The Four Pillars of BOWIE Operation
        </h3>

        {/* 1. Open Collaboration */}
        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-all">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-3xl">🤝</span>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-blue-900 mb-3">1. Open Collaboration</h4>
              <p className="text-lg text-blue-800 mb-4">
                Anyone can co-create — students, developers, even community leaders
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">🎓 Students Contribute</h5>
                  <p className="text-sm text-blue-800">
                    Class projects become real businesses with mentorship and support
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">💻 Developers Build</h5>
                  <p className="text-sm text-blue-800">
                    Code solutions that benefit the entire ecosystem
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">🏘️ Communities Lead</h5>
                  <p className="text-sm text-blue-800">
                    Local leaders identify needs and drive solutions
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">🌍 Global Impact</h5>
                  <p className="text-sm text-blue-800">
                    Local solutions scale to help people worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Modular Shops */}
        <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-all">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 rounded-full p-3">
              <span className="text-3xl">🏪</span>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-green-900 mb-3">2. Modular Shops</h4>
              <p className="text-lg text-green-800 mb-4">
                AI-powered smart shops that make entrepreneurship plug-and-play
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-green-800">
                  <strong>Imagine this:</strong> You have a great product idea but don't know how to 
                  set up an online store, handle payments, or manage inventory. BOWIE's modular shops 
                  provide ready-made components you can simply plug together!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">🛒</div>
                  <h6 className="font-semibold text-green-900">Store Setup</h6>
                  <p className="text-xs text-green-700">Ready-made templates</p>
                </div>
                <div className="bg-white border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">💳</div>
                  <h6 className="font-semibold text-green-900">Payment Systems</h6>
                  <p className="text-xs text-green-700">Integrated solutions</p>
                </div>
                <div className="bg-white border border-green-200 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">📦</div>
                  <h6 className="font-semibold text-green-900">Inventory</h6>
                  <p className="text-xs text-green-700">Smart management</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Tool Creation */}
        <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 rounded-full p-3">
              <span className="text-3xl">🔧</span>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-purple-900 mb-3">3. Tool Creation</h4>
              <p className="text-lg text-purple-800 mb-4">
                Build a tool or feature → earn whenever it's used
              </p>
              
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-purple-900 mb-2">The Tool Creator's Journey:</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <span className="text-purple-800">Identify a need in the ecosystem</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <span className="text-purple-800">Create a tool or solution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <span className="text-purple-800">Integrate it into the BOWIE ecosystem</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-purple-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                    <span className="text-purple-800">Earn royalties every time it's used!</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-4">
                <p className="text-purple-900 text-center font-semibold">
                  💡 <strong>Pro Tip:</strong> Even small improvements can generate significant passive income!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Smart Competition */}
        <div className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:border-orange-400 transition-all">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-100 rounded-full p-3">
              <span className="text-3xl">🏆</span>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-orange-900 mb-3">4. Smart Competition</h4>
              <p className="text-lg text-orange-800 mb-4">
                We compete to improve, not to destroy
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-semibold text-red-800 mb-2">❌ Traditional Competition</h5>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Winner takes all</li>
                    <li>• Secrets and hoarding</li>
                    <li>• Destroy competitors</li>
                    <li>• Zero-sum thinking</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">✅ BOWIE Competition</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Everyone can win</li>
                    <li>• Open collaboration</li>
                    <li>• Improve together</li>
                    <li>• Infinite-sum thinking</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 bg-orange-50 rounded-lg p-4">
                <h5 className="font-semibold text-orange-900 mb-2">🔄 Coopetition in Action</h5>
                <p className="text-orange-800 text-sm">
                  Two developers might compete to create the best payment solution, but they share 
                  insights and even collaborate on standards that benefit the entire ecosystem. 
                  Both can succeed and earn from their innovations!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transformation Example */}
      <div className="bg-gradient-to-br from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          🔄 BOWIE Transforms Competition into Collaboration
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <span className="text-2xl mr-2">🥊</span>
              Traditional Model
            </h4>
            <p className="text-gray-700 text-sm mb-3">
              Company A and Company B both need a payment system. They:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Build separate, incompatible systems</li>
              <li>• Waste resources on duplicate efforts</li>
              <li>• Keep innovations secret</li>
              <li>• Try to eliminate each other</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-[#ffa500]">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <span className="text-2xl mr-2">🤝</span>
              BOWIE Model
            </h4>
            <p className="text-gray-700 text-sm mb-3">
              Company A and Company B both need a payment system. They:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Collaborate on a shared, better system</li>
              <li>• Pool resources for faster innovation</li>
              <li>• Both earn from the shared solution</li>
              <li>• Compete on implementation and service</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ambassador Action */}
      <div className="bg-[#ffa500]/10 border border-[#ffa500]/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🎯</span>
          Ambassador Action Point
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          When explaining how BOWIE works, use <strong>real examples</strong> that resonate with your audience:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border-l-4 border-[#ffa500]">
            <h4 className="font-semibold text-gray-900 mb-2">For Students:</h4>
            <p className="text-sm text-gray-700">
              "Your class project could become a tool that helps thousands of students worldwide, 
              and you'd earn every time it's used."
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-[#e6940a]">
            <h4 className="font-semibold text-gray-900 mb-2">For Entrepreneurs:</h4>
            <p className="text-sm text-gray-700">
              "Instead of building everything from scratch, use proven modules and focus on 
              what makes your business unique."
            </p>
          </div>
        </div>
      </div>

      {/* Next Preview */}
      <div className="text-center bg-gradient-to-r from-[#e6940a]/10 to-[#ffa500]/10 rounded-xl p-6 border border-[#e6940a]/20">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Up Next: 🛤️</h3>
        <p className="text-gray-700">
          Ready to see the <strong>step-by-step pathway</strong> from your idea to global impact and lifetime income? 
          Let's explore the BOWIE opportunity journey!
        </p>
      </div>
    </div>
  );
};

export default Day2Page3;
