import { useState } from "react";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import axios from "../api/axios";

const faqsList = [
  {
    question: "What services does your website offer?",
    answer:
      "Our website allows users to advertise their products, sell new and second-hand items, assist with house hunting services, and provide market insights to drive growth for business owners.",
  },
  {
    question: "Do I need to create an account to use the website?",
    answer: "Yes, to get full benefits of our platform",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "Click on the 'Forgot Password' option on the login page and follow the instructions to reset it.",
  },
  {
    question: "How do I post an Ad for my business?",
    answer:
      "Once logged in on the vendor web page, create shop, the add your products",
  },
  {
    question: "How can I edit or delete my Ad?",
    answer:
      "Go to your vendor profile, select the Ad you want to modify, and use the popup options to edit or delete.",
  },
  {
    question: "Can I post both new and second-hand items?",
    answer:
      "Yes, just be sure to specify the condition of your item when posting the Ad.",
  },
  {
    question: "How can I use the house hunting services?",
    answer:
      "You can browse listings or post a request. Use filters to refine your search by location, price, etc.",
  },
  {
    question: "Can I post Ads for rental properties?",
    answer:
      "Yes, you can post Ads for rentals and properties for sale with complete details to attract interest.",
  },
  {
    question: "What kind of market insights do you provide?",
    answer:
      "We offer reports on trends, consumer behavior, and competitive analysis to support business decisions.",
  },
  {
    question: "How can I access market insights?",
    answer:
      "Login to your profile and go to the 'Market Insights' section to access reports and data.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Use the 'Contact Us' section in the navigation bar to submit your query. We'll respond promptly.",
  },
  {
    question: "What should I do if I encounter an issue on the website?",
    answer:
      "Please report the issue using the contact form. We strive to resolve all issues as quickly as possible.",
  },
  {
    question: "Can I get help with creating or managing my Ads?",
    answer:
      "Yes, our support team is available to help you with Ads. Reach out via the contact page for assistance.",
  },
];

function Faqs() {
  const [question, setQuestion] = useState("");
  const [sentForm, setSentForm] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setSentForm(false);
    setError(null);

    try {
      const response = await axios.post("/message/faqs", { question });
      if (response.status === 201) {
        setSentForm(true);
        setQuestion("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send your question. Please try again later.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-lg md:text-3xl font-bold text-center mb-6 text-orange-400">
        Frequently Asked Questions (FAQs)
      </h1>

      <Paper elevation={3} className="p-6 md:p-8">
        {/* Form */}
        <form onSubmit={handleFormSubmission} className="space-y-4 mb-10">
          <h2 className="text-xl font-semibold">Have a Question?</h2>
          <p className="text-sm text-gray-600">
            Submit your question and our support team will get back to you.
          </p>

          {sentForm && (
            <Alert severity="success">Message successfully sent!</Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}

          <textarea
            rows="5"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="bg-orange-400 text-white text-sm px-4 py-2 rounded-md hover:bg-orange-400 transition"
          >
            Post Your Question
          </button>
        </form>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqsList.map((faq, index) => (
            <div key={index} className="bg-gray-50 border rounded-md p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Q: {faq.question}
              </p>
              <p className="text-sm text-gray-700">A: {faq.answer}</p>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default Faqs;
