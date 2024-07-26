import { useContext, createContext } from "react";

const BuisnessContext = createContext({
    selectedPlace : {},
    setselectedPlace : () => {}
})

export const BuisnessProvider = BuisnessContext.Provider

export const useBuisness = () => {
    return useContext(BuisnessContext)
}