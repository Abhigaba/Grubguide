import React, { useEffect, useState } from 'react'
import Distance from './Distance'
import Ratings from './Ratings'
import { useFilter } from '../contexts/useFilter'
export const Sidebar = () => {
    const [data, setdata] = useState([])
    const [selected, setselected] = useState(0)
    const {setCategory} = useFilter()
    const handleSelected = (item, index) => {
        if(index === selected) { 
        }
        else{
            setselected(index)
            setCategory(item.name)
        }
    }
    useEffect(() => {
    fetch("./categories.json")
    .then(res => res.json() )
    .then(Data =>
        setdata(Data))}, [])
  return (

        <div className='py-10 bg-gray-100 h-full flex flex-col overflow-scroll overflow-y-auto hide-scrollbar'>
        <div className='flex px-4 ml-[10%] sm:ml-0 py-12 sm:py-6 flex-wrap gap-32 sm:gap-12 cursor-pointer w-screen sm:w-full  rounded-xl'>
            {data.map((item, index) => (
                <div key={index} onClick={() => handleSelected(item, index)} className={`flex  justify-center items-center h-20 w-32 py-4 sm:w-20 gap-2 flex-col grayscale hover:grayscale-0 ${selected === index ? "grayscale-0" : ""}`}>
                    <img key={index} src={item.icon} className='w-20 h-20' alt="" />
                    <h3>{item.name}</h3>
                </div>
            ))}
            </div>
        <Distance></Distance>
        <Ratings></Ratings>
        </div>

  )
}
