import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Electronics",
  },
  {
    name: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/SmartPhones & Tablets",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1681991724832-56e4ccc04415?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Fashion",
  },
  {
    name: "Food & Drinks",
    image:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Foods",
  },
  {
    name: "Gaming",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Gaming",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Beauty",
  },
  {
    name: "Home Appliances",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Home Appliances",
  },
  {
    name: "Computer & Accessories",
    image:
      "https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Computers & Accessories",
  },
  {
    name: "Home & Office",
    image:
      "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Home & Office",
  },
  {
    name: "TV and Audio",
    image:
      "https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/categories/Electronics",
  },
];

const fadeUpSection = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      delay: 0.1,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const ProductCategories = () => {
  return (
    <motion.section
      variants={fadeUpSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-2 md:gap-4"
    >
      <h1 className="text-md font-semibold">Product Categories</h1>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center bg-white rounded-md shadow-md p-3 md:p-4 hover:shadow-lg cursor-pointer transition-shadow duration-300"
            onClick={() => (window.location.href = category.url)}
          >
            <LazyLoadImage
              src={category.image}
              alt={category.name}
              effect="blur"
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full mb-3"
            />
            <span className="text-[10px] md:text-sm text-center font-medium">
              {category.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex justify-end items-center mt-2">
        <a
          href="/categories"
          className="text-[10px] font-semibold text-gray-700 hover:underline"
        >
          View all categories -&gt;
        </a>
      </div>
    </motion.section>
  );
};

export default ProductCategories;
