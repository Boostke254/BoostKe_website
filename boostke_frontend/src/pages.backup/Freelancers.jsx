import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";

// Sample image URLs — replace with actual images
const freelancers = [
  {
    name: "Linet Kipkoech",
    skill: "Graphic Designer",
    bio: "Specializes in brand identity, social media creatives, and packaging design.",
    image:
      "https://images.unsplash.com/photo-1539351761715-02601e07fadb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Kevin Mutiso",
    skill: "Full-Stack Developer",
    bio: "Builds robust web apps with React, Node.js, and MongoDB.",
    image:
      "https://images.unsplash.com/photo-1591390298153-a25494c924b8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Freelancers() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8 px-4 md:px-12 lg:px-24">
      {/* Hero Banner */}
      <motion.div
        className="bg-purple-100 p-10 mb-10 text-left md:text-center rounded-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Discover Top Freelancers
        </h1>
        <p className="text-lg text-purple-600 max-w-2xl mx-auto">
          Collaborate with skilled professionals across design, tech, and
          marketing. Empower your ideas with freelance talent from across the
          country.
        </p>
      </motion.div>

      {/* Freelancers List */}
      <h2 className="text-3xl font-bold mb-8 text-center">Our Freelancers</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {freelancers.map((person, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2 md:gap-6 h-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <LazyLoadImage
              src={person.image}
              alt={person.name}
              className="!w-full !h-full object-cover" // force Tailwind classes
              wrapperClassName="w-2/5 h-full" // set wrapper size explicitly
              effect="blur"
            />
            <div className="w-3/5 flex-grow  py-4 px-2">
              <h2 className="text-base md:text-xl font-semibold mb-1">
                {person.name}
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                {person.skill}
              </p>
              <p className="text-gray-700 text-xs md:text-sm mb-4">
                {person.bio}
              </p>
              <div className="flex gap-3">
                <button className="uppercase bg-purple-600 text-white hover:bg-purple-700 px-2 md:px-4 py-1 md:py-1.5 rounded transition duration-200 ease-in-out text-xs md:text-sm cursor-pointer">
                  Message
                </button>
                <button className="uppercase bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-700 hover:text-white px-1.5 md:px-3 py-1 rounded transition duration-200 ease-in-out  text-xs md:text-sm cursor-pointer">
                  View Profile
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
