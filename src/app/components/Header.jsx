import React, { useState } from 'react'
import FavouriteCard from './FavouriteCard'
import { useAuth } from '../contexts/useAuth'
import { useRouter } from 'next/navigation'
import { account } from '@/config/appwrite'
import { useFilter } from '../contexts/useFilter'
import { useMap } from '../contexts/useMapContext';
import { useRContext } from '../contexts/useRContext'

const Header = () => {

    const [visibleFav, setvisibleFav] = useState(false)
    const router = useRouter()
    const {setSearch} = useFilter()
    const { setUser } = useAuth();
    const { location } = useRContext();
    const { panToLocation } = useMap();

    const handleClick = () => {
      panToLocation(location);
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      setSearch(e.target[0].value)
    }

    const handleLogout = async () => {
        await account.deleteSession('current');
        setUser(null);
        router.push('/UserLogin');
    }

  
    return (
    <div className=' pr-10 py-2  flex items-center justify-between bg-gray-100'>
    <div className='flex rounded-xl gap-7 items-center'>
        <img src="./maps_icon.jpg" width={100} height={150} className='rounded-2xl' alt="" />
        <h2 onClick={() => handleClick()} className='cursor-pointer'>Home</h2>
        <h2 className='cursor-pointer' onClick={() => setvisibleFav((prev) => !prev)}>Favourites</h2>
        {visibleFav && <FavouriteCard />}
    </div>
    <div className='hidden sm:flex gap-2 items-center bg-gray-300 w-2/5 px-3 py-2 rounded-xl'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
      <form onSubmit={(e) => handleSubmit(e)} action="">
    <input type="text" className='bg-transparent outline-none w-4/5' placeholder='Search' /></form>
    </div>
    
    
    <button className='cursor-pointer text-lg text-white rounded-xl font-bold h-12 w-32 bg-red-600' onClick={() => handleLogout()}>Log Out</button>
    </div>
  )
}
export default Header