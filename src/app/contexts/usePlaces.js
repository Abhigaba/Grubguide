import { createContext, useContext } from "react";

const PlaceContext = createContext({
    places: [],
    setplaces : () => {},
})

export const PlaceContextProvider = PlaceContext.Provider

export const usePlaces = () => {
    return useContext(PlaceContext)
}