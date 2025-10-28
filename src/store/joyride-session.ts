import {create} from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"


type JoyRideRunStateType = {
    homeRun: boolean,
    restaurantRun: boolean,
    menuRun: boolean,
};

type JoyrideSessionType = {
    setRunState: <K extends keyof JoyRideRunStateType>(
        key: K,
        value: JoyRideRunStateType[K]
    ) => void,

} & JoyRideRunStateType;

export const useJoyrideSession = create<JoyrideSessionType>()(
    persist(
        (set) => ({
            homeRun: true,
            restaurantRun: true,
            menuRun: true,

            setRunState: (key, value) =>
                (set)({
                    [key]: value,
                })
            
        }),
        {
            name: "joy-ride-session",
            storage: createJSONStorage(() => sessionStorage), 
        }
    )
)