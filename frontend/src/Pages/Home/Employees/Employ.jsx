import React from 'react'
import Employees from './Employees'

function Employ() {
  return (
    <div className='flex flex-col items-center mx-4  h-auto py-20'>

<h1 className='font-[Comfortaa] mx-4  text-2xl sm:text-5xl text-[#212529] mb-14'>Current Employees</h1>
<Employees/>

    </div>
  )
}

export default Employ