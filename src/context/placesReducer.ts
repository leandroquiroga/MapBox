import { PlacesStates } from "../interfaces/interfaces"

// La entrada de un reducer no es mas que una funcion pura que recibe el estado y va a regresar 
// un mismo objeto del estado y ademas las acciones

type PlacesAction = {
  type: 'setUserLocation',
  payload: [number, number];
};

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
      }
    
    default:
      return state;
  }
};