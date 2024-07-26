import React from 'react'
import { useFavourites } from '../contexts/useFavourites'
import FavItem from './FavItem'
import { useBuisness } from '../contexts/useBuisness'
const FavouriteCard = () => {
    
  const {fav} = useFavourites() 
  const {setselectedPlace} = useBuisness()

  if (fav.length > 0){
  return (
    
    <div className='absolute top-16 rounded-xl w-[25rem] left-12 sm:w-80  sm:left-16 z-10 max-h-[400px] sm:max-h-[250px]  p-2 bg-white
    ' >
      <div className='flex flex-col max-h-[225px] overflow-y-auto scroll-my-5 overflow-scroll
gap-1 hide-scrollbar scroll-smooth  scrollbar-hide  p-2 '>
      {fav.map((place, index) => (
 
          <div key={index} onClick={() => setselectedPlace(place)} className='cursor-pointer bg-gray-100 rounded-lg py-2 px-2 flex gap-2'>
            <FavItem place={place}></FavItem>
          </div>
      ))}
      </div>
           </div>
  )}
  else{
    return (
    <div className='absolute top-16 rounded-xl w-[25rem] left-10  sm:w-80  sm:left-20 z-10 h-[150px]  p-2 bg-white
    flex items-center justify-center' >
        <p className='text-bold text-gray-500 text-lg'>No Favourites yet</p>
    </div>)
  }
}

export default FavouriteCard