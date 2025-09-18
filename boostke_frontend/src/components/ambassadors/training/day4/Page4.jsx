import React from 'react';

const revenueShares = [
  {
    title: "Microhubs",
    desc: "Earn a percentage of ambassador revenue in their area",
    color: "bg-blue-100 border-blue-400 text-blue-900"
  },
  {
    title: "Franchises",
    desc: "Earn from the microhubs they manage",
    color: "bg-green-100 border-green-400 text-green-900"
  },
  {
    title: "Innovators",
    desc: "Earn royalties from their creations",
    color: "bg-purple-100 border-purple-400 text-purple-900"
  },
  {
    title: "Flagship Ambassadors",
    desc: "Earn lifetime income from their communities",
    color: "bg-yellow-100 border-yellow-400 text-yellow-900"
  }
];

const Day4Page4 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#e6940a] mb-4 drop-shadow-lg">Revenue Sharing & Ownership 💰</h2>
        <p className="text-xl text-gray-700 mb-8 font-semibold">See how income flows and ownership works in Boost KE.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {revenueShares.map((item, idx) => (
          <div key={idx} className={`border-2 rounded-xl p-6 shadow-md ${item.color} mb-4`}>
            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
            <p className="text-md">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20 text-center">
        <blockquote className="italic text-[#e6940a] text-xl font-light">
          “Boost KE doesn’t just pay you — it partners with you.”
        </blockquote>
      </div>
    </div>
  );
};

export default Day4Page4;
