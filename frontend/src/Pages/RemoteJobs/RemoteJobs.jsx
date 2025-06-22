import React, { useRef } from 'react';
import Ques from '../E-Learning/Question/Ques';
import MixJobInternships from '../../Components/JobsInternships/MixJobInternships';
import RemoteJobs1 from './RemoteJobs1';

function RemoteJobs() {
    const jobsRef = useRef(null);

    const scrollToJobs = () => {
        jobsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='bg-blue-100'>
            <RemoteJobs1 scrollToJobs={scrollToJobs} />
            
            <div ref={jobsRef} className='mx-2 md:mx-24 pt-8 sm:pt-24'>
                <MixJobInternships />
            </div>
            <Ques />
        </div>
    );
}

export default RemoteJobs;
