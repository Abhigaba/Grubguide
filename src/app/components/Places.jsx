// pages/index.js
"use client"
import { useEffect, useRef, useState } from 'react';
import { useBuisness } from '../contexts/useBuisness';
import { useRContext } from '../contexts/useRContext';
import axios from 'axios';
import PlaceCard from './PlaceCard';
import { usePlaces } from '../contexts/usePlaces';
import { useFilter } from '../contexts/useFilter';
import SkeletonLoading from './SkeletonLoading';


const Places = () => {

  const {setselectedPlace} = useBuisness()
  const {location} = useRContext()
  const elementRef = useRef(null)
  const {places, setplaces} = usePlaces()
  const {dist, category, rating, Search} = useFilter()
  const [loading, setLoading] = useState(true)
  const [filteredplaces, setFilteredplaces] = useState([])
  
  useEffect(() => {

    setLoading(true)
    const fetchPlaces = async () => {
      try {
        if (location && category){
        const res = await axios.get('/api/Places', {
          params: {
            location: `${location.lat},${location.lng}`,
            radius: dist*1000,
            keyword: `${category}`,
            minrating: rating,
            opennow: true,
        }});
        setplaces(res.data.results)
        console.log(res.data.results)
        setFilteredplaces(res.data.results)
      }

      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }
    if (location.lat && location.lng){
          fetchPlaces();
          setTimeout(() => setLoading(false),1200);

    }}, [category, dist,location, rating])
  

  useEffect(() => {
        if (places.length > 0){
            let filtered = places
            if(Search){
              filtered = places.filter((restaurant) => restaurant.name.toLowerCase().includes(Search.toLowerCase()));
            }
            setFilteredplaces(filtered)
        }
  },[Search])
    const slideRight=(element)=>{
      element.scrollLeft+=500;
  }
  const slideLeft=(element)=>{
      element.scrollLeft-=500;
  }

  if (!loading){
  return (
    <div className='sm:absolute bottom-5  sm:max-w-[70%] left-[26%]'>

<svg xmlns="http://www.w3.org/2000/svg"  
            fill="none" viewBox="0 0 24 24" 
            onClick={()=>slideLeft(elementRef.current)} 
            strokeWidth={1.5} stroke="currentColor" 
            className="hidden w-8 h-8 sm:block absolute rotate-180 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white">
            <path strokeLinecap="round" 
            strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
    <div className='flex overflow-scroll overflow-x-auto gap-4 hide-scrollbar bg-gray-200 pb-3 px-3 rounded-lg
    scrollbar-hide scroll-smooth' ref={elementRef}>
      
        {filteredplaces ? filteredplaces.map((item,index)=>index<=7&&(
            <div key={index} onClick={()=>setselectedPlace(item)}>
           <PlaceCard place={item}  />
           </div>
        )) : <p>No Places Found within specified distance</p>}
        
    </div>
    <svg xmlns="http://www.w3.org/2000/svg"
            onClick={()=>slideRight(elementRef.current)} 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" 
            className="hidden sm:block w-8 h-8 absolute right-0 top-[35%]
            bg-gray-300 cursor-pointer p-1 rounded-full text-white">
            <path strokeLinecap="round" 
            strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
    </div>

  );}
  else{
    return (
      <div className='sm:absolute bottom-5 bg-gray-100 flex p-3 rounded-lg  sm:max-w-[70%] left-[26%]'>
      <div className='flex gap-3'>
      {[1,2,3,4,5].map((item,index)=>(
          <SkeletonLoading key={index} />
      ))}
      </div>
      </div>

        )
  }
};

export default Places;
