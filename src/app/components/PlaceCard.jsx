import React, { useEffect } from 'react'
import { useRContext } from '../contexts/useRContext'
import { useFavourites } from '../contexts/useFavourites'
import { useState } from 'react'
import { account } from '@/config/appwrite'
import { addFavourite, fetchFavourites } from '@/config/appwrite'
const PlaceCard = ({place, showDir=false}) => {

    const api = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const {location} = useRContext()
    const [dist, setdist] = useState(0)
    const photo_ref=place?.photos?place?.photos[0]?.photo_reference:''
    const [isFavourite, setisFavourite] = useState(false)
    const {fav, setfav} = useFavourites()

    useEffect(() => {   
            calculateDist(
                    location.lat, location.lng, 
                    place.geometry.location.lat,
                    place.geometry.location.lng
            )
    }, [])

    useEffect(() => {
      searchinFav()
    }
  , [fav])
    const searchinFav = () => {
      if (fav){
      const isFav = fav.some(favPlace => favPlace.name === place.name);
      setisFavourite(isFav);}
    }

    const handleFavourites = async (e) => {
      e.stopPropagation();
      const user = await account.get();   
      try {
          if (!isFavourite) {
            setfav([...fav, place]);  // Update local state
              await addFavourite(user.$id, place);  // Add the favorite to Appwrite
              setfav([...fav, place]);  // Update local state
          } 
          }
       catch (error) {
          console.error('Failed to update favorites:', error);
      }
  };
  
    
    const calculateDist = (lat2, lon2, lat1, lon1) => {
        const earthRadius = 6371; // in kilometers
  
        const degToRad = (deg) => {
          return deg * (Math.PI / 180);
        };
    
        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);
    
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        const distance = earthRadius * c;
       
        setdist(distance.toFixed(1))
        return distance.toFixed(2); 
    }

    const onDirectionClick=()=>{
        window.open('https://www.google.com/maps/dir/?api=1&origin='+
        location.lat+','+location.lng+'&destination='
        +place.geometry.location.lat
        +','+place.geometry.location.lng+'&travelmode=driving')
    }
  return (
    <div className='w-[195px] flex-shrink-0 p-2
    rounded-lg shadow-md mb-1
    bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer'>
       <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${api}`}
           alt={place.name}
           width={180}
           height={80}
           className='rounded-lg object-cover max-h-[90px] '
       />
        <h2 className='text-[13px] font-bold mt-1 line-clamp-1'>{place.name}</h2>
               <h2 className='text-[10px] text-gray-400 
               line-clamp-2'>{place.formatted_address}</h2>
               <div className='flex gap-1 items-center'>
               <svg xmlns="http://www.w3.org/2000/svg" 
               viewBox="0 0 24 24" fill="currentColor" 
               className="w-3 h-3 text-yellow-500">
               <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
               </svg>
               <h2 className='text-[10px] font-bold mt-1'>{place.rating}</h2>
               {!showDir &&<p className='text-blue-600 mt-1 cursor-pointer text-xs ml-auto'
               onClick={(e) => handleFavourites(e)}
               >{isFavourite ? "Added" : "Add To Favourites"}</p>}
           </div>
         {showDir?  <div className='border-t-[1px] p-1 mt-1'>
             <h2 className='text-[#0075ff]
             flex justify-between items-center'>Dist: {dist} Mile 
             <span className='border-[1px] p-1 rounded-full
             border-blue-500
             hover:text-white
             hover:bg-blue-500' onClick={()=>onDirectionClick()} >Get Direction</span></h2>
           </div>:null}
   </div>
 
  )
}

export default PlaceCard