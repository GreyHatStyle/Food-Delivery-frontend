import {create} from "zustand"

export type SingleCityType = {
    city: string,
    setCurrentCity: (val: string) => void,
}

export const useCityStore = create<SingleCityType>()( (set) => ({
    city: "",
    setCurrentCity: (val) => set({ city: val}), 
}))