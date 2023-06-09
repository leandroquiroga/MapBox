import { useEffect, useReducer, useState } from "react";
import { PlacesContext } from "./PlacesContext"
import { Feature, PlacesProps } from "../../interfaces/interfaces"
import { placesReducer } from "./placesReducer";
import { INITAL_STATE_PLACES, getUserLocation } from "../../helpers";
import { searchServices } from '../../services';


export const PlacesProvider = ({ children }: PlacesProps) => {

  const [state, dispatch] = useReducer(placesReducer, INITAL_STATE_PLACES );
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
    }
    // Verifica si la ubicacion no existe
    if (!state.userLocation) throw new Error('La ubicacion no existe');
    // Setea la carga de los places
    dispatch({ type: "setLoadingPlaces" });
    const response = await searchServices(query, state);
    // Setea los places 
    dispatch({ type: 'setPlaces', payload: response.features });
    return response.features;
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
