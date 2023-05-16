import { useEffect, useReducer } from "react";
import { PlacesContext } from "."
import { PlacesProps, PlacesStates } from "../interfaces/interfaces"
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../helpers";

// Informacion que se almacena en memoria
const INITAL_STATE: PlacesStates = {
  isLoading: true,
  userLocation: undefined,
}

export const PlacesProvider = ({ children }: PlacesProps) => {

  const [state, dispatch] = useReducer(placesReducer, INITAL_STATE);

  useEffect(() => { 
    getUserLocation()
      .then(data => {
        dispatch({ type: "setUserLocation", payload: data })
      }).catch(err => {
        throw new Error(err);
      })
  },[]);
  return (
    <PlacesContext.Provider value={{...state}}>
        {children}
    </PlacesContext.Provider>
  );
};
