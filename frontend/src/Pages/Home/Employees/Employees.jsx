import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import products from './Product';

const Employees = () => {
  return (
    <div className="w-full h-auto flex justify-center  items-center">



      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{ delay: 1000 }}
        
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className=' flex justify-center  '>
            <div className="flex flex-col w-72  items-center ">
              <img
                src={item.image}
                alt={item.title}
                className=" border w-auto border-blue-500 rounded-full"
              />
              <div className="text-center mt-2  font-[Chivo]">
                <p className="text-[#374151]  mt-2 font-extrabold">{item.title}</p>
                <p className="text-[#374151] mt-2">{item.description}</p>

                <p className='space-x-1 flex text-[#374151] justify-center mt-2'>
                 {item.bio}
                  </p>

              </div>
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Employees;
