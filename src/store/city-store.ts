import {create} from "zustand"
import { persist } from "zustand/middleware"

export type SingleCityType = {
    city: string | null,
    setCurrentCity: (val: string) => void,
}

export const useCityStore = create<SingleCityType>()( 
    
    persist(
        (set) => ({ 
            city: null,
            setCurrentCity: (val) => set({ city: val}), 
        }),
        {
            name: "city-storage"
        }

    )
)