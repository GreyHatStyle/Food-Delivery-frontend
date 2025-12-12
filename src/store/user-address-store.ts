import {create} from "zustand"
import { persist } from "zustand/middleware"


type AddressStoreType = {
    addressStoredId: number | null,
    setAddressId: (value: number | null) => void,
}

// it doesn't store the database address id, it just store the index value of frontend's component display,
// that is used by "map" to map the components
export const useUserAddressStore = create<AddressStoreType>()(
    persist(
        (set) => ({
            addressStoredId: null,
            setAddressId: (value) => set({addressStoredId: value})
        }),
        {
            name: "selected-address"
        }
    ),
)