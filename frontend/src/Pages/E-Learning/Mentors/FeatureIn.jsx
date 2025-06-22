import React from 'react'
import tv from '../../../assets/tv18.jpg'
import moneyControls from '../../../assets/moneyControl.jpg'
import et from '../../../assets/etNow.jpg'

function FeatureIn() {
  return (


    <div className='w-full flex flex-row justify-around bg-white items-center'>

<div className='pl-2 sm:pl-0 font-[Chivo]'>Featured In</div>

<div className='bg-green-900 w-1/4'>
    <img className='w-full h-fill' src={tv} alt="loading" />
</div>

<div className='bg-green-300 w-1/4'>
    <img className='w-full h-fill' src={moneyControls} alt="loading" />
</div>

<div className='bg-green-300 w-1/4'>
    <img className='w-full h-fill' src={et} alt="loading" />
</div>

    </div>


  )
}

export default FeatureIn