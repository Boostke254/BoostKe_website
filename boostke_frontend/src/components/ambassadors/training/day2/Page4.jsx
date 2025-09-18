import React from 'react';

const Day2Page4 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          The Opportunity Pathway 🛤️
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          From Idea → Impact → Income: Your Journey to Success
        </p>
      </div>

      {/* Ambassador Takeaway */}
      <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] text-white rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">🎯 Ambassador Takeaway</h3>
        <p className="text-xl leading-relaxed">
          Even the <strong>smallest idea</strong> can generate <strong>global impact</strong> + <strong>lifetime wealth</strong>
        </p>
      </div>

      {/* The 4-Step Pathway */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          🚀 The BOWIE Success Journey
        </h3>

        {/* Step 1: Drop an Idea */}
        <div className="relative">
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6 hover:border-blue-500 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-blue-900 mb-3">💡 Drop an Idea into the Ecosystem</h4>
                <p className="text-lg text-blue-800 mb-4">
                  Share your vision with the BOWIE community and watch it come to life
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Examples of Ideas That Started Small:</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="font-semibold text-blue-900">📱 Student App</div>
                      <p className="text-sm text-blue-700">"What if students could easily find study groups?"</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="font-semibold text-blue-900">🛒 Local Shop Tool</div>
                      <p className="text-sm text-blue-700">"Small businesses need simple inventory management"</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="font-semibold text-blue-900">🌾 Farming Solution</div>
                      <p className="text-sm text-blue-700">"Farmers need weather alerts on their phones"</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-blue-200">
                      <div className="font-semibold text-blue-900">💳 Payment Feature</div>
                      <p className="text-sm text-blue-700">"Mobile money needs better security"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    <strong>The Magic:</strong> Your idea doesn't have to be perfect or complete. 
                    The BOWIE ecosystem helps you refine, develop, and scale it!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center my-4">
            <div className="text-3xl text-gray-400">⬇️</div>
          </div>
        </div>

        {/* Step 2: Prototype & Protect */}
        <div className="relative">
          <div className="bg-white border-2 border-green-300 rounded-xl p-6 hover:border-green-500 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-green-900 mb-3">🔧 Prototype & Protect with BoostKE's Support</h4>
                <p className="text-lg text-green-800 mb-4">
                  Get the resources, mentorship, and protection you need to develop your idea
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-900 mb-3">🛠️ What You Get:</h5>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Technical mentorship</li>
                      <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Development resources</li>
                      <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Testing environment</li>
                      <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Community feedback</li>
                      <li className="flex items-center"><span className="text-green-600 mr-2">✓</span>Legal protection</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-900 mb-3">🛡️ IP Protection:</h5>
                    <p className="text-sm text-green-800 mb-2">
                      BoostKE helps you protect your intellectual property from day one:
                    </p>
                    <ul className="space-y-1 text-xs text-green-700">
                      <li>• Documentation and timestamping</li>
                      <li>• Legal framework protection</li>
                      <li>• Patent and trademark guidance</li>
                      <li>• Secure development environment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center my-4">
            <div className="text-3xl text-gray-400">⬇️</div>
          </div>
        </div>

        {/* Step 3: Keep Your IP */}
        <div className="relative">
          <div className="bg-white border-2 border-purple-300 rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-purple-900 mb-3">🛡️ Keep Your IP — Your Idea Remains Yours</h4>
                <p className="text-lg text-purple-800 mb-4">
                  Unlike traditional systems, you maintain full ownership of your innovations
                </p>
                
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-purple-900 mb-3">🔒 What This Means:</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-purple-800 mb-2">You Own:</h6>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• The original concept</li>
                        <li>• Core algorithms/methods</li>
                        <li>• Brand and identity</li>
                        <li>• Decision-making rights</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-medium text-purple-800 mb-2">You Control:</h6>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• How it's developed</li>
                        <li>• Where it's implemented</li>
                        <li>• Licensing agreements</li>
                        <li>• Revenue distribution</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-4">
                  <p className="text-purple-900">
                    <strong>Revolutionary Difference:</strong> In traditional systems, companies often take your ideas. 
                    In BOWIE, you're supported while maintaining complete ownership!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="flex justify-center my-4">
            <div className="text-3xl text-gray-400">⬇️</div>
          </div>
        </div>

        {/* Step 4: Earn Royalties */}
        <div className="bg-white border-2 border-orange-300 rounded-xl p-6 hover:border-orange-500 transition-all">
          <div className="flex items-start space-x-4">
            <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
              4
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-orange-900 mb-3">💰 Earn Royalties for Life as Your Idea Grows</h4>
              <p className="text-lg text-orange-800 mb-4">
                Create sustainable, passive income streams that grow with your innovation's success
              </p>
              
              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-orange-900 mb-3">📈 How Royalties Work:</h5>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">%</span>
                    <div>
                      <div className="font-medium text-orange-900">Usage-Based Earnings</div>
                      <p className="text-sm text-orange-800">Every time someone uses your solution, you earn a percentage</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">📊</span>
                    <div>
                      <div className="font-medium text-orange-900">Scale-Based Growth</div>
                      <p className="text-sm text-orange-800">As more people adopt your solution, your income increases automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">🌍</span>
                    <div>
                      <div className="font-medium text-orange-900">Global Reach</div>
                      <p className="text-sm text-orange-800">Your local solution can earn you money from users worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-orange-200 rounded-lg p-4">
                  <h6 className="font-semibold text-orange-900 mb-2">📱 Example: Study Group App</h6>
                  <p className="text-sm text-orange-800 mb-2">
                    Started at one university, now used by students globally:
                  </p>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• Month 1: 100 users → $50/month</li>
                    <li>• Year 1: 10,000 users → $5,000/month</li>
                    <li>• Year 3: 100,000 users → $50,000/month</li>
                  </ul>
                </div>
                <div className="bg-white border border-orange-200 rounded-lg p-4">
                  <h6 className="font-semibold text-orange-900 mb-2">🛒 Example: Inventory Tool</h6>
                  <p className="text-sm text-orange-800 mb-2">
                    Created for local shops, now powers businesses across Africa:
                  </p>
                  <ul className="text-xs text-orange-700 space-y-1">
                    <li>• Month 1: 5 shops → $25/month</li>
                    <li>• Year 1: 500 shops → $2,500/month</li>
                    <li>• Year 3: 5,000 shops → $25,000/month</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Timeline */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          ⏰ Typical Success Timeline
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <h4 className="font-semibold text-gray-900">Month 1-3</h4>
            <p className="text-sm text-gray-600">Idea development & protection</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🔧</span>
            </div>
            <h4 className="font-semibold text-gray-900">Month 3-6</h4>
            <p className="text-sm text-gray-600">Prototype & initial testing</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">📈</span>
            </div>
            <h4 className="font-semibold text-gray-900">Month 6-12</h4>
            <p className="text-sm text-gray-600">Launch & early adoption</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-semibold text-gray-900">Year 1+</h4>
            <p className="text-sm text-gray-600">Scaling & lifetime royalties</p>
          </div>
        </div>
      </div>

      {/* Ambassador Message */}
      <div className="bg-[#ffa500]/10 border border-[#ffa500]/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🎯</span>
          Message for Ambassadors
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          This pathway shows people that BOWIE isn't just about <strong>getting a job</strong>—it's about 
          <strong>creating your own economy</strong>. Every person you talk to has ideas that could 
          change their life and help others. Your role is to show them that their ideas have value 
          and a clear path to success.
        </p>
        <div className="bg-white rounded-lg p-4 border-l-4 border-[#ffa500]">
          <p className="font-semibold text-gray-900">
            Key Message: "Your idea + BOWIE support = Lifetime opportunity"
          </p>
        </div>
      </div>

      {/* Next Preview */}
      <div className="text-center bg-gradient-to-r from-[#e6940a]/10 to-[#ffa500]/10 rounded-xl p-6 border border-[#e6940a]/20">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Next: 🏆</h3>
        <p className="text-gray-700">
          Discover how BOWIE creates <strong>generational wealth</strong> and transforms entire communities. 
          Let's explore the bigger impact!
        </p>
      </div>
    </div>
  );
};

export default Day2Page4;
