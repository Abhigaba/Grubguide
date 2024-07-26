import { useContext, createContext } from "react";

const FilterContext = createContext({
    dist: 3,
    setdist: () => {},
    category: "",
    setCategory: () => {},
    rating: [],
    setRating: () => {},
    Search : '',
    setSearch : () => {}
})

export const FilterProvider = FilterContext.Provider

export const useFilter = () => {
    return  useContext(FilterContext)
}