import { MapAction, MapState } from "../../interfaces/interfaces";

export const mapReducer = (state: MapState, action: MapAction): MapState => {

  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };

    case "setMarkers":
      return {
        ...state,
        markers: action.payload,
      };
    case "clearMarkers":
      return {
        ...state,
        markers: [],
      };
    case "setRoutingInstructions":
      return {
        ...state,
        instructions: action.payload,
      };
    default:
      return state;
  }
};