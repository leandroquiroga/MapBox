import { useReducer } from 'react';

import { MapProps, MapState } from '../interfaces/interfaces';
import { MapsContext } from "./MapsContext";
import { mapReducer } from "./mapsReducer";
import { Map } from 'mapbox-gl';

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapsProvider = ({children}: MapProps): JSX.Element => {
  
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const setMap = (map: Map) => dispatch({ type: 'setMap', payload: map });
  
  return (
    <MapsContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapsContext.Provider>
  );
}
