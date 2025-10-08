import {create} from "zustand"

export type SingleCityType = {
    city: string | null,
    setCurrentCity: (val: string) => void,
}

export const useCityStore = create<SingleCityType>()( (set) => ({
    city: null,
    setCurrentCity: (val) => set({ city: val}), 
}))