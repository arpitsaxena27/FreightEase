import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const FeatureCard = ({ title, description }) => (
  <motion.div
    className="bg-[#333333] p-6 rounded-lg shadow-lg flex flex-col items-center h-64"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-2xl text-center font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default FeatureCard;