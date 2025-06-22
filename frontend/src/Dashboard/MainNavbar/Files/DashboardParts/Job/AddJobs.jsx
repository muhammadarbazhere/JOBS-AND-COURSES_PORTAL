import React from 'react'
import AddJobInternshipForm from '../../../../../Components/JobsInternships/AddJobInternship'

function AddJobs() {
  return (
    <div className=' w-full h-full overflow-hidden px-6 sm:px-12 pt-6 bg-blue-100'>

     <h1 className='w-full h-full sm:h-12  text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-2xl sm:text-4xl font-[Chivo] font-semibold text-center  pb-2'>
      Add New Job/Internship
     </h1>
    <hr />
  
  <div className='pt-8 pb-14'>
  <AddJobInternshipForm/>
  

  </div>
  
      </div>
 
  )
}

export default AddJobs