import React, { useEffect, useState } from 'react';
import youtube from '../../../assets/YoutubeLogo.jpg'
import Linkedin from '../../../assets/LinkedInLogo.jpg'
import insta from '../../../assets/InstagramLogo.jpg'

const Counter = () => {
    const [counts, setCounts] = useState({ students: 0, rating: 0, completion: 0 });

    useEffect(() => {
        const animateNumbers = () => {
            const speed = 300;

            const counters = document.querySelectorAll('.count');

            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            });
        };

        animateNumbers(); // Initial animation

        return () => {
            clearTimeout();
        }
    }, [counts]);

    useEffect(() => {
        const updatedCounts = { students: 3, rating: 450, completion: 45 }; // 
        setCounts(updatedCounts);
    }, []);


    
    return (
        <div className='flex flex-row w-full justify-around py-5 text-md  sm:text-2xl lg:text-3xl'>



            <div className=" space-y-2 bg-white w-1/4 md:w-2/6 lg:w-36 p-2 lg:p-3 rounded-lg">
<img src={youtube} alt="loading" className='w-6 sm:w-10 mt-3 h-auto'/>

    <p className='flex flex-row font-bold'>
        <h1 className=' count' data-target={counts.students}>0</h1>
        <span>M+</span>
    </p>
    <h5 className='text-xs sm:text-xl'>Subscribers</h5>
           
</div>


            <div className=" space-y-2 bg-white w-1/4 md:w-2/6 lg:w-36 p-2 lg:p-3  rounded-lg">

            <img src={insta} alt="loading" className='w-6 sm:w-10 h-auto'/>
   <p className='flex flex-row font-bold '>
        <h1 className='count' data-target={counts.rating}>0</h1>
        <span>K+</span>
    </p>
        <h5 className='text-xs sm:text-xl'>Followers</h5>

            </div>


            <div className="space-y-2 bg-white w-1/4 md:w-2/6 lg:w-36 p-2 lg:p-3  rounded-lg">

            <img src={Linkedin} alt="loading" className='w-6 sm:w-10 h-auto'/>
    <p className='flex flex-row font-bold '>
        <h1 className='count' data-target={counts.completion}>0</h1>
        <span>K+</span>
    </p>
        <h5 className='text-xs sm:text-xl'>Followers</h5>
            
            </div>



        </div>
    );
};

export default Counter;
