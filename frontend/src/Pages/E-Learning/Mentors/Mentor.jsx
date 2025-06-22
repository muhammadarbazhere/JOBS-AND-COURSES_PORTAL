
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Products from './Product';
import myImage from '../../../assets/myImage.jpg'
import Counter from './Counter';
import { FaCrown } from "react-icons/fa";
import FeatureIn from './FeatureIn';

function Mentor() {
  const Products = [
    {
      id: 1,
      image: myImage,
    },
    {
      id: 2,
      image: myImage,
    },
    {
      id: 3,
      image: myImage,
    },
    {
      id: 4,
      image: myImage,
    },
  ]

  const settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <button className="slick-prev bg-gray-500 text-white w-12 h-12 rounded-full focus:outline-none" />,
    nextArrow: <button className="slick-next bg-gray-500 text-white w-12 h-12 rounded-full focus:outline-none" />,
  };

  return (
    <div className='flex justify-center flex-col md:flex-row w-full space-y-3 md:space-y-0 px-0 md:px-8 py-5 h-full  overflow-hidden'>


<h1 className='text-2xl mb-2 text-center block md:hidden font-bold font-[Chivo]'>Meet your Mentor</h1>


      <div className=" w-full md:w-1/2 lg:w-[30%] h-full px-2 md:px-0 bg-white relative md:sticky top-0 rounded-xl">
        <Slider {...settings}>
          {Products.map(item => (
           
           <div key={item.id} className='w-full h-auto '>
              <img src={item.image} alt='loading' className="w-full h-full " />
         
            </div>
           
          ))}
        </Slider>

<div className='flex flex-col justify-center px-2 sm:px-6 py-2 md:py-8  '>
        <p className='text-[#878787] flex flex-row  text-sm'>
        <FaCrown size={20} className='text-[#FE7620] mr-2'/>
            Expert in Information Technologies
        </p>
                <h1 className='text-2xl font-[Chivo]'>Arbaz Khan</h1>
                <h1 className='text-[#929292]'>Co-founder of Arbaz WebCraft</h1>
                </div>
      </div>

    


      <div className="secondDiv  h-auto  md:px-0 space-y-2 m-0 md:ml-8  w-full md:w-1/2 lg:w-3/5 xl:w-[40%]">
        <h1 className='text-4xl hidden md:block font-bold font-[Chivo]'>Meet your Mentor</h1>
        <p className='text-[#101010] px-3 font-semibold'>Arbaz is a public speaker and YouTuber who co-founded Arbaz WebCraft, with Gullshaer, an education startup that generated 4+ Billion video impressions in 24 months.</p>

<p className='text-[#343434] px-3 font-semibold'>Arbaz has helped 27,000+ students improve their communication to become effective public speakers, great salespeople, YouTubers and successful business people.</p>

<p className='text-[#343434] px-3 font-semibold'>Arbaz’s dedication to education has earned him the title of “Insightful Education Creator of the Year 2023” at the Global Startup Summit 2023. His vision is to make the Indian youth more employable by helping them learn practical and fundamental skills in life.</p>




<div className='block '>
   <Counter />
 <FeatureIn/>
</div>

      </div>


    </div>
  );
}

export default Mentor;
