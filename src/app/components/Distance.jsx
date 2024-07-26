import React, { useState } from 'react'
import { useFilter } from '../contexts/useFilter';

const Distance = () => {
    const [dist, setDist] = useState(2);
    const {setdist} = useFilter()

    const handledist = (e) => {
      setdist(e.target.value)
      setDist(e.target.value)
    }
    return (
    <div className='relative flex-col gap-4 px-4 py-6 bg-gray-100'>
        <h2 className='font-bold text-xl ml-32 sm:ml-16'>Distance in Kilometers</h2>
        <input type="range" 
        name="distance" 
        max={20} 
        value={dist} 
        step={1}
        onChange={(e)=> handledist(e)
        } 
        className='cursor-pointer transform scale-125 mt-6 w-3/4 ml-16 sm:ml-10'
          id="" />
          
        <p className='mt-4 ml-7 sm:ml-2'>Radius: {dist}</p>
    </div>
  )
}

export default Distance