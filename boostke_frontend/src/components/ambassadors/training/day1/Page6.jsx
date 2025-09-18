import React, { useState } from 'react';

const Page6 = () => {
  const [whyStatement, setWhyStatement] = useState('');
  const [mission, setMission] = useState('');
  const [helpOthers, setHelpOthers] = useState('');
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "What does Boost KE stand for?",
      options: [
        "A platform for selling and buying products",
        "An ecosystem that open sources opportunities and wealth creation",
        "A student discount app",
        "A social media challenge"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "What is the BOWIE model?",
      options: [
        "Boost Open Wealth & Impact Economy",
        "Boost Our Winning Income Ecosystem",
        "Business Of Wealth In East Africa",
        "Big Opportunities With Inclusive Energy"
      ],
      correct: 0
    },
    {
      id: 3,
      question: "Which of these is NOT part of the Boost KE mindset?",
      options: [
        "Build together",
        "Sell to serve",
        "Hustle alone",
        "Lead with dignity"
      ],
      correct: 2
    },
    {
      id: 4,
      question: "Which of the choices best describes a Boost KE Ambassador's role?",
      options: [
        "To memorize product prices",
        "To promote Boost KE on campus",
        "To sell, earn, grow and spark impact",
        "To manage logistics"
      ],
      correct: 2
    }
  ];

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setShowQuizResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreMessage = (score) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "🎉 Excellent! You're ready to Boost!";
    if (percentage >= 60) return "👍 Good job! Review and you'll be amazing!";
    return "📚 Keep learning! You're on the right path!";
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Activities & Assessment 📝
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Time to reflect, learn, and test your knowledge
        </p>
      </div>

      {/* Activity 1: Why I Boost Statement */}
      <div className="bg-gradient-to-r from-[#ffa500]/10 to-[#e6940a]/10 rounded-xl p-6 border border-[#ffa500]/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">✍️</span>
          Activity 1: Write Your "Why I Boost" Statement
        </h3>
        <p className="text-gray-600 mb-6">
          This is your personal manifesto. Why are you here? What do you want to build?
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I Boost because...
            </label>
            <textarea
              value={whyStatement}
              onChange={(e) => setWhyStatement(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffa500] focus:border-transparent resize-none"
              rows="3"
              placeholder="Share your motivation..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              My mission is...
            </label>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffa500] focus:border-transparent resize-none"
              rows="3"
              placeholder="What's your mission?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to help others by...
            </label>
            <textarea
              value={helpOthers}
              onChange={(e) => setHelpOthers(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffa500] focus:border-transparent resize-none"
              rows="3"
              placeholder="How will you make an impact?"
            />
          </div>
        </div>
      </div>

      {/* Activity 2: Quiz */}
      <div className="bg-white border-2 border-[#ffa500] rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">🧠</span>
          Activity 2: Boost KE Knowledge Quiz
        </h3>
        <p className="text-gray-600 mb-6">
          <strong>How Boost Are You?</strong> Test your understanding of our mission and culture.
        </p>

        {!showQuizResults ? (
          <div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {currentQuizQuestion + 1} of {quizQuestions.length}</span>
                <span>{Math.round(((currentQuizQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#ffa500] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {quizQuestions[currentQuizQuestion]?.question}
              </h4>
              
              <div className="space-y-3">
                {quizQuestions[currentQuizQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(currentQuizQuestion, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      quizAnswers[currentQuizQuestion] === index
                        ? 'border-[#ffa500] bg-[#ffa500]/10'
                        : 'border-gray-200 hover:border-[#ffa500]/50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)})</span>
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={nextQuestion}
                  disabled={quizAnswers[currentQuizQuestion] === undefined}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    quizAnswers[currentQuizQuestion] !== undefined
                      ? 'bg-[#ffa500] text-white hover:bg-[#e6940a]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#ffa500] to-[#e6940a] rounded-xl p-8 text-white mb-6">
              <h4 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h4>
              <p className="text-xl mb-2">
                Your Score: {calculateScore()} out of {quizQuestions.length}
              </p>
              <p className="text-lg opacity-90">
                {getScoreMessage(calculateScore())}
              </p>
            </div>
            
            <button
              onClick={() => setShowReflection(true)}
              className="bg-[#ffa500] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e6940a] transition-colors"
            >
              Continue to Reflection
            </button>
          </div>
        )}
      </div>

      {/* End-of-Day Reflection */}
      {showReflection && (
        <div className="bg-gradient-to-br from-[#ffa500]/10 via-white to-[#e6940a]/10 rounded-xl p-8 border border-[#ffa500]/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-3xl mr-3">🌅</span>
            End-of-Day Reflection
          </h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <blockquote className="text-lg text-gray-700 italic text-center leading-relaxed">
              "Today I've learned that Boost KE is a movement. I am part of building a future bigger and brighter for Africa and the world."
            </blockquote>
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-[#ffa500] text-white px-6 py-3 rounded-full">
              <span className="text-2xl">🎯</span>
              <span className="font-semibold">Day 1 Complete!</span>
            </div>
            <p className="text-gray-600 mt-4">
              Ready for Day 2? Your journey as a BoostKE Ambassador continues!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page6;
