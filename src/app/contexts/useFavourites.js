import { createContext, useContext } from "react";

const FavContext = createContext({
    fav: [],
    setfav: () => {}
})

export const FavContextProvider = FavContext.Provider

export const useFavourites = () =>{
    return useContext(FavContext)
}