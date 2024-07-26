"use client"
import { FavContextProvider } from "./contexts/useFavourites";
import { FilterProvider } from "./contexts/useFilter";
import { PlaceContextProvider } from "./contexts/usePlaces";
import { UserContextProvider } from "./contexts/useRContext";
import { BuisnessProvider } from "./contexts/useBuisness";
import { Provider } from "./provider";
import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import Map from "./components/Map";
import { useState } from "react";
import WithAuth from "./components/WithAuth";


import Places from "./components/Places";
function Home() {


  const [location, setlocation] = useState({})
  const [selectedPlace, setselected] =  useState([])
  const [dist, setDist] = useState(3)
  const [category, setCuis] = useState("Indian")
  const [places, setPlaces] = useState([])
  const [fav, setFav] = useState([])
  const [rating, setrate] = useState([])
  const[Search,  setsearch] = useState('')

  const setRating = (ratings) => {
        setrate(ratings)
  }

  const setSearch = (string) => {
    setsearch(string)
  }


  const setfav = (lis) => {
    setFav(lis)
  }

  const setplaces = (place) => {
    setPlaces(place);
  }

  const setdist  = (distance) => {
    setDist(distance)
  }
  
  const setCategory  = (c) => {
    setCuis(c)
  }
  
  const setselectedPlace = (place) => {
      setselected(place)
  }
  
  const setloc = (loc)=> {
    setlocation(loc)
  }


  return (
   <>
     
     <Provider>
          <UserContextProvider value={{location, setloc}}>
            <BuisnessProvider value={{selectedPlace, setselectedPlace}}>
            <FilterProvider value={{dist, setdist, category, setCategory, rating, setRating, Search, setSearch}}>
            <PlaceContextProvider value = {{places, setplaces}} >
            <FavContextProvider value = {{fav, setfav}}>
          <Header></Header>
          <div className="flex flex-col sm:flex-row sm:h-[90vh]">
            <div className="w-full h-full sm:w-1/4 ">
              <Sidebar></Sidebar>
            </div>
            <div className="w-full h-[65vh] sm:h-full  sm:w-3/4 putline-none">
                <Map></Map>
            </div>
          </div>
   <Places></Places>

    </FavContextProvider>
    </PlaceContextProvider>
          </FilterProvider>
          </BuisnessProvider>
          </UserContextProvider>
          </Provider>
   </>  );
}

export default WithAuth(Home);