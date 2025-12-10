import {create} from "zustand"
import { persist } from "zustand/middleware"


type AddressStoreType = {
    addressIndex: number | null,
    setAddressId: (value: number | null) => void,
}

// it doesn't store the database address id, it just store the index value of frontend's component display,
// that is used by "map" to map the components
export const useUserAddressStore = create<AddressStoreType>()(
    persist(
        (set) => ({
            addressIndex: null,
            setAddressId: (value) => set({addressIndex: value})
        }),
        {
            name: "selected-address"
        }
    ),
)