import React from 'react';

const Day2Page1 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          The Big Picture 🌍
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Understanding BOWIE: The Heart of BoostKE's Economic Revolution
        </p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Day 2: The BOWIE Model
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Today, we dive deep into the <strong>economic engine</strong> that powers BoostKE. 
            BOWIE isn't just a model—it's a <strong>revolution in wealth creation</strong> 
            that puts opportunity in everyone's hands.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🎯</span>
          Your Ambassador Mission
        </h3>
        <div className="bg-[#ffa500]/5 rounded-lg p-6">
          <p className="text-lg text-gray-700 italic text-center leading-relaxed">
            "As an ambassador, your mission is to <strong>inspire people with this vision</strong> 
            and show them how they can plug into a system where <strong>everyone has a role</strong>: 
            students, vendors, developers, governments, and investors."
          </p>
        </div>
      </div>

      {/* The Revolution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">⚡</span>
            What Makes BOWIE Different?
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-[#ffa500] mr-2">•</span>
              <span><strong>Inclusive by Design:</strong> Everyone can participate and benefit</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#ffa500] mr-2">•</span>
              <span><strong>Open Collaboration:</strong> Ideas flow freely and grow together</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#ffa500] mr-2">•</span>
              <span><strong>Shared Wealth:</strong> Success isn't hoarded—it's distributed</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#ffa500] mr-2">•</span>
              <span><strong>Generational Impact:</strong> Building wealth that lasts</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#ffa500]/5 to-[#e6940a]/5 rounded-xl p-6 border border-[#ffa500]/20">
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🌱</span>
            The BOWIE Vision
          </h4>
          <div className="space-y-4">
            <p className="text-gray-700">
              Imagine an economy where your <strong>smallest idea</strong> can create 
              <strong>global impact</strong> and <strong>lifetime wealth</strong>.
            </p>
            <p className="text-gray-700">
              Where <strong>competition becomes collaboration</strong>, and 
              <strong>innovation uplifts entire communities</strong>.
            </p>
            <p className="text-gray-700 font-semibold text-[#e6940a]">
              This isn't just a dream—it's the BOWIE reality we're building together.
            </p>
          </div>
        </div>
      </div>

      {/* Key Stakeholders */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🤝 Everyone Has a Role in BOWIE
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: "🎓", title: "Students", desc: "Ideas & Innovation" },
            { icon: "🏪", title: "Vendors", desc: "Products & Services" },
            { icon: "💻", title: "Developers", desc: "Tools & Solutions" },
            { icon: "🏛️", title: "Governments", desc: "Policy & Support" },
            { icon: "💰", title: "Investors", desc: "Capital & Growth" }
          ].map((stakeholder, index) => (
            <div key={index} className="text-center p-4 rounded-lg border hover:border-[#ffa500]/50 transition-all">
              <div className="text-3xl mb-2">{stakeholder.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{stakeholder.title}</h4>
              <p className="text-sm text-gray-600">{stakeholder.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What's Coming Next */}
      <div className="bg-gradient-to-r from-[#e6940a]/10 to-[#ffa500]/10 rounded-xl p-6 border border-[#e6940a]/20">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-3">🗺️</span>
          What's Coming Next
        </h3>
        <p className="text-gray-700 mb-4">
          Over the next pages, we'll explore:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-semibold text-[#e6940a] mb-2">📋 The BOWIE Framework</h4>
            <p className="text-sm text-gray-600">Build • Own • Work • Invest • Earn</p>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-semibold text-[#e6940a] mb-2">⚙️ How It Works</h4>
            <p className="text-sm text-gray-600">From collaboration to smart systems</p>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-semibold text-[#e6940a] mb-2">💎 Your Opportunity</h4>
            <p className="text-sm text-gray-600">From idea to impact to income</p>
          </div>
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="text-center bg-[#ffa500] text-white rounded-xl p-8">
        <blockquote className="text-xl italic font-light leading-relaxed">
          "The BOWIE Model represents a new way of building wealth and opportunity — 
          one where <strong>everyone has a role</strong> and <strong>success is shared</strong>."
        </blockquote>
        <p className="mt-4 text-white/80">Ready to learn how it all works? Let's dive in! 🚀</p>
      </div>
    </div>
  );
};

export default Day2Page1;
