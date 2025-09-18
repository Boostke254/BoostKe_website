import React from 'react';

const matchQuestions = [
  {
    question: "Do you want to earn from your skills or your influence?",
    guide: "Freelance or Flagship Community"
  },
  {
    question: "Are you looking to shop or to sell?",
    guide: "Marketplace or Vendors"
  },
  {
    question: "Do you have an idea you’d love to build with others?",
    guide: "Innovators Page"
  }
];

const matchGuides = [
  {
    person: "Student who wants to earn from online gigs",
    section: "Freelance"
  },
  {
    person: "Vendor who wants a digital shop",
    section: "Vendors"
  },
  {
    person: "Creator with an idea for a new app",
    section: "Innovators"
  },
  {
    person: "Influencer with a loyal fan base",
    section: "Flagship Community"
  },
  {
    person: "Local entrepreneur who wants to onboard businesses",
    section: "Marketplace"
  }
];

const Day4Page3 = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ffa500] mb-4 drop-shadow-lg">Matching People to the Right Section 🎯</h2>
        <p className="text-xl text-gray-700 mb-8 font-semibold">Guide people to the solution that fits them best.</p>
      </div>
      <div className="bg-white border-2 border-[#e6940a] rounded-xl p-6 shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ask & Guide</h3>
        <ul className="list-disc ml-8 text-lg text-gray-700 space-y-2">
          {matchQuestions.map((q, idx) => (
            <li key={idx}>
              <span className="font-semibold text-[#ffa500]">{q.question}</span>
              <span className="ml-2 text-gray-700">→ <span className="font-bold text-[#e6940a]">{q.guide}</span></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Ecosystem Matching Game</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {matchGuides.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-[#e6940a]/30 rounded-xl p-4 text-center shadow-md">
              <div className="font-semibold text-[#ffa500] mb-2">{item.person}</div>
              <div className="text-lg text-[#e6940a] font-bold">{item.section}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Day4Page3;
