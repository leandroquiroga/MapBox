import { Feature, PlacesStates } from "../interfaces/interfaces"

// La entrada de un reducer no es mas que una funcion pura que recibe el estado y va a regresar 
// un mismo objeto del estado y ademas las acciones

type PlacesAction =
  | { type: 'setUserLocation', payload: [number, number] }
  | { type: 'setLoadingPlaces' }
  | { type: 'setPlaces', payload: Feature[] };

export const placesReducer = (
  state: PlacesStates,
  action: PlacesAction
): PlacesStates => {

  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    
    case 'setLoadingPlaces':
        return {
          ...state,
          isLoadingPlaces: true,
          places: []
        };
    
    case 'setPlaces':
      return {
        ...state, 
        isLoadingPlaces: false,
        places: action.payload
      }
    
    default:
      return state;
  }
};