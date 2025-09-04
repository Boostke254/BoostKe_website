import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

const generalServices = [
  {
    name: "Beauty Services",
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Plumbing Services",
    image:
      "https://images.unsplash.com/photo-1538474705339-e87de81450e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Car Hire",
    image:
      "https://images.unsplash.com/photo-1565043762739-73ca9d0e0c77?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Electrical Services",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Catering Services",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Funeral Services",
    image:
      "https://images.unsplash.com/photo-1575666415512-fecc2467b9a6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cleaning Services",
    image:
      "https://images.unsplash.com/photo-1529220502050-f15e570c634e?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gardening and Landscaping",
    image:
      "https://images.unsplash.com/photo-1729526368510-6a220407f287?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Painting and Renovation",
    image:
      "https://images.unsplash.com/photo-1688372199140-cade7ae820fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Home Repair and Maintenance",
    image:
      "https://images.unsplash.com/photo-1614792403436-ba5b3e747604?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pest Control Services",
    image:
      "https://images.unsplash.com/photo-1698610642562-35e6cb69faf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Laundry and Dry Cleaning",
    image:
      "https://images.unsplash.com/photo-1696546761269-a8f9d2b80512?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Mobile Phone Repairs",
    image:
      "https://images.unsplash.com/photo-1746005718004-1f992c399428?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "IT Support Services",
    image:
      "https://images.unsplash.com/photo-1569396116180-7fe09fa16dd8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tailoring and Clothing Alterations",
    image:
      "https://images.unsplash.com/photo-1497997092403-f091fcf5b6c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const ServicesCategory = () => {
  return (
    <div className="flex flex-col gap-6 pb-6 px-2 md:px-0">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        Service Categories
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
        {generalServices.map((service, index) => (
          <motion.a
            href={`/services/${service.name}`}
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-sm md:rounded-lg shadow-md overflow-hidden border-1 border-gray-300 hover:shadow-lg transition h-30 md:h-auto"
          >
            <div className="w-full h-[60%] md:h-40 overflow-hidden">
              <LazyLoadImage
                src={service.image}
                alt={`Image of ${service.name}`}
                effect="blur"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 md:p-3">
              <h2 className="text-[10px] md:text-sm font-medium text-gray-700 line-clamp-2">
                {service.name}
              </h2>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex justify-end items-center pt-2">
        <a
          href="/services"
          className="text-[10px] font-semibold text-gray-700 hover:underline"
        >
          View all services →
        </a>
      </div>
    </div>
  );
};

export default ServicesCategory;
