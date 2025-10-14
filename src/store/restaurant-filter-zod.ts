import {z} from "zod"
import { create } from "zustand"

const allowedFields = ["city", "rating", "rating_count_int", "avg_cost"] as const;
type AllowedFieldsType = typeof allowedFields[number];

const allowedNonLookupFields = ["limit", "offset", "cuisine",] as const;
type AllowedNonLookupFieldType = typeof allowedNonLookupFields[number];

const allowedLookups = ["lte", "gte", "iexact"] as const;
type AllowedLookupType = typeof allowedLookups[number];

const allowedCuisines = ["North Indian", "South Indian", "Chinese", "Pizzas", "Sweets",  "American", "Bakery", "Desserts"];

const ValueQuerySchema = z.union([z.string(), z.number(), z.array(z.union([z.number(), z.string()]))]);

export const SearchQuerySchema = z.record(z.string(), ValueQuerySchema)
                            .refine( (obj) => {

                                return Object.keys(obj).every((key) => {
                                    
                                    const [baseField, lookup] = key.split("__");
                                    
                                    // console.log("Base field: ", baseField);
                                    // console.log("Lookup: ", lookup);


                                    if(!baseField) return false;
                                    if(allowedNonLookupFields.includes(baseField as AllowedNonLookupFieldType) && lookup === undefined) return true;

                                    
                                    const validBase = allowedFields.includes(baseField as AllowedFieldsType);
                                    const validLookup = allowedLookups.includes(lookup as AllowedLookupType);

                                    return validBase && validLookup;
                                })
                            }, {
                                error: "Invalid base field or lookup",
                            })
                            .refine( (obj) => {

                                return Object.entries(obj).every( ([key, value]) => {

                                    if( key === "cuisine"){
                                        if(typeof value === "number" || typeof value ==="undefined" || typeof value === "object") return false;

                                        if(!value.trim()) return false;

                                        const cuisineValues = value.split(',');
                                        // console.log("Cuisine value after split: ", cuisineValues);

                                        return cuisineValues.every( cuisine => {
                                            const cuisineTrim = cuisine.trim();
                                            return cuisineTrim === '' || allowedCuisines.includes(cuisineTrim);
                                        })
                                    }

                                    return true;
                                },)
                            }, {
                                error: "Invalid values for filters",
                            })






// Testing sting:  http://192.168.208.139:5173/restaurants/filters?city__iexact=Dehradun&rating__gte=3.5&limit=10&offset=10&cuisine=North%20Indian,South%20Indian&rating_count_int__gte=300&avg_cost__lte=300&avg_cost__gte=300&avg_cost__lte=600&rating__gte=4.5
