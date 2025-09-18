import React, { useState } from 'react';
import Day1Page1 from './day1/Page1';
import Day1Page2 from './day1/Page2';
import Day1Page3 from './day1/Page3';
import Day1Page4 from './day1/Page4';
import Day1Page5 from './day1/Page5';
import Day1Page6 from './day1/Page6';
import Day2Page1 from './day2/Page1';
import Day2Page2 from './day2/Page2';
import Day2Page3 from './day2/Page3';
import Day2Page4 from './day2/Page4';
import Day2Page5 from './day2/Page5';
import Day2Page6 from './day2/Page6';
import Day3Page1 from './day3/Page1';
import Day3Page2 from './day3/Page2';
import Day3Page3 from './day3/Page3';
import Day3Page4 from './day3/Page4';
import Day3Page5 from './day3/Page5';
import Day3Page6 from './day3/Page6';
import Day4Page1 from './day4/Page1';
import Day4Page2 from './day4/Page2';
import Day4Page3 from './day4/Page3';
import Day4Page4 from './day4/Page4';
import Day4Page5 from './day4/Page5';
import Day4Page6 from './day4/Page6';
import Day5Page1 from './day5/Page1';
import Day5Page2 from './day5/Page2';
import Day5Page3 from './day5/Page3';
import Day5Page4 from './day5/Page4';
import Day5Page5 from './day5/Page5';
import Day5Page6 from './day5/Page6';
import Day6Page1 from './day6/Page1';
import Day6Page2 from './day6/Page2';
import Day6Page3 from './day6/Page3';
import Day6Page4 from './day6/Page4';
import Day6Page5 from './day6/Page5';
import Day6Page6 from './day6/Page6';

const TrainingModule = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);

  const day1Pages = [
    { id: 1, component: Day1Page1, title: "Welcome to the Movement" },
    { id: 2, component: Day1Page2, title: "The Vision" },
    { id: 3, component: Day1Page3, title: "What 'Boost' Stands For" },
    { id: 4, component: Day1Page4, title: "Why Ambassadors Matter" },
    { id: 5, component: Day1Page5, title: "The Boost KE Mindset" },
    { id: 6, component: Day1Page6, title: "Activities & Quiz" }
  ];

  const day2Pages = [
    { id: 1, component: Day2Page1, title: "The Big Picture" },
    { id: 2, component: Day2Page2, title: "What is BOWIE?" },
    { id: 3, component: Day2Page3, title: "How BOWIE Works" },
    { id: 4, component: Day2Page4, title: "Opportunity Pathway" },
    { id: 5, component: Day2Page5, title: "Generational Wealth" },
    { id: 6, component: Day2Page6, title: "Call to Action" }
  ];

  const day3Pages = [
    { id: 1, component: Day3Page1, title: "Day Objective & Sales = Service" },
    { id: 2, component: Day3Page2, title: "Starting a Business Inside Boost KE" },
    { id: 3, component: Day3Page3, title: "Storytelling Is Your Superpower" },
    { id: 4, component: Day3Page4, title: "Magnetic Conversations" },
    { id: 5, component: Day3Page5, title: "Handling Objections with Grace" },
    { id: 6, component: Day3Page6, title: "Activities, Pitch Practice & Reflection" }
  ];

  const day4Pages = [
    { id: 1, component: Day4Page1, title: "Day Objective & Ecosystem Introduction" },
    { id: 2, component: Day4Page2, title: "Ecosystem Overview" },
    { id: 3, component: Day4Page3, title: "Matching People to the Right Section" },
    { id: 4, component: Day4Page4, title: "Revenue Sharing & Ownership" },
    { id: 5, component: Day4Page5, title: "Activities: Matching Game & Pitch Challenge" },
    { id: 6, component: Day4Page6, title: "End-of-Day Reflection" }
  ];

  const day5Pages = [
    { id: 1, component: Day5Page1, title: "Digital Hustle Intro" },
    { id: 2, component: Day5Page2, title: "Social Selling" },
    { id: 3, component: Day5Page3, title: "Referral Engine Setup" },
    { id: 4, component: Day5Page4, title: "Content Creation That Converts" },
    { id: 5, component: Day5Page5, title: "Activities" },
    { id: 6, component: Day5Page6, title: "End-of-Day Reflection" }
  ];

  const day6Pages = [
    { id: 1, component: Day6Page1, title: "Graduation Intro" },
    { id: 2, component: Day6Page2, title: "Confidence Is an Affirmation" },
    { id: 3, component: Day6Page3, title: "Closing the Sale with Grace" },
    { id: 4, component: Day6Page4, title: "Handling Rejection Like a Shujaa" },
    { id: 5, component: Day6Page5, title: "Graduation: You’re Now a Boost Ambassador" },
    { id: 6, component: Day6Page6, title: "End of Training & Graduation" }
  ];

  const pages =
    currentDay === 1 ? day1Pages :
    currentDay === 2 ? day2Pages :
    currentDay === 3 ? day3Pages :
    currentDay === 4 ? day4Pages :
    currentDay === 5 ? day5Pages :
    day6Pages;
  const totalPages = pages.length;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const CurrentPageComponent = pages[currentPage - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffa500]/90 via-[#e6940a]/85 to-[#ffa500]/90 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 relative">
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 font-bold text-xl"
              title="Back to Ambassadors"
            >
              ×
            </button>
          )}
          <div className="flex justify-center mb-2 space-x-2">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentDay === 1 ? 'bg-white text-[#ffa500]' : 'bg-white/30 text-white/60'}`}
              onClick={() => { setCurrentDay(1); setCurrentPage(1); }}
            >
              Day 1
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentDay === 2 ? 'bg-white text-[#e6940a]' : 'bg-white/30 text-white/60'}`}
              onClick={() => { setCurrentDay(2); setCurrentPage(1); }}
            >
              Day 2
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentDay === 3 ? 'bg-white text-[#e6940a]' : 'bg-white/30 text-white/60'}`}
              onClick={() => { setCurrentDay(3); setCurrentPage(1); }}
            >
              Day 3
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentDay === 4 ? 'bg-white text-[#e6940a]' : 'bg-white/30 text-white/60'}`}
              onClick={() => { setCurrentDay(4); setCurrentPage(1); }}
            >
              Day 4
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentDay === 5 ? 'bg-white text-[#ffa500]' : 'bg-white/30 text-white/60'}`}
              onClick={() => { setCurrentDay(5); setCurrentPage(1); }}
            >
              Day 5
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentDay === 6 ? 'bg-white text-[#ffa500]' : 'bg-white/30 text-white/60'}`}
              onClick={() => { setCurrentDay(6); setCurrentPage(1); }}
            >
              Day 6
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Ambassador Training - Day {currentDay}
          </h1>
          <p className="text-white/70 text-lg">
            {pages[currentPage - 1]?.title}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-sm">Progress</span>
            <span className="text-white/70 text-sm">{currentPage} of {totalPages}</span>
          </div>
          <div className="w-full bg-white/15 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 min-h-[500px]">
          {CurrentPageComponent && currentDay === 6 && currentPage === 6 ? (
            <CurrentPageComponent onFinish={() => alert('Congratulations! You have completed the Boost KE Ambassador Training.')} />
          ) : CurrentPageComponent && currentPage === pages.length ? (
            <>
              <CurrentPageComponent />
              {currentDay < 6 && (
                <div className="flex justify-center mt-8">
                  <button
                    className="px-8 py-4 bg-[#ffa500] text-white font-bold rounded-xl shadow-lg hover:bg-[#e6940a] transition-all text-xl"
                    onClick={() => { setCurrentDay(currentDay + 1); setCurrentPage(1); }}
                  >
                    Start Day {currentDay + 1}
                  </button>
                </div>
              )}
            </>
          ) : CurrentPageComponent && <CurrentPageComponent />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentPage === 1
                ? 'bg-white/20 text-white/40 cursor-not-allowed'
                : 'bg-white text-[#ffa500] hover:bg-[#ffebc8] hover:scale-105'
            }`}
          >
            <span className="text-lg mr-2">←</span>
            Previous
          </button>

          <div className="flex space-x-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentPage === page.id
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentPage === totalPages
                ? 'bg-white/20 text-white/40 cursor-not-allowed'
                : 'bg-white text-[#ffa500] hover:bg-[#ffebc8] hover:scale-105'
            }`}
          >
            Next
            <span className="text-lg ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
