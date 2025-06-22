import React from 'react';

const TaskProgress = () => {
  const sliders = [
    { name: 'SEO', progress: 90 },
    { name: 'QA', progress: 89 },
    { name: 'Analytics', progress: 90 },
    { name: 'UI', progress: 87 }, 
  ];

  return (
    <div className='bg-white px-10 w-2/6 sm:w-full lg:w-[70%] font-[Chivo]'>
         <h1 className='py-2 pt-8  text-gray-700 font-semibold font-[Chivo]'>Task Progress</h1>
    <div className="flex flex-col items-center text-sm">
       
      {sliders.map((slider, index) => (
        <div key={index} className="w-full m-5">
          <div className="mb-2 text-right">{slider.progress}
          <span>%</span>
          </div>
          <div className="relative">
            <div className="absolute -top-7 left-0">{slider.name}</div>
            <input
              type="range"
              min="0"
              max="100"
              value={slider.progress}
              readOnly
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TaskProgress;
