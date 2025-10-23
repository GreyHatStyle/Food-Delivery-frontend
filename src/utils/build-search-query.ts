
export const buildSearchQuery = (validatedObj: Record<string, unknown> | undefined): string =>{
  if(typeof validatedObj === "undefined") return "";

  const params = new URLSearchParams();

  Object.entries(validatedObj).forEach( ([key, value]) => {
    if(value === undefined || value === null || key==="count") return "";
    
    // Making this condition to filter the key values of zustand that has functions
    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      !Array.isArray(value)
    ){
      return "";
    }
    
    if(Array.isArray(value)){

      if(key === "cuisine"){
        params.append(key, value.join(','));
      }

      else{
        // append like normally (to deal with "rating__gte=3.5,4.5" format)
        value.forEach( (val) => {
          params.append(key, val.toString());
        });
      }
    }
    else{
      params.append(key, value.toString());
    }
  });

  return params.toString();
}
