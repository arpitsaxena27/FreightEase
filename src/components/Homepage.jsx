
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate=useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="relative w-full h-screen flex flex-col items-center justify-center bg-blue-500"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="src\assets\bghero1.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="relative z-10 text-center py-16 text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to the Freight Management System
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Managing your fleet, routes, and loads with ease.
          </motion.p>
          <motion.button 
            className="px-8 py-4 bg-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={()=>navigate('/main')}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl px-6 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } },
        }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Real-Time Tracking</h3>
          <p className="text-gray-600">
            Monitor your fleet in real-time with GPS tracking and get instant updates on vehicle status.
          </p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Load Optimization</h3>
          <p className="text-gray-600">
            Use AI to optimize load distribution and reduce empty miles for maximum efficiency.
          </p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h3 className="text-2xl font-bold mb-2 text-blue-600">Digital Contracts</h3>
          <p className="text-gray-600">
            Secure your transactions with online contracts and automated billing solutions.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;
