import { create } from "zustand"

export type RatingFilterType = {
    r4_5plus?: boolean,
    r4_0plus?: boolean,
    r3_0plus?: boolean,
}


type AvgCostType = {
    c_bel_300?: boolean,
    c_abo_300_bel_600?: boolean,
    c_abo_600?: boolean,
}

type RatingCountType = {
    rc_abo_100?: boolean,
    rc_abo_500?: boolean,
    rc_abo_1000?: boolean,
    rc_abo_5000?: boolean,
}


type CuisineType = {
    northIndian?: boolean,
    southIndia?: boolean,
    chinese?: boolean,
    pizza?: boolean,
    bakery?: boolean,
    american?: boolean,
    italianAmerican?: boolean,
}

type RestaurantFilterStoreType = {
    ratingFilters: RatingFilterType,
    avgCostFilters: AvgCostType,
    ratingCountFilters: RatingCountType,
    cuisineFilters: CuisineType,

    ratingFilterUpdate: (val: RatingFilterType) => void,
    avgCostFilterUpdate: (val: AvgCostType) => void,
    ratingCountFilterUpdate: (val: RatingCountType) => void,
    cuisineFilterUpdate: (val: CuisineType) => void,
}


export const useRestaurantFilterStore = create<RestaurantFilterStoreType>()(
    ((set) => ({
        ratingFilters: {
            r3_0plus: false,
            r4_0plus: false,
            r4_5plus: false,
        },
        avgCostFilters: {
            c_abo_300_bel_600: false,
            c_abo_600: false,
            c_bel_300: false,
        },
        ratingCountFilters: {
            rc_abo_100: false,
            rc_abo_1000: false,
            rc_abo_500: false,
            rc_abo_5000: false,
        },
        cuisineFilters: {
            american: false,
            bakery: false,
            chinese: false,
            italianAmerican: false,
            northIndian: false,
            pizza: false,
            southIndia: false,
        },

        ratingFilterUpdate: (newFilters: RatingFilterType) => set({ratingFilters: newFilters}),
        avgCostFilterUpdate: (newFilters: AvgCostType) => set({avgCostFilters: newFilters}),
        ratingCountFilterUpdate: (newFilters: RatingCountType) => set({ratingCountFilters: newFilters}),
        cuisineFilterUpdate: (newFilters: CuisineType) => set({cuisineFilters: newFilters}),
    }))
)