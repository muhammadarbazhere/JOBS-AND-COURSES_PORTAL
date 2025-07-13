import React from 'react';
import { motion } from 'framer-motion';

const TaskProgress = () => {
  const sliders = [
    { name: 'SEO', progress: 90, color: 'from-green-400 to-green-600' },
    { name: 'QA', progress: 89, color: 'from-blue-400 to-blue-600' },
    { name: 'Analytics', progress: 90, color: 'from-purple-400 to-purple-600' },
    { name: 'UI', progress: 87, color: 'from-pink-400 to-pink-600' },
  ];

  return (
    <div className="bg-gray-900/70 backdrop-blur-lg rounded-2xl border border-gray-800 shadow-lg p-6 sm:mx-2 w-full lg:w-[70%] font-[Chivo] hover:shadow-blue-500/30 transition-all duration-300">
      <h1 className="py-2 text-lg sm:text-xl text-gray-100 font-semibold">📈 Task Progress</h1>
      <div className="flex flex-col gap-5 mt-4">
        {sliders.map((slider, index) => (
          <div key={index} className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-300 font-medium">{slider.name}</span>
              <motion.span
                className="text-gray-100 font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {slider.progress}%
              </motion.span>
            </div>
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`absolute left-0 top-0 h-full bg-gradient-to-r ${slider.color} shadow-lg`}
                initial={{ width: 0 }}
                animate={{ width: `${slider.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskProgress;
