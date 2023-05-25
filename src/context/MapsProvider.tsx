import { useReducer } from 'react';

import { MapProps, MapState } from '../interfaces/interfaces';
import { MapsContext } from "./MapsContext";
import { mapReducer } from "./mapsReducer";
import { Map, Marker, Popup } from 'mapbox-gl';

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapsProvider = ({children}: MapProps): JSX.Element => {
  
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const setMap = (map: Map) => {
    // Creacion del Popup
    const popup = new Popup({
      closeButton: true,
      focusAfterOpen: true,
      className:'rounded-xl'
    }).setHTML(`<p>Ubicacion: Tu vieja</p>`);
    
    //Creacion del marcador, necesita la logitud y latitud para colacarlo en el mapa
    new Marker({
      color: "#ff0000",
      draggable: true,
    })
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(popup);
    
    dispatch({ type: 'setMap', payload: map })
  };
  
  return (
    <MapsContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapsContext.Provider>
  );
}
