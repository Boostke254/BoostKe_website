import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";

const innovators = [
  {
    name: "Jane Mwangi",
    title: "AgriTech Inventor",
    description:
      "Developed a solar-powered irrigation system for small-scale farmers.",
    photo:
      "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Brian Otieno",
    title: "HealthTech Developer",
    description: "Created a remote diagnosis app for rural clinics.",
    photo:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Innovators() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8 px-4 md:px-12 lg:px-24">
      {/* Hero Banner */}
      <motion.div
        className="bg-amber-100 p-6 rounded-md md:rounded-none md:p-10 mb-6 md:mb-10 text-left md:pe-[25%]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl/10 md:text-4xl/12 font-bold text-yellow-600 mb-4">
          Explore a World of ideas and passion, discover innovations that are
          shaping the future.
        </h1>
        <p className="text-base/7 md:text-lg/8 text-gray-600 font-semibold md:pe-[30%]">
          Connect. Collaborate. Support. Join hands with brilliant minds shaping
          the future through innovation and creativity.
        </p>
      </motion.div>

      {/* Innovators Grid */}
      <h2 className="text-3xl font-bold mb-8 text-left">Our Innovators</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {innovators.map((person, index) => (
          <motion.div
            key={index}
            className="relative flex gap-6 bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Slanted black section */}
            <div className="w-32 bg-black clip-slant shrink-0"></div>
            {/* Overlapping image */}
            <LazyLoadImage
              src={person.photo}
              alt={person.name}
              className="!w-full !h-full object-cover " // force Tailwind classes
              wrapperClassName="absolute top-1/2 left-20 md:left-23 transform -translate-x-1/2 -translate-y-1/2 w-30 h-30 rounded-md border-4 z-50 border-white shadow-md" // set wrapper size explicitly
              effect="blur"
            />

            {/* Right section */}
            <div className="px-2 py-3 md:p-5 w-full">
              <h2 className="text-md md:text-xl font-bold text-black mb-2">
                {person.name}
              </h2>
              <p className="text-xs md:text-sm">
                <span className="font-semibold">Occupation:</span>{" "}
                {person.title}
              </p>
              <p className="text-xs md:text-sm mt-2 text-gray-700">
                <span className="font-semibold">About me:</span>{" "}
                {person.description}
              </p>

              {/* Buttons */}
              <div className="mt-5 flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="uppercase text-[10px] md:text-xs lg:text-md bg-amber-500 text-white hover:bg-amber-700 px-3 py-1.5 transition duration-200 ease-in-out cursor-pointer">
                    Co-Create
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="uppercase text-[10px] md:text-xs lg:text-md bg-white text-amber-600 border-2 border-amber-500 hover:bg-amber-500 hover:text-white px-3 py-1 transition duration-200 ease-in-out cursor-pointer">
                    View Profile
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
