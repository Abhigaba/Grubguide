import React, { useEffect } from 'react'
import { useFavourites } from '../contexts/useFavourites'
import FavItem from './FavItem'
import { useBuisness } from '../contexts/useBuisness'
import { account } from '@/config/appwrite'
import { fetchFavourites } from '@/config/appwrite'
import { removeFavourite } from '@/config/appwrite'

const FavouriteCard = ({visible=false, setvisible, menu}) => {
    
  const {fav, setfav} = useFavourites() 
  const {setselectedPlace} = useBuisness()
  
  const handleDel = async (place) => {
    try {
        const user = await account.get();  // Get the current logged-in user
        const favourites = await fetchFavourites(user.$id);  // Fetch the user's favorites to find the one to delete

        const favToDelete = favourites.find(favItem => favItem.placeId === place.placeId);  // Find the favorite to delete
        if (favToDelete) {
          const updatedFavs = fav.filter(favItem => favItem.name !== place.name);  
          setfav(updatedFavs);
            await removeFavourite(favToDelete.$id);  // Remove it from Appwrite
          
        }
    } catch (error) {
        console.error('Failed to delete favorite:', error);
    }
};

useEffect(() => {
  const searchinFav = async () => {
      try {
          const user = await account.get();  // Get the current logged-in user
          const favourites = await fetchFavourites(user.$id);  // Fetch the user's favorites from Appwrite
          setfav(favourites);  // Set the favorites in state
      } catch (error) {
          console.error('Failed to fetch favorites:', error);
      }
  };

  searchinFav();
}, []);



  if (fav && fav.length > 0){
  return (
    
    <div ref={menu} className='absolute top-16 rounded-xl w-[25rem] left-12 sm:w-80  sm:left-16 z-10 max-h-[400px] sm:max-h-[250px]  p-2 bg-white
    ' >
      <div className='flex flex-col max-h-[225px] overflow-y-auto scroll-my-5 overflow-scroll
gap-1 hide-scrollbar scroll-smooth  scrollbar-hide  p-2 shadow-lg'>
      {fav.map((place, index) => (
          <div className='flex bg-gray-100 px-2 w-full rounded-lg'>
          <div ref={menu} key={index} onClick={() => setselectedPlace(place)} className='cursor-pointer bg-gray-100 rounded-lg py-2 px-2 flex items-center gap-[0.7rem]'>
            <FavItem place={place}></FavItem>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={'28px'} className="h-20  hover:text-red-500" onClick={() => handleDel(place)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        </div>
      ))}
      </div>
           </div>
  )}
  else{
    return (
    <div ref={menu} className='absolute top-16 rounded-xl w-[25rem] left-10  sm:w-80  sm:left-20 z-10 h-[150px]  p-2 bg-white
    flex items-center justify-center' >
        <p ref={menu} className='text-bold text-gray-500 text-lg'>No Favourites yet</p>
    </div>)
  }
}

export default FavouriteCard