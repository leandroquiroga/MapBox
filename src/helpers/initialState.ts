import { MapState, PlacesStates } from "../interfaces/interfaces";

export const INITIAL_STATE_MAP: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  instructions: []
};

// Informacion que se almacena en memoria
export const INITAL_STATE_PLACES: PlacesStates = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
};
