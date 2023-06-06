import { useEffect, useReducer, useState } from "react";
import { PlacesContext } from "."
import { Feature, PlacesProps, PlacesStates, ResponseLocation } from "../interfaces/interfaces"
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../helpers";
import { searchApi } from "../api";

// Informacion que se almacena en memoria
const INITAL_STATE: PlacesStates = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
}

export const PlacesProvider = ({ children }: PlacesProps) => {

  const [state, dispatch] = useReducer(placesReducer, INITAL_STATE);
  const [inputValue, setInputValue] = useState<string>('');
  const [showAside, setShowAside] = useState<boolean>(false);
  const [infoPlaces, setInfoPlaces] = useState<string>('');


  useEffect(() => { 
    getUserLocation()
      .then(data => {
        dispatch({ type: "setUserLocation", payload: data })
      }).catch(err => {
        throw new Error(err);
      })
  }, []);
  
  const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
    
    // Verifica la longitud de la query
    if (query.length === 0) {
      dispatch({type:"setPlaces", payload: []});
      return []
    } //TODO: Limpiar state

    // Verifica si la ubicacion no existe
    if (!state.userLocation) throw new Error('La ubicacion no existe');

    // Setea la carga de los places
    dispatch({ type: "setLoadingPlaces" });

    const response = await searchApi.get<ResponseLocation>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });
    
    // Setea los places 
    dispatch({ type: 'setPlaces', payload: response.data.features });
    return response.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByQuery,
        inputValue,
        setInputValue,
        showAside,
        setShowAside,
        infoPlaces,
        setInfoPlaces,
      }}>
      {children}
    </PlacesContext.Provider>
  );
};
