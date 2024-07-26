import { useContext, createContext } from "react";

const UserContext = createContext({
    location : {
     },
    setloc :(loc) => {} 
})

export const UserContextProvider = UserContext.Provider

export const useRContext = () => {
    return useContext(UserContext)
}